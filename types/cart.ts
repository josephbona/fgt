import { Product } from "@/types"

export type LineItem = {
  product: Product
  quantity: number
}
export type Cart = {
  lineItems: LineItem[]
  total: number
}
