import type { FiltrosProducto } from '../../types'
import CampoSeleccion from './CampoSeleccion'
import CampoTexto from './CampoTexto'

interface BuscadorProductosProps {
  filtros: FiltrosProducto
  categorias: string[]
  onCambiar: (filtros: FiltrosProducto) => void
}

function BuscadorProductos({ filtros, categorias, onCambiar }: BuscadorProductosProps) {
  return (
    <form className="row g-3 align-items-end mb-4" role="search" onSubmit={(e) => e.preventDefault()}>
      <div className="col-12 col-md-5">
        <CampoTexto id="filtro-texto" etiqueta="Buscar producto" valor={filtros.texto} placeholder="Nombre, ID o descripción" onCambio={(texto) => onCambiar({ ...filtros, texto })} />
      </div>
      <div className="col-12 col-md-4">
        <CampoSeleccion
          id="filtro-categoria"
          etiqueta="Filtrar por categoría"
          valor={filtros.categoria}
          textoInicial="Todas las categorías"
          opciones={categorias.map((c) => ({ valor: c, texto: c }))}
          onCambio={(categoria) => onCambiar({ ...filtros, categoria })}
        />
      </div>
      <div className="col-12 col-md-3">
        <div className="form-check mb-3">
          <input
            id="filtro-ofertas"
            type="checkbox"
            className="form-check-input"
            checked={filtros.soloOfertas}
            onChange={(e) => onCambiar({ ...filtros, soloOfertas: e.target.checked })}
          />
          <label htmlFor="filtro-ofertas" className="form-check-label">
            Solo ofertas
          </label>
        </div>
      </div>
    </form>
  )
}

export default BuscadorProductos
