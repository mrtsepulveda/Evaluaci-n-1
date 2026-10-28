import { useState } from 'react'
import Aviso from '../components/molecules/Aviso'
import CampoTexto from '../components/molecules/CampoTexto'
import FormularioUsuario, { type DatosUsuario } from '../components/organisms/FormularioUsuario'
import TablaUsuarios from '../components/organisms/TablaUsuarios'
import { actualizarUsuario, crearUsuario, eliminarUsuario, obtenerUsuarios } from '../data/usuariosDB'
import type { Usuario } from '../types'

function AdminUsuarios() {
  const [usuarios, setUsuarios] = useState<Usuario[]>(obtenerUsuarios)
  const [busqueda, setBusqueda] = useState('')
  const [usuarioEditar, setUsuarioEditar] = useState<Usuario | null>(null)
  const [aviso, setAviso] = useState('')
  const [errorGeneral, setErrorGeneral] = useState('')

  const recargar = () => setUsuarios(obtenerUsuarios())

  const guardar = (datos: DatosUsuario, id: string | null) => {
    try {
      if (id) {
        actualizarUsuario(id, datos)
        setAviso(`Usuario "${datos.nombre}" actualizado.`)
      } else {
        crearUsuario(datos)
        setAviso(`Usuario "${datos.nombre}" creado.`)
      }
      setErrorGeneral('')
      setUsuarioEditar(null)
      recargar()
    } catch (error) {
      setErrorGeneral(error instanceof Error ? error.message : 'No se pudo guardar el usuario.')
    }
  }

  const eliminar = (usuario: Usuario) => {
    if (!window.confirm(`¿Seguro que deseas eliminar a "${usuario.nombre}"?`)) return
    eliminarUsuario(usuario.id)
    if (usuarioEditar?.id === usuario.id) setUsuarioEditar(null)
    setAviso(`Usuario "${usuario.nombre}" eliminado.`)
    recargar()
  }

  const texto = busqueda.trim().toLowerCase()
  const visibles = usuarios.filter((u) => texto === '' || u.nombre.toLowerCase().includes(texto) || u.correo.toLowerCase().includes(texto))

  return (
    <>
      <h2 className="mb-3">Administración de usuarios</h2>
      {aviso !== '' && <Aviso mensaje={aviso} onCerrar={() => setAviso('')} />}
      <div className="row g-4">
        <section className="col-12 col-lg-8">
          <div className="card shadow-sm">
            <div className="card-body">
              <h3 className="h5">Usuarios registrados ({visibles.length})</h3>
              <CampoTexto id="busqueda-usuario" etiqueta="Buscar usuario" placeholder="Nombre o correo" valor={busqueda} onCambio={setBusqueda} />
              <TablaUsuarios usuarios={visibles} onEditar={(u) => { setErrorGeneral(''); setUsuarioEditar(u) }} onEliminar={eliminar} />
            </div>
          </div>
        </section>
        <section className="col-12 col-lg-4">
          <div className="card shadow-sm">
            <div className="card-body">
              <h3 className="h5">{usuarioEditar ? 'Editar usuario' : 'Nuevo usuario'}</h3>
              <FormularioUsuario
                key={usuarioEditar?.id ?? 'nuevo'}
                usuarioEditar={usuarioEditar}
                onGuardar={guardar}
                onCancelar={() => { setErrorGeneral(''); setUsuarioEditar(null) }}
                errorGeneral={errorGeneral}
              />
            </div>
          </div>
        </section>
      </div>
    </>
  )
}

export default AdminUsuarios
