import { useContext } from 'react';

import { OrdersContext } from '@/contexts';

export const useOrders = () => {
  const context = useContext(OrdersContext);

  if (!context) {
    throw new Error('You must use useOrders inside OrdersProvider!');
  }

  return context;
};
