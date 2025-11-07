import { Container, Row, Col, Badge } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import styles from './DanceLesson.module.css';
import { ReviewList } from '../components/ReviewList';
import { ReviewForm } from '../components/ReviewForm';
import { getCurrentUser } from '../services/authApi';
import pic64 from '../../assets/images/pic64.jpeg';

export function DanceLesson() {
  const user = getCurrentUser();
  const navigate = useNavigate();

  const dateItem = {
    id: 'dance-lesson',
    title: 'Dance lesson',
    image: pic64,
    price: '$80 per couple',
    duration: '90 minutes',
    rating: 4.5
  };

  const handleBookNow = () => {
    navigate('/checkout', { state: { item: dateItem } });
  };
  
  const reviews = [
    {
      id: '1',
      name: 'Sarah & Mike',
      rating: 5,
      comment: 'Such a fun date! We laughed so much trying to learn salsa. The instructor was patient and made it really romantic. Highly recommend!',
      date: 'November 2, 2024'
    },
    {
      id: '2',
      name: 'Emily',
      rating: 5,
      comment: 'Perfect first date idea! The atmosphere was relaxed, and it gave us lots to talk about. We\'re already planning our next dance class!',
      date: 'October 25, 2024'
    },
    {
      id: '3',
      name: 'James & Lisa',
      rating: 4,
      comment: 'Great experience! A bit challenging at first, but that made it more fun. The music and vibe were perfect for a romantic evening.',
      date: 'October 18, 2024'
    }
  ];

  return (
    <main className={`container-fluid ${styles.danceLessonMain}`}>
      <Container>
        <div className="text-center">
          <hr />
          <h1>Dance Lesson Date</h1>
          <hr />
        </div>

        <div className={styles.mainImageContainer}>
          <img src={pic64} alt="Dance Lesson Date" className={styles.mainImage} />
        </div>

        <Row>
          <Col lg={8}>
            <div className={styles.shortDesc}>
              <h2>Learn to Dance Together</h2>
              <p className={styles.shortDescText}>
                A perfect date activity that combines fun, romance, and learning something new together.
                Move to the rhythm and create lasting memories on the dance floor.
              </p>
            </div>

            <div className={styles.tags}>
              <Badge bg="primary" className={styles.tag}>Romantic</Badge>
              <Badge bg="success" className={styles.tag}>Active</Badge>
              <Badge bg="warning" className={styles.tag}>Beginner-Friendly</Badge>
              <Badge bg="info" className={styles.tag}>Social</Badge>
              <Badge bg="danger" className={styles.tag}>Fun</Badge>
            </div>

            <div className={styles.contentBox}>
              <h3>About This Date</h3>
              <p>
                Dancing is one of the most romantic and fun activities you can do on a date. 
                Whether you're learning salsa, ballroom, or swing dancing, moving together creates 
                an instant connection and lots of laughter. It's a great way to break the ice, 
                get close, and create lasting memories.
              </p>
              <p>
                Don't worry if you have two left feet - that's half the fun! Dance lessons are 
                designed for beginners, and the instructors make it easy and enjoyable. Plus, 
                you'll have a new skill to show off at weddings and parties!
              </p>

              <div className={styles.highlights}>
                <h4>Why Choose a Dance Lesson Date?</h4>
                <ul>
                  <li>✨ Physical connection and chemistry</li>
                  <li>🎵 Fun music and energetic atmosphere</li>
                  <li>😄 Lots of laughs and playful moments</li>
                  <li>💃 Learn a new skill together</li>
                  <li>🌟 Break out of typical dinner date routine</li>
                </ul>
              </div>

              <div className={styles.tips}>
                <h4>Helpful Tips:</h4>
                <p><strong>Dress comfortably</strong> - Wear shoes you can move in</p>
                <p><strong>Don't take it seriously</strong> - Embrace the mistakes!</p>
                <p><strong>Stay positive</strong> - Encourage each other</p>
                <p><strong>Grab drinks after</strong> - Chat about your experience</p>
              </div>
            </div>

            <ReviewList reviews={reviews} />
            <ReviewForm dateType="dance-lesson" />
          </Col>

          <Col lg={4}>
            <div className={styles.infoPanel}>
              <h3>Date Details</h3>
              
              <div className={styles.infoItem}>
                <span className={styles.infoLabel}>⏱️ Duration:</span>
                <span className={styles.infoValue}>120 minutes</span>
              </div>

              <div className={styles.infoItem}>
                <span className={styles.infoLabel}>💰 Price:</span>
                <span className={styles.infoValue}>$80 per couple</span>
              </div>

              <div className={styles.infoItem}>
                <span className={styles.infoLabel}>🌅 Best Time:</span>
                <span className={styles.infoValue}>Evening</span>
              </div>

              <div className={styles.infoItem}>
                <span className={styles.infoLabel}>👥 Perfect For:</span>
                <span className={styles.infoValue}>Beginners, All Couples</span>
              </div>

              <div className={styles.infoItem}>
                <span className={styles.infoLabel}>📅 Season:</span>
                <span className={styles.infoValue}>Year-round</span>
              </div>

              <div className={styles.averageRating}>
                <h4>Average Rating</h4>
                <div className={styles.ratingStars}>
                  {'★'.repeat(5)}
                </div>
                <p>4.7 out of 5 (3 reviews)</p>
              </div>

              {user ? (
                <button className={styles.bookButton} onClick={handleBookNow}>
                  Book Now
                </button>
              ) : (
                <Link to="/login" className={styles.bookButton}>
                  Sign In to Book
                </Link>
              )}
            </div>
          </Col>
        </Row>
      </Container>
    </main>
  );
}
