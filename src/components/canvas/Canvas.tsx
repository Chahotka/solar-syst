import React, { useEffect, useRef } from 'react'
import cl from '../../styles/canvas.module.css'
import { useCanvas } from '../hooks/useCanvas'


const Canvas: React.FC = () => {
  const canvas = useRef<HTMLCanvasElement | null>(null)
  const { init } = useCanvas()

  useEffect(() => {
    const ctx = canvas.current?.getContext('2d')
    
    if (ctx && canvas.current) {
      canvas.current.width = window.innerWidth
      canvas.current.height = window.innerHeight
      init(ctx)
    }
  }, [])

  return (
    <canvas
      ref={canvas}
      className={cl.canvas}
    ></canvas>
  )
}

export default Canvas