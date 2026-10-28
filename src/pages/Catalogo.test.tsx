import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter } from 'react-router-dom'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import { reiniciarProductos } from '../data/productosDB'
import Catalogo from './Catalogo'

const mostrar = (props: Partial<Parameters<typeof Catalogo>[0]> = {}) =>
  render(
    <MemoryRouter>
      <Catalogo carrito={[]} onAgregar={vi.fn()} onQuitar={vi.fn()} onVaciar={vi.fn()} onPagar={vi.fn()} {...props} />
    </MemoryRouter>,
  )

describe('Catalogo', () => {
  beforeEach(() => reiniciarProductos())

  it('muestra los 85 productos', () => {
    mostrar()
    expect(screen.getAllByTestId('tarjeta-producto')).toHaveLength(85)
    expect(screen.getByText('Mostrando 85 de 85 productos')).toBeInTheDocument()
  })

  it('filtro por texto', async () => {
    mostrar()
    await userEvent.type(screen.getByLabelText('Buscar producto'), 'cemento')
    expect(screen.getAllByTestId('tarjeta-producto')).toHaveLength(2)
    expect(screen.getByText('Cemento Polpaico gris 25 kg')).toBeInTheDocument()
    expect(screen.getByText('Cemento Melón blanco 25 kg')).toBeInTheDocument()
  })

  it('filtro por categoría', async () => {
    mostrar()
    await userEvent.selectOptions(screen.getByLabelText('Filtrar por categoría'), 'Jardín')
    expect(screen.getAllByTestId('tarjeta-producto')).toHaveLength(5)
  })

  it('filtro de ofertas', async () => {
    mostrar()
    await userEvent.click(screen.getByLabelText('Solo ofertas'))
    expect(screen.getAllByTestId('tarjeta-producto')).toHaveLength(15)
  })

  it('sin resultados', async () => {
    mostrar()
    await userEvent.type(screen.getByLabelText('Buscar producto'), 'zzzz')
    expect(screen.queryByTestId('tarjeta-producto')).not.toBeInTheDocument()
    expect(screen.getByText(/No se encontraron productos/)).toBeInTheDocument()
  })

  it('botón Agregar', async () => {
    const onAgregar = vi.fn()
    mostrar({ onAgregar })
    await userEvent.type(screen.getByLabelText('Buscar producto'), 'Ripio')
    await userEvent.click(screen.getByRole('button', { name: 'Agregar' }))
    expect(onAgregar).toHaveBeenCalledTimes(1)
    expect(onAgregar.mock.calls[0][0].id).toBe('MC006')
  })
})
