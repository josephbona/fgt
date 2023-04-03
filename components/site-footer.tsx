import Image from "next/image"
import Link from "next/link"
import { ShoppingCart } from "lucide-react"

import { siteConfig } from "@/config/site"
import { buttonVariants } from "@/components/ui/button"

export function SiteFooter() {
  return (
    <footer className="bg-[#005745] py-6 border-t border-green-700">
      <p className="text-xs text-green-100 text-center">
        &copy; {new Date().getFullYear()} {siteConfig.name}. All rights
        reserved.
      </p>
    </footer>
  )
}
