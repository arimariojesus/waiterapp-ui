import { useState } from 'react';

import { OrderModal } from '@/components/OrderModal';
import { api } from '@/services/api';
import { IOrder } from '@/types/Order';

import * as S from './styles';

interface OrdersBoardProps {
  icon: string;
  title: string;
  orders: IOrder[];
  onCancelOrder: (orderId: string) => void;
}

export const OrdersBoard = (props: OrdersBoardProps) => {
  const { icon, title, orders, onCancelOrder } = props;

  const [isLoading, setIsLoading] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState<IOrder | null>(null);

  const handleOpenModal = (order: IOrder) => {
    setIsModalVisible(true);
    setSelectedOrder(order);
  };

  const handleCloseModal = () => {
    setSelectedOrder(null);
    setIsModalVisible(false);
  };

  const handleCancelOrder = async (order: IOrder) => {
    try {
      setIsLoading(true);
      await new Promise(resolve => setTimeout(resolve, 3000));
      await api.delete(`/orders/${order._id}`);
      onCancelOrder(order._id);
    } finally {
      setIsLoading(false);
      setIsModalVisible(false);
    }
  };

  return (
    <S.Board>
      {!!selectedOrder && (
        <OrderModal
          isOpen={isModalVisible}
          onClose={handleCloseModal}
          order={selectedOrder}
          onCancelOrder={handleCancelOrder}
          isLoading={isLoading}
        />
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
