# Documento de testing - EP2

## Herramientas y comandos

Se usó Vitest con React Testing Library, user-event, jest-dom y jsdom. La configuración está en vite.config.ts y en src/test/setup.ts (limpia el DOM y el localStorage después de cada prueba).

- npm run test:run: ejecuta todas las pruebas una vez
- npm test: modo observador
- npm run coverage: ejecuta las pruebas y genera la cobertura en la carpeta coverage y los resultados en reports

## Pruebas realizadas (89 en 17 archivos)

- utils/validaciones.test.ts (7): mensajes de error de correo, RUN, contraseña, texto, precio e ID.
- data/productosDB.test.ts (12): CRUD de productos y filtros de búsqueda.
- data/usuariosDB.test.ts (5): CRUD de usuarios y correo repetido.
- data/carrito.test.ts (4): agregar, quitar, producto sin stock y total con oferta.
- Boton (3), CampoTexto (3), TarjetaProducto (5), BuscadorProductos (3): render, props y eventos.
- GrillaProductos (2): que la lista muestre todos los productos y el mensaje cuando está vacía.
- Formularios de contacto, login, registro y producto (14): errores solo al enviar, mensaje específico y envío válido.
- pages/Catalogo.test.tsx (6): 85 productos, filtros, sin resultados y botón agregar.
- pages/AdminProductos.test.tsx (8): CRUD completo en la interfaz.
- pages/AdminUsuarios.test.tsx (5): CRUD de usuarios y buscador.
- App.test.tsx (12): rutas con parámetro, 404, rutas protegidas, login, logout y carrito.

## Mocks y espías

- vi.fn() para revisar que los componentes llaman a las funciones que reciben por props y con qué datos.
- vi.spyOn(window, 'confirm') para simular que el usuario acepta o cancela al eliminar o pagar.
- MemoryRouter para probar las rutas sin un navegador.

## Archivos de la cobertura

- Incluidos: todo src/**/*.ts y *.tsx.
- Excluidos: main.tsx, la carpeta test, los archivos de prueba, la carpeta types y vite-env.d.ts.

## Resultados

Ejecutado con `npm run test:run` y `npm run coverage` (Vitest 3.2.7, v8).

- Archivos de prueba: 17 aprobados de 17
- Pruebas: 89 aprobadas de 89, 0 fallidas
- Duración: unos 10 segundos

Cobertura total (All files):

| Statements | Branches | Functions | Lines |
|---|---|---|---|
| 93,68 % | 90,12 % | 87,05 % | 93,68 % |

Cobertura por carpeta (statements):

| Carpeta | Cobertura |
|---|---|
| src (App) | 100 % |
| components/atoms | 100 % |
| components/molecules | 92,25 % |
| components/organisms | 96,96 % |
| data | 98,54 % |
| pages | 76,01 % |
| templates | 96,61 % |
| utils | 96,77 % |

Los reportes completos quedan en coverage/index.html y reports/html/index.html.

## Análisis de la cobertura

Archivos con cobertura baja:

- Nosotros.tsx (4 %), Admin.tsx (13 %), Novedades.tsx (16 %), TarjetaNovedad.tsx (14 %), Contacto.tsx (21 %) y Registro.tsx (19 %): son páginas que casi no se renderizan en las pruebas. Nosotros, Admin y Novedades solo muestran contenido. Contacto y Registro sí tienen lógica, pero se probó su formulario (FormularioContacto y FormularioRegistro, con 100 % y 96 %) y no la página completa.
- NovedadDetalle.tsx (81 %): se probó el caso con una novedad que existe, pero no el de una que no existe.
- almacenamiento.ts (80 %): no se probó qué pasa cuando localStorage no está disponible (los bloques catch).
- productosDB.ts (90 %): no se probó la parte que cambia el logo genérico guardado por la foto nueva (líneas 15 a 21).
- TablaProductos.tsx y TablaUsuarios.tsx (91 % y 90 %): falta probar el mensaje cuando la tabla está vacía.
- usuariosDB.ts (93 %): falta probar actualizar un usuario que no existe o con un correo repetido.

Los puntos más importantes del proyecto (CRUD, filtros, formularios con validaciones, rutas, carrito y sesión) están sobre el 90 %.

Cobertura no es lo mismo que calidad. La cobertura solo dice qué líneas se ejecutaron en las pruebas, no si se comprobó que hicieran lo correcto. Por eso cada prueba termina con un expect sobre un resultado concreto, por ejemplo la cantidad de filas de la tabla, el texto del mensaje de error o los datos con los que se llamó una función. Una prueba sin expect subiría la cobertura sin comprobar nada.

## Pendientes y límites

- Agregar pruebas para las páginas Registro, Contacto, Novedades y Nosotros, para el caso de una novedad inexistente y para el mensaje de tabla vacía.
- Agregar pruebas para localStorage no disponible y para actualizar un usuario que no existe.
- No se probó el botón hamburguesa de la barra ni la adaptación a distintos tamaños de pantalla. La responsividad se revisó a mano en el navegador.
- Las pruebas se hicieron con jsdom, que no es un navegador real: no se prueba cómo se ve la página, solo su comportamiento.
