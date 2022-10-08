import { KBarAnimator, KBarPositioner, KBarSearch } from 'kbar';
import styled, { css } from 'styled-components';

import { shake } from '../../styles/keyframes/shake';

export const Positioner = styled(KBarPositioner)`
  position: fixed;
  inset: 0;
  display: flex;
  align-items: flex-start;
  justify-content: center;
  width: 100%;
  padding: 25vh 1rem 1rem;
  overflow-y: auto;
  background: rgba(0, 0, 0, 0.75);
  box-sizing: border-box;
`;

export const Search = styled(KBarSearch)`
  width: 100%;
  background: transparent;
  padding: 1rem;
  font-size: 1rem;
  color: ${({ theme }) => theme['gray-100']};

  ::placeholder {
    color: ${({ theme }) => theme['gray-300']};
  }

  :focus {
    box-shadow: none;
  }
`;

export const Animator = styled(KBarAnimator)`
  max-width: 600px;
  width: 100%;
  overflow: hidden;
  background: ${({ theme }) => theme['gray-800']};
  border-radius: 6px;

  & > div ::-webkit-scrollbar {
    display: none;
  }
`;

export const Hr = styled.hr`
  border-top: 1px solid ${({ theme }) => theme['gray-500']};
  margin-top: 0.75rem;
  margin-bottom: 0.75rem;
`;

export const Section = styled.div`
  margin: 0 0.75rem;
  padding: 0.75rem;
  font-size: 0.875rem;
  line-height: 1.125rem;
  font-weight: 600;
  color: ${({ theme }) => theme['gray-300']};
`;

interface ResultItemStyleProps {
  active: boolean;
}

export const ResultItemStyle = styled.div<ResultItemStyleProps>`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.75rem;
  color: ${({ theme }) => theme['gray-400']};

  ${({ active }) =>
    active &&
    css`
      cursor: pointer;
      background: ${({ theme }) => theme['gray-900']};
      color: ${({ theme }) => theme['gray-100']};
      border-left: 2px solid ${({ theme }) => theme['brand-500']};

      & svg {
        animation: ${shake} 0.2s ease-in-out;
      }
    `};
`;

export const Shortcut = styled('div')`
  display: grid;
  grid-auto-flow: column;
  gap: 0.25rem;
  margin-left: auto;
`;

export const Kbd = styled.kbd`
  background: rgba(255, 255, 255, 0.1);
  color: #8f9ba8;
  padding: 0.25rem 0.5rem;
  text-transform: uppercase;
  border-radius: 4px;
  transition: background-color 0.2s ease-in-out;
  font-family: 'Roboto';
  font-size: 0.875rem;
  font-weight: 500;
`;
