import { useState } from 'react'
import { Link } from 'react-router-dom'
import ItemNavegacion from '../molecules/ItemNavegacion'

export interface EnlaceMenu {
  a: string
  texto: string
  fin?: boolean
}

interface BarraNavegacionProps {
  titulo: string
  enlaceLogo: string
  enlaces: EnlaceMenu[]
  admin?: boolean
}

function BarraNavegacion({ titulo, enlaceLogo, enlaces, admin = false }: BarraNavegacionProps) {
  const [abierto, setAbierto] = useState(false)

  return (
    <nav className={`navbar navbar-expand-lg navbar-dark ${admin ? 'barra-admin' : 'barra-principal'}`} aria-label="Navegación principal">
      <div className="container">
        <Link to={enlaceLogo} className="navbar-brand d-flex align-items-center gap-2">
          <img src="/img/logo_maestros.jpg" alt="Logo Ferretería Los Maestros" width={48} height={48} className="rounded" style={{ objectFit: 'cover' }} />
          <span className="fw-bold">{titulo}</span>
        </Link>
        <button
          type="button"
          className="navbar-toggler"
          aria-controls="menu-principal"
          aria-expanded={abierto}
          aria-label="Mostrar u ocultar el menú"
          onClick={() => setAbierto(!abierto)}
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div id="menu-principal" className={`collapse navbar-collapse ${abierto ? 'show' : ''}`}>
          <ul className="navbar-nav ms-auto">
            {enlaces.map((enlace) => (
              <ItemNavegacion key={enlace.a} a={enlace.a} texto={enlace.texto} fin={enlace.fin} onClick={() => setAbierto(false)} />
            ))}
          </ul>
        </div>
      </div>
    </nav>
  )
}

export default BarraNavegacion
