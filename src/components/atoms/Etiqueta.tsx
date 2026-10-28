interface EtiquetaProps {
  texto: string
  color?: 'success' | 'danger' | 'warning' | 'secondary' | 'primary'
}

function Etiqueta({ texto, color = 'secondary' }: EtiquetaProps) {
  const texto_oscuro = color === 'warning' ? 'text-dark' : ''
  return <span className={`badge bg-${color} ${texto_oscuro}`}>{texto}</span>
}

export default Etiqueta
