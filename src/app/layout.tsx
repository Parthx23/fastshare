import Link from 'next/link'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <title>FastDrop - Instant File & Text Sharing</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="description" content="Share files and text instantly without registration. Auto-delete after 24 hours for privacy." />
        
        {/* AdSense Auto Ads */}
        <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-XXXXXXXXXX" crossOrigin="anonymous"></script>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (adsbygoogle = window.adsbygoogle || []).push({
                google_ad_client: "ca-pub-XXXXXXXXXX",
                enable_page_level_ads: true
              });
            `
          }}
        />
      </head>
      <body style={{ 
        margin: 0, 
        fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif', 
        backgroundColor: '#f5f7fa', 
        minHeight: '100vh',
        lineHeight: '1.6',
        color: '#2c3e50'
      }}>
        <header style={{ 
          backgroundColor: 'white', 
          padding: '32px 0', 
          boxShadow: '0 2px 10px rgba(0,0,0,0.08)',
          marginBottom: '48px',
          borderBottom: '1px solid #e1e8ed'
        }}>
          <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 24px', textAlign: 'center' }}>
            <Link href="/" style={{ textDecoration: 'none', color: 'inherit' }}>
              <h1 style={{ 
                margin: 0, 
                fontSize: '42px', 
                color: '#2c3e50', 
                fontWeight: '700',
                letterSpacing: '-0.5px'
              }}>
                FastDrop
              </h1>
              <p style={{ 
                margin: '12px 0 0 0', 
                color: '#7f8c8d', 
                fontSize: '18px',
                fontWeight: '400'
              }}>
                Instant text, file & code sharing. No login required.
              </p>
            </Link>
          </div>
        </header>
        
        <main style={{ 
          maxWidth: '1200px', 
          margin: '0 auto', 
          padding: '0 24px',
          minHeight: 'calc(100vh - 400px)'
        }}>
          {children}
        </main>
        
        {/* Footer Banner Ad */}
        <div style={{ 
          padding: '32px 24px',
          backgroundColor: '#f8f9fa',
          borderTop: '1px solid #e1e8ed'
        }}>
          <div style={{ maxWidth: '1200px', margin: '0 auto', textAlign: 'center' }}>
            <ins 
              className="adsbygoogle"
              style={{ display: 'block' }}
              data-ad-client="ca-pub-XXXXXXXXXX"
              data-ad-slot="XXXXXXXXXX"
              data-ad-format="auto"
              data-full-width-responsive="true"
            />
          </div>
        </div>
        
        <footer style={{ 
          padding: '48px 24px 32px', 
          backgroundColor: 'white', 
          borderTop: '1px solid #e1e8ed'
        }}>
          <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
            <div style={{ 
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
              gap: '32px',
              marginBottom: '32px'
            }}>
              <div>
                <h3 style={{ margin: '0 0 16px 0', fontSize: '16px', fontWeight: '600', color: '#2c3e50' }}>
                  FastDrop
                </h3>
                <p style={{ margin: 0, fontSize: '14px', color: '#7f8c8d', lineHeight: '1.5' }}>
                  Secure, temporary file and text sharing with automatic 24-hour deletion.
                </p>
              </div>
              
              <div>
                <h4 style={{ margin: '0 0 16px 0', fontSize: '14px', fontWeight: '600', color: '#2c3e50' }}>
                  Legal
                </h4>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  <Link href="/privacy" style={{ color: '#7f8c8d', textDecoration: 'none', fontSize: '14px' }}>
                    Privacy Policy
                  </Link>
                  <Link href="/terms" style={{ color: '#7f8c8d', textDecoration: 'none', fontSize: '14px' }}>
                    Terms & Conditions
                  </Link>
                </div>
              </div>
              
              <div>
                <h4 style={{ margin: '0 0 16px 0', fontSize: '14px', fontWeight: '600', color: '#2c3e50' }}>
                  Company
                </h4>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  <Link href="/about" style={{ color: '#7f8c8d', textDecoration: 'none', fontSize: '14px' }}>
                    About Us
                  </Link>
                  <Link href="/contact" style={{ color: '#7f8c8d', textDecoration: 'none', fontSize: '14px' }}>
                    Contact
                  </Link>
                </div>
              </div>
            </div>
            
            <div style={{ 
              paddingTop: '24px', 
              borderTop: '1px solid #e1e8ed',
              textAlign: 'center'
            }}>
              <p style={{ margin: 0, color: '#95a5a6', fontSize: '14px' }}>
                © 2024 FastDrop. All rights reserved. Files auto-delete after 24 hours.
              </p>
            </div>
          </div>
        </footer>

        {/* AdSense Script Initialization */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (adsbygoogle = window.adsbygoogle || []).push({});
            `
          }}
        />
      </body>
    </html>
  )
}