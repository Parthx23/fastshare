export default function About() {
  const cardStyle = {
    backgroundColor: 'white',
    borderRadius: '12px',
    padding: '40px',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    lineHeight: '1.6'
  }

  return (
    <div style={cardStyle}>
      <h1 style={{ margin: '0 0 30px 0', color: '#333', fontSize: '28px' }}>About FastDrop</h1>
      
      <p style={{ marginBottom: '25px', color: '#555', fontSize: '18px', fontWeight: '500' }}>
        FastDrop is a privacy-focused file and text sharing service designed for quick, 
        secure, and temporary content sharing without the complexity of user accounts 
        or permanent data storage.
      </p>
      
      <h2 style={{ margin: '35px 0 20px 0', color: '#333', fontSize: '22px' }}>Our Mission</h2>
      <p style={{ marginBottom: '20px', color: '#555', fontSize: '16px' }}>
        We believe sharing should be simple, secure, and respect your privacy. FastDrop 
        eliminates the friction of traditional file sharing by providing instant access 
        without registration, while ensuring your data doesn't persist longer than necessary.
      </p>
      
      <h2 style={{ margin: '35px 0 20px 0', color: '#333', fontSize: '22px' }}>How It Works</h2>
      <p style={{ marginBottom: '15px', color: '#555', fontSize: '16px' }}>
        FastDrop operates on three core principles:
      </p>
      <ol style={{ color: '#555', fontSize: '16px', paddingLeft: '20px', marginBottom: '25px' }}>
        <li style={{ marginBottom: '10px' }}>
          <strong>Instant Sharing:</strong> Paste text or upload files up to 10MB instantly
        </li>
        <li style={{ marginBottom: '10px' }}>
          <strong>Automatic Deletion:</strong> All content is permanently deleted after 24 hours
        </li>
        <li style={{ marginBottom: '10px' }}>
          <strong>No Tracking:</strong> We don't collect personal data or require accounts
        </li>
      </ol>
      
      <h2 style={{ margin: '35px 0 20px 0', color: '#333', fontSize: '22px' }}>Perfect For</h2>
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', 
        gap: '20px',
        marginBottom: '25px'
      }}>
        <div>
          <h4 style={{ margin: '0 0 8px 0', color: '#333' }}>Developers</h4>
          <p style={{ margin: 0, color: '#666', fontSize: '14px' }}>
            Share code snippets, configuration files, and debug logs quickly
          </p>
        </div>
        <div>
          <h4 style={{ margin: '0 0 8px 0', color: '#333' }}>Students</h4>
          <p style={{ margin: 0, color: '#666', fontSize: '14px' }}>
            Exchange assignments, notes, and project files without email limits
          </p>
        </div>
        <div>
          <h4 style={{ margin: '0 0 8px 0', color: '#333' }}>Professionals</h4>
          <p style={{ margin: 0, color: '#666', fontSize: '14px' }}>
            Send documents and files securely without permanent storage concerns
          </p>
        </div>
        <div>
          <h4 style={{ margin: '0 0 8px 0', color: '#333' }}>Teams</h4>
          <p style={{ margin: 0, color: '#666', fontSize: '14px' }}>
            Collaborate on temporary content without cluttering shared drives
          </p>
        </div>
      </div>
      
      <h2 style={{ margin: '35px 0 20px 0', color: '#333', fontSize: '22px' }}>Why Choose FastDrop?</h2>
      <div style={{ backgroundColor: '#f8f9fa', padding: '25px', borderRadius: '8px', marginBottom: '25px' }}>
        <ul style={{ color: '#555', fontSize: '16px', paddingLeft: '20px', margin: 0 }}>
          <li style={{ marginBottom: '12px' }}>
            <strong>Privacy First:</strong> No user accounts, tracking, or permanent data storage
          </li>
          <li style={{ marginBottom: '12px' }}>
            <strong>Automatic Cleanup:</strong> Content self-destructs after 24 hours
          </li>
          <li style={{ marginBottom: '12px' }}>
            <strong>Fast & Lightweight:</strong> Loads in under 1 second with minimal interface
          </li>
          <li style={{ marginBottom: '12px' }}>
            <strong>Cross-Platform:</strong> Works on any device with a web browser
          </li>
          <li style={{ marginBottom: '12px' }}>
            <strong>No Limits:</strong> Share text, code, documents, images, and more
          </li>
          <li style={{ marginBottom: '0' }}>
            <strong>Secure:</strong> HTTPS encryption and temporary storage protect your data
          </li>
        </ul>
      </div>
      
      <h2 style={{ margin: '35px 0 20px 0', color: '#333', fontSize: '22px' }}>Our Commitment</h2>
      <p style={{ marginBottom: '20px', color: '#555', fontSize: '16px' }}>
        FastDrop is committed to maintaining a simple, secure, and privacy-respecting service. 
        We continuously work to improve performance while keeping the interface minimal and 
        the privacy guarantees strong.
      </p>
      
      <div style={{ 
        backgroundColor: '#e7f3ff', 
        border: '1px solid #b3d9ff', 
        padding: '20px', 
        borderRadius: '8px',
        textAlign: 'center'
      }}>
        <p style={{ margin: '0 0 15px 0', color: '#0066cc', fontSize: '16px', fontWeight: '500' }}>
          Ready to start sharing?
        </p>
        <a 
          href="/" 
          style={{ 
            display: 'inline-block',
            padding: '12px 24px',
            backgroundColor: '#007bff',
            color: 'white',
            textDecoration: 'none',
            borderRadius: '6px',
            fontWeight: '500'
          }}
        >
          Try FastDrop Now
        </a>
      </div>
    </div>
  )
}