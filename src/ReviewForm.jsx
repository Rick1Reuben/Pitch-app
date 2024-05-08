import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Home.css';
import './review.css';

function ReviewForm() {
  const [stadiums, setStadiums] = useState([]);
  const [selectedStadium, setSelectedStadium] = useState('');
  const [comments, setComments] = useState([]);
  const [comment, setComment] = useState('');
  const [rating, setRating] = useState('');
  const [editCommentId, setEditCommentId] = useState(null);
  const [selectedStadiumImage, setSelectedStadiumImage] = useState('');

  useEffect(() => {
    fetch('http://localhost:5173/db.json')
      .then(response => response.json())
      .then(data => {
        setStadiums(data.stadiums);
        setComments(data.comments || []);
        // Fetch the image of the selected stadium
        const selectedStadiumData = data.stadiums.find(stadium => stadium.name === selectedStadium) || {};
        setSelectedStadiumImage(selectedStadiumData.image || '');
      })
      .catch(error => console.error('Error fetching data:', error));
  }, [selectedStadium]); // Fetch image when selectedStadium changes
  
  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    if (!selectedStadium || !comment || !rating) return;

    const newComment = {
      id: Date.now(),
      stadium: selectedStadium,
      content: comment.trim(),
      rating: parseInt(rating),
    };

    try {
      const response = await fetch('http://localhost:5173/comments', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newComment),
      });

      if (response.ok) {
        const updatedComments = await response.json();
        setComments(updatedComments);
        setComment('');
        setRating('');
      } else {
        console.error('Failed to add comment:', response.status);
      }
    } catch (error) {
      console.error('Error adding comment:', error);
    }

    if (editCommentId !== null) {
      setComments(prevComments =>
        prevComments.map(c =>
          c.id === editCommentId ? { ...c, content: newComment.content, rating: newComment.rating } : c
        )
      );
      setEditCommentId(null);
    } else {
      setComments(prevComments => [...prevComments, newComment]);
    }

    setComment('');
    setRating('');
  };

  const handleCommentEdit = (id, content, rating) => {
    setEditCommentId(id);
    setComment(content);
    setRating(rating.toString());
  };

  const handleCommentDelete = (id) => {
    setComments(prevComments => prevComments.filter(c => c.id !== id));
  };

  const selectedStadiumData = stadiums.find(stadium => stadium.name === selectedStadium) || {};

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
        <h1>How do you feel?</h1>
        <p className="par">We value your reviews on the stadium and we would love to hear from you</p>
      </div>
      <div className="container">
        <div className="card">
          <h2 className="heading">Review Form</h2>
          <form className="form" onSubmit={handleCommentSubmit}>
            <div className="input-group">
              <label htmlFor="stadium">Stadium Name:</label>
              <select id="stadium" value={selectedStadium} onChange={(e) => setSelectedStadium(e.target.value)}>
                {stadiums.map(stadium => (
                  <option key={stadium.id} value={stadium.name}>
                    {stadium.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="input-group">
              <label htmlFor="comment">Comment:</label>
              <textarea id="comment" value={comment} onChange={(e) => setComment(e.target.value)}></textarea>
            </div>
            <div className="input-group">
              <label htmlFor="rating">Rating (1-10):</label>
              <input type="number" id="rating" value={rating} onChange={(e) => setRating(e.target.value)} min="1" max="10" />
            </div>
            <button type="submit">{editCommentId !== null ? 'Update Comment' : 'Add Comment'}</button>
          </form>
          <div class="stadium-details">
  <div class="stadium-image">
    <img src={selectedStadiumImage} alt="Stadium" style={{ borderRadius: '10px' }} />
  </div>
  <div class="stadium-info">
    <p><strong>Name:</strong> {selectedStadiumData.name}</p>
    <p><strong>Description:</strong> {selectedStadiumData.description}</p>
    <p><strong>Price:</strong> {selectedStadiumData.price}</p>
    <p><strong>Status:</strong> {selectedStadiumData.status}</p>
  </div>
            <h2 className="heading">Comments</h2>
            <ul>
              {comments.map(c => (
                <li key={c.id}>
                  <p><strong>Stadium: </strong>{c.stadium}</p>
                  <p><strong>Rating: </strong>{c.rating}</p>
                  <p>{c.content}</p>
                  <button className="edit-button" onClick={() => handleCommentEdit(c.id, c.content, c.rating)}>Edit</button>
                  <button className="delete-button" onClick={() => handleCommentDelete(c.id)}>Delete</button>
                </li>
              ))}
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
    </div>
  );
}

export default ReviewForm;
