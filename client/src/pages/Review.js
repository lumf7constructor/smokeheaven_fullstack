// src/pages/Review.js
import React, { useState } from 'react';
import './Review.css'; // Make sure the CSS file is named correctly

const Review = () => {
    const [productId, setProductId] = useState('');
    const [comment, setComment] = useState('');
    const [rating, setRating] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        const reviewData = {
            productId,
            comment,
            rating: parseInt(rating, 10) // Ensure rating is an integer
        };

        try {
            const response = await fetch('http://localhost:3002/api/reviews', { // Ensure port is correct
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(reviewData)
            });

            if (response.ok) {
                alert('Review added successfully!');
                // Clear the form
                setProductId('');
                setComment('');
                setRating('');
            } else {
                alert('Error adding review.');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <div>
            <h2>Submit a Review</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Product ID:</label>
                    <input
                        type="number"
                        value={productId}
                        onChange={(e) => setProductId(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Comment:</label>
                    <textarea
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Rating:</label>
                    <input
                        type="number"
                        value={rating}
                        onChange={(e) => setRating(e.target.value)}
                        min="1"
                        max="5"
                        required
                    />
                </div>
                <button type="submit">Submit Review</button>
            </form>
        </div>
    );
};

export default Review;
