import { Container, Row, Col, Badge } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import styles from './IceSkating.module.css';
import { ReviewList } from '../components/ReviewList';
import { ReviewForm } from '../components/ReviewForm';
import { getCurrentUser } from '../services/authApi';
import pic66 from '../../assets/images/pic66.jpeg';

export function IceSkating() {
  const user = getCurrentUser();
  const navigate = useNavigate();

  const dateItem = {
    id: 'ice-skating',
    title: 'Ice skating',
    image: pic66,
    price: '$60 per couple',
    duration: '120 minutes',
    rating: 4.4
  };

  const handleBookNow = () => {
    navigate('/checkout', { state: { item: dateItem } });
  };
  
  const reviews = [
    {
      id: '1',
      name: 'Sarah & Tom',
      rating: 5,
      comment: 'Such a fun and romantic date! We were both beginners, and laughing together while learning to skate made it even more special. The hot chocolate afterwards was the perfect ending!',
      date: 'November 4, 2024'
    },
    {
      id: '2',
      name: 'Emily',
      rating: 5,
      comment: 'Perfect winter date! The outdoor rink was beautiful with all the lights. Holding hands while skating under the stars is a memory I\'ll cherish forever.',
      date: 'October 28, 2024'
    },
    {
      id: '3',
      name: 'James & Lisa',
      rating: 4,
      comment: 'Great experience! A bit crowded on weekend evenings, but still lots of fun. Recommend going during weekday evenings for a more intimate experience.',
      date: 'October 20, 2024'
    }
  ];

  return (
    <main className={`container-fluid ${styles.iceSkatingMain}`}>
      <Container>
        <div className="text-center">
          <hr />
          <h1>Ice Skating Date</h1>
          <hr />
        </div>

        <div className={styles.mainImageContainer}>
          <img src={pic66} alt="Ice Skating Date" className={styles.mainImage} />
        </div>

        <Row>
          <Col lg={8}>
            <div className={styles.shortDesc}>
              <h2>Glide Into Romance on Ice</h2>
              <p className={styles.shortDescText}>
                Whether you're seasoned skaters or first-timers, ice skating is a playful and romantic way 
                to spend time together. Hold hands, share laughs, and create unforgettable winter memories.
              </p>
            </div>

            <div className={styles.tags}>
              <Badge bg="primary" className={styles.tag}>Winter Fun</Badge>
              <Badge bg="success" className={styles.tag}>Active</Badge>
              <Badge bg="warning" className={styles.tag}>Playful</Badge>
              <Badge bg="info" className={styles.tag}>Affordable</Badge>
              <Badge bg="danger" className={styles.tag}>Classic</Badge>
            </div>

            <div className={styles.contentBox}>
              <h3>About This Date</h3>
              <p>
                Ice skating is one of the most classic and charming winter date activities. There's something 
                magical about gliding across the ice together, especially when the rink is decorated with twinkling 
                lights and seasonal music fills the air. Whether you're both experienced skaters or complete beginners, 
                ice skating brings out the playful side in everyone.
              </p>
              <p>
                Don't worry if you're not confident on your skates - that's part of the fun! Holding onto each other 
                for support, sharing laughs when you wobble, and celebrating small victories creates a lighthearted 
                atmosphere perfect for bonding. Many rinks offer both indoor and outdoor options, and some even have 
                hot chocolate stands nearby for warming up between skating sessions.
              </p>

              <div className={styles.highlights}>
                <h4>What Makes Ice Skating Special?</h4>
                <ul>
                  <li>⛸️ Fun for all skill levels</li>
                  <li>❄️ Perfect winter activity</li>
                  <li>💑 Encourages physical closeness</li>
                  <li>😄 Playful and lighthearted atmosphere</li>
                  <li>📸 Great photo opportunities</li>
                  <li>☕ Cozy warm-up afterwards</li>
                </ul>
              </div>

              <div className={styles.tips}>
                <h4>Helpful Tips:</h4>
                <p><strong>Dress warmly</strong> - Layers are key, even for indoor rinks</p>
                <p><strong>Wear thick socks</strong> - Protects your feet in rental skates</p>
                <p><strong>Arrive early</strong> - Beat the crowds and have more space</p>
                <p><strong>Take breaks</strong> - Don't overdo it if you're beginners</p>
                <p><strong>Plan for after</strong> - Hot chocolate or a warm meal nearby</p>
              </div>
            </div>

            <ReviewList reviews={reviews} />
            <ReviewForm dateType="ice-skating" />
          </Col>

          <Col lg={4}>
            <div className={styles.infoPanel}>
              <h3>Date Details</h3>
              
              <div className={styles.infoItem}>
                <span className={styles.infoLabel}>⏱️ Duration:</span>
                <span className={styles.infoValue}>90 minutes</span>
              </div>

              <div className={styles.infoItem}>
                <span className={styles.infoLabel}>💰 Price:</span>
                <span className={styles.infoValue}>$40 per couple</span>
              </div>

              <div className={styles.infoItem}>
                <span className={styles.infoLabel}>🌙 Best Time:</span>
                <span className={styles.infoValue}>Evening</span>
              </div>

              <div className={styles.infoItem}>
                <span className={styles.infoLabel}>👥 Perfect For:</span>
                <span className={styles.infoValue}>All couples, Beginners friendly</span>
              </div>

              <div className={styles.infoItem}>
                <span className={styles.infoLabel}>📅 Season:</span>
                <span className={styles.infoValue}>Winter (Nov-Feb)</span>
              </div>

              <div className={styles.averageRating}>
                <h4>Average Rating</h4>
                <div className={styles.ratingStars}>
                  {'★'.repeat(5)}{'☆'.repeat(0)}
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
