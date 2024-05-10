import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./bookpitch.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function ReviewForm() {
  const [stadiums, setStadiums] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetch('https://pitch-app.onrender.com/backend/db.json/stadiums')
     .then((response) => response.json())
     .then((data) => setStadiums(data));
  }, []);

  const handleAddComment = (stadiumId, newComment) => {
    // Find the stadium by ID
    const updatedStadiums = stadiums.map(stadium => {
      if (stadium.id === stadiumId) {
        // Add the new comment to the stadium's comments array
        stadium.comments.push(newComment);
      }
      return stadium;
    });

    // Update state with the modified stadiums array
    setStadiums(updatedStadiums);

    // Assuming you have an endpoint to update stadiums with comments
    fetch(`https://pitch-app.onrender.com/backend/db.json/stadiums/${stadiumId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ comments: updatedStadiums.find(stadium => stadium.id === stadiumId).comments }),
    })
     .then((response) => response.json())
     .then(() => {
        // Clear the form input fields
        document.getElementById(`comment-form-${stadiumId}`).reset();
        toast.success("Comment added successfully!");
      })
     .catch((error) => console.error("Error adding comment:", error));
  };

  const handleDeleteComment = (stadiumId, commentId) => {
    // Find the stadium by ID
    const updatedStadiums = stadiums.map(stadium => {
      if (stadium.id === stadiumId) {
        // Filter out the comment by ID
        stadium.comments = stadium.comments.filter(comment => comment.id !== commentId);
      }
      return stadium;
    });

    // Update state with the modified stadiums array
    setStadiums(updatedStadiums);

    // Assuming you have an endpoint to update stadiums with comments
    fetch(`https://pitch-app.onrender.com/backend/db.json/stadiums/${stadiumId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ comments: updatedStadiums.find(stadium => stadium.id === stadiumId).comments }),
    })
     .then((response) => response.json())
     .then(() => {
        toast.error("Deleted ");
      })
     .catch((error) => console.error("Error deleting comment:", error));
  };

  // Filter stadiums based on search term
  const filteredStadiums = stadiums.filter(stadium =>
    stadium.name && stadium.name.toLowerCase().includes(searchTerm.toLowerCase())
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
        <h1>Reviews</h1>
        <p className="par">Check out what others say about our stadiums.</p>
      </div>
      <div className="search">
        <input className="srch" type="search" placeholder="Search" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
      </div>
      <div className="container">
        {filteredStadiums.map((stadium) => (
          <div key={stadium.id} className="stadium-card">
            <h3 className="stadium-name">{stadium.name}</h3>
            <img src={stadium.image} alt="Stadium" />
            <p className="description">{stadium.description}</p>
            <p className="price">Price: {stadium.price}</p>
            <p className="status">Status: {stadium.status}</p>
            <form id={`comment-form-${stadium.id}`} className="comment-form" onSubmit={(e) => {
              e.preventDefault();
              handleAddComment(stadium.id, { name: e.target.name.value, rating: e.target.rating.value, comment: e.target.comment.value });
            }}>
              <input type="text" name="name" placeholder="Your Name" required />
              <input type="number" name="rating" placeholder="Rating (1-10)" min="1" max="10" required />
              <textarea name="comment" placeholder="Your Comment" required></textarea>
              <button type="submit">Add Comment</button>
            </form>
            <div className="comments">
              <h4 style={{ marginTop: '20px' }}>Comments:</h4>
              {stadium.comments.map((comment, index) => (
                <div key={index} className="comment">
                  <p><strong>{comment.name}</strong> - Rating: {comment.rating}</p>
                  <p>{comment.comment}</p>
                  <button className="delete-button" onClick={() => handleDeleteComment(stadium.id, comment.id)}>Delete</button>
                </div>
              ))}
            </div>
          </div>
        ))}
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
      {/* Toast Container */}
      <ToastContainer />
    </div>
  );
}

export default ReviewForm;
