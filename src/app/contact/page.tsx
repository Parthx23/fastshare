export default function Contact() {
  const cardStyle = {
    backgroundColor: 'white',
    borderRadius: '12px',
    padding: '40px',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    lineHeight: '1.6'
  }

  return (
    <div style={cardStyle}>
      <h1 style={{ margin: '0 0 30px 0', color: '#333', fontSize: '28px' }}>Contact FastDrop</h1>
      
      <p style={{ marginBottom: '35px', color: '#555', fontSize: '16px' }}>
        We're here to help! Whether you have questions, feedback, or need technical support, 
        we'd love to hear from you. We typically respond within 24 hours.
      </p>
      
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', 
        gap: '30px',
        marginBottom: '40px'
      }}>
        <div style={{ 
          backgroundColor: '#f8f9fa', 
          padding: '25px', 
          borderRadius: '8px',
          border: '1px solid #e9ecef'
        }}>
          <h3 style={{ margin: '0 0 15px 0', color: '#333', fontSize: '18px' }}>
            📧 General Support
          </h3>
          <p style={{ margin: '0 0 15px 0', color: '#555', fontSize: '14px' }}>
            Technical issues, questions about the service, or general inquiries
          </p>
          <a 
            href="mailto:support@fastdrop.com" 
            style={{ 
              display: 'inline-block',
              padding: '10px 20px',
              backgroundColor: '#007bff',
              color: 'white',
              textDecoration: 'none',
              borderRadius: '6px',
              fontSize: '14px',
              fontWeight: '500'
            }}
          >
            support@fastdrop.com
          </a>
        </div>
        
        <div style={{ 
          backgroundColor: '#f8f9fa', 
          padding: '25px', 
          borderRadius: '8px',
          border: '1px solid #e9ecef'
        }}>
          <h3 style={{ margin: '0 0 15px 0', color: '#333', fontSize: '18px' }}>
            🤝 Business Inquiries
          </h3>
          <p style={{ margin: '0 0 15px 0', color: '#555', fontSize: '14px' }}>
            Partnerships, enterprise solutions, or business-related questions
          </p>
          <a 
            href="mailto:business@fastdrop.com" 
            style={{ 
              display: 'inline-block',
              padding: '10px 20px',
              backgroundColor: '#28a745',
              color: 'white',
              textDecoration: 'none',
              borderRadius: '6px',
              fontSize: '14px',
              fontWeight: '500'
            }}
          >
            business@fastdrop.com
          </a>
        </div>
        
        <div style={{ 
          backgroundColor: '#f8f9fa', 
          padding: '25px', 
          borderRadius: '8px',
          border: '1px solid #e9ecef'
        }}>
          <h3 style={{ margin: '0 0 15px 0', color: '#333', fontSize: '18px' }}>
            ⚖️ Legal & Privacy
          </h3>
          <p style={{ margin: '0 0 15px 0', color: '#555', fontSize: '14px' }}>
            Privacy concerns, legal questions, or DMCA requests
          </p>
          <a 
            href="mailto:legal@fastdrop.com" 
            style={{ 
              display: 'inline-block',
              padding: '10px 20px',
              backgroundColor: '#6c757d',
              color: 'white',
              textDecoration: 'none',
              borderRadius: '6px',
              fontSize: '14px',
              fontWeight: '500'
            }}
          >
            legal@fastdrop.com
          </a>
        </div>
        
        <div style={{ 
          backgroundColor: '#fff3cd', 
          padding: '25px', 
          borderRadius: '8px',
          border: '1px solid #ffeaa7'
        }}>
          <h3 style={{ margin: '0 0 15px 0', color: '#856404', fontSize: '18px' }}>
            🚨 Report Abuse
          </h3>
          <p style={{ margin: '0 0 15px 0', color: '#856404', fontSize: '14px' }}>
            Report inappropriate content or service abuse
          </p>
          <a 
            href="mailto:abuse@fastdrop.com" 
            style={{ 
              display: 'inline-block',
              padding: '10px 20px',
              backgroundColor: '#dc3545',
              color: 'white',
              textDecoration: 'none',
              borderRadius: '6px',
              fontSize: '14px',
              fontWeight: '500'
            }}
          >
            abuse@fastdrop.com
          </a>
        </div>
      </div>
      
      <div style={{ 
        backgroundColor: '#e7f3ff', 
        padding: '30px', 
        borderRadius: '8px',
        border: '1px solid #b3d9ff',
        marginBottom: '30px'
      }}>
        <h3 style={{ margin: '0 0 20px 0', color: '#0066cc', fontSize: '20px' }}>
          Frequently Asked Questions
        </h3>
        
        <div style={{ marginBottom: '20px' }}>
          <h4 style={{ margin: '0 0 8px 0', color: '#333', fontSize: '16px' }}>
            How long do shared files stay available?
          </h4>
          <p style={{ margin: 0, color: '#555', fontSize: '14px' }}>
            All uploads are automatically deleted after exactly 24 hours. No exceptions.
          </p>
        </div>
        
        <div style={{ marginBottom: '20px' }}>
          <h4 style={{ margin: '0 0 8px 0', color: '#333', fontSize: '16px' }}>
            What's the maximum file size I can upload?
          </h4>
          <p style={{ margin: 0, color: '#555', fontSize: '14px' }}>
            The current limit is 10MB per file. This covers most documents, images, and code files.
          </p>
        </div>
        
        <div style={{ marginBottom: '20px' }}>
          <h4 style={{ margin: '0 0 8px 0', color: '#333', fontSize: '16px' }}>
            Do I need to create an account to use FastDrop?
          </h4>
          <p style={{ margin: 0, color: '#555', fontSize: '14px' }}>
            No! FastDrop requires no registration, login, or personal information whatsoever.
          </p>
        </div>
        
        <div style={{ marginBottom: '20px' }}>
          <h4 style={{ margin: '0 0 8px 0', color: '#333', fontSize: '16px' }}>
            Is my data secure and private?
          </h4>
          <p style={{ margin: 0, color: '#555', fontSize: '14px' }}>
            Yes. We use HTTPS encryption, don't track users, and automatically delete all content after 24 hours.
          </p>
        </div>
        
        <div>
          <h4 style={{ margin: '0 0 8px 0', color: '#333', fontSize: '16px' }}>
            Can I delete my content before the 24-hour limit?
          </h4>
          <p style={{ margin: 0, color: '#555', fontSize: '14px' }}>
            Currently, content auto-deletes after 24 hours. If you need immediate removal, contact our support team.
          </p>
        </div>
      </div>
      
      <div style={{ 
        textAlign: 'center',
        padding: '25px',
        backgroundColor: '#f8f9fa',
        borderRadius: '8px',
        border: '1px solid #e9ecef'
      }}>
        <h3 style={{ margin: '0 0 15px 0', color: '#333', fontSize: '18px' }}>
          Response Time
        </h3>
        <p style={{ margin: '0 0 20px 0', color: '#555', fontSize: '16px' }}>
          We typically respond to all inquiries within <strong>24 hours</strong> during business days.
          For urgent issues, please mark your email as "URGENT" in the subject line.
        </p>
        <p style={{ margin: 0, color: '#666', fontSize: '14px' }}>
          Business Hours: Monday - Friday, 9:00 AM - 6:00 PM (UTC)
        </p>
      </div>
    </div>
  )
}