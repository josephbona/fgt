import { GetStaticPaths, GetStaticProps } from 'next'
import { useRouter } from 'next/router'
import Image from 'next/image'
import { Product } from '@/types'
import { Layout } from '@/components/layout'
import { slugify } from '@/lib/utils'

type Props = {
  product: Product
}

const ProductPage = ({ product }: Props) => {
  const router = useRouter()

  if (router.isFallback) {
    return <div>Loading...</div>
  }

  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="md:flex md:items-center md:justify-between">
          <div className="flex-1 min-w-0">
            <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl mb-4">
              {product.title}
            </h1>
            <div className="flex justify-between items-center mb-4">
              <span className="text-gray-500 font-medium">{product.product_type}</span>
              <span className="text-gray-400">{product.price}</span>
            </div>
            <div className="prose max-w-none">
              <p>{product.body}</p>
            </div>
          </div>
          <div className="md:flex-shrink-0">
            <Image
              src={product.thumbnail.src}
              alt={product.thumbnail.alt}
              width={product.thumbnail.width}
              height={product.thumbnail.height}
              className="object-cover object-center w-full rounded-lg"
            />
          </div>
        </div>
      </div>
    </Layout>
  )
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const slug = params?.slug as string
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || "http://0.0.0.0:3000"}/api/products/${slug}`)
  const product = await response.json()

  if (!product) {
    return {
      notFound: true
    }
  }

  return {
    props: {
      product
    },
    revalidate: 60 // regenerate the page every 60 seconds (1 minute) on the server
  }
}

export const getStaticPaths: GetStaticPaths = async () => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || "http://0.0.0.0:3000"}/api/products`)
  const products = await response.json()

  const paths = products.map((product: Product) => ({
    params: { slug: slugify(product.title) }
  }))

  return {
    paths,
    fallback: true // show fallback page for uncached paths
  }
}

export default ProductPage
