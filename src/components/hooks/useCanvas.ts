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
  posY: number
  size: number
  speed: {
    inner: number
    outer:  number
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

  const planets = [sun, mercury, venus, moon, earth, mars, jupiter, saturn, uranus, neptune, pluto];

  let speed = 1;
  let position = 0;
  let lastFrameTime = performance.now();

  let lastX = 0;
  let lastY = 0;
  let dragStart: {x: number, y: number} | null = null;
  let dragged = false;
  
  let scaleFactor = 1.1;

  const init = (canvas: HTMLCanvasElement | null) => {
    const ctx = canvas?.getContext('2d')

    if (!canvas || !ctx) return;
    trackTransforms(ctx)

    lastX = window.innerWidth/2;
    lastY = window.innerHeight/2;
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    ctx.translate(canvas.width/2, canvas.height/2)
    ctx.scale(0.2, 0.2)

    sun.src = sunSrc;
    mercury.src = mercurySrc;
    venus.src = venusSrc;
    earth.src = earthSrc;
    mars.src = marsSrc;
    jupiter.src = jupiterSrc;
    saturn.src = saturnSrc;
    uranus.src = uranusSrc;
    neptune.src = neptuneSrc;
    pluto.src = plutoSrc;

    let zoom = (clicks: number) => {
      let pt = ctx.transformedPoint(lastX, lastY);
      let factor = Math.pow(scaleFactor, clicks);

      console.log(pt)
      ctx.translate(pt.x, pt.y);
      ctx.scale(factor, factor);
      ctx.translate(-pt.x, -pt.y);
    };

    let handleScroll = (e: WheelEvent) => {
      let delta = e.deltaY > 0 ? -0.7 : 0.7
      if (delta) zoom(delta);
    };

    // EVENTS
    canvas.addEventListener('mousedown', (e) => {
      lastX = e.offsetX || (e.pageX - canvas.offsetLeft);
      lastY = e.offsetY || (e.pageY - canvas.offsetTop);
      dragStart = ctx.transformedPoint(lastX, lastY);
      dragged = false;
    });
    canvas.addEventListener('mousemove', (e) => {
      lastX = e.offsetX || (e.pageX - canvas.offsetLeft);
      lastY = e.offsetY || (e.pageY - canvas.offsetTop);
      dragged = true;

      if (dragStart) {
        let pt = ctx.transformedPoint(lastX, lastY);
        ctx.translate(
          pt.x - dragStart.x,
          pt.y - dragStart.y
        );
      }
    });
    canvas.addEventListener('mouseup', (e) => {
      dragStart = null;
    });
    canvas.addEventListener('wheel', (e) => handleScroll(e));

    Promise.all(planets)
      .then(() => window.requestAnimationFrame(() => draw(ctx)));
  };

  const draw = (ctx: CanvasRenderingContext2D) => {
    const sunSize = 1392;
    const w = window.innerWidth;
    const h = window.innerHeight;
    const currentTime = performance.now();
    const elapsedTime = currentTime - lastFrameTime;
    lastFrameTime = currentTime;
    const motionIncrement = (speed * elapsedTime) / 1000;

    ctx.strokeStyle = '#fff';

    ctx.save();
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.fillRect(0, 0, w, h);
    ctx.restore();

    ctx.save();
      ctx.save();
        rotate(0, 1, ctx)
        ctx.fillStyle = '#fff'
        ctx.drawImage(sun, -sunSize/2, -sunSize/2, sunSize, sunSize);
      ctx.restore();


      drawObject({
        posY: sunSize / 2 + 58,
        size: sunSize / 285,
        speed: {
          inner: 5,
          outer: 0
        },
        offset: 0,
        object: mercury, 
        ctx
      });
      drawObject({
        posY: sunSize / 2 + 108,
        size: sunSize / 115,
        speed: {
          inner: 5,
          outer: 0
        },
        offset: 0,
        object: venus,
        ctx
      });
      drawObject({
        posY: sunSize / 2 + 150,
        size: sunSize / 109,
        speed: {
          inner: 5,
          outer: 0
        },
        offset: 0,
        object: earth,
        ctx
      });
      drawObject({
        posY: sunSize / 2 + 228,
        size: sunSize / 205,
        speed: {
          inner: 5,
          outer: 0
        },
        offset: 0,
        object: mars,
        ctx
      });
      drawObject({
        posY: sunSize / 2 + 778,
        size: sunSize / 9.95,
        speed: {
          inner: 5,
          outer: 0
        },
        offset: 0,
        object: jupiter,
        ctx
      })
      // draw saturn
      const satPos = sunSize / 2 + 1433;
      const satSize = sunSize / 11.9;

      ctx.save();
        ctx.fillStyle = 'rgba(0, 0, 0, .7)';

        ctx.beginPath();
          ctx.arc(0, 0, satPos, 0, Math.PI * 2, false);
        ctx.stroke();
        
        rotate(0, 0, ctx);

        ctx.translate(0, satPos);
        
        ctx.save();
          rotate(0, 0, ctx);
          ctx.drawImage(saturn, -satSize/2*2.07, -satSize/2, satSize*2.07,  satSize);
        ctx.restore();

        ctx.fillRect(-42, 0, 92, 100);
      ctx.restore();
    ctx.restore();
    drawObject({
      posY: sunSize / 2 + 2877,
      size: sunSize / 9.95,
      speed: {
        inner: 5,
        outer: 0
      },
      offset: 0,
      object: uranus,
      ctx
    })
    drawObject({
      posY: sunSize / 2 + 4503,
      size: sunSize / 9.95,
      speed: {
        inner: 5,
        outer: 0
      },
      offset: 0,
      object: jupiter,
      ctx
    })
    drawObject({
      posY: sunSize / 2 + 5950,
      size: sunSize / 9.95,
      speed: {
        inner: 5,
        outer: 0
      },
      offset: 0,
      object: pluto,
      ctx
    })
    position  += motionIncrement
    window.requestAnimationFrame(() => draw(ctx));
  };

  const drawObject = ({posY, size, speed, object, offset, ctx}: DrawObjectProps) => {
    ctx.save();
      ctx.fillStyle = 'rgba(0, 0, 0, .7)';

      ctx.beginPath();
        ctx.arc(0, 0, posY, 0, Math.PI * 2, false)
      ctx.stroke();

      rotate(0, 0, ctx);

      ctx.save();
        ctx.translate(0, posY);
        
        ctx.save();
          rotate(0, 1, ctx);
          ctx.drawImage(object, -size/2, -size/2, size, size);
        ctx.restore();

        ctx.beginPath();
          ctx.arc(0, 0, size/2, 0, Math.PI, false);
        ctx.fill();
      ctx.restore();
    ctx.restore();
  };

  const rotate = (offset: number, speedMultiplier: number, ctx: CanvasRenderingContext2D) => {
    ctx.rotate(((position + offset) * speedMultiplier) * (Math.PI / 180));
  };

  const trackTransforms = (ctx: CanvasRenderingContext2D) => {
    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    let xform = svg.createSVGMatrix();
    ctx.getTransform = () => xform;

    let savedTransforms: DOMMatrix[] = [];
    let save = ctx.save;
    ctx.save = () => {
      savedTransforms.push(xform.translate(0, 0));
      return save.call(ctx);
    };

    let restore = ctx.restore;
    ctx.restore = () => {
      let form = savedTransforms.pop();
      if (form) xform = form;

      return restore.call(ctx);
    };

    let scale = ctx.scale;
    ctx.scale = (sx: number, sy: number) => {
      xform = xform.scale(sx, sy);
      return  scale.call(ctx, sx, sy);
    };

    let rotate = ctx.rotate;
    ctx.rotate = (radians) => {
      xform.rotate(radians * 180 / Math.PI);
      return rotate.call(ctx, radians);
    };

    let translate = ctx.translate;
    ctx.translate = (dx: number, dy: number) => {
      xform = xform.translate(dx, dy);
      return translate.call(ctx, dx, dy);
    };

    let transform = ctx.transform;
    ctx.transform = (a, b, c, d, e, f) => {
      let m2 = svg.createSVGMatrix();

      m2.a = a;
      m2.b = b;
      m2.c = c;
      m2.d = d;
      m2.e = e;
      m2.f = f;

      xform.multiply(m2);
      return transform.call(ctx, a, b, c, d, e, f);
    };

    let setTransform = ctx.setTransform;
    ctx.setTransform = (a, b, c, d, e, f) => {
      xform.a = a;
      xform.b = b;
      xform.c = c;
      xform.d = d;
      xform.e = e;
      xform.f = f;

      return setTransform.call(ctx, a, b, c, d, e, f);
    };

    let pt = svg.createSVGPoint();
    ctx.transformedPoint = (x, y) => {
      pt.x = x;
      pt.y = y;

      return pt.matrixTransform(xform.inverse());
    };
  };

  return { init };
}