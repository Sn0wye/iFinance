import styled from 'styled-components';

export const SearchFormContainer = styled.form`
  display: flex;
  gap: 1rem;

  input {
    flex: 1;
    border-radius: 6px;
    background: ${({ theme }) => theme['gray-900']};
    color: ${({ theme }) => theme['gray-300']};
    padding: 1rem;

    &::placeholder {
      color: ${({ theme }) => theme['gray-500']};
    }
  }

  button {
    display: flex;
    align-items: center;
    gap: 0.75rem;

    padding: 1rem;
    background: transparent;
    border: 1px solid ${({ theme }) => theme['brand-300']};
    color: ${({ theme }) => theme['brand-300']};
    border-radius: 6px;
    cursor: pointer;

    &:not(:disabled):hover {
      background: ${({ theme }) => theme['brand-500']};
      border-color: ${({ theme }) => theme['brand-500']};
      color: ${({ theme }) => theme.white};
      transition: background-color 0.2s, color 0.2s, border-color 0.2s;
    }

    &:disabled {
      opacity: 0.7;
      cursor: not-allowed;
    }
  }
`;
