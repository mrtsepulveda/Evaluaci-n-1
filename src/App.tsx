import { useState } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import { agregarAlCarrito, guardarCarrito, leerCarrito, quitarDelCarrito } from './data/carrito'
import { cerrarSesionGuardada, crearSesion, leerSesion } from './data/sesion'
import PlantillaAdmin from './templates/PlantillaAdmin'
import PlantillaPrincipal from './templates/PlantillaPrincipal'
import RutaAdmin from './templates/RutaAdmin'
import Admin from './pages/Admin'
import AdminProductos from './pages/AdminProductos'
import AdminUsuarios from './pages/AdminUsuarios'
import Catalogo from './pages/Catalogo'
import Contacto from './pages/Contacto'
import DetalleProducto from './pages/DetalleProducto'
import Inicio from './pages/Inicio'
import Login from './pages/Login'
import NoEncontrada from './pages/NoEncontrada'
import Nosotros from './pages/Nosotros'
import NovedadDetalle from './pages/NovedadDetalle'
import Novedades from './pages/Novedades'
import Perfil from './pages/Perfil'
import Registro from './pages/Registro'
import type { ItemCarrito, Producto, Sesion } from './types'

function App() {
  const [sesion, setSesion] = useState<Sesion | null>(leerSesion)
  const [carrito, setCarrito] = useState<ItemCarrito[]>(leerCarrito)
  const [aviso, setAviso] = useState('')

  const actualizarCarrito = (nuevo: ItemCarrito[]) => {
    setCarrito(nuevo)
    guardarCarrito(nuevo)
  }

  const agregar = (producto: Producto) => {
    actualizarCarrito(agregarAlCarrito(carrito, producto))
    setAviso(`Se agregó "${producto.nombre}" a tu selección.`)
  }

  const quitar = (id: string) => actualizarCarrito(quitarDelCarrito(carrito, id))

  const vaciar = () => actualizarCarrito([])

  const pagar = () => {
    if (carrito.length === 0) return
    if (window.confirm('¿Deseas confirmar y procesar el pago de tu compra en Ferretería Los Maestros?')) {
      actualizarCarrito([])
      setAviso('¡Compra realizada con éxito! Muchas gracias por preferirnos. Tu pedido está siendo preparado.')
    }
  }

  const iniciarSesion = (correo: string) => {
    setSesion(crearSesion(correo))
    setAviso('Inicio de sesión exitoso. Bienvenido.')
  }

  const cerrarSesion = () => {
    cerrarSesionGuardada()
    setSesion(null)
    setAviso('Has cerrado sesión.')
  }

  return (
    <Routes>
      <Route element={<PlantillaPrincipal sesion={sesion} aviso={aviso} onCerrarAviso={() => setAviso('')} />}>
        <Route path="/" element={<Inicio onAgregar={agregar} />} />
        <Route path="/nosotros" element={<Nosotros />} />
        <Route path="/novedades" element={<Novedades />} />
        <Route path="/novedades/:id" element={<NovedadDetalle />} />
        <Route path="/catalogo" element={<Catalogo carrito={carrito} onAgregar={agregar} onQuitar={quitar} onVaciar={vaciar} onPagar={pagar} />} />
        <Route path="/productos/:id" element={<DetalleProducto onAgregar={agregar} />} />
        <Route path="/contacto" element={<Contacto />} />
        <Route path="/login" element={<Login onIniciarSesion={iniciarSesion} />} />
        <Route path="/registro" element={<Registro />} />
        <Route path="/perfil" element={<Perfil sesion={sesion} onCerrarSesion={cerrarSesion} />} />
        <Route path="*" element={<NoEncontrada />} />
      </Route>

      <Route element={<RutaAdmin sesion={sesion} />}>
        <Route element={<PlantillaAdmin />}>
          <Route path="/admin" element={<Admin />} />
          <Route path="/admin/productos" element={<AdminProductos />} />
          <Route path="/admin/usuarios" element={<AdminUsuarios />} />
        </Route>
      </Route>

      {/* rutas antiguas */}
      <Route path="/index.html" element={<Navigate to="/" replace />} />
    </Routes>
  )
}

export default App
