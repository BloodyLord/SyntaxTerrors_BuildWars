import Image from "next/image"
import { Button } from "@/components/ui/button"

interface SchemeBannerProps {
  scheme: {
    title: string
    description: string
    imageUrl: string
    link: string
  }
  onLearnMore: (link: string) => void
}

export function SchemeBanner({ scheme, onLearnMore }: SchemeBannerProps) {
  return (
    <div className="relative h-[240px] w-full overflow-hidden rounded-xl">
      <Image
        src={scheme.imageUrl}
        alt={scheme.title}
        fill
        className="object-cover"
        priority
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent flex flex-col justify-end p-6 text-white">
        <h3 className="text-2xl font-semibold">{scheme.title}</h3>
        <p className="mt-2 text-sm text-gray-200">{scheme.description}</p>
        <Button
          variant="outline"
          className="mt-4 w-fit text-white border-white/30 hover:bg-white/20"
          onClick={() => onLearnMore(scheme.link)}
        >
          Learn More
        </Button>
      </div>
    </div>
  )
} 