import { Carousel, Container, Row, Col } from 'react-bootstrap';
import { TipCard } from '../components/TipCard';
import { DateCard } from '../components/DateCard';
import styles from './Home.module.css';

// Import carousel images
import pic38 from '../../assets/images/pic38.jpeg';
import pic40 from '../../assets/images/pic40.png';
import pic25 from '../../assets/images/pic25.png';
import pic45 from '../../assets/images/pic45.png';

// Import tip card images
import pic72 from '../../assets/images/pic72.jpeg';
import pic2 from '../../assets/images/pic2.jpeg';
import pic7 from '../../assets/images/pic7.jpeg';
import pic73 from '../../assets/images/pic73.jpeg';
import pic74 from '../../assets/images/pic74.jpeg';
import pic75 from '../../assets/images/pic75.jpeg';

// Import date location images
import pic62 from '../../assets/images/pic62.jpeg';
import pic63 from '../../assets/images/pic63.jpeg';
import pic64 from '../../assets/images/pic64.jpeg';
import pic65 from '../../assets/images/pic65.jpeg';
import pic66 from '../../assets/images/pic66.jpeg';
import pic68 from '../../assets/images/pic68.jpeg';
import pic10 from '../../assets/images/pic10.jpeg';
import pic71 from '../../assets/images/pic71.jpeg';

export function Home() {
  return (
    <>
      <div className="container-fluid carousell">
        {/* Mobile static image */}
        <div className="d-md-none w-100" style={{ minHeight: '300px' }}>
          <img className="w-100 d-block" src={pic38} alt="Romantic date" />
        </div>

        {/* Desktop carousel */}
        <Carousel className="d-none d-md-block" style={{ minHeight: '300px' }} indicators={true} controls={true}>
          <Carousel.Item>
            <img className="d-block w-100" src={pic40} alt="Right first date location" />
            <Carousel.Caption className={styles.carouselCaption}>
              <h3>Right first date location</h3>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item>
            <img className="d-block w-100" src={pic25} alt="Romantic atmosphere" />
            <Carousel.Caption className={styles.carouselCaption}>
              <h3>Romantic atmosphere</h3>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item>
            <img className="d-block w-100" src={pic45} alt="Food ordering" />
            <Carousel.Caption className={styles.carouselCaption}>
              <h3>Trust-building: Food ordering</h3>
            </Carousel.Caption>
          </Carousel.Item>
        </Carousel>
      </div>

      <main className="container-fluid py-4">
        <Container className="text-center">
          <hr />
          <h1>The best date ever</h1>
          <hr />
          <Row>
            {/* Left sidebar with tip cards */}
            <Col lg={2} className="border p-2">
              <TipCard
                image={pic72}
                title="First date tip"
                text="Take a deeper look at how you present yourself. Understanding the way you present yourself is important both before and during a date."
              />
              <TipCard
                image={pic2}
                title="First date tip"
                text="Prepare for an engaging conversation. Women are more attracted to dates who spark conversation topics that show they are curious."
              />
              <TipCard
                image={pic7}
                title="First date tip"
                text="Choose the right first date location. The location you choose sets the tone for your date."
              />
            </Col>

            {/* Center grid with date locations */}
            <Col lg={8}>
              <div className="grid_page">
                <DateCard 
                  id="rooftop" 
                  backgroundImage={pic62} 
                  title="Rooftop date" 
                  link="/rooftop" 
                  price="$120 per couple"
                  duration="120 minutes"
                  rating={4.6}
                />
                <DateCard 
                  id="amusement" 
                  backgroundImage={pic63} 
                  title="Amusement park" 
                  link="/amusement" 
                  price="$150 per couple"
                  duration="240 minutes"
                  rating={4.8}
                />
                <DateCard 
                  id="dance-lesson" 
                  backgroundImage={pic64} 
                  title="Dance lesson" 
                  link="/dance-lesson" 
                  price="$80 per couple"
                  duration="90 minutes"
                  rating={4.5}
                />
                <DateCard 
                  id="yacht-sailing" 
                  backgroundImage={pic65} 
                  title="Yacht Sailing" 
                  link="/yacht-sailing" 
                  price="$300 per couple"
                  duration="180 minutes"
                  rating={4.9}
                />
                <DateCard 
                  id="ice-skating" 
                  backgroundImage={pic66} 
                  title="Ice skating" 
                  link="/ice-skating" 
                  price="$60 per couple"
                  duration="120 minutes"
                  rating={4.4}
                />
                <DateCard 
                  id="horse-riding" 
                  backgroundImage={pic68} 
                  title="Horse riding tour" 
                  link="/horse-riding" 
                  price="$180 per couple"
                  duration="150 minutes"
                  rating={4.7}
                />
                <DateCard 
                  id="weekend-paris" 
                  backgroundImage={pic10} 
                  title="Weekend in Paris" 
                  link="/weekend-paris" 
                  price="$800 per couple"
                  duration="2880 minutes"
                  rating={5.0}
                />
                <DateCard 
                  id="hot-air-balloon" 
                  backgroundImage={pic71} 
                  title="Hot Air Balloon Ride" 
                  link="/hot-air-balloon" 
                  price="$200 per couple"
                  duration="180 minutes"
                  rating={4.7}
                />
              </div>
            </Col>

            {/* Right sidebar with tip cards */}
            <Col lg={2} className="border p-2">
              <TipCard
                image={pic73}
                title="First date tip"
                text="Be aware of your body language. Your body language and facial expressions are perhaps the loudest thing you communicate."
              />
              <TipCard
                image={pic74}
                title="First date tip"
                text="Know that a perfect match doesn't require perfect compatibility."
              />
              <TipCard
                image={pic75}
                title="First date tip"
                text="The key to being interesting is to be interested. It's simpler than it sounds: just ask questions!"
              />
            </Col>
          </Row>
        </Container>
      </main>
    </>
  );
}

