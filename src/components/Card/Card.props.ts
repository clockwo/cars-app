interface Car {
  name: string;
  model: string;
  year: number;
  color: string;
  price: number;
  latitude: number;
  longitude: number;
}

export interface CardProps {
  item: Car;
  onClick: () => void;
}
