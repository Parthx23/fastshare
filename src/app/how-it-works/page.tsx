import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'How It Works - FastShare',
  description: 'Learn how FastShare works and how to use it effectively for sharing text and files.',
}

export default function HowItWorks() {
  return (
    <div className="min-h-screen bg-white py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-lg shadow-lg border border-gray-200 p-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-6">How It Works</h1>
          
          <div className="space-y-8">
            <div className="flex flex-col md:flex-row items-start gap-6">
              <div className="flex-shrink-0 w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold text-lg">
                1
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Choose Text or File</h3>
                <p className="text-gray-700 mb-4">
                  Select the "Text / Code" tab to paste text or code, or choose the "File" tab to 
                  upload a file up to 10MB. You can drag and drop files directly onto the upload area.
                </p>
                <div className="bg-gray-100 border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                  <p className="text-gray-500 text-sm">[Screenshot: Main interface with tabs]</p>
                </div>
              </div>
            </div>
            
            <div className="flex flex-col md:flex-row items-start gap-6">
              <div className="flex-shrink-0 w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold text-lg">
                2
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Generate Your Link</h3>
                <p className="text-gray-700 mb-4">
                  Click the "Generate Link" button to create a secure, temporary sharing link. 
                  The link uses a unique 6-character code that expires in exactly 1 hour.
                </p>
                <div className="bg-gray-100 border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                  <p className="text-gray-500 text-sm">[Screenshot: Generated link with copy button]</p>
                </div>
              </div>
            </div>
            
            <div className="flex flex-col md:flex-row items-start gap-6">
              <div className="flex-shrink-0 w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold text-lg">
                3
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Share and Access</h3>
                <p className="text-gray-700 mb-4">
                  Copy the link and share it with anyone. Recipients can view your content immediately 
                  without creating an account. The link automatically expires after 1 hour for security.
                </p>
                <div className="bg-gray-100 border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                  <p className="text-gray-500 text-sm">[Screenshot: Shared content view page]</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="mt-8 p-6 bg-green-50 border border-green-200 rounded-lg">
            <h3 className="text-lg font-semibold text-green-900 mb-3">Why FastShare?</h3>
            <ul className="text-green-800 space-y-2">
              <li>✓ No registration required</li>
              <li>✓ Automatic 1-hour expiration for privacy</li>
              <li>✓ Supports both text and file sharing</li>
              <li>✓ Secure encrypted storage</li>
              <li>✓ Mobile-friendly interface</li>
            </ul>
          </div>
          
          <div className="mt-8">
            <Link 
              href="/" 
              className="inline-block px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
            >
              Try It Now
            </Link>
          </div>
        </div>
        
        {/* AdSense placeholder */}
        <div className="mt-8 bg-gray-100 border-2 border-dashed border-gray-300 rounded-lg p-8 text-center text-gray-500">
          AdSense Ad Slot - How It Works Page
        </div>
      </div>
    </div>
  )
}