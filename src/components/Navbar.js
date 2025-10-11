import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav style={styles.nav}>
      <h2 style={styles.logo}>Ethio Drive Track</h2>
      <div>
        <Link style={styles.link} to="/">Home</Link>
        <Link style={styles.link} to="/about">About</Link>
        <Link style={styles.link} to="/login">Login</Link>
      </div>
    </nav>
  );
};

const styles = {
  nav: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "15px 30px",
    background: "#222",
    color: "white"
  },
  logo: { margin: 0 },
  link: {
    margin: "0 30px",
    textDecoration: "none",
    color: "white"
  }
};

export default Navbar;
