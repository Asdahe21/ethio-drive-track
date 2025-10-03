import React, { useState } from "react";

const SearchBar = ({ onSearch }) => {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      onSearch(searchQuery.trim());
    }
  };

  return (
    <div className="search-bar-container">
      <form onSubmit={handleSubmit} className="search-form">
        <input
          type="text"
          placeholder="Enter VIN, License Plate, or Chassis Number"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          required
          className="search-input"
          style={{
            padding: "10px",
            width: "300px",
            borderRadius: "5px",
            border: "1px solid #ccc",
            marginRight: "10px",
          }}
        />
        <button
          type="submit"
          className="search-button"
          style={{
            padding: "10px 20px",
            background: "#168192",
            border: "none",
            borderRadius: "5px",
            color: "white",
            cursor: "pointer",
          }}
        >
          Verify History
        </button>
      </form>
    </div>
  );
};

export default SearchBar;
