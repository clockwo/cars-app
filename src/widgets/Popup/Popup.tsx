import type { Vehicle } from '@/shared/interfaces/vehicle.interface';
import CloseIcon from '@mui/icons-material/Close';
import { useEffect, useState } from 'react';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  TextField,
} from '@mui/material';

interface PopupProps {
  closeModal: () => void;
  removeItem: (item: Vehicle) => void;
  editItem: (item: Vehicle) => void;
  selectedItem: Vehicle | null;
}

const Popup = ({
  closeModal,
  selectedItem,
  removeItem,
  editItem,
}: PopupProps) => {
  const [values, setValues] = useState<Partial<Vehicle>>({
    name: '',
    model: '',
    price: 0,
  });

  useEffect(() => {
    if (selectedItem) {
      setValues({
        name: selectedItem.name,
        model: selectedItem.model,
        price: selectedItem.price,
      });
    }
  }, [selectedItem]);

  const onChangeInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setValues((prevValues) => {
      return {
        ...prevValues,
        [name]: value,
      };
    });
  };

  const onSubmit = () => {
    if (selectedItem) {
      const item: Vehicle = {
        ...selectedItem,
        name: values.name ?? '',
        model: values.model ?? '',
        price: Number.parseFloat(values.price?.toString() ?? '0'),
      };
      editItem(item);
      closeModal();
    }
  };

  return (
    <Dialog open={selectedItem !== null} onClose={closeModal}>
      <DialogTitle>Настройки автомобиля</DialogTitle>
      <IconButton
        aria-label="close"
        sx={{ position: 'absolute', right: 8, top: 8 }}
        onClick={closeModal}
      >
        <CloseIcon />
      </IconButton>
      <DialogContent dividers>
        <TextField
          autoFocus
          margin="dense"
          id="name"
          name="name"
          label="Наименование автомобиля"
          type="text"
          fullWidth
          variant="standard"
          value={values.name}
          onChange={onChangeInput}
        />
        <TextField
          autoFocus
          margin="dense"
          id="model"
          name="model"
          label="Модель"
          type="text"
          fullWidth
          variant="standard"
          value={values.model}
          onChange={onChangeInput}
        />
        <TextField
          autoFocus
          margin="dense"
          id="price"
          name="price"
          label="Цена"
          type="text"
          fullWidth
          variant="standard"
          value={values.price}
          onChange={onChangeInput}
        />
      </DialogContent>
      <DialogActions
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          px: 3,
          mt: 1,
          mb: 1,
        }}
      >
        <Button
          color="error"
          variant="contained"
          onClick={() => selectedItem && removeItem(selectedItem)}
        >
          Удалить
        </Button>
        <Button color="success" variant="contained" onClick={onSubmit}>
          Подтвердить изменения
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default Popup;
