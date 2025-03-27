"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Leaf, Phone, Lock } from "lucide-react"
import { toast } from "sonner"

interface AuthModalProps {
  onAuth: () => void
  language: string
}

const AuthModal = ({ onAuth, language }: AuthModalProps) => {
  const [phone, setPhone] = useState("")
  const [password, setPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000))

    if (phone === "9015682307" && password === "12345678") {
      // Store authentication state in sessionStorage instead of localStorage
      sessionStorage.setItem("isAuthenticated", "true")
      sessionStorage.setItem("userPhone", phone)
      toast.success(language === "hi" ? "सफलतापूर्वक लॉगिन हो गया" : "Successfully logged in")
      onAuth()
    } else {
      toast.error(language === "hi" ? "गलत फोन नंबर या पासवर्ड" : "Invalid phone number or password")
    }

    setIsLoading(false)
  }

  const t = {
    en: {
      title: "Farmer Assistant",
      phone: "Phone Number",
      password: "Password",
      login: "Login",
      loading: "Loading...",
      placeholder: {
        phone: "Enter your phone number",
        password: "Enter your password",
      },
    },
    hi: {
      title: "किसान सहायक",
      phone: "फोन नंबर",
      password: "पासवर्ड",
      login: "लॉगिन करें",
      loading: "लोड हो रहा है...",
      placeholder: {
        phone: "अपना फोन नंबर दर्ज करें",
        password: "अपना पासवर्ड दर्ज करें",
      },
    },
  }

  const currentT = t[language as keyof typeof t]

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <Card className="w-[400px] p-6">
        <div className="flex items-center justify-center mb-6">
          <Leaf className="h-8 w-8 text-[#2e7d32] mr-2" />
          <h1 className="text-2xl font-bold text-[#2e7d32]">{currentT.title}</h1>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="phone">{currentT.phone}</Label>
            <div className="relative">
              <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
              <Input
                id="phone"
                type="tel"
                placeholder={currentT.placeholder.phone}
                className="pl-10"
                required
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                maxLength={10}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="password">{currentT.password}</Label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
              <Input
                id="password"
                type="password"
                placeholder={currentT.placeholder.password}
                className="pl-10"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>

          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? currentT.loading : currentT.login}
          </Button>
        </form>
      </Card>
    </div>
  )
}

export default AuthModal 