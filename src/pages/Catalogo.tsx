import { useState } from 'react'
import BuscadorProductos from '../components/molecules/BuscadorProductos'
import GrillaProductos from '../components/organisms/GrillaProductos'
import PanelCarrito from '../components/organisms/PanelCarrito'
import { filtrarProductos, obtenerCategorias, obtenerProductos } from '../data/productosDB'
import type { FiltrosProducto, ItemCarrito, Producto } from '../types'

interface CatalogoProps {
  carrito: ItemCarrito[]
  onAgregar: (producto: Producto) => void
  onQuitar: (id: string) => void
  onVaciar: () => void
  onPagar: () => void
}

function Catalogo({ carrito, onAgregar, onQuitar, onVaciar, onPagar }: CatalogoProps) {
  const [productos] = useState<Producto[]>(obtenerProductos)
  const [categorias] = useState<string[]>(obtenerCategorias)
  const [filtros, setFiltros] = useState<FiltrosProducto>({ texto: '', categoria: '', soloOfertas: false })

  const visibles = filtrarProductos(productos, filtros)

  return (
    <>
      <h2 className="text-center mb-4">Catálogo completo</h2>
      <BuscadorProductos filtros={filtros} categorias={categorias} onCambiar={setFiltros} />
      <p className="text-muted" aria-live="polite">
        Mostrando {visibles.length} de {productos.length} productos
      </p>
      <GrillaProductos productos={visibles} onAgregar={onAgregar} />

      <hr className="my-5" />
      <h2 className="text-center mb-3">Mi selección (carrito)</h2>
      <PanelCarrito items={carrito} onQuitar={onQuitar} onVaciar={onVaciar} onPagar={onPagar} />
    </>
  )
}

export default Catalogo
