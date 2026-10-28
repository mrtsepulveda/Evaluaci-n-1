// productos con CRUD, guardados en localStorage
import type { FiltrosProducto, Producto } from '../types'
import { guardarAlmacenado, leerAlmacenado } from './almacenamiento'
import { productosIniciales } from './productosIniciales'

export const CLAVE_PRODUCTOS = 'catalogoFerreteria'

let productos: Producto[] = cargarInicial()

function cargarInicial(): Producto[] {
  const guardados = leerAlmacenado<Producto[]>(CLAVE_PRODUCTOS)
  if (!guardados) return productosIniciales.map((p) => ({ ...p }))

  // cambia el logo genérico guardado por la foto nueva
  const inicialesPorId = new Map(productosIniciales.map((p) => [p.id, p]))
  return guardados.map((producto) => {
    const inicial = inicialesPorId.get(producto.id)
    const imagenAntigua = !producto.imagen || producto.imagen.endsWith('/logo_maestros.jpg')
    return imagenAntigua && inicial ? { ...producto, imagen: inicial.imagen } : producto
  })
}

function persistir(): void {
  guardarAlmacenado(CLAVE_PRODUCTOS, productos)
}

// READ
export function obtenerProductos(): Producto[] {
  return productos.map((p) => ({ ...p }))
}

export function obtenerProductoPorId(id: string): Producto | undefined {
  const encontrado = productos.find((p) => p.id === id)
  return encontrado ? { ...encontrado } : undefined
}

export function obtenerCategorias(): string[] {
  return [...new Set(productos.map((p) => p.categoria))].sort()
}

export function filtrarProductos(lista: Producto[], filtros: FiltrosProducto): Producto[] {
  const texto = filtros.texto.trim().toLowerCase()
  return lista.filter((p) => {
    const coincideTexto =
      texto === '' ||
      p.nombre.toLowerCase().includes(texto) ||
      p.id.toLowerCase().includes(texto) ||
      p.descripcion.toLowerCase().includes(texto)
    const coincideCategoria = filtros.categoria === '' || p.categoria === filtros.categoria
    const coincideOferta = !filtros.soloOfertas || p.enOferta === true
    return coincideTexto && coincideCategoria && coincideOferta
  })
}

// CREATE
export function crearProducto(nuevo: Producto): Producto {
  if (productos.some((p) => p.id === nuevo.id)) {
    throw new Error(`Ya existe un producto con el ID ${nuevo.id}`)
  }
  productos = [...productos, { ...nuevo }]
  persistir()
  return { ...nuevo }
}

// UPDATE
export function actualizarProducto(id: string, cambios: Partial<Producto>): Producto {
  const indice = productos.findIndex((p) => p.id === id)
  if (indice === -1) {
    throw new Error(`No existe un producto con el ID ${id}`)
  }
  const actualizado: Producto = { ...productos[indice], ...cambios, id }
  productos = productos.map((p, i) => (i === indice ? actualizado : p))
  persistir()
  return { ...actualizado }
}

// DELETE
export function eliminarProducto(id: string): boolean {
  const existe = productos.some((p) => p.id === id)
  if (!existe) return false
  productos = productos.filter((p) => p.id !== id)
  persistir()
  return true
}

export function reiniciarProductos(): void {
  productos = productosIniciales.map((p) => ({ ...p }))
  persistir()
}
