import styles from './Card.module.css';
import SettingsIcon from '@/assets/settings.svg';
import type { CardProps } from './Card.props';

const Card = ({ item, onClick }: CardProps) => {
  return (
    <div className={styles.card}>
      <h3 className={styles.title}>{item.name}</h3>
      <p className={styles.text}>Модель: {item.model}</p>
      <p className={styles.text}>Год выпуска: {item.year}</p>
      <p className={styles.text}>Цвет: {item.color}</p>
      <p className={styles.text}>Цена: {item.price}</p>
      <p className={styles.text}>Широта: {item.latitude}</p>
      <p className={styles.text}>Долгота: {item.longitude}</p>

      <button onClick={onClick} className={styles.button}>
        <img src={SettingsIcon} alt="Settings icon" width={24} height={24} />
      </button>
    </div>
  );
};

export default Card;
