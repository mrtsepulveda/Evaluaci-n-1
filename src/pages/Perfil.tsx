import { Navigate } from 'react-router-dom'
import Boton from '../components/atoms/Boton'
import type { Sesion } from '../types'

interface PerfilProps {
  sesion: Sesion | null
  onCerrarSesion: () => void
}

function Perfil({ sesion, onCerrarSesion }: PerfilProps) {
  if (!sesion) return <Navigate to="/login" replace />

  return (
    <section className="card shadow-sm mx-auto text-center" style={{ maxWidth: 600 }}>
      <div className="card-body p-4">
        <h2 className="titulo-producto">Perfil de usuario</h2>
        <p>
          <strong>Correo electrónico:</strong> {sesion.correo}
        </p>
        <p>
          <strong>Rol en el sistema:</strong> {sesion.rol}
        </p>
        <hr />
        <Boton variante="danger" bloque onClick={onCerrarSesion}>
          Cerrar sesión
        </Boton>
      </div>
    </section>
  )
}

export default Perfil
