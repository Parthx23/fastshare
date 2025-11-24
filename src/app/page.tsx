'use client'

import { useState, useRef, useEffect } from 'react'

export default function Home() {
  const [text, setText] = useState('')
  const [file, setFile] = useState<File | null>(null)
  const [shareLink, setShareLink] = useState('')
  const [loading, setLoading] = useState(false)
  const fileRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.adsbygoogle = window.adsbygoogle || [];
      window.adsbygoogle.push({});
    }
  }, [])

  const generateLink = async () => {
    if (!text.trim() && !file) return
    
    setLoading(true)
    try {
      let response
      
      if (file) {
        const formData = new FormData()
        formData.append('file', file)
        response = await fetch('/api/upload', {
          method: 'POST',
          body: formData
        })
      } else {
        response = await fetch('/api/text', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ text })
        })
      }
      
      const data = await response.json()
      if (response.ok) {
        setShareLink(data.url)
      } else {
        alert(data.error || 'Failed to generate link')
      }
    } catch (error) {
      alert('Failed to generate link')
    }
    setLoading(false)
  }

  const copyLink = () => {
    navigator.clipboard.writeText(shareLink)
    alert('Link copied to clipboard!')
  }

  const cardStyle = {
    backgroundColor: 'white',
    borderRadius: '16px',
    padding: '40px',
    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)',
    border: '1px solid #e1e8ed',
    marginBottom: '32px'
  }

  const buttonStyle = {
    padding: '16px 32px',
    borderRadius: '12px',
    border: 'none',
    cursor: 'pointer',
    fontSize: '16px',
    fontWeight: '600',
    transition: 'all 0.2s ease',
    fontFamily: 'inherit'
  }

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto' }}>
      {/* Hero Section */}
      <div style={{ textAlign: 'center', marginBottom: '48px' }}>
        <h2 style={{ 
          fontSize: '32px', 
          fontWeight: '700', 
          color: '#2c3e50', 
          margin: '0 0 16px 0',
          letterSpacing: '-0.5px'
        }}>
          Share Files & Text Instantly
        </h2>
        <p style={{ 
          fontSize: '18px', 
          color: '#7f8c8d', 
          margin: 0,
          maxWidth: '600px',
          marginLeft: 'auto',
          marginRight: 'auto'
        }}>
          Upload files up to 10MB or paste text content. Get an instant share link. 
          Everything auto-deletes after 24 hours for your privacy.
        </p>
      </div>

      {/* Ad Slot Below Hero */}
      <div style={{ 
        marginBottom: '48px',
        padding: '24px',
        backgroundColor: 'white',
        borderRadius: '12px',
        border: '1px solid #e1e8ed',
        textAlign: 'center'
      }}>
        <ins 
          className="adsbygoogle"
          style={{ display: 'block' }}
          data-ad-client="ca-pub-XXXXXXXXXX"
          data-ad-slot="XXXXXXXXXX"
          data-ad-format="auto"
          data-full-width-responsive="true"
        />
      </div>

      {/* Main Sharing Card */}
      <div style={cardStyle}>
        <div style={{ marginBottom: '32px' }}>
          <label style={{ 
            display: 'block', 
            marginBottom: '12px', 
            fontWeight: '600', 
            color: '#2c3e50',
            fontSize: '16px'
          }}>
            📝 Paste Text or Code
          </label>
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Paste your text, code, notes, or any content here..."
            style={{
              width: '100%',
              height: '200px',
              padding: '20px',
              border: '2px solid #e1e8ed',
              borderRadius: '12px',
              fontSize: '15px',
              fontFamily: '"SF Mono", Monaco, "Cascadia Code", "Roboto Mono", Consolas, "Courier New", monospace',
              resize: 'vertical',
              outline: 'none',
              boxSizing: 'border-box',
              backgroundColor: '#fafbfc',
              transition: 'border-color 0.2s ease'
            }}
            onFocus={(e) => e.target.style.borderColor = '#3498db'}
            onBlur={(e) => e.target.style.borderColor = '#e1e8ed'}
          />
        </div>

        <div style={{ marginBottom: '32px' }}>
          <label style={{ 
            display: 'block', 
            marginBottom: '12px', 
            fontWeight: '600', 
            color: '#2c3e50',
            fontSize: '16px'
          }}>
            📁 Or Upload a File
          </label>
          <input
            ref={fileRef}
            type="file"
            onChange={(e) => setFile(e.target.files?.[0] || null)}
            style={{ display: 'none' }}
          />
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px', flexWrap: 'wrap' }}>
            <button
              onClick={() => fileRef.current?.click()}
              style={{
                ...buttonStyle,
                backgroundColor: '#95a5a6',
                color: 'white'
              }}
            >
              Choose File
            </button>
            {file && (
              <div style={{ 
                padding: '12px 20px',
                backgroundColor: '#e8f5e8',
                borderRadius: '8px',
                border: '1px solid #27ae60',
                fontSize: '14px',
                color: '#27ae60'
              }}>
                ✓ {file.name} ({Math.round(file.size / 1024)}KB)
              </div>
            )}
          </div>
        </div>

        <button
          onClick={generateLink}
          disabled={(!text.trim() && !file) || loading}
          style={{
            ...buttonStyle,
            backgroundColor: '#3498db',
            color: 'white',
            width: '100%',
            opacity: ((!text.trim() && !file) || loading) ? 0.6 : 1,
            fontSize: '18px'
          }}
        >
          {loading ? '⏳ Generating Link...' : '🔗 Generate Share Link'}
        </button>

        <div style={{ 
          marginTop: '24px',
          padding: '16px',
          backgroundColor: '#fff3cd',
          borderRadius: '8px',
          border: '1px solid #ffeaa7',
          textAlign: 'center'
        }}>
          <p style={{ 
            margin: 0, 
            fontSize: '14px', 
            color: '#856404',
            fontWeight: '500'
          }}>
            🔒 Privacy Protected: All uploads automatically delete after 24 hours
          </p>
        </div>
      </div>

      {/* Generated Link Card */}
      {shareLink && (
        <div style={cardStyle}>
          <h3 style={{ 
            margin: '0 0 20px 0', 
            color: '#2c3e50',
            fontSize: '20px',
            fontWeight: '600'
          }}>
            🎉 Your Share Link is Ready!
          </h3>
          <div style={{ 
            display: 'flex', 
            gap: '12px', 
            alignItems: 'stretch',
            flexDirection: typeof window !== 'undefined' && window.innerWidth < 600 ? 'column' : 'row'
          }}>
            <input
              type="text"
              value={shareLink}
              readOnly
              style={{
                flex: 1,
                padding: '16px 20px',
                border: '2px solid #27ae60',
                borderRadius: '12px',
                backgroundColor: '#e8f5e8',
                fontSize: '15px',
                fontFamily: 'monospace',
                color: '#27ae60',
                fontWeight: '600'
              }}
            />
            <button
              onClick={copyLink}
              style={{
                ...buttonStyle,
                backgroundColor: '#27ae60',
                color: 'white',
                minWidth: '120px'
              }}
            >
              📋 Copy Link
            </button>
          </div>
          <p style={{ 
            margin: '16px 0 0 0', 
            fontSize: '14px', 
            color: '#7f8c8d',
            textAlign: 'center'
          }}>
            Share this link with anyone. It will expire in 24 hours.
          </p>
        </div>
      )}

      {/* Features Section */}
      <div style={cardStyle}>
        <h3 style={{ 
          margin: '0 0 24px 0', 
          color: '#2c3e50',
          fontSize: '20px',
          fontWeight: '600',
          textAlign: 'center'
        }}>
          Why Choose FastDrop?
        </h3>
        <div style={{ 
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '24px'
        }}>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '32px', marginBottom: '8px' }}>🚀</div>
            <h4 style={{ margin: '0 0 8px 0', fontSize: '16px', fontWeight: '600', color: '#2c3e50' }}>
              Instant Sharing
            </h4>
            <p style={{ margin: 0, fontSize: '14px', color: '#7f8c8d' }}>
              No registration required. Share immediately.
            </p>
          </div>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '32px', marginBottom: '8px' }}>🔒</div>
            <h4 style={{ margin: '0 0 8px 0', fontSize: '16px', fontWeight: '600', color: '#2c3e50' }}>
              Privacy First
            </h4>
            <p style={{ margin: 0, fontSize: '14px', color: '#7f8c8d' }}>
              Auto-delete after 24 hours. No tracking.
            </p>
          </div>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '32px', marginBottom: '8px' }}>⚡</div>
            <h4 style={{ margin: '0 0 8px 0', fontSize: '16px', fontWeight: '600', color: '#2c3e50' }}>
              Lightning Fast
            </h4>
            <p style={{ margin: 0, fontSize: '14px', color: '#7f8c8d' }}>
              Optimized for speed and simplicity.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}