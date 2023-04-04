import { Product } from "@/types"
import { NextSeo } from "next-seo"

import { Layout } from "@/components/layout"
import { Offers } from "@/components/offers"
import { ProductCard } from "@/components/product-card"

interface CollectionProps {
  products: Product[]
}

export default function Home({ products }: CollectionProps) {
  return (
    <Layout>
      <NextSeo
        title="All Products"
        description="Our full inventory of high quality plants and trees."
      />
      <section className="container">
        <div className="mb-4 border-b border-gray-200 pb-4 pt-10">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900">
            All products
          </h1>
          <p className="mt-4 text-base text-gray-500">
            Our full inventory of high quality plants and trees.
          </p>
        </div>
      </section>
      <section className="container py-16 pt-8">
        <div className="grid grid-cols-2 gap-x-6 gap-y-10 lg:grid-cols-4">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>
      <Offers />
    </Layout>
  )
}

export async function getStaticProps() {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/products`
  )
  const products = await response.json()

  return {
    props: {
      products,
    },
  }
}
