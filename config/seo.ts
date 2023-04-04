import { DefaultSeoProps } from "next-seo"

import { siteConfig } from "./site"

const config: DefaultSeoProps = {
  title: "Buy Trees Online",
  titleTemplate: "%s | Fast Growing Trees",
  description: siteConfig.description,
  openGraph: {
    type: "website",
    locale: "en_US",
    url: process.env.NEXT_PUBLIC_API_URL,
    siteName: siteConfig.name,
    images: [
      {
        url: 'https://cdn.shopify.com/s/files/1/0059/8835/2052/files/fgt-social-logo.png',
        width: 1200,
        height: 628,
        alt: 'Fast Growing Trees',
      },
    ],
  },
  themeColor: "#005745",
}

export default config
