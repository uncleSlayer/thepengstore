import { z } from "zod"
import { ProductCategory } from 'prisma/prisma-client'

export const productGetIndValidator = z.number()
export const productLastItemIdValidator = z.object({
    id: z.number(),
    category: z.nativeEnum(ProductCategory)
})