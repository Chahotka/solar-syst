import React, { useEffect, useRef } from 'react'
import cl from '../../styles/canvas.module.css'
import { useCanvas } from '../hooks/useCanvas'


const Canvas: React.FC = () => {
  const canvas = useRef<HTMLCanvasElement | null>(null)
  const { init } = useCanvas()

  useEffect(() => {
    init(canvas.current)
  }, [])

  return (
    <canvas
      ref={canvas}
      className={cl.canvas}
    ></canvas>
  )
}

export default Canvas