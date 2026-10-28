import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'
import CampoTexto from './CampoTexto'

describe('CampoTexto', () => {
  it('sin error no muestra mensaje', () => {
    render(<CampoTexto id="nombre" etiqueta="Nombre" valor="" onCambio={() => {}} />)
    expect(screen.getByLabelText('Nombre')).toBeInTheDocument()
    expect(screen.queryByRole('alert')).not.toBeInTheDocument()
  })

  it('muestra el error', () => {
    render(<CampoTexto id="nombre" etiqueta="Nombre" valor="" onCambio={() => {}} error="El nombre es obligatorio." />)
    expect(screen.getByRole('alert')).toHaveTextContent('El nombre es obligatorio.')
    expect(screen.getByLabelText('Nombre')).toHaveAttribute('aria-invalid', 'true')
  })

  it('llama a onCambio al escribir', async () => {
    const onCambio = vi.fn()
    render(<CampoTexto id="nombre" etiqueta="Nombre" valor="" onCambio={onCambio} />)
    await userEvent.type(screen.getByLabelText('Nombre'), 'A')
    expect(onCambio).toHaveBeenCalledWith('A')
  })
})
