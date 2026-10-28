export interface Producto {
  id: string
  nombre: string
  descripcion: string
  categoria: string
  precio: number
  imagen: string
  stock: boolean
  enOferta?: boolean
  precioOferta?: number
}

export type Rol = 'Administrador' | 'Cliente'

export interface Usuario {
  id: string
  nombre: string
  correo: string
  rol: Rol
}

export interface Sesion {
  correo: string
  rol: Rol
}

export interface ItemCarrito {
  producto: Producto
  cantidad: number
}

export interface Novedad {
  id: string
  titulo: string
  resumen: string
  imagen: string
  alt: string
  parrafos: string[]
  subtitulo: string
  lista: string[]
}

export interface FiltrosProducto {
  texto: string
  categoria: string
  soloOfertas: boolean
}

export type Errores<T extends string> = Partial<Record<T, string>>
