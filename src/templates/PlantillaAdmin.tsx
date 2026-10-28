import { Outlet } from 'react-router-dom'
import BarraNavegacion from '../components/organisms/BarraNavegacion'
import PiePagina from '../components/organisms/PiePagina'

function PlantillaAdmin() {
  return (
    <div className="d-flex flex-column min-vh-100">
      <BarraNavegacion
        titulo="Panel de Administración"
        enlaceLogo="/admin"
        admin
        enlaces={[
          { a: '/admin', texto: 'Inicio Admin', fin: true },
          { a: '/admin/productos', texto: 'Mantenedor Productos' },
          { a: '/admin/usuarios', texto: 'Mantenedor Usuarios' },
          { a: '/', texto: 'Salir al sitio público', fin: true },
        ]}
      />
      <main className="container flex-grow-1 py-4">
        <Outlet />
      </main>
      <PiePagina />
    </div>
  )
}

export default PlantillaAdmin
