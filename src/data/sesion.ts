import type { Sesion } from '../types'
import { borrarAlmacenado, guardarAlmacenado, leerAlmacenado } from './almacenamiento'
import { obtenerUsuarioPorCorreo } from './usuariosDB'

export const CLAVE_SESION = 'sesionFerreteria'

export function leerSesion(): Sesion | null {
  return leerAlmacenado<Sesion>(CLAVE_SESION)
}

// si el correo no está registrado, es admin solo si contiene "admin"
export function crearSesion(correo: string): Sesion {
  const usuario = obtenerUsuarioPorCorreo(correo)
  const rol = usuario ? usuario.rol : correo.toLowerCase().includes('admin') ? 'Administrador' : 'Cliente'
  const sesion: Sesion = { correo, rol }
  guardarAlmacenado(CLAVE_SESION, sesion)
  return sesion
}

export function cerrarSesionGuardada(): void {
  borrarAlmacenado(CLAVE_SESION)
}
