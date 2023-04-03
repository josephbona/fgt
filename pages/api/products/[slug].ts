import { NextApiRequest, NextApiResponse } from "next"
import { HandlerResponse, Product } from "@/types"

import { EXTERNAL_API_URL } from "@/lib/constants"
import { slugify } from "@/lib/utils"

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<HandlerResponse<Product>>
) {
  try {
    const response = await fetch(EXTERNAL_API_URL)
    const { products } = await response.json()

    const slug = req.query.slug as string
    const product = products.find((p) => slugify(p.title) === slug)

    if (!product) {
      return res.status(404).json({ message: "Product not found" })
    }

    return res.status(200).json(product)
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" })
  }
}
