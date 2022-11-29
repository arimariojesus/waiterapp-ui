import { useEffect, useState } from 'react';
import socketIo from 'socket.io-client';

import { OrdersBoard } from '@/components/OrdersBoard';
import { api, baseURL } from '@/services/api';
import { IOrder, OrderStatus } from '@/types/Order';

import * as S from './styles';

export const Orders = () => {
  const [orders, setOrders] = useState<IOrder[]>([]);

  useEffect(() => {
    const socket = socketIo(baseURL, {
      transports: ['websocket'],
    });

    socket.on('orders@new', (createdOrder: IOrder) => {
      console.log(createdOrder);
      setOrders(_orders => _orders.concat(createdOrder));
    });
  }, []);
  
  useEffect(() => {
    async function fetchOrders() {
      const { data } = await api.get<{ data: IOrder[] }>('/orders');
      setOrders(data);
    }
    fetchOrders();
  }, []);

  const handleCancelOrder = (orderId: string) => {
    setOrders(_orders => orders.filter(order => order._id !== orderId));
  };

  const handleChangeOrderStatus = (orderId: string, status: OrderStatus) => {
    setOrders(_orders => orders.map(order => (
      order._id === orderId
        ? { ...order, status }
        : order
    )));
  };

  const waiting = orders.filter(order => order.status === 'WAITING');
  const inProduction = orders.filter(order => order.status === 'IN_PRODUCTION');
  const done = orders.filter(order => order.status === 'DONE');
  
  return (
    <S.Container>
      <OrdersBoard
        icon="🕒"
        title="Fila de espera"
        orders={waiting}
        onCancelOrder={handleCancelOrder}
        onChangeOrderStatus={handleChangeOrderStatus}
      />
      <OrdersBoard
        icon="👩🏾‍🍳"
        title="Em preparação"
        orders={inProduction}
        onCancelOrder={handleCancelOrder}
        onChangeOrderStatus={handleChangeOrderStatus}
      />
      <OrdersBoard
        icon="✅"
        title="Pronto!"
        orders={done}
        onCancelOrder={handleCancelOrder}
        onChangeOrderStatus={handleChangeOrderStatus}
      />
    </S.Container>
  );
};
