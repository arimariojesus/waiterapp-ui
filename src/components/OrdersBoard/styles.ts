import styled from 'styled-components';

export const Board = styled.article`
  padding: 16px;
  border: 1px solid rgba(204, 204, 204, 0.4);
  border-radius: 16px;
  flex: 1;

  header {
    display: flex;
    align-items: center;
    justify-content: center;

    padding: 8px;
    gap: 8px;

    font-size: 14px;
  }
`;

export const OrdersContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 24px;
`;

export const OrdersButton = styled.button`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 4px;

  border: 1px solid rgba(204, 204, 204, 0.4);
  border-radius: 8px;
  height: 128px;

  background: ${({ theme }) => theme.color.lightGrey};

  strong {
    font-weight: ${({ theme }) => theme.font.weight.medium};
  }

  span {
    font-size: 14px;
    color: ${({ theme }) => theme.color.grey};
  }

  & + & {
    margin-top: 24px;
  }

  &:hover {
    border-color: rgba(204, 204, 204, 1);
    transition: ${({ theme }) => theme.transition.default};
  }
`;
