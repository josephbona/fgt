import { siteConfig } from "@/config/site"

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
