import { Router } from "express";
import { prisma } from "database";
import jwt from "jsonwebtoken";
import { JWT_SIGN_TOKEN } from "../../../apiconfig";
import { addToCartValidator } from "zod-checks";
import { addToCartType } from "type-checks";

export const cartRouter = Router()

cartRouter.post('/cart/add/:id', async (req, res) => {

    const userToken: string = req.cookies.token

    if (!userToken) {
        return res.send({
            error: "user not logged in"
        })
    }

    const productId: addToCartType = req.body.productId
    const userEmail = jwt.verify(userToken, JWT_SIGN_TOKEN)

    const productIdValidaed = addToCartValidator.safeParse(productId)
    console.log(productId)

    if (!productIdValidaed.success) {
        return res.send({
            error: 'product id type is not correct'
        })
    }

    // I don't know what kind of error this is, but to avoid typescript errors I have written this check here.
    if (typeof userEmail !== 'string') {
        return res.send({
            error: 'some error occured'
        })
    }

    const product = await prisma.products.findFirst({
        where: {
            id: productId
        }
    })

    const user = await prisma.users.findFirst({
        where: {
            email: userEmail
        }
    })

    if (!product || !user) {
        return res.send({
            error: "no user or product found with the given details"
        })
    }

    const checkCart = await prisma.cart.findFirst({
        where: {
            ownerId: user.id,
            productsId: product.id
        }
    })

    if (checkCart) {
        return res.send({
            error: "this item is alreay in your cart"
        })
    }

    const newCart = await prisma.cart.create({
        data: {
            ownerId: user?.id,
            productsId: product?.id
        }
    })

    res.send({
        message: `cart with cart id: ${newCart.id} created`
    })
})

cartRouter.get('/cart/getall', async (req, res) => {

    const userToken: string = req.cookies.token
    const userEmail = jwt.verify(userToken, JWT_SIGN_TOKEN)

    if (!userToken) {
        return res.send({
            error: 'jwt token not found'
        })
    }

    if (typeof userEmail !== 'string') {
        return res.send({
            error: 'something went wrong'
        })
    }

    const user = await prisma.users.findFirst({
        where: {
            email: userEmail
        },
        include: {
            Cart: true
        }
    })

    if (!user?.Cart) {
        return res.send({
            error: 'user does not have any cart items'
        })
    }

    const productIds: number[] = []

    user.Cart.map((cart) => {
        productIds.push(cart.productsId)
    })

    const products: {
        id: number;
        name: string;
        price: number;
        description: string;
        imagesUrl: string;
    }[] = []

    await Promise.all(productIds.map(async (productId) => {
        const productInfo = await prisma.products.findFirst({
            where: {
                id: productId
            }
        })

        if (!productInfo) {
            console.log(`something went wrong while fetching produc data of product id: ${productId}`)
            return res.send({
                error: "some error occured"
            })
        }

        products.push(productInfo)
    }))

    return res.send({
        message: products
    })
})