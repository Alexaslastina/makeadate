import { useState } from 'react';
import { Form, Button, Alert } from 'react-bootstrap';
import styles from './ReviewForm.module.css';

interface ReviewFormProps {
  dateType: string;
  onReviewSubmitted?: () => void;
}

export function ReviewForm({ dateType, onReviewSubmitted }: ReviewFormProps) {
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [name, setName] = useState('');
  const [comment, setComment] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (rating === 0) {
      setError('Please select a rating');
      return;
    }

    if (!name.trim() || !comment.trim()) {
      setError('Please fill in all fields');
      return;
    }

    // Here will be API call to server
    console.log({ dateType, rating, name, comment });
    
    setSubmitted(true);
    setError('');
    
    // Clear form
    setTimeout(() => {
      setRating(0);
      setName('');
      setComment('');
      setSubmitted(false);
      if (onReviewSubmitted) {
        onReviewSubmitted();
      }
    }, 2000);
  };

  return (
    <div className={styles.reviewForm}>
      <h3>Leave Your Review</h3>
      
      {submitted && (
        <Alert variant="success">
          Thank you for your review! It will be published after moderation.
        </Alert>
      )}

      {error && <Alert variant="danger">{error}</Alert>}

      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Your Rating</Form.Label>
          <div className={styles.starRating}>
            {[1, 2, 3, 4, 5].map((star) => (
              <span
                key={star}
                className={`${styles.star} ${
                  star <= (hoverRating || rating) ? styles.starFilled : ''
                }`}
                onClick={() => setRating(star)}
                onMouseEnter={() => setHoverRating(star)}
                onMouseLeave={() => setHoverRating(0)}
              >
                ★
              </span>
            ))}
          </div>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Your Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Your Review</Form.Label>
          <Form.Control
            as="textarea"
            rows={4}
            placeholder="Tell us about your experience..."
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />
        </Form.Group>

        <Button variant="primary" type="submit">
          Submit Review
        </Button>
      </Form>
    </div>
  );
}

