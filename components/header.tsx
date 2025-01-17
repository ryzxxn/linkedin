import Link from "next/link"
import { Button } from "@/components/ui/button"

export function Header() {
  return (
    <header className="border-b bg-white/50 backdrop-blur-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/" className="font-bold text-xl flex items-center gap-2">
          <span className="text-red-500">Post</span>
          <span>Generator</span>
        </Link>
        <nav className="flex items-center gap-4">
          <Link href="/blog" className="text-gray-600 hover:text-gray-900">
            Testimonies
          </Link>
          <Link href="/examples" className="text-gray-600 hover:text-gray-900">
            Examples
          </Link>
          <Button>Get Started</Button>
        </nav>
      </div>
    </header>
  )
}

