import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { describe, expect, it } from 'vitest'
import type { Producto } from '../../types'
import GrillaProductos from './GrillaProductos'

const crear = (id: string, nombre: string): Producto => ({ id, nombre, descripcion: '', categoria: 'Cat', precio: 1000, imagen: '/img/logo_maestros.jpg', stock: true })

describe('GrillaProductos', () => {
  it('muestra todos los productos', () => {
    const lista = [crear('A001', 'Martillo'), crear('A002', 'Alicate'), crear('A003', 'Serrucho')]
    render(
      <MemoryRouter>
        <GrillaProductos productos={lista} onAgregar={() => {}} />
      </MemoryRouter>,
    )
    expect(screen.getAllByTestId('tarjeta-producto')).toHaveLength(3)
    expect(screen.getByText('Martillo')).toBeInTheDocument()
    expect(screen.getByText('Alicate')).toBeInTheDocument()
    expect(screen.getByText('Serrucho')).toBeInTheDocument()
  })

  it('mensaje si no hay productos', () => {
    render(
      <MemoryRouter>
        <GrillaProductos productos={[]} onAgregar={() => {}} />
      </MemoryRouter>,
    )
    expect(screen.getByRole('status')).toHaveTextContent('No se encontraron productos')
    expect(screen.queryByTestId('tarjeta-producto')).not.toBeInTheDocument()
  })
})
