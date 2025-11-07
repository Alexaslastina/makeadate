import styles from './ReviewList.module.css';

interface Review {
  id: string;
  name: string;
  rating: number;
  comment: string;
  date: string;
}

interface ReviewListProps {
  reviews: Review[];
}

export function ReviewList({ reviews }: ReviewListProps) {
  if (reviews.length === 0) {
    return (
      <div className={styles.noReviews}>
        <p>No reviews yet. Be the first to leave a review!</p>
      </div>
    );
  }

  return (
    <div className={styles.reviewList}>
      <h3>Customer Reviews ({reviews.length})</h3>
      
      <div className={styles.reviews}>
        {reviews.map((review) => (
          <div key={review.id} className={styles.reviewCard}>
            <div className={styles.reviewHeader}>
              <div className={styles.reviewAuthor}>
                <strong>{review.name}</strong>
                <span className={styles.reviewDate}>{review.date}</span>
              </div>
              <div className={styles.reviewRating}>
                {[1, 2, 3, 4, 5].map((star) => (
                  <span
                    key={star}
                    className={star <= review.rating ? styles.starFilled : styles.star}
                  >
                    ★
                  </span>
                ))}
              </div>
            </div>
            <p className={styles.reviewComment}>{review.comment}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

