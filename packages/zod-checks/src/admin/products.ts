import { z } from "zod"

export const productUploadValidator = z.object({
    name: z.string(),
    price: z.number(),
    description: z.string(),
    imageUrl: z.string()
})

