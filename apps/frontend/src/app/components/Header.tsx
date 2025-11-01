import { Link } from 'react-router-dom';
import { useBurgerMenu } from '../hooks/useBurgerMenu';
import styles from './Header.module.css';
import logo from '../../assets/images/pic5.png';

export function Header() {
  const { isOpen, toggle } = useBurgerMenu();

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
        </nav>
        <div className={`burger d-md-none ${styles.burger}`} onClick={toggle}>
          <i className="fa fa-bars"></i>
        </div>
      </div>
    </header>
  );
}

