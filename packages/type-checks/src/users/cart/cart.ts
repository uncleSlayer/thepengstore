import { addToCartValidator } from "zod-checks";
import { z } from "zod"

export type addToCartType = z.infer<typeof addToCartValidator>