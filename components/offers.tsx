const offers = [
  {
    name: "Healthy plants, guaranteed",
    description: "Every plant is backed by our 30-day guarantee",
    href: "#",
  },
  {
    name: "Free shipping on orders over $129",
    description: "Superior trees and plants delivered to your door",
    href: "#",
  },
  {
    name: "Quality, convenience & support",
    description: "Join over 1.5 million happy customers",
    href: "#",
  },
]

export function Offers() {
  return (
    <nav aria-label="Offers" className="bg-[#005745] lg:py-6">
      <div className="container lg:px-8">
        <ul
          role="list"
          className="grid grid-cols-1 divide-y divide-green-700 lg:grid-cols-3 lg:divide-x lg:divide-y-0"
        >
          {offers.map((offer) => (
            <li key={offer.name} className="flex flex-col">
              <a
                href={offer.href}
                className="relative flex flex-1 flex-col justify-center p-4 text-center focus:z-10 lg:py-2"
              >
                <p className="font-semibold text-white">{offer.name}</p>
                <p className="text-sm text-green-100">{offer.description}</p>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  )
}
