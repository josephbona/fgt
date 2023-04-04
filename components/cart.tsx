import Image from "next/image"
import { useCartStore } from "@/store"

import { filterUpsells, formatCurrency, slugify } from "@/lib/utils"
import { LineItem, Product } from "@/types"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { FREE_SHIPPING_THRESHOLD } from "@/lib/constants"
import Link from "next/link"
import { PlusCircle } from "lucide-react"

export function FreeShippingProgress({ value = 0 }: { value: number }) {
  const amountRemaining = FREE_SHIPPING_THRESHOLD - value
  return (
    <>
      <p className="mb-1 text-center text-sm text-gray-500">{value < FREE_SHIPPING_THRESHOLD ? `${formatCurrency(amountRemaining)} left to free shipping` : 'Free shipping!'}</p>
      <Progress value={value < FREE_SHIPPING_THRESHOLD ? (value / FREE_SHIPPING_THRESHOLD) * 100 : 100} />
    </>
  )
}
export function LineItem({ lineItem }: { lineItem: LineItem }) {
  const cartStore = useCartStore()
  return (
    <li key={lineItem.product.id} className="flex py-6">
      <div className="h-24 w-24 shrink-0 overflow-hidden rounded-md border border-gray-200">
        <Image
          src={lineItem.product.thumbnail.src}
          alt={lineItem.product.thumbnail.alt}
          width={lineItem.product.thumbnail.width}
          height={lineItem.product.thumbnail.height}
          className="h-full w-full object-cover object-center"
        />
      </div>

      <div className="ml-4 flex flex-1 flex-col">
        <div className="flex justify-between text-base font-medium text-gray-900">
          <h3>
            <Link href={`/products/${slugify(lineItem.product.title)}`}>
              {lineItem.product.title}
            </Link>
          </h3>
          <p className="ml-4">${lineItem.product.price}</p>
        </div>
        <div className="flex flex-1 justify-between text-sm items-end">
          <p className="text-gray-500">Qty {lineItem.quantity}</p>

          <div className="flex">
            <Button
              variant="link"
              className="text-red-600 hover:underline p-0 h-auto"
              onClick={() => cartStore.removeFromCart(lineItem.product.id)}
            >
              Remove
            </Button>
          </div>
        </div>
      </div>
    </li>
  )
}
export function Cart() {
  const cartStore = useCartStore()

  return (
    <div className="mt-8">
      {!cartStore.lineItems.length ? (
        <p className="text-center">Nothing in your cart.</p>
      ) : (
        <div className="flow-root">
          <ul role="list" className="-my-6 divide-y divide-gray-200">
            {cartStore.lineItems.map((lineItem) => (
              <LineItem key={lineItem.product.id} lineItem={lineItem} />
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}
export function CartSummary({ total = 0 }: { total: number }) {
  if (!total) return null
  return (
    <div className="border-t border-gray-200 p-4">
      <div className="flex justify-between text-base font-medium text-gray-900">
        <p>Subtotal</p>
        <p>{formatCurrency(total)}</p>
      </div>
      <div className="mt-6">
        <Button variant="default" className="w-full">
          Checkout
        </Button>
      </div>
    </div>
  )
}

export function CartUpsell({ product }: { product: Product }) {
  const cartStore = useCartStore()
  function handleAddUpsell(product) {
    cartStore.addToCart({ product, quantity: 1 })
  }
  return (
    <li className="flex items-start py-2">
      <Image
        src={product.thumbnail.src}
        alt={product.thumbnail.alt}
        width={200}
        height={200}
        className="h-16 w-16 flex-none rounded-md border border-gray-200"
      />
      <div className="ml-4 flex-auto">
        <h3 className="font-medium text-gray-900">
          <Link href={`/products/${slugify(product.title)}`}>{product.title}</Link>
        </h3>
      </div>
      <Button size="xs" onClick={() => handleAddUpsell(product)}><PlusCircle className="w-4 h-4 mr-2" />Add</Button>
    </li>
  )
}

export function CartUpsells({ products }: { products: Product[] }) {
  const cartStore = useCartStore()
  const filteredProducts = filterUpsells({ upsells: products, lineItems: cartStore.lineItems })

  if (!filteredProducts.length) return null
  return (
    <div className="px-4">
      <h3 className="text-base font-semibold text-slate-900 mb-2">Recommended for you:</h3>
      <ul role="list" className="divide-y divide-gray-200">
        {filteredProducts.map((product) => <CartUpsell key={product.id} product={product} />)}
      </ul>
    </div>
  )
}