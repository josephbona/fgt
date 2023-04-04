import { useEffect, useState } from "react"
import { useCartStore } from "@/store"
import { Product } from "@/types"

import {
  Cart,
  CartSummary,
  CartUpsells,
  FreeShippingProgress,
} from "@/components/cart"
import {
  Sheet,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet"

export function CartSheet() {
  const [recommendations, setRecommendations] = useState<Product[]>([])
  const cartStore = useCartStore()
  useEffect(() => {
    async function fetchRecommendations() {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/recommendations`
      )
      const products = await response.json()
      setRecommendations(products)
    }

    fetchRecommendations()
  }, [])
  return (
    <Sheet open={cartStore.isOpen} onOpenChange={cartStore.toggleIsOpen}>
      <SheetContent
        size="content"
        className="p-0 w-[100vw] sm:w-96 flex h-full flex-col overflow-y-scroll bg-white"
      >
        <SheetHeader className="p-4 pb-0">
          <SheetTitle>Shopping Cart</SheetTitle>
          <FreeShippingProgress value={cartStore.total} />
        </SheetHeader>
        <div className="flex-1 overflow-y-auto px-4">
          <Cart />
        </div>
        <SheetFooter>
          <CartUpsells products={recommendations} />
          <CartSummary total={cartStore.total} />
        </SheetFooter>
      </SheetContent>
    </Sheet>
  )
}
