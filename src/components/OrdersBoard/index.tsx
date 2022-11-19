import * as S from './styles';

import { Order } from '@/types/Order';

interface OrdersBoardProps {
  icon: string;
  title: string;
  orders: Order[];
}

export const OrdersBoard = (props: OrdersBoardProps) => {
  const { icon, title, orders } = props;

  return (
    <S.Board>
      <header>
        <span>{icon}</span>
        <strong>{title}</strong>
        <span>({orders.length})</span>
      </header>

      {orders.length > 0 && (
        <S.OrdersContainer>
          {orders.map(order => (
            <S.OrdersButton type="button" key={order._id}>
              <strong>Mesa {order.table}</strong>
              <span>
                {order.products.length} {order.products.length === 1 ? 'item' : 'itens'}
              </span>
            </S.OrdersButton>
          ))}
        </S.OrdersContainer>
      )}
    </S.Board>
  );
};
