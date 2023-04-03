import { NextApiRequest, NextApiResponse } from "next"
import { HandlerResponse, Product } from "@/types"
import { slugify } from "@/lib/utils"

const API_URL =
  "https://take-home-challenge.s3.amazonaws.com/challenge/FGT-Frontend-Take-Home.json"

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<HandlerResponse<Product>>
) {
  try {
    const response = await fetch(API_URL)
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
