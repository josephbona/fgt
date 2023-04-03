export type Image = {
  id: number
  product_id: number
  created_at: string
  updated_at: string
  alt: string | null
  width: number
  height: number
  src: string
  variant_ids: number[]
}

export type Product = {
  id: number
  title: string
  body: string
  vendor: string
  product_type: string
  price: number
  tags: string
  images: Image[]
  thumbnail: Image
}
