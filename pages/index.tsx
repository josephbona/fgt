import Link from "next/link"
import { Product } from "@/types"

import { Hero } from "@/components/hero"
import { Layout } from "@/components/layout"
import { Offers } from "@/components/offers"
import { ProductCard } from "@/components/product-card"

interface HomeProps {
  products: Product[]
}

export default function Home({ products }: HomeProps) {
  return (
    <Layout transparentHeader>
      <Hero products={products} />
      <Offers />
      <section className="container py-16">
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-2xl font-bold">Featured Products</h2>
          <Link href="/collections/all">Shop all</Link>
        </div>
        <div className="grid grid-cols-2 gap-x-6 gap-y-10 lg:grid-cols-4">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>
    </Layout>
  )
}

export async function getStaticProps() {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/products?limit=8`
  )
  const products = await response.json()

  return {
    props: {
      products,
    },
  }
}
