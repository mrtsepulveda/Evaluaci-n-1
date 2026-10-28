import { useState, type FormEvent } from 'react'
import { sinErrores, validarContrasena, validarCorreo } from '../../utils/validaciones'
import Boton from '../atoms/Boton'
import CampoTexto from '../molecules/CampoTexto'

interface FormularioLoginProps {
  onIngresar: (correo: string, contrasena: string) => void
}

function FormularioLogin({ onIngresar }: FormularioLoginProps) {
  const [correo, setCorreo] = useState('')
  const [contrasena, setContrasena] = useState('')
  const [errores, setErrores] = useState<{ correo?: string; contrasena?: string }>({})

  const manejarEnvio = (evento: FormEvent) => {
    evento.preventDefault()
    const nuevos = { correo: validarCorreo(correo), contrasena: validarContrasena(contrasena) }
    setErrores(nuevos)
    if (sinErrores(nuevos)) {
      onIngresar(correo.trim(), contrasena.trim())
    }
  }

  return (
    <form onSubmit={manejarEnvio} noValidate aria-label="Formulario de inicio de sesión">
      <CampoTexto id="correoLogin" etiqueta="Correo electrónico" valor={correo} onCambio={setCorreo} error={errores.correo} />
      <CampoTexto id="contrasena" etiqueta="Contraseña" tipo="password" valor={contrasena} onCambio={setContrasena} error={errores.contrasena} />
      <Boton type="submit" bloque>
        Ingresar
      </Boton>
    </form>
  )
}

export default FormularioLogin
