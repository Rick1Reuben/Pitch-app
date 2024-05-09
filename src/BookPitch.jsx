import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./bookpitch.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function BookPitch() {
  const [bookData, setBookData] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetch("https://pitch-app.onrender.com/stadiums")
      .then((response) => response.json())
      .then((stadiums) => setBookData(stadiums));
  }, []);

  const handleBooking = (stadiumId, currentStatus) => {
    const updatedStatus = currentStatus === "Free" ? "Booked" : "Free";
    fetch(`https://pitch-app.onrender.com/stadiums/${stadiumId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ status: updatedStatus }),
    })
      .then((response) => response.json())
      .then((updatedStadium) => {
        setBookData((prevData) =>
          prevData.map((stadium) =>
            stadium.id === updatedStadium.id ? updatedStadium : stadium
          )
        );
        if (updatedStatus === "Booked") {
          toast.success("Successfully booked!");
        } else {
          toast.error("Reservation cancelled.");
        }
      })
      .catch((error) => console.error("Error updating status:", error));
  };

  const filteredStadiums = bookData.filter((stadium) =>
    stadium.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div id="main">
      <div className="navbar">
        <div className="icon">
          <h2 className="logo">Pitch</h2>
        </div>
        <div className="menu">
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/bookpitch">BookPitch</Link>
            </li>
            <li>
              <Link to="/reviews">Reviews</Link>
            </li>
          </ul>
        </div>
      </div>
      <div className="tent">
        <h1>Want a stadium?</h1>
        <p className="par">Book with us now to enjoy world class equipment and best football environment to nature talent</p>
      </div>
      <div className="search">
        <input className="srch" type="search" placeholder="Search" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
      </div>
      <div className="container">
        {filteredStadiums.map((stadium) => (
          <div key={stadium.name} className="stadium-card">
            <div className="image-container">
              <img src={stadium.image} alt="Stadium" />
            </div>
            <div className="content">
              <h3 className="stadium-name">{stadium.name}</h3>
              <p className="description">{stadium.description}</p>
              <p className="price">Price: {stadium.price}</p>
              <button className="bbb" onClick={() => handleBooking(stadium.id, stadium.status)}>
                {stadium.status === "Free" ? "Book Now" : "Cancel Reservation"}
              </button>
              <p className="status">Status: {stadium.status}</p>
            </div>
          </div>
        ))}
    
      <footer>
        <p>Pitch</p>
        <p>
          For more information, contact us at info@pitch.co.ke or follow us
          on our social media platforms at pitch.ke
        </p>
        <div className="social">
          <a href="#">
            <i className="fab fa-instagram"></i>
          </a>
          <a href="#">
            <i className="fab fa-linkedin"></i>
          </a>
          <a href="#">
            <i className="fab fa-whatsapp"></i>
          </a>
        </div>
        <div className="copy">
          <p>&copy; 2024 Pitch. All Rights Reserved</p>
        </div>
      </footer>
      {/* Toast Container */}
      <ToastContainer />
    </div>
    </div>
  );
}

export default BookPitch;
