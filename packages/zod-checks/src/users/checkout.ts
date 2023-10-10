import { number, string, z } from "zod"

export const orderItemsValidator = z.array(z.object({
    id: z.number(),
    name: z.string(),
    price: z.number(),
    description: z.string(),
    imagesUrl: z.string()
}))

export const orderAddressValidator = z.object({
    orderAddress: z.object({
        houseNo: z.string(),
        city: z.string(),
        district: z.string(),
        pin: z.string()
    })
})

export const orderDataCreationValidator = z.object({
    success: z.boolean(),
    ids: z.array(z.number()),
    address: z.object({
        houseNo: z.string(),
        city: z.string(),
        district: z.string(),
        state: z.string(),
        phone: z.string(),
        pin: z.number()
    })
})