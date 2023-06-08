import * as Dialog from '@radix-ui/react-dialog';
import * as RadioGroup from '@radix-ui/react-radio-group';
import styled from 'styled-components';

import { fadeIn, fadeOut } from '../../styles/keyframes/fade';
import { scaleDown, scaleUp } from '../../styles/keyframes/scale';

export const Title = styled(Dialog.Title)`
  font-size: 1.5rem;
  font-weight: bold;
`;

export const Overlay = styled(Dialog.Overlay)`
  position: fixed;
  width: 100vw;
  height: 100vh;
  inset: 0;
  background: rgba(0, 0, 0, 0.75);

  &[data-state='open'] {
    animation: ${fadeIn} 0.3s ease-out;
  }
  &[data-state='closed'] {
    animation: ${fadeOut} 0.2s ease-in;
  }
`;

export const Content = styled(Dialog.Content)`
  min-width: 32rem;
  border-radius: 6px;
  padding: 2.5rem 3rem;
  background: ${({ theme }) => theme['gray-800']};
  position: fixed;

  top: 50%;
  left: 50%;
  translate: -50% -50%;

  form {
    margin-top: 2rem;
    display: flex;
    flex-direction: column;
    gap: 1rem;

    input {
      border-radius: 6px;
      background: ${({ theme }) => theme['gray-900']};
      color: ${({ theme }) => theme['gray-300']};
      padding: 1rem;

      &::placeholder {
        color: ${({ theme }) => theme['gray-500']};
      }
    }

    button[type='submit'] {
      height: 58px;
      background: ${({ theme }) => theme['brand-500']};
      color: ${({ theme }) => theme.white};
      font-weight: bold;
      padding: 0 1.25rem;
      border-radius: 6px;
      margin-top: 1.5rem;
      cursor: pointer;

      &:not(:disabled):hover {
        background: ${({ theme }) => theme['brand-700']};
        transition: background-color 0.2s;
      }

      &:disabled {
        opacity: 0.7;
        cursor: not-allowed;
      }
    }
  }

  &[data-state='open'] {
    animation: ${fadeIn}, ${scaleUp} 0.3s ease-out;
  }
  &[data-state='closed'] {
    animation: ${fadeOut}, ${scaleDown} 0.2s ease-in;
  }
`;

export const Close = styled(Dialog.Close)`
  position: absolute;
  background: transparent;
  top: 1.5rem;
  right: 1.5rem;
  line-height: 0;
  cursor: pointer;
  color: ${({ theme }) => theme['gray-500']};
`;

export const TransactionType = styled(RadioGroup.Root)`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;
  margin-top: 0.5rem;
`;

interface TransactionTypeButtonProps {
  variant: 'INCOME' | 'EXPENSE';
}

export const TransactionTypeButton = styled(
  RadioGroup.Item
)<TransactionTypeButtonProps>`
  background: ${({ theme }) => theme['gray-700']};
  padding: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  border-radius: 6px;
  cursor: pointer;
  color: ${({ theme }) => theme['gray-300']};

  svg {
    color: ${({ variant, theme }) =>
      variant === 'INCOME' ? theme['brand-300'] : theme['red-300']};
  }

  &[data-state='unchecked']:hover {
    transition: background-color 0.2s;
    background-color: ${({ theme }) => theme['gray-600']};
  }

  &[data-state='checked'] {
    color: ${({ theme }) => theme.white};
    background: ${({ variant, theme }) =>
      variant === 'INCOME' ? theme['brand-500'] : theme['red-500']};

    svg {
      color: ${({ theme }) => theme.white};
    }
  }
`;

export const Error = styled.p`
  display: block;
  color: ${({ theme }) => theme['red-300']};
  font-style: italic;
`;
