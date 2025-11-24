export default function Privacy() {
  const cardStyle = {
    backgroundColor: 'white',
    borderRadius: '12px',
    padding: '40px',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    lineHeight: '1.6'
  }

  return (
    <div style={cardStyle}>
      <h1 style={{ margin: '0 0 30px 0', color: '#333', fontSize: '28px' }}>Privacy Policy</h1>
      
      <p style={{ marginBottom: '20px', color: '#666', fontSize: '14px' }}>
        Effective Date: {new Date().toLocaleDateString()} | Last Updated: {new Date().toLocaleDateString()}
      </p>
      
      <h2 style={{ margin: '30px 0 15px 0', color: '#333', fontSize: '20px' }}>Information We Collect</h2>
      <p style={{ marginBottom: '20px', color: '#555', fontSize: '16px' }}>
        FastDrop operates on a minimal data collection principle. We collect only:
      </p>
      <ul style={{ color: '#555', fontSize: '16px', paddingLeft: '20px', marginBottom: '20px' }}>
        <li style={{ marginBottom: '8px' }}>Content you voluntarily share (text or files) - stored temporarily for 24 hours only</li>
        <li style={{ marginBottom: '8px' }}>Basic server logs for security and performance monitoring</li>
        <li style={{ marginBottom: '8px' }}>No personal information, email addresses, or user accounts</li>
        <li style={{ marginBottom: '8px' }}>No tracking cookies or behavioral data</li>
      </ul>
      
      <h2 style={{ margin: '30px 0 15px 0', color: '#333', fontSize: '20px' }}>How We Use Information</h2>
      <p style={{ marginBottom: '20px', color: '#555', fontSize: '16px' }}>
        Your shared content is used solely to provide the sharing service. We do not analyze, 
        scan, or use your content for any other purpose. Server logs are used only for 
        maintaining service security and performance.
      </p>
      
      <h2 style={{ margin: '30px 0 15px 0', color: '#333', fontSize: '20px' }}>Data Retention and Deletion</h2>
      <p style={{ marginBottom: '20px', color: '#555', fontSize: '16px' }}>
        All uploaded content is automatically and permanently deleted after exactly 24 hours. 
        We do not maintain backups or copies. Server logs may be retained for up to 30 days 
        for security purposes only.
      </p>
      
      <h2 style={{ margin: '30px 0 15px 0', color: '#333', fontSize: '20px' }}>Third-Party Services</h2>
      <p style={{ marginBottom: '20px', color: '#555', fontSize: '16px' }}>
        We use Google AdSense to display advertisements. Google may use cookies and similar 
        technologies to show relevant ads. You can control ad personalization at{' '}
        <a href="https://adssettings.google.com" style={{ color: '#007bff' }} target="_blank" rel="noopener">
          Google Ad Settings
        </a>. We do not share your content with any third parties.
      </p>
      
      <h2 style={{ margin: '30px 0 15px 0', color: '#333', fontSize: '20px' }}>Cookies</h2>
      <p style={{ marginBottom: '20px', color: '#555', fontSize: '16px' }}>
        FastDrop uses only essential cookies required for basic functionality. Our advertising 
        partner may use cookies for ad personalization. We do not use tracking or analytics cookies.
      </p>
      
      <h2 style={{ margin: '30px 0 15px 0', color: '#333', fontSize: '20px' }}>Data Security</h2>
      <p style={{ marginBottom: '20px', color: '#555', fontSize: '16px' }}>
        We implement appropriate technical and organizational measures to protect your data 
        during transmission and temporary storage. However, no internet service can guarantee 
        100% security.
      </p>
      
      <h2 style={{ margin: '30px 0 15px 0', color: '#333', fontSize: '20px' }}>Your Rights</h2>
      <p style={{ marginBottom: '20px', color: '#555', fontSize: '16px' }}>
        Since we don't collect personal data and all content auto-deletes, there's typically 
        no personal data to access or delete. If you have concerns, contact us using the 
        information below.
      </p>
      
      <h2 style={{ margin: '30px 0 15px 0', color: '#333', fontSize: '20px' }}>Contact Information</h2>
      <p style={{ marginBottom: '20px', color: '#555', fontSize: '16px' }}>
        For privacy-related questions: <a href="mailto:privacy@fastdrop.com" style={{ color: '#007bff' }}>privacy@fastdrop.com</a>
      </p>
      
      <h2 style={{ margin: '30px 0 15px 0', color: '#333', fontSize: '20px' }}>Changes to This Policy</h2>
      <p style={{ marginBottom: '20px', color: '#555', fontSize: '16px' }}>
        We may update this privacy policy occasionally. Changes will be posted on this page 
        with an updated effective date.
      </p>
    </div>
  )
}