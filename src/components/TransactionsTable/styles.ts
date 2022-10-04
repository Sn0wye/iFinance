import * as Dialog from '@radix-ui/react-dialog';
import styled from 'styled-components';

export const TableContainer = styled.table`
  width: 100%;
  border-collapse: separate;
  border-spacing: 0 0.5rem;
  margin-top: 1.5rem;

  td {
    padding: 1.25rem 2rem;
    background: ${({ theme }) => theme['gray-700']};

    &:first-child {
      border-top-left-radius: 6px;
      border-bottom-left-radius: 6px;
    }

    &:last-child {
      border-top-right-radius: 6px;
      border-bottom-right-radius: 6px;
    }
  }
`;

interface PriceHighlightProps {
  variant: 'income' | 'outcome';
}

export const PriceHighlight = styled.span<PriceHighlightProps>`
  color: ${({ variant, theme }) =>
    variant === 'income' ? theme['green-300'] : theme['red-300']};
`;

export const DeleteButton = styled(Dialog.Trigger)`
  color: ${({ theme }) => theme['red-300']};
  padding: 0.5rem;
  line-height: 0;
  border-radius: 4px;

  &:hover {
    background: ${({ theme }) => theme['gray-800']};
    transition: background-color 0.2s;
  }
`;
