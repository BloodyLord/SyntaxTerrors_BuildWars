"use client"

import { useState } from "react"
import { ArrowLeft, Search } from "lucide-react"
import { useRouter } from "next/navigation"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import MobileFooter from "@/components/mobile-footer"

// Mock data for mandi prices
const mandiPrices = [
  { id: 1, crop: "Wheat", market: "Azadpur Mandi, Delhi", price: "₹2,015 per quintal" },
  { id: 2, crop: "Rice", market: "Ghazipur Mandi, Delhi", price: "₹1,868 per quintal" },
  { id: 3, crop: "Cotton", market: "Khanna Mandi, Punjab", price: "₹6,380 per quintal" },
  { id: 4, crop: "Sugarcane", market: "Hapur Mandi, UP", price: "₹285 per quintal" },
  { id: 5, crop: "Maize", market: "Patna Mandi, Bihar", price: "₹1,870 per quintal" },
  { id: 6, crop: "Soybean", market: "Indore Mandi, MP", price: "₹3,950 per quintal" },
  { id: 7, crop: "Potato", market: "Agra Mandi, UP", price: "₹1,250 per quintal" },
  { id: 8, crop: "Onion", market: "Lasalgaon Mandi, Maharashtra", price: "₹1,450 per quintal" },
  { id: 9, crop: "Tomato", market: "Kolar Mandi, Karnataka", price: "₹1,850 per quintal" },
  { id: 10, crop: "Mustard", market: "Alwar Mandi, Rajasthan", price: "₹4,250 per quintal" },
]

export default function MandiPricePage() {
  const [language, setLanguage] = useState("en") // Default language is English
  const [searchTerm, setSearchTerm] = useState("")
  const router = useRouter()

  // Translations
  const translations = {
    en: {
      title: "Mandi Prices",
      search: "Search crop or market",
      crop: "Crop",
      market: "Market",
      price: "Price",
    },
    hi: {
      title: "मंडी मूल्य",
      search: "फसल या मंडी खोजें",
      crop: "फसल",
      market: "मंडी",
      price: "मूल्य",
    },
  }

  const t = translations[language as keyof typeof translations]

  // Filter mandi prices based on search term
  const filteredPrices = mandiPrices.filter(
    (item) =>
      item.crop.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.market.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  return (
    <div className="min-h-screen bg-[#f8f9fa] flex flex-col">
      {/* Header */}
      <header className="bg-[#2e7d32] text-white p-4 shadow-md">
        <div className="container mx-auto flex items-center">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => router.back()}
            className="mr-2 text-white hover:bg-white/20 h-8 w-8 rounded-full"
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <h1 className="text-xl font-semibold">{t.title}</h1>
        </div>
      </header>

      <main className="container mx-auto px-4 py-6 flex-1 mb-16">
        {/* Search */}
        <div className="relative mb-6">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input
            type="text"
            placeholder={t.search}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 rounded-full border-gray-200"
          />
        </div>

        {/* Mandi Prices List */}
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          <div className="grid grid-cols-3 p-3 border-b text-sm font-medium text-gray-500">
            <div>{t.crop}</div>
            <div>{t.market}</div>
            <div className="text-right">{t.price}</div>
          </div>
          <div className="divide-y">
            {filteredPrices.map((item) => (
              <div key={item.id} className="grid grid-cols-3 p-3 text-sm">
                <div className="font-medium">{item.crop}</div>
                <div className="text-gray-600">{item.market}</div>
                <div className="text-right font-medium">{item.price}</div>
              </div>
            ))}
            {filteredPrices.length === 0 && <div className="p-4 text-center text-gray-500">No results found</div>}
          </div>
        </div>
      </main>

      {/* Mobile Footer */}
      <MobileFooter language={language} />
    </div>
  )
}

