import { NextApiRequest, NextApiResponse } from "next"
import { HandlerResponse, Product } from "@/types"
import { filterProductsByQueryParams } from "@/lib/utils"

const API_URL =
  "https://take-home-challenge.s3.amazonaws.com/challenge/FGT-Frontend-Take-Home.json"

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<HandlerResponse<Product[]>>
) {
  if (req.method === "GET") {
    try {
      const response = await fetch(API_URL)
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
