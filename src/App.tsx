import { useEffect, useMemo, useState } from 'react';
import styles from './App.module.css';
import { getVehicles } from './helpers/carsApi';
import { Vehicle } from './interfaces/vehicle.interface';
import Card from './components/Card/Card';
import Filter from './components/Filter/Filter';
import type {
  SortOptionsFieldType,
  SortOptionsOrderType,
} from './helpers/types';
import { sortOptionsField, sortOptionsOrder } from './helpers/types';
import Map from './components/Map/Map';
import Popup from './components/Popup/Popup';

export interface SortState {
  field: SortOptionsFieldType | null;
  order: SortOptionsOrderType | null;
}

const App = () => {
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [sortState, setSortState] = useState<SortState>({
    field: null,
    order: null,
  });
  const [selectedItem, setSelectedItem] = useState<Vehicle | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getVehicles();
      setVehicles(data || []);
    };
    fetchData();
  }, []);

  const onSort = (field: SortOptionsFieldType, order: SortOptionsOrderType) => {
    setSortState({ field, order });
  };

  const sortedVehicles = useMemo(() => {
    return [...vehicles].sort((a, b) => {
      if (sortState.field === sortOptionsField.price) {
        return sortState.order === sortOptionsOrder.asc
          ? a.price - b.price
          : b.price - a.price;
      } else if (sortState.field === sortOptionsField.year) {
        return sortState.order === sortOptionsOrder.asc
          ? a.year - b.year
          : b.year - a.year;
      }
      return 0;
    });
  }, [sortState, vehicles]);

  const closeModal = () => {
    setSelectedItem(null);
  };

  const onSettingsClick = (item: Vehicle) => {
    setSelectedItem(item);
  };

  const removeItem = (itemToRemove: Vehicle) => {
    setVehicles((prevVehicles) =>
      prevVehicles.filter((item) => item.id !== itemToRemove.id)
    );
    closeModal();
  };

  const editItem = (newItemSettings: Vehicle) => {
    setVehicles((prevVehicles) =>
      prevVehicles.map((item) => {
        if (item.id === newItemSettings.id) {
          return newItemSettings;
        }
        return item;
      })
    );
  };

  return (
    <div className={styles.wrapper}>
      <Popup
        closeModal={closeModal}
        selectedItem={selectedItem}
        removeItem={removeItem}
        editItem={editItem}
      />
      <Filter onSort={onSort} />
      <div className={styles.grid}>
        {sortedVehicles.map((item) => (
          <Card
            key={item.id}
            item={item}
            onClick={() => onSettingsClick(item)}
          />
        ))}
      </div>
      <div className={styles.map}>
        <h2 className={styles.subtitle}>Расположение машин на карте</h2>
        <Map cars={vehicles} />
      </div>
    </div>
  );
};

export default App;
