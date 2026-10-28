import { Outlet } from 'react-router-dom'
import type { Sesion } from '../types'
import Aviso from '../components/molecules/Aviso'
import BarraNavegacion, { type EnlaceMenu } from '../components/organisms/BarraNavegacion'
import PiePagina from '../components/organisms/PiePagina'

interface PlantillaPrincipalProps {
  sesion: Sesion | null
  aviso: string
  onCerrarAviso: () => void
}

function PlantillaPrincipal({ sesion, aviso, onCerrarAviso }: PlantillaPrincipalProps) {
  const enlaces: EnlaceMenu[] = [
    { a: '/', texto: 'Inicio', fin: true },
    { a: '/nosotros', texto: 'Nosotros' },
    { a: '/novedades', texto: 'Novedades' },
    { a: '/catalogo', texto: 'Catálogo' },
    { a: '/contacto', texto: 'Contacto' },
    sesion ? { a: '/perfil', texto: `Mi Perfil (${sesion.rol})` } : { a: '/login', texto: 'Iniciar sesión' },
  ]
  if (sesion?.rol === 'Administrador') {
    enlaces.push({ a: '/admin', texto: 'Admin' })
  }

  return (
    <div className="d-flex flex-column min-vh-100">
      <BarraNavegacion titulo="Ferretería Los Maestros" enlaceLogo="/" enlaces={enlaces} />
      <main className="container flex-grow-1 py-4">
        {aviso !== '' && <Aviso mensaje={aviso} onCerrar={onCerrarAviso} />}
        <Outlet />
      </main>
      <PiePagina />
    </div>
  )
}

export default PlantillaPrincipal
