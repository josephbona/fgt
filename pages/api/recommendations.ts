import { NextApiRequest, NextApiResponse } from "next"
import { HandlerResponse } from "@/types"

import { Product } from "@/types/product"
import { EXTERNAL_API_URL } from "@/lib/constants"

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<HandlerResponse<Product[]>>
) {
  if (req.method === "GET") {
    try {
      const response = await fetch(EXTERNAL_API_URL)
      const { recommendations } = await response.json()

      res.status(200).json(recommendations)
    } catch (error) {
      res.status(500).json({ message: "Internal Server Error" })
    }
  } else {
    res.status(405).json({ message: "Method Not Allowed" })
  }
}
