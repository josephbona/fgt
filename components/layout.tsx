import { useCartStore } from "@/store"

import { SiteFooter } from "@/components/site-footer"
import { SiteHeader } from "@/components/site-header"
import { CartSheet } from "./cart-sheet"

interface LayoutProps {
  children: React.ReactNode
  transparentHeader?: boolean
}

export function Layout({ children, transparentHeader }: LayoutProps) {
  const cartStore = useCartStore()
  return (
    <>
      <SiteHeader transparent={transparentHeader} />
      <main>{children}</main>
      <SiteFooter />
      <CartSheet />
    </>
  )
}
