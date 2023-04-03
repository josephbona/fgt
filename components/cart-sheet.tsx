import { useCartStore } from "@/store"

import { Cart, CartSummary, FreeShippingProgress } from "@/components/cart"
import {
  Sheet,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet"

export function CartSheet() {
  const cartStore = useCartStore()
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
          <CartSummary total={cartStore.total} />
        </SheetFooter>
      </SheetContent>
    </Sheet>
  )
}
