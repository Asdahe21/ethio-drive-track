const Register = () => {
  return (
    <div style={styles.container}>
      <h1>Register</h1>
      <input style={styles.input} type="text" placeholder="Name" />
      <input style={styles.input} type="email" placeholder="Email" />
      <input style={styles.input} type="password" placeholder="Password" />
      <input style={styles.input} type="password" placeholder="Confirm Password" />
      <button style={styles.button}>Register</button>
      <p>Already have an account? <a href="/login">Login</a></p>
    </div>
  );
};

const styles = {
  container: { textAlign: "center", marginTop: "50px" },
  input: { display: "block", margin: "10px auto", padding: "10px", width: "250px" },
  button: {
    padding: "10px 20px",
    marginTop: "10px",
    background: "#17A2B8",
    color: "white",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer"
  }
};

export default Register;
