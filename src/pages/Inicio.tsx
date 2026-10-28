import { useState } from 'react'
import BannerPrincipal from '../components/organisms/BannerPrincipal'
import GrillaProductos from '../components/organisms/GrillaProductos'
import { idsDestacados } from '../data/productosIniciales'
import { obtenerProductoPorId } from '../data/productosDB'
import type { Producto } from '../types'

interface InicioProps {
  onAgregar: (producto: Producto) => void
}

function Inicio({ onAgregar }: InicioProps) {
  const [destacados] = useState<Producto[]>(() =>
    idsDestacados.map((id) => obtenerProductoPorId(id)).filter((p): p is Producto => p !== undefined),
  )

  return (
    <>
      <BannerPrincipal />
      <h2 className="text-center my-4">Productos destacados</h2>
      <GrillaProductos productos={destacados} onAgregar={onAgregar} />
    </>
  )
}

export default Inicio
