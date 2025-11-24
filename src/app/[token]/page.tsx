'use client'

import { useQuery } from 'convex/react'
import { api } from '../../../convex/_generated/api'
import { Copy, Download } from 'lucide-react'
import { useState } from 'react'
import Link from 'next/link'

export default function SharePage({ params }: { params: { token: string } }) {
  const [copied, setCopied] = useState(false)
  const share = useQuery(api.shares.fetchShare, { token: params.token })
  
  const copyToClipboard = async () => {
    const textToCopy = share?.type === 'text' ? share.text : 
                      share?.type === 'file' ? `File: ${share.filename}` : ''
    if (textToCopy) {
      await navigator.clipboard.writeText(textToCopy)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }
  
  const downloadFile = () => {
    if (share?.type === 'file' && share.fileData) {
      const byteCharacters = atob(share.fileData)
      const byteNumbers = new Array(byteCharacters.length)
      for (let i = 0; i < byteCharacters.length; i++) {
        byteNumbers[i] = byteCharacters.charCodeAt(i)
      }
      const byteArray = new Uint8Array(byteNumbers)
      const blob = new Blob([byteArray], { type: share.fileType || 'application/octet-stream' })
      
      const url = URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = share.filename || 'shared-file'
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)
      URL.revokeObjectURL(url)
    }
  }
  
  if (share === undefined) {
    return (
      <div className="min-h-screen bg-white py-12 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    )
  }
  
  if (share === null) {
    return (
      <div className="min-h-screen bg-white py-12 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Content Not Found</h1>
          <p className="text-gray-600 mb-6">This link has expired or doesn't exist.</p>
          <Link 
            href="/" 
            className="inline-block px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
          >
            Create New Share
          </Link>
        </div>
      </div>
    )
  }
  
  return (
    <div className="min-h-screen bg-white py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-lg shadow-lg border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                {share.type === 'file' ? 'Shared File' : 'Shared Text'}
              </h1>
              {share.type === 'file' && (
                <div className="text-gray-600 mt-1">
                  <p>File: {share.filename}</p>
                  <p className="text-sm">Size: {share.fileSize ? 
                    (share.fileSize > 1024 * 1024 ? 
                      `${(share.fileSize / (1024 * 1024)).toFixed(1)} MB` : 
                      `${Math.round(share.fileSize / 1024)} KB`) : 'Unknown'}
                  </p>
                </div>
              )}
            </div>
            <div className="flex gap-2">
              <button
                onClick={copyToClipboard}
                className="flex items-center gap-2 px-4 py-2 text-sm bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                aria-label="Copy content to clipboard"
              >
                <Copy size={16} />
                {copied ? 'Copied!' : 'Copy'}
              </button>
              {share.type === 'file' && (
                <button
                  onClick={downloadFile}
                  className="flex items-center gap-2 px-4 py-2 text-sm bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
                  aria-label="Download file"
                >
                  <Download size={16} />
                  Download
                </button>
              )}
            </div>
          </div>
          
          {share.type === 'text' ? (
            <div className="bg-gray-50 rounded-md p-4 border">
              <pre className="whitespace-pre-wrap text-sm text-gray-800 font-mono overflow-x-auto">
                {share.text}
              </pre>
            </div>
          ) : (
            <div className="bg-blue-50 rounded-md p-6 border border-blue-200 text-center">
              <Download size={48} className="mx-auto text-blue-600 mb-4" />
              <h3 className="text-lg font-semibold text-blue-900 mb-2">{share.filename}</h3>
              <p className="text-blue-700 mb-4">Click the download button above to save this file</p>
              <p className="text-sm text-blue-600">
                Type: {share.fileType || 'Unknown'} • 
                Size: {share.fileSize ? 
                  (share.fileSize > 1024 * 1024 ? 
                    `${(share.fileSize / (1024 * 1024)).toFixed(1)} MB` : 
                    `${Math.round(share.fileSize / 1024)} KB`) : 'Unknown'}
              </p>
            </div>
          )}
          
          <div className="mt-6 text-center">
            <Link 
              href="/" 
              className="inline-block px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
            >
              Create Your Own Share
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}