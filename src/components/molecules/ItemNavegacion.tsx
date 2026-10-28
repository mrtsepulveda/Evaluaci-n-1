import { NavLink } from 'react-router-dom'

interface ItemNavegacionProps {
  a: string
  texto: string
  fin?: boolean
  onClick?: () => void
}

function ItemNavegacion({ a, texto, fin = false, onClick }: ItemNavegacionProps) {
  return (
    <li className="nav-item">
      <NavLink to={a} end={fin} onClick={onClick} className={({ isActive }) => `nav-link fw-bold ${isActive ? 'active enlace-activo' : ''}`}>
        {texto}
      </NavLink>
    </li>
  )
}

export default ItemNavegacion
