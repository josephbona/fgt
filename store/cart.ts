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
        const itemQuantity = Number(lineItem.quantity);
        const itemPrice = Number(lineItem.product.price);
      
        if (existingLineItem) {
          set((state) => ({
            lineItems: state.lineItems.map((item) =>
              item.product.id === existingLineItem.product.id
                ? {
                    ...item,
                    quantity: Number(item.quantity) + itemQuantity,
                  }
                : item
            ),
            total: Math.round(
              (state.total +
                existingLineItem.product.price * itemQuantity) * 100
            ) / 100,
          }))
        } else {
          set((state) => ({
            lineItems: [...state.lineItems, lineItem],
            total: Math.round((state.total + itemPrice * itemQuantity) * 100) / 100,
          }))
        }
      },
      removeFromCart: (productId) => {
        const lineItem = get().lineItems.find(
          (item) => item.product.id === productId
        );
        const itemQuantity = Number(lineItem?.quantity) || 0;
        const itemPrice = Number(lineItem?.product.price) || 0;
      
        set((state) => ({
          lineItems: state.lineItems.filter(
            (item) => item.product.id !== productId
          ),
          total: Math.round((state.total - itemPrice * itemQuantity) * 100) / 100,
        }))
      },
    }),
    {
      name: "cart",
    }
  )
)
