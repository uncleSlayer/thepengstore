import { z } from "zod"
import { userAuthValidator } from "zod-checks"
import { userLoginValidator } from "zod-checks"

export type userSignupType = z.infer<typeof userAuthValidator>
export type userLoginType = z.infer<typeof userLoginValidator>