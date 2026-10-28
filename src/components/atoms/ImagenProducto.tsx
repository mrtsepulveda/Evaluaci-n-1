import { useState } from 'react'

interface ImagenProductoProps {
  src: string
  alt: string
  alto?: number
}

const IMAGEN_RESPALDO = '/img/logo_maestros.jpg'

function ImagenProducto({ src, alt, alto = 120 }: ImagenProductoProps) {
  const [fallo, setFallo] = useState(false)
  return (
    <img
      src={fallo ? IMAGEN_RESPALDO : src}
      alt={alt}
      className="w-100 rounded"
      style={{ height: alto, objectFit: 'contain', backgroundColor: '#fff' }}
      onError={() => setFallo(true)}
    />
  )
}

export default ImagenProducto
