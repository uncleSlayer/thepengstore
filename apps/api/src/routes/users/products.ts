import { Router } from "express";
import { productGetIndValidator } from "zod-checks";
import { productLastItemIdValidator } from "zod-checks";
import { prisma } from "database";
import { allProductsLastItemType } from "type-checks";


export const userProductRouter = Router()


// get individual item from database
userProductRouter.get('/getinditem/:id', async (req, res) => {
    const productId = Number(req.params.id)
    const productIdValidated = productGetIndValidator.safeParse(productId)

    try {
        console.log(req.cookies)
    } catch (error) {
        console.log(error);

    }

    if (!productIdValidated) {
        return res.send({
            error: "id is not sent"
        })
    }

    const productInfo = await prisma.products.findFirst({
        where: {
            id: productId
        },

        include: {
            imagesUrl: true
        }
    })

    if (!productInfo) {
        return res.send({
            error: "data for this id doesn't exist in the database"
        })
    }

    console.log(productInfo);


    res.send({
        data: productInfo
    })
})


// get 10 last items
userProductRouter.post('/getnextitems', async (req, res) => {
    const lastItemInfo: allProductsLastItemType = req.body
    const lastItemIdValidated = productLastItemIdValidator.safeParse(lastItemInfo)

    if (!lastItemIdValidated.success) {
        return res.send({
            error: "send valid last id"
        })
    }

    const nextItems = await prisma.products.findMany({
        where: {
            id: {
                gt: lastItemInfo.id
            },
            category: lastItemInfo.category
        },

        include: {
            imagesUrl: true
        },

        take: 10
    })

    res.send({
        data: nextItems
    })

})