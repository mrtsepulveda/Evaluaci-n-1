// usuarios con CRUD, guardados en localStorage
import type { Usuario } from '../types'
import { guardarAlmacenado, leerAlmacenado } from './almacenamiento'

export const CLAVE_USUARIOS = 'usuariosFerreteria'

const usuariosIniciales: Usuario[] = [
  { id: 'U001', nombre: 'Dueño Ferretería', correo: 'admin@losmaestros.cl', rol: 'Administrador' },
  { id: 'U002', nombre: 'Valentina', correo: 'valentina@test.cl', rol: 'Cliente' },
]

let usuarios: Usuario[] = leerAlmacenado<Usuario[]>(CLAVE_USUARIOS) ?? usuariosIniciales.map((u) => ({ ...u }))

function persistir(): void {
  guardarAlmacenado(CLAVE_USUARIOS, usuarios)
}

export function obtenerUsuarios(): Usuario[] {
  return usuarios.map((u) => ({ ...u }))
}

export function obtenerUsuarioPorCorreo(correo: string): Usuario | undefined {
  const encontrado = usuarios.find((u) => u.correo.toLowerCase() === correo.toLowerCase())
  return encontrado ? { ...encontrado } : undefined
}

function siguienteId(): string {
  const numeros = usuarios.map((u) => parseInt(u.id.replace('U', ''), 10)).filter((n) => !Number.isNaN(n))
  const siguiente = (numeros.length > 0 ? Math.max(...numeros) : 0) + 1
  return `U${String(siguiente).padStart(3, '0')}`
}

export function crearUsuario(datos: Omit<Usuario, 'id'>): Usuario {
  if (obtenerUsuarioPorCorreo(datos.correo)) {
    throw new Error(`Ya existe un usuario con el correo ${datos.correo}`)
  }
  const nuevo: Usuario = { id: siguienteId(), ...datos }
  usuarios = [...usuarios, nuevo]
  persistir()
  return { ...nuevo }
}

export function actualizarUsuario(id: string, cambios: Partial<Omit<Usuario, 'id'>>): Usuario {
  const indice = usuarios.findIndex((u) => u.id === id)
  if (indice === -1) {
    throw new Error(`No existe un usuario con el ID ${id}`)
  }
  if (cambios.correo) {
    const otro = obtenerUsuarioPorCorreo(cambios.correo)
    if (otro && otro.id !== id) {
      throw new Error(`Ya existe un usuario con el correo ${cambios.correo}`)
    }
  }
  const actualizado: Usuario = { ...usuarios[indice], ...cambios, id }
  usuarios = usuarios.map((u, i) => (i === indice ? actualizado : u))
  persistir()
  return { ...actualizado }
}

export function eliminarUsuario(id: string): boolean {
  const existe = usuarios.some((u) => u.id === id)
  if (!existe) return false
  usuarios = usuarios.filter((u) => u.id !== id)
  persistir()
  return true
}

export function reiniciarUsuarios(): void {
  usuarios = usuariosIniciales.map((u) => ({ ...u }))
  persistir()
}
