"use client"

import { useState, useEffect } from "react"
import { ArrowLeft, Search, MapPin, ChevronDown, Info, ArrowRight, Leaf } from "lucide-react"
import { useRouter } from "next/navigation"
import type { NextPage } from "next"
import Image from "next/image"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import MobileFooter from "@/components/mobile-footer"
import { Card, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import LanguageToggler from "@/components/language-toggler"

// Types for API response
interface MandiRecord {
  State: string
  District: string
  Market: string
  Commodity: string
  Variety: string
  Grade: string
  Arrival_Date: string
  Min_Price: string
  Max_Price: string
  Modal_Price: string
  Commodity_Code: string
}

interface ApiResponse {
  records: MandiRecord[]
  total: number
  count: number
  limit: string
  offset: string
}

// Crop images and descriptions
const cropDetails: Record<string, { image: string; description: string }> = {
  "Paddy(Dhan)(Common)": {
    image: "/crops/paddy.jpg",
    description: "Common paddy rice, a staple food crop grown in water-logged fields.",
  },
  "Wheat": {
    image: "/crops/wheat.jpg",
    description: "A major cereal grain, used globally for flour and various food products.",
  },
  "Cotton": {
    image: "/crops/cotton.jpg",
    description: "A soft, fluffy staple fiber that grows in a boll around the seeds of cotton plants.",
  },
  "Maize": {
    image: "/crops/maize.jpg",
    description: "Also known as corn, a cereal grain first domesticated by indigenous peoples in Mexico.",
  },
  "Soyabean": {
    image: "/crops/soybean.jpg",
    description: "Edible legume high in protein, used for oil production and animal feed.",
  },
}

// User data from profile
const userData = {
  location: "Haryana, India",
}

// Government schemes
const govSchemes = [
  {
    title: "Pradhan Mantri Fasal Bima Yojana",
    description: "Minimum Premium, Maximum Insurance for Farmer Welfare",
    image: "/schemes/pmfby.jpg",
    link: "https://pmfby.gov.in/"
  },
  {
    title: "PM Kisan Samman Nidhi",
    description: "Direct income support of ₹6000 per year to eligible farmer families",
    image: "/schemes/pmkisan.jpg",
    link: "https://pmkisan.gov.in/"
  },
  {
    title: "Soil Health Card",
    description: "Healthy Soils for a Healthy Life",
    image: "/schemes/soil-health.jpg",
    link: "https://soilhealth.dac.gov.in/"
  }
]

// Mock data for news
const news = [
  {
    id: 1,
    title: "Wheat Prices Surge Amidst Supply Concerns",
    description: "Recent weather conditions in major wheat-producing regions have led to concerns about supply, causing prices to rise significantly.",
    image: "https://bsmedia.business-standard.com/_media/bs/img/article/2024-02/18/full/1708276902-8942.jpg",
    date: "2024-03-27",
    source: "Agricultural Times"
  },
  {
    id: 2,
    title: "New Digital Platform Launched for Direct Farmer-Mandi Connect",
    description: "Government introduces a new digital platform to connect farmers directly with mandis, reducing middlemen and improving price discovery.",
    image: "https://www.farmatma.in/wp-content/uploads/2018/01/paddy-cultivation.jpg",
    date: "2024-03-26",
    source: "Farm News"
  },
  {
    id: 3,
    title: "Rice Export Policy Changes Impact Domestic Prices",
    description: "Recent changes in rice export policies have led to adjustments in domestic market prices, affecting both farmers and consumers.",
    image: "https://www.peptechbio.com/wp-content/uploads/2023/03/Wheat_photo-cred-Adobe-stock_E-2.jpg",
    date: "2024-03-25",
    source: "Agri Business"
  }
]

const MandiPricePage: NextPage = () => {
  const [language, setLanguage] = useState("en")
  const [searchTerm, setSearchTerm] = useState("")
  const [mandiData, setMandiData] = useState<MandiRecord[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [currentNewsIndex, setCurrentNewsIndex] = useState(0)
  const [selectedState, setSelectedState] = useState<string>("all")
  const [activeTab, setActiveTab] = useState<string>("")
  const [mounted, setMounted] = useState(false)
  const router = useRouter()

  // Add mounted state to prevent hydration mismatch
  useEffect(() => {
    setMounted(true)
  }, [])

  const toggleLanguage = () => {
    setLanguage(language === "en" ? "hi" : "en")
  }

  // Get unique states and commodities from mandi data
  const uniqueStates = Array.from(new Set(mandiData.map(item => item.State))).sort()
  const uniqueCommodities = Array.from(new Set(mandiData.map(item => item.Commodity))).sort()

  // Auto-rotate news
  useEffect(() => {
    if (!mounted) return

    const interval = setInterval(() => {
      setCurrentNewsIndex((prevIndex) => (prevIndex + 1) % news.length)
    }, 5000)

    return () => clearInterval(interval)
  }, [mounted])

  const handlePrevNews = () => {
    setCurrentNewsIndex((prevIndex) => (prevIndex - 1 + news.length) % news.length)
  }

  const handleNextNews = () => {
    setCurrentNewsIndex((prevIndex) => (prevIndex + 1) % news.length)
  }

  useEffect(() => {
    const fetchMandiPrices = async () => {
      try {
        setLoading(true)
        const response = await fetch(
          "https://api.data.gov.in/resource/35985678-0d79-46b4-9ed6-6f13308a1d24?api-key=579b464db66ec23bdd000001cdd3946e44ce4aad7209ff7b23ac571b&format=json&limit=1000"
        )
        if (!response.ok) {
          throw new Error("Failed to fetch mandi prices")
        }
        const data: ApiResponse = await response.json()
        setMandiData(data.records)
        // Set first commodity as active tab
        if (data.records.length > 0) {
          const firstCommodity = Array.from(new Set(data.records.map(item => item.Commodity)))[0]
          setActiveTab(firstCommodity)
        }
        setError(null)
      } catch (err) {
        setError("Failed to load mandi prices. Please try again later.")
        console.error("Error fetching mandi prices:", err)
      } finally {
        setLoading(false)
      }
    }

    fetchMandiPrices()
  }, [])

  // Translations
  const translations = {
    en: {
      title: "Mandi Prices",
      search: "Search commodity or market",
      commodity: "Commodity",
      market: "Market",
      price: "Price (₹/Quintal)",
      loading: "Loading prices...",
      error: "Error loading prices",
      variety: "Variety",
      state: "State",
      nearbyPrices: "Nearby Prices",
      otherLocations: "Other Locations",
      min: "Min",
      max: "Max",
      modal: "Modal",
      district: "District",
      date: "Date",
      selectState: "Select State",
      allStates: "All States",
      filterByState: "Filter by state",
      about: "About",
      priceDetails: "Price Details",
      govSchemes: "Government Schemes",
      viewScheme: "View Scheme",
      knowMore: "Know More",
      news: "News",
      appName: "Mandi Prices",
    },
    hi: {
      title: "मंडी मूल्य",
      search: "वस्तु या मंडी खोजें",
      commodity: "वस्तु",
      market: "मंडी",
      price: "मूल्य (₹/क्विंटल)",
      loading: "मूल्य लोड हो रहे हैं...",
      error: "मूल्य लोड करने में त्रुटि",
      variety: "किस्म",
      state: "राज्य",
      nearbyPrices: "आस-पास के मूल्य",
      otherLocations: "अन्य स्थान",
      min: "न्यूनतम",
      max: "अधिकतम",
      modal: "सामान्य",
      district: "जिला",
      date: "तारीख",
      selectState: "राज्य चुनें",
      allStates: "सभी राज्य",
      filterByState: "राज्य द्वारा फ़िल्टर करें",
      about: "परिचय",
      priceDetails: "मूल्य विवरण",
      govSchemes: "सरकारी योजनाएं",
      viewScheme: "योजना देखें",
      knowMore: "और जानें",
      news: "समाचार",
      appName: "मंडी मूल्य",
    },
  }

  const t = translations[language as keyof typeof translations]

  // Group prices by commodity and state
  const groupedPrices = mandiData.reduce((acc, item) => {
    if (!acc[item.Commodity]) {
      acc[item.Commodity] = {
        nearby: [],
        others: [],
      }
    }
    
    if (item.State === selectedState) {
      acc[item.Commodity].nearby.push(item)
    } else if (selectedState === "all") {
      acc[item.Commodity].nearby.push(item)
    } else {
      acc[item.Commodity].others.push(item)
    }
    
    return acc
  }, {} as Record<string, { nearby: MandiRecord[], others: MandiRecord[] }>)

  const formatDate = (dateStr: string) => {
    const [day, month, year] = dateStr.split("/")
    return new Date(`${year}-${month}-${day}`).toLocaleDateString()
  }

  // Filter commodities based on search
  const filteredCommodities = uniqueCommodities.filter(commodity =>
    commodity.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="min-h-screen bg-[#f8f9fa] flex flex-col">
      {/* App Header */}
      <header className="bg-[#2e7d32] text-white p-4 shadow-md">
        <div className="container mx-auto flex items-center justify-between">
          <div className="flex items-center">
            <Leaf className="h-6 w-6 mr-2" />
            <h1 className="text-xl font-semibold">{t.appName}</h1>
          </div>
          <LanguageToggler language={language} toggleLanguage={toggleLanguage} />
        </div>
      </header>

      <main className="container mx-auto px-4 py-6 flex-1 mb-16">
        {/* News Section */}
        {mounted && (
          <section className="mb-8 relative">
            <h2 className="text-lg font-medium mb-3">{t.news}</h2>
            <div className="relative overflow-hidden rounded-xl shadow-sm">
              <div className="relative h-[180px] w-full">
                <Image
                  src={news[currentNewsIndex].image}
                  alt={news[currentNewsIndex].title}
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-black/40 flex flex-col justify-end p-4 text-white">
                  <div className="flex items-center gap-2 text-xs mb-1">
                    <span>{news[currentNewsIndex].source}</span>
                    <span>•</span>
                    <span>{formatDate(news[currentNewsIndex].date)}</span>
                  </div>
                  <h3 className="text-lg font-medium">{news[currentNewsIndex].title}</h3>
                  <p className="mt-1 text-sm">{news[currentNewsIndex].description}</p>
                </div>
              </div>
              <Button
                variant="outline"
                size="icon"
                className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white h-8 w-8 rounded-full"
                onClick={handlePrevNews}
              >
                <ArrowLeft className="h-4 w-4" />
                <span className="sr-only">Previous news</span>
              </Button>
              <Button
                variant="outline"
                size="icon"
                className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white h-8 w-8 rounded-full"
                onClick={handleNextNews}
              >
                <ArrowRight className="h-4 w-4" />
                <span className="sr-only">Next news</span>
              </Button>
              <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1">
                {news.map((_, index) => (
                  <span
                    key={index}
                    className={`block h-1.5 w-1.5 rounded-full ${
                      index === currentNewsIndex ? "bg-white" : "bg-white/50"
                    }`}
                  />
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Search and Filter */}
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              type="text"
              placeholder={t.search}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 rounded-full border-gray-200"
            />
          </div>
          <Select
            value={selectedState}
            onValueChange={setSelectedState}
          >
            <SelectTrigger className="w-full md:w-[200px] rounded-full">
              <SelectValue placeholder={t.selectState} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">{t.allStates}</SelectItem>
              {uniqueStates.map((state) => (
                <SelectItem key={state} value={state}>
                  {state}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Mandi Prices List */}
        {loading ? (
          <div className="p-8 text-center text-gray-500">{t.loading}</div>
        ) : error ? (
          <div className="p-8 text-center text-red-500">{error}</div>
        ) : (
          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
            <TabsList className="w-full h-auto flex-wrap gap-2 bg-transparent">
              {filteredCommodities.map((commodity) => (
                <TabsTrigger
                  key={commodity}
                  value={commodity}
                  className="data-[state=active]:bg-[#2e7d32] data-[state=active]:text-white"
                >
                  {commodity}
                </TabsTrigger>
              ))}
            </TabsList>

            {filteredCommodities.map((commodity) => (
              <TabsContent key={commodity} value={commodity} className="space-y-4">
                <Card className="border-0 shadow-sm">
                  <CardContent className="p-6">
                    <div className="grid md:grid-cols-2 gap-6">
                      {/* Crop Info */}
                      <div>
                        <h2 className="text-xl font-semibold mb-4">{t.about}</h2>
                        <div className="relative w-full h-48 rounded-lg overflow-hidden mb-4">
                          <Image
                            src={cropDetails[commodity]?.image || "https://agrigro.com/cdn/shop/articles/elements-of-crop-production_featimg_750x.jpg?v=1704299285"}
                            alt={commodity}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <p className="text-gray-600">
                          {cropDetails[commodity]?.description || "A valuable agricultural commodity traded in Indian markets."}
                        </p>
                      </div>

                      {/* Price Details */}
                      <div>
                        <h2 className="text-xl font-semibold mb-4">{t.priceDetails}</h2>
                        {/* Nearby Prices */}
                        {groupedPrices[commodity]?.nearby.length > 0 && (
                          <div className="mb-6">
                            <div className="flex items-center mb-3">
                              <MapPin className="h-4 w-4 text-[#2e7d32] mr-2" />
                              <h3 className="font-medium text-[#2e7d32]">
                                {selectedState === "all" ? t.allStates : t.nearbyPrices}
                              </h3>
                            </div>
                            <div className="overflow-x-auto">
                              <table className="w-full text-sm">
                                <thead>
                                  <tr className="text-gray-500">
                                    {selectedState === "all" && (
                                      <th className="text-left p-2">{t.state}</th>
                                    )}
                                    <th className="text-left p-2">{t.market}</th>
                                    <th className="text-right p-2">{t.min}</th>
                                    <th className="text-right p-2">{t.max}</th>
                                    <th className="text-right p-2">{t.modal}</th>
                                  </tr>
                                </thead>
                                <tbody className="divide-y">
                                  {groupedPrices[commodity]?.nearby.map((item, idx) => (
                                    <tr key={idx}>
                                      {selectedState === "all" && (
                                        <td className="p-2">{item.State}</td>
                                      )}
                                      <td className="p-2">{item.Market}</td>
                                      <td className="text-right p-2">₹{item.Min_Price}</td>
                                      <td className="text-right p-2">₹{item.Max_Price}</td>
                                      <td className="text-right p-2">₹{item.Modal_Price}</td>
                                    </tr>
                                  ))}
                                </tbody>
                              </table>
                            </div>
                          </div>
                        )}

                        {/* Other Locations */}
                        {selectedState !== "all" && groupedPrices[commodity]?.others.length > 0 && (
                          <div>
                            <h3 className="font-medium mb-3 text-gray-500">{t.otherLocations}</h3>
                            <div className="overflow-x-auto">
                              <table className="w-full text-sm">
                                <thead>
                                  <tr className="text-gray-500">
                                    <th className="text-left p-2">{t.state}</th>
                                    <th className="text-left p-2">{t.market}</th>
                                    <th className="text-right p-2">{t.min}</th>
                                    <th className="text-right p-2">{t.max}</th>
                                    <th className="text-right p-2">{t.modal}</th>
                                  </tr>
                                </thead>
                                <tbody className="divide-y">
                                  {groupedPrices[commodity]?.others.slice(0, 5).map((item, idx) => (
                                    <tr key={idx}>
                                      <td className="p-2">{item.State}</td>
                                      <td className="p-2">{item.Market}</td>
                                      <td className="text-right p-2">₹{item.Min_Price}</td>
                                      <td className="text-right p-2">₹{item.Max_Price}</td>
                                      <td className="text-right p-2">₹{item.Modal_Price}</td>
                                    </tr>
                                  ))}
                                </tbody>
                              </table>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            ))}
          </Tabs>
        )}
      </main>

      {/* Mobile Footer */}
      <MobileFooter language={language} />
    </div>
  )
}

export default MandiPricePage

