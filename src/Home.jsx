import React from 'react'
import './Home.css'; 
import { Link } from 'react-router-dom';
import {useEffect,useState} from 'react'

function Home() {
  const [stadiums, setStadiums] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3000/stadiums")
     .then(response => response.json()) // Convert the response to JSON
     .then(data => setStadiums(data)) // Correctly update the state with the fetched data
     .catch(error => console.error("Error fetching stadiums:", error));
  }, []);
  return (
    <>
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

        
   
        <div className="pitch-container">
  <h1 className="welcome">Welcome to Pitch</h1>
  <p className="parh">Where we find your best football pitch to play in “Score your perfect play: Where every kick finds its pitch!"</p>
  <Link to="/bookpitch">
  <button className="get-started-btn">Get Started</button>
</Link>

</div>

          </div>
       
      
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
    
    </>
  )
}

export default Home;
