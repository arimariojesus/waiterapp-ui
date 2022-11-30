import { OrdersBoard } from '@/components/OrdersBoard';
import { useOrders } from '@/hooks';

import * as S from './styles';

export const Orders = () => {
  const { getOrdersByStatus } = useOrders();

  return (
    <S.Container>
      <OrdersBoard
        icon="🕒"
        title="Fila de espera"
        orders={getOrdersByStatus('WAITING')}
      />
      <OrdersBoard
        icon="👩🏾‍🍳"
        title="Em preparação"
        orders={getOrdersByStatus('IN_PRODUCTION')}
      />
      <OrdersBoard
        icon="✅"
        title="Pronto!"
        orders={getOrdersByStatus('DONE')}
      />
    </S.Container>
  );
};
