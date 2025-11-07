import { Container, Row, Col, Badge } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import styles from './Amusement.module.css';
import { ReviewList } from '../components/ReviewList';
import { ReviewForm } from '../components/ReviewForm';
import { getCurrentUser } from '../services/authApi';
import pic63 from '../../assets/images/pic63.jpeg';

export function Amusement() {
  const user = getCurrentUser();
  const navigate = useNavigate();

  const dateItem = {
    id: 'amusement',
    title: 'Amusement park',
    image: pic63,
    price: '$150 per couple',
    duration: '240 minutes',
    rating: 4.8
  };

  const handleBookNow = () => {
    navigate('/checkout', { state: { item: dateItem } });
  };
  
  const reviews = [
    {
      id: '1',
      name: 'Jessica & Tyler',
      rating: 5,
      comment: 'So much fun! We laughed, screamed on rollercoasters, and won prizes. Brought out our playful sides and created amazing memories. Best date ever!',
      date: 'November 5, 2024'
    },
    {
      id: '2',
      name: 'Brandon',
      rating: 5,
      comment: 'Perfect for breaking the ice! The excitement and energy of the park made everything fun and natural. Sharing cotton candy and going on rides together was awesome!',
      date: 'October 27, 2024'
    },
    {
      id: '3',
      name: 'Ashley & Chris',
      rating: 5,
      comment: 'Like being kids again! The thrill rides, games, and festive atmosphere created the most fun date. Watching the fireworks together at night was magical!',
      date: 'October 19, 2024'
    },
    {
      id: '4',
      name: 'Taylor',
      rating: 4,
      comment: 'Great experience! Can get crowded and pricey, but totally worth it. Go on a weekday if possible. The memories we made were priceless!',
      date: 'October 12, 2024'
    }
  ];

  return (
    <main className={`container-fluid ${styles.amusementMain}`}>
      <Container>
        <div className="text-center">
          <hr />
          <h1>Amusement Park Adventure</h1>
          <hr />
        </div>

        <div className={styles.mainImageContainer}>
          <img src={pic63} alt="Amusement Park Date" className={styles.mainImage} />
        </div>

        <Row>
          <Col lg={8}>
            <div className={styles.shortDesc}>
              <h2>Unleash Your Inner Child Together</h2>
              <p className={styles.shortDescText}>
                Let go of your inhibitions and embrace pure fun! Amusement parks offer thrilling rides, 
                games, treats, and endless opportunities to laugh and create unforgettable memories together.
              </p>
            </div>

            <div className={styles.tags}>
              <Badge bg="primary" className={styles.tag}>Adventure</Badge>
              <Badge bg="success" className={styles.tag}>Fun</Badge>
              <Badge bg="warning" className={styles.tag}>Exciting</Badge>
              <Badge bg="info" className={styles.tag}>Playful</Badge>
              <Badge bg="danger" className={styles.tag}>Thrilling</Badge>
            </div>

            <div className={styles.contentBox}>
              <h3>About This Date</h3>
              <p>
                There's something magical about an amusement park date. The energy, excitement, and sense of 
                adventure create the perfect environment for bonding. Whether you're screaming together on a 
                rollercoaster, competing at carnival games, or sharing cotton candy, an amusement park brings 
                out your playful sides and creates natural opportunities for laughter and fun.
              </p>
              <p>
                This date is perfect for breaking down barriers and seeing each other's genuine reactions. The 
                adrenaline rush from rides, the joy of winning a stuffed animal, the sweetness of carnival treats - 
                all these moments create shared experiences that strengthen your connection. Plus, there's something 
                romantic about walking hand-in-hand through twinkling lights as evening falls.
              </p>

              <div className={styles.highlights}>
                <h4>What Makes Amusement Parks Special?</h4>
                <ul>
                  <li>🎢 Thrilling rides and attractions</li>
                  <li>🎡 Beautiful lights and festive atmosphere</li>
                  <li>🎯 Fun games and challenges</li>
                  <li>🍭 Delicious carnival treats</li>
                  <li>😄 Natural laughter and excitement</li>
                  <li>🎆 Evening entertainment and shows</li>
                </ul>
              </div>

              <div className={styles.tips}>
                <h4>Helpful Tips:</h4>
                <p><strong>Go on weekdays</strong> - Less crowded, shorter lines</p>
                <p><strong>Buy tickets online</strong> - Save money and skip ticket lines</p>
                <p><strong>Arrive early</strong> - Hit popular rides before crowds arrive</p>
                <p><strong>Wear comfortable shoes</strong> - You'll be walking a lot</p>
                <p><strong>Stay hydrated</strong> - Bring water bottles to save money</p>
              </div>
            </div>

            <ReviewList reviews={reviews} />
            <ReviewForm dateType="amusement-park" />
          </Col>

          <Col lg={4}>
            <div className={styles.infoPanel}>
              <h3>Date Details</h3>
              
              <div className={styles.infoItem}>
                <span className={styles.infoLabel}>⏱️ Duration:</span>
                <span className={styles.infoValue}>4-6 hours</span>
              </div>

              <div className={styles.infoItem}>
                <span className={styles.infoLabel}>💰 Price:</span>
                <span className={styles.infoValue}>$60 per person</span>
              </div>

              <div className={styles.infoItem}>
                <span className={styles.infoLabel}>☀️ Best Time:</span>
                <span className={styles.infoValue}>Afternoon to Evening</span>
              </div>

              <div className={styles.infoItem}>
                <span className={styles.infoLabel}>👥 Perfect For:</span>
                <span className={styles.infoValue}>Playful couples, Adventure seekers</span>
              </div>

              <div className={styles.infoItem}>
                <span className={styles.infoLabel}>📅 Season:</span>
                <span className={styles.infoValue}>Spring through Fall</span>
              </div>

              <div className={styles.averageRating}>
                <h4>Average Rating</h4>
                <div className={styles.ratingStars}>
                  {'★'.repeat(5)}{'☆'.repeat(0)}
                </div>
                <p>4.8 out of 5 (4 reviews)</p>
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


