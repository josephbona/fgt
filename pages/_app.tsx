import type { AppProps } from "next/app"
import { Inter as FontSans } from "@next/font/google"

import "@/styles/globals.css"
import { useEffect } from "react"
import { useRouter } from "next/router"
import { useCartStore } from "@/store"
import { DefaultSeo } from "next-seo"

import SEO from "@/config/seo"

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
})

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter()
  const cartStore = useCartStore()
  useEffect(() => {
    cartStore.close()
  }, [router.asPath])
  return (
    <>
      <DefaultSeo {...SEO} />
      <style jsx global>{`
				:root {
					--font-sans: ${fontSans.style.fontFamily};
				}
			}`}</style>
      <Component {...pageProps} />
    </>
  )
}
