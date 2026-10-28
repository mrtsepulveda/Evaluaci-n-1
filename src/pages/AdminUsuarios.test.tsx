import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { obtenerUsuarios, reiniciarUsuarios } from '../data/usuariosDB'
import AdminUsuarios from './AdminUsuarios'

describe('AdminUsuarios', () => {
  beforeEach(() => reiniciarUsuarios())
  afterEach(() => vi.restoreAllMocks())

  it('READ lista de usuarios', () => {
    render(<AdminUsuarios />)
    expect(screen.getByText('admin@losmaestros.cl')).toBeInTheDocument()
    expect(screen.getByText('valentina@test.cl')).toBeInTheDocument()
  })

  it('CREATE usuario', async () => {
    render(<AdminUsuarios />)
    await userEvent.type(screen.getByLabelText('Nombre'), 'Pedro')
    await userEvent.type(screen.getByLabelText('Correo'), 'pedro@test.cl')
    await userEvent.selectOptions(screen.getByLabelText('Rol de usuario'), 'Cliente')
    await userEvent.click(screen.getByRole('button', { name: 'Guardar usuario' }))
    expect(screen.getByText('pedro@test.cl')).toBeInTheDocument()
    expect(obtenerUsuarios()).toHaveLength(3)
  })

  it('UPDATE rol', async () => {
    render(<AdminUsuarios />)
    await userEvent.click(screen.getByRole('button', { name: 'Editar Valentina' }))
    await userEvent.selectOptions(screen.getByLabelText('Rol de usuario'), 'Administrador')
    await userEvent.click(screen.getByRole('button', { name: 'Actualizar usuario' }))
    expect(obtenerUsuarios().find((u) => u.id === 'U002')?.rol).toBe('Administrador')
  })

  it('DELETE con confirmación', async () => {
    vi.spyOn(window, 'confirm').mockReturnValue(true)
    render(<AdminUsuarios />)
    await userEvent.click(screen.getByRole('button', { name: 'Eliminar Valentina' }))
    expect(screen.queryByText('valentina@test.cl')).not.toBeInTheDocument()
    expect(obtenerUsuarios()).toHaveLength(1)
  })

  it('buscador', async () => {
    render(<AdminUsuarios />)
    await userEvent.type(screen.getByLabelText('Buscar usuario'), 'valen')
    expect(screen.getByText('valentina@test.cl')).toBeInTheDocument()
    expect(screen.queryByText('admin@losmaestros.cl')).not.toBeInTheDocument()
  })
})
