import { useState } from 'react';

import { OrderModal } from '@/components/OrderModal';
import { IOrder, OrderStatus } from '@/types/Order';
import { useOrders } from '@/hooks';

import * as S from './styles';

const NEXT_STATUS: Record<Exclude<OrderStatus, 'DONE'>, OrderStatus> = {
  WAITING: 'IN_PRODUCTION',
  IN_PRODUCTION: 'DONE',
};

interface OrdersBoardProps {
  icon: string;
  title: string;
  orders: IOrder[];
}

export const OrdersBoard = (props: OrdersBoardProps) => {
  const { icon, title, orders } = props;

  const { handleCancelOrder, handleChangeOrderStatus, isLoading } = useOrders();

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

  return (
    <S.Board>
      {!!selectedOrder && (
        <OrderModal
          order={selectedOrder}
          isOpen={isModalVisible}
          isLoading={isLoading}
          onClose={handleCloseModal}
          onCancelOrder={({ _id }) => {
            handleCancelOrder(_id, () => setIsModalVisible(false));
          }}
          onChangeStatus={({ _id, status }) => {
            handleChangeOrderStatus(_id, NEXT_STATUS[status], () => setIsModalVisible(false));
          }}
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
