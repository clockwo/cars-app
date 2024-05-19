import { Vehicle } from '@/shared/interfaces/vehicle.interface';
import Grid from '@mui/material/Unstable_Grid2';
import Item from '../Item/Item';

interface CardListProps {
  items: Vehicle[];
  onClick: (item: Vehicle) => void;
}

const CardList = ({ items, onClick }: CardListProps) => {
  return (
    <Grid
      container
      spacing={2}
      columns={4}
      justifyContent={'center'}
      alignContent={'center'}
    >
      {items.map((item) => (
        <Grid key={item.id} xs="auto">
          <Item item={item} onClick={() => onClick(item)} />
        </Grid>
      ))}
    </Grid>
  );
};

export default CardList;
