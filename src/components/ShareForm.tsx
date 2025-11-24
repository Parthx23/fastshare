'use client'

import { useState, useRef, useEffect } from 'react'
import { useMutation } from 'convex/react'
import { api } from '../../convex/_generated/api'
import { Copy, Upload, Link as LinkIcon, HelpCircle, FileText, File } from 'lucide-react'
import Link from 'next/link'

export default function ShareForm() {
  const [activeTab, setActiveTab] = useState<'text' | 'file'>('text')
  const [content, setContent] = useState('')
  const [filename, setFilename] = useState('')
  const [file, setFile] = useState<File | null>(null)
  const [shareLink, setShareLink] = useState('')
  const [expiresAt, setExpiresAt] = useState<number | null>(null)
  const [timeLeft, setTimeLeft] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [copied, setCopied] = useState(false)
  const [dragOver, setDragOver] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)
  
  const createShare = useMutation(api.shares.createShare)
  
  // Countdown timer
  useEffect(() => {
    if (!expiresAt) return
    
    const interval = setInterval(() => {
      const now = Date.now()
      const remaining = Math.max(0, expiresAt - now)
      
      if (remaining === 0) {
        setTimeLeft('Expired')
        clearInterval(interval)
        return
      }
      
      const hours = Math.floor(remaining / (1000 * 60 * 60))
      const minutes = Math.floor((remaining % (1000 * 60 * 60)) / (1000 * 60))
      const seconds = Math.floor((remaining % (1000 * 60)) / 1000)
      
      setTimeLeft(`${hours}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`)
    }, 1000)
    
    return () => clearInterval(interval)
  }, [expiresAt])
  
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0]
    if (selectedFile && selectedFile.size <= 10 * 1024 * 1024) {
      setFile(selectedFile)
      setActiveTab('file')
    } else {
      alert('File must be smaller than 10MB')
    }
  }
  
  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setDragOver(false)
    const droppedFile = e.dataTransfer.files[0]
    if (droppedFile && droppedFile.size <= 10 * 1024 * 1024) {
      setFile(droppedFile)
      setActiveTab('file')
    } else {
      alert('File must be smaller than 10MB')
    }
  }
  
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    setDragOver(true)
  }
  
  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault()
    setDragOver(false)
  }
  
  const generateLink = async () => {
    if (activeTab === 'text' && !content.trim()) return
    if (activeTab === 'file' && !file) return
    
    setIsLoading(true)
    try {
      let result
      const now = Date.now()
      const expires = now + (60 * 60 * 1000) // 1 hour
      
      if (activeTab === 'file' && file) {
        const reader = new FileReader()
        const base64Data = await new Promise<string>((resolve) => {
          reader.onload = (e) => {
            const result = e.target?.result as string
            resolve(result.split(',')[1]) // Remove data:mime;base64, prefix
          }
          reader.readAsDataURL(file)
        })
        
        result = await createShare({
          type: "file",
          fileData: base64Data,
          filename: file.name,
          fileType: file.type,
          expiresAt: expires,
        })
      } else {
        result = await createShare({
          type: "text",
          text: content,
          expiresAt: expires,
        })
      }
      
      const shareUrl = `${window.location.origin}/${result.token}`
      setShareLink(shareUrl)
      setExpiresAt(expires)
    } catch (error) {
      console.error('Error creating share:', error)
      alert(error instanceof Error ? error.message : 'Failed to create share')
    } finally {
      setIsLoading(false)
    }
  }
  
  const copyToClipboard = async () => {
    await navigator.clipboard.writeText(shareLink)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }
  
  return (
    <div className="w-full max-w-3xl mx-auto bg-white rounded-lg shadow-lg border border-gray-200">
      {/* Header */}
      <div className="p-6 pb-4 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold text-gray-900">FastShare</h1>
          <Link href="/how-it-works" className="text-gray-400 hover:text-gray-600 transition-colors">
            <HelpCircle size={20} />
          </Link>
        </div>
        <p className="text-gray-600 mt-1">Share text or files with temporary links</p>
      </div>
      
      {/* Tabs */}
      <div className="flex border-b border-gray-200">
        <button
          onClick={() => setActiveTab('text')}
          className={`flex-1 flex items-center justify-center gap-2 px-6 py-4 text-sm font-medium transition-colors ${
            activeTab === 'text'
              ? 'text-blue-600 border-b-2 border-blue-600 bg-blue-50'
              : 'text-gray-500 hover:text-gray-700'
          }`}
        >
          <FileText size={16} />
          Text / Code
        </button>
        <button
          onClick={() => setActiveTab('file')}
          className={`flex-1 flex items-center justify-center gap-2 px-6 py-4 text-sm font-medium transition-colors ${
            activeTab === 'file'
              ? 'text-blue-600 border-b-2 border-blue-600 bg-blue-50'
              : 'text-gray-500 hover:text-gray-700'
          }`}
        >
          <File size={16} />
          File
        </button>
      </div>
      
      {/* Content */}
      <div className="p-6">
        {activeTab === 'text' ? (
          <div className="space-y-4">
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="w-full h-64 p-4 font-mono text-sm border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
              placeholder="Paste your text or code here..."
              aria-label="Text content to share"
            />
            <input
              type="text"
              value={filename}
              onChange={(e) => setFilename(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Optional filename (e.g., script.js)"
              aria-label="Optional filename"
            />
          </div>
        ) : (
          <div
            className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
              dragOver ? 'border-blue-400 bg-blue-50' : 'border-gray-300'
            }`}
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
          >
            {file ? (
              <div className="space-y-3">
                <File size={48} className="mx-auto text-green-600" />
                <div>
                  <p className="font-medium text-gray-900">{file.name}</p>
                  <p className="text-sm text-gray-500">
                    {file.size > 1024 * 1024 ? 
                      `${(file.size / (1024 * 1024)).toFixed(1)} MB` : 
                      `${Math.round(file.size / 1024)} KB`}
                  </p>
                </div>
                <button
                  onClick={() => setFile(null)}
                  className="text-sm text-red-600 hover:text-red-700"
                >
                  Remove file
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                <Upload size={48} className="mx-auto text-gray-400" />
                <div>
                  <p className="text-lg font-medium text-gray-900">Drop a file here</p>
                  <p className="text-sm text-gray-500">or click to select (max 10MB)</p>
                </div>
                <button
                  onClick={() => fileInputRef.current?.click()}
                  className="px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                >
                  Select File
                </button>
              </div>
            )}
          </div>
        )}
        
        <input
          ref={fileInputRef}
          type="file"
          onChange={handleFileUpload}
          className="hidden"
        />
        
        {/* Generate Button */}
        <button
          onClick={generateLink}
          disabled={(activeTab === 'text' && !content.trim()) || (activeTab === 'file' && !file) || isLoading}
          className="w-full mt-6 flex items-center justify-center gap-2 px-6 py-4 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors text-lg font-medium"
        >
          <LinkIcon size={20} />
          {isLoading ? 'Generating...' : 'Generate Link'}
        </button>
        
        {/* Generated Link */}
        {shareLink && (
          <div className="mt-6 p-6 bg-green-50 border border-green-200 rounded-lg">
            <div className="flex items-center justify-between mb-4">
              <p className="font-medium text-green-800">Your share link:</p>
              {timeLeft && (
                <span className="text-sm text-green-600">Expires in {timeLeft}</span>
              )}
            </div>
            <div className="flex flex-col sm:flex-row gap-3">
              <input
                type="text"
                value={shareLink}
                readOnly
                className="flex-1 p-3 text-lg bg-white border border-green-300 rounded-md font-mono"
                aria-label="Generated share link"
              />
              <button
                onClick={copyToClipboard}
                className="flex items-center justify-center gap-2 px-6 py-3 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors font-medium"
              >
                <Copy size={16} />
                {copied ? 'Copied!' : 'Copy'}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}