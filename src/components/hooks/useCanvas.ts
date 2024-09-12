import sunSrc from '../../images/sun.png';
import mercurySrc from '../../images/mercury.png';
import venusSrc from '../../images/venus.png';
import moonSrc from '../../images/moon.png';
import earthSrc from '../../images/earth.png';
import marsSrc from '../../images/mars.png';
import jupiterSrc from '../../images/jupiter.png';
import saturnSrc from '../../images/saturn.png';
import uranusSrc from '../../images/uranus.png';
import neptuneSrc from '../../images/neptune.png';
import plutoSrc from '../../images/pluto.png'

type CanvasHook = () => {
  init: (canvas: HTMLCanvasElement | null) => void
}

interface DrawObjectProps {
  pos: number
  size: number
  speed: {
    inner: number
    outer: number
  }
  offset: number
  object: HTMLImageElement
  ctx: CanvasRenderingContext2D
}

export const useCanvas: CanvasHook = () => {
  const sun = new Image();
  const mercury = new Image();
  const venus = new Image();
  const moon = new Image();
  const earth = new Image();
  const mars = new Image();
  const jupiter = new Image();
  const saturn = new Image();
  const uranus = new Image();
  const neptune = new Image();
  const pluto = new Image();

  const planets = [sun, mercury, venus, moon, earth, mars, jupiter, saturn, uranus, neptune];

  let speed = 6;
  let position = 0;
  let lastFrameTime = performance.now()

  const init = (canvas: HTMLCanvasElement | null) => {
    const ctx = canvas?.getContext('2d')

    if (!canvas || !ctx) return;

    const w = canvas.width = window.innerWidth;
    const h = canvas.height = window.innerHeight;

    ctx.translate(w/2, h/2);

    
    sun.src = sunSrc;
    mercury.src = mercurySrc;
    venus.src = venusSrc;
    moon .src = moonSrc;
    earth.src = earthSrc;
    mars.src = marsSrc;
    jupiter.src = jupiterSrc;
    saturn.src = saturnSrc;
    uranus.src = uranusSrc;
    neptune.src = neptuneSrc;
    pluto.src = plutoSrc;

    Promise.all(planets)
      .then(() => window.requestAnimationFrame(() => draw(ctx)));
  }

  const draw = (ctx: CanvasRenderingContext2D) => {
    const w = window.innerWidth;
    const h = window.innerHeight;
    const currentTime = performance.now();
    const elapsedTime = currentTime - lastFrameTime;
    const motionIncrement = (speed * elapsedTime) / 1000;
    lastFrameTime = currentTime;

    ctx.fillRect(-(w/2), -(h/2), w, h);

    ctx.save();
      ctx.drawImage(sun, -75, -75, 150, 150);
    ctx.restore();

    // mercury
    drawObject({
      pos: 100,
      size: 60,
      speed: {
        inner: 1.5,
        outer: 1
      },
      offset: 0,
      object: mercury,
      ctx
    })

    drawObject({
      pos: 200,
      size: 60,
      speed: {
        inner: 2.5,
        outer: 2
      },
      offset: 0,
      object: venus,
      ctx
    })

    drawObject({
      pos: 300,
      size: 60,
      speed: {
        inner: 1.7,
        outer: 3.5
      },
      offset: 0,
      object: earth,
      ctx
    })
    // 6
    drawObject({
      pos: 400,
      size: 60,
      speed: {
        inner: 1.5,
        outer: 3
      },
      offset: 0,
      object: mars,
      ctx
    })

    drawObject({
      pos: 500,
      size: 60,
      speed: {
        inner: 1.3,
        outer: 2.1
      },
      offset: 0,
      object: jupiter,
      ctx
    })

    drawObject({
      pos: 600,
      size: 60,
      speed: {
        inner: 4.2,
        outer: 3.8
      },
      offset: 0,
      object: saturn,
      ctx
    })

    // 9
    drawObject({
      pos: 700,
      size: 60,
      speed: {
        inner: 1.5,
        outer: 2.6
      },
      offset: 0,
      object: uranus,
      ctx
    })

    drawObject({
      pos: 800,
      size: 60,
      speed: {
        inner: 1.5,
        outer: 1.1
      },
      offset: 0,
      object: neptune,
      ctx
    })

    drawObject({
      pos: 900,
      size: 60,
      speed: {
        inner: 1.5,
        outer: 2.9
      },
      offset: 0,
      object: pluto,
      ctx
    })

    position += motionIncrement;
    window.requestAnimationFrame(() => draw(ctx));
  }

  const drawObject = ({size, pos, speed, offset, object, ctx }: DrawObjectProps) => {
    // Draw orbit
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.3)';

    ctx.beginPath();
      ctx.arc(0, 0, pos, 0, Math.PI * 2)
    ctx.stroke();

    ctx.save();
      // Rotation around sun
      rotate(offset, speed.outer, ctx);
      ctx.translate(0, pos);

      ctx.save();
        // Rotation around itself
        rotate(offset, speed.inner, ctx);
        ctx.drawImage(object, -(size/2), -(size/2), size, size);
      ctx.restore();

      // Draw shadow of object
      ctx.fillStyle = 'rgba(0, 0, 0, .4)';

      ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.arc(0, 0, size/2, 0, 180 * (Math.PI / 180));
      ctx.fill();
    ctx.restore();
  }

  const rotate = (offset: number, speedMultiplier: number, ctx: CanvasRenderingContext2D) => {
    ctx.rotate(((position + offset) * speedMultiplier) * (Math.PI / 180));
  }

  return { init };
}