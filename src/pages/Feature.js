import { useState } from "react";

const Feature = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [search, setSearch] = useState("");
  const [result, setResult] = useState(null);

  const handleSearch = () => {
    if (loggedIn) {
      setResult(`Search results for: ${search}`);
    } else {
      setResult("Please login to use this feature.");
    }
  };

  return (
    <div style={styles.container}>
      <h1>Car Search</h1>
      <input
        type="text"
        placeholder="Enter plate number"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={styles.input}
      />
      <button style={styles.button} onClick={handleSearch}>
        Search
      </button>
      {result && <p>{result}</p>}
    </div>
  );
};

const styles = {
  container: { textAlign: "center", marginTop: "50px" },
  input: { padding: "10px", margin: "10px", width: "250px" },
  button: {
    padding: "10px 20px",
    background: "#007BFF",
    color: "white",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer"
  }
};

export default Feature;
