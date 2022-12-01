import { IOrder } from '@/types/Order';

export const orders: IOrder[] = [
  {
    _id: '6372e48cbcd195b0d3d0f7f3',
    table: '123',
    status: 'WAITING',
    products: [
      {
        product: {
          name: 'Pizza quatro queijos',
          imagePath: '1668654569657-quatro-queijos.png',
          price: 40,
        },
        quantity: 3,
        _id: '6372e48cbcd195b0d3d0f7f4',
      },
      {
        product: {
          name: 'Coca cola',
          imagePath: '1668656118058-coca-cola.png',
          price: 7,
        },
        quantity: 2,
        _id: '6372e48cbcd195b0d3d0f7f5',
      },
    ],
  },
  {
    _id: '6372e48cbcd195b012313',
    table: '456',
    status: 'IN_PRODUCTION',
    products: [
      {
        product: {
          name: 'Pizza quatro queijos',
          imagePath: '1668654569657-quatro-queijos.png',
          price: 40,
        },
        quantity: 3,
        _id: '6372e48cbcd195b0d3d0f7f4',
      },
      {
        product: {
          name: 'Coca cola',
          imagePath: '1668656118058-coca-cola.png',
          price: 7,
        },
        quantity: 2,
        _id: '6372e48cbcd195b0d3d0f7f5',
      },
    ],
  },
];
