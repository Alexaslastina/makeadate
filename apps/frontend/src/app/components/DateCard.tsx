import { Link } from 'react-router-dom';
import styles from './DateCard.module.css';

interface DateCardProps {
  backgroundImage: string;
  title: string;
  link: string;
}

export function DateCard({ backgroundImage, title, link }: DateCardProps) {
  return (
    <div 
      className={styles.dateCard}
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      <Link to={link}>
        <h2>{title}</h2>
      </Link>
    </div>
  );
}

