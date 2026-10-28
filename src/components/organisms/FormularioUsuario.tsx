import { useState, type FormEvent } from 'react'
import type { Rol, Usuario } from '../../types'
import { sinErrores, validarCorreo, validarSeleccion, validarTexto } from '../../utils/validaciones'
import Boton from '../atoms/Boton'
import CampoSeleccion from '../molecules/CampoSeleccion'
import CampoTexto from '../molecules/CampoTexto'

export interface DatosUsuario {
  nombre: string
  correo: string
  rol: Rol
}

interface FormularioUsuarioProps {
  usuarioEditar: Usuario | null
  onGuardar: (datos: DatosUsuario, id: string | null) => void
  onCancelar: () => void
  errorGeneral?: string
}

function FormularioUsuario({ usuarioEditar, onGuardar, onCancelar, errorGeneral }: FormularioUsuarioProps) {
  const [nombre, setNombre] = useState(usuarioEditar?.nombre ?? '')
  const [correo, setCorreo] = useState(usuarioEditar?.correo ?? '')
  const [rol, setRol] = useState<string>(usuarioEditar?.rol ?? '')
  const [errores, setErrores] = useState<{ nombre?: string; correo?: string; rol?: string }>({})

  const manejarEnvio = (evento: FormEvent) => {
    evento.preventDefault()
    const nuevos = {
      nombre: validarTexto(nombre, 'El nombre', 50),
      correo: validarCorreo(correo),
      rol: validarSeleccion(rol, 'Seleccione un rol.'),
    }
    setErrores(nuevos)
    if (sinErrores(nuevos)) {
      onGuardar({ nombre: nombre.trim(), correo: correo.trim(), rol: rol as Rol }, usuarioEditar?.id ?? null)
    }
  }

  return (
    <form onSubmit={manejarEnvio} noValidate aria-label="Formulario de usuario">
      {errorGeneral && (
        <div className="alert alert-danger" role="alert">
          {errorGeneral}
        </div>
      )}
      <CampoTexto id="nombreUsuario" etiqueta="Nombre" valor={nombre} onCambio={setNombre} error={errores.nombre} />
      <CampoTexto id="correoUsuario" etiqueta="Correo" valor={correo} onCambio={setCorreo} error={errores.correo} />
      <CampoSeleccion
        id="rolUsuario"
        etiqueta="Rol de usuario"
        valor={rol}
        onCambio={setRol}
        textoInicial="Seleccione..."
        opciones={[
          { valor: 'Administrador', texto: 'Administrador' },
          { valor: 'Cliente', texto: 'Usuario / Cliente' },
        ]}
        error={errores.rol}
      />
      <div className="d-flex gap-2">
        <Boton type="submit">{usuarioEditar ? 'Actualizar usuario' : 'Guardar usuario'}</Boton>
        {usuarioEditar && (
          <Boton variante="secondary" onClick={onCancelar}>
            Cancelar
          </Boton>
        )}
      </div>
    </form>
  )
}

export default FormularioUsuario
