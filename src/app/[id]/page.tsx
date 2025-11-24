'use client'

import { useState, useEffect } from 'react'

export default function SharePage({ params }: { params: { id: string } }) {
  const [content, setContent] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    fetch(`/api/get/${params.id}`)
      .then(res => {
        if (res.headers.get('content-type')?.includes('application/json')) {
          return res.json()
        } else {
          // File download
          const filename = res.headers.get('content-disposition')?.split('filename=')[1]?.replace(/"/g, '') || 'download'
          res.blob().then(blob => {
            const url = URL.createObjectURL(blob)
            const a = document.createElement('a')
            a.href = url
            a.download = filename
            a.click()
            URL.revokeObjectURL(url)
          })
          setContent({ type: 'file', filename })
          setLoading(false)
          return null
        }
      })
      .then(data => {
        if (data) {
          if (data.error) {
            setError(data.error)
          } else {
            setContent(data)
          }
        }
        setLoading(false)
      })
      .catch(() => {
        setError('Failed to load')
        setLoading(false)
      })
  }, [params.id])

  if (loading) {
    return (
      <div style={{ textAlign: 'center', padding: '50px', fontFamily: 'system-ui' }}>
        Loading...
      </div>
    )
  }

  if (error) {
    return (
      <div style={{ textAlign: 'center', padding: '50px', fontFamily: 'system-ui' }}>
        <h2>Not Found</h2>
        <p>This share has expired or doesn't exist.</p>
        <a href="/" style={{ color: '#007bff' }}>← Back to Home</a>
      </div>
    )
  }

  if (content?.type === 'file') {
    return (
      <div style={{ textAlign: 'center', padding: '50px', fontFamily: 'system-ui' }}>
        <h2>File Downloaded</h2>
        <p>Your file "{content.filename}" should start downloading automatically.</p>
        <a href="/" style={{ color: '#007bff' }}>← Back to Home</a>
      </div>
    )
  }

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', padding: '20px', fontFamily: 'system-ui' }}>
      <div style={{ marginBottom: '20px' }}>
        <a href="/" style={{ color: '#007bff', textDecoration: 'none' }}>← Back to Home</a>
      </div>
      
      <div style={{ border: '1px solid #ddd', borderRadius: '8px', padding: '20px' }}>
        <h2>Shared Text</h2>
        <div style={{ 
          backgroundColor: '#f8f9fa', 
          padding: '15px', 
          borderRadius: '4px',
          border: '1px solid #e9ecef',
          fontFamily: 'monospace',
          whiteSpace: 'pre-wrap',
          wordBreak: 'break-word'
        }}>
          {content?.content}
        </div>
        
        <button
          onClick={() => navigator.clipboard.writeText(content?.content || '')}
          style={{
            marginTop: '15px',
            padding: '8px 16px',
            backgroundColor: '#007bff',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer'
          }}
        >
          Copy Text
        </button>
      </div>
    </div>
  )
}