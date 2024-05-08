import React from "react"
import {Link} from "react-router-dom"

function BookPitch() {
  const [bookData, setBookData] = useState([])
  //The data fetched here should show on the "Book Pitch" card. The status should be updated once the 'Book Now' button is pressed. All the updates should be done within the card.
//   useEffect(() => {
//     fetch("http://localhost:3000/stadiums")
//     .then(response => response.json())
//     .then(stadiums => setBookData(stadiums))
//   },[])


// here, we are using stadium.status, stadium.name, stadium.price, stadium.description- hizo ni from the server
//A card should be created, where I can attach this data  

/*The following iwe ndani ya CARD:
const [isBooked, setIsBooked] = useState(false);

  const handleClick = () => {
    setIsBooked(!isBooked);
  };

  return (
    <div>
    -FOR THE BUTTONS:
      {isBooked ? (
        <button onClick={handleClick}>Cancel Reservation</button>
      ) : (
        <button onClick={handleClick}>Book Now</button>
      )}
      <p>Status: {isBooked ? 'Booked' : 'Free'}</p>
    </div>
  );
};
The rest ziwe kwa return hapa in this component:
{stadiums && stadiums.map(stadium =>
  <Card key={stadium.name} stadium={stadium}/>
)}*/ 
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
