import { useState, type FormEvent } from 'react'
import type { Producto } from '../../types'
import { sinErrores, validarIdProducto, validarPrecio, validarTexto } from '../../utils/validaciones'
import Boton from '../atoms/Boton'
import CampoAreaTexto from '../molecules/CampoAreaTexto'
import CampoTexto from '../molecules/CampoTexto'

interface FormularioProductoProps {
  productoEditar: Producto | null
  onGuardar: (producto: Producto, esEdicion: boolean) => void
  onCancelar: () => void
  errorGeneral?: string
}

interface ValoresProducto {
  id: string
  nombre: string
  categoria: string
  descripcion: string
  precio: string
  precioOferta: string
  imagen: string
  stock: boolean
}

type CampoProducto = Exclude<keyof ValoresProducto, 'stock'>

function valoresIniciales(producto: Producto | null): ValoresProducto {
  if (!producto) {
    return { id: '', nombre: '', categoria: '', descripcion: '', precio: '', precioOferta: '', imagen: '', stock: true }
  }
  return {
    id: producto.id,
    nombre: producto.nombre,
    categoria: producto.categoria,
    descripcion: producto.descripcion,
    precio: String(producto.precio),
    precioOferta: producto.enOferta && producto.precioOferta !== undefined ? String(producto.precioOferta) : '',
    imagen: producto.imagen,
    stock: producto.stock,
  }
}

function FormularioProducto({ productoEditar, onGuardar, onCancelar, errorGeneral }: FormularioProductoProps) {
  const esEdicion = productoEditar !== null
  const [valores, setValores] = useState<ValoresProducto>(valoresIniciales(productoEditar))
  const [errores, setErrores] = useState<Partial<Record<CampoProducto, string>>>({})

  const cambiar = (campo: CampoProducto) => (valor: string) => setValores({ ...valores, [campo]: valor })

  const manejarEnvio = (evento: FormEvent) => {
    evento.preventDefault()
    const nuevos: Partial<Record<CampoProducto, string>> = {
      id: validarIdProducto(valores.id),
      nombre: validarTexto(valores.nombre, 'El nombre', 100),
      categoria: validarTexto(valores.categoria, 'La categoría', 50),
      descripcion: validarTexto(valores.descripcion, 'La descripción', 300),
      precio: validarPrecio(valores.precio),
    }
    // la oferta es opcional, pero debe ser menor al precio
    if (valores.precioOferta.trim() !== '') {
      let errorOferta = validarPrecio(valores.precioOferta, 'El precio de oferta')
      if (errorOferta === '' && !nuevos.precio && Number(valores.precioOferta) >= Number(valores.precio)) {
        errorOferta = 'El precio de oferta debe ser menor al precio normal.'
      }
      nuevos.precioOferta = errorOferta
    }
    setErrores(nuevos)
    if (!sinErrores(nuevos)) return

    const tieneOferta = valores.precioOferta.trim() !== ''
    const producto: Producto = {
      id: valores.id.trim().toUpperCase(),
      nombre: valores.nombre.trim(),
      categoria: valores.categoria.trim(),
      descripcion: valores.descripcion.trim(),
      precio: Number(valores.precio),
      imagen: valores.imagen.trim() === '' ? '/img/logo_maestros.jpg' : valores.imagen.trim(),
      stock: valores.stock,
      enOferta: tieneOferta,
      precioOferta: tieneOferta ? Number(valores.precioOferta) : undefined,
    }
    onGuardar(producto, esEdicion)
  }

  return (
    <form onSubmit={manejarEnvio} noValidate aria-label="Formulario de producto">
      {errorGeneral && (
        <div className="alert alert-danger" role="alert">
          {errorGeneral}
        </div>
      )}
      <CampoTexto id="idProducto" etiqueta="ID del producto (Ej: MC999)" valor={valores.id} onCambio={cambiar('id')} error={errores.id} deshabilitado={esEdicion} />
      <CampoTexto id="nombreProducto" etiqueta="Nombre" valor={valores.nombre} onCambio={cambiar('nombre')} error={errores.nombre} />
      <CampoTexto id="categoriaProducto" etiqueta="Categoría" valor={valores.categoria} onCambio={cambiar('categoria')} error={errores.categoria} />
      <CampoAreaTexto id="descripcionProducto" etiqueta="Descripción" valor={valores.descripcion} onCambio={cambiar('descripcion')} error={errores.descripcion} filas={3} />
      <CampoTexto id="precioProducto" etiqueta="Precio" tipo="number" valor={valores.precio} onCambio={cambiar('precio')} error={errores.precio} />
      <CampoTexto id="precioOfertaProducto" etiqueta="Precio de oferta (opcional)" tipo="number" valor={valores.precioOferta} onCambio={cambiar('precioOferta')} error={errores.precioOferta} />
      <CampoTexto id="imagenProducto" etiqueta="URL de la imagen (opcional)" valor={valores.imagen} onCambio={cambiar('imagen')} />
      <div className="form-check mb-3">
        <input id="stockProducto" type="checkbox" className="form-check-input" checked={valores.stock} onChange={(e) => setValores({ ...valores, stock: e.target.checked })} />
        <label htmlFor="stockProducto" className="form-check-label">
          Disponible en stock
        </label>
      </div>
      <div className="d-flex gap-2">
        <Boton type="submit">{esEdicion ? 'Actualizar producto' : 'Guardar en catálogo'}</Boton>
        {esEdicion && (
          <Boton variante="secondary" onClick={onCancelar}>
            Cancelar
          </Boton>
        )}
      </div>
    </form>
  )
}

export default FormularioProducto
