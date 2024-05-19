export type SortOptionsOrderType = 'asc' | 'desc';
export type SortOptionsFieldType = 'price' | 'year';

export interface SortOptionsOrder {
  asc: 'asc';
  desc: 'desc';
}

export interface SortOptionsField {
  price: 'price';
  year: 'year';
}

export const sortOptionsOrder: SortOptionsOrder = {
  asc: 'asc',
  desc: 'desc',
};

export const sortOptionsField: SortOptionsField = {
  price: 'price',
  year: 'year',
};
