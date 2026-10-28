import type { Novedad } from '../types'

export const novedades: Novedad[] = [
  {
    id: 'herramientas-oxidadas',
    titulo: 'Cómo proteger tus herramientas del óxido',
    resumen:
      'No botes tus llaves y alicates antiguos. Con productos desoxidantes, cepillos de acero y un poco de lija puedes recuperar tus herramientas para próximos proyectos.',
    imagen: '/img/oxido.jpg',
    alt: 'Herramientas metálicas con óxido',
    parrafos: [
      'El clima húmedo puede ser uno de los principales enemigos de las herramientas de trabajo, especialmente de aquellas que contienen componentes metálicos expuestos.',
      'Para prolongar su vida útil y mantener un buen rendimiento durante los trabajos, es importante realizar una mantención periódica.',
    ],
    subtitulo: 'Recomendaciones',
    lista: [
      'Limpieza constante: limpia las herramientas después de utilizarlas con un paño seco para retirar polvo, humedad y restos de materiales.',
      'Lubricación: aplica una pequeña cantidad de aceite protector en las piezas metálicas y mecanismos que lo requieran.',
      'Almacenamiento adecuado: guarda las herramientas en un lugar seco y, cuando sea posible, utiliza cajas o contenedores que las protejan de la humedad.',
    ],
  },
  {
    id: 'stock-pvc',
    titulo: 'Llegó el nuevo stock de tuberías PVC',
    resumen:
      'Nos preparamos para la temporada de construcciones y reparaciones con nuevas tuberías de diferentes medidas, ideales para gasfitería y proyectos de contratistas.',
    imagen: '/img/tuberias.jpg',
    alt: 'Stock de tuberías y conexiones PVC',
    parrafos: [
      'Sabemos que nuestros clientes contratistas necesitan contar con disponibilidad de materiales para poder desarrollar sus trabajos y proyectos.',
      'Por este motivo hemos renovado y ampliado nuestro inventario correspondiente a productos de gasfitería.',
    ],
    subtitulo: 'Productos disponibles',
    lista: [
      'Tuberías de PVC hidráulico en diferentes medidas.',
      'Tuberías de PVC sanitario para instalaciones y sistemas de evacuación.',
      'Codos, coplas, tee y diferentes conexiones.',
      'Adhesivos y productos relacionados con instalaciones de PVC.',
    ],
  },
]
