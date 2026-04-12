export type ProductCategory =
  | "autoelevadores"
  | "transpaletas"
  | "apiladores"
  | "limpieza"
  | "plataformas";

export const CATEGORY_LABEL: Record<ProductCategory, string> = {
  autoelevadores: "Autoelevadores",
  transpaletas: "Transpaletas / Zorras",
  apiladores: "Apiladores",
  plataformas: "Plataformas",
  limpieza: "Limpieza",
};

export type Product = {
  id: string;
  name: string;
  description: string;
  features: string[];
  category: ProductCategory;
  images: string[];
};

export const PRODUCTS: Product[] = [
  // ================= AUTOELEVADORES =================
  {
    id: "FD25-30",
    name: "Autoelevador diésel 2.5 - 3 toneladas",
    description:
      "Autoelevador diésel robusto y versátil, ideal para tareas exigentes de carga y movimiento de mercadería en depósitos, industrias y operaciones logísticas.",
    features: [
      "MOTOR XINCHAI C490",
      "MASTIL TRIPLE 4.7m",
      "DESPLAZADOR LATERAL CASCADE",
      "ASIENTO ERGONOMICO",
      "CUBIERTAS NEUMATICAS",
    ],
    category: "autoelevadores",
    images: [
      "/categorias/autoelevadores/023.jpg",
      "/categorias/autoelevadores/022.jpg",
      "/categorias/autoelevadores/026.jpg",
    ],
  },
  {
    id: "FLB25",
    name: "Autoelevador eléctrico 2.5 toneladas",
    description:
      "Autoelevador eléctrico de alto rendimiento, pensado para operaciones intensivas con excelente maniobrabilidad, bajo mantenimiento y gran eficiencia energética.",
    features: [
      "BATERIA LITIO 80v410A CARGADOR 150A",
      "MASTIL TRIPLE 4.7m",
      "DESPLAZADOR LATERAL CASCADE",
      "ASIENTO ERGONOMICO",
      "CUBIERTAS NEUMATICAS",
    ],
    category: "autoelevadores",
    images: [
      "/categorias/autoelevadores/FLB25 35M1 -1.jpg",
      "/categorias/autoelevadores/FLB25 35M1 -2.jpg",
      "/categorias/autoelevadores/FLB25 35M1 -3.jpg",
    ],
  },
  {
    id: "FTB18",
    name: "Autoelevador eléctrico 1.8 toneladas",
    description:
      "Autoelevador eléctrico compacto y eficiente, ideal para interiores, depósitos y espacios donde se necesita precisión, autonomía y maniobras ágiles.",
    features: [
      "BATERIA LITIO 48v410A CARGADOR 200A",
      "MASTIL TRIPLE 4.7m",
      "DESPLAZADOR LATERAL CASCADE",
      "ASIENTO ERGONOMICO",
      "CUBIERTAS NEUMATICAS",
    ],
    category: "autoelevadores",
    images: [
      "/categorias/autoelevadores/FTB18-1.jpg",
      "/categorias/autoelevadores/FTB18-2.jpg",
      "/categorias/autoelevadores/FTB18-3.jpg",
    ],
  },

  // ================= TRANSPALETAS =================
  {
    id: "CTS20S",
    name: "Transpaleta con balanza 2 toneladas",
    description:
      "Transpaleta manual con balanza digital integrada, ideal para pesar y trasladar pallets en una sola operación, optimizando tiempos en depósitos y logística.",
    features: [
      "ELEVACION MAX. 190mm",
      "PESO 85kg",
      "DIST. EXT. UÑAS 685mm",
      "RUEDAS DE PU",
      "HORQUILLAS 1150x170mm",
    ],
    category: "transpaletas",
    images: ["/categorias/transpaletas/CTS20S.jpeg"],
  },
  {
    id: "CTX30Q",
    name: "Transpaleta eléctrica 3 toneladas",
    description:
      "Transpaleta eléctrica industrial diseñada para trabajos intensivos, con gran capacidad de carga y excelente desempeño en depósitos y centros logísticos.",
    features: [
      "BATERIA LITIO 48v30A CARGADOR 8A",
      "ELEVACION MAX. 200mm",
      "PESO 160kg",
      "RADIO DE GIRO 1.6m",
      "DIST. EXT. UÑAS 685mm",
      "RUEDAS DE PU",
    ],
    category: "transpaletas",
    images: ["/categorias/transpaletas/20.jpeg"],
  },
  {
    id: "CTS20-30",
    name: "Transpaleta manual 2 - 3 toneladas",
    description:
      "Transpaleta hidráulica manual robusta y confiable, ideal para el movimiento diario de pallets en comercios, depósitos y operaciones logísticas.",
    features: [
      "ELEVACION MAX. 195mm",
      "PESO 70-75kg",
      "DIST. EXT. UÑAS 685mm",
      "RUEDAS DE PU",
      "HORQUILLAS 1200x170mm",
    ],
    category: "transpaletas",
    images: ["/categorias/transpaletas/CTS20_30.jpeg"],
  },

  // ================= APILADORES =================
  {
    id: "DGX15",
    name: "Apilador eléctrico 1500kg",
    description:
      "Apilador eléctrico ideal para tareas de elevación y traslado de carga en depósitos, con muy buen equilibrio entre capacidad, altura de trabajo y maniobrabilidad.",
    features: [
      "ALT. ELEVACION 3.5m",
      "BATERIA LITIO 48v60A CARGADOR 8A",
      "CENTRO DE CARGA 550mm",
      "PESO 500kg",
      "DIST. EXT. UÑAS 685mm",
      "RUEDAS DE PU",
    ],
    category: "apiladores",
    images: ["/categorias/apiladores/DGX15_20.jpeg"],
  },
  {
    id: "DGX20-35",
    name: "Apilador eléctrico 2000kg",
    description:
      "Apilador eléctrico de mayor capacidad, pensado para operaciones intensivas que requieren seguridad, estabilidad y eficiencia en el manejo de mercadería.",
    features: [
      "ALT. ELEVACION 3.5m",
      "BATERIA LITIO 48v60A CARGADOR 8A",
      "CENTRO DE CARGA 550mm",
      "PESO 550kg",
      "DIST. EXT. UÑAS 685mm",
      "RUEDAS DE PU",
    ],
    category: "apiladores",
    images: ["/categorias/apiladores/DGX15_20.jpeg"],
  },
  {
    id: "DGXZ20R",
    name: "Apilador eléctrico 2000kg",
    description:
      "Apilador eléctrico retráctil ideal para trabajo en altura y pasillos de depósito, ofreciendo precisión, aprovechamiento del espacio y gran capacidad operativa.",
    features: [
      "ALT. ELEVACION 4.5m",
      "BATERIA LITIO 48v120A CARGADOR 30A",
      "CENTRO DE CARGA 535mm",
      "PESO 2000kg",
      "DIST. EXT. UÑAS 685mm",
      "RUEDAS DE PU",
    ],
    category: "apiladores",
    images: ["/categorias/apiladores/DGXZ20R.jpeg"],
  },
  {
    id: "CT10",
    name: "Apilador semi eléctrico 1000kg",
    description:
      "Apilador semi eléctrico compacto, práctico y funcional para tareas livianas de elevación y traslado en depósitos, locales y espacios reducidos.",
    features: [
      "ALT. ELEVACION 1.6m",
      "BATERIA LITIO 48v12A CARGADOR 1A",
    ],
    category: "apiladores",
    images: ["/categorias/apiladores/CT10.jpeg"],
  },

  // ================= PLATAFORMAS =================
  {
    id: "SJLO158",
    name: "Plataforma vertical de elevación",
    description:
      "Plataforma elevadora vertical compacta, ideal para tareas de mantenimiento, instalación y trabajos en altura en depósitos e industrias.",
    features: [
      "PLATAFORMA 600x600mm",
      "ALTURA MÁX. DE PLATAFORMA 8m",
      "ALTURA DE TRABAJO 10m",
      "CAPACIDAD DE CARGA 150kg",
      "MASTIL SIMPLE",
    ],
    category: "plataformas",
    images: ["/categorias/plataformas/SJLO158.jpg"],
  },
  {
    id: "DCCY10",
    name: "Rampa niveladora móvil",
    description:
      "Rampa hidráulica móvil diseñada para facilitar la carga y descarga de camiones con autoelevadores, mejorando la productividad en centros logísticos y depósitos.",
    features: [
      "DIMENSIONES 11400x2100x1100",
      "PESO 2540kg",
      "CAPACIDAD DE CARGA 10tn",
      "RANGO ELEVACION: 1100-1800mm",
    ],
    category: "plataformas",
    images: ["/categorias/plataformas/DCCY10.jpg"],
  },
  {
    id: "SJYZ1214",
    name: "Plataforma tijera eléctrica",
    description:
      "Plataforma tipo tijera con gran estabilidad y seguridad, ideal para trabajos en altura tanto en interiores como exteriores.",
    features: [
      "PLATAFORMA 2300x1170mm",
      "ALTURA MÁX. DE PLATAFORMA 12m",
      "ALTURA DE TRABAJO 14m",
      "CAPACIDAD DE CARGA 320kg",
    ],
    category: "plataformas",
    images: ["/categorias/plataformas/SJYZ1214.jpg"],
  },
  {
    id: "SJLO2212",
    name: "Plataforma vertical doble mástil",
    description:
      "Plataforma elevadora de doble mástil, pensada para mantenimiento industrial, instalaciones y trabajos en altura que requieren mayor estabilidad.",
    features: [
      "PLATAFORMA 1500x600mm",
      "ALTURA MÁX. DE PLATAFORMA 12m",
      "ALTURA DE TRABAJO 14m",
      "CAPACIDAD DE CARGA 220kg",
      "MASTIL DOBLE",
    ],
    category: "plataformas",
    images: ["/categorias/plataformas/SJLO.jpg"],
  },
  {
    id: "SJLO24810",
    name: "Plataforma vertical doble mástil",
    description:
      "Plataforma vertical de doble mástil, ideal para tareas de mantenimiento y trabajo en altura con una estructura estable y práctica.",
    features: [
      "PLATAFORMA 1400x600mm",
      "ALTURA MÁX. DE PLATAFORMA 10m",
      "ALTURA DE TRABAJO 12m",
      "CAPACIDAD DE CARGA 248kg",
      "MASTIL DOBLE",
    ],
    category: "plataformas",
    images: ["/categorias/plataformas/SJLO.jpg"],
  },

  // ================= LIMPIEZA =================
  {
    id: "GDW8",
    name: "Barredora industrial compacta",
    description:
      "Barredora industrial compacta ideal para limpieza eficiente en depósitos, fábricas y estacionamientos, incluso en espacios reducidos.",
    features: [
      "5800m²/h",
      "BATERIA LITIO 24v200Ah CARG 30A",
      "TANQUES 150L-160L",
      "ANCHO LIMPIEZA 900mm",
      "AUTONOMIA 3-6h",
      "PESO 400kg",
      "DIM. 1710x980x1580mm",
    ],
    category: "limpieza",
    images: [
      "/categorias/limpieza/GDW8.jpeg",
      "/categorias/limpieza/GDW8-2.jpeg",
      "/categorias/limpieza/GDW8-3.jpeg",
    ],
  },
  {
    id: "GDW14",
    name: "Barredora industrial con conductor",
    description:
      "Barredora industrial con conductor sentado, ideal para limpieza rápida y cómoda de grandes superficies en entornos logísticos e industriales.",
    features: [
      "10.000m²/h",
      "BATERIA LITIO 48V80A CARG 12A",
      "TANQUE 80L-100L",
      "ANCHO LIMPIEZA 1400mm",
      "AUTONOMIA 2-4h",
      "PESO 412kg",
      "DIM. 1900x1400x1350mm",
    ],
    category: "limpieza",
    images: ["/categorias/limpieza/GDW14.jpeg", "/categorias/limpieza/GDW14-2.jpeg"],
  },
  {
    id: "GDW20",
    name: "Barredora industrial cabina cerrada",
    description:
      "Barredora industrial de alto rendimiento con cabina cerrada, preparada para limpieza de grandes superficies con comodidad y protección para el operador.",
    features: [
      "ENTRE 12.000 Y 20.000m²/h",
      "BATERIA LITIO 48V150A CARG 35A",
      "TANQUES 160L-200L",
      "ANCHO LIMPIEZA 2200mm",
      "AUTONOMIA 6-8h",
      "DIM. 2350x2200x2000mm",
    ],
    category: "limpieza",
    images: ["/categorias/limpieza/INDUS.jpeg", "/categorias/limpieza/INDUS-2.jpeg"],
  },
  {
    id: "GDW2Z",
    name: "Fregadora industrial hombre a pie",
    description:
      "Fregadora industrial de alto rendimiento, ideal para limpieza profunda de superficies en depósitos, industrias y espacios de alto tránsito.",
    features: [
      "2500m²",
      "BATERIA LITIO 24v100Ah CARG 15A",
      "TANQUES 55L-60L",
      "ANCHO LIMPIEZA 530mm",
      "AUTONOMIA 2-3h",
      "PESO 160kg",
      "DIM. 1250x560x1060mm",
    ],
    category: "limpieza",
    images: ["/categorias/limpieza/GDW2Z.jpg"],
  },
];