import { useState, type FormEvent } from 'react'
import { regiones } from '../../data/regiones'
import { sinErrores, validarCorreo, validarRun, validarSeleccion, validarTexto } from '../../utils/validaciones'
import Boton from '../atoms/Boton'
import CampoSeleccion from '../molecules/CampoSeleccion'
import CampoTexto from '../molecules/CampoTexto'

export interface DatosRegistro {
  run: string
  nombre: string
  apellidos: string
  correo: string
  fechaNac: string
  tipoUsuario: string
  region: string
  comuna: string
  direccion: string
}

type CampoRegistro = keyof DatosRegistro

interface FormularioRegistroProps {
  onRegistrar: (datos: DatosRegistro) => void
  errorGeneral?: string
}

const vacio: DatosRegistro = { run: '', nombre: '', apellidos: '', correo: '', fechaNac: '', tipoUsuario: '', region: '', comuna: '', direccion: '' }

function FormularioRegistro({ onRegistrar, errorGeneral }: FormularioRegistroProps) {
  const [valores, setValores] = useState<DatosRegistro>(vacio)
  const [errores, setErrores] = useState<Partial<Record<CampoRegistro, string>>>({})

  const cambiar = (campo: CampoRegistro) => (valor: string) => setValores({ ...valores, [campo]: valor })

  // al cambiar la región se limpia la comuna
  const cambiarRegion = (region: string) => setValores({ ...valores, region, comuna: '' })

  const comunas = regiones.find((r) => r.nombre === valores.region)?.comunas ?? []

  const manejarEnvio = (evento: FormEvent) => {
    evento.preventDefault()
    const nuevos: Partial<Record<CampoRegistro, string>> = {
      run: validarRun(valores.run),
      nombre: validarTexto(valores.nombre, 'El nombre', 50),
      apellidos: validarTexto(valores.apellidos, 'Los apellidos', 100),
      correo: validarCorreo(valores.correo),
      tipoUsuario: validarSeleccion(valores.tipoUsuario, 'Seleccione un tipo de usuario.'),
      region: validarSeleccion(valores.region, 'Seleccione una región.'),
      comuna: valores.region === '' ? '' : validarSeleccion(valores.comuna, 'Seleccione una comuna.'),
      direccion: validarTexto(valores.direccion, 'La dirección', 300),
    }
    setErrores(nuevos)
    if (sinErrores(nuevos)) {
      onRegistrar(valores)
      setValores(vacio)
    }
  }

  return (
    <form onSubmit={manejarEnvio} noValidate aria-label="Formulario de registro">
      {errorGeneral && (
        <div className="alert alert-danger" role="alert">
          {errorGeneral}
        </div>
      )}
      <CampoTexto id="run" etiqueta="RUN (sin puntos ni guion)" placeholder="Ejemplo: 123456789" valor={valores.run} onCambio={cambiar('run')} error={errores.run} />
      <CampoTexto id="nombre" etiqueta="Nombre" valor={valores.nombre} onCambio={cambiar('nombre')} error={errores.nombre} />
      <CampoTexto id="apellidos" etiqueta="Apellidos" valor={valores.apellidos} onCambio={cambiar('apellidos')} error={errores.apellidos} />
      <CampoTexto id="correo" etiqueta="Correo electrónico" valor={valores.correo} onCambio={cambiar('correo')} error={errores.correo} />
      <CampoTexto id="fechaNac" etiqueta="Fecha de nacimiento (opcional)" tipo="date" valor={valores.fechaNac} onCambio={cambiar('fechaNac')} />
      <CampoSeleccion
        id="tipoUsuario"
        etiqueta="Tipo de usuario"
        valor={valores.tipoUsuario}
        onCambio={cambiar('tipoUsuario')}
        textoInicial="Seleccione..."
        opciones={[
          { valor: 'contratista', texto: 'Contratista' },
          { valor: 'particular', texto: 'Cliente particular' },
        ]}
        error={errores.tipoUsuario}
      />
      <div className="row">
        <div className="col-12 col-md-6">
          <CampoSeleccion
            id="region"
            etiqueta="Región"
            valor={valores.region}
            onCambio={cambiarRegion}
            textoInicial="Seleccione región..."
            opciones={regiones.map((r) => ({ valor: r.nombre, texto: r.nombre }))}
            error={errores.region}
          />
        </div>
        <div className="col-12 col-md-6">
          <CampoSeleccion
            id="comuna"
            etiqueta="Comuna"
            valor={valores.comuna}
            onCambio={cambiar('comuna')}
            textoInicial="Seleccione comuna..."
            opciones={comunas.map((c) => ({ valor: c, texto: c }))}
            error={errores.comuna}
            deshabilitado={valores.region === ''}
          />
        </div>
      </div>
      <CampoTexto id="direccion" etiqueta="Dirección" valor={valores.direccion} onCambio={cambiar('direccion')} error={errores.direccion} />
      <Boton type="submit" bloque>
        Registrarse
      </Boton>
    </form>
  )
}

export default FormularioRegistro
