# ERS - Requerimientos de la Evaluación 2

Este documento agrega los requerimientos de la EP2 al ERS de la EP1. Los requerimientos anteriores se mantienen.

## Requerimientos no funcionales

- RNF-01: la aplicación usa React, Vite y TypeScript.
- RNF-02: la interfaz es responsiva (móvil, tableta y computador) con Bootstrap.
- RNF-03: los componentes se organizan con Atomic Design.
- RNF-04: se usa el patrón Container/Presentational: las páginas manejan el estado y los componentes reciben props tipadas.
- RNF-05: el estado se maneja con useState y los formularios son controlados.
- RNF-06: la navegación usa React Router, con rutas con parámetro (/productos/:id y /novedades/:id).
- RNF-07: las pruebas usan Vitest, React Testing Library y jsdom (mínimo 15).

## Requerimientos funcionales

- RF-01: migrar las páginas HTML a componentes React.
- RF-02: mostrar productos destacados en el inicio.
- RF-03: mostrar el catálogo completo (85 productos).
- RF-04: filtrar productos por texto, categoría y ofertas.
- RF-05: ver el detalle de un producto según el ID de la URL.
- RF-06: agregar y quitar productos del carrito y pagar con confirmación. Un producto sin stock no se puede agregar.
- RF-07: registrar usuarios validando RUN, correo, región, comuna y campos obligatorios.
- RF-08: iniciar y cerrar sesión; el menú cambia según la sesión.
- RF-09: enviar mensajes de contacto con validación.
- RF-10: ver las novedades y su detalle.
- RF-11: CRUD de productos para el administrador (crear, listar, editar, eliminar y cambiar stock).
- RF-12: CRUD de usuarios para el administrador.
- RF-13: solo el rol Administrador entra a /admin; los demás van al login.
- RF-14: mostrar una página 404 en rutas que no existen.

## Reglas de validación

- Correo: obligatorio, máximo 100 caracteres y con formato válido. Cada caso muestra su propio mensaje.
- Contraseña: obligatoria, entre 4 y 10 caracteres.
- RUN: sin puntos ni guion y con dígito verificador válido.
- Nombre, apellidos, dirección y comentario: obligatorios, con un largo máximo.
- ID de producto: 2 letras y 3 números (por ejemplo MC999) y no se puede repetir.
- Precio: número entero mayor que 0. El precio de oferta es opcional y debe ser menor al precio normal.

## Datos

Los archivos src/data/productosDB.ts y src/data/usuariosDB.ts guardan los registros en memoria y en localStorage. Tienen las funciones crear, obtener, actualizar y eliminar.
