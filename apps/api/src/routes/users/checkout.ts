import { Router } from "express";
import Stripe from "stripe"
import { orderItemsValidator, productLastItemIdValidator, orderDataCreationValidator, orderAddressValidator } from "zod-checks"
import { orderItemsType, orderDataCreationType } from "type-checks"
import { SERVER_IP } from 'configs';
import { prisma } from '../../../prisma/index'

const stripeClient = new Stripe('sk_test_51NhlPWSB6Lpj0maTGM7KVCxGYvu1keFaqL8UlTOnfSFrF5y7rndcaq1ORrEbsONsnodz4oihvWDp2RIwMlS1xPog00lgKyRJo7', {
    apiVersion: '2023-08-16'
})
export const checkoutRouter = Router()

checkoutRouter.post('/create-order', async (req, res) => {

    const orderDetails: orderItemsType = req.body.orderItems
    const orderAddress: {
        houseNumber: string,
        cityAddr: string,
        districtAddr: string,
        stateAddr: string,
        pinAddr: string,
        phone: string
    } = req.body.orderAddress

    const orderItemsValidated = orderItemsValidator.safeParse(orderDetails)

    if (!orderItemsValidated.success) {
        console.log(orderItemsValidated.error)
        return res.send({
            error: orderItemsValidated.error
        })
    }

    const line_items_data = orderDetails.map((item) => {

        return {
            price_data: {
                currency: 'inr',
                product_data: {
                    name: item.name
                },
                unit_amount: item.price * 100
            },
            quantity: 1
        }
    })

    const session = await stripeClient.checkout.sessions.create({
        line_items: line_items_data,
        mode: 'payment',
        success_url: `http://localhost:5173/success/?houseno=${orderAddress.houseNumber}&city=${orderAddress.cityAddr}&state=${orderAddress.stateAddr}&district=${orderAddress.districtAddr}&pin=${orderAddress.pinAddr}&phone=${orderAddress.phone}`
    })

    res.send({ url: session.url })
})

checkoutRouter.post('/create-order-next-step', (req, res) => {
    const reqBody: orderDataCreationType = req.body.data

    const orderDataCreationValidated = orderDataCreationValidator.safeParse(reqBody)

    if (!orderDataCreationValidated.success) {
        return res.send({
            error: orderDataCreationValidated.error
        })
    }

    if (!reqBody.success) {
        return res.send({
            error: 'order creation failed'
        })
    }

    reqBody.ids.map(async (id) => {
        const cartItem = await prisma.cart.findFirst({
            where: {
                productsId: id
            }
        })

        console.log(cartItem)

        if (!cartItem) {
            console.log('sed')
            return
        }

        const currentTime = new Date().toISOString();

        try {
            const order = await prisma.order.create({
                data: {
                    cartId: cartItem.id,
                    orderTime: currentTime,
                    status: "ORDER_RECEIVED",
                    address: {
                        create: {
                            houseNumber: reqBody.address.houseNo,
                            city: reqBody.address.city,
                            state: reqBody.address.state,
                            district: reqBody.address.district,
                            pin: reqBody.address.pin
                        }
                    }
                }
            })
        } catch (error) {
            console.log(error);

        }

    })

    return res.send({
        message: 'order created'
    })
})