import React, { useState } from "react";
import bgImage from "../assets/bg.png";
const Login = () => {
  return (
    <div style={styles.container}>
      <div style={styles.formBox}>
      <h1>Login</h1>
      <input style={styles.input} type="email" placeholder="Email" />
      <input style={styles.input} type="password" placeholder="Password" />
      <button style={styles.button}>Login</button>
      <p>
        Don't have an account? <a href="/register">Register</a>
      </p>
      </div>
    </div>
  );
};


const styles = {
  container: {
    display:"flex",
    justifyContent: "center", // horizontally center
    alignItems: "center",     // vertically center
    height: "100vh", 
    backgroundImage: `url(${bgImage})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    color: "white", 
  },
    formBox: {
    background: "rgba(47, 50, 83, 0.6)", 
    padding: "40px",
    borderRadius: "20px",
    textAlign: "center",
    color: "white",
    width: "350px",
  },
  input: {
    display: "block",
    margin: "50px auto",
    padding: "16px",
    width: "300px",
     borderRadius: "5px",
    border: "none",
  },
  button: {
    padding: "15px 20px",
    marginTop: "30px",
    background: "#1d54b5ff",
     color: "white",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    width: "100%",
  },
};

export default Login;