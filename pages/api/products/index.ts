import { NextApiRequest, NextApiResponse } from "next"
import { HandlerResponse, Product } from "@/types"

import { EXTERNAL_API_URL } from "@/lib/constants"
import { filterProductsByQueryParams } from "@/lib/utils"

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<HandlerResponse<Product[]>>
) {
  if (req.method === "GET") {
    try {
      const response = await fetch(EXTERNAL_API_URL)
      const { products } = await response.json()

      const filteredProducts = filterProductsByQueryParams(products, req.query)
      res.status(200).json(filteredProducts)
    } catch (error) {
      res.status(500).json({ message: "Internal Server Error" })
    }
  } else {
    res.status(405).json({ message: "Method Not Allowed" })
  }
}
