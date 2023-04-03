import Image from "next/image"
import Link from "next/link"
import { ShoppingCart } from "lucide-react"

import { siteConfig } from "@/config/site"
import { buttonVariants } from "@/components/ui/button"
import { cn } from "@/lib/utils"

export function SiteHeader(props: { transparent: boolean }) {
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
            <Link href="/cart">
              <div
                className={buttonVariants({
                  size: "sm",
                  variant: "ghost",
                  className: "text-[#005745]",
                })}
              >
                <ShoppingCart className="h-5 w-5" />
                <span className="sr-only">Cart</span>
              </div>
            </Link>
          </nav>
        </div>
      </div>
    </header>
  )
}
