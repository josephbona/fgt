import { Cart, LineItem } from "@/types"
import { create } from "zustand"
import { persist } from "zustand/middleware"

type CartStore = Cart & {
  isOpen: boolean
  toggleIsOpen: () => void
  close: () => void
  addToCart: (lineItem: LineItem) => void
  removeFromCart: (productId: number) => void
}

export const useCartStore = create<CartStore>()(
  persist<CartStore>(
    (set, get) => ({
      isOpen: false,
      toggleIsOpen: () => set((state) => ({ ...state, isOpen: !get().isOpen })),
      close: () => set((state) => ({ ...state, isOpen: false })),
      lineItems: [],
      total: 0,
      addToCart: (lineItem) => {
        const existingLineItem = get().lineItems.find(
          (item) => item.product.id === lineItem.product.id
        )
        if (existingLineItem) {
          set((state) => ({
            lineItems: state.lineItems.map((item) =>
              item.product.id === existingLineItem.product.id
                ? {
                    ...item,
                    quantity: Number(item.quantity) + Number(lineItem.quantity),
                  }
                : item
            ),
            total:
              state.total +
              existingLineItem.product.price * Number(lineItem.quantity),
          }))
        } else {
          set((state) => ({
            lineItems: [...state.lineItems, lineItem],
            total:
              state.total + lineItem.product.price * Number(lineItem.quantity),
          }))
        }
      },
      removeFromCart: (productId) => {
        set((state) => ({
          lineItems: state.lineItems.filter(
            (item) => item.product.id !== productId
          ),
          total:
            state.total -
            get().lineItems.find((item) => item.product.id === productId)
              ?.product.price *
              Number(
                get().lineItems.find((item) => item.product.id === productId)
                  ?.quantity
              ),
        }))
      },
    }),
    {
      name: "cart",
    }
  )
)
