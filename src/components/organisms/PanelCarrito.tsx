import type { ItemCarrito } from '../../types'
import { formatearPrecio } from '../../utils/validaciones'
import Boton from '../atoms/Boton'
import FilaCarrito, { precioFinal } from '../molecules/FilaCarrito'

interface PanelCarritoProps {
  items: ItemCarrito[]
  onQuitar: (id: string) => void
  onVaciar: () => void
  onPagar: () => void
}

function PanelCarrito({ items, onQuitar, onVaciar, onPagar }: PanelCarritoProps) {
  const total = items.reduce((suma, item) => suma + precioFinal(item), 0)

  return (
    <section className="card shadow-sm mx-auto" style={{ maxWidth: 650 }} aria-label="Carrito de compras">
      <div className="card-body">
        {items.length === 0 ? (
          <p className="text-muted text-center mb-0">Tu selección está vacía.</p>
        ) : (
          <ul className="list-group list-group-flush mb-3">
            {items.map((item) => (
              <FilaCarrito key={item.producto.id} item={item} onQuitar={onQuitar} />
            ))}
          </ul>
        )}
        <h3 className="h5 text-end">
          Total: <span data-testid="total-carrito">{formatearPrecio(total)}</span>
        </h3>
        {items.length > 0 && (
          <div className="d-flex gap-2 mt-3">
            <Boton variante="danger" onClick={onVaciar}>
              Vaciar selección
            </Boton>
            <Boton variante="success" onClick={onPagar}>
              Pagar compra
            </Boton>
          </div>
        )}
      </div>
    </section>
  )
}

export default PanelCarrito
