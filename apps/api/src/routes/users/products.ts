import { Router } from "express";
import { productGetIndValidator } from "zod-checks";
import { productLastItemIdValidator } from "zod-checks";
import { prisma } from "database";


export const userProductRouter = Router()


// get individual item from database
userProductRouter.post('/getinditem', async (req, res) => {
    const productId = req.body.id
    const productIdValidated = productGetIndValidator.safeParse(productId)

    if (!productIdValidated) {
        return res.send({
            error: "id is not sent"
        })
    }

    const productInfo = await prisma.products.findFirst({
        where: {
            id: productId
        }
    })

    if (!productInfo) {
        return res.send({
            error: "data for this id doesn't exist in the database"
        })
    }

    res.send({
        data: productInfo
    })
})


// get 10 last items
userProductRouter.post('/getnextitems', async (req, res) => {
    const lastItemId: number = req.body.id
    const lastItemIdValidated = productLastItemIdValidator.safeParse(lastItemId)

    if (!lastItemIdValidated.success) {
        return res.send({
            error: "send valid last id"
        })
    }

    const nextItems = await prisma.products.findMany({
        where: {
            id: {
                gt: lastItemId
            }
        },
        take: 10
    })

    res.send({
        data: nextItems
    })

})