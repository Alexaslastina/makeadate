import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { isFavorite, addFavorite, removeFavorite, FavoriteItem } from '../services/favoritesService';
import { getCurrentUser } from '../services/authApi';
import styles from './DateCard.module.css';

interface DateCardProps {
  backgroundImage: string;
  title: string;
  link: string;
  id: string;
  price?: string;
  duration?: string;
  rating?: number;
}

export function DateCard({ backgroundImage, title, link, id, price = '$150 per couple', duration = '120 minutes', rating = 4.5 }: DateCardProps) {
  const [isSaved, setIsSaved] = useState(false);
  const user = getCurrentUser();

  useEffect(() => {
    if (user) {
      setIsSaved(isFavorite(id));
    } else {
      setIsSaved(false);
    }

    const handleFavoritesUpdate = () => {
      if (user) {
        setIsSaved(isFavorite(id));
      }
    };

    window.addEventListener('favoritesUpdated', handleFavoritesUpdate);
    return () => {
      window.removeEventListener('favoritesUpdated', handleFavoritesUpdate);
    };
  }, [id, user]);

  const handleSaveClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (!user) {
      alert('Please sign in to save dates to your favorites.');
      return;
    }

    const item: FavoriteItem = {
      id,
      title,
      image: backgroundImage,
      price,
      duration,
      rating,
    };

    if (isSaved) {
      removeFavorite(id);
    } else {
      addFavorite(item);
    }
  };

  return (
    <div 
      className={styles.dateCard}
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      {user && (
        <button
          className={`${styles.saveButton} ${isSaved ? styles.saved : ''}`}
          onClick={handleSaveClick}
        >
          {isSaved ? 'Saved' : 'Save'}
        </button>
      )}
      <Link to={link}>
        <h2>{title}</h2>
      </Link>
    </div>
  );
}

