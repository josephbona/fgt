import { NextApiRequest, NextApiResponse } from "next"
import { HandlerResponse } from "@/types"

import { Product } from "@/types/product"

const API_URL =
  "https://take-home-challenge.s3.amazonaws.com/challenge/FGT-Frontend-Take-Home.json"
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<HandlerResponse<Product[]>>
) {
  if (req.method === "GET") {
    try {
      const response = await fetch(API_URL)
      const { recommendations } = await response.json()

      // TODO: Do custom logic here. Maybe support a cart body to do the logic?

      res.status(200).json(recommendations)
    } catch (error) {
      res.status(500).json({ message: "Internal Server Error" })
    }
  } else {
    res.status(405).json({ message: "Method Not Allowed" })
  }
}
