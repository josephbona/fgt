import { CSSProperties } from "react"
import { GetStaticPaths, GetStaticProps } from "next"
import Image from "next/image"
import { useRouter } from "next/router"
import { useCartStore } from "@/store"
import { Product } from "@/types"

import { cn, slugify } from "@/lib/utils"
import { Layout } from "@/components/layout"
import { Offers } from "@/components/offers"
import { Button } from "@/components/ui/button"

type Props = {
  product: Product
}

const ProductPage = ({ product }: Props) => {
  const router = useRouter()
  const cartStore = useCartStore()

  if (router.isFallback) {
    return <div>Loading...</div>
  }

  async function handleSubmit(e) {
    e.preventDefault()
    const formData = new FormData(e.target)
    const quantity = formData.get('quantity')
    const lineItem = { product, quantity: Number(quantity) }
    cartStore.addToCart(lineItem)
    cartStore.toggleIsOpen()
  }

  return (
    <Layout>
      <div className="container pt-6 pb-16 lg:py-16">
        <div className="lg:grid lg:auto-rows-min lg:grid-cols-12 lg:gap-x-8">
          <div className="lg:col-span-6 lg:col-start-7">
            <div className="flex items-center justify-between">
              <h1 className="text-xl sm:text-2xl font-medium text-gray-900">
                {product.title}
              </h1>
              <p className="text-xl font-medium text-gray-900">
                ${product.price}
              </p>
            </div>
          </div>
          <div className="mt-8 lg:col-span-6 lg:col-start-1 lg:row-span-3 lg:row-start-1 lg:mt-0">
            <h2 className="sr-only">Images</h2>
            <div
              style={
                {
                  "--grid-cols": `repeat(${product.images.length}, minmax(300px, 1fr))`,
                } as CSSProperties
              }
              className={cn(
                `grid-cols-[var(--grid-cols)]`,
                "snap-x snap-mandatory gap-4 overflow-x-auto sm:gap-0 grid sm:grid-cols-1 lg:grid-cols-2 lg:grid-rows-3 lg:gap-8"
              )}
            >
              {product.images.map((image, idx) => (
                <Image
                  key={image.id}
                  src={image.src}
                  alt={image.alt}
                  width={image.width}
                  height={image.height}
                  className={cn(
                    idx === 0 && "lg:col-span-2 lg:row-span-2",
                    "snap-start col-span-1 rounded-lg"
                  )}
                />
              ))}
            </div>
          </div>
          <div className="lg:col-span-6">
            <div className="mt-8 border-t border-gray-200 pt-8">
              <div className="prose prose-sm text-gray-500 ">
                <p>{product.body}</p>
              </div>
              <form className="mt-8" onSubmit={handleSubmit}>
                <input name="quantity" type="hidden" value='1' />
                <Button type="submit" className="w-full">
                  Add to cart
                </Button>
              </form>
            </div>
          </div>
        </div>
      </div>
      <Offers />
    </Layout>
  )
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const slug = params?.slug as string
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/products/${slug}`
  )
  const product = await response.json()

  if (!product) {
    return {
      notFound: true,
    }
  }

  return {
    props: {
      product,
    },
    revalidate: 60, // regenerate the page every 60 seconds (1 minute) on the server
  }
}

export const getStaticPaths: GetStaticPaths = async () => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/products`
  )
  const products = await response.json()

  const paths = products.map((product: Product) => ({
    params: { slug: slugify(product.title) },
  }))

  return {
    paths,
    fallback: true, // show fallback page for uncached paths
  }
}

export default ProductPage
