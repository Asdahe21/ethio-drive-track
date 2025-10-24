import React from "react";

const ContactUs = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Contact form submitted. Data request sent.");
    alert("Your data request has been sent! We'll be in touch shortly.");
  };

  return (
    <div style={styles.container}>
      <div style={styles.contentBox}>
        {/* HEADER SECTION: Focus on Verification and Trust */}
        <div style={styles.header}>
          <h1 style={styles.title}>Need to Verify Something? 🔍</h1>
          <p style={styles.subtitle}>
            Our dedicated support team is here to assist with your data journey. Get fast answers from the experts.
          </p>
        </div>

        {/* MAIN CONTACT FORM SECTION */}
        <div style={styles.formSection}>
          <h2 style={styles.formTitle}>Submit a Data Request</h2>
          <form style={styles.form} onSubmit={handleSubmit}>
            <input 
              style={styles.input} 
              type="text" 
              placeholder="Your Full Name" 
              required 
            />
            <input 
              style={styles.input} 
              type="email" 
              placeholder="Email Address (For Reply)" 
              required 
            />
            <input 
              style={styles.input} 
              type="text" 
              placeholder="VIN Number (Optional, for quicker checks)" 
            />
            <textarea 
              style={styles.textarea} 
              placeholder="Describe your data inquiry or issue..." 
              rows="5" 
              required
            />
            <button style={styles.button} type="submit">
              Send Request
            </button>
          </form>
        </div>
        
        {/* SUPPORT CHANNELS & PROMISE SECTION */}
        <div style={styles.promiseSection}>
            <div style={styles.promiseItem}>
                <span style={styles.icon}>📞</span>
                <h3 style={styles.promiseTitle}>Direct Line</h3>
                <p style={styles.promiseText}>Prefer to talk facts? Call us during business hours at: <br/> **+1 (800) 555-DATA**</p>
            </div>
            <div style={styles.promiseItem}>
                <span style={styles.icon}>⚡</span>
                <h3 style={styles.promiseTitle}>Our Promise</h3>
                <p style={styles.promiseText}>We guarantee a reliable, data-backed response to your inquiry within 24 hours.</p>
            </div>
        </div>

      </div>
    </div>
  );
};

// --- STYLES (Inline CSS - Light Theme) ---
const styles = {
  container: {
    minHeight: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: "60px 20px",
    // Switched to a very light gray background
    background: "linear-gradient(to right, #e2e2e2, #c9d6ff)", 
  },
  contentBox: {
    backgroundColor: "white", // White container background
    borderRadius: "12px",
    padding: "40px 60px",
    maxWidth: "800px",
    width: "100%",
    boxShadow: "0 4px 20px rgba(0, 0, 0, 0.1)", // Light shadow for depth
    color: "#333", // Dark text
    textAlign: "center",
  },
  header: {
    marginBottom: "40px",
  },
  title: {
    fontSize: "2.5em",
    fontWeight: "800",
    color: "#00d4d4", // Bright teal accent remains
    marginBottom: "10px",
  },
  subtitle: {
    fontSize: "1.1em",
    color: "#666",
  },
  formSection: {
    backgroundColor: "#f4f4f4", // Very light gray section background
    padding: "30px",
    borderRadius: "8px",
    marginBottom: "40px",
  },
  formTitle: {
    fontSize: "1.5em",
    fontWeight: "700",
    marginBottom: "20px",
    color: "#333",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "20px",
  },
  input: {
    padding: "15px",
    borderRadius: "5px",
    border: "1px solid #ddd", // Light border
    backgroundColor: "white",
    color: "#333",
    fontSize: "1em",
  },
  textarea: {
    padding: "15px",
    borderRadius: "5px",
    border: "1px solid #ddd",
    backgroundColor: "white",
    color: "#333",
    fontSize: "1em",
    resize: "vertical",
  },
  button: {
    padding: "15px 30px",
    backgroundColor: "#00d4d4", // Primary action color (teal)
    color: "white", // White text on teal button
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    fontSize: "1.1em",
    fontWeight: "bold",
    marginTop: "10px",
    width: "100%",
  },
  promiseSection: {
    display: "flex",
    justifyContent: "space-between",
    gap: "30px",
    textAlign: "left",
  },
  promiseItem: {
    flex: 1,
    padding: "20px",
    borderLeft: "3px solid #00d4d4", // Teal accent remains
    backgroundColor: "#f4f4f4", // Light background for contrast
    borderRadius: "4px",
    color: "#333",
  },
  icon: {
    fontSize: "2em",
    display: "block",
    marginBottom: "10px",
    color: "#00d4d4", // Teal icon color
  },
  promiseTitle: {
    fontSize: "1.2em",
    fontWeight: "700",
    color: "#333",
    marginBottom: "5px",
  },
  promiseText: {
    fontSize: "0.95em",
    color: "#666",
  }
};

export default ContactUs;