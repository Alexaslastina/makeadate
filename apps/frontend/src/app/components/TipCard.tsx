import { Card } from 'react-bootstrap';

interface TipCardProps {
  image: string;
  title: string;
  text: string;
}

export function TipCard({ image, title, text }: TipCardProps) {
  return (
    <Card className="w-100 mb-3">
      <Card.Img variant="top" src={image} alt={title} />
      <Card.Body>
        <Card.Title as="h5">{title}</Card.Title>
        <Card.Text>{text}</Card.Text>
      </Card.Body>
    </Card>
  );
}

