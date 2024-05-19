import type { Vehicle } from '@/shared/interfaces/vehicle.interface';
import styles from './Popup.module.css';
import CloseIcon from '@/assets/close.svg';
import cn from 'classnames';
import { useEffect, useState } from 'react';

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
    <div
      className={cn(styles.popup, {
        [styles.active]: selectedItem !== null,
      })}
    >
      <div className={styles.label}>
        <label htmlFor="name">Наименование марки: </label>
        <input
          type="text"
          id="name"
          name="name"
          value={values.name}
          onChange={onChangeInput}
        />
      </div>

      <div className={styles.label}>
        <label htmlFor="model">Модель: </label>
        <input
          type="text"
          id="model"
          name="model"
          value={values.model}
          onChange={onChangeInput}
        />
      </div>

      <div className={styles.label}>
        <label htmlFor="price">Цена: </label>
        <input
          type="text"
          id="price"
          name="price"
          value={values.price}
          onChange={onChangeInput}
        />
      </div>

      <button className={styles.close} onClick={closeModal}>
        <img src={CloseIcon} alt="Close icon" width={24} height={24} />
      </button>
      <div className={styles.buttons}>
        <button
          className={styles.deleteButton}
          onClick={() => selectedItem && removeItem(selectedItem)}
        >
          Удалить из списка
        </button>
        <button className={styles.submitButton} onClick={onSubmit}>
          Подтвердить изменения
        </button>
      </div>
    </div>
  );
};

export default Popup;
