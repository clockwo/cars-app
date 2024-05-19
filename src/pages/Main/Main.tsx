import React, { useEffect, useMemo, useState } from 'react';
import { getVehicles } from '@/shared/api/carsApi';
import Card from '@/shared/ui/Item/Item';
import { Vehicle } from '@/shared/interfaces/vehicle.interface';
import {
  SortOptionsFieldType,
  SortOptionsOrderType,
  sortOptionsField,
  sortOptionsOrder,
} from '@/shared/types/types';
import Filter from '@/widgets/Filter/Filter';
import Popup from '@/widgets/Popup/Popup';
import styles from './Main.module.css';
import Map from '@/widgets/Map/Map';
import CardList from '@/shared/ui/CardList/CardList';

export interface SortState {
  field: SortOptionsFieldType | null;
  order: SortOptionsOrderType | null;
}

const ChildElem = React.memo(({ vehicles }) => {
  return (
    <div className={styles.map}>
      <h2 className={styles.subtitle}>Расположение машин на карте</h2>
      <Map cars={vehicles} />
    </div>
  );
});

const Main = () => {
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

  const onSort = (field: SortOptionsFieldType, order: SortOptionsOrderType) => {
    setSortState({ field, order });
  };

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
      <CardList items={sortedVehicles} onClick={onSettingsClick} />
      <ChildElem vehicles={vehicles} />
    </div>
  );
};

export default Main;
