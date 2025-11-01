import { Container, Row, Col, Accordion } from 'react-bootstrap';
import styles from './FAQ.module.css';

export function FAQ() {
  const faqData = [
    {
      question: 'What is the most romantic date?',
      answer: 'Whether you\'re looking to ignite or rekindle romance—or simply keep it aflame—it\'s not just what you do on the date, it\'s how you treat your significant other while you\'re on it. "Romance is created through affection between the two of you, like compliments, light touching or remembering what your partner likes—like their favorite ice cream or a single stem of their favorite flower."'
    },
    {
      question: 'What is a good flower for a first date?',
      answer: 'The best flowers to give on a date are:\n\nRoses\nLilies\nOrchids'
    },
    {
      question: 'What is the most important thing in a relationship?',
      answer: 'Put Each Other First\n\nPutting each other first in your relationship means that you\'re paying attention to each other\'s needs and making sure they are being met.\n\nYou love seeing each other happy and would do anything to see them smile. You protect each other, love each other and support each other.'
    },
    {
      question: 'The best gift ideas for her?',
      answer: '"Diamonds Are a Girl\'s Best Friends"💎'
    },
    {
      question: 'Where should I take my girl friend on a date?',
      answer: 'Bring her somewhere unexpected and new to eat. Where you bring a girl to eat should reflect who you are and what your style is. There are so many hidden gems and eclectic restaurants out there to help you surprise a girl and let her know that you yourself are interesting and original.\n\nIn other words, don\'t bring her to Olive Garden. Chain restaurants are boring and overrated. That type of atmosphere won\'t help you two feel comfortable.\n\nIf you\'re going out to eat, which is a great way to bond, you should pick a place that has a lot of stimulation, but isn\'t too loud. While you definitely want to hear each other speak, you don\'t want to sit in complete silence.'
    },
    {
      question: 'How much does a date cost?',
      answer: 'The cost of a date today -- consisting of two dinners, a bottle of wine, and two movie tickets -- adds up to $250. Many of the cost components of the date vary by location, as well as factors such as taxes, travel costs, and overall costs of living, making dating far more expensive in some parts of the country than others.'
    }
  ];

  return (
    <main className={styles.faqMain}>
      <Container className={`p-2 text-center ${styles.faqContainer}`}>
        <hr />
        <h2>Frequently Asked Questions</h2>
        <hr />
        <Row className="content">
          {faqData.map((faq, index) => (
            <Col key={index} md={6} className="mt-2 mb-3">
              <Accordion>
                <Accordion.Item eventKey={index.toString()}>
                  <Accordion.Header>{faq.question}</Accordion.Header>
                  <Accordion.Body style={{ whiteSpace: 'pre-line' }}>
                    {faq.answer}
                  </Accordion.Body>
                </Accordion.Item>
              </Accordion>
            </Col>
          ))}
        </Row>
      </Container>
    </main>
  );
}

