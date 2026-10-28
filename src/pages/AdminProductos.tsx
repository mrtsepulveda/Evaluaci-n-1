import { useState } from 'react'
import Aviso from '../components/molecules/Aviso'
import BuscadorProductos from '../components/molecules/BuscadorProductos'
import FormularioProducto from '../components/organisms/FormularioProducto'
import TablaProductos from '../components/organisms/TablaProductos'
import {
  actualizarProducto,
  crearProducto,
  eliminarProducto,
  filtrarProductos,
  obtenerCategorias,
  obtenerProductos,
} from '../data/productosDB'
import type { FiltrosProducto, Producto } from '../types'

function AdminProductos() {
  const [productos, setProductos] = useState<Producto[]>(obtenerProductos)
  const [filtros, setFiltros] = useState<FiltrosProducto>({ texto: '', categoria: '', soloOfertas: false })
  const [productoEditar, setProductoEditar] = useState<Producto | null>(null)
  const [aviso, setAviso] = useState('')
  const [errorGeneral, setErrorGeneral] = useState('')

  const recargar = () => setProductos(obtenerProductos())

  const guardar = (producto: Producto, esEdicion: boolean) => {
    try {
      if (esEdicion) {
        actualizarProducto(producto.id, producto)
        setAviso(`Producto "${producto.nombre}" actualizado exitosamente.`)
      } else {
        crearProducto(producto)
        setAviso(`Producto "${producto.nombre}" agregado al catálogo exitosamente.`)
      }
      setErrorGeneral('')
      setProductoEditar(null)
      recargar()
    } catch (error) {
      setErrorGeneral(error instanceof Error ? error.message : 'No se pudo guardar el producto.')
    }
  }

  const eliminar = (producto: Producto) => {
    if (!window.confirm(`¿Seguro que deseas eliminar "${producto.nombre}"?`)) return
    eliminarProducto(producto.id)
    if (productoEditar?.id === producto.id) setProductoEditar(null)
    setAviso(`Producto "${producto.nombre}" eliminado.`)
    recargar()
  }

  const cambiarStock = (producto: Producto) => {
    actualizarProducto(producto.id, { stock: !producto.stock })
    setAviso(`El stock de "${producto.nombre}" ha sido actualizado.`)
    recargar()
  }

  const editar = (producto: Producto) => {
    setErrorGeneral('')
    setProductoEditar(producto)
  }

  const cancelar = () => {
    setErrorGeneral('')
    setProductoEditar(null)
  }

  const visibles = filtrarProductos(productos, filtros)

  return (
    <>
      <h2 className="mb-3">Administración de productos</h2>
      {aviso !== '' && <Aviso mensaje={aviso} onCerrar={() => setAviso('')} />}
      <div className="row g-4">
        <section className="col-12 col-lg-8">
          <div className="card shadow-sm">
            <div className="card-body">
              <h3 className="h5">Catálogo actual ({visibles.length})</h3>
              <BuscadorProductos filtros={filtros} categorias={obtenerCategorias()} onCambiar={setFiltros} />
              <TablaProductos productos={visibles} onEditar={editar} onEliminar={eliminar} onCambiarStock={cambiarStock} />
            </div>
          </div>
        </section>
        <section className="col-12 col-lg-4">
          <div className="card shadow-sm">
            <div className="card-body">
              <h3 className="h5">{productoEditar ? 'Editar producto' : 'Nuevo producto'}</h3>
              <FormularioProducto
                key={productoEditar?.id ?? 'nuevo'}
                productoEditar={productoEditar}
                onGuardar={guardar}
                onCancelar={cancelar}
                errorGeneral={errorGeneral}
              />
            </div>
          </div>
        </section>
      </div>
    </>
  )
}

export default AdminProductos
