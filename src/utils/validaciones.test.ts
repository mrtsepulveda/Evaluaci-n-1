import { describe, expect, it } from 'vitest'
import { formatearPrecio, sinErrores, validarContrasena, validarCorreo, validarIdProducto, validarPrecio, validarRun, validarTexto } from './validaciones'

describe('validaciones', () => {
  it('validarCorreo', () => {
    expect(validarCorreo('cliente@test.cl')).toBe('')
    expect(validarCorreo('   ')).toBe('El correo es obligatorio.')
    expect(validarCorreo('sin-arroba.cl')).toBe('El correo no tiene un formato válido (ejemplo: nombre@dominio.cl).')
    expect(validarCorreo('a'.repeat(95) + '@test.cl')).toBe('El correo admite un máximo de 100 caracteres.')
  })

  it('validarRun', () => {
    expect(validarRun('123456785')).toBe('')
    expect(validarRun('')).toBe('El RUN es obligatorio.')
    expect(validarRun('12.345.678-5')).toBe('El RUN debe ir sin puntos ni guion (ejemplo: 123456789).')
    expect(validarRun('123456789')).toBe('El RUN ingresado no es válido (dígito verificador incorrecto).')
  })

  it('validarContrasena', () => {
    expect(validarContrasena('abcd')).toBe('')
    expect(validarContrasena('abc')).toBe('La contraseña debe tener entre 4 y 10 caracteres.')
    expect(validarContrasena('12345678901')).toBe('La contraseña debe tener entre 4 y 10 caracteres.')
    expect(validarContrasena('')).toBe('La contraseña es obligatoria.')
  })

  it('validarTexto', () => {
    expect(validarTexto('Hola', 'El nombre', 10)).toBe('')
    expect(validarTexto('', 'El nombre', 10)).toBe('El nombre es obligatorio.')
    expect(validarTexto('x'.repeat(11), 'El nombre', 10)).toBe('El nombre admite un máximo de 10 caracteres.')
  })

  it('validarPrecio', () => {
    expect(validarPrecio('1990')).toBe('')
    expect(validarPrecio('')).toBe('El precio es obligatorio.')
    expect(validarPrecio('abc')).toBe('El precio debe ser un número.')
    expect(validarPrecio('10.5')).toBe('El precio debe ser un número entero (sin decimales).')
    expect(validarPrecio('0')).toBe('El precio debe ser mayor que 0.')
  })

  it('validarIdProducto', () => {
    expect(validarIdProducto('MC999')).toBe('')
    expect(validarIdProducto('')).toBe('El ID es obligatorio.')
    expect(validarIdProducto('M99')).toBe('El ID debe tener 2 letras y 3 números (ejemplo: MC999).')
  })

  it('sinErrores y formatearPrecio', () => {
    expect(sinErrores({ a: '', b: undefined })).toBe(true)
    expect(sinErrores({ a: '', b: 'Error' })).toBe(false)
    expect(formatearPrecio(79990)).toBe('$79.990')
  })
})
