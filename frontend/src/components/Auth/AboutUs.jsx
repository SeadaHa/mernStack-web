import React from "react";

const AboutUs = () => {
  return (
    <section style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      minHeight: '100vh',
      backgroundColor: '#f0f0f0',
      padding: '40px 20px',
      boxSizing: 'border-box',
    }}>
      <div style={{
        background: '#fff',
        borderRadius: '10px',
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
        padding: '40px',
        maxWidth: '900px',
        width: '100%',
        boxSizing: 'border-box',
      }}>
        <h1 style={{
          fontSize: '2.5rem',
          color: '#333',
          textAlign: 'center',
          marginBottom: '20px',
        }}>About Us</h1>
        
        <h2 style={{
          fontSize: '2rem',
          color: '#555',
          marginBottom: '20px',
          textAlign: 'center',
        }}>Welcome to EthioHire - Empowering Careers, Empowering Ethiopia</h2>
        
        <p style={{
          fontSize: '1.1rem',
          lineHeight: '1.8',
          color: '#666',
          marginBottom: '20px',
          textAlign: 'justify',
        }}>
          At EthioHire, we are dedicated to revolutionizing the job market in Ethiopia. Our platform serves as the nexus where talent meets opportunity, driving economic growth and empowerment across the nation.
        </p>
        
        <h3 style={{
          fontSize: '1.5rem',
          color: '#444',
          marginBottom: '10px',
        }}>Our Vision</h3>
        <p style={{
          fontSize: '1.1rem',
          lineHeight: '1.8',
          color: '#666',
          marginBottom: '20px',
          textAlign: 'justify',
        }}>
          EthioHire envisions a future where every Ethiopian finds meaningful employment and every employer discovers exceptional talent effortlessly. We are committed to bridging the gap between aspirations and achievements, ensuring success for job seekers and employers alike.
        </p>
        
        <h3 style={{
          fontSize: '1.5rem',
          color: '#444',
          marginBottom: '10px',
        }}>What Sets Us Apart?</h3>
        <p style={{
          fontSize: '1.1rem',
          lineHeight: '1.8',
          color: '#666',
          marginBottom: '20px',
          textAlign: 'justify',
        }}>
          Innovative Solutions: Leveraging cutting-edge technology to enhance user experience and efficiency.
        </p>
        <p style={{
          fontSize: '1.1rem',
          lineHeight: '1.8',
          color: '#666',
          marginBottom: '20px',
          textAlign: 'justify',
        }}>
          Comprehensive Support: From job matching to professional development, we empower users at every career stage.
        </p>
        <p style={{
          fontSize: '1.1rem',
          lineHeight: '1.8',
          color: '#666',
          marginBottom: '20px',
          textAlign: 'justify',
        }}>
          Ethical Values: Upholding integrity, transparency, and fairness in all interactions.
        </p>
        
        <h3 style={{
          fontSize: '1.5rem',
          color: '#444',
          marginBottom: '10px',
        }}>Join the EthioHire Community</h3>
        <p style={{
          fontSize: '1.1rem',
          lineHeight: '1.8',
          color: '#666',
          marginBottom: '20px',
          textAlign: 'justify',
        }}>
          Whether you're embarking on a career journey or seeking the perfect addition to your team, EthioHire is your trusted partner. Explore endless possibilities and unlock your full potential with us.
        </p>
        
        <h3 style={{
          fontSize: '1.5rem',
          color: '#444',
          marginBottom: '10px',
        }}>Together, We Build a Brighter Future</h3>
        <p style={{
          fontSize: '1.1rem',
          lineHeight: '1.8',
          color: '#666',
          textAlign: 'justify',
        }}>
          EthioHire is more than a platform; it's a catalyst for growth and prosperity. Join us in shaping a vibrant job market and a prosperous Ethiopia.
        </p>
      </div>
    </section>
    );
  };
  
  export default AboutUs;