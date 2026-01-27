export type ProductCategory =
  | "autoelevadores"
  | "transpaletas"
  | "apiladores"
  | "plataformas";

export const CATEGORY_LABEL: Record<ProductCategory, string> = {
  autoelevadores: "Autoelevadores",
  transpaletas: "Transpaletas / Zorras",
  apiladores: "Apiladores",
  plataformas: "Plataformas",
};

export type Product = {
  id: string;
  name: string;
  description: string;
  category: ProductCategory;
  image: string;
};

const FALLBACK_IMG = "/fondo2.png"; // existe en tu public (si querés cambiá por otra)

export const PRODUCTS: Product[] = [
  // ================= AUTOELEVADORES (tenés 3 imágenes) =================
  {
    id: "ae-1",
    name: "Autoelevador TEU Diesel 2.5t",
    description: "Equipo robusto para trabajo intenso y operación continua.",
    category: "autoelevadores",
    image: "/categorias/autoelevadores/ae-1.jpg",
  },
  {
    id: "ae-2",
    name: "Autoelevador TEU Diesel 3.0t",
    description: "Potencia y rendimiento para exterior y patios de carga.",
    category: "autoelevadores",
    image: "/categorias/autoelevadores/ae-2.jpg",
  },
  {
    id: "ae-3",
    name: "Autoelevador TEU Eléctrico 2.5t",
    description: "Ideal para interior, menor ruido y cero emisiones.",
    category: "autoelevadores",
    image: "/categorias/autoelevadores/ae-3.jpg",
  },
  // repetimos para completar 6
  {
    id: "ae-4",
    name: "Autoelevador Compacto",
    description: "Excelente maniobrabilidad para pasillos angostos.",
    category: "autoelevadores",
    image: "/categorias/autoelevadores/ae-1.jpg",
  },
  {
    id: "ae-5",
    name: "Autoelevador Alto Rendimiento",
    description: "Para cargas pesadas y operación exigente.",
    category: "autoelevadores",
    image: "/categorias/autoelevadores/ae-2.jpg",
  },
  {
    id: "ae-6",
    name: "Autoelevador Eléctrico (uso intensivo)",
    description: "Eficiencia energética y bajo mantenimiento.",
    category: "autoelevadores",
    image: "/categorias/autoelevadores/ae-3.jpg",
  },

  // ================= TRANSPALETAS (tenés 4 imágenes) =================
  {
    id: "tp-1",
    name: "Transpaleta Eléctrica",
    description: "Más productividad para recorridos largos.",
    category: "transpaletas",
    image: "/categorias/transpaletas/tp-1.jpg",
  },
  {
    id: "tp-2",
    name: "Transpaleta Manual Hidráulica",
    description: "Solución simple y confiable para operación diaria.",
    category: "transpaletas",
    image: "/categorias/transpaletas/tp-2.jpg",
  },
  {
    id: "tp-3",
    name: "Transpaleta Alta Capacidad",
    description: "Diseñada para cargas pesadas.",
    category: "transpaletas",
    image: "/categorias/transpaletas/tp-3.jpg",
  },
  {
    id: "tp-4",
    name: "Transpaleta con Balanza",
    description: "Pesaje y traslado en un solo paso.",
    category: "transpaletas",
    image: "/categorias/transpaletas/tp-4.jpg",
  },
  // repetimos para completar 6
  {
    id: "tp-5",
    name: "Transpaleta Manual (compacta)",
    description: "Ideal para espacios reducidos y maniobras cortas.",
    category: "transpaletas",
    image: "/categorias/transpaletas/tp-2.jpg",
  },
  {
    id: "tp-6",
    name: "Transpaleta Eléctrica (compacta)",
    description: "Agilidad y control en depósitos.",
    category: "transpaletas",
    image: "/categorias/transpaletas/tp-1.jpg",
  },

  // ================= APILADORES (carpeta sin imágenes) =================
  {
    id: "ap-1",
    name: "Apilador Eléctrico 1500kg",
    description: "Aprovechá la altura del depósito con seguridad.",
    category: "apiladores",
    image: FALLBACK_IMG,
  },
  {
    id: "ap-2",
    name: "Apilador Eléctrico 2000kg",
    description: "Elevación estable para tareas de almacenamiento.",
    category: "apiladores",
    image: FALLBACK_IMG,
  },
  {
    id: "ap-3",
    name: "Apilador Semi Eléctrico",
    description: "Balance ideal entre costo y rendimiento.",
    category: "apiladores",
    image: FALLBACK_IMG,
  },
  {
    id: "ap-4",
    name: "Apilador Manual",
    description: "Solución económica para baja rotación.",
    category: "apiladores",
    image: FALLBACK_IMG,
  },
  {
    id: "ap-5",
    name: "Apilador Compacto",
    description: "Perfecto para pasillos angostos y maniobras precisas.",
    category: "apiladores",
    image: FALLBACK_IMG,
  },
  {
    id: "ap-6",
    name: "Apilador Industrial",
    description: "Diseñado para operación continua.",
    category: "apiladores",
    image: FALLBACK_IMG,
  },

  // ================= PLATAFORMAS (tenés 4 imágenes) =================
  {
    id: "pl-1",
    name: "Plataforma Tijera Eléctrica",
    description: "Trabajo en altura con seguridad y estabilidad.",
    category: "plataformas",
    image: "/categorias/plataformas/pl-1.jpg",
  },
  {
    id: "pl-2",
    name: "Plataforma Aluminio 8m",
    description: "Liviana y práctica para mantenimiento.",
    category: "plataformas",
    image: "/categorias/plataformas/pl-2.jpg",
  },
  {
    id: "pl-3",
    name: "Plataforma Aluminio 10m",
    description: "Ideal para interior con buena altura de trabajo.",
    category: "plataformas",
    image: "/categorias/plataformas/pl-3.jpg",
  },
  {
    id: "pl-4",
    name: "Plataforma Aluminio 12m",
    description: "Más alcance para tareas exigentes.",
    category: "plataformas",
    image: "/categorias/plataformas/pl-4.jpg",
  },
  // repetimos para completar 6
  {
    id: "pl-5",
    name: "Plataforma (compacta)",
    description: "Fácil de mover y operar en espacios reducidos.",
    category: "plataformas",
    image: "/categorias/plataformas/pl-2.jpg",
  },
  {
    id: "pl-6",
    name: "Plataforma (uso intensivo)",
    description: "Diseñada para operación continua.",
    category: "plataformas",
    image: "/categorias/plataformas/pl-1.jpg",
  },
];
