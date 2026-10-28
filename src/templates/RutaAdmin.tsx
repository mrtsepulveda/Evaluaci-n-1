import { Navigate, Outlet } from 'react-router-dom'
import type { Sesion } from '../types'

interface RutaAdminProps {
  sesion: Sesion | null
}

function RutaAdmin({ sesion }: RutaAdminProps) {
  if (!sesion || sesion.rol !== 'Administrador') {
    return <Navigate to="/login" replace />
  }
  return <Outlet />
}

export default RutaAdmin
