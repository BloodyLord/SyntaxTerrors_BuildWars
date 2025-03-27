"use client"

import { Button } from "@/components/ui/button"

interface LanguageTogglerProps {
  language: string
  toggleLanguage: () => void
}

export default function LanguageToggler({ language, toggleLanguage }: LanguageTogglerProps) {
  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={toggleLanguage}
      className="text-white hover:bg-white/20 rounded-full h-8 px-3"
    >
      {language === "en" ? "हिंदी" : "English"}
    </Button>
  )
}

