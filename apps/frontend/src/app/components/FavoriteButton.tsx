import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getCurrentUser } from '../services/authApi';
import { toggleFavorite, isFavorite, DateItem } from '../services/favoritesService';
import styles from './FavoriteButton.module.css';

interface FavoriteButtonProps {
  item: DateItem;
}

export function FavoriteButton({ item }: FavoriteButtonProps) {
  const [favorite, setFavorite] = useState(false);
  const user = getCurrentUser();
  const navigate = useNavigate();

  useEffect(() => {
    setFavorite(isFavorite(item.id));
  }, [item.id]);

  const handleClick = () => {
    if (!user) {
      navigate('/login');
      return;
    }

    const newState = toggleFavorite(item);
    setFavorite(newState);
  };

  return (
    <button
      className={`${styles.favoriteButton} ${favorite ? styles.active : ''}`}
      onClick={handleClick}
      title={favorite ? 'Remove from favorites' : 'Add to favorites'}
    >
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill={favorite ? 'currentColor' : 'none'}
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
      </svg>
    </button>
  );
}

