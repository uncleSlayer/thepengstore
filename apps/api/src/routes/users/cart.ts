import { Router } from "express";
import { prisma } from "database";
import { addToCartType } from "type-checks";
import { auth } from 'firebase-admin-config'

export const cartRouter = Router()

cartRouter.post('/cart/add/:id', async (req, res) => {

    const userToken: string = req.cookies.token
    const productId: addToCartType = parseInt(req.params.id)

    if (!userToken) {
        return res.send({
            error: "user not logged in"
        })
    }

    await auth.verifyIdToken(userToken)
        .then(async (result) => {
            const user = await prisma.users.findFirst({
                where: {
                    email: result.email
                }
            })

            if (!user) {
                return {
                    success: false,
                    error: 'user not found'
                }
            }

            const existingCart = await prisma.cart.findFirst({
                where: {
                    productsId: productId,
                    ownerId: user.id
                }
            })

            if (existingCart) {
                await prisma.cart.update({
                    where: {
                        id: existingCart.id
                    },

                    data: {
                        quantity: existingCart.quantity + 1
                    }
                })

                return res.send({
                    success: true,
                    message: `cart with id: ${existingCart.id} has been quantity increamented`
                })
            }

            const cart = await prisma.cart.create({
                data: {
                    ownerId: user?.id,
                    productsId: productId
                }
            })

            return res.send({
                message: `cart with id: ${cart.id} created`
            })

        })
        .catch((err) => {
            console.log(err);

            res.send({
                success: false,
                error: err
            })
        })
})

cartRouter.get('/cart/getall', async (req, res) => {

    const userToken: string = req.cookies.token

    const userTokenDecrypted = await auth.verifyIdToken(userToken)

    const userEmail = userTokenDecrypted.email

    if (!userToken) {
        return res.send({
            error: 'jwt token not found'
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

    const products: {
        id: number;
        name: string;
        price: number;
        description: string;
        imagesUrl: string;
    }[] = []

    for (let i = 0; i < user.Cart.length; i++) {

        const product = await prisma.products.findFirst({
            where: {
                id: user.Cart[i].productsId
            },
            include: {
                imagesUrl: true,
            }
        })

        if (!product) {
            return res.send({
                error: 'some weird error that I am not in a mood to fix now'
            })
        }

        if (!product.id || !product?.name || !product?.price || !product?.description || !product?.imagesUrl) {
            return res.send({
                error: 'will solve this when I see the bug bye'
            })
        }

        const pushItem = {
            id: product.id,
            name: product.name,
            price: product.price,
            description: product.description,
            imagesUrl: product.imagesUrl[0].url,
            quantity: user.Cart[i].quantity
        }

        products.push(pushItem)
    }

    return res.send({
        message: products
    })
})

cartRouter.post('/cart/remove-one/:id', async (req, res) => {
    const productId: number = parseInt(req.params.id)
    const userInfo = await auth.verifyIdToken(req.cookies.token)

    if (!userInfo) {
        return res.send({
            success: false,
            message: 'invalid token'
        })
    }

    const user = await prisma.users.findFirst({
        where: {
            email: userInfo.email
        }
    })

    if (!user) {
        return res.send({
            success: false,
            error: 'no user found with this email'
        })
    }

    const cartToUpdate = await prisma.cart.findFirst({
        where: {
            productsId: productId,
            ownerId: user.id
        }
    })

    if (!cartToUpdate) {
        return res.send({
            success: false,
            error: 'cart with this product id from the user is not available in db'
        })
    }

    try {
        await prisma.cart.update({
            where: {
                id: cartToUpdate.id
            },

            data: {
                quantity: cartToUpdate.quantity - 1
            }
        })
        return res.send({
            success: true,
            message: 'cart item removed'
        })
    } catch (error) {
        return res.send({
            success: false,
            error: error
        })
    }
})