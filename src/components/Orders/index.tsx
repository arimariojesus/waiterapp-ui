import { useEffect, useState } from 'react';

import { OrdersBoard } from '@/components/OrdersBoard';
import { api } from '@/services/api';
import { IOrder } from '@/types/Order';

import * as S from './styles';

export const Orders = () => {
  const [orders, setOrders] = useState<IOrder[]>([]);
  
  useEffect(() => {
    async function fetchOrders() {
      const { data } = await api.get<{ data: IOrder[] }>('/orders');
      setOrders(data);
    }
    fetchOrders();
  }, []);

  const waiting = orders.filter(order => order.status === 'WAITING');
  const inProduction = orders.filter(order => order.status === 'IN_PRODUCTION');
  const done = orders.filter(order => order.status === 'DONE');
  
  return (
    <S.Container>
      <OrdersBoard
        icon="🕒"
        title="Fila de espera"
        orders={waiting}
      />
      <OrdersBoard
        icon="👩🏾‍🍳"
        title="Em preparação"
        orders={inProduction}
      />
      <OrdersBoard
        icon="✅"
        title="Pronto!"
        orders={done}
      />
    </S.Container>
  );
};
