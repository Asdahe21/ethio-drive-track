import React, { useState } from "react";

const Home = () => {
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
    <div
      className="page home-page"
    >
      <div className="content">
        <h1>Welcome to Ethio Drive Track</h1>
        <p>Your platform for car tracking and history verification in Ethiopia.</p>

        {/* Feature section (Search bar) */}
        <div className="feature-section">
          <h2>Car Search</h2>
          <input
            type="text"
            placeholder="Enter VIN or plate number"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <button className="btn search-btn" onClick={handleSearch}>
            Search
          </button>
          {result && <p>{result}</p>}
                <p>
         Our platform is designed for fast, mobile-friendly access.<br></br>
      Simply enter the VIN, and the verified report is generated in seconds, giving you immediate insight when you need it most—on the lot.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Home;
