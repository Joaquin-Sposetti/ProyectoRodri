import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Menu,
  X,
  ArrowRight,
  Shield,
  Timer,
  Wrench,
  Star,
  CheckCircle2,
  Phone,
  MessageCircle,
  Instagram,
  Facebook,
  Linkedin,
} from "lucide-react";

const WHATSAPP = "https://wa.me/5490000000000"; // poné el número real

const nav = [
  { id: "inicio", label: "Inicio" },
  { id: "productos", label: "Productos" },
  { id: "servicios", label: "Servicios" },
  { id: "pasos", label: "Proceso" },
  { id: "sectores", label: "Sectores" },
  { id: "contacto", label: "Contacto" },
];

const fadeIn = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.2 },
  transition: { duration: 0.6 },
};

function App() {
  const [open, setOpen] = useState(false);

  // bloquear scroll cuando el menú está abierto
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-[#edf2ff] text-slate-900">
      {/* NAVBAR */}
      <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/90 backdrop-blur-lg shadow-[0_2px_8px_rgba(0,0,0,0.03)]">
        <div className="max-w-7xl mx-auto flex h-20 items-center justify-between px-4">
          {/* Logo */}
          <a
            href="#inicio"
            className="flex items-center hover:scale-[1.03] transition-transform"
          >
            <img
              src="/easylift-logo.png"
              alt="Easylift"
              className="h-20 w-auto object-contain"
              style={{ minWidth: "140px" }}
            />
          </a>

          {/* Links desktop */}
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
          </nav>

          {/* Redes + botones desktop */}
          <div className="hidden md:flex items-center gap-6 ml-8 pl-8 border-l border-slate-200">
            <div className="flex items-center gap-3">
              <a
                href="https://www.instagram.com"
                target="_blank"
                className="text-slate-500 hover:text-easyliftBlue transition"
              >
                <Instagram size={20} />
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                className="text-slate-500 hover:text-easyliftBlue transition"
              >
                <Facebook size={20} />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                className="text-slate-500 hover:text-easyliftBlue transition"
              >
                <Linkedin size={20} />
              </a>
            </div>

            <div className="flex items-center gap-4">
              <a
                href={WHATSAPP}
                target="_blank"
                className="flex items-center justify-center gap-2 border border-easyliftBlue text-easyliftBlue px-5 py-2.5 rounded-lg hover:bg-easyliftBlue hover:text-white transition shadow-sm hover:shadow-md font-medium leading-none"
                style={{ minWidth: "120px", height: "45px" }}
              >
                <Phone size={18} />
                Llamar
              </a>

              <a
                href="#contacto"
                className="flex items-center justify-center gap-2 bg-easyliftBlue text-white px-5 py-2.5 rounded-lg hover:bg-easyliftBlueSoft transition shadow-sm hover:shadow-md font-medium leading-none"
                style={{ minWidth: "160px", height: "45px" }}
              >
                Pedir presupuesto <ArrowRight size={16} />
              </a>
            </div>
          </div>

          {/* Botón menú mobile */}
          <button
            className="md:hidden rounded-xl p-2 hover:bg-slate-100"
            onClick={() => setOpen(true)}
            aria-label="Abrir menú"
          >
            <Menu />
          </button>
        </div>
      </header>

      {/* MENÚ MOBILE CON FONDO DIFUMINADO */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] bg-slate-900/30 backdrop-blur-lg"
            onClick={() => setOpen(false)}
          >
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "tween", duration: 0.25 }}
              className="fixed top-0 right-0 z-[70] h-screen w-full max-w-xs sm:max-w-sm bg-white text-slate-800 p-6 shadow-lg flex flex-col"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <img
                    src="/easylift-logo.png"
                    className="h-10 w-auto object-contain"
                  />
                  <span className="font-bold text-easyliftBlue">Menú</span>
                </div>
                <button
                  className="rounded-xl p-2 hover:bg-slate-100"
                  onClick={() => setOpen(false)}
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
              </nav>

              <div className="mt-4 flex flex-col gap-3 w-full px-4">
                <a
                  href={WHATSAPP}
                  target="_blank"
                  className="flex items-center justify-center gap-2 border border-easyliftBlue text-easyliftBlue font-medium py-2 rounded-xl hover:bg-easyliftBlue/10 transition text-sm"
                >
                  <Phone size={16} />
                  WhatsApp
                </a>
                <a
                  href="#contacto"
                  className="flex items-center justify-center gap-2 bg-easyliftBlue text-white font-semibold py-2 rounded-xl hover:bg-easyliftBlueSoft transition text-sm"
                >
                  Pedir presupuesto
                </a>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* HERO */}
      <section
        id="inicio"
        className="relative h-[80vh] flex flex-col items-center justify-center overflow-hidden bg-gradient-to-b from-white to-[#f2f4ff]"
      >
        {/* Fondo: slideshow */}
        <div className="absolute inset-0 z-0">
          <div className="slideshow">
            <div className="slide">
              <img src="/fondo1.png" alt="Equipos Easylift 1" />
            </div>
            <div className="slide">
              <img src="/fondo2.png" alt="Equipos Easylift 2" />
            </div>
            <div className="slide">
              <img src="/fondo3.png" alt="Equipos Easylift 3" />
            </div>
          </div>
          <div className="absolute inset-0 bg-slate-900/55" />
        </div>

        {/* Contenido hero */}
        <div className="relative z-10 text-center text-white px-4 w-full">
          <img
            src="/easylift-logo.png"
            alt="Easylift"
            className="mx-auto mb-10 w-72 md:w-96 lg:w-[26rem] drop-shadow-2xl animate-fadeIn"
          />
          <div className="max-w-3xl mx-auto">
            <h1 className="text-2xl md:text-3xl lg:text-4xl font-semibold drop-shadow-2xl">
              Equipos de elevación que{" "}
              <span className="text-easyliftAccent font-bold">optimizarán</span>{" "}
              tu depósito, tu logística y tu producción.
            </h1>
            <p className="mt-3 text-sm md:text-base text-slate-100/85 drop-shadow-lg">
              Autoelevadores, transpaletas, apiladores y plataformas con
              asesoramiento especializado, entrega rápida y servicio postventa.
            </p>
            <div className="mt-6 flex flex-wrap gap-4 justify-center">
              <a href="#contacto" className="btn btn-primary">
                Pedir cotización <ArrowRight size={18} />
              </a>
              <a href="#productos" className="btn btn-outline">
                Ver productos
              </a>
            </div>
          </div>
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

          <div className="mt-10 grid gap-6 md:grid-cols-4">
            {[
              {
                title: "Autoelevadores",
                icon: <Shield className="text-easyliftBlue" />,
                desc: "Equipos para trabajo intenso, eléctricos y a combustión.",
              },
              {
                title: "Transpaletas / Zorras",
                icon: <Wrench className="text-easyliftBlue" />,
                desc: "Movimiento interno ágil y seguro de pallets.",
              },
              {
                title: "Apiladores",
                icon: <Timer className="text-easyliftBlue" />,
                desc: "Aprovechá la altura de tu depósito al máximo.",
              },
              {
                title: "Plataformas",
                icon: <Star className="text-easyliftBlue" />,
                desc: "Trabajos en altura con máxima seguridad y estabilidad.",
              },
            ].map((c) => (
              <motion.div
                key={c.title}
                {...fadeIn}
                className="rounded-2xl bg-[#f6f7ff] shadow-md ring-1 ring-slate-200 p-6 transition-all hover:shadow-lg text-center"
              >
                <div className="flex items-center justify-center mb-3">
                  <div className="rounded-2xl bg-[#e1e6ff] p-3">{c.icon}</div>
                </div>
                <h3 className="text-lg font-semibold text-slate-900">
                  {c.title}
                </h3>
                <p className="mt-3 text-sm text-slate-600">{c.desc}</p>
                <a
                  href="#contacto"
                  className="mt-4 inline-flex items-center gap-2 text-easyliftBlue hover:underline font-medium"
                >
                  Consultar opciones <ArrowRight size={16} />
                </a>
              </motion.div>
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
              <li>• Posibilidad de alquiler según necesidad.</li>
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
          <motion.div {...fadeIn} className="max-w-3xl">
            <h2 className="text-3xl md:text-4xl font-bold text-easyliftBlue">
              Cómo trabajamos
            </h2>
            <p className="mt-3 text-slate-600">
              Buscamos que el proceso sea claro, rápido y sin sorpresas.
            </p>
          </motion.div>

          <div className="mt-10 grid gap-6 md:gap-8 md:grid-cols-3">
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
                  "Combinamos compra, financiación o alquiler.",
                  "Coordinamos entrega y tiempos.",
                ],
              },
              {
                step: "3",
                title: "Entrega y soporte",
                items: [
                  "Entregamos y dejamos el equipo operativo.",
                  "Capacitación básica para el personal.",
                  "Mantenimiento y soporte postventa.",
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

      {/* CONTACTO */}
      <section
        id="contacto"
        className="section bg-gradient-to-b from-slate-50 to-white"
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
                className="btn btn-outline"
              >
                <MessageCircle size={18} />
                WhatsApp
              </a>
            </div>
          </motion.div>

          <motion.div
            {...fadeIn}
            className="rounded-2xl bg-white shadow-lg ring-1 ring-slate-200 p-8 hover:shadow-xl transition-shadow"
          >
            <form className="space-y-5 text-sm">
              <input
                className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none text-slate-800 placeholder:text-slate-400 focus:ring-2 focus:ring-easyliftAccent"
                placeholder="Nombre"
                required
              />
              <input
                type="email"
                className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none text-slate-800 placeholder:text-slate-400 focus:ring-2 focus:ring-easyliftAccent"
                placeholder="Email o teléfono"
                required
              />
              <select
                className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none text-slate-800 focus:ring-2 focus:ring-easyliftAccent"
                defaultValue=""
              >
                <option value="" disabled>
                  ¿Qué estás buscando?
                </option>
                <option>Autoelevadores</option>
                <option>Transpaletas / Zorras</option>
                <option>Apiladores</option>
                <option>Plataformas</option>
                <option>Combinación de varios equipos</option>
              </select>
              <textarea
                className="w-full min-h-[130px] rounded-xl border border-slate-300 px-4 py-3 outline-none text-slate-800 placeholder:text-slate-400 focus:ring-2 focus:ring-easyliftAccent"
                placeholder="Depósito, tipo de carga, horas de uso, etc."
                required
              />
              <button
                type="submit"
                className="btn btn-primary w-full justify-center"
              >
                Enviar consulta
              </button>
            </form>
          </motion.div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-slate-200 bg-slate-50 py-8">
        <div className="container flex flex-col md:flex-row items-center justify-between gap-4 text-[12px] text-slate-500">
          <div className="flex items-center gap-3">
            <img src="/easylift-logo.png" className="h-8" />
            <span>
              © {new Date().getFullYear()} Easylift. Todos los derechos
              reservados.
            </span>
          </div>
          <div className="flex items-center gap-4">
            <a href="#productos" className="hover:text-easyliftBlue">
              Productos
            </a>
            <a href="#sectores" className="hover:text-easyliftBlue">
              Sectores
            </a>
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
        className="fixed bottom-6 right-6 grid h-12 w-12 place-content-center rounded-full bg-easyliftBlue text-white shadow-lg hover:scale-105 transition-transform"
        aria-label="WhatsApp"
      >
        <MessageCircle />
      </a>
    </div>
  );
}

export default App;
