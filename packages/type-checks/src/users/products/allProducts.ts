import { z } from "zod"
import { productLastItemIdValidator } from "zod-checks"

export type allProductsLastItemType = z.infer<typeof productLastItemIdValidator>
export type productsArrayType = {
    id: number,
    name: string,
    price: number,
    description: string,
    imagesUrl: string
}