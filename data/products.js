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

  {
    id: 9,
    nombre: 'AMD Ryzen 7 5700X',
    precio: 356390,
    categoria: 'Procesador',

    descripcion:
      'Procesador AMD Ryzen 7 5700X para socket AM4, sin cooler incluido. Precio de referencia según publicación de Compra Gamer consultada el 30/10/2026; puede variar.',

    caracteristicas: [
      '8 núcleos y 16 hilos',
      'Socket AM4',
      'Frecuencia turbo de hasta 4.6 GHz',
      'No incluye cooler',
    ],

    stock: null,

    imagen: {
      uri: 'https://imagenes.compragamer.com/productos/compragamer_Imganen_general_31690_Procesador_AMD_Ryzen_7_5700X_4.6GHz_Turbo_AM4_-_No_incluye_Cooler_df22f6d7-grn.jpg',
    },
  },

  {
    id: 10,
    nombre: 'Intel Core i5-12400F',
    precio: 248157,
    categoria: 'Procesador',

    descripcion:
      'Procesador Intel Core i5-12400F de 12.ª generación para socket LGA 1700. Precio de referencia según publicación de Compra Gamer consultada el 30/10/2026; puede variar.',

    caracteristicas: [
      '6 núcleos y 12 hilos',
      'Socket LGA 1700',
      'Frecuencia turbo de hasta 4.4 GHz',
      'Modelo F, sin gráficos integrados',
    ],

    stock: null,

    imagen: {
      uri: 'https://imagenes.compragamer.com/productos/compragamer_Imganen_general_49120_Procesador_Intel_Core_i5_12400F_4.4GHz_Turbo_Socket_1700_Alder_Lake_d61e2fc4-grn.jpg',
    },
  },

  {
    id: 11,
    nombre: 'Gigabyte Radeon RX 7600 Gaming OC 8 GB',
    precio: 578700,
    categoria: 'Placa de video',

    descripcion:
      'Placa de video Gigabyte Radeon RX 7600 Gaming OC con 8 GB de memoria GDDR6. Precio de referencia según publicación de Compra Gamer consultada el 30/10/2026; puede variar.',

    caracteristicas: [
      'GPU AMD Radeon RX 7600',
      '8 GB de memoria GDDR6',
      'Edición Gaming OC de Gigabyte',
    ],

    stock: null,

    imagen: {
      uri: 'https://imagenes.compragamer.com/productos/compragamer_Imganen_general_55457_Placa_de_Video_Gigabyte_Radeon_RX_7600_8GB_GDDR6_Gaming_OC_1366bfa2-grn.jpg',
    },
  },

  {
    id: 12,
    nombre: 'Gigabyte GeForce RTX 3060 Gaming OC 12 GB',
    precio: 972300,
    categoria: 'Placa de video',

    descripcion:
      'Placa de video Gigabyte GeForce RTX 3060 Gaming OC con 12 GB de memoria GDDR6. Precio de referencia según publicación de Compra Gamer consultada el 30/10/2026; puede variar.',

    caracteristicas: [
      'GPU NVIDIA GeForce RTX 3060',
      '12 GB de memoria GDDR6',
      'Edición Gaming OC de Gigabyte',
    ],

    stock: null,

    imagen: {
      uri: 'https://imagenes.compragamer.com/productos/compragamer_Imganen_general_27875_Placa_de_Video_Gigabyte_GeForce_RTX_3060_12GB_GDDR6_GAMING_OC_e01b9b9b-grn.jpg',
    },
  },

  {
    id: 13,
    nombre: 'ASRock B650 Pro RS WiFi',
    precio: 271772,
    categoria: 'Motherboard',

    descripcion:
      'Placa madre ASRock B650 Pro RS WiFi para procesadores AMD Ryzen con socket AM5. Precio de referencia según publicación de Compra Gamer consultada el 30/10/2026; puede variar.',

    caracteristicas: [
      'Chipset AMD B650',
      'Socket AM5',
      'Compatible con memoria DDR5',
      'Conectividad Wi-Fi integrada',
    ],

    stock: null,

    imagen: {
      uri: 'https://imagenes.compragamer.com/productos/compragamer_Imganen_general_50487_Mother_Asrock_B650_PRO_RS_WIFI_AM5_DDR5_c18db381-grn.jpg',
    },
  },

  {
    id: 14,
    nombre: 'KLEVV Bolt V DDR5 32 GB (2 x 16 GB) 6400 MHz CL30',
    precio: 930950,
    categoria: 'Memoria RAM',

    descripcion:
      'Kit KLEVV Bolt V de dos módulos DDR5 de 16 GB, con frecuencia publicada de 6400 MHz y latencia CL30. Precio de referencia según publicación de Compra Gamer consultada el 30/10/2026; puede variar.',

    caracteristicas: [
      '32 GB en kit de 2 x 16 GB',
      'Tecnología DDR5',
      'Frecuencia de 6400 MHz',
      'Latencia CL30',
    ],

    stock: null,

    imagen: {
      uri: 'https://imagenes.compragamer.com/productos/compragamer_Imganen_general_56279_Memoria_KLEVV_DDR5_32GB__2X16GB__6400MHz_BOLT_V_CL30_18325e9a-grn.jpg',
    },
  },

  {
    id: 15,
    nombre: 'SanDisk SSD Plus SATA 1 TB',
    precio: 243900,
    categoria: 'Almacenamiento',

    descripcion:
      'Unidad de estado sólido SanDisk SSD Plus de 1 TB con interfaz SATA. La publicación informa una velocidad de hasta 545 MB/s. Precio de referencia según publicación de Compra Gamer consultada el 30/10/2026; puede variar.',

    caracteristicas: [
      'Capacidad de 1 TB',
      'Interfaz SATA',
      'Velocidad publicada de hasta 545 MB/s',
      'Formato de 2.5 pulgadas',
    ],

    stock: null,

    imagen: {
      uri: 'https://imagenes.compragamer.com/productos/compragamer_Imganen_general_59425_Disco_S__lido_SSD_Sandisk_1TB_Plus_SATA_545MB_s_eeddaef8-grn.jpg',
    },
  },

  {
    id: 16,
    nombre: 'DeepCool PL750D 750 W 80 Plus Bronze',
    precio: 96150,
    categoria: 'Fuente de poder',

    descripcion:
      'Fuente DeepCool PL750D de 750 W con certificación 80 Plus Bronze y compatibilidad ATX 3.1 / PCIe 5.1. Precio de referencia según publicación de Compra Gamer consultada el 30/10/2026; puede variar.',

    caracteristicas: [
      'Potencia de 750 W',
      'Certificación 80 Plus Bronze',
      'Estándar ATX 3.1',
      'Compatibilidad PCIe 5.1',
    ],

    stock: null,

    imagen: {
      uri: 'https://imagenes.compragamer.com/productos/compragamer_Imganen_general_47949_Fuente_Deepcool_750W_80_Plus_Bronze_PL750D_ATX_3.1_PCIe_5.1_834900f8-grn.jpg',
    },
  },

  {
    id: 17,
    nombre: 'Cooler Master MasterLiquid 360L Core II ARGB',
    precio: 132100,
    categoria: 'Refrigeración',

    descripcion:
      'Sistema de refrigeración líquida Cooler Master MasterLiquid 360L Core II con iluminación ARGB. Precio de referencia según publicación de Compra Gamer consultada el 30/10/2026; puede variar.',

    caracteristicas: [
      'Refrigeración líquida para CPU',
      'Radiador de 360 mm',
      'Iluminación ARGB',
    ],

    stock: null,

    imagen: {
      uri: 'https://imagenes.compragamer.com/productos/compragamer_Imganen_general_45031_Cooler_CPU_Cooler_Master_MasterLiquid_360L_Core_II_ARGB_Water_Cooler_0b4e2547-grn.jpg',
    },
  },

  {
    id: 18,
    nombre: 'Monitor KTC 27DQ721 27" QHD 144 Hz',
    precio: 272600,
    categoria: 'Monitor',

    descripcion:
      'Monitor gamer KTC 27DQ721 de 27 pulgadas con resolución QHD, panel HVA y frecuencia de actualización de 144 Hz. Precio de referencia según publicación de Compra Gamer consultada el 30/10/2026; puede variar.',

    caracteristicas: [
      'Pantalla de 27 pulgadas',
      'Resolución QHD 2560 x 1440',
      'Panel HVA',
      'Frecuencia de actualización de 144 Hz',
      'FreeSync Premium y G-SYNC',
    ],

    stock: null,

    imagen: {
      uri: 'https://imagenes.compragamer.com/productos/compragamer_Imganen_general_56813_Monitor_Gamer_KTC_27DQ721_27__QHD_1440p_HVA_144Hz_FreeSync_Premium_G-SYNC_2acd3bb4-grn.jpg',
    },
  },

  {
    id: 19,
    nombre: 'Teclado mecánico Redragon K617CT Fizz 60% RGB',
    precio: 50100,
    categoria: 'Teclado',

    descripcion:
      'Teclado mecánico Redragon K617CT Fizz con formato compacto 60% e iluminación RGB. Precio de referencia según publicación de Compra Gamer consultada el 30/10/2026; puede variar.',

    caracteristicas: [
      'Formato compacto 60%',
      'Teclas mecánicas',
      'Iluminación RGB',
      'Conexión USB-C',
    ],

    stock: null,

    imagen: {
      uri: 'https://imagenes.compragamer.com/productos/compragamer_Imganen_general_45135_Teclado_Mecanico_Redragon_K617CT_Fizz_60__RGB__29faaeb8-grn.jpg',
    },
  },

  {
    id: 20,
    nombre: 'Mouse Logitech M170 Wireless Black',
    precio: 11100,
    categoria: 'Mouse',

    descripcion:
      'Mouse inalámbrico Logitech M170 en color negro. Precio de referencia según publicación de Compra Gamer consultada el 30/10/2026; puede variar.',

    caracteristicas: [
      'Conexión inalámbrica',
      'Color negro',
      'Modelo Logitech M170',
    ],

    stock: null,

    imagen: {
      uri: 'https://imagenes.compragamer.com/productos/compragamer_Imganen_general_9651_Mouse_Logitech_M170_Wireless_Black_6cd1946e-grn.jpg',
    },
  },
];