"use client"

import { useRouter, usePathname } from "next/navigation"
import { Leaf, BarChart2, Cloud, User } from "lucide-react"

interface MobileFooterProps {
  language: string
}

export default function MobileFooter({ language }: MobileFooterProps) {
  const router = useRouter()
  const pathname = usePathname()

  // Translations
  const translations = {
    en: {
      myCrops: "My Crops",
      mandiPrice: "Mandi Price",
      weather: "Weather",
      profile: "Profile",
    },
    hi: {
      myCrops: "मेरी फसलें",
      mandiPrice: "मंडी मूल्य",
      weather: "मौसम",
      profile: "प्रोफाइल",
    },
  }

  const t = translations[language as keyof typeof translations]

  const menuItems = [
    { name: t.myCrops, icon: Leaf, path: "/" },
    { name: t.mandiPrice, icon: BarChart2, path: "/mandi-price" },
    { name: t.weather, icon: Cloud, path: "/weather" },
    { name: t.profile, icon: User, path: "/profile" },
  ]

  return (
    <footer className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-sm">
      <div className="flex justify-around items-center h-16">
        {menuItems.map((item) => {
          const isActive = pathname === item.path
          return (
            <button
              key={item.path}
              className="flex flex-col items-center justify-center w-full h-full"
              onClick={() => router.push(item.path)}
            >
              <item.icon className={`h-5 w-5 mb-1 ${isActive ? "text-[#2e7d32]" : "text-gray-500"}`} />
              <span className={`text-xs ${isActive ? "text-[#2e7d32] font-medium" : "text-gray-500"}`}>
                {item.name}
              </span>
            </button>
          )
        })}
      </div>
    </footer>
  )
}

