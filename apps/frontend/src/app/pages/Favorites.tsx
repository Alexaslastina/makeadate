import { useState, useEffect } from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { getCurrentUser } from '../services/authApi';
import { getFavorites, removeFavorite, FavoriteItem } from '../services/favoritesService';
import styles from './Favorites.module.css';

export function Favorites() {
  const [favorites, setFavorites] = useState<FavoriteItem[]>([]);
  const user = getCurrentUser();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate('/login');
      return;
    }

    loadFavorites();

    const handleUpdate = () => loadFavorites();
    window.addEventListener('favoritesUpdated', handleUpdate);
    return () => window.removeEventListener('favoritesUpdated', handleUpdate);
  }, [user, navigate]);

  const loadFavorites = () => {
    setFavorites(getFavorites());
  };

  const handleRemove = (itemId: string) => {
    removeFavorite(itemId);
  };

  const handleBuyNow = (item: FavoriteItem) => {
    navigate('/checkout', { state: { item } });
  };

  const handleBuyAll = () => {
    navigate('/checkout', { state: { items: favorites } });
  };

  const calculateTotal = () => {
    return favorites.reduce((sum, item) => {
      const price = parseFloat(item.price.replace(/[^0-9.]/g, ''));
      return sum + price;
    }, 0);
  };

  if (!user) {
    return null;
  }

  return (
    <main className={styles.favoritesMain}>
      <Container>
        <div className={styles.header}>
          <h1>My Favorites</h1>
          <p className={styles.subtitle}>Your collection of dream dates</p>
        </div>

        {favorites.length === 0 ? (
          <div className={styles.emptyState}>
            <div className={styles.emptyIcon}>♥</div>
            <h2>No favorites yet</h2>
            <p>Start adding dates to your favorites by clicking the heart icon on any date page!</p>
            <Link to="/" className={styles.browseButton}>
              Browse Dates
            </Link>
          </div>
        ) : (
          <>
            <Row>
              {favorites.map((item) => (
                <Col key={item.id} md={6} lg={4} className="mb-4">
                  <div className={styles.favoriteCard}>
                    <div className={styles.imageContainer}>
                      <img src={item.image} alt={item.title} className={styles.image} />
                      <button
                        className={styles.removeButton}
                        onClick={() => handleRemove(item.id)}
                        title="Remove from favorites"
                      >
                        ×
                      </button>
                    </div>
                    <div className={styles.cardContent}>
                      <h3>{item.title}</h3>
                      <div className={styles.details}>
                        <span className={styles.price}>{item.price}</span>
                        <span className={styles.duration}>⏱️ {item.duration}</span>
                      </div>
                      <div className={styles.rating}>
                        {'★'.repeat(Math.floor(item.rating))}
                        {'☆'.repeat(5 - Math.floor(item.rating))}
                        <span className={styles.ratingText}>({item.rating})</span>
                      </div>
                      <div className={styles.cardActions}>
                        <Link to={`/${item.id}`} className={styles.viewButton}>
                          View Details
                        </Link>
                        <button 
                          className={styles.buyNowButton}
                          onClick={() => handleBuyNow(item)}
                        >
                          Buy Now
                        </button>
                      </div>
                    </div>
                  </div>
                </Col>
              ))}
            </Row>

            <div className={styles.checkoutSection}>
              <div className={styles.totalBox}>
                <div className={styles.totalLabel}>Total:</div>
                <div className={styles.totalAmount}>${calculateTotal().toFixed(2)}</div>
              </div>
              <Button className={styles.checkoutButton} size="lg" onClick={handleBuyAll}>
                Buy All ({favorites.length} {favorites.length === 1 ? 'date' : 'dates'})
              </Button>
            </div>
          </>
        )}
      </Container>
    </main>
  );
}

