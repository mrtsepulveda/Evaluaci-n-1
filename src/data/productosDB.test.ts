import { beforeEach, describe, expect, it } from 'vitest'
import type { Producto } from '../types'
import {
  actualizarProducto,
  crearProducto,
  eliminarProducto,
  filtrarProductos,
  obtenerCategorias,
  obtenerProductoPorId,
  obtenerProductos,
  reiniciarProductos,
} from './productosDB'

const nuevo: Producto = {
  id: 'ZZ001',
  nombre: 'Producto de prueba',
  descripcion: 'Descripción de prueba',
  categoria: 'Pruebas',
  precio: 1000,
  imagen: '/img/logo_maestros.jpg',
  stock: true,
}

const sinFiltros = { texto: '', categoria: '', soloOfertas: false }

describe('productosDB CRUD', () => {
  beforeEach(() => reiniciarProductos())

  it('READ lista de productos', () => {
    expect(obtenerProductos()).toHaveLength(85)
  })

  it('READ producto por ID', () => {
    expect(obtenerProductoPorId('HE001')?.nombre).toBe('Taladro percutor 650W 13mm')
    expect(obtenerProductoPorId('NO000')).toBeUndefined()
  })

  it('CREATE producto', () => {
    crearProducto(nuevo)
    expect(obtenerProductos()).toHaveLength(86)
    expect(obtenerProductoPorId('ZZ001')).toEqual(nuevo)
    expect(JSON.parse(localStorage.getItem('catalogoFerreteria') ?? '[]')).toHaveLength(86)
  })

  it('CREATE ID repetido', () => {
    expect(() => crearProducto({ ...nuevo, id: 'HE001' })).toThrow('Ya existe un producto con el ID HE001')
    expect(obtenerProductos()).toHaveLength(85)
  })

  it('UPDATE producto', () => {
    const actualizado = actualizarProducto('HE001', { precio: 1234, stock: false })
    expect(actualizado.precio).toBe(1234)
    expect(obtenerProductoPorId('HE001')?.stock).toBe(false)
    expect(obtenerProductoPorId('HE001')?.nombre).toBe('Taladro percutor 650W 13mm')
  })

  it('UPDATE producto inexistente', () => {
    expect(() => actualizarProducto('NO000', { precio: 1 })).toThrow('No existe un producto con el ID NO000')
  })

  it('DELETE producto', () => {
    expect(eliminarProducto('HE001')).toBe(true)
    expect(obtenerProductoPorId('HE001')).toBeUndefined()
    expect(obtenerProductos()).toHaveLength(84)
    expect(eliminarProducto('HE001')).toBe(false)
  })
})

describe('productosDB filtros', () => {
  beforeEach(() => reiniciarProductos())

  it('filtro por texto', () => {
    const resultado = filtrarProductos(obtenerProductos(), { ...sinFiltros, texto: 'CEMENTO' })
    expect(resultado.map((p) => p.id)).toEqual(['MC001', 'MC002'])
  })

  it('filtro por categoría', () => {
    const resultado = filtrarProductos(obtenerProductos(), { ...sinFiltros, categoria: 'Jardín' })
    expect(resultado).toHaveLength(5)
    expect(resultado.every((p) => p.categoria === 'Jardín')).toBe(true)
  })

  it('filtro de ofertas', () => {
    const resultado = filtrarProductos(obtenerProductos(), { ...sinFiltros, soloOfertas: true })
    expect(resultado.length).toBeGreaterThan(0)
    expect(resultado.every((p) => p.enOferta === true)).toBe(true)
  })

  it('filtros combinados', () => {
    expect(filtrarProductos(obtenerProductos(), { texto: 'pintura', categoria: 'Pinturas', soloOfertas: true }).map((p) => p.id)).toEqual(['PT002'])
    expect(filtrarProductos(obtenerProductos(), { ...sinFiltros, texto: 'xyz-inexistente' })).toEqual([])
  })

  it('categorías sin repetir', () => {
    const categorias = obtenerCategorias()
    expect(categorias).toContain('Herramientas')
    expect(new Set(categorias).size).toBe(categorias.length)
  })
})
