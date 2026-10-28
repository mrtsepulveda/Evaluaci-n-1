import type { ButtonHTMLAttributes } from 'react'

interface BotonProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'className'> {
  variante?: 'primary' | 'warning' | 'success' | 'danger' | 'secondary' | 'outline-secondary' | 'outline-danger' | 'outline-primary'
  pequeno?: boolean
  bloque?: boolean
}

function Boton({ variante = 'warning', pequeno = false, bloque = false, type = 'button', children, ...resto }: BotonProps) {
  const clases = ['btn', `btn-${variante}`, pequeno ? 'btn-sm' : '', bloque ? 'w-100' : ''].filter(Boolean).join(' ')
  return (
    <button type={type} className={clases} {...resto}>
      {children}
    </button>
  )
}

export default Boton
