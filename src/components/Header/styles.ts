import styled from 'styled-components';

export const HeaderContainer = styled.header`
  background: ${({ theme }) => theme['gray-900']};
  padding: 2.5rem 0 7.5rem;
`;

export const HeaderContent = styled.div`
  width: 100%;
  max-width: 1120px;
  margin: 0 auto;
  padding: 0 1.5rem;

  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const NewTransactionButton = styled.button`
  height: 50px;
  background: ${({ theme }) => theme['green-500']};
  color: ${({ theme }) => theme.white};
  font-weight: bold;
  padding: 0 1.25rem;
  border-radius: 6px;
  cursor: pointer;

  &:hover {
    background: ${({ theme }) => theme['green-700']};
    transition: background-color 0.2s;
  }
`;

export const RightGroup = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

export const ProfileImageWrapper = styled.div`
  position: relative;
  height: 3.125rem;
  aspect-ratio: 1/1;
  border: 4px solid transparent;
  border-radius: 6px;

  img {
    width: 3rem;
    height: 3rem;
    border-radius: 9999px;
  }

  &:hover {
    background: ${({ theme }) => theme['gray-600']};
    transition: border 0.2s;
  }
`;
