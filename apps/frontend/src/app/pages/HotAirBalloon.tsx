import { Container, Row, Col, Badge } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import styles from './HotAirBalloon.module.css';
import { ReviewList } from '../components/ReviewList';
import { ReviewForm } from '../components/ReviewForm';
import { FavoriteButton } from '../components/FavoriteButton';
import { getCurrentUser } from '../services/authApi';
import pic71 from '../../assets/images/pic71.jpeg';

export function HotAirBalloon() {
  const user = getCurrentUser();
  const navigate = useNavigate();

  const dateItem = {
    id: 'hot-air-balloon',
    title: 'Hot Air Balloon Ride',
    image: pic71,
    price: '$200 per couple',
    duration: '180 minutes',
    rating: 4.7
  };

  const handleBookNow = () => {
    navigate('/checkout', { state: { item: dateItem } });
  };
  
  // Sample reviews data (will be from API later)
  const reviews = [
    {
      id: '1',
      name: 'Alexandra & Dmitry',
      rating: 5,
      comment: 'Incredible experience! The sunrise flight was absolutely magical. Breathtaking views, romantic atmosphere. This is a date we will remember for the rest of our lives!',
      date: 'October 15, 2024'
    },
    {
      id: '2',
      name: 'Maria',
      rating: 5,
      comment: 'Best date of my life! My partner proposed during the flight. Thank you for the unforgettable emotions!',
      date: 'November 3, 2024'
    },
    {
      id: '3',
      name: 'Igor',
      rating: 4,
      comment: 'Really enjoyed it! The only downside - had to cancel the first flight due to weather, but the second time was perfect.',
      date: 'October 28, 2024'
    }
  ];

  return (
    <main className={`container-fluid ${styles.hotAirBalloonMain}`}>
      <Container>
        {/* Header and Photo */}
        <div className="text-center">
          <hr />
          <h1>Hot Air Balloon Ride Date</h1>
          <hr />
        </div>

        {/* Main Photo */}
        <div className={styles.mainImageContainer}>
          <img src={pic71} alt="Hot Air Balloon Ride" className={styles.mainImage} />
          <FavoriteButton item={dateItem} />
        </div>

        <Row>
          <Col lg={8}>
            {/* Short Description */}
            <div className={styles.shortDesc}>
              <h2>An Amazing Ride Date for Two</h2>
              <p className={styles.shortDescText}>
                An unforgettable hot air balloon flight with your loved one. 
                Soar above the world while enjoying breathtaking views and a romantic atmosphere.
              </p>
            </div>

            {/* Tags */}
            <div className={styles.tags}>
              <Badge bg="primary" className={styles.tag}>Romantic</Badge>
              <Badge bg="success" className={styles.tag}>Adventure</Badge>
              <Badge bg="warning" className={styles.tag}>Sunrise</Badge>
              <Badge bg="info" className={styles.tag}>Special Occasion</Badge>
              <Badge bg="danger" className={styles.tag}>Unforgettable</Badge>
            </div>

            {/* Detailed Description */}
            <div className={styles.contentBox}>
              <h3>About This Date</h3>
              <p>
                There's nothing quite like floating peacefully above the world in a hot air balloon 
                with someone special. This breathtaking experience combines adventure, romance, and 
                stunning panoramic views that will leave you both speechless. As you drift silently 
                through the sky, you'll feel like you're in your own private world.
              </p>
              <p>
                Hot air balloon rides typically happen at sunrise or sunset when the air is calm 
                and the lighting is magical. You'll watch the landscape unfold beneath you, share 
                a champagne toast at altitude, and create once-in-a-lifetime memories together.
              </p>

              <div className={styles.highlights}>
                <h4>What Makes This Date Special:</h4>
                <ul>
                  <li>🎈 Breathtaking 360-degree views</li>
                  <li>🌅 Magical sunrise or sunset experience</li>
                  <li>🥂 Champagne celebration in the sky</li>
                  <li>🕊️ Peaceful and serene atmosphere</li>
                  <li>📸 Unforgettable photos and memories</li>
                  <li>🌟 Unique adventure together</li>
                </ul>
              </div>

              <div className={styles.tips}>
                <h4>Helpful Tips:</h4>
                <p><strong>Book well in advance</strong> - Slots fill up quickly</p>
                <p><strong>Dress in layers</strong> - It can be cool at altitude</p>
                <p><strong>Wear flat shoes</strong> - For safe boarding and landing</p>
                <p><strong>Arrive early</strong> - Watch the balloon inflation!</p>
                <p><strong>Bring a camera</strong> - The views are stunning</p>
              </div>
            </div>

            {/* Reviews */}
            <ReviewList reviews={reviews} />
            
            {/* Review Form */}
            <ReviewForm dateType="hot-air-balloon" />
          </Col>

          <Col lg={4}>
            {/* Information Panel */}
            <div className={styles.infoPanel}>
              <h3>Date Details</h3>
              
              <div className={styles.infoItem}>
                <span className={styles.infoLabel}>⏱️ Duration:</span>
                <span className={styles.infoValue}>180 minutes</span>
              </div>

              <div className={styles.infoItem}>
                <span className={styles.infoLabel}>💰 Price:</span>
                <span className={styles.infoValue}>$250 per person</span>
              </div>

              <div className={styles.infoItem}>
                <span className={styles.infoLabel}>🌅 Best Time:</span>
                <span className={styles.infoValue}>Sunrise or Sunset</span>
              </div>

              <div className={styles.infoItem}>
                <span className={styles.infoLabel}>👥 Perfect For:</span>
                <span className={styles.infoValue}>Couples, Special Occasions</span>
              </div>

              <div className={styles.infoItem}>
                <span className={styles.infoLabel}>📅 Season:</span>
                <span className={styles.infoValue}>Spring & Fall</span>
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

