import Head from "next/head"
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
    <Layout>
      <Head>
        <title>My Next.js App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
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

export async function getServerSideProps() {
  const response = await fetch(
    `${
      process.env.NEXT_PUBLIC_API_URL || "http://0.0.0.0:3000"
    }/api/products?limit=8`
  )
  const products = await response.json()

  return {
    props: {
      products,
    },
  }
}
