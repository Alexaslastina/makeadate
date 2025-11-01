import { Container } from 'react-bootstrap';
import styles from './Rooftop.module.css';
import pic84 from '../../assets/images/pic84.jpeg';
import pic85 from '../../assets/images/pic85.jpeg';
import pic83 from '../../assets/images/pic83.jpeg';

export function Rooftop() {
  return (
    <main className={`container-fluid ${styles.rooftopMain}`}>
      <Container className="text-center">
        <hr />
        <h1>A Romantic Rooftop Date Idea for Two</h1>
        <hr />

        <div className={styles.gridGallery}>
          <img src={pic84} alt="Rooftop date" />
          <img src={pic85} alt="Rooftop date" />
          <img src={pic83} alt="Rooftop date" />
        </div>

        <div className={styles.contentBox}>
          <h2>Meeting and falling in love is such a thrilling, exciting time!</h2>
          <p>
            When planning a date, you are going to want to make sure that it will impress the other person and be something that they will remember. You are also going to want to make sure that it is a place that allows you to chat and get to know each other too. Albeit in beautiful surroundings.
            One of the best ideas when it comes to heading out on a date is a rooftop. Not only are they fun, and give you a chance to chat, but they are also going to give you some pretty astounding views too.
          </p>
        </div>
      </Container>
    </main>
  );
}

