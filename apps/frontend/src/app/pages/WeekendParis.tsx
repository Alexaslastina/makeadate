import { Container, Row, Col, Badge } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import styles from './WeekendParis.module.css';
import { ReviewList } from '../components/ReviewList';
import { ReviewForm } from '../components/ReviewForm';
import { getCurrentUser } from '../services/authApi';
import pic10 from '../../assets/images/pic10.jpeg';

export function WeekendParis() {
  const user = getCurrentUser();
  const navigate = useNavigate();

  const dateItem = {
    id: 'weekend-paris',
    title: 'Weekend in Paris',
    image: pic10,
    price: '$800 per couple',
    duration: '2880 minutes',
    rating: 5.0
  };

  const handleBookNow = () => {
    navigate('/checkout', { state: { item: dateItem } });
  };
  
  const reviews = [
    {
      id: '1',
      name: 'Isabella & Alexandre',
      rating: 5,
      comment: 'Simply perfect! The Eiffel Tower at night, strolling along the Seine, café culture - everything was magical. This weekend reignited our romance. Worth every euro!',
      date: 'November 1, 2024'
    },
    {
      id: '2',
      name: 'Catherine',
      rating: 5,
      comment: 'Most romantic experience ever! From croissants at sunrise to champagne at sunset, every moment felt like a movie. The city of love exceeded all expectations!',
      date: 'October 26, 2024'
    },
    {
      id: '3',
      name: 'Daniel & Sophia',
      rating: 5,
      comment: 'Our dream getaway! Walking through Montmartre, visiting museums, dining at amazing restaurants. Paris is absolutely perfect for couples. Already planning our return!',
      date: 'October 15, 2024'
    },
    {
      id: '4',
      name: 'Nicole',
      rating: 5,
      comment: 'Best anniversary gift ever! The romance, the culture, the food - everything was incredible. A weekend in Paris should be on every couple\'s bucket list!',
      date: 'October 5, 2024'
    },
    {
      id: '5',
      name: 'Pierre & Emma',
      rating: 5,
      comment: 'Unforgettable! From the Louvre to hidden bistros, every corner of Paris breathed romance. The perfect escape for couples who want something truly special.',
      date: 'September 28, 2024'
    }
  ];

  return (
    <main className={`container-fluid ${styles.weekendParisMain}`}>
      <Container>
        <div className="text-center">
          <hr />
          <h1>Weekend in Paris</h1>
          <hr />
        </div>

        <div className={styles.mainImageContainer}>
          <img src={pic10} alt="Weekend in Paris" className={styles.mainImage} />
        </div>

        <Row>
          <Col lg={8}>
            <div className={styles.shortDesc}>
              <h2>Escape to the City of Love</h2>
              <p className={styles.shortDescText}>
                Experience the ultimate romantic getaway in the world's most beautiful city. From the 
                Eiffel Tower to charming cafés, Paris offers the perfect backdrop for unforgettable moments together.
              </p>
            </div>

            <div className={styles.tags}>
              <Badge bg="primary" className={styles.tag}>Luxury</Badge>
              <Badge bg="success" className={styles.tag}>Romance</Badge>
              <Badge bg="warning" className={styles.tag}>Culture</Badge>
              <Badge bg="info" className={styles.tag}>Travel</Badge>
              <Badge bg="danger" className={styles.tag}>Iconic</Badge>
            </div>

            <div className={styles.contentBox}>
              <h3>About This Date</h3>
              <p>
                Paris isn't called the "City of Love" for nothing. A weekend in this enchanting city offers 
                the perfect blend of romance, culture, and adventure. Walk hand-in-hand along the Seine, 
                watch the Eiffel Tower sparkle at night, share croissants at sidewalk cafés, and lose yourselves 
                in world-class museums and charming neighborhoods.
              </p>
              <p>
                Whether it's your first visit or your tenth, Paris never fails to captivate. Explore the 
                artistic streets of Montmartre, enjoy a sunset cruise on the Seine, dine at intimate bistros, 
                or simply wander through beautiful gardens. Every moment in Paris feels special, and experiencing 
                it with someone you love makes it truly unforgettable.
              </p>

              <div className={styles.highlights}>
                <h4>What Makes Paris Special?</h4>
                <ul>
                  <li>🗼 Iconic landmarks (Eiffel Tower, Arc de Triomphe)</li>
                  <li>🎨 World-class museums (Louvre, Musée d'Orsay)</li>
                  <li>☕ Charming café culture</li>
                  <li>🥐 Incredible food and pastries</li>
                  <li>🌉 Romantic Seine River cruises</li>
                  <li>🏛️ Beautiful architecture everywhere</li>
                </ul>
              </div>

              <div className={styles.tips}>
                <h4>Helpful Tips:</h4>
                <p><strong>Book hotels early</strong> - Romantic accommodations fill up fast</p>
                <p><strong>Learn basic French</strong> - "Bonjour" and "Merci" go a long way</p>
                <p><strong>Walk everywhere</strong> - Paris is best explored on foot</p>
                <p><strong>Visit early morning</strong> - Famous sites are less crowded</p>
                <p><strong>Save room for dessert</strong> - French pastries are a must!</p>
              </div>
            </div>

            <ReviewList reviews={reviews} />
            <ReviewForm dateType="weekend-paris" />
          </Col>

          <Col lg={4}>
            <div className={styles.infoPanel}>
              <h3>Date Details</h3>
              
              <div className={styles.infoItem}>
                <span className={styles.infoLabel}>⏱️ Duration:</span>
                <span className={styles.infoValue}>2-3 days</span>
              </div>

              <div className={styles.infoItem}>
                <span className={styles.infoLabel}>💰 Price:</span>
                <span className={styles.infoValue}>$1200+ per couple</span>
              </div>

              <div className={styles.infoItem}>
                <span className={styles.infoLabel}>🌸 Best Time:</span>
                <span className={styles.infoValue}>Spring or Fall</span>
              </div>

              <div className={styles.infoItem}>
                <span className={styles.infoLabel}>👥 Perfect For:</span>
                <span className={styles.infoValue}>Anniversaries, Proposals</span>
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
                <p>5.0 out of 5 (5 reviews)</p>
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
