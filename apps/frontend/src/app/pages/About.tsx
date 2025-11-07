import { Container, Row, Col, Card } from 'react-bootstrap';
import styles from './About.module.css';
import pic1001 from '../../assets/images/pic1001.jpeg';
import pic78 from '../../assets/images/pic78.jpeg';
import pic77 from '../../assets/images/pic77.jpeg';
import pic76 from '../../assets/images/pic76.jpeg';

export function About() {
  return (
    <main className={`container-fluid py-2 ${styles.aboutMain}`}>
      <Container className="text-center">
        <hr />
        <h1>About us</h1>
        <hr />

        {/* Founder Section */}
        <Row className="align-items-center">
          <Col lg={10} className="mx-auto">
            <Row>
              <Col lg={4}>
                <img
                  className={`${styles.founderImage} float-lg-start`}
                  src={pic1001}
                  alt="Alexandra Slastina"
                />
              </Col>
              <Col lg={8} className="text-lg-start">
                <h5>ALEXANDRA SLASTINA</h5>
                <h2>CREATIVE DIRECTOR AND FOUNDER</h2>
                <p>
                  Alexandra is an internationally acclaimed Israelian Romantic Date Planner Expert. She set up the first Israelian date planning company "Make a Date".
                  <br /><br />
                  Alexandra has worked all over the world as a Romance Planner and Dating Planner including Sydney, London, New York, Paris and Hong Kong.
                  <br /><br />
                  Arranged and planned over 1000 romantic dates and events and is an expert at creating dates in Israel and in all over the world.
                  <br /><br />
                  Regularly appears on television and radio in her capacity as a Romance Expert and Dating Planner.
                  <br /><br />
                  She had been quoted by the media as being most sought Israelian Dating Planner.
                </p>
              </Col>
            </Row>
          </Col>
        </Row>

        <hr />
        <h2>MAKE A DATE</h2>
        <hr />
        <p>
          We are the World's Original Romantic Dating Planners Company. Our expert team thoughtfully helps you create your dream date!
          <br /><br />
          Established in 2010, The "Make a Date" company have created over 3000 one-of-a-kind experiences romantic dates for our glowing clients!
          <br /><br />
          Take a moment to browse our gallery and enjoy some of our favorite romantic dates we have planned.
        </p>

        {/* Team Section */}
        <Container className="text-center">
          <hr />
          <h2>OUR TEAM</h2>
          <hr />

          <Row className="py-2">
            <Col xs={12} className="mb-3">
              <Card className={styles.teamCard}>
                <Card.Body>
                  <Card.Title as="h4">MEGAN BICKLEIN</Card.Title>
                  <h2>Director of sales and date design</h2>
                  <Card.Text>
                    My journey with The Make A Date started in 2015 as an intern, while also working on my own as a romantic date planner and editorial stylist. I have a passion for all things aesthetics and creativity- photography, graphic design, event design, etc. Every day, I get to see one of my visions come to life for our clients, and it's a dream come true!
                  </Card.Text>
                </Card.Body>
                <Card.Img src={pic78} alt="Megan Bicklein" />
              </Card>
            </Col>

            <Col xs={12} className="mb-3">
              <Card className={styles.teamCard}>
                <Card.Img src={pic77} alt="Abby Kelsch" />
                <Card.Body>
                  <Card.Title as="h4">ABBY KELSCH</Card.Title>
                  <h2>Date Planner</h2>
                  <Card.Text>
                    I have a passion for people, problem-solving and creativity so when the opportunity with The Make a Date was presented to me, it was a no brainer. Being able to see the process from the first conversation with a client to the start of their happily ever after is so rewarding. I love seeing our client's ideas come to life, for a moment they will never forget!
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>

            <Col xs={12} className="mb-3">
              <Card className={styles.teamCard}>
                <Card.Body>
                  <Card.Title as="h4">REGINA CARROLL</Card.Title>
                  <h2>Social media manager</h2>
                  <Card.Text>
                    With a degree in Graphic Design from Concordia University and a passion for people, when I was introduced to The Make a Date it was a perfect match. I get to design romantic date spaces that are so unique and so special for each couple. I love knowing that someone else is going to be completely overwhelmed by all the love they are receiving.
                  </Card.Text>
                </Card.Body>
                <Card.Img src={pic76} alt="Regina Carroll" />
              </Card>
            </Col>
          </Row>
        </Container>

        <hr />
        <h2>How "Make a Date" company works</h2>
        <hr />
        <Container className="text-center">
          <h2>Do you want to plan a romantic date to show your partner how much they mean to you?</h2>
          <p>
            We're not talking about just planning another Saturday night, we're talking about planning a date your partner will never forget! This package is great for making your partner feel like they're your number one priority.
            <br /><br />
            We curate a completely customized dating for you and your relationship. Upon booking, we send you our proprietary relationship questionnaire. Through that consultation, we get to know details about you and your significant other. We learn about your likes and dislikes as a couple. Based on the information we receive from the consultation, our Experts create personalized and unique romantic date ideas for you to choose from. Once you select the perfect idea, our Dating Planning team brings your idea to life through flawless execution to create the perfect date. Having been in business for a decade, we have relationships with top vendors and venues around the globe to make sure that your date is the date your partner has always dreamed of.
            <br /><br />
            <h5>PERFECT FOR: THE ROMANTIC WHO NEEDS HELP PLANNING AN UNFORGETTABLE DATE ❤</h5>
          </p>
        </Container>
      </Container>
    </main>
  );
}

