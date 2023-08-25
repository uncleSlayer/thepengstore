import { Router } from "express";
import Stripe from "stripe"

const stripeClient = new Stripe('sk_test_51NhlPWSB6Lpj0maTGM7KVCxGYvu1keFaqL8UlTOnfSFrF5y7rndcaq1ORrEbsONsnodz4oihvWDp2RIwMlS1xPog00lgKyRJo7', {
    apiVersion: '2023-08-16'
})
export const checkoutRouter = Router()

checkoutRouter.post('/create-order', async (req, res) => {
    const session = await stripeClient.checkout.sessions.create({
        line_items: [
            {
                price_data: {
                    currency: 'inr',
                    product_data: {
                        name: 'shirt'
                    },
                    unit_amount: 2000
                },
                quantity: 2
            },
        ],
        mode: 'payment',
        success_url: 'http://localhost:5173'
    })

    res.send({ url: session.url })
})