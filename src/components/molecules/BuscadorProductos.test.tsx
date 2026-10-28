import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'
import BuscadorProductos from './BuscadorProductos'

const filtros = { texto: '', categoria: '', soloOfertas: false }

describe('BuscadorProductos', () => {
  it('muestra las categorías', () => {
    render(<BuscadorProductos filtros={filtros} categorias={['Jardín', 'Pinturas']} onCambiar={() => {}} />)
    expect(screen.getByRole('option', { name: 'Jardín' })).toBeInTheDocument()
    expect(screen.getByRole('option', { name: 'Pinturas' })).toBeInTheDocument()
  })

  it('filtro de texto', async () => {
    const onCambiar = vi.fn()
    render(<BuscadorProductos filtros={filtros} categorias={[]} onCambiar={onCambiar} />)
    await userEvent.type(screen.getByLabelText('Buscar producto'), 'm')
    expect(onCambiar).toHaveBeenCalledWith({ texto: 'm', categoria: '', soloOfertas: false })
  })

  it('filtro de categoría y ofertas', async () => {
    const onCambiar = vi.fn()
    render(<BuscadorProductos filtros={filtros} categorias={['Jardín']} onCambiar={onCambiar} />)
    await userEvent.selectOptions(screen.getByLabelText('Filtrar por categoría'), 'Jardín')
    expect(onCambiar).toHaveBeenLastCalledWith({ texto: '', categoria: 'Jardín', soloOfertas: false })
    await userEvent.click(screen.getByLabelText('Solo ofertas'))
    expect(onCambiar).toHaveBeenLastCalledWith({ texto: '', categoria: '', soloOfertas: true })
  })
})
