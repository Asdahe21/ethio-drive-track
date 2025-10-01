const Home = () => {
  return (
    <div style={styles.container}>
      <h1>Welcome to Ethio Drive Track</h1>
      <p>Your platform for car tracking and history verification in Ethiopia.</p>
      <button style={styles.button}>Get Started</button>
    </div>
  );
};

const styles = {
  container: { textAlign: "center", marginTop: "50px" },
  button: {
    padding: "10px 20px",
    marginTop: "20px",
    background: "#007BFF",
    color: "white",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer"
  }
};

export default Home;
