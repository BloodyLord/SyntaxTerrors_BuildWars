"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import { ArrowLeft, ArrowRight, Leaf } from "lucide-react"
import { useRouter } from "next/navigation"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import MobileFooter from "@/components/mobile-footer"
import LanguageToggler from "@/components/language-toggler"

// Mock data for schemes
const schemes = [
  {
    id: 1,
    title: "Pradhan Mantri Fasal Bima Yojana",
    description: "Crop insurance scheme to provide financial support to farmers suffering crop loss/damage",
    image: "/placeholder.svg?height=200&width=800",
  },
  {
    id: 2,
    title: "PM Kisan Samman Nidhi",
    description: "Direct income support of ₹6000 per year to eligible farmer families",
    image: "/placeholder.svg?height=200&width=800",
  },
  {
    id: 3,
    title: "Soil Health Card Scheme",
    description: "Provides information on soil health and recommendations on appropriate dosage of nutrients",
    image: "/placeholder.svg?height=200&width=800",
  },
]

// Mock data for crops (would be fetched from API in a real app)
const mockCrops = [
  {
    id: 1,
    name: "Wheat",
    currentPrice: "₹2,015 per quintal",
    previousPrice: "₹1,975 per quintal",
    change: "+2.0%",
    trend: "up",
    image: "/placeholder.svg?height=200&width=200",
  },
  {
    id: 2,
    name: "Rice",
    currentPrice: "₹1,868 per quintal",
    previousPrice: "₹1,940 per quintal",
    change: "-3.7%",
    trend: "down",
    image: "/placeholder.svg?height=200&width=200",
  },
  {
    id: 3,
    name: "Cotton",
    currentPrice: "₹6,380 per quintal",
    previousPrice: "₹6,025 per quintal",
    change: "+5.9%",
    trend: "up",
    image: "/placeholder.svg?height=200&width=200",
  },
  {
    id: 4,
    name: "Sugarcane",
    currentPrice: "₹285 per quintal",
    previousPrice: "₹285 per quintal",
    change: "0%",
    trend: "stable",
    image: "/placeholder.svg?height=200&width=200",
  },
  {
    id: 5,
    name: "Maize",
    currentPrice: "₹1,870 per quintal",
    previousPrice: "₹1,850 per quintal",
    change: "+1.1%",
    trend: "up",
    image: "/placeholder.svg?height=200&width=200",
  },
  {
    id: 6,
    name: "Soybean",
    currentPrice: "₹3,950 per quintal",
    previousPrice: "₹4,100 per quintal",
    change: "-3.7%",
    trend: "down",
    image: "/placeholder.svg?height=200&width=200",
  },
]

