import { keyframes } from 'styled-components';

const Fadein = keyframes`
  from {
    opacity: 0;
    transform: translateY(20px);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
`;


export {Fadein}