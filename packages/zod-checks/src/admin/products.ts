import { z } from "zod"
import { ProductCategory } from "prisma/prisma-client"

export const productUploadValidator = z.object({
    name: z.string(),
    price: z.string(),
    description: z.string(),
    category: z.nativeEnum(ProductCategory)
})

