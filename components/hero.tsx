import Image from "next/image"
import Link from "next/link"
import { Product } from "@/types"
import { StarIcon } from "lucide-react"

import { slugify } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"

function SocialProof() {
  return (
    <div className="mb-3 flex items-center">
      <div className="flex items-center">
        {[0, 1, 2, 3, 4].map((rating) => (
          <StarIcon
            key={rating}
            className="h-5 w-5 shrink-0 fill-yellow-500 text-yellow-500"
            aria-hidden="true"
          />
        ))}
      </div>
      <p className="ml-2 text-sm text-gray-700">
        Over 1.5 million happy customers!
      </p>
    </div>
  )
}
export function HeroProductImage(props: { product: Product }) {
  const { product } = props
  return (
    <Link
      href={`/products/${slugify(product.title)}`}
      className="h-64 w-44 overflow-hidden rounded-lg bg-gray-100 transition-opacity sm:opacity-0 lg:opacity-100 lg:hover:opacity-90"
    >
      <Image
        src={product.thumbnail.src}
        alt={product.thumbnail.alt}
        width={product.thumbnail.width}
        height={product.thumbnail.height}
        className="h-full w-full object-cover object-center"
      />
    </Link>
  )
}
export function Hero(props: { products: Product[] }) {
  return (
    <div className="relative overflow-hidden bg-green-50">
      <div className="lg:pb-42 pb-80 pt-28 sm:py-40 lg:pt-64">
        <div className="container relative z-10 px-4 sm:static">
          <div className="sm:max-w-lg">
            {/* <SocialProof /> */}
            <h1 className="font text-4xl font-bold tracking-tight text-green-900 sm:text-5xl">
              Trees & plants, directly to your door.
            </h1>
            <p className="mt-4 text-xl text-gray-700">
              We’re committed to providing you with plants you can trust that
              will enhance your home, inside and out.
            </p>
          </div>
          <div>
            <div className="mt-10">
              <div
                aria-hidden="true"
                className="lg:absolute lg:inset-y-0 lg:mx-auto lg:w-full lg:max-w-7xl"
              >
                <div className="absolute sm:left-1/2 sm:top-0 sm:translate-x-8 lg:left-1/2 lg:top-1/2 lg:-translate-y-1/2 lg:translate-x-8">
                  <div className="flex items-center space-x-6 lg:space-x-8">
                    <div className="grid shrink-0 grid-cols-1 gap-y-6 lg:gap-y-8">
                      {props.products.slice(0, 2).map((product) => (
                        <HeroProductImage key={product.id} product={product} />
                      ))}
                    </div>
                    <div className="grid shrink-0 grid-cols-1 gap-y-6 lg:gap-y-8">
                      {props.products.slice(3, 6).map((product) => (
                        <HeroProductImage key={product.id} product={product} />
                      ))}
                    </div>
                    <div className="grid shrink-0 grid-cols-1 gap-y-6 lg:gap-y-8">
                      {props.products.slice(6, 8).map((product) => (
                        <HeroProductImage key={product.id} product={product} />
                      ))}
                    </div>
                  </div>
                </div>
              </div>
              <Link
                href="/collections/all"
                className={buttonVariants({
                  size: "lg",
                  variant: "default",
                  className: "relative z-10",
                })}
              >
                Shop Collection
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
