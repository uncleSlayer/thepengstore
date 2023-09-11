import { Router } from "express";
import { productUploadValidator } from "zod-checks";
import { prisma } from "database"

export const adminProductRouter = Router()

// upload product api
adminProductRouter.post('/upload-item', async (req, res) => {
    const productInfo = req.body.productInfo
    const productInfoValidatd = productUploadValidator.safeParse(productInfo)

    if (!productInfoValidatd.success) {
        console.log(productInfoValidatd.error.message)
        return res.send({
            error: "informations supplied are not valid"
        })
    }


    await prisma.products.create({
        data: {
            name: productInfo.name,
            description: productInfo.description,
            price: productInfo.price,
            imagesUrl: productInfo.imageUrl
        }
    })
        .then(() => {
            res.send({
                message: "product created"
            })
        })
        .catch((err: Error) => {
            res.send({
                error: err
            })
        })
})
