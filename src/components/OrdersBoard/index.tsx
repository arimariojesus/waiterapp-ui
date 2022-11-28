import { useState } from 'react';

import { OrderModal } from '@/components/OrderModal';
import { IOrder } from '@/types/Order';

import * as S from './styles';

interface OrdersBoardProps {
  icon: string;
  title: string;
  orders: IOrder[];
}

export const OrdersBoard = (props: OrdersBoardProps) => {
  const { icon, title, orders } = props;

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState<IOrder | null>(null);

  const handleOpenModal = (order: IOrder) => {
    setIsModalVisible(true);
    setSelectedOrder(order);
  };

  const handleCloseModal = () => {
    setIsModalVisible(false);
    setSelectedOrder(null);
  };

  return (
    <S.Board>
      {!!selectedOrder && (
        <OrderModal isOpen={isModalVisible} onClose={handleCloseModal} order={selectedOrder} />
      )}

      <header>
        <span>{icon}</span>
        <strong>{title}</strong>
        <span>({orders.length})</span>
      </header>

      {orders.length > 0 && (
        <S.OrdersContainer>
          {orders.map(order => (
            <S.OrdersButton type="button" key={order._id} onClick={() => handleOpenModal(order)}>
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
