const Login = () => {
  return (
    <div style={styles.container}>
      <h1>Login</h1>
      <input style={styles.input} type="email" placeholder="Email" />
      <input style={styles.input} type="password" placeholder="Password" />
      <button style={styles.button}>Login</button>
      <p>Don't have an account? <a href="/register">Register</a></p>
    </div>
  );
};

const styles = {
  container: { textAlign: "center", marginTop: "50px" },
  input: { display: "block", margin: "10px auto", padding: "10px", width: "250px" },
  button: {
    padding: "10px 20px",
    marginTop: "10px",
    background: "#28A745",
    color: "white",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer"
  }
};

export default Login;
