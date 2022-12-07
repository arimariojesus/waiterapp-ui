import styled from 'styled-components';

export const Container = styled.header`
  display: flex;
  justify-content: center;
  align-items: center;

  height: 198px;

  background: ${({ theme }) => theme.color.primary};
`;

export const Content = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  width: 100%;
  max-width: calc(1216px + (40px * 2));
  padding: 0 40px;

  .page-details {
    color: ${({ theme }) => theme.color.white};

    h1 {
      font-size: 32px;
    }

    h2 {
      font-weight: ${({ theme }) => theme.font.weight.regular};
      font-size: 16px;
      opacity: 0.9;
      margin-top: 6px;
    }
  }

  @media screen and (max-width: 768px) {
    flex-direction: column;

    & > *:nth-child(1) {
      display: none;
    }

    & > *:nth-child(2) {
      max-width: 100%;
    }
  }
`;
