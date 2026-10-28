import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter } from 'react-router-dom'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import App from './App'
import { reiniciarProductos } from './data/productosDB'
import { reiniciarUsuarios } from './data/usuariosDB'

const irA = (ruta: string) =>
  render(
    <MemoryRouter initialEntries={[ruta]}>
      <App />
    </MemoryRouter>,
  )

describe('rutas', () => {
  beforeEach(() => {
    reiniciarProductos()
    reiniciarUsuarios()
  })

  it('detalle de producto por ID', () => {
    irA('/productos/HE001')
    expect(screen.getByRole('heading', { name: 'Taladro percutor 650W 13mm' })).toBeInTheDocument()
    expect(screen.getByText('Código: HE001')).toBeInTheDocument()
  })

  it('producto inexistente', () => {
    irA('/productos/NO000')
    expect(screen.getByRole('heading', { name: 'Producto no encontrado' })).toBeInTheDocument()
  })

  it('del catálogo al detalle', async () => {
    irA('/catalogo')
    await userEvent.type(screen.getByLabelText('Buscar producto'), 'Ripio')
    await userEvent.click(screen.getByRole('link', { name: 'Ver detalle' }))
    expect(screen.getByRole('heading', { name: 'Ripio 25 kg' })).toBeInTheDocument()
    await userEvent.click(screen.getByRole('link', { name: 'Volver al catálogo' }))
    expect(screen.getByRole('heading', { name: 'Catálogo completo' })).toBeInTheDocument()
  })

  it('detalle de novedad', () => {
    irA('/novedades/stock-pvc')
    expect(screen.getByRole('heading', { name: 'Llegó el nuevo stock de tuberías PVC' })).toBeInTheDocument()
  })

  it('página 404', () => {
    irA('/no-existe')
    expect(screen.getByRole('heading', { name: 'Página no encontrada' })).toBeInTheDocument()
  })

  it('6 destacados en el inicio', () => {
    irA('/')
    expect(screen.getAllByTestId('tarjeta-producto')).toHaveLength(6)
  })
})

describe('sesión', () => {
  beforeEach(() => {
    reiniciarProductos()
    reiniciarUsuarios()
  })

  it('admin sin sesión', () => {
    irA('/admin')
    expect(screen.getByRole('heading', { name: 'Iniciar sesión' })).toBeInTheDocument()
    expect(screen.queryByText('Bienvenido al panel de gestión')).not.toBeInTheDocument()
  })

  it('cliente no entra a admin', () => {
    localStorage.setItem('sesionFerreteria', JSON.stringify({ correo: 'cliente@test.cl', rol: 'Cliente' }))
    irA('/admin/productos')
    expect(screen.getByRole('heading', { name: 'Iniciar sesión' })).toBeInTheDocument()
  })

  it('administrador entra a admin', () => {
    localStorage.setItem('sesionFerreteria', JSON.stringify({ correo: 'admin@losmaestros.cl', rol: 'Administrador' }))
    irA('/admin/productos')
    expect(screen.getByRole('heading', { name: 'Administración de productos' })).toBeInTheDocument()
  })

  it('iniciar y cerrar sesión', async () => {
    irA('/login')
    await userEvent.type(screen.getByLabelText('Correo electrónico'), 'cliente@test.cl')
    await userEvent.type(screen.getByLabelText('Contraseña'), 'clave1')
    await userEvent.click(screen.getByRole('button', { name: 'Ingresar' }))
    expect(screen.getByRole('link', { name: 'Mi Perfil (Cliente)' })).toBeInTheDocument()
    expect(screen.queryByRole('link', { name: 'Iniciar sesión' })).not.toBeInTheDocument()

    await userEvent.click(screen.getByRole('link', { name: 'Mi Perfil (Cliente)' }))
    await userEvent.click(screen.getByRole('button', { name: 'Cerrar sesión' }))
    expect(screen.getByRole('link', { name: 'Iniciar sesión' })).toBeInTheDocument()
    expect(localStorage.getItem('sesionFerreteria')).toBeNull()
  })
})

describe('carrito', () => {
  beforeEach(() => reiniciarProductos())

  it('agregar y quitar del carrito', async () => {
    irA('/catalogo')
    await userEvent.type(screen.getByLabelText('Buscar producto'), 'Ripio')
    await userEvent.click(screen.getByRole('button', { name: 'Agregar' }))
    await userEvent.click(screen.getByRole('button', { name: 'Agregar' }))
    expect(screen.getByTestId('total-carrito')).toHaveTextContent('$3.000')
    await userEvent.click(screen.getByRole('button', { name: 'Quitar Ripio 25 kg' }))
    expect(screen.getByTestId('total-carrito')).toHaveTextContent('$1.500')
  })

  it('pagar vacía el carrito', async () => {
    const confirmar = vi.spyOn(window, 'confirm').mockReturnValue(true)
    irA('/catalogo')
    await userEvent.type(screen.getByLabelText('Buscar producto'), 'Ripio')
    await userEvent.click(screen.getByRole('button', { name: 'Agregar' }))
    await userEvent.click(screen.getByRole('button', { name: 'Pagar compra' }))
    expect(confirmar).toHaveBeenCalledTimes(1)
    expect(screen.getByText('Tu selección está vacía.')).toBeInTheDocument()
    expect(screen.getByText(/Compra realizada con éxito/)).toBeInTheDocument()
    confirmar.mockRestore()
  })
})
