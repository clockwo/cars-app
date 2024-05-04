import type {
  SortOptionsFieldType,
  SortOptionsOrderType,
} from '@/helpers/types';

export interface FilterProps {
  onSort: (field: SortOptionsFieldType, order: SortOptionsOrderType) => void;
}
