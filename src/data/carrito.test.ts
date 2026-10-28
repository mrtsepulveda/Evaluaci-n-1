import { describe, expect, it } from 'vitest'
import type { Producto } from '../types'
import { agregarAlCarrito, quitarDelCarrito, totalCarrito } from './carrito'

const normal: Producto = { id: 'A001', nombre: 'Normal', descripcion: '', categoria: 'X', precio: 1000, imagen: '', stock: true }
const oferta: Producto = { id: 'B001', nombre: 'Oferta', descripcion: '', categoria: 'X', precio: 2000, imagen: '', stock: true, enOferta: true, precioOferta: 1500 }
const agotado: Producto = { ...normal, id: 'C001', stock: false }

describe('carrito', () => {
  it('agregar producto', () => {
    let items = agregarAlCarrito([], normal)
    expect(items).toEqual([{ producto: normal, cantidad: 1 }])
    items = agregarAlCarrito(items, normal)
    expect(items).toHaveLength(1)
    expect(items[0].cantidad).toBe(2)
  })

  it('sin stock no se agrega', () => {
    expect(agregarAlCarrito([], agotado)).toEqual([])
  })

  it('quitar producto', () => {
    const items = [{ producto: normal, cantidad: 2 }]
    const uno = quitarDelCarrito(items, 'A001')
    expect(uno[0].cantidad).toBe(1)
    expect(quitarDelCarrito(uno, 'A001')).toEqual([])
  })

  it('total con oferta', () => {
    const items = [
      { producto: normal, cantidad: 2 },
      { producto: oferta, cantidad: 1 },
    ]
    expect(totalCarrito(items)).toBe(2 * 1000 + 1500)
  })
})
