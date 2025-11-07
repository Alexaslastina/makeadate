import { Container, Row, Col, Badge } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import styles from './HorseRiding.module.css';
import { ReviewList } from '../components/ReviewList';
import { ReviewForm } from '../components/ReviewForm';
import { getCurrentUser } from '../services/authApi';
import pic68 from '../../assets/images/pic68.jpeg';

export function HorseRiding() {
  const user = getCurrentUser();
  const navigate = useNavigate();

  const dateItem = {
    id: 'horse-riding',
    title: 'Horse riding tour',
    image: pic68,
    price: '$180 per couple',
    duration: '150 minutes',
    rating: 4.7
  };

  const handleBookNow = () => {
    navigate('/checkout', { state: { item: dateItem } });
  };
  
  const reviews = [
    {
      id: '1',
      name: 'Amanda & Jake',
      rating: 5,
      comment: 'Absolutely magical! We rode through beautiful trails at sunset. The horses were gentle and the guide was excellent. This was our most memorable date ever!',
      date: 'November 3, 2024'
    },
    {
      id: '2',
      name: 'Michael',
      rating: 5,
      comment: 'Perfect romantic adventure! Neither of us had ridden before, but the staff made us feel comfortable. The scenery was breathtaking and we loved every minute.',
      date: 'October 25, 2024'
    },
    {
      id: '3',
      name: 'Sophie & Chris',
      rating: 5,
      comment: 'Best date idea ever! Riding side by side through the countryside was so peaceful and romantic. The horses were beautiful and well-trained. Highly recommend!',
      date: 'October 18, 2024'
    },
    {
      id: '4',
      name: 'Jessica',
      rating: 4,
      comment: 'Great experience! A bit more physical than expected, but so worth it. The views were stunning and our guide was very knowledgeable about the area.',
      date: 'October 10, 2024'
    }
  ];

  return (
    <main className={`container-fluid ${styles.horseRidingMain}`}>
      <Container>
        <div className="text-center">
          <hr />
          <h1>Horse Riding Tour</h1>
          <hr />
        </div>

        <div className={styles.mainImageContainer}>
          <img src={pic68} alt="Horse Riding Date" className={styles.mainImage} />
        </div>

        <Row>
          <Col lg={8}>
            <div className={styles.shortDesc}>
              <h2>Explore Nature on Horseback</h2>
              <p className={styles.shortDescText}>
                Embark on a romantic adventure through scenic trails on horseback. Connect with nature, 
                each other, and these magnificent animals for an unforgettable date experience.
              </p>
            </div>

            <div className={styles.tags}>
              <Badge bg="primary" className={styles.tag}>Adventure</Badge>
              <Badge bg="success" className={styles.tag}>Nature</Badge>
              <Badge bg="warning" className={styles.tag}>Romantic</Badge>
              <Badge bg="info" className={styles.tag}>Outdoors</Badge>
              <Badge bg="danger" className={styles.tag}>Memorable</Badge>
            </div>

            <div className={styles.contentBox}>
              <h3>About This Date</h3>
              <p>
                Horseback riding offers a unique blend of adventure, romance, and connection with nature. 
                Whether you're experienced riders or complete beginners, riding side by side through beautiful 
                trails creates a special bond. The gentle pace allows for conversation while you take in 
                breathtaking views of countryside, forests, or coastal paths.
              </p>
              <p>
                Most tours cater to all experience levels, with calm, well-trained horses and experienced 
                guides. You'll learn basic riding techniques, connect with your horse, and enjoy the peaceful 
                rhythm of moving through nature together. Many tours offer sunset rides for extra romance, 
                or morning rides followed by a picnic breakfast.
              </p>

              <div className={styles.highlights}>
                <h4>What Makes Horse Riding Special?</h4>
                <ul>
                  <li>🐴 Connect with magnificent animals</li>
                  <li>🌄 Stunning natural scenery</li>
                  <li>💑 Ride side by side together</li>
                  <li>🌅 Sunset or sunrise options</li>
                  <li>📸 Incredible photo opportunities</li>
                  <li>🧘 Peaceful and meditative</li>
                </ul>
              </div>

              <div className={styles.tips}>
                <h4>Helpful Tips:</h4>
                <p><strong>Wear long pants</strong> - Jeans or riding pants are ideal</p>
                <p><strong>Closed-toe shoes</strong> - Boots with a small heel work best</p>
                <p><strong>Bring sunscreen</strong> - You'll be outdoors for extended time</p>
                <p><strong>Listen to your guide</strong> - They'll keep you safe</p>
                <p><strong>Book in advance</strong> - Popular times fill up quickly</p>
              </div>
            </div>

            <ReviewList reviews={reviews} />
            <ReviewForm dateType="horse-riding" />
          </Col>

          <Col lg={4}>
            <div className={styles.infoPanel}>
              <h3>Date Details</h3>
              
              <div className={styles.infoItem}>
                <span className={styles.infoLabel}>⏱️ Duration:</span>
                <span className={styles.infoValue}>150 minutes</span>
              </div>

              <div className={styles.infoItem}>
                <span className={styles.infoLabel}>💰 Price:</span>
                <span className={styles.infoValue}>$120 per person</span>
              </div>

              <div className={styles.infoItem}>
                <span className={styles.infoLabel}>🌅 Best Time:</span>
                <span className={styles.infoValue}>Morning or Sunset</span>
              </div>

              <div className={styles.infoItem}>
                <span className={styles.infoLabel}>👥 Perfect For:</span>
                <span className={styles.infoValue}>Adventure couples, Nature lovers</span>
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
