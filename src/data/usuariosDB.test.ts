import { beforeEach, describe, expect, it } from 'vitest'
import { actualizarUsuario, crearUsuario, eliminarUsuario, obtenerUsuarioPorCorreo, obtenerUsuarios, reiniciarUsuarios } from './usuariosDB'

describe('usuariosDB', () => {
  beforeEach(() => reiniciarUsuarios())

  it('READ usuarios', () => {
    expect(obtenerUsuarios()).toHaveLength(2)
    expect(obtenerUsuarioPorCorreo('ADMIN@losmaestros.cl')?.rol).toBe('Administrador')
  })

  it('CREATE usuario', () => {
    const creado = crearUsuario({ nombre: 'Pedro', correo: 'pedro@test.cl', rol: 'Cliente' })
    expect(creado.id).toBe('U003')
    expect(obtenerUsuarios()).toHaveLength(3)
  })

  it('CREATE correo repetido', () => {
    expect(() => crearUsuario({ nombre: 'Otro', correo: 'valentina@test.cl', rol: 'Cliente' })).toThrow('Ya existe un usuario con el correo valentina@test.cl')
  })

  it('UPDATE usuario', () => {
    const actualizado = actualizarUsuario('U002', { rol: 'Administrador' })
    expect(actualizado.rol).toBe('Administrador')
    expect(obtenerUsuarioPorCorreo('valentina@test.cl')?.rol).toBe('Administrador')
  })

  it('DELETE usuario', () => {
    expect(eliminarUsuario('U002')).toBe(true)
    expect(obtenerUsuarios()).toHaveLength(1)
    expect(eliminarUsuario('U002')).toBe(false)
  })
})
