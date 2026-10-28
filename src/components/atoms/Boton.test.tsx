import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'
import Boton from './Boton'

describe('Boton', () => {
  it('muestra texto y variante', () => {
    render(<Boton variante="danger">Eliminar</Boton>)
    const boton = screen.getByRole('button', { name: 'Eliminar' })
    expect(boton).toBeInTheDocument()
    expect(boton).toHaveClass('btn', 'btn-danger')
  })

  it('llama a onClick', async () => {
    const onClick = vi.fn()
    render(<Boton onClick={onClick}>Guardar</Boton>)
    await userEvent.click(screen.getByRole('button', { name: 'Guardar' }))
    expect(onClick).toHaveBeenCalledTimes(1)
  })

  it('deshabilitado no hace clic', async () => {
    const onClick = vi.fn()
    render(
      <Boton onClick={onClick} disabled>
        Guardar
      </Boton>,
    )
    await userEvent.click(screen.getByRole('button', { name: 'Guardar' }))
    expect(onClick).not.toHaveBeenCalled()
  })
})
