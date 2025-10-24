import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { database } from '../firebase'; 
import { ref, get, child } from 'firebase/database'; 

import "./Hero.css";
// import reportImg from "../assets/report-placeholder.png"; // replace with your image

function Hero({ isLoggedIn }) {
  const [vin, setVin] = useState("");
  const [isLoading, setIsLoading] = useState(false); // Add loading state
  const navigate = useNavigate();

  // Define the set of valid VIN characters (excluding I, O, Q)
  const validVinRegex = /^[A-HJ-NPR-Z0-9]{17}$/;

  const handleSearch = async (e) => {
    // Prevent default form submission
    if (e) e.preventDefault(); 

    const trimmedVin = vin.trim();

    // --- Client-Side Validation Checks ---
    if (!trimmedVin) {
      alert("Please enter a VIN number.");
      return;
    }
    if (trimmedVin.length !== 17) {
      alert("A valid VIN must be 17 characters long.");
      return;
    }
    if (!validVinRegex.test(trimmedVin)) {
      alert("The VIN contains invalid characters. VINs exclude I, O, and Q.");
      return;
    }
    // --- End Validation Checks ---

    if (isLoading) return; 
    
    // **CRITICAL CHECK: Enforce Sign-In**
    if (!isLoggedIn) {
        alert("You must be signed in to search and view a report.");
        navigate("/login"); // Redirect to login page
        return;
    }

    setIsLoading(true); // Start loading state
    
    // 2. Perform the Firebase Realtime Database fetch
    try {
      console.log(`Searching Firebase for VIN: ${trimmedVin}`);
      
      const dbRef = ref(database);
      
      // Query the specific VIN node under the 'reports' key
      // e.g., 'reports/YOURVIN123456789'
      const snapshot = await get(child(dbRef, `vehicles/${trimmedVin}`));

      if (snapshot.exists()) {
        const reportData = snapshot.val();
        
        // Success: Navigate to the report page, passing data or VIN
        navigate(`/report/${trimmedVin}`, { state: { report: reportData } });
        
      } else {
        // VIN not found in the database
        alert(`No report found for VIN: ${trimmedVin}.`);
        setVin(''); // Clear the input
      }

    } catch (error) {
      // 4. Handle Firebase/Network errors
      console.error("Firebase search failed:", error);
      alert("Failed to retrieve report. Please check your connection or try again.");
    } finally {
      // 5. Always stop the loading state
      setIsLoading(false); 
    }
  };

  return (
    <section className="hero">
      <div className="hero-content">
        <h1>
          See the car's past, <br /> not just the seller's pitch.
        </h1>
        <p>
          "Every used car's true history revealed in seconds. We make sure you skip the duds and drive away in the right vehicle."
        </p>

        {/* VIN Search Bar + Get Report Button (Wrapped in a FORM for 'Enter' key submission) */}
        <form className="search-row" onSubmit={handleSearch}>
          <input
            type="text"
            aria-label="Enter 17 digit VIN" 
            placeholder="Enter 17 digit VIN"
            value={vin}
            // Enforce uppercase input and limit length in the UI
            onChange={(e) => setVin(e.target.value.toUpperCase().slice(0, 17))} 
            maxLength={17} // HTML attribute to limit input length
            disabled={isLoading} // Disable input while loading
          />
          {/* Use type="submit" to trigger the form's onSubmit handler (handleSearch) */}
          {/* Change button text based on loading state */}
          <button type="submit" disabled={isLoading}>
            {isLoading ? "Searching..." : "Get report"} 
          </button>
        </form>


        <div className="checks">
          <p>We check:</p>
          <div className="icons">🚗 🛵 🚙 🚚</div>
        </div>

        <div className="report-list">
          <h4>Our report can uncover:</h4>
          <ul>
            <li>✔ Recorded images</li>
            <li>✔ Damage</li>
            <li>✔ Theft records</li>
            <li>✔ Mileage rollbacks</li>
            <li>✔ Specs & equipment</li>
            <li>✔ Emission taxes</li>
            <li>✔ Market value</li>
            <li>✔ Safety ratings</li>
          </ul>
        </div>
      </div>

      <div className="hero-image"> 
        {/* <img src={reportImg} alt="Report preview" /> */}
      </div>
    </section>
  );
}

export default Hero;