import { useState } from 'react';
import styles from './Filter.module.css';
import cn from 'classnames';
import { FilterProps } from './Filter.props';
import {
  SortOptionsFieldType,
  sortOptionsField,
  sortOptionsOrder,
} from '@/helpers/types';

import ArrowUpIcon from '@/assets/arrow-up.svg';
import ArrowDownIcon from '@/assets/arrow-down.svg';

const Filter = ({ onSort }: FilterProps) => {
  const [activeButton, setActiveButton] = useState<SortOptionsFieldType | null>(
    null
  );
  const [toggle, setToggle] = useState<boolean>(true);

  const handleButtonClick = (field: SortOptionsFieldType) => {
    const newToggle = field === activeButton ? !toggle : true;
    setActiveButton(field);
    setToggle(newToggle);
    onSort(field, newToggle ? sortOptionsOrder.desc : sortOptionsOrder.asc);
  };

  return (
    <div className={styles.filter}>
      <button
        className={cn(styles.button, {
          [styles.active]: activeButton === sortOptionsField.price,
        })}
        onClick={() => handleButtonClick(sortOptionsField.price)}
      >
        Сортировать по цене
        <img
          className={styles.icon}
          src={toggle ? ArrowUpIcon : ArrowDownIcon}
          alt="Arrow icon"
          width={24}
          height={24}
        />
      </button>
      <button
        className={cn(styles.button, {
          [styles.active]: activeButton === sortOptionsField.year,
        })}
        onClick={() => handleButtonClick(sortOptionsField.year)}
      >
        Сортировать по годам
        <img
          className={styles.icon}
          src={toggle ? ArrowUpIcon : ArrowDownIcon}
          alt="Arrow icon"
          width={24}
          height={24}
        />
      </button>
    </div>
  );
};

export default Filter;
