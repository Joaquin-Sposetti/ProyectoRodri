import { useState, useEffect, useRef } from "react";
import {
  motion,
  AnimatePresence,
  useMotionValue,
  useAnimationFrame,
} from "framer-motion";
import { useNavigate } from "react-router-dom";
import {
  Menu,
  X,
  ArrowRight,
  CheckCircle2,
  Phone,
  MessageCircle,
  Instagram,
} from "lucide-react";

const WHATSAPP = "https://wa.me/5493516501260"; // poné el número real

const clientLogos = [
  "/clientes/afason.png",
  "/clientes/berlim.png",
  "/clientes/c.jpeg",
  "/clientes/c.jpg",
  "/clientes/c.png",
  "/clientes/delfor.jpeg",
  "/clientes/dolomita.png",
  "/clientes/estdulce.webp",
  "/clientes/Fabrica-IsoTipo-LogoNombre.jpg",
  "/clientes/ingeocropped-logo-236x78.png",
  "/clientes/juncalcor.jpg",
  "/clientes/marcilli.png",
  "/clientes/mca-logo.png",
  "/clientes/mesal.png",
  "/clientes/profast.png",
  "/clientes/totalclean.jpg",
];

const nav = [
  { id: "inicio", label: "Inicio" },
  { id: "productos", label: "Productos" },
  { id: "servicios", label: "Servicios" },
  { id: "pasos", label: "Proceso" },
  { id: "sectores", label: "Sectores" },
  { id: "clientes", label: "Clientes" },
  { id: "contacto", label: "Contacto" },
];

const fadeIn = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.2 },
  transition: { duration: 0.6 },
};

