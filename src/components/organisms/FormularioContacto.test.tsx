import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'
import FormularioContacto from './FormularioContacto'

describe('FormularioContacto', () => {
  it('sin errores al inicio', () => {
    render(<FormularioContacto onEnviar={() => {}} />)
    expect(screen.queryByRole('alert')).not.toBeInTheDocument()
  })

  it('errores al enviar vacío', async () => {
    const onEnviar = vi.fn()
    render(<FormularioContacto onEnviar={onEnviar} />)
    await userEvent.click(screen.getByRole('button', { name: 'Enviar mensaje' }))
    expect(screen.getByText('El nombre es obligatorio.')).toBeInTheDocument()
    expect(screen.getByText('El correo es obligatorio.')).toBeInTheDocument()
    expect(screen.getByText('El comentario es obligatorio.')).toBeInTheDocument()
    expect(onEnviar).not.toHaveBeenCalled()
  })

  it('error de correo inválido', async () => {
    const onEnviar = vi.fn()
    render(<FormularioContacto onEnviar={onEnviar} />)
    await userEvent.type(screen.getByLabelText('Nombre completo'), 'Ana')
    await userEvent.type(screen.getByLabelText('Correo electrónico'), 'ana-sin-arroba')
    await userEvent.type(screen.getByLabelText('Comentario o mensaje'), 'Hola')
    await userEvent.click(screen.getByRole('button', { name: 'Enviar mensaje' }))
    expect(screen.getAllByRole('alert')).toHaveLength(1)
    expect(screen.getByRole('alert')).toHaveTextContent('El correo no tiene un formato válido')
    expect(onEnviar).not.toHaveBeenCalled()
  })

  it('envía datos válidos y limpia', async () => {
    const onEnviar = vi.fn()
    render(<FormularioContacto onEnviar={onEnviar} />)
    await userEvent.type(screen.getByLabelText('Nombre completo'), 'Ana Pérez')
    await userEvent.type(screen.getByLabelText('Correo electrónico'), 'ana@test.cl')
    await userEvent.type(screen.getByLabelText('Comentario o mensaje'), 'Quisiera una cotización')
    await userEvent.click(screen.getByRole('button', { name: 'Enviar mensaje' }))
    expect(onEnviar).toHaveBeenCalledWith({ nombre: 'Ana Pérez', correo: 'ana@test.cl', comentario: 'Quisiera una cotización' })
    expect(screen.queryByRole('alert')).not.toBeInTheDocument()
    expect(screen.getByLabelText('Nombre completo')).toHaveValue('')
  })
})
