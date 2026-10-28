import { useState } from 'react'
import Aviso from '../components/molecules/Aviso'
import FormularioContacto, { type DatosContacto } from '../components/organisms/FormularioContacto'

function Contacto() {
  const [enviado, setEnviado] = useState(false)

  const manejarEnvio = (_datos: DatosContacto) => {
    setEnviado(true)
  }

  return (
    <section className="card shadow-sm mx-auto" style={{ maxWidth: 650 }}>
      <div className="card-body p-4">
        <h2 className="titulo-producto">Contacto</h2>
        <p>Envíanos tu consulta y te responderemos a la brevedad.</p>
        {enviado && <Aviso mensaje="¡Mensaje enviado con éxito! Nos contactaremos a la brevedad." onCerrar={() => setEnviado(false)} />}
        <FormularioContacto onEnviar={manejarEnvio} />
      </div>
    </section>
  )
}

export default Contacto