export default function Home() {
  const [open, setOpen] = useState(false);
  const [isClientCarouselPaused, setIsClientCarouselPaused] = useState(false);

  const navigate = useNavigate();

  const clientTrackRef = useRef<HTMLDivElement>(null);
  const clientLoopWidthRef = useRef(0);
  const clientX = useMotionValue(0);

  useEffect(() => {
    if (window.location.hash) {
      const id = window.location.hash.replace("#", "");
      const element = document.getElementById(id);
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: "smooth", block: "start" });
        }, 100);
      }
    }
  }, []);

  useEffect(() => {
    if (open) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "";

    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    const measureClientCarousel = () => {
      if (!clientTrackRef.current) return;
      const totalWidth = clientTrackRef.current.scrollWidth;
      clientLoopWidthRef.current = totalWidth / 2;
    };

    measureClientCarousel();
    window.addEventListener("resize", measureClientCarousel);

    return () => {
      window.removeEventListener("resize", measureClientCarousel);
    };
  }, []);

  useAnimationFrame((_, delta) => {
  if (isClientCarouselPaused) return;

  const loopWidth = clientLoopWidthRef.current;
  if (!loopWidth) return;

  const speed = 0.05; // Ajustá esto a tu gusto
  let nextX = clientX.get() - delta * speed;

  // Lógica de loop infinito
  if (nextX <= -loopWidth) {
    nextX += loopWidth;
  } else if (nextX > 0) {
    nextX -= loopWidth;
  }

  clientX.set(nextX);
});

  const goCatalogTop = (url: string) => {
    navigate(url);
    setTimeout(() => {
      if (typeof window !== "undefined") {
        window.scrollTo({ top: 0, left: 0, behavior: "auto" });
      }
    }, 0);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-[#edf2ff] text-slate-900">
      {/* NAVBAR */}
      <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/90 backdrop-blur-lg shadow-[0_2px_8px_rgba(0,0,0,0.03)]">
        <div className="max-w-7xl mx-auto flex h-16 md:h-20 items-center justify-between px-4">
          <a
            href="#inicio"
            className="flex items-center hover:scale-[1.03] transition-transform"
          >
            <img
              src="/easylift-logo.png"
              alt="Easylift"
              className="h-10 sm:h-12 md:h-20 w-auto object-contain"
              style={{ minWidth: "150px" }}
            />
          </a>

          <nav className="hidden md:flex items-center gap-10 ml-10">
            {nav.map((n) => (
              <a
                key={n.id}
                href={`#${n.id}`}
                className="text-[15px] font-medium text-slate-600 hover:text-easyliftBlue transition-colors"
              >
                {n.label}
              </a>
            ))}

            <button
              onClick={() => goCatalogTop("/productos")}
              className="text-[15px] font-medium text-slate-600 hover:text-easyliftBlue transition-colors"
              type="button"
            >
              Catálogo
            </button>
          </nav>

          <div className="hidden md:flex items-center gap-6 ml-8 pl-8 border-l border-slate-200">
            <div className="flex items-center gap-3">
              <a
                href="https://www.instagram.com/_easylift/?hl=es"
                target="_blank"
                className="text-slate-500 hover:text-easyliftBlue transition"
                rel="noreferrer"
              >
                <Instagram size={20} />
              </a>
            </div>

            <div className="flex items-center gap-4">
              <a
                href={WHATSAPP}
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-center gap-2 border border-easyliftBlue text-easyliftBlue px-5 py-2.5 rounded-lg hover:bg-easyliftBlue hover:text-white transition shadow-sm hover:shadow-md font-medium leading-none"
                style={{ minWidth: "120px", height: "45px" }}
              >
                <Phone size={18} />
                Llamar
              </a>
            </div>
          </div>

          <button
            className="md:hidden rounded-xl p-2 hover:bg-slate-100"
            onClick={() => setOpen(true)}
            aria-label="Abrir menú"
          >
            <Menu />
          </button>
        </div>
      </header>

      {/* MENÚ MOBILE */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 bg-white/35 backdrop-blur-xl"
            onClick={() => setOpen(false)}
          >
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "tween", duration: 0.25 }}
              className="fixed top-0 right-0 z-50 h-screen w-full max-w-xs sm:max-w-sm bg-white text-slate-800 p-6 shadow-lg flex flex-col"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <img
                    src="/easylift-logo.png"
                    alt="Easylift"
                    className="h-10 w-auto object-contain"
                  />
                  <span className="font-bold text-easyliftBlue">Menú</span>
                </div>
                <button
                  className="rounded-xl p-2 hover:bg-slate-100"
                  onClick={() => setOpen(false)}
                  aria-label="Cerrar menú"
                >
                  <X />
                </button>
              </div>

              <nav className="mt-6 flex flex-col gap-2 border-t border-slate-200 pt-6">
                {nav.map((n) => (
                  <a
                    key={n.id}
                    href={`#${n.id}`}
                    onClick={() => setOpen(false)}
                    className="rounded-lg px-4 py-3 text-base font-medium hover:bg-slate-100 transition-colors"
                  >
                    {n.label}
                  </a>
                ))}

                <button
                  onClick={() => {
                    setOpen(false);
                    goCatalogTop("/productos");
                  }}
                  className="mt-2 rounded-lg px-4 py-3 text-base font-medium text-slate-700 hover:text-easyliftBlue hover:bg-slate-100 transition-colors text-left"
                  type="button"
                >
                  Ver catálogo →
                </button>
              </nav>

              <div className="mt-4 flex flex-col gap-3 w-full px-4">
                <a
                  href={WHATSAPP}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center justify-center gap-2 border border-easyliftBlue text-easyliftBlue font-medium py-2 rounded-xl hover:bg-easyliftBlue/10 transition text-sm"
                >
                  <Phone size={16} />
                  WhatsApp
                </a>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* HERO */}
      <section id="inicio" className="relative w-full overflow-hidden bg-white">
  <div className="relative w-full h-[340px] sm:h-[520px] md:h-[640px] lg:h-[calc(100vh-80px)] xl:h-[calc(100vh-80px)] bg-white">
    {/* Bloques de color fijos en los costados */}
    <div className="absolute left-0 top-0 h-full w-1/2 bg-[#040d3d] animate-bannerOne transition-colors duration-[2000ms] ease-in-out"></div>
    <div className="absolute right-0 top-0 h-full w-1/2 bg-[#f1f5f9] animate-bannerOne transition-colors duration-[2000ms] ease-in-out"></div>
    <div className="absolute left-0 top-0 h-full w-full bg-[#f1f5f9] animate-bannerTwo transition-colors duration-[2000ms] ease-in-out"></div>

    {[
      "/Bannereasylift (1).png",
      "/Bannereasylift1 (1).png",
    ].map((image, index) => (
      <div
        key={image}
        className={`absolute inset-0 flex items-center justify-center bg-transparent transition-opacity duration-[2500ms] ease-in-out ${
          index === 0 ? "animate-bannerOne" : "animate-bannerTwo"
        }`}
      >
        <img
          src={image}
          alt={`Banner Easylift ${index + 1}`}
          className="h-full w-full object-contain object-center bg-transparent"
          draggable={false}
        />
      </div>
    ))}
  </div>
