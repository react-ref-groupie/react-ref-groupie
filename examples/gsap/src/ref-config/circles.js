import { TimelineLite } from 'gsap';

export default {
  refs: `
    firstCircle
    secondCircle
    thirdCircle
  `,

  globals: `
    halo
  `,

  moveDown: (
    {
      firstCircle,
      secondCircle,
      thirdCircle,
      halo
    },
    args
  ) => {
  },

  moveUp: ({
    firstCircle,
    secondCircle,
    thirdCircle,
  }) => {
    console.log('Method called', {
      firstCircle,
      secondCircle,
      thirdCircle,
    });
  },
};
