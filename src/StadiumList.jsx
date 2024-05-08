import React, { useState, useEffect } from "react";
import "./stadiumlist.css";

function StadiumList() {
  const [stadiums, setStadiums] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3000/stadiums")
     .then(response => response.json()) // Convert the response to JSON
     .then(data => setStadiums(data)) // Correctly update the state with the fetched data
     .catch(error => console.error("Error fetching stadiums:", error));
  }, []);

  return (
    <div className="stadium-container">
      <div className="stadium-list">
        {stadiums && stadiums.map(stadium => (
          <div key={stadium.name} className="stadium-item">
            <div className="stadium-image">
              <img src={stadium.image} alt={stadium.name} />
            </div>
            <div className="stadium-details">
              <h2 className="stadium-name">{stadium.name}</h2>
              <p className="stadium-description">{stadium.description}</p>
            </div>
        </div>
        ))}
    </div>
    </div>
  );
}

export default StadiumList;

