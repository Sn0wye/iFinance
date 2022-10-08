import * as Dialog from '@radix-ui/react-dialog';
import styled from 'styled-components';

import { fadeIn, fadeOut } from '../../styles/keyframes/fade';
import { scaleDown, scaleUp } from '../../styles/keyframes/scale';

export const Title = styled(Dialog.Title)`
  color: ${({ theme }) => theme.white};
  font-weight: 700;
  font-size: 1.5rem;
  margin-bottom: 0.75rem;
`;

export const Actions = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-top: 1.5rem;
`;

interface ButtonProps {
  variant: 'primary' | 'secondary';
}

export const Button = styled.button<ButtonProps>`
  height: 58px;
  background: ${({ theme, variant = 'primary' }) =>
    variant === 'primary' ? theme['red-300'] : theme['gray-300']};
  color: ${({ theme, variant = 'primary' }) =>
    variant === 'primary' ? theme.white : theme['gray-900']};
  font-weight: bold;
  padding: 0 1.25rem;
  border-radius: 6px;
  cursor: pointer;
  transition: filter 0.2s;

  &:not(:disabled):hover {
    filter: brightness(0.7);
  }
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

export const Close = styled(Dialog.Close)`
  position: absolute;
  background: transparent;
  top: 1.5rem;
  right: 1.5rem;
  line-height: 0;
  cursor: pointer;
  color: ${({ theme }) => theme['gray-500']};
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

  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;

  &[data-state='open'] {
    animation: ${fadeIn}, ${scaleUp} 0.3s ease-out;
  }
  &[data-state='closed'] {
    animation: ${fadeOut}, ${scaleDown} 0.2s ease-in;
  }
`;
