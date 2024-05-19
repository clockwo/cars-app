interface Car {
  name: string;
  model: string;
  year: number;
  color: string;
  price: number;
  latitude: number;
  longitude: number;
}

export interface ItemProps {
  item: Car;
  onClick: () => void;
}
