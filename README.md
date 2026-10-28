# Ferretería Los Maestros - Evaluación Parcial 2 (DSY1104)

Proyecto de la ferretería migrado a React, Vite y TypeScript, con Bootstrap, React Router y pruebas con Vitest.

## Cómo ejecutarlo

```
npm install
npm run dev
npm run build
npm run test:run
npm run coverage
```

Para probar el login sirve cualquier contraseña de 4 a 10 caracteres:
- admin@losmaestros.cl entra como Administrador y puede usar /admin
- valentina@test.cl entra como Cliente

## Estructura

```
src/
  types/        interfaces de TypeScript
  data/         datos simulados con CRUD, sesión y carrito
  utils/        validaciones de formularios
  components/   atoms, molecules y organisms
  templates/    plantillas del sitio y del admin, y la ruta protegida
  pages/        una página por ruta
```

Algunos componentes se reutilizan en varias partes: TarjetaProducto (inicio y catálogo), BuscadorProductos (catálogo y admin), BarraNavegacion (sitio y admin) y los campos de formulario (los 5 formularios).

## Patrón de diseño

Usamos Container/Presentational. Las páginas son los contenedores: guardan el estado con useState y llaman a los datos. Los componentes solo reciben props y muestran la interfaz. Los formularios guardan sus campos y, cuando son válidos, le pasan los datos a la página con una función.

Los archivos de src/data funcionan como la base de datos simulada y son los únicos que usan localStorage.

## Rutas

- / inicio
- /catalogo catálogo con filtros y carrito
- /productos/:id detalle de un producto
- /novedades y /novedades/:id
- /nosotros, /contacto, /login, /registro, /perfil
- /admin, /admin/productos, /admin/usuarios (solo administrador)

## Documentos

- docs/ERS_EP2.md: requerimientos de la EP2
- docs/TESTING.md: documento de testing
