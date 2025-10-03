import React from "react";
import bgImage from "../assets/bg.png"; 
const Register = () => {
  return (
    <div style={styles.container}>
        <div style={styles.formBox}>
      <h1>Register</h1>
      <input style={styles.input} type="text" placeholder="Full Name" />
      <input style={styles.input} type="email" placeholder="Email" />
      <input style={styles.input} type="password" placeholder="Password" />
      <input style={styles.input} type="password" placeholder="Confirm Password" />
      <button style={styles.button}>Register</button>
      <p>
        Already have an account? <a href="/login">Login</a>
        </p>
        </div>
    </div>
  );
};

const styles = {
  container: {
    display: "flex",
    justifyContent: "center", // center horizontally
    alignItems: "center",     // center vertically
    height: "100vh",
    backgroundImage: `url(${bgImage})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
  },
  formBox: {
    background: "rgba(18, 32, 75, 0.6)", 
    padding: "40px",
    borderRadius: "10px",
    textAlign: "center",
    color: "white",
    width: "370px",
  },
  input: {
    display: "block",
    margin: "30px auto",
    padding: "15px",
    width: "100%",
    borderRadius: "5px",
    border: "none",
  },
  button: {
    padding: "15px 25px",
    marginTop: "10px",
    background: "#168192ff",
    color: "white",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    width: "80%",
  },
};

export default Register;
  
