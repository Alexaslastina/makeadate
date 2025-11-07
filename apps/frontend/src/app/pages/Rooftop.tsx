import { Container, Row, Col, Badge } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import styles from './Rooftop.module.css';
import { ReviewList } from '../components/ReviewList';
import { ReviewForm } from '../components/ReviewForm';
import { getCurrentUser } from '../services/authApi';
import pic62 from '../../assets/images/pic62.jpeg';

export function Rooftop() {
  const user = getCurrentUser();
  const navigate = useNavigate();

  const dateItem = {
    id: 'rooftop',
    title: 'Rooftop date',
    image: pic62,
    price: '$120 per couple',
    duration: '120 minutes',
    rating: 4.6
  };

  const handleBookNow = () => {
    navigate('/checkout', { state: { item: dateItem } });
  };
  
  const reviews = [
    {
      id: '1',
      name: 'Alexandra & Ryan',
      rating: 5,
      comment: 'The sunset views were absolutely breathtaking! Perfect ambiance for a romantic evening. The cocktails were amazing and the atmosphere was so intimate. Highly recommend!',
      date: 'November 6, 2024'
    },
    {
      id: '2',
      name: 'Marcus',
      rating: 5,
      comment: 'Best date spot in the city! The city lights at night created the most romantic setting. Our server was attentive and the food was delicious. Will definitely return!',
      date: 'October 29, 2024'
    },
    {
      id: '3',
      name: 'Olivia & Jake',
      rating: 5,
      comment: 'Simply magical! Watching the city come alive at dusk while enjoying great conversation and wine was perfect. The perfect blend of sophistication and romance.',
      date: 'October 21, 2024'
    }
  ];

  return (
    <main className={`container-fluid ${styles.rooftopMain}`}>
      <Container>
        <div className="text-center">
          <hr />
          <h1>Romantic Rooftop Date</h1>
          <hr />
        </div>

        <div className={styles.mainImageContainer}>
          <img src={pic62} alt="Rooftop Date" className={styles.mainImage} />
        </div>

        <Row>
          <Col lg={8}>
            <div className={styles.shortDesc}>
              <h2>Elevate Your Romance Above the City</h2>
              <p className={styles.shortDescText}>
                Experience stunning city views, sophisticated ambiance, and intimate moments at a rooftop venue. 
                Watch the sunset together while sipping cocktails and enjoying the skyline.
              </p>
            </div>

            <div className={styles.tags}>
              <Badge bg="primary" className={styles.tag}>Romantic</Badge>
              <Badge bg="success" className={styles.tag}>City Views</Badge>
              <Badge bg="warning" className={styles.tag}>Sophisticated</Badge>
              <Badge bg="info" className={styles.tag}>Evening</Badge>
              <Badge bg="danger" className={styles.tag}>Memorable</Badge>
            </div>

            <div className={styles.contentBox}>
              <h3>About This Date</h3>
              <p>
                There's something undeniably romantic about being above it all - watching the city lights 
                twinkle as the sun sets, feeling the gentle breeze, and enjoying intimate conversation in a 
                sophisticated setting. A rooftop date combines stunning views with an upscale atmosphere that 
                naturally sets the mood for romance.
              </p>
              <p>
                Whether you choose a rooftop bar, restaurant, or lounge, these elevated venues offer more than 
                just great food and drinks. They provide a unique vantage point that makes ordinary moments feel 
                extraordinary. The combination of panoramic views, ambient lighting, and the energy of the city 
                below creates an unforgettable backdrop for connection and conversation.
              </p>

              <div className={styles.highlights}>
                <h4>What Makes Rooftop Dates Special?</h4>
                <ul>
                  <li>🌆 Breathtaking city skyline views</li>
                  <li>🌅 Perfect for sunset watching</li>
                  <li>🍸 Craft cocktails and fine dining</li>
                  <li>✨ Sophisticated and romantic atmosphere</li>
                  <li>📸 Instagram-worthy photo opportunities</li>
                  <li>🎶 Often features live music or DJs</li>
                </ul>
              </div>

              <div className={styles.tips}>
                <h4>Helpful Tips:</h4>
                <p><strong>Reserve ahead</strong> - Best tables book fast, especially for sunset</p>
                <p><strong>Dress code</strong> - Many rooftop venues have smart casual requirements</p>
                <p><strong>Arrive early</strong> - Catch the golden hour and secure prime seating</p>
                <p><strong>Check the weather</strong> - Some rooftops close in bad weather</p>
                <p><strong>Bring a light jacket</strong> - It can get breezy up high</p>
              </div>
            </div>

            <ReviewList reviews={reviews} />
            <ReviewForm dateType="rooftop" />
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
                <span className={styles.infoValue}>$100 per couple</span>
              </div>

              <div className={styles.infoItem}>
                <span className={styles.infoLabel}>🌅 Best Time:</span>
                <span className={styles.infoValue}>Sunset to Evening</span>
              </div>

              <div className={styles.infoItem}>
                <span className={styles.infoLabel}>👥 Perfect For:</span>
                <span className={styles.infoValue}>Sophisticated couples, Special occasions</span>
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

