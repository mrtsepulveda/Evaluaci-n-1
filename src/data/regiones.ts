export interface Region {
  nombre: string
  comunas: string[]
}

export const regiones: Region[] = [
  { nombre: 'Coquimbo', comunas: ['La Serena', 'Coquimbo', 'Vicuña', 'Ovalle'] },
  { nombre: 'Valparaíso', comunas: ['Valparaíso', 'Viña del Mar', 'Quilpué'] },
  { nombre: 'Metropolitana', comunas: ['Santiago', 'Quilicura', 'Maipú', 'Puente Alto'] },
]
