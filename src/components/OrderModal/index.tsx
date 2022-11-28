import { useEffect } from 'react';

import closeIcon from '@/assets/images/close-icon.svg';
import { Portal } from '@/components/Portal';
import { ORDER_STATUS } from '@/constants/order-status';
import { IOrder } from '@/types/Order';
import { formatCurrency } from '@/utils/format-currency';

import * as S from './styles';

function getTotal(products: IOrder['products']) {
  return products.reduce((total, product) => {
    const {
      product: { price },
      quantity,
    } = product;
    return total + price * quantity;
  }, 0);
}

interface OrderModalProps {
  isOpen: boolean;
  onClose(): void;
  order: IOrder;
  isLoading?: boolean;
  onCancelOrder: (order: IOrder) => void;
}

export const OrderModal = (props: OrderModalProps) => {
  const { isOpen, onClose, order, isLoading, onCancelOrder } = props;

  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        onClose();
      }
    }

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [onClose]);

  if (!isOpen) {
    return null;
  }

  return (
    <Portal>
      <S.Overlay onClick={onClose}>
        <S.ModalBody onClick={e => e.stopPropagation()}>
          <header>
            <strong>Mesa {order.table}</strong>

            <button type="button" onClick={onClose}>
              <img src={closeIcon} alt="Fechar" />
            </button>
          </header>

          <div className="status-container">
            <small>Status do Pedido</small>
            <div>
              <span>{ORDER_STATUS[order.status].icon}</span>
              <strong>{ORDER_STATUS[order.status].title}</strong>
            </div>
          </div>

          <S.OrderDetails>
            <strong>Itens</strong>

            <S.OrderItemsContainer>
              {order.products.map(({ _id, product, quantity }) => (
                <S.OrderItem key={_id}>
                  <img
                    src={`http://localhost:3333/uploads/${product.imagePath}`}
                    alt={product.name}
                    width="46"
                    height="40"
                  />
                  <span className="quantity">{quantity}x</span>

                  <div className="product-details">
                    <strong>{product.name}</strong>
                    <span>{formatCurrency(product.price)}</span>
                  </div>
                </S.OrderItem>
              ))}
            </S.OrderItemsContainer>

            <S.Total>
              <span>Total</span>
              <strong>{formatCurrency(getTotal(order.products))}</strong>
            </S.Total>
          </S.OrderDetails>

          <S.Buttons>
            <S.ActionButton variant="primary" disabled={isLoading}>
              <span>👩🏾‍🍳</span>
              <strong>Iniciar produção</strong>
            </S.ActionButton>

            <S.ActionButton
              variant="secondary"
              disabled={isLoading}
              onClick={() => onCancelOrder(order)}
            >
              <strong>Cancelar pedido</strong>
            </S.ActionButton>
          </S.Buttons>
        </S.ModalBody>
      </S.Overlay>
    </Portal>
  );
};
