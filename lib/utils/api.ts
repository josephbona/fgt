import { Product, ProductQueryParams } from "@/types";
import { slugify } from "../utils";

export function filterProductsByQueryParams(
  products: Product[],
  queryParams: ProductQueryParams
): Product[] {
  // Filter by tag
  const filteredProducts = queryParams.tag
    ? products.filter((p) =>
        p.tags.toLowerCase().includes(queryParams.tag!.toLowerCase())
      )
    : products

  // Filter by product_type
  const filteredProductsByType = queryParams.product_type
    ? filteredProducts.filter(
        (p) =>
          p.product_type.toLowerCase() ===
          queryParams.product_type!.toLowerCase()
      )
    : filteredProducts

  // Limit products returned
  const limitedProducts = queryParams.limit
    ? filteredProductsByType.slice(0, queryParams.limit)
    : filteredProductsByType

  return limitedProducts
}
