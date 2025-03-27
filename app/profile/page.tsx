"use client"

import { useState } from "react"
import { ArrowLeft, Edit, LogOut, Settings, User } from "lucide-react"
import { useRouter } from "next/navigation"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import MobileFooter from "@/components/mobile-footer"

// Mock user data
const userData = {
  name: "Rajesh Kumar",
  location: "Haryana, India",
  farmSize: "5 acres",
  crops: ["Wheat", "Rice", "Cotton"],
  joinedDate: "March 2023",
}

export default function ProfilePage() {
  const [language, setLanguage] = useState("en") // Default language is English
  const router = useRouter()

  // Translations
  const translations = {
    en: {
      title: "Profile",
      editProfile: "Edit Profile",
      farmDetails: "Farm Details",
      location: "Location",
      farmSize: "Farm Size",
      crops: "Crops",
      account: "Account",
      settings: "Settings",
      help: "Help & Support",
      logout: "Log Out",
      joinedOn: "Joined on",
    },
    hi: {
      title: "प्रोफाइल",
      editProfile: "प्रोफाइल संपादित करें",
      farmDetails: "खेत का विवरण",
      location: "स्थान",
      farmSize: "खेत का आकार",
      crops: "फसलें",
      account: "खाता",
      settings: "सेटिंग्स",
      help: "सहायता और समर्थन",
      logout: "लॉग आउट",
      joinedOn: "शामिल हुए",
    },
  }

  const t = translations[language as keyof typeof translations]

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
        {/* User Profile Card */}
        <Card className="mb-6 border-0 shadow-sm">
          <CardContent className="p-6">
            <div className="flex items-center">
              <div className="relative w-16 h-16 rounded-full bg-[#e8f5e9] flex items-center justify-center mr-4 border-2 border-[#2e7d32]">
                <User className="h-8 w-8 text-[#2e7d32]" />
              </div>
              <div>
                <h2 className="text-xl font-medium">{userData.name}</h2>
                <p className="text-gray-500 text-sm">{userData.location}</p>
                <p className="text-gray-500 text-xs mt-1">
                  {t.joinedOn} {userData.joinedDate}
                </p>
              </div>
              <Button variant="outline" size="sm" className="ml-auto rounded-full">
                <Edit className="h-4 w-4 mr-1" />
                {t.editProfile}
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Farm Details */}
        <h2 className="text-lg font-medium mb-3">{t.farmDetails}</h2>
        <Card className="mb-6 border-0 shadow-sm">
          <CardContent className="p-0">
            <div className="p-4 flex justify-between">
              <span className="text-gray-500">{t.location}</span>
              <span>{userData.location}</span>
            </div>
            <Separator />
            <div className="p-4 flex justify-between">
              <span className="text-gray-500">{t.farmSize}</span>
              <span>{userData.farmSize}</span>
            </div>
            <Separator />
            <div className="p-4 flex justify-between">
              <span className="text-gray-500">{t.crops}</span>
              <span>{userData.crops.join(", ")}</span>
            </div>
          </CardContent>
        </Card>

        {/* Account Settings */}
        <h2 className="text-lg font-medium mb-3">{t.account}</h2>
        <Card className="border-0 shadow-sm">
          <CardContent className="p-0">
            <button className="w-full p-4 flex items-center text-left">
              <Settings className="h-5 w-5 mr-3 text-gray-500" />
              <span>{t.settings}</span>
            </button>
            <Separator />
            <button className="w-full p-4 flex items-center text-left">
              <LogOut className="h-5 w-5 mr-3 text-gray-500" />
              <span>{t.logout}</span>
            </button>
          </CardContent>
        </Card>
      </main>

      {/* Mobile Footer */}
      <MobileFooter language={language} />
    </div>
  )
}

