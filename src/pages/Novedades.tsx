import TarjetaNovedad from '../components/molecules/TarjetaNovedad'
import { novedades } from '../data/novedadesDatos'

function Novedades() {
  return (
    <section>
      <div className="text-center mb-4">
        <h2 className="titulo-producto">Novedades y consejos del maestro</h2>
        <p className="text-muted">Revisa nuestras novedades, consejos y recomendaciones relacionadas con herramientas, materiales y trabajos de ferretería.</p>
      </div>
      <div className="row row-cols-1 row-cols-md-2 g-4">
        {novedades.map((novedad) => (
          <div className="col" key={novedad.id}>
            <TarjetaNovedad novedad={novedad} />
          </div>
        ))}
      </div>
    </section>
  )
}

export default Novedades
