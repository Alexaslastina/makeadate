import { Link, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useBurgerMenu } from '../hooks/useBurgerMenu';
import { getCurrentUser, logout, User } from '../services/authApi';
import { getFavorites } from '../services/favoritesService';
import styles from './Header.module.css';
import logo from '../../assets/images/pic5.png';

export function Header() {
  const { isOpen, toggle } = useBurgerMenu();
  const navigate = useNavigate();
  const [user, setUser] = useState<User | null>(null);
  const [favoritesCount, setFavoritesCount] = useState(0);

  useEffect(() => {
    const currentUser = getCurrentUser();
    setUser(currentUser);
    updateFavoritesCount();

    const handleStorageChange = () => {
      const updatedUser = getCurrentUser();
      setUser(updatedUser);
    };

    const handleUserLogin = () => {
      const updatedUser = getCurrentUser();
      setUser(updatedUser);
      updateFavoritesCount();
    };

    const handleFavoritesUpdate = () => {
      updateFavoritesCount();
    };

    window.addEventListener('storage', handleStorageChange);
    window.addEventListener('userLoggedIn', handleUserLogin);
    window.addEventListener('userLoggedOut', handleStorageChange);
    window.addEventListener('favoritesUpdated', handleFavoritesUpdate);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('userLoggedIn', handleUserLogin);
      window.removeEventListener('userLoggedOut', handleStorageChange);
      window.removeEventListener('favoritesUpdated', handleFavoritesUpdate);
    };
  }, []);

  const updateFavoritesCount = () => {
    setFavoritesCount(getFavorites().length);
  };

  useEffect(() => {
    const checkUser = () => {
      const currentUser = getCurrentUser();
      setUser((prevUser) => {
        if (currentUser !== prevUser) {
          return currentUser;
        }
        return prevUser;
      });
    };

    window.addEventListener('focus', checkUser);
    return () => window.removeEventListener('focus', checkUser);
  }, []);

  const handleLogout = () => {
    logout();
    setUser(null);
    window.dispatchEvent(new Event('userLoggedOut'));
    navigate('/');
  };

  return (
    <header className="container-fluid">
      <div className={`container ${styles.headerContainer}`}>
        <nav className={`d-md-flex ${styles.nav} ${isOpen ? styles.open : ''}`}>
          <Link to="/">Home</Link>
          <Link to="/about">About</Link>
          <Link to="/gallery">Media</Link>
          <Link to="/faq">FAQ</Link>
          <Link to="/contact">Contact us</Link>
          <img src={logo} width="100" alt="Make a Date Logo" />
          {user ? (
            <>
              <Link to="/favorites" className={styles.favoritesLink}>
                ♥ Favorites {favoritesCount > 0 && <span className={styles.badge}>{favoritesCount}</span>}
              </Link>
              <Link to="/profile" className={styles.registerButton}>
                {user.name || user.email.split('@')[0]}
              </Link>
              {user.role === 'admin' && (
                <Link to="/admin" className={styles.adminLink}>
                  Admin
                </Link>
              )}
              <button onClick={handleLogout} className={styles.logoutButton}>
                Sign Out
              </button>
            </>
          ) : (
            <Link to="/login" className={styles.registerButton}>
              Sign In
            </Link>
          )}
        </nav>
        <div className={`burger d-md-none ${styles.burger}`} onClick={toggle}>
          <i className="fa fa-bars"></i>
        </div>
      </div>
    </header>
  );
}

