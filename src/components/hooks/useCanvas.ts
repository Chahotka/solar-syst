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
import { useEffect } from 'react';

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

  let scale = .1;
  let translatePos = {
    x: 0,
    y: 0
  }
  let scaleMultiplier = 0.98;
  let startDragOffset = {x: 0, y: 0};
  let mouseDown = false;


  const init = (canvas: HTMLCanvasElement | null) => {
    const ctx = canvas?.getContext('2d')

    if (!canvas || !ctx) return;

    const w = canvas.width = window.innerWidth;
    const h = canvas.height = window.innerHeight;

    //EVENTS
    // event for scaling
    canvas.addEventListener('wheel', (e) => {
      if (e.deltaY === 100 || e.deltaX === 100) {
        scale *= scaleMultiplier
      }
      if (e.deltaY === -100 || e.deltaX === -100) {
        scale /= scaleMultiplier
      }
    })
    // events for dragging
    canvas.addEventListener('mousedown', (e) => {
      mouseDown = true;
      startDragOffset.x = e.clientX - translatePos.x;
      startDragOffset.y = e.clientY - translatePos.y
    })
    canvas.addEventListener('mouseup', () => mouseDown = false)
    canvas.addEventListener('mouseover', () => mouseDown = false)
    canvas.addEventListener('mousemove', (e) => {
      if (mouseDown) {
        translatePos.x = e.clientX - startDragOffset.x
        translatePos.y = e.clientY - startDragOffset.y
      }
    })



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
      .then(() => draw(ctx));
  }

  const draw = (ctx: CanvasRenderingContext2D) => {
    const w = window.innerWidth;
    const h = window.innerHeight;
    const currentTime = performance.now();
    const elapsedTime = currentTime - lastFrameTime;
    const motionIncrement = (speed * elapsedTime) / 1000;
    lastFrameTime = currentTime;

    ctx.fillRect(-(w/2), -(h/2), w, h);

    ctx.save()
      ctx.translate(translatePos.x, translatePos.y)
      ctx.scale(scale, scale)

      console.log(scale)
      const sunSize = 1390;

      ctx.save();
        ctx.drawImage(sun, -sunSize/2, -sunSize/2, sunSize, sunSize);
      ctx.restore();

      // mercury
      drawObject({
        pos: 100,
        size: 60,
        speed: {
          inner: 1,
          outer: 1.5
        },
        offset: 0,
        object: mercury,
        ctx
      })

      drawObject({
        pos: 200,
        size: 60,
        speed: {
          inner: 2,
          outer: 2.5
        },
        offset: 0,
        object: venus,
        ctx
      })

      drawObject({
        pos: 300,
        size: 127,
        speed: {
          inner: 3,
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
          inner: 4,
          outer: 4.5
        },
        offset: 0,
        object: mars,
        ctx
      })

      drawObject({
        pos: 2500,
        size: 1398,
        speed: {
          inner: 3,
          outer: 5.5
        },
        offset: 0,
        object: jupiter,
        ctx
      })

      // draw saturn separete because of WidthxHeight ratio
      // drawObject({
      //   pos: 600,
      //   size: 60,
      //   speed: {
      //     inner: 0,
      //     outer: 0
      //   },
      //   offset: 0,
      //   object: saturn,
      //   ctx
      // })
      const satW = 1164 * 2.073732;
      const satH = 1164;

      ctx.save();
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.3)';

        ctx.beginPath();
          ctx.arc(0, 0, 600, 0, Math.PI * 2);
        ctx.stroke();

        rotate(0, 1, ctx)

        ctx.translate(0, 600)

        ctx.save();
        rotate(0, -1, ctx)
          ctx.drawImage(saturn, -(satW/2), -(satH/2), satW, satH)
        ctx.restore();

        ctx.fillStyle = 'rgba(0, 0, 0, 0.8)'

        ctx.beginPath();
          ctx.fillRect(-(satH/2), 0, satH, satW/2)
        ctx.fill();
      ctx.restore();

      // 9
      drawObject({
        pos: 700,
        size: 507.2,
        speed: {
          inner: 0,
          outer: 0
        },
        offset: 0,
        object: uranus,
        ctx
      })

      drawObject({
        pos: 800,
        size: 492.4,
        speed: {
          inner: 0,
          outer: 0
        },
        offset: 0,
        object: neptune,
        ctx
      })

      drawObject({
        pos: 900,
        size: 60,
        speed: {
          inner: 0,
          outer: 0
        },
        offset: 0,
        object: pluto,
        ctx
      })
    ctx.restore();

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
      ctx.fillStyle = 'rgba(0, 0, 0, .7)';

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