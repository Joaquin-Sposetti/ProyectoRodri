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
  category: ProductCategory;
  image: string;
};


export const PRODUCTS: Product[] = [
  // ================= AUTOELEVADORES (tenés 3 imágenes) =================
{
  id: "FD25-30",
  name: "Autoelevador diésel 2.5 - 3 toneladas",
  description:
    "Autoelevador TCU de combustión interna, capacidad 2.5 a 3 toneladas, alta estabilidad y potencia para operaciones industriales y logísticas.",
  category: "autoelevadores",
  image: "/categorias/autoelevadores/023.jpg",
},
{
  id: "FLB25",
  name: "Autoelevador eléctrico 2.5 toneladas",
  description:
    "Batería de litio 80v410A, cargador 150A, mástil triple 4.7m, desplazador lateral Cascade, asiento ergonómico y cubiertas neumáticas.",
  category: "autoelevadores",
  image: "/categorias/autoelevadores/FLB25.jpg",
},
{
  id: "FTB18",
  name: "Autoelevador eléctrico 1.8 toneladas",
  description:
    "Autoelevador eléctrico TCU de 1.8 toneladas, diseño compacto para depósitos y logística interna, alta maniobrabilidad y operación silenciosa.",
  category: "autoelevadores",
  image: "/categorias/autoelevadores/FTB18.jpg",
},

  // ================= TRANSPALETAS =================
{
  id: "CTS20S",
  name: "Transpaleta con balanza 2 toneladas",
  description:
    "Transpaleta manual con sistema de balanza digital integrada para pesaje de pallets durante el traslado. Ideal para logística y control de carga.",
  category: "transpaletas",
  image: "/categorias/transpaletas/CTS20S.jpeg",
},
{
  id: "CTX30Q",
  name: "Transpaleta eléctrica 3 toneladas",
  description:
    "Transpaleta eléctrica industrial de 3 toneladas, diseñada para operaciones intensivas en depósitos y centros logísticos.",
  category: "transpaletas",
  image: "/categorias/transpaletas/20.jpeg",
},
{
  id: "CTS20-30",
  name: "Transpaleta manual 2 - 3 toneladas",
  description:
    "Transpaleta hidráulica manual robusta para movimiento de pallets en depósitos, logística y comercio.",
  category: "transpaletas",
  image: "/categorias/transpaletas/CTS20_30.jpeg",
},

    // ================= APILADORES =================
{
  id: "DGX15",
  name: "Apilador eléctrico 1500kg",
  description:
    "Alt. elevación 3.5m, batería litio 48v60A, cargador 8A, centro de carga 550mm, peso 500kg, dist. ext. uñas 685mm y ruedas de PU.",
  category: "apiladores",
  image: "/categorias/apiladores/DGX15_20.jpeg",
},
{
  id: "DGX20-35",
  name: "Apilador eléctrico 2000kg",
  description:
    "Alt. elevación 3.5m, batería litio 48v60A, cargador 8A, centro de carga 550mm, peso 550kg, dist. ext. uñas 685mm y ruedas de PU.",
  category: "apiladores",
  image: "/categorias/apiladores/DGX20.jpeg",
},
{
  id: "DGX20-45",
  name: "Apilador eléctrico 2000kg",
  description:
    "Alt. elevación 4.5m, batería litio 48v60A, cargador 8A, centro de carga 550mm, peso 500kg, dist. ext. uñas 685mm y ruedas de PU.",
  category: "apiladores",
  image: "/categorias/apiladores/DGX20.jpeg",
},

{
  id: "CT10",
  name: "Apilador semi eléctrico 1000kg",
  description:
    "Alt. elevación 1.6m, batería litio 48v12A y cargador 1A.",
  category: "apiladores",
  image: "/categorias/apiladores/CT10.jpeg",
},

  // ================= PLATAFORMAS =================
{
  id: "SJLO158",
  name: "Plataforma vertical de elevación",
  description:
    "Plataforma elevadora vertical compacta para trabajos en altura en depósitos, mantenimiento industrial y logística.",
  category: "plataformas",
  image: "/categorias/plataformas/SJLO158.jpg",
},
{
  id: "DCCY10",
  name: "Rampa niveladora móvil",
  description:
    "Rampa hidráulica móvil para carga y descarga de camiones con autoelevadores. Ideal para depósitos y centros logísticos.",
  category: "plataformas",
  image: "/categorias/plataformas/DCCY10.jpg",
},
{
  id: "SJYZ1214",
  name: "Plataforma tijera eléctrica",
  description:
    "Plataforma elevadora tipo tijera para trabajos en altura en interior y exterior con alta estabilidad y seguridad.",
  category: "plataformas",
  image: "/categorias/plataformas/SJYZ1214.jpg",
},
{
  id: "SJLO2212",
  name: "Plataforma vertical doble mástil",
  description:
    "Plataforma elevadora de doble mástil para mantenimiento industrial, instalación eléctrica y trabajos en altura.",
  category: "plataformas",
  image: "/categorias/plataformas/SJLO.jpg",
},
// ================= LIMPIEZA =================
{
  id: "GDW8",
  name: "Barredora industrial compacta",
  description:
    "Barredora industrial compacta para limpieza de depósitos, fábricas y estacionamientos. Alta eficiencia en espacios reducidos.",
  category: "limpieza",
  image: "/categorias/limpieza/GDW8.jpeg",
},
{
  id: "GDW14",
  name: "Barredora industrial con conductor",
  description:
    "Barredora industrial con conductor sentado para limpieza eficiente de grandes superficies en centros logísticos e industriales.",
  category: "limpieza",
  image: "/categorias/limpieza/GDW14.jpeg",
},
{
  id: "GDW20",
  name: "Barredora industrial cabina cerrada",
  description:
    "Barredora industrial de alto rendimiento con cabina cerrada para limpieza de grandes superficies en entornos industriales.",
  category: "limpieza",
  image: "/categorias/limpieza/INDUS.jpeg",
},
];
