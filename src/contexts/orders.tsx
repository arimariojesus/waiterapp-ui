import React, { createContext, useEffect, useState } from 'react';
import socketIo from 'socket.io-client';

import { IOrder, OrderStatus } from '@/types/Order';
import api, { baseURL } from '@/api';

interface OrdersContextData {
  orders: IOrder[];
  handleCancelOrder: (orderId: string) => void;
  handleChangeOrderStatus: (orderId: string, status: OrderStatus) => void;
  getOrdersByStatus: (status: OrderStatus) => IOrder[];
}

export const OrdersContext = createContext<OrdersContextData | null>(null);

interface OrdersProviderProps {
  children: React.ReactNode;
}

export const OrdersProvider = ({ children }: OrdersProviderProps) => {
  const [orders, setOrders] = useState<IOrder[]>([]);

  useEffect(() => {
    async function fetchOrders() {
      const data = await api.get<IOrder[]>('/orders');
      setOrders(data);
    }
    fetchOrders();
  }, []);

  useEffect(() => {
    const socket = socketIo(baseURL, {
      transports: ['websocket'],
    });

    socket.on('orders@new', (createdOrder: IOrder) => {
      setOrders(_orders => _orders.concat(createdOrder));
    });
  }, []);

  const handleCancelOrder = (orderId: string) => {
    setOrders(_orders => orders.filter(order => order._id !== orderId));
  };

  const handleChangeOrderStatus = (orderId: string, status: OrderStatus) => {
    setOrders(_orders =>
      orders.map(order => (order._id === orderId ? { ...order, status } : order)),
    );
  };

  const getOrdersByStatus = React.useCallback((status: OrderStatus) => {
    return orders.filter(order => order.status === status);
  }, [orders]);

  return (
    <OrdersContext.Provider
      value={{
        orders,
        handleCancelOrder,
        handleChangeOrderStatus,
        getOrdersByStatus,
      }}
    >
      {children}
    </OrdersContext.Provider>
  );
};
