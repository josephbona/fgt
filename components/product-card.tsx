import Image from "next/image"
import { Product } from "@/types"
import { slugify } from "@/lib/utils"

export function ProductCard(props: { product: Product }) {
  const { product } = props
  return (
    <a href={`/products/${slugify(product.title)}`} className="group">
      <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-lg bg-gray-200 xl:aspect-h-8 xl:aspect-w-7">
        <Image
          src={product.thumbnail.src}
          alt={product.thumbnail.alt}
          width={product.thumbnail.width}
          height={product.thumbnail.height}
          className="transition-opacity group-hover:opacity-90"
        />
      </div>
      <h3 className="mt-4 text-sm text-gray-700">{product.title}</h3>
      <p className="mt-1 text-lg font-medium text-gray-900">${product.price}</p>
    </a>
  )
}
