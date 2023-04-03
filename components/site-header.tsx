import Image from "next/image"
import Link from "next/link"
import { useCartStore } from "@/store"
import { ShoppingCart } from "lucide-react"

import { siteConfig } from "@/config/site"
import { cn } from "@/lib/utils"
import { Button, buttonVariants } from "@/components/ui/button"

export function SiteHeader(props: { transparent: boolean }) {
  const cartStore = useCartStore()
  const lineItemCount = cartStore.lineItems.length
  return (
    <header
      className={cn(
        props.transparent
          ? "absolute bg-transparent"
          : "sticky bg-white border-b border-gray-200",
        "top-0 z-40 w-full"
      )}
    >
      <div className="container flex h-16 items-center justify-between">
        <div className="flex">
          <Link href="/">
            <Image
              className="h-8 w-auto"
              src="/logo.svg"
              width="562"
              height="132"
              alt="Fast Growing Trees"
            />
            <span className="sr-only">{siteConfig.name}</span>
          </Link>
        </div>
        <div className="justify-end">
          <nav className="flex items-center space-x-1">
            <Button
              onClick={() => cartStore.toggleIsOpen()}
              className={buttonVariants({
                size: "sm",
                variant: "link",
                className: "text-[#005745]",
              })}
            >
              <ShoppingCart className="h-5 w-5" />
              {lineItemCount ? (
                <span className="bg-green-900 text-white text-xs px-2 rounded-full ml-2">
                  {lineItemCount}
                </span>
              ) : null}
              <span className="sr-only">Cart</span>
            </Button>
          </nav>
        </div>
      </div>
    </header>
  )
}
