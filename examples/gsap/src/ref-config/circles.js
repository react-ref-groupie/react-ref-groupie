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
    callback // it can be any args you want
  ) => {
    const animationExample = new TimelineLite({ paused: true });

    animationExample
      .to(halo, 0.5, {
        y: 0,
        backgroundColor: '#8b0000',
      })
      .to(firstCircle, 0.5, { y: 140 })
      .to(secondCircle, 0.5, { y: 140 })
      .to(thirdCircle, 0.5, { y: 140 })
      .eventCallback('onComplete', callback);

    animationExample.play();
  },

  moveUp: (
    {
      firstCircle,
      secondCircle,
      thirdCircle,
      halo
    },
    callback
  ) => {
    const animationExample = new TimelineLite({ paused: true });

    animationExample
      .to(halo, 0.5, {
        y: 0,
        backgroundColor: '#8b0000'
      })
      .to(firstCircle, 0.5, { y: 0 })
      .to(secondCircle, 0.5, { y: 0 })
      .to(thirdCircle, 0.5, { y: 0 })
      .eventCallback("onComplete", callback);

    animationExample.play();
  },
};
