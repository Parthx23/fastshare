'use client'

import { useState, useRef, useEffect } from 'react'
import { useMutation } from "convex/react"
import { api } from "../../convex/_generated/api"

export default function Home() {
  const [text, setText] = useState("")
  const [file, setFile] = useState<File | null>(null)
  const [shareLink, setShareLink] = useState("")
  const [loading, setLoading] = useState(false)

  const fileRef = useRef<HTMLInputElement>(null)

  // Convex mutation
  const createShare = useMutation(api.shares.createShare)

  // Adsense fix
  useEffect(() => {
    if (typeof window !== "undefined") {
      // @ts-ignore
      window.adsbygoogle = window.adsbygoogle || [];
      // @ts-ignore
      window.adsbygoogle.push({});
    }
  }, []);

  // Generate share link
  const generateLink = async () => {
    if (!text.trim() && !file) return
    setLoading(true)
  
    try {
      // CASE 1: FILE UPLOAD
      if (file) {
        const reader = new FileReader()
        reader.onload = async () => {
          const base64 = reader.result as string

          const result = await createShare({
            type: "file",
            filename: file.name,
            fileType: file.type,
            fileData: base64,
          })

          setShareLink(result.url)
          alert("Share link created: " + result.url)
        }

        reader.readAsDataURL(file)
        setLoading(false)
        return;
      }

      // CASE 2: TEXT SHARE
      const result = await createShare({
        type: "text",
        text
      })

      setShareLink(result.url)
      alert("Share link created: " + result.url)

    } catch (error) {
      console.error(error)
      alert("Failed to generate link")
    }

    setLoading(false)
  }

  const copyLink = () => {
    navigator.clipboard.writeText(shareLink)
    alert("Link copied!")
  }

}
