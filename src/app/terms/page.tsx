export default function Terms() {
  const cardStyle = {
    backgroundColor: 'white',
    borderRadius: '12px',
    padding: '40px',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    lineHeight: '1.6'
  }

  return (
    <div style={cardStyle}>
      <h1 style={{ margin: '0 0 30px 0', color: '#333', fontSize: '28px' }}>Terms & Conditions</h1>
      
      <p style={{ marginBottom: '20px', color: '#666', fontSize: '14px' }}>
        Effective Date: {new Date().toLocaleDateString()} | Last Updated: {new Date().toLocaleDateString()}
      </p>
      
      <h2 style={{ margin: '30px 0 15px 0', color: '#333', fontSize: '20px' }}>Acceptance of Terms</h2>
      <p style={{ marginBottom: '20px', color: '#555', fontSize: '16px' }}>
        By accessing or using FastDrop, you agree to be bound by these Terms & Conditions. 
        If you do not agree to these terms, please do not use our service.
      </p>
      
      <h2 style={{ margin: '30px 0 15px 0', color: '#333', fontSize: '20px' }}>Service Description</h2>
      <p style={{ marginBottom: '20px', color: '#555', fontSize: '16px' }}>
        FastDrop provides a temporary file and text sharing service. Content is automatically 
        deleted after 24 hours. The service is provided "as is" without warranties of any kind.
      </p>
      
      <h2 style={{ margin: '30px 0 15px 0', color: '#333', fontSize: '20px' }}>Acceptable Use</h2>
      <p style={{ marginBottom: '10px', color: '#555', fontSize: '16px' }}>You may use FastDrop for legitimate purposes only. You agree NOT to:</p>
      <ul style={{ color: '#555', fontSize: '16px', paddingLeft: '20px', marginBottom: '20px' }}>
        <li style={{ marginBottom: '8px' }}>Upload illegal, harmful, or malicious content</li>
        <li style={{ marginBottom: '8px' }}>Share copyrighted material without proper authorization</li>
        <li style={{ marginBottom: '8px' }}>Distribute malware, viruses, or harmful code</li>
        <li style={{ marginBottom: '8px' }}>Violate any applicable laws or regulations</li>
        <li style={{ marginBottom: '8px' }}>Infringe on others' intellectual property rights</li>
        <li style={{ marginBottom: '8px' }}>Share personal information of others without consent</li>
        <li style={{ marginBottom: '8px' }}>Use the service for spam or unsolicited communications</li>
        <li style={{ marginBottom: '8px' }}>Attempt to compromise service security or availability</li>
      </ul>
      
      <h2 style={{ margin: '30px 0 15px 0', color: '#333', fontSize: '20px' }}>Service Limitations</h2>
      <ul style={{ color: '#555', fontSize: '16px', paddingLeft: '20px', marginBottom: '20px' }}>
        <li style={{ marginBottom: '8px' }}>Maximum file size: 10MB per upload</li>
        <li style={{ marginBottom: '8px' }}>Content automatically expires after 24 hours</li>
        <li style={{ marginBottom: '8px' }}>Service availability is not guaranteed</li>
        <li style={{ marginBottom: '8px' }}>Rate limiting may apply to prevent abuse</li>
        <li style={{ marginBottom: '8px' }}>We reserve the right to remove content that violates these terms</li>
      </ul>
      
      <h2 style={{ margin: '30px 0 15px 0', color: '#333', fontSize: '20px' }}>User Responsibility</h2>
      <p style={{ marginBottom: '20px', color: '#555', fontSize: '16px' }}>
        You are solely responsible for the content you share through FastDrop. You warrant that 
        you have the right to share such content and that it does not violate any laws or 
        third-party rights.
      </p>
      
      <h2 style={{ margin: '30px 0 15px 0', color: '#333', fontSize: '20px' }}>Intellectual Property</h2>
      <p style={{ marginBottom: '20px', color: '#555', fontSize: '16px' }}>
        You retain all rights to content you upload. By using FastDrop, you grant us a 
        temporary license to store and serve your content solely for the purpose of providing 
        the sharing service.
      </p>
      
      <h2 style={{ margin: '30px 0 15px 0', color: '#333', fontSize: '20px' }}>Disclaimer of Warranties</h2>
      <p style={{ marginBottom: '20px', color: '#555', fontSize: '16px' }}>
        FastDrop is provided "as is" without warranties of any kind, either express or implied. 
        We do not guarantee service availability, data integrity, or fitness for any particular purpose.
      </p>
      
      <h2 style={{ margin: '30px 0 15px 0', color: '#333', fontSize: '20px' }}>Limitation of Liability</h2>
      <p style={{ marginBottom: '20px', color: '#555', fontSize: '16px' }}>
        To the maximum extent permitted by law, FastDrop shall not be liable for any indirect, 
        incidental, special, or consequential damages arising from your use of the service.
      </p>
      
      <h2 style={{ margin: '30px 0 15px 0', color: '#333', fontSize: '20px' }}>DMCA and Copyright</h2>
      <p style={{ marginBottom: '20px', color: '#555', fontSize: '16px' }}>
        We respect intellectual property rights. If you believe content infringes your copyright, 
        contact us at: <a href="mailto:dmca@fastdrop.com" style={{ color: '#007bff' }}>dmca@fastdrop.com</a>
      </p>
      
      <h2 style={{ margin: '30px 0 15px 0', color: '#333', fontSize: '20px' }}>Termination</h2>
      <p style={{ marginBottom: '20px', color: '#555', fontSize: '16px' }}>
        We may terminate or suspend access to our service immediately, without prior notice, 
        for conduct that we believe violates these terms or is harmful to other users.
      </p>
      
      <h2 style={{ margin: '30px 0 15px 0', color: '#333', fontSize: '20px' }}>Changes to Terms</h2>
      <p style={{ marginBottom: '20px', color: '#555', fontSize: '16px' }}>
        We reserve the right to modify these terms at any time. Changes will be effective 
        immediately upon posting. Continued use constitutes acceptance of modified terms.
      </p>
      
      <h2 style={{ margin: '30px 0 15px 0', color: '#333', fontSize: '20px' }}>Contact Information</h2>
      <p style={{ marginBottom: '20px', color: '#555', fontSize: '16px' }}>
        For questions about these terms: <a href="mailto:legal@fastdrop.com" style={{ color: '#007bff' }}>legal@fastdrop.com</a>
      </p>
    </div>
  )
}