import styled, { css } from 'styled-components';

export const Overlay = styled.div`
  position: fixed;
  left: 0;
  top: 0;

  display: flex;
  align-items: center;
  justify-content: center;

  width: 100%;
  height: 100%;

  background: rgba(0, 0, 0, 0.8);
  backdrop-filter: blur(4.5px);
`;

export const ModalBody = styled.div`
  background: ${({ theme }) => theme.color.white};
  width: 480px;
  border-radius: 8px;
  padding: 32px;

  > * + * {
    margin-top: 32px;
  }

  & > header {
    display: flex;
    align-items: center;
    justify-content: space-between;

    strong {
      font-size: 24px;
    }

    button {
      line-height: 0;
      background: transparent;
      border: 0;
    }
  }

  .status-container {
    & > small {
      font-size: 14px;
      opacity: 0.8;
    }

    & > div {
      display: flex;
      align-items: center;
      gap: 8px;
      margin-top: 8px;
    }
  }
`;

export const OrderDetails = styled.div`
  & > strong {
    font-weight: ${({ theme }) => theme.font.weight.medium};
    font-size: 14px;
    opacity: 0.8;
  }
`;

export const OrderItemsContainer = styled.div`
  margin-top: 16px;
`;

export const OrderItem = styled.div`
  display: flex;

  & + & {
    margin-top: 16px;
  }

  & > img {
    object-fit: cover;
    border-radius: 6px;
  }

  .quantity {
    font-size: 14px;
    color: ${({ theme }) => theme.color.grey};
    display: block;
    min-width: 20px;
    margin-left: 12px;
  }

  .product-details {
    margin-left: 4px;

    strong {
      display: block;
      margin-bottom: 4px;
    }

    span {
      font-size: 14px;
      color: ${({ theme }) => theme.color.grey};
    }
  }
`;

export const Total = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 24px;

  span {
    font-weight: ${({ theme }) => theme.font.weight.medium};
    font-size: 14px;
    opacity: 0.8;
  }
`;

export const Buttons = styled.footer`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

export const ActionButton = styled.button<{
  variant?: 'primary' | 'secondary';
}>`
  ${({ variant = 'primary' }) => css`
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;

    border-radius: 48px;
    padding: 12px 24px;

    transition: ${({ theme }) => theme.transition.default};

    &:disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }

    ${variant === 'primary'
      ? css`
          background: ${({ theme }) => theme.color.text};
          border: 0;
          color: ${({ theme }) => theme.color.white};

          &:hover:not(:disabled) {
            opacity: 0.95;
          }
        `
      : css`
          background: transparent;
          border: 1px solid ${({ theme }) => theme.color.primary};
          color: ${({ theme }) => theme.color.primary};

          &:hover:not(:disabled) {
            background: ${({ theme }) => theme.color.primary}11;
          }
        `}
  `}
`;
