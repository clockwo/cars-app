import type { ItemProps } from './Item.props';
import Card from '@mui/material/Card';
import {
  Box,
  CardContent,
  CardHeader,
  IconButton,
  Typography,
} from '@mui/material';
import SettingsIcon from '@mui/icons-material/Settings';

const Item = ({ item, onClick }: ItemProps) => {
  return (
    <Card variant="outlined">
      <CardHeader
        title={item.name}
        subheader={item.model}
        action={
          <IconButton onClick={onClick} aria-label="settings" size="small">
            <SettingsIcon />
          </IconButton>
        }
      />
      <CardContent>
        <Typography>Год выпуска: {item.year}</Typography>
        <Typography>Цвет: {item.color}</Typography>
        <Typography>Цена: {item.price}</Typography>
        <Box
          sx={{ mt: 2 }}
          display="flex"
          flexDirection="row"
          gap={1}
          justifyContent="space-between"
        >
          <Typography>Широта: {item.latitude.toFixed(3)}</Typography>
          <Typography>Долгота: {item.longitude.toFixed(3)}</Typography>
        </Box>
      </CardContent>
    </Card>
  );
};

export default Item;
