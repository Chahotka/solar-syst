import sunSrc from '../../images/sun.png';
import mercSrc from '../../images/mercury.png';
import earthSrc from '../../images/earth.png';
import venusSrc from '../../images/venus.png';

type CanvasHook = () => {
  init: (canvas: HTMLCanvasElement | null) => void
}

interface DrawPlanetProps {
  object: HTMLImageElement, 
  y: number, 
  size: number, 
  rotationSpeed: {
    inner: number,
    outer: number
  }, 
  ctx: CanvasRenderingContext2D
}

export const useCanvas: CanvasHook = () => {
  const sun = new Image();
  const mercury = new Image();
  const venus = new Image()
  const earth = new Image()

  const planets = [sun, mercury, venus, earth];

  const init = (canvas: HTMLCanvasElement | null) => {
    const ctx = canvas?.getContext('2d')

    if (!canvas || !ctx) return;

    const w = canvas.width = window.innerWidth;
    const h = canvas.height = window.innerHeight;

    ctx.translate(w/2, h/2);

    sun.src = sunSrc;
    mercury.src = mercSrc;
    venus.src = venusSrc;
    earth.src = earthSrc;


    Promise.all(planets)
      .then(() => window.requestAnimationFrame(() => draw(ctx)));
  }

  const draw = (ctx: CanvasRenderingContext2D) => {
    const w = window.innerWidth;
    const h = window.innerHeight;
    const now = new Date();
    const sec = now.getSeconds();
    const mils = now.getMilliseconds();

    ctx.fillRect(-(w/2), -(h/2), w, h);
    ctx.fillStyle = 'rgba(0, 0, 0, .5)';

    // draw sun =========================
    ctx.save();
      ctx.rotate((sec * Math.PI) / 30);
      ctx.rotate((mils * Math.PI) / 30000);
      ctx.drawImage(sun, -75, -75, 150, 150);
    ctx.restore();

    // draw orbits
    ctx.strokeStyle = 'rgba(255, 255, 255, .5)';

    ctx.beginPath();
      ctx.arc(0, 0, 100, 0, Math.PI * 2);
      ctx.moveTo(150, 0);
      ctx.arc(0, 0, 150, 0, Math.PI * 2);
    ctx.stroke();

    drawObject({
      object: venus,
      y: -150,
      size: 30,
      rotationSpeed: {
        outer: 2,
        inner: 1
      },
      ctx
    })
    window.requestAnimationFrame(() => draw(ctx));
  }

  const drawObject = ({object, y, size, rotationSpeed, ctx}: DrawPlanetProps) => {
    ctx.save();
      // Rotate around sun
      rotate(rotationSpeed.outer, ctx)

      ctx.translate(0, -y);

      // Draw object and rotate it around itself
      ctx.save();
        rotate(rotationSpeed.inner, ctx)
        ctx.drawImage(object, -size/2, -size/2, size, size)
      ctx.restore();

      // Draw shadow of object
      ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.arc(0, 0, size/2, 0, 180 * (Math.PI / 180), false)
      ctx.fill();
    ctx.restore();
  }

  const rotate = (speedUpBy: number, ctx: CanvasRenderingContext2D) => {
    const now = new Date();
    const sec = now.getSeconds();
    const mils = now.getMilliseconds();

    ctx.rotate(sec * Math.PI / 30 * speedUpBy)
    ctx.rotate(mils * Math.PI / 30000 * speedUpBy)
  }


  return { init };
}