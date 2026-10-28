import { useState, type FormEvent } from 'react'
import { sinErrores, validarCorreo, validarTexto } from '../../utils/validaciones'
import Boton from '../atoms/Boton'
import CampoAreaTexto from '../molecules/CampoAreaTexto'
import CampoTexto from '../molecules/CampoTexto'

export interface DatosContacto {
  nombre: string
  correo: string
  comentario: string
}

type CampoContacto = keyof DatosContacto

interface FormularioContactoProps {
  onEnviar: (datos: DatosContacto) => void
}

const vacio: DatosContacto = { nombre: '', correo: '', comentario: '' }

function FormularioContacto({ onEnviar }: FormularioContactoProps) {
  const [valores, setValores] = useState<DatosContacto>(vacio)
  const [errores, setErrores] = useState<Partial<Record<CampoContacto, string>>>({})

  const cambiar = (campo: CampoContacto) => (valor: string) => setValores({ ...valores, [campo]: valor })

  const manejarEnvio = (evento: FormEvent) => {
    evento.preventDefault()
    const nuevos = {
      nombre: validarTexto(valores.nombre, 'El nombre', 100),
      correo: validarCorreo(valores.correo),
      comentario: validarTexto(valores.comentario, 'El comentario', 500),
    }
    setErrores(nuevos)
    if (sinErrores(nuevos)) {
      onEnviar({ nombre: valores.nombre.trim(), correo: valores.correo.trim(), comentario: valores.comentario.trim() })
      setValores(vacio)
    }
  }

  return (
    <form onSubmit={manejarEnvio} noValidate aria-label="Formulario de contacto">
      <CampoTexto id="nombre" etiqueta="Nombre completo" valor={valores.nombre} onCambio={cambiar('nombre')} error={errores.nombre} />
      <CampoTexto id="correo" etiqueta="Correo electrónico" valor={valores.correo} onCambio={cambiar('correo')} error={errores.correo} />
      <CampoAreaTexto id="comentario" etiqueta="Comentario o mensaje" valor={valores.comentario} onCambio={cambiar('comentario')} error={errores.comentario} filas={5} />
      <Boton type="submit" bloque>
        Enviar mensaje
      </Boton>
    </form>
  )
}

export default FormularioContacto
