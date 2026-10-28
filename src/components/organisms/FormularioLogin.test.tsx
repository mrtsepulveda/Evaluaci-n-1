import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'
import FormularioLogin from './FormularioLogin'

describe('FormularioLogin', () => {
  it('error de contraseña corta', async () => {
    const onIngresar = vi.fn()
    render(<FormularioLogin onIngresar={onIngresar} />)
    await userEvent.type(screen.getByLabelText('Correo electrónico'), 'cliente@test.cl')
    await userEvent.type(screen.getByLabelText('Contraseña'), 'abc')
    await userEvent.click(screen.getByRole('button', { name: 'Ingresar' }))
    expect(screen.getByRole('alert')).toHaveTextContent('La contraseña debe tener entre 4 y 10 caracteres.')
    expect(screen.queryByText(/correo/i, { selector: '[role="alert"]' })).not.toBeInTheDocument()
    expect(onIngresar).not.toHaveBeenCalled()
  })

  it('envía credenciales válidas', async () => {
    const onIngresar = vi.fn()
    render(<FormularioLogin onIngresar={onIngresar} />)
    await userEvent.type(screen.getByLabelText('Correo electrónico'), 'cliente@test.cl')
    await userEvent.type(screen.getByLabelText('Contraseña'), 'clave1')
    await userEvent.click(screen.getByRole('button', { name: 'Ingresar' }))
    expect(onIngresar).toHaveBeenCalledWith('cliente@test.cl', 'clave1')
  })
})
