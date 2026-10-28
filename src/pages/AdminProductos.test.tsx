import { render, screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter } from 'react-router-dom'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { eliminarProducto, obtenerProductoPorId, obtenerProductos, reiniciarProductos } from '../data/productosDB'
import AdminProductos from './AdminProductos'

const mostrar = () =>
  render(
    <MemoryRouter>
      <AdminProductos />
    </MemoryRouter>,
  )

describe('AdminProductos', () => {
  // se dejan solo 3 productos para que las pruebas sean rápidas
  beforeEach(() => {
    reiniciarProductos()
    obtenerProductos()
      .filter((p) => !['MC001', 'MC006', 'HE001'].includes(p.id))
      .forEach((p) => eliminarProducto(p.id))
  })
  afterEach(() => vi.restoreAllMocks())

  it('READ lista de productos', () => {
    mostrar()
    // 3 productos + el encabezado
    expect(screen.getAllByRole('row')).toHaveLength(4)
  })

  it('READ buscador', async () => {
    mostrar()
    await userEvent.type(screen.getByLabelText('Buscar producto'), 'Ripio')
    expect(screen.getAllByRole('row')).toHaveLength(2)
    expect(screen.getByText('MC006')).toBeInTheDocument()
  })

  it('CREATE producto', async () => {
    mostrar()
    await userEvent.type(screen.getByLabelText(/ID del producto/), 'ZZ999')
    await userEvent.type(screen.getByLabelText('Nombre'), 'Producto de prueba')
    await userEvent.type(screen.getByLabelText('Categoría'), 'Pruebas')
    await userEvent.type(screen.getByLabelText('Descripción'), 'Descripción de prueba')
    await userEvent.type(screen.getByLabelText('Precio'), '3500')
    await userEvent.click(screen.getByRole('button', { name: 'Guardar en catálogo' }))
    expect(screen.getByText('ZZ999')).toBeInTheDocument()
    expect(screen.getByText(/agregado al catálogo exitosamente/)).toBeInTheDocument()
    expect(obtenerProductos()).toHaveLength(4)
    expect(obtenerProductoPorId('ZZ999')?.precio).toBe(3500)
  })

  it('CREATE ID repetido', async () => {
    mostrar()
    await userEvent.type(screen.getByLabelText(/ID del producto/), 'MC006')
    await userEvent.type(screen.getByLabelText('Nombre'), 'Duplicado')
    await userEvent.type(screen.getByLabelText('Categoría'), 'Pruebas')
    await userEvent.type(screen.getByLabelText('Descripción'), 'Desc')
    await userEvent.type(screen.getByLabelText('Precio'), '100')
    await userEvent.click(screen.getByRole('button', { name: 'Guardar en catálogo' }))
    expect(screen.getByRole('alert')).toHaveTextContent('Ya existe un producto con el ID MC006')
    expect(obtenerProductos()).toHaveLength(3)
  })

  it('UPDATE producto', async () => {
    mostrar()
    await userEvent.click(screen.getByRole('button', { name: 'Editar Ripio 25 kg' }))
    const nombre = screen.getByLabelText('Nombre')
    expect(nombre).toHaveValue('Ripio 25 kg')
    await userEvent.clear(nombre)
    await userEvent.type(nombre, 'Ripio lavado 25 kg')
    await userEvent.click(screen.getByRole('button', { name: 'Actualizar producto' }))
    expect(screen.getByText('Ripio lavado 25 kg')).toBeInTheDocument()
    expect(screen.queryByText('Ripio 25 kg')).not.toBeInTheDocument()
    expect(obtenerProductoPorId('MC006')?.nombre).toBe('Ripio lavado 25 kg')
  })

  it('UPDATE cambiar stock', async () => {
    mostrar()
    await userEvent.click(screen.getByRole('button', { name: 'Cambiar stock de Ripio 25 kg' }))
    expect(obtenerProductoPorId('MC006')?.stock).toBe(false)
    const fila = screen.getByText('MC006').closest('tr') as HTMLElement
    expect(within(fila).getByText('Sin stock')).toBeInTheDocument()
  })

  it('DELETE con confirmación', async () => {
    const confirmar = vi.spyOn(window, 'confirm').mockReturnValue(true)
    mostrar()
    await userEvent.click(screen.getByRole('button', { name: 'Eliminar Ripio 25 kg' }))
    expect(confirmar).toHaveBeenCalledTimes(1)
    expect(screen.queryByText('MC006')).not.toBeInTheDocument()
    expect(obtenerProductoPorId('MC006')).toBeUndefined()
  })

  it('DELETE cancelado', async () => {
    vi.spyOn(window, 'confirm').mockReturnValue(false)
    mostrar()
    await userEvent.click(screen.getByRole('button', { name: 'Eliminar Ripio 25 kg' }))
    expect(screen.getByText('MC006')).toBeInTheDocument()
    expect(obtenerProductos()).toHaveLength(3)
  })
})
