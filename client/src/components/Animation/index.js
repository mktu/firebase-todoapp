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

const SlideIn = (direction = 0, amount = '20px') => {
  if (direction > 0) {
    const inverted = `-${amount}`;
    return keyframes`
      from {
        transform: translateY(${inverted});
      }

      to {
        transform: translateY(0);
      }
    `;
  }
  return keyframes`
    from {
      transform: translateY(${amount});
    }

    to {
      transform: translateY(0);
    }
  `;
};



export { Fadein,SlideIn }