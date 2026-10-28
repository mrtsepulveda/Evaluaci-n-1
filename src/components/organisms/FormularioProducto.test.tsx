import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'
import type { Producto } from '../../types'
import FormularioProducto from './FormularioProducto'

const existente: Producto = {
  id: 'HE001',
  nombre: 'Taladro',
  descripcion: 'Un taladro',
  categoria: 'Herramientas',
  precio: 79990,
  imagen: '/img/logo_maestros.jpg',
  stock: true,
}

describe('FormularioProducto', () => {
  it('campos obligatorios', async () => {
    const onGuardar = vi.fn()
    render(<FormularioProducto productoEditar={null} onGuardar={onGuardar} onCancelar={() => {}} />)
    await userEvent.click(screen.getByRole('button', { name: 'Guardar en catálogo' }))
    expect(screen.getByText('El ID es obligatorio.')).toBeInTheDocument()
    expect(screen.getByText('El nombre es obligatorio.')).toBeInTheDocument()
    expect(screen.getByText('El precio es obligatorio.')).toBeInTheDocument()
    expect(onGuardar).not.toHaveBeenCalled()
  })

  it('oferta menor al precio', async () => {
    const onGuardar = vi.fn()
    render(<FormularioProducto productoEditar={existente} onGuardar={onGuardar} onCancelar={() => {}} />)
    await userEvent.type(screen.getByLabelText(/Precio de oferta/), '90000')
    await userEvent.click(screen.getByRole('button', { name: 'Actualizar producto' }))
    expect(screen.getByText('El precio de oferta debe ser menor al precio normal.')).toBeInTheDocument()
    expect(onGuardar).not.toHaveBeenCalled()
  })

  it('crea con datos válidos', async () => {
    const onGuardar = vi.fn()
    render(<FormularioProducto productoEditar={null} onGuardar={onGuardar} onCancelar={() => {}} />)
    await userEvent.type(screen.getByLabelText(/ID del producto/), 'ab123')
    await userEvent.type(screen.getByLabelText('Nombre'), 'Producto nuevo')
    await userEvent.type(screen.getByLabelText('Categoría'), 'Pruebas')
    await userEvent.type(screen.getByLabelText('Descripción'), 'Una descripción')
    await userEvent.type(screen.getByLabelText('Precio'), '2500')
    await userEvent.click(screen.getByRole('button', { name: 'Guardar en catálogo' }))
    expect(onGuardar).toHaveBeenCalledTimes(1)
    const [producto, esEdicion] = onGuardar.mock.calls[0]
    expect(esEdicion).toBe(false)
    expect(producto).toMatchObject({ id: 'AB123', nombre: 'Producto nuevo', precio: 2500, stock: true, enOferta: false })
  })

  it('modo edición', async () => {
    const onCancelar = vi.fn()
    render(<FormularioProducto productoEditar={existente} onGuardar={() => {}} onCancelar={onCancelar} />)
    expect(screen.getByLabelText(/ID del producto/)).toBeDisabled()
    expect(screen.getByLabelText(/ID del producto/)).toHaveValue('HE001')
    expect(screen.getByLabelText('Nombre')).toHaveValue('Taladro')
    await userEvent.click(screen.getByRole('button', { name: 'Cancelar' }))
    expect(onCancelar).toHaveBeenCalledTimes(1)
  })
})
