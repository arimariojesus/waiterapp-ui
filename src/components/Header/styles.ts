import styled from 'styled-components';

export const Container = styled.header`
  display: flex;
  justify-content: center;
  align-items: center;
  
  height: 198px;
  
  background: #d73035;
`;

export const Content = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  
  width: 100%;
  max-width: 1216px;

  .page-details {
    color: #fff;
    
    h1 {
      font-size: 32px;
    }

    h2 {
      font-weight: 400;
      font-size: 16px;
      opacity: 0.9;
      margin-top: 6px;
    }
  }
`;
