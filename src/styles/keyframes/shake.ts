import { keyframes } from 'styled-components';

export const shake = keyframes`
  0%, 100% {
    transform: 'rotate(0deg)'
  }
  50% {
    transform: 'rotate(18deg)'
  }
`;
