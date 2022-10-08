import * as Popover from '@radix-ui/react-popover';
import styled from 'styled-components';

export const Content = styled(Popover.Content)`
  padding: 0.5rem;
  background: ${({ theme }) => theme['gray-600']};
  position: relative;
  border-radius: 6px;
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
`;

export const Close = styled(Popover.Close)`
  position: absolute;
  background: transparent;
  top: 1.5rem;
  right: 1.5rem;
  line-height: 0;
  cursor: pointer;
  color: ${({ theme }) => theme['gray-500']};
`;

export const Arrow = styled(Popover.Arrow)`
  fill: ${({ theme }) => theme['gray-600']};
`;

export const Button = styled.button`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem;
  border-radius: 6px;

  &:hover {
    background: ${({ theme }) => theme['gray-700']};
    transition: background-color 0.2s;
  }
`;
