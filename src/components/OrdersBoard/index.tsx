import { useState } from 'react';

import { OrderModal } from '@/components/OrderModal';
import { api } from '@/services/api';
import { IOrder, OrderStatus } from '@/types/Order';

import * as S from './styles';

const NEXT_STATUS: Record<Exclude<OrderStatus, 'DONE'>, OrderStatus> = {
  WAITING: 'IN_PRODUCTION',
  IN_PRODUCTION: 'DONE',
};

interface OrdersBoardProps {
  icon: string;
  title: string;
  orders: IOrder[];
  onCancelOrder: (orderId: string) => void;
  onChangeOrderStatus: (orderId: string, status: OrderStatus) => void;
}

export const OrdersBoard = (props: OrdersBoardProps) => {
  const { icon, title, orders, onCancelOrder, onChangeOrderStatus } = props;

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
      await api.delete(`/orders/${order._id}`);
      onCancelOrder(order._id);
    } finally {
      setIsLoading(false);
      setIsModalVisible(false);
    }
  };

  const handleChangeOrderStatus = async (order: IOrder) => {
    try {
      setIsLoading(true);
      await api.patch(`/orders/${order._id}`, { status: NEXT_STATUS[order.status] });
    } finally {
      onChangeOrderStatus(order._id, NEXT_STATUS[order.status]);
      setIsLoading(false);
      setIsModalVisible(false);
    }
  };

  return (
    <S.Board>
      {!!selectedOrder && (
        <OrderModal
          order={selectedOrder}
          isOpen={isModalVisible}
          isLoading={isLoading}
          onClose={handleCloseModal}
          onCancelOrder={handleCancelOrder}
          onChangeStatus={handleChangeOrderStatus}
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
