
import './Home.css'; 


function Home() {
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
                <a href="/">Home</a>
              </li>
              <li>
                <a href="/bookpitch">BookPitch</a>
              </li>
              <li>
                <a href="/review">Reviews</a>
              </li>
            </ul>
          </div>
        </div>

        <div className="tent">
          <h1>Welcome to Pitch</h1>
          <p className="par">Where we find your best football pitch to play in “Score your perfect play: Where every kick finds its pitch!"</p>
          <div className="search">
            <input className="srch" type="search" name="" placeholder="Search" />
          </div>
          <div className="container">
            <footer>
              <p>Pitch</p>
              <p>
                For more information contact us at info@pitch.co.ke or follow us on our social media platforms at pitch.ke
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
        </div>
      </div>
     
    
    </>
  )
}

export default Home;
