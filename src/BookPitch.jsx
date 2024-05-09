
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./bookpitch.css";

function BookPitch() {
  const [bookData, setBookData] = useState([]);
  const [selectedStadium, setSelectedStadium] = useState(null);
  const [pitchType, setPitchType] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetch("http://localhost:3000/stadiums")
      .then((response) => response.json())
      .then((stadiums) => setBookData(stadiums));
  }, []);

  const handleBooking = () => {
    if (!date || !time || !name || !email) {
      toast.error('Please fill in all fields');
      return;
    }

    // Perform booking logic here (Sending data to server)
    // For demonstration, assuming booking is successful
    fetch("http://localhost:3000/stadiums", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        stadium: selectedStadium.name,
        date,
        time,
        name,
        email,
      }),
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error("Booking failed");
        }
      })
      .then((data) => {
        // Reset form and show confirmation message
        toast.success("Successfully booked!");
        setDate('');
        setTime('');
        setName('');
        setEmail('');
        setSelectedStadium(null);
      })
      .catch((error) => {
        console.error("Error:", error);
        toast.error("Booking failed. Please try again later.");
      });
  };

  const selectStadium = (stadium) => {
    setSelectedStadium(stadium);
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
        <h1>Want a stadium ?</h1>
        <p className="par">We offer the best stadiums with state of the art equipments to offer training and best grounds for football fury</p>
      </div>
      <div className="search">
        <input
          className="srch bg-grey-900"
          type="search"
          name=""
          placeholder="Search"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
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
      {selectedStadium === stadium ? (
        <div className="booking-form">
           <label htmlFor="date">Date:</label>
                  <input type="date" id="date" value={date} onChange={(e) => setDate(e.target.value)} />
                  <label htmlFor="time">Time:</label>
                  <input type="time" id="time" value={time} onChange={(e) => setTime(e.target.value)} />
                  <label htmlFor="name">Your Name:</label>
                  <input type="text" id="name" value={name} onChange={(e) => setName(e.target.value)} />
                  <label htmlFor="email">Your Email:</label>
                  <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                  <button
                  className="bbb" onClick={handleBooking}>Book Now</button>
         
        </div>
      ) : (
        <button
          className="bbb"
          onClick={() => selectStadium(stadium)}
        >
          {stadium.status === "Free" ? "Book Now" : "Cancel Reservation"}
        </button>
      )}
      <p className="status">Status: {stadium.status}</p>
    </div>
  </div>
))}

            {/* Footer */}
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
      </div>
      
      {/* Toast Container */}
      <ToastContainer />
    </div>
  );
}

export default BookPitch;
