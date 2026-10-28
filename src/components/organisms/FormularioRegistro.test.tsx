import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'
import FormularioRegistro from './FormularioRegistro'

describe('FormularioRegistro', () => {
  it('comuna depende de la región', async () => {
    render(<FormularioRegistro onRegistrar={() => {}} />)
    expect(screen.getByLabelText('Comuna')).toBeDisabled()
    await userEvent.selectOptions(screen.getByLabelText('Región'), 'Coquimbo')
    expect(screen.getByLabelText('Comuna')).toBeEnabled()
    expect(screen.getByRole('option', { name: 'La Serena' })).toBeInTheDocument()
    expect(screen.queryByRole('option', { name: 'Santiago' })).not.toBeInTheDocument()
  })

  it('errores al enviar vacío', async () => {
    const onRegistrar = vi.fn()
    render(<FormularioRegistro onRegistrar={onRegistrar} />)
    await userEvent.click(screen.getByRole('button', { name: 'Registrarse' }))
    expect(screen.getByText('El RUN es obligatorio.')).toBeInTheDocument()
    expect(screen.getByText('Seleccione un tipo de usuario.')).toBeInTheDocument()
    expect(screen.getByText('Seleccione una región.')).toBeInTheDocument()
    expect(onRegistrar).not.toHaveBeenCalled()
  })

  it('RUN con dígito incorrecto', async () => {
    render(<FormularioRegistro onRegistrar={() => {}} />)
    await userEvent.type(screen.getByLabelText(/RUN/), '123456789')
    await userEvent.click(screen.getByRole('button', { name: 'Registrarse' }))
    expect(screen.getByText('El RUN ingresado no es válido (dígito verificador incorrecto).')).toBeInTheDocument()
  })

  it('envía datos válidos', async () => {
    const onRegistrar = vi.fn()
    render(<FormularioRegistro onRegistrar={onRegistrar} />)
    await userEvent.type(screen.getByLabelText(/RUN/), '123456785')
    await userEvent.type(screen.getByLabelText('Nombre'), 'Ana')
    await userEvent.type(screen.getByLabelText('Apellidos'), 'Pérez Soto')
    await userEvent.type(screen.getByLabelText('Correo electrónico'), 'ana@test.cl')
    await userEvent.selectOptions(screen.getByLabelText('Tipo de usuario'), 'particular')
    await userEvent.selectOptions(screen.getByLabelText('Región'), 'Coquimbo')
    await userEvent.selectOptions(screen.getByLabelText('Comuna'), 'La Serena')
    await userEvent.type(screen.getByLabelText('Dirección'), 'Calle 123')
    await userEvent.click(screen.getByRole('button', { name: 'Registrarse' }))
    expect(screen.queryByRole('alert')).not.toBeInTheDocument()
    expect(onRegistrar).toHaveBeenCalledTimes(1)
    expect(onRegistrar.mock.calls[0][0]).toMatchObject({ run: '123456785', correo: 'ana@test.cl', comuna: 'La Serena' })
  })
})
