import { Container } from 'react-bootstrap';
import styles from './Amusement.module.css';
import pic86 from '../../assets/images/pic86.jpeg';
import pic88 from '../../assets/images/pic88.jpeg';
import pic89 from '../../assets/images/pic89.jpeg';

export function Amusement() {
  return (
    <main className={`container-fluid ${styles.amusementMain}`}>
      <Container className="text-center">
        <hr />
        <h1>Amusement Park Date Idea</h1>
        <hr />

        <div className={styles.gridGallery}>
          <img src={pic86} alt="Amusement park date" />
          <img src={pic88} alt="Amusement park date" />
          <img src={pic89} alt="Amusement park date" />
        </div>

        <div className={styles.contentBox}>
          <h2>There is nothing like letting your inhibitions go and allowing yourself to act like a kid again. Even better if your date drops their defences and joins you! The more excited you are the better it will be</h2>
        </div>
      </Container>
    </main>
  );
}

