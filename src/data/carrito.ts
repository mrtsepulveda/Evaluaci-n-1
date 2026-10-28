import type { ItemCarrito, Producto } from '../types'
import { borrarAlmacenado, guardarAlmacenado, leerAlmacenado } from './almacenamiento'

export const CLAVE_CARRITO = 'carritoFerreteria'

export function agregarAlCarrito(items: ItemCarrito[], producto: Producto): ItemCarrito[] {
  if (!producto.stock) return items
  const existe = items.some((i) => i.producto.id === producto.id)
  if (existe) {
    return items.map((i) => (i.producto.id === producto.id ? { ...i, cantidad: i.cantidad + 1 } : i))
  }
  return [...items, { producto, cantidad: 1 }]
}

export function quitarDelCarrito(items: ItemCarrito[], idProducto: string): ItemCarrito[] {
  return items.flatMap((i) => {
    if (i.producto.id !== idProducto) return [i]
    return i.cantidad > 1 ? [{ ...i, cantidad: i.cantidad - 1 }] : []
  })
}

export function totalCarrito(items: ItemCarrito[]): number {
  return items.reduce((suma, i) => {
    const unitario = i.producto.enOferta && i.producto.precioOferta !== undefined ? i.producto.precioOferta : i.producto.precio
    return suma + unitario * i.cantidad
  }, 0)
}

export function leerCarrito(): ItemCarrito[] {
  return leerAlmacenado<ItemCarrito[]>(CLAVE_CARRITO) ?? []
}

export function guardarCarrito(items: ItemCarrito[]): void {
  if (items.length === 0) borrarAlmacenado(CLAVE_CARRITO)
  else guardarAlmacenado(CLAVE_CARRITO, items)
}
