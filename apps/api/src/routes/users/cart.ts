import { Router } from "express";
import { prisma } from "database";
import jwt from "jsonwebtoken";
import { JWT_SIGN_TOKEN } from "../../../apiconfig";
import { addToCartValidator } from "zod-checks";
import { addToCartType } from "type-checks";

export const cartRouter = Router()

cartRouter.post('/cart/add/:id', async (req, res) => {

    const userToken: string = req.cookies.token
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

    const cart = await prisma.cart.create({
        data: {
            ownerId: user?.id,
            productsId: product?.id
        }
    })

    res.send({
        message: `cart with cart id: ${cart.id} created`
    })
})