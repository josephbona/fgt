import { LineItem, Product } from "@/types"
import { ClassValue, clsx } from "clsx"
import { default as _slugify } from "slugify"
import { twMerge } from "tailwind-merge"
import { PLANTING_KIT_ID } from "../constants"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function slugify(input: string) {
  return _slugify(input, {
    lower: true,
    trim: true,
  })
}

export function formatCurrency(amount: string | number) {
  return amount.toLocaleString("en-US", { style: "currency", currency: "USD" })
}

export function filterUpsells({ upsells, lineItems }: { upsells: Product[], lineItems: LineItem[] }) {
  const treesInCart = lineItems.filter((item) => item.product.product_type.toLowerCase() === 'tree')
  const treeCount = treesInCart.reduce((total, item) => total + Number(item.quantity), 0)
  const filteredProducts = upsells.filter((product) => {
    if (product.id === PLANTING_KIT_ID && treeCount > lineItems.find((item) => item.product.id === PLANTING_KIT_ID)?.quantity) {
      return true
    } else {
      return !lineItems.find((item) => item.product.id === product.id)
    }
  })
  return filteredProducts
}