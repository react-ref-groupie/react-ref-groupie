import { TimelineLite } from 'gsap';

export default {
  refs: `
    firstSquare
    secondSquare
    thirdSquare
  `,

  globals: `
    halo
  `,

  moveRight: (
    {
      firstSquare,
      secondSquare,
      thirdSquare,
      halo
    },
    callback
  ) => {
    const animationExample = new TimelineLite({ paused: true });

    animationExample
      .to(halo, 0.5, {
        y: 240,
        backgroundColor: "#030669",
      })
      .to(firstSquare, 0.5, { x: 140 })
      .to(secondSquare, 0.5, { x: 140 })
      .to(thirdSquare, 0.5, { x: 140 });

    if (typeof callback === "function") {
      animationExample.eventCallback('onComplete', callback);
    }

    animationExample.play();
  },

  moveLeft: (
    {
      firstSquare,
      secondSquare,
      thirdSquare,
      halo
    },
    callback
  ) => {
    const animationExample = new TimelineLite({ paused: true });

    animationExample
      .to(halo, 0.5, {
        y: 240,
        backgroundColor: "#030669",
      })
      .to(firstSquare, 0.5, { x: 0 })
      .to(secondSquare, 0.5, { x: 0 })
      .to(thirdSquare, 0.5, { x: 0 });

    if (typeof callback === "function") {
      animationExample.eventCallback('onComplete', callback);
    }

    animationExample.play();
  }
};
