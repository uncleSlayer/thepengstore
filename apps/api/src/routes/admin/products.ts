import { Router } from "express";
import { productUploadValidator } from "zod-checks";
import { prisma } from '../../../prisma/index'
import { fileUpload } from 'storage'

export const adminProductRouter = Router()

// upload product api
adminProductRouter.post('/upload-item', fileUpload.array('image', 3), async (req, res) => {

    try {

        const productInfo = JSON.parse(JSON.stringify(req.body))
        const productInfoValidatd = productUploadValidator.safeParse(productInfo)

        if (!productInfoValidatd.success) {
            console.log(productInfoValidatd.error.message)
            return res.send({
                error: productInfoValidatd.error
            })
        }

        const uploadedFiles = req.files as Express.MulterS3.File[]

        if (!Array.isArray(uploadedFiles)) {
            return
        }

        try {
            const product = await prisma.products.create({
                data: {
                    name: req.body.name,
                    category: req.body.category,
                    price: parseInt(req.body.price),
                    description: req.body.description
                }
            })

            console.log('upar')
            uploadedFiles.map(async (file) => {
                console.log('andar');

                console.log(file.location)
                await prisma.imagesUrl.create({
                    data: {
                        url: file.location,
                        productsId: product.id
                    }
                })
            })
            console.log('niche')

            return res.send({
                message: 'data received'
            })

        } catch (error) {
            console.log(error);

        }
    } catch (error) {
        console.log(error);

    }

})
