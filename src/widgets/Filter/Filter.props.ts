import type {
  SortOptionsFieldType,
  SortOptionsOrderType,
} from '@/shared/types/types';

export interface FilterProps {
  onSort: (field: SortOptionsFieldType, order: SortOptionsOrderType) => void;
}
