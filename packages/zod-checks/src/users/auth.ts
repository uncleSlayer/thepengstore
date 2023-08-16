import { z } from "zod"

export const userAuthValidator = z.object({
    email: z.string(),
    password: z.string(),
    rePassword: z.string().min(6).max(20)
})

export const userLoginValidator = z.object({
    email: z.string(),
    password: z.string()
})