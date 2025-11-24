import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="border-t border-gray-200 py-8 mt-16">
      <div className="max-w-4xl mx-auto px-4">
        <div className="flex flex-wrap justify-center gap-6 mb-6">
          <Link href="/about" className="text-gray-600 hover:text-gray-900 transition-colors">
            About
          </Link>
          <Link href="/privacy" className="text-gray-600 hover:text-gray-900 transition-colors">
            Privacy
          </Link>
          <Link href="/terms" className="text-gray-600 hover:text-gray-900 transition-colors">
            Terms
          </Link>
          <Link href="/how-it-works" className="text-gray-600 hover:text-gray-900 transition-colors">
            How It Works
          </Link>
          <Link href="/contact" className="text-gray-600 hover:text-gray-900 transition-colors">
            Contact
          </Link>
        </div>
        
        {/* AdSense placeholder */}
        <div className="bg-gray-100 border-2 border-dashed border-gray-300 rounded-lg p-4 text-center text-gray-500 text-sm mb-4">
          AdSense Ad Slot - Footer
        </div>
        
        <div className="text-center text-gray-500 text-sm">
          © 2024 FastShare. All rights reserved.
        </div>
      </div>
    </footer>
  )
}