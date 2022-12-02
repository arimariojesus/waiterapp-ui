import styled from 'styled-components';

export const Container = styled.main`
  display: flex;
  gap: 32px;

  width: 100%;
  max-width: calc(1216px + (40px * 2));

  padding: 0 40px;
  margin: 40px auto;

  @media screen and (max-width: 1080px) {
    flex-direction: column;
  }
`;