</section>

      {/* PRODUCTOS */}
      <section id="productos" className="section bg-white">
        <div className="container">
          <motion.h2
            {...fadeIn}
            className="text-3xl md:text-4xl font-bold text-easyliftBlue text-center"
          >
            Nuestros productos
          </motion.h2>

          <motion.p
            {...fadeIn}
            className="mt-3 text-slate-600 max-w-3xl mx-auto text-center"
          >
            Selección de equipos pensados para diferentes tipos de operación:
            depósitos, industrias, centros logísticos y más.
          </motion.p>

          <div className="mt-10 grid gap-4 sm:gap-6 grid-cols-2 md:grid-cols-2 xl:grid-cols-5">
            {[
              {
                title: "Autoelevadores",
                slug: "autoelevadores",
                icon: (
                  <img
                    src="/icons/autoelevador.png"
                    alt="Autoelevadores"
                    className="h-16 w-16 sm:h-20 sm:w-20 md:h-24 md:w-24 object-contain"
                  />
                ),
                desc: "Equipos para trabajo intenso, eléctricos y a combustión.",
              },
              {
                title: "Transpaletas / Zorras",
                slug: "transpaletas",
                icon: (
                  <img
                    src="/icons/transpaleta.png"
                    alt="Transpaletas"
                    className="h-16 w-16 sm:h-20 sm:w-20 md:h-24 md:w-24 object-contain"
                  />
                ),
                desc: "Movimiento interno ágil y seguro de pallets.",
              },
              {
                title: "Apiladores",
                slug: "apiladores",
                icon: (
                  <img
                    src="/icons/apilador.png"
                    alt="Apiladores"
                    className="h-16 w-16 sm:h-20 sm:w-20 md:h-24 md:w-24 object-contain"
                  />
                ),
                desc: "Aprovechá la altura de tu depósito al máximo.",
              },
              {
                title: "Plataformas",
                slug: "plataformas",
                icon: (
                  <img
                    src="/icons/plataforma.png"
                    alt="Plataformas"
                    className="h-16 w-16 sm:h-20 sm:w-20 md:h-24 md:w-24 object-contain"
                  />
                ),
                desc: "Trabajos en altura seguros y estables.",
              },
              {
                title: "Limpieza",
                slug: "limpieza",
                icon: (
                  <img
                    src="/icons/limpieza.png"
                    alt="Limpieza"
                    className="h-16 w-16 sm:h-20 sm:w-20 md:h-24 md:w-24 object-contain"
                  />
                ),
                desc: "Limpieza industrial de alto rendimiento.",
              },
            ].map((c) => (
              <motion.button
                key={c.title}
                {...fadeIn}
                type="button"
                onClick={() => goCatalogTop(`/productos?cat=${c.slug}`)}
                className="rounded-2xl bg-[#f6f7ff] p-4 sm:p-6 text-center shadow-md ring-1 ring-slate-200 transition-all hover:shadow-lg active:scale-[0.98] transition-transform"
              >
                <div className="mb-4 flex items-center justify-center">
                  <div className="flex h-16 w-16 sm:h-20 sm:w-20 md:h-24 md:w-24 items-center justify-center rounded-2xl bg-[#e1e6ff] mx-auto">
                    {c.icon}
                  </div>
                </div>

                <h3 className="text-lg font-semibold text-slate-900">
                  {c.title}
                </h3>

                <p className="mt-3 text-sm text-slate-600">{c.desc}</p>

                <span className="mt-4 inline-flex items-center gap-2 font-medium text-easyliftBlue hover:underline">
                  Ver en catálogo <ArrowRight size={16} />
                </span>
              </motion.button>
            ))}
          </div>
        </div>
      </section>

      {/* SERVICIOS */}
      <section id="servicios" className="section">
        <div className="container grid gap-10 md:grid-cols-2 items-center">
          <motion.div {...fadeIn}>
            <h2 className="text-3xl md:text-4xl font-bold text-easyliftBlue">
              Servicios que acompañan tus equipos.
            </h2>
            <p className="mt-4 text-slate-600">
              No se trata solo de vender máquinas. Te asesoramos, acompañamos y
              hacemos mantenimiento para que tu operación nunca se detenga.
            </p>
            <ul className="mt-4 space-y-2 text-sm text-slate-700">
              <li>• Asesoramiento previo a la compra.</li>
              <li>• Entrega e instalación en planta.</li>
              <li>• Mantenimiento preventivo y correctivo.</li>
            </ul>
          </motion.div>

          <motion.div {...fadeIn} className="card">
            <h3 className="text-lg font-semibold text-slate-900">
              ¿Qué ganás trabajando con Easylift?
            </h3>
            <ul className="mt-3 space-y-2 text-sm text-slate-700">
              <li>✓ Menos tiempos muertos por falla de equipos.</li>
              <li>✓ Mejor aprovechamiento del espacio.</li>
              <li>✓ Mayor seguridad para el personal.</li>
              <li>✓ Un único proveedor para equipos y servicio.</li>
            </ul>
          </motion.div>
        </div>
      </section>

      {/* CÓMO TRABAJAMOS */}
      <section id="pasos" className="section bg-white">
        <div className="container">
          <div className="mx-auto max-w-3xl text-center">
            <motion.div {...fadeIn} className="max-w-3xl">
              <h2 className="text-3xl md:text-4xl font-bold text-easyliftBlue">
                Cómo trabajamos
              </h2>
              <p className="mt-3 text-slate-600">
                Buscamos que el proceso sea claro, rápido y sin sorpresas.
              </p>
            </motion.div>
          </div>

          <div className="mt-10 grid gap-6 md:gap-8 grid-cols-1 sm:grid-cols-2 md:grid-cols-4">
            {[
              {
                step: "1",
                title: "Relevamiento",
                items: [
                  "Nos contás tu operación y tipo de carga.",
                  "Si hace falta, visitamos tu depósito.",
                  "Definimos capacidad, altura y tipo de equipo.",
                ],
              },
              {
                step: "2",
                title: "Propuesta",
                items: [
                  "Armamos una oferta a medida.",
                  "Combinamos compra y financiación.",
                  "Coordinamos entrega y tiempos.",
                ],
              },
              {
                step: "3",
                title: "Entrega",
                items: [
                  "Entregamos y dejamos el equipo operativo.",
                  "Capacitación básica para el personal.",
                ],
              },
              {
                step: "4",
                title: "Servicio postventa",
                items: [
                  "Todos nuestros equipos cuentan con garantía.",
                  "Disponemos de repuestos originales.",
                  "Brindamos soporte para asegurar continuidad operativa.",
                ],
              },
            ].map((step) => (
              <motion.div
                key={step.step}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.5 }}
                className="relative rounded-2xl bg-white shadow-md ring-1 ring-slate-200 p-6 flex flex-col h-full overflow-hidden"
              >
                <div className="flex items-center gap-3 mb-4">
                  <span className="grid h-10 w-10 place-content-center rounded-2xl bg-[#e1e6ff] font-bold text-easyliftBlue text-lg">
                    {step.step}
                  </span>
                  <div>
                    <h3 className="text-lg font-semibold text-slate-900">
                      {step.title}
                    </h3>
                  </div>
                </div>
                <ul className="space-y-2 text-sm text-slate-700 flex-1">
                  {step.items.map((i) => (
                    <li key={i}>• {i}</li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTORES */}
      <section id="sectores" className="section">
        <div className="container">
          <motion.h2
            {...fadeIn}
            className="text-3xl md:text-4xl font-bold text-easyliftBlue text-center"
          >
            Sectores donde trabajamos
          </motion.h2>

          <motion.p
            {...fadeIn}
            className="mt-3 text-slate-600 max-w-3xl mx-auto text-center"
          >
            Adaptamos la solución según el tipo de industria, el volumen de
            trabajo y el entorno.
          </motion.p>

          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {[
              "Logística y depósitos",
              "Industria y manufactura",
              "Retail y supermercados",
              "Construcción",
              "Alimenticia y farmacéutica",
              "Centros de distribución",
            ].map((s) => (
              <motion.div
                key={s}
                {...fadeIn}
                className="card flex items-center gap-3"
              >
                <div className="rounded-full bg-[#e1e6ff] p-2">
                  <CheckCircle2 className="text-easyliftBlue" size={18} />
                </div>
                <span className="text-sm text-slate-800">{s}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CLIENTES */}
      {/* CLIENTES */}
<section id="clientes" className="section bg-white overflow-hidden py-20">
  <div className="mx-auto max-w-7xl px-4">
    <div className="mx-auto max-w-3xl text-center">
      <span className="inline-flex items-center rounded-full border border-easyliftBlue/20 bg-easyliftBlue/10 px-4 py-1 text-sm font-medium text-easyliftBlue">
        Clientes
      </span>

      <h2 className="mt-4 text-3xl font-bold tracking-tight text-easyliftBlue sm:text-4xl md:text-5xl">
        Empresas que confían en nosotros
      </h2>
    </div>
  </div>

  <div className="relative mt-16 w-full overflow-hidden select-none">
    {/* Gradientes laterales para suavizar la entrada/salida de logos (Opcional pero recomendado) */}
    <div className="absolute inset-y-0 left-0 z-10 w-20 bg-gradient-to-r from-white to-transparent pointer-events-none" />
    <div className="absolute inset-y-0 right-0 z-10 w-20 bg-gradient-to-l from-white to-transparent pointer-events-none" />

    <motion.div
      ref={clientTrackRef}
      className="flex w-max items-center gap-10 px-6 sm:gap-14 md:gap-16 cursor-grab active:cursor-grabbing touch-pan-y"
      style={{ x: clientX }}
      drag="x"
      dragConstraints={{ left: -10000, right: 10000 }}
      dragElastic={0.05}
      onPointerDown={() => setIsClientCarouselPaused(true)}
      onPointerUp={() => setIsClientCarouselPaused(false)}
      onPointerLeave={() => setIsClientCarouselPaused(false)}
      onDragStart={() => setIsClientCarouselPaused(true)}
      onDragEnd={() => {
        const loopWidth = clientLoopWidthRef.current;
        if (loopWidth > 0) {
          const currentX = clientX.get();
          // Normalización: asegura que el valor de X siempre esté "mapeado" 
          // al rango del primer set de logos para evitar huecos blancos.
          const normalizedX = ((currentX % loopWidth) - loopWidth) % loopWidth;
          clientX.set(normalizedX);
        }
        setIsClientCarouselPaused(false);
      }}
    >
      {/* Triplicamos los logos para que siempre haya contenido a los costados al arrastrar */}
      {[...clientLogos, ...clientLogos, ...clientLogos].map((logo, index) => (
        <div
          key={`${logo}-${index}`}
          className="flex shrink-0 items-center justify-center"
        >
          <img
            src={logo}
            alt={`Cliente ${index + 1}`}
            className="h-14 sm:h-16 md:h-20 w-auto max-w-none object-contain"
            loading="lazy"
            draggable={false}
          />
        </div>
      ))}
    </motion.div>
  </div>
</section>

      {/* CONTACTO */}
      <section
        id="contacto"
        className="relative overflow-hidden py-20 md:py-24"
      >
        <div className="container grid gap-12 md:grid-cols-2 items-start">
          <motion.div {...fadeIn}>
            <h2 className="text-3xl md:text-4xl font-bold text-easyliftBlue">
              Contactanos
            </h2>
            <p className="mt-4 text-slate-600 text-lg">
              Contanos brevemente tu operación y qué tipo de equipos estás
              buscando. Te respondemos con una propuesta inicial y, si hace
              falta, coordinamos una visita.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <a
                href={WHATSAPP}
                target="_blank"
                rel="noreferrer"
                className="btn btn-outline"
              >
                <MessageCircle size={18} />
                WhatsApp
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-slate-200 bg-slate-50 py-8">
        <div className="container flex flex-col md:flex-row items-center justify-between gap-4 text-[12px] text-slate-500">
          <div className="flex items-center gap-3">
            <img src="/easylift-logo.png" className="h-8" alt="Easylift" />
            <span>
              © {new Date().getFullYear()} Easylift. Todos los derechos reservados.
            </span>
          </div>
          <div className="flex items-center gap-4">
            <a href="#productos" className="hover:text-easyliftBlue">
              Productos
            </a>
            <button
              type="button"
              onClick={() => goCatalogTop("/productos")}
              className="hover:text-easyliftBlue"
            >
              Catálogo
            </button>
            <a href="#contacto" className="hover:text-easyliftBlue">
              Contacto
            </a>
          </div>
        </div>
      </footer>

      {/* BOTÓN WHATSAPP FLOTANTE */}
      <a
        href={WHATSAPP}
        target="_blank"
        rel="noreferrer"
        className="fixed bottom-4 right-4 grid h-14 w-14 md:h-12 md:w-12 place-content-center rounded-full bg-easyliftBlue text-white shadow-lg hover:scale-105 transition-transform"
        aria-label="WhatsApp"
      >
        <MessageCircle />
      </a>
    </div>
  );
}