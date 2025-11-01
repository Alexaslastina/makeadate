import { Container } from 'react-bootstrap';
import styles from './Gallery.module.css';

// Import gallery images
import pic4 from '../../assets/images/pic4.jpeg';
import pic22 from '../../assets/images/pic22.jpeg';
import pic30 from '../../assets/images/pic30.jpeg';
import pic8 from '../../assets/images/pic8.jpeg';
import pic5 from '../../assets/images/pic5.jpeg';
import pic16 from '../../assets/images/pic16.jpeg';
import pic7 from '../../assets/images/pic7.jpeg';
import pic17 from '../../assets/images/pic17.jpeg';
import pic9 from '../../assets/images/pic9.jpeg';
import pic10 from '../../assets/images/pic10.jpeg';
import pic11 from '../../assets/images/pic11.jpeg';
import pic35 from '../../assets/images/pic35.jpeg';
import pic21 from '../../assets/images/pic21.jpeg';
import pic14 from '../../assets/images/pic14.jpeg';
import pic15 from '../../assets/images/pic15.jpeg';

const galleryImages = [
  { src: pic4, alt: 'Romantic date moment' },
  { src: pic22, alt: 'Romantic date moment' },
  { src: pic30, alt: 'Romantic date moment' },
  { src: pic8, alt: 'Romantic date moment' },
  { src: pic5, alt: 'Romantic date moment' },
  { src: pic16, alt: 'Romantic date moment' },
  { src: pic7, alt: 'Romantic date moment' },
  { src: pic17, alt: 'Romantic date moment' },
  { src: pic9, alt: 'Romantic date moment' },
  { src: pic10, alt: 'Romantic date moment' },
  { src: pic11, alt: 'Romantic date moment' },
  { src: pic35, alt: 'Romantic date moment' },
  { src: pic21, alt: 'Romantic date moment' },
  { src: pic14, alt: 'Romantic date moment' },
  { src: pic15, alt: 'Romantic date moment' },
];

export function Gallery() {
  return (
    <main className={`container-fluid ${styles.galleryMain}`}>
      <Container className="text-center">
        <hr />
        <h2 className={styles.glow}>Gallery of images</h2>
        <hr />
        <div className={styles.gridGallery}>
          {galleryImages.map((image, index) => (
            <img key={index} src={image.src} alt={image.alt} />
          ))}
        </div>
      </Container>

      <Container className="text-center">
        <hr />
        <h2 className={styles.glow}>Gallery of video</h2>
        <hr />
        <div className={styles.videoContainer}>
          <iframe
            width="560"
            height="315"
            src="https://www.youtube.com/embed/tu_TzEoidH8"
            title="Romantic Date Video 1"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>
        <hr />
        <div className={styles.videoContainer}>
          <iframe
            width="560"
            height="315"
            src="https://www.youtube.com/embed/RMRJQL65AqA"
            title="Romantic Date Video 2"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>
        <hr />
        <div className={styles.videoContainer}>
          <iframe
            width="560"
            height="315"
            src="https://www.youtube.com/embed/xw_6B2OudZI"
            title="Romantic Date Video 3"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>
      </Container>
    </main>
  );
}

