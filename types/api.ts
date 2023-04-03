export type HandlerResponse<T> = T | { message: string }

export interface ProductQueryParams {
  tag?: string
  product_type?: string
  limit?: number
}
