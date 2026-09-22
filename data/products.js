export const productos = [
  {
    id: 1,
    nombre: 'RTX 4060',
    precio: 549900,
    categoria: 'Placa de video',

    descripcion:
      'La NVIDIA GeForce RTX 4060 es una placa de video pensada para gaming en 1080p y aplicaciones que requieren rendimiento gráfico.',

    caracteristicas: [
      '8 GB de memoria GDDR6',
      'Arquitectura NVIDIA Ada Lovelace',
      'Ray Tracing',
      'DLSS 3',
      'PCI Express 4.0',
    ],

    stock: 12,

    imagen: require('../assets/rtx4060.jpg'),
  },

  {
    id: 2,
    nombre: 'Ryzen 5 5600',
    precio: 189900,
    categoria: 'Procesador',

    descripcion:
      'Procesador AMD Ryzen 5 5600 de 6 núcleos y 12 hilos, ideal para equipos gaming y computadoras de uso general.',

    caracteristicas: [
      '6 núcleos',
      '12 hilos',
      'Socket AM4',
      'Hasta 4.4 GHz',
      'Arquitectura Zen 3',
    ],

    stock: 8,

    imagen: require('../assets/ryzen5.jpg'),
  },

  {
    id: 3,
    nombre: 'Motherboard B550',
    precio: 159900,
    categoria: 'Motherboard',

    descripcion:
      'Placa madre con chipset B550 compatible con procesadores AMD Ryzen y preparada para equipos de escritorio de alto rendimiento.',

    caracteristicas: [
      'Chipset AMD B550',
      'Socket AM4',
      'Compatible con DDR4',
      'PCI Express 4.0',
      'Ranura M.2 NVMe',
    ],

    stock: 6,

    imagen: require('../assets/b550.jpg'),
  },

  {
    id: 4,
    nombre: 'RAM DDR4 16 GB',
    precio: 69900,
    categoria: 'Memoria RAM',

    descripcion:
      'Memoria RAM DDR4 de 16 GB pensada para mejorar la capacidad de respuesta y el rendimiento general del equipo.',

    caracteristicas: [
      '16 GB de capacidad',
      'Tecnología DDR4',
      'Formato DIMM',
      'Alta velocidad de transferencia',
      'Ideal para gaming y trabajo',
    ],

    stock: 15,

    imagen: require('../assets/ram16.jpg'),
  },

  {
    id: 5,
    nombre: 'SSD NVMe 1 TB',
    precio: 99900,
    categoria: 'Almacenamiento',

    descripcion:
      'Unidad SSD NVMe de 1 TB que permite almacenar juegos, programas y archivos ofreciendo velocidades superiores a un disco rígido tradicional.',

    caracteristicas: [
      '1 TB de capacidad',
      'Interfaz NVMe',
      'Formato M.2',
      'Alta velocidad de lectura',
      'Alta velocidad de escritura',
    ],

    stock: 10,

    imagen: require('../assets/ssd1tb.jpg'),
  },

  {
    id: 6,
    nombre: 'Fuente 650W',
    precio: 89900,
    categoria: 'Fuente de poder',

    descripcion:
      'Fuente de alimentación de 650W diseñada para alimentar equipos de escritorio y configuraciones gaming.',

    caracteristicas: [
      'Potencia de 650W',
      'Formato ATX',
      'Protecciones eléctricas',
      'Conectores para GPU',
      'Compatible con PCs gaming',
    ],

    stock: 9,

    imagen: require('../assets/fuente650.jpg'),
  },

  {
    id: 7,
    nombre: 'Gabinete Gamer',
    precio: 119900,
    categoria: 'Gabinete',

    descripcion:
      'Gabinete gamer con espacio para componentes de alto rendimiento y diseño orientado a una buena ventilación.',

    caracteristicas: [
      'Formato ATX',
      'Panel lateral transparente',
      'Espacio para GPU de gran tamaño',
      'Compatibilidad con varios ventiladores',
      'Diseño gamer',
    ],

    stock: 7,

    imagen: require('../assets/gabinete.jpg'),
  },

  {
    id: 8,
    nombre: 'Monitor 24"',
    precio: 219900,
    categoria: 'Monitor',

    descripcion:
      'Monitor de 24 pulgadas pensado para gaming, estudio y trabajo diario, con un tamaño cómodo para escritorios.',

    caracteristicas: [
      'Pantalla de 24 pulgadas',
      'Resolución Full HD',
      'Panel LED',
      'Entrada HDMI',
      'Entrada DisplayPort',
    ],

    stock: 5,

    imagen: require('../assets/monitor24.jpg'),
  },
];