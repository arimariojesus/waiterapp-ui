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
  
  background: #fff;

  strong {
    font-weight: 500;
  }

  span {
    font-size: 14px;
    color: #664;
  }
  
  & + & {
    margin-top: 24px;
  }

  &:hover {
    border-color: rgba(204, 204, 204, 1);
    transition: 0.16s;
  }
`;
