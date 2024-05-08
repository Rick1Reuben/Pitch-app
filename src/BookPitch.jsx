import React from "react"

function BookPitch() {
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
        <footer>
          <p>Pitch</p>
          <p>For more information contact us at info@pitch.co.ke or follow us on our social media platforms at pitch.ke</p>
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
      
  );
}

export default BookPitch;
