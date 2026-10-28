import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter } from 'react-router-dom'
import { describe, expect, it, vi } from 'vitest'
import type { Producto } from '../../types'
import TarjetaProducto from './TarjetaProducto'

const producto: Producto = {
  id: 'HE001',
  nombre: 'Taladro percutor',
  descripcion: 'Taladro',
  categoria: 'Herramientas',
  precio: 79990,
  imagen: '/img/logo_maestros.jpg',
  stock: true,
}

const mostrar = (p: Producto, onAgregar = vi.fn()) =>
  render(
    <MemoryRouter>
      <TarjetaProducto producto={p} onAgregar={onAgregar} />
    </MemoryRouter>,
  )

describe('TarjetaProducto', () => {
  it('muestra los datos', () => {
    mostrar(producto)
    expect(screen.getByRole('heading', { name: 'Taladro percutor' })).toBeInTheDocument()
    expect(screen.getByText('Herramientas')).toBeInTheDocument()
    expect(screen.getByText('$79.990')).toBeInTheDocument()
  })

  it('enlace al detalle', () => {
    mostrar(producto)
    expect(screen.getByRole('link', { name: 'Ver detalle' })).toHaveAttribute('href', '/productos/HE001')
  })

  it('botón Agregar', async () => {
    const onAgregar = vi.fn()
    mostrar(producto, onAgregar)
    await userEvent.click(screen.getByRole('button', { name: 'Agregar' }))
    expect(onAgregar).toHaveBeenCalledWith(producto)
  })

  it('precio de oferta', () => {
    mostrar({ ...producto, enOferta: true, precioOferta: 59990 })
    expect(screen.getByText('$79.990').tagName).toBe('DEL')
    expect(screen.getByText('$59.990')).toBeInTheDocument()
  })

  it('sin stock', () => {
    mostrar({ ...producto, stock: false })
    expect(screen.getByText('Sin stock')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'No disponible' })).toBeDisabled()
    expect(screen.queryByRole('button', { name: 'Agregar' })).not.toBeInTheDocument()
  })
})
