import { OrdersBoard } from '@/components/OrdersBoard';
import { useOrders } from '@/hooks';

import * as S from './styles';

export const Orders = () => {
  const { handleCancelOrder, handleChangeOrderStatus, getOrdersByStatus } = useOrders();

  return (
    <S.Container>
      <OrdersBoard
        icon="🕒"
        title="Fila de espera"
        orders={getOrdersByStatus('WAITING')}
        onCancelOrder={handleCancelOrder}
        onChangeOrderStatus={handleChangeOrderStatus}
      />
      <OrdersBoard
        icon="👩🏾‍🍳"
        title="Em preparação"
        orders={getOrdersByStatus('IN_PRODUCTION')}
        onCancelOrder={handleCancelOrder}
        onChangeOrderStatus={handleChangeOrderStatus}
      />
      <OrdersBoard
        icon="✅"
        title="Pronto!"
        orders={getOrdersByStatus('DONE')}
        onCancelOrder={handleCancelOrder}
        onChangeOrderStatus={handleChangeOrderStatus}
      />
    </S.Container>
  );
};
