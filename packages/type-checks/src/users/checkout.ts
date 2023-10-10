import { orderItemsValidator, orderDataCreationValidator } from "zod-checks";
import { z } from "zod"

export type orderItemsType = z.infer<typeof orderItemsValidator>
export type orderDataCreationType = z.infer<typeof orderDataCreationValidator> 