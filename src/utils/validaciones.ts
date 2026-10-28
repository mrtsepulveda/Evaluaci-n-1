export const formatoCorreo = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/
export const formatoRun = /^[0-9]+[0-9kK]$/

export function validarObligatorio(valor: string, nombreCampo: string): string {
  return valor.trim() === '' ? `${nombreCampo} es obligatorio.` : ''
}

export function validarTexto(valor: string, nombreCampo: string, maximo: number): string {
  if (valor.trim() === '') return `${nombreCampo} es obligatorio.`
  if (valor.trim().length > maximo) return `${nombreCampo} admite un máximo de ${maximo} caracteres.`
  return ''
}

export function validarCorreo(valor: string): string {
  const correo = valor.trim()
  if (correo === '') return 'El correo es obligatorio.'
  if (correo.length > 100) return 'El correo admite un máximo de 100 caracteres.'
  if (!formatoCorreo.test(correo)) return 'El correo no tiene un formato válido (ejemplo: nombre@dominio.cl).'
  return ''
}

export function validarContrasena(valor: string): string {
  const clave = valor.trim()
  if (clave === '') return 'La contraseña es obligatoria.'
  if (clave.length < 4 || clave.length > 10) return 'La contraseña debe tener entre 4 y 10 caracteres.'
  return ''
}

// dígito verificador con módulo 11
export function validarRun(valor: string): string {
  const run = valor.trim()
  if (run === '') return 'El RUN es obligatorio.'
  if (!formatoRun.test(run)) return 'El RUN debe ir sin puntos ni guion (ejemplo: 123456789).'

  const cuerpo = run.slice(0, -1)
  const dv = run.slice(-1).toUpperCase()
  let suma = 0
  let multiplo = 2
  for (let i = cuerpo.length - 1; i >= 0; i--) {
    suma += multiplo * Number(cuerpo[i])
    multiplo = multiplo < 7 ? multiplo + 1 : 2
  }
  const esperado = 11 - (suma % 11)
  const dvCalculado = esperado === 11 ? '0' : esperado === 10 ? 'K' : String(esperado)
  return dv === dvCalculado ? '' : 'El RUN ingresado no es válido (dígito verificador incorrecto).'
}

export function validarSeleccion(valor: string, mensaje: string): string {
  return valor === '' ? mensaje : ''
}

export function validarPrecio(valor: string, nombreCampo = 'El precio'): string {
  if (valor.trim() === '') return `${nombreCampo} es obligatorio.`
  const numero = Number(valor)
  if (Number.isNaN(numero)) return `${nombreCampo} debe ser un número.`
  if (!Number.isInteger(numero)) return `${nombreCampo} debe ser un número entero (sin decimales).`
  if (numero <= 0) return `${nombreCampo} debe ser mayor que 0.`
  return ''
}

export function validarIdProducto(valor: string): string {
  const id = valor.trim()
  if (id === '') return 'El ID es obligatorio.'
  if (!/^[A-Za-z]{2}[0-9]{3}$/.test(id)) return 'El ID debe tener 2 letras y 3 números (ejemplo: MC999).'
  return ''
}

export function sinErrores(errores: Record<string, string | undefined>): boolean {
  return Object.values(errores).every((mensaje) => !mensaje)
}

export function formatearPrecio(valor: number): string {
  // miles con punto
  return '$' + String(valor).replace(/\B(?=(\d{3})+(?!\d))/g, '.')
}
