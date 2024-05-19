import { useState } from 'react';
import { FilterProps } from './Filter.props';
import {
  SortOptionsFieldType,
  sortOptionsField,
  sortOptionsOrder,
} from '@/shared/types/types';

import { Box, Button } from '@mui/material';
import SortIcon from '@mui/icons-material/Sort';

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
    <Box display={'flex'} gap={2} flexWrap={'wrap'} sx={{ p: 2 }}>
      <Button
        onClick={() => handleButtonClick(sortOptionsField.price)}
        variant="contained"
        endIcon={
          activeButton === sortOptionsField.price && (
            <SortIcon
              style={{
                transform: !toggle ? 'rotate(-180deg)' : 'rotate(0deg)',
                transition: 'transform 0.3s',
              }}
            />
          )
        }
      >
        Сортировать по цене
      </Button>
      <Button
        onClick={() => handleButtonClick(sortOptionsField.year)}
        variant="contained"
        endIcon={
          activeButton === sortOptionsField.year && (
            <SortIcon
              style={{
                transform: !toggle ? 'rotate(-180deg)' : 'rotate(0deg)',
                transition: 'transform 0.3s',
              }}
            />
          )
        }
      >
        Сортировать по годам
      </Button>
    </Box>
  );
};

export default Filter;
