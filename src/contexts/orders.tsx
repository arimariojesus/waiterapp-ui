import React, { createContext, useEffect, useState } from 'react';
import socketIo from 'socket.io-client';

import { IOrder, OrderStatus } from '@/types/Order';
import { baseURL } from '@/api';
import { SOCKET_EVENTS } from '@/enums';
import { OrdersService } from '@/services';

interface OrdersContextData {
  orders: IOrder[];
  isLoading: boolean;
  handleCancelOrder: (orderId: string, callback?: () => void) => Promise<void>;
  handleChangeOrderStatus: (
    orderId: string,
    status: OrderStatus,
    callback?: () => void,
  ) => Promise<void>;
  getOrdersByStatus: (status: OrderStatus) => IOrder[];
}

export const OrdersContext = createContext<OrdersContextData | null>(null);

interface OrdersProviderProps {
  children: React.ReactNode;
}

export const OrdersProvider = ({ children }: OrdersProviderProps) => {
  const [orders, setOrders] = useState<IOrder[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    async function fetchOrders() {
      const data = await OrdersService.getAll();
      setOrders(data);
    }
    fetchOrders();
  }, []);

  useEffect(() => {
    const socket = socketIo(baseURL, {
      transports: ['websocket'],
    });

    socket.on(SOCKET_EVENTS.NEW_ORDERS, (createdOrder: IOrder) => {
      setOrders(_orders => _orders.concat(createdOrder));
    });

    return () => {
      socket.off(SOCKET_EVENTS.NEW_ORDERS);
    };
  }, []);

  const handleCancelOrder = React.useCallback(
    async (orderId: string, callback?: () => void) => {
      try {
        setIsLoading(true);

        await OrdersService.delete(orderId);

        setOrders(_orders => _orders.filter(order => order._id !== orderId));

        callback?.();
      } finally {
        setIsLoading(false);
      }
    },
    [],
  );

  const handleChangeOrderStatus = React.useCallback(
    async (orderId: string, status: OrderStatus, callback?: () => void) => {
      try {
        setIsLoading(true);

        await OrdersService.changeStatus(orderId, status);

        setOrders(_orders =>
          _orders.map(order =>
            order._id === orderId ? { ...order, status } : order,
          ),
        );

        callback?.();
      } finally {
        setIsLoading(false);
      }
    },
    [],
  );

  const getOrdersByStatus = React.useCallback(
    (status: OrderStatus) => {
      return orders.filter(order => order.status === status);
    },
    [orders],
  );

  return (
    <OrdersContext.Provider
      value={{
        orders,
        isLoading,
        handleCancelOrder,
        handleChangeOrderStatus,
        getOrdersByStatus,
      }}
    >
      {children}
    </OrdersContext.Provider>
  );
};