export default function FarmerDashboard() {
  const [currentSchemeIndex, setCurrentSchemeIndex] = useState(0)
  const [crops, setCrops] = useState(mockCrops)
  const [cropSlideIndex, setCropSlideIndex] = useState(0)
  const [language, setLanguage] = useState("en") // Default language is English
  const router = useRouter()

  // Auto-rotate scheme banners
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSchemeIndex((prevIndex) => (prevIndex + 1) % schemes.length)
    }, 5000)

    return () => clearInterval(interval)
  }, [])

  // In a real app, this would fetch data from an API
  useEffect(() => {
    // Simulate API fetch
    const fetchCrops = async () => {
      // In a real app, this would be an actual API call
      // const response = await fetch('/api/crops')
      // const data = await response.json()
      // setCrops(data)
    }

    fetchCrops()
  }, [])

  const handlePrevScheme = () => {
    setCurrentSchemeIndex((prevIndex) => (prevIndex - 1 + schemes.length) % schemes.length)
  }

  const handleNextScheme = () => {
    setCurrentSchemeIndex((prevIndex) => (prevIndex + 1) % schemes.length)
  }

  const handlePrevCropSlide = () => {
    setCropSlideIndex((prevIndex) => Math.max(0, prevIndex - 1))
  }

  const handleNextCropSlide = () => {
    setCropSlideIndex((prevIndex) => Math.min(prevIndex + 1, Math.ceil(crops.length / 3) - 1))
  }

  const toggleLanguage = () => {
    setLanguage(language === "en" ? "hi" : "en")
  }

  // Translations (simplified for demo)
  const translations = {
    en: {
      appName: "KisanMitra",
      schemes: "Agricultural Schemes",
      myCrops: "My Crops",
      addCrop: "Add Crop",
      viewDetails: "View Details",
      fromLastWeek: "from last week",
    },
    hi: {
      appName: "किसानमित्र",
      schemes: "कृषि योजनाएं",
      myCrops: "मेरी फसलें",
      addCrop: "फसल जोड़ें",
      viewDetails: "विवरण देखें",
      fromLastWeek: "पिछले सप्ताह से",
    },
  }

  const t = translations[language as keyof typeof translations]

  // Calculate visible crops based on slide index
  const visibleCrops = crops.slice(cropSlideIndex * 3, cropSlideIndex * 3 + 3)
  const totalSlides = Math.ceil(crops.length / 3)

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
        {/* Scheme Banner Carousel */}
        <section className="mb-8 relative">
          <h2 className="text-lg font-medium mb-3">{t.schemes}</h2>
          <div className="relative overflow-hidden rounded-xl shadow-sm">
            <div className="relative h-[180px] w-full">
              <Image
                src={schemes[currentSchemeIndex].image || "/placeholder.svg"}
                alt={schemes[currentSchemeIndex].title}
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-black/40 flex flex-col justify-end p-4 text-white">
                <h3 className="text-lg font-medium">{schemes[currentSchemeIndex].title}</h3>
                <p className="mt-1 text-sm">{schemes[currentSchemeIndex].description}</p>
              </div>
            </div>
            <Button
              variant="outline"
              size="icon"
              className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white h-8 w-8 rounded-full"
              onClick={handlePrevScheme}
            >
              <ArrowLeft className="h-4 w-4" />
              <span className="sr-only">Previous scheme</span>
            </Button>
            <Button
              variant="outline"
              size="icon"
              className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white h-8 w-8 rounded-full"
              onClick={handleNextScheme}
            >
              <ArrowRight className="h-4 w-4" />
              <span className="sr-only">Next scheme</span>
            </Button>
            <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1">
              {schemes.map((_, index) => (
                <span
                  key={index}
                  className={`block h-1.5 w-1.5 rounded-full ${
                    index === currentSchemeIndex ? "bg-white" : "bg-white/50"
                  }`}
                />
              ))}
            </div>
          </div>
        </section>

        {/* My Crops Section */}
        <section>
          <div className="flex justify-between items-center mb-3">
            <h2 className="text-lg font-medium">{t.myCrops}</h2>
            <Button variant="outline" size="sm" className="rounded-full text-sm h-8">
              {t.addCrop}
            </Button>
          </div>

          <div className="relative">
            <div className="overflow-hidden">
              <div
                className="flex transition-transform duration-300 ease-in-out"
                style={{ transform: `translateX(-${(cropSlideIndex * 100) / totalSlides}%)` }}
              >
                {visibleCrops.map((crop) => (
                  <div key={crop.id} className="w-full sm:w-1/2 lg:w-1/3 flex-shrink-0 px-1">
                    <Card className="overflow-hidden h-full border-0 shadow-sm rounded-xl">
                      <div className="relative h-36">
                        <Image src={crop.image || "/placeholder.svg"} alt={crop.name} fill className="object-cover" />
                      </div>
                      <CardContent className="p-3">
                        <h3 className="text-base font-medium">{crop.name}</h3>
                        <p className="text-base font-medium mt-1">{crop.currentPrice}</p>
                        <p
                          className={`text-xs ${
                            crop.trend === "up"
                              ? "text-green-600"
                              : crop.trend === "down"
                                ? "text-red-600"
                                : "text-gray-600"
                          }`}
                        >
                          {crop.change} {t.fromLastWeek}
                        </p>
                      </CardContent>
                      <CardFooter className="bg-muted/30 p-3">
                        <Button variant="outline" size="sm" className="w-full rounded-full text-xs">
                          {t.viewDetails}
                        </Button>
                      </CardFooter>
                    </Card>
                  </div>
                ))}
              </div>
            </div>

            {cropSlideIndex > 0 && (
              <Button
                variant="outline"
                size="icon"
                className="absolute left-0 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white h-8 w-8 rounded-full shadow-sm"
                onClick={handlePrevCropSlide}
              >
                <ArrowLeft className="h-4 w-4" />
                <span className="sr-only">Previous crops</span>
              </Button>
            )}

            {cropSlideIndex < Math.ceil(crops.length / 3) - 1 && (
              <Button
                variant="outline"
                size="icon"
                className="absolute right-0 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white h-8 w-8 rounded-full shadow-sm"
                onClick={handleNextCropSlide}
              >
                <ArrowRight className="h-4 w-4" />
                <span className="sr-only">Next crops</span>
              </Button>
            )}

            <div className="flex justify-center mt-4 gap-1">
              {Array.from({ length: Math.ceil(crops.length / 3) }).map((_, index) => (
                <span
                  key={index}
                  className={`block h-1.5 w-1.5 rounded-full ${
                    index === cropSlideIndex ? "bg-[#2e7d32]" : "bg-[#2e7d32]/30"
                  }`}
                />
              ))}
            </div>
          </div>
        </section>
      </main>

      {/* Mobile Footer */}
      <MobileFooter language={language} />
    </div>
  )
}

