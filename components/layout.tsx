import { SiteFooter } from "@/components/site-footer"
import { SiteHeader } from "@/components/site-header"

interface LayoutProps {
  children: React.ReactNode
  transparentHeader?: boolean
}

export function Layout({ children, transparentHeader }: LayoutProps) {
  return (
    <>
      <SiteHeader transparent={transparentHeader} />
      <main>{children}</main>
      <SiteFooter />
    </>
  )
}
