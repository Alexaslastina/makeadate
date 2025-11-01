import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInstagram, faFacebook, faYoutube, faTelegram } from '@fortawesome/free-brands-svg-icons';
import styles from './Footer.module.css';
import loveImage from '../../assets/images/pic52.jpg';

export function Footer() {
  return (
    <footer className="container-fluid">
      <div className={`${styles.footerContent}`}>
        <img src={loveImage} alt="love is" width="180" />
        <a href="https://www.instagram.com/explore/tags/romanticdate/" target="_blank" rel="noopener noreferrer">
          <FontAwesomeIcon icon={faInstagram} className={styles.instagram} />
        </a>
        <a href="https://about.fb.com/news/2019/09/facebook-dating/" target="_blank" rel="noopener noreferrer">
          <FontAwesomeIcon icon={faFacebook} className={styles.facebook} />
        </a>
        <a href="https://www.youtube.com/watch?v=X6Hk7hIAStw&ab_channel=Psych2Go" target="_blank" rel="noopener noreferrer">
          <FontAwesomeIcon icon={faYoutube} className={styles.youtube} />
        </a>
        <a href="https://telegram.me/dating" target="_blank" rel="noopener noreferrer">
          <FontAwesomeIcon icon={faTelegram} className={styles.telegram} />
        </a>
      </div>
    </footer>
  );
}

