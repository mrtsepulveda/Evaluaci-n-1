export function leerAlmacenado<T>(clave: string): T | null {
  try {
    const texto = localStorage.getItem(clave)
    return texto === null ? null : (JSON.parse(texto) as T)
  } catch {
    return null
  }
}

export function guardarAlmacenado(clave: string, valor: unknown): void {
  try {
    localStorage.setItem(clave, JSON.stringify(valor))
  } catch {
    // si no hay localStorage, sigue en memoria
  }
}

export function borrarAlmacenado(clave: string): void {
  try {
    localStorage.removeItem(clave)
  } catch {
    // se ignora
  }
}
