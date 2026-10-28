import { useState } from 'react'
import { Link } from 'react-router-dom'
import Aviso from '../components/molecules/Aviso'
import FormularioRegistro, { type DatosRegistro } from '../components/organisms/FormularioRegistro'
import { crearUsuario } from '../data/usuariosDB'

function Registro() {
  const [exito, setExito] = useState(false)
  const [errorGeneral, setErrorGeneral] = useState('')

  const manejarRegistro = (datos: DatosRegistro) => {
    try {
      crearUsuario({ nombre: `${datos.nombre.trim()} ${datos.apellidos.trim()}`, correo: datos.correo.trim(), rol: 'Cliente' })
      setErrorGeneral('')
      setExito(true)
    } catch (error) {
      setExito(false)
      setErrorGeneral(error instanceof Error ? error.message : 'No se pudo registrar el usuario.')
    }
  }

  return (
    <section className="card shadow-sm mx-auto" style={{ maxWidth: 650 }}>
      <div className="card-body p-4">
        <h2 className="titulo-producto">Crear cuenta</h2>
        {exito && (
          <Aviso mensaje="Usuario registrado correctamente. Ya puedes iniciar sesión." onCerrar={() => setExito(false)} />
        )}
        <FormularioRegistro onRegistrar={manejarRegistro} errorGeneral={errorGeneral} />
        <p className="small text-center mt-3 mb-0">
          ¿Ya tienes cuenta? <Link to="/login">Inicia sesión</Link>.
        </p>
      </div>
    </section>
  )
}

export default Registro
