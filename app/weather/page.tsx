"use client"

import { useState, useEffect } from "react"
import { ArrowLeft, Cloud, CloudRain, Sun, Wind } from "lucide-react"
import { useRouter } from "next/navigation"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import MobileFooter from "@/components/mobile-footer"

// Mock weather data
const weatherData = {
  current: {
    temp: 28,
    humidity: 65,
    windSpeed: 12,
    condition: "Partly Cloudy",
    icon: Cloud,
  },
  forecast: [
    { day: "Mon", temp: 29, icon: Sun },
    { day: "Tue", temp: 27, icon: CloudRain },
    { day: "Wed", temp: 26, icon: CloudRain },
    { day: "Thu", temp: 28, icon: Cloud },
    { day: "Fri", temp: 30, icon: Sun },
  ],
}

export default function WeatherPage() {
  const [language, setLanguage] = useState("en") // Default language is English
  const [location, setLocation] = useState("Delhi, India")
  const router = useRouter()

  // Translations
  const translations = {
    en: {
      title: "Weather",
      humidity: "Humidity",
      wind: "Wind",
      forecast: "5-Day Forecast",
      advisory: "Weather Advisory",
      advisoryText: "Moderate rainfall expected in the next 48 hours. Consider delaying any pesticide application.",
    },
    hi: {
      title: "मौसम",
      humidity: "आर्द्रता",
      wind: "हवा",
      forecast: "5-दिन का पूर्वानुमान",
      advisory: "मौसम सलाह",
      advisoryText: "अगले 48 घंटों में मध्यम वर्षा की उम्मीद है। कीटनाशक के छिड़काव में देरी पर विचार करें।",
    },
  }

  const t = translations[language as keyof typeof translations]

  // In a real app, this would fetch weather data based on user's location
  useEffect(() => {
    // Geolocation and weather API call would go here
  }, [])

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
        {/* Current Weather */}
        <Card className="mb-6 overflow-hidden border-0 shadow-sm">
          <div className="bg-gradient-to-r from-[#43a047] to-[#2e7d32] text-white p-6">
            <div className="text-sm mb-1">{location}</div>
            <div className="flex items-center justify-between">
              <div>
                <div className="text-4xl font-light">{weatherData.current.temp}°C</div>
                <div className="text-lg">{weatherData.current.condition}</div>
              </div>
              <weatherData.current.icon className="h-16 w-16" />
            </div>
            <div className="flex mt-4 text-white/90 text-sm">
              <div className="flex items-center mr-4">
                <Cloud className="h-4 w-4 mr-1" />
                <span>
                  {t.humidity}: {weatherData.current.humidity}%
                </span>
              </div>
              <div className="flex items-center">
                <Wind className="h-4 w-4 mr-1" />
                <span>
                  {t.wind}: {weatherData.current.windSpeed} km/h
                </span>
              </div>
            </div>
          </div>
        </Card>

        {/* 5-Day Forecast */}
        <h2 className="text-lg font-medium mb-3">{t.forecast}</h2>
        <div className="grid grid-cols-5 gap-2 mb-6">
          {weatherData.forecast.map((day, index) => (
            <Card key={index} className="border-0 shadow-sm">
              <CardContent className="p-3 text-center">
                <div className="text-sm font-medium">{day.day}</div>
                <day.icon className="h-8 w-8 mx-auto my-2" />
                <div className="text-lg font-medium">{day.temp}°</div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Weather Advisory */}
        <h2 className="text-lg font-medium mb-3">{t.advisory}</h2>
        <Card className="border-0 shadow-sm bg-amber-50 border-l-4 border-l-amber-500">
          <CardContent className="p-4">
            <p className="text-sm">{t.advisoryText}</p>
          </CardContent>
        </Card>
      </main>

      {/* Mobile Footer */}
      <MobileFooter language={language} />
    </div>
  )
}

