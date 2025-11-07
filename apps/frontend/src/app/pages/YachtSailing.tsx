import { Container, Row, Col, Badge } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import styles from './YachtSailing.module.css';
import { ReviewList } from '../components/ReviewList';
import { ReviewForm } from '../components/ReviewForm';
import { getCurrentUser } from '../services/authApi';
import pic65 from '../../assets/images/pic65.jpeg';

export function YachtSailing() {
  const user = getCurrentUser();
  const navigate = useNavigate();

  const dateItem = {
    id: 'yacht-sailing',
    title: 'Yacht Sailing',
    image: pic65,
    price: '$300 per couple',
    duration: '180 minutes',
    rating: 4.9
  };

  const handleBookNow = () => {
    navigate('/checkout', { state: { item: dateItem } });
  };
  
  const reviews = [
    {
      id: '1',
      name: 'Jennifer & Mark',
      rating: 5,
      comment: 'Absolutely stunning experience! The sunset cruise was magical. The captain was knowledgeable and the champagne toast at sea was perfect. This is the most romantic date we\'ve ever had!',
      date: 'November 5, 2024'
    },
    {
      id: '2',
      name: 'Rachel',
      rating: 5,
      comment: 'Best anniversary surprise ever! The views were breathtaking, and having the yacht to ourselves made it so intimate. Highly recommend for special occasions!',
      date: 'October 30, 2024'
    },
    {
      id: '3',
      name: 'David & Emma',
      rating: 5,
      comment: 'Luxury at its finest! The yacht was beautiful, the service was impeccable, and watching dolphins alongside was an unexpected bonus. Worth every penny!',
      date: 'October 22, 2024'
    }
  ];

  return (
    <main className={`container-fluid ${styles.yachtSailingMain}`}>
      <Container>
        <div className="text-center">
          <hr />
          <h1>Yacht Sailing Romance</h1>
          <hr />
        </div>

        <div className={styles.mainImageContainer}>
          <img src={pic65} alt="Yacht Sailing Date" className={styles.mainImage} />
        </div>

        <Row>
          <Col lg={8}>
            <div className={styles.shortDesc}>
              <h2>Sail Away on a Romantic Adventure</h2>
              <p className={styles.shortDescText}>
                Experience luxury and romance on the open water. Glide across the waves together,
                enjoy stunning coastal views, and create unforgettable memories aboard a private yacht.
              </p>
            </div>

            <div className={styles.tags}>
              <Badge bg="primary" className={styles.tag}>Luxury</Badge>
              <Badge bg="success" className={styles.tag}>Romantic</Badge>
              <Badge bg="warning" className={styles.tag}>Ocean</Badge>
              <Badge bg="info" className={styles.tag}>Sunset</Badge>
              <Badge bg="danger" className={styles.tag}>Exclusive</Badge>
            </div>

            <div className={styles.contentBox}>
              <h3>About This Date</h3>
              <p>
                There's something incredibly romantic about being on the open water with your special someone. 
                A yacht sailing date combines adventure, luxury, and intimate moments as you glide across 
                the waves together. Whether it's a sunset cruise or a full day charter, this is a date 
                they'll never forget.
              </p>
              <p>
                Feel the wind in your hair, enjoy breathtaking views of the coastline, and maybe even 
                try your hand at steering the boat! Many yacht experiences include champagne, gourmet 
                snacks, and the chance to anchor in a secluded spot for swimming or relaxing.
              </p>

              <div className={styles.highlights}>
                <h4>What Makes Yacht Sailing Special?</h4>
                <ul>
                  <li>⛵ Luxurious and exclusive experience</li>
                  <li>🌅 Stunning sunset views</li>
                  <li>🥂 Champagne and fine dining on water</li>
                  <li>🏖️ Privacy and intimacy</li>
                  <li>📸 Instagram-worthy moments</li>
                  <li>🌊 Peaceful and romantic atmosphere</li>
                </ul>
              </div>

              <div className={styles.tips}>
                <h4>Helpful Tips:</h4>
                <p><strong>Book in advance</strong> - Popular times fill up quickly</p>
                <p><strong>Check the weather</strong> - Calm seas make for better experience</p>
                <p><strong>Bring layers</strong> - It can be cooler on the water</p>
                <p><strong>Don't forget sunscreen</strong> - UV rays reflect off water</p>
                <p><strong>Take motion sickness medication</strong> - If you're prone to seasickness</p>
              </div>
            </div>

            <ReviewList reviews={reviews} />
            <ReviewForm dateType="yacht-sailing" />
          </Col>

          <Col lg={4}>
            <div className={styles.infoPanel}>
              <h3>Date Details</h3>
              
              <div className={styles.infoItem}>
                <span className={styles.infoLabel}>⏱️ Duration:</span>
                <span className={styles.infoValue}>180 minutes</span>
              </div>

              <div className={styles.infoItem}>
                <span className={styles.infoLabel}>💰 Price:</span>
                <span className={styles.infoValue}>$300 per couple</span>
              </div>

              <div className={styles.infoItem}>
                <span className={styles.infoLabel}>🌅 Best Time:</span>
                <span className={styles.infoValue}>Sunset</span>
              </div>

              <div className={styles.infoItem}>
                <span className={styles.infoLabel}>👥 Perfect For:</span>
                <span className={styles.infoValue}>Couples, Anniversaries</span>
              </div>

              <div className={styles.infoItem}>
                <span className={styles.infoLabel}>📅 Season:</span>
                <span className={styles.infoValue}>Spring through Fall</span>
              </div>

              <div className={styles.averageRating}>
                <h4>Average Rating</h4>
                <div className={styles.ratingStars}>
                  {'★'.repeat(5)}
                </div>
                <p>5.0 out of 5 (3 reviews)</p>
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
