import { NavItem } from "@/types/nav"

interface SiteConfig {
  name: string
  description: string
  mainNav: NavItem[]
}

export const siteConfig: SiteConfig = {
  name: "Fast Growing Trees",
  description:
    "Bring the perfect plant home with FastGrowingTrees.com. Find privacy trees, house plants, fruit trees and more with free shipping on orders over $129.",
  mainNav: [
    {
      title: "Home",
      href: "/",
    },
  ],
}
