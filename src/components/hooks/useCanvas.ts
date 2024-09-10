import { useEffect, useState } from "react";
import sunSrc from '../../images/sun.png';
import mercSrc from '../../images/mercury.png'
import earthSrc from '../../images/earth.png';
import venusSrc from '../../images/venus.png';

type CanvasHook = () => {
  init: (ctx: CanvasRenderingContext2D) => void
}

export const useCanvas: CanvasHook = () => {
  const sun = new Image();
  const mercury = new Image();
  const venus = new Image()

  const init = (ctx: CanvasRenderingContext2D) => {
    sun.src = sunSrc;
    mercury.src = mercSrc;
    venus.src = venusSrc;

    const planets = [sun, mercury, venus]

    const w = window.innerWidth;
    const h = window.innerHeight;

    Promise.all(planets)
      .then(() => draw(ctx, w, h));
  }

  const draw = (ctx: CanvasRenderingContext2D, w: number, h: number) => {
    ctx.fillRect(0, 0, window.innerWidth, window.innerHeight);

    ctx.save()
      ctx.translate(w/2, h/2);
      ctx.drawImage(sun, -75, -75, 150, 150)

      ctx.strokeStyle = 'rgba(255, 255, 255, .3)'

      // draw orbit of sun sattelites
      ctx.beginPath()
        ctx.arc(0, 0, 100, 0, Math.PI * 180)
        ctx.moveTo(150, 0)
        ctx.arc(0, 0, 150, 0, Math.PI * 180)
      ctx.stroke()

      // draw mercury
      drawPlanet(mercury, 0, 100, 20, 20, ctx)
      


    ctx.restore()

    window.requestAnimationFrame(() => draw(ctx, w, h));
  }

  const drawPlanet = (planet: CanvasImageSource, x: number, y: number, w: number, h: number, ctx: CanvasRenderingContext2D) => {
    ctx.save()
      ctx.translate(x, y)
      ctx.drawImage(planet, -(w/2), -(h/2), w, h)
    ctx.restore()
  }

  return { init }
}