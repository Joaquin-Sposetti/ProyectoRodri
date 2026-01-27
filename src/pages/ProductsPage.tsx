import { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate, useSearchParams } from "react-router-dom";
import { ArrowLeft, Search, X, Menu, Phone, Instagram, Facebook, Linkedin } from "lucide-react";
import { CATEGORY_LABEL, PRODUCTS, type ProductCategory } from "../data/products";

const WHATSAPP = "https://wa.me/5490000000000"; // poné el número real

const nav = [
  { id: "inicio", label: "Inicio" },
  { id: "productos", label: "Productos" },
  { id: "servicios", label: "Servicios" },
  { id: "pasos", label: "Proceso" },
  { id: "sectores", label: "Sectores" },
  { id: "contacto", label: "Contacto" },
];

const FALLBACK_IMG = "/fondo2.png";

const categories: ProductCategory[] = [
  "autoelevadores",
  "transpaletas",
  "apiladores",
  "plataformas",
];

export default function ProductsPage() {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const [params, setParams] = useSearchParams();
  const cat = (params.get("cat") as ProductCategory | null) ?? null;
  const qParam = params.get("q") ?? "";
  const [q, setQuery] = useState(qParam);

  // bloquear scroll cuando el menú está abierto
  useEffect(() => {
    if (open) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  // mantener el input sincronizado si cambia el URL manualmente
  useEffect(() => {
    setQuery(qParam);
  }, [qParam]);

  const hasFilters = !!cat || !!qParam;

  const filtered = useMemo(() => {
    const query = qParam.trim().toLowerCase();
    return PRODUCTS.filter((p) => {
      const okCat = !cat || p.category === cat;
      const haystack = `${p.name} ${p.description}`.toLowerCase();
      const okQuery = !query || haystack.includes(query);
      return okCat && okQuery;
    });
  }, [cat, qParam]);

  function setCategory(next: ProductCategory | null) {
    const nextParams = new URLSearchParams(params);
    if (!next) nextParams.delete("cat");
    else nextParams.set("cat", next);
    setParams(nextParams);
  }

  function setSearch(next: string) {
    const nextParams = new URLSearchParams(params);
    const value = next.trim();
    if (!value) nextParams.delete("q");
    else nextParams.set("q", value);
    setParams(nextParams);
  }

  function clearFilters() {
    setQuery("");
    setParams({});
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-[#edf2ff] text-slate-900">
      {/* NAVBAR (MISMA QUE HOME, solo ajustamos href a /#... ) */}
      <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/90 backdrop-blur-lg shadow-[0_2px_8px_rgba(0,0,0,0.03)]">
  <div className="max-w-7xl mx-auto flex h-20 items-center justify-between px-4">
    {/* Logo */}
    <button
      onClick={() => navigate("/")}
      className="flex items-center hover:scale-[1.03] transition-transform"
    >
      <img
        src="/easylift-logo.png"
        alt="Easylift"
        className="h-14 sm:h-16 md:h-20 w-auto object-contain"
        style={{ minWidth: "150px" }}
      />
    </button>

    {/* Links desktop */}
    <nav className="hidden md:flex items-center gap-10 ml-10">
      {nav.map((n) => (
        <button
          key={n.id}
          type="button"
          onClick={() => {
            // 👉 Si estamos en Home, scrollea
            if (location.pathname === "/") {
              const el = document.getElementById(n.id);
              if (el) {
                el.scrollIntoView({ behavior: "smooth", block: "start" });
              }
            } else {
              // 👉 Si estamos en /productos u otra página, vuelve a Home + anchor
              navigate(`/#${n.id}`);
            }
          }}
          className="text-[15px] font-medium text-slate-600 hover:text-easyliftBlue transition-colors"
        >
          {n.label}
        </button>
      ))}

      {/* Catálogo */}
      <button
        onClick={() => {
          if (location.pathname === "/productos") {
            const el = document.getElementById("catalogo");
            if (el) el.scrollIntoView({ behavior: "smooth" });
          } else {
            navigate("/productos");
          }
        }}
        className="text-[15px] font-medium text-slate-600 hover:text-easyliftBlue transition-colors"
        type="button"
      >
        Catálogo
      </button>
    </nav>

    {/* Redes + botones desktop */}
    <div className="hidden md:flex items-center gap-6 ml-8 pl-8 border-l border-slate-200">
      <div className="flex items-center gap-3">
        <Instagram size={20} className="text-slate-500 hover:text-easyliftBlue" />
        <Facebook size={20} className="text-slate-500 hover:text-easyliftBlue" />
        <Linkedin size={20} className="text-slate-500 hover:text-easyliftBlue" />
      </div>

      <a
        href={WHATSAPP}
        target="_blank"
        rel="noreferrer"
        className="flex items-center justify-center gap-2 border border-easyliftBlue text-easyliftBlue px-5 py-2.5 rounded-lg hover:bg-easyliftBlue hover:text-white transition shadow-sm font-medium"
      >
        <Phone size={18} />
        Llamar
      </a>
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

      {/* MENÚ MOBILE CON FONDO DIFUMINADO (solo fondo, menú no) */}
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
                    href={`/#${n.id}`}
                    onClick={() => setOpen(false)}
                    className="rounded-lg px-4 py-3 text-base font-medium hover:bg-slate-100 transition-colors"
                  >
                    {n.label}
                  </a>
                ))}

                <button
                  onClick={() => {
                    setOpen(false);
                    navigate("/productos");
                  }}
                  className="mt-2 rounded-lg px-4 py-3 text-base font-semibold text-easyliftBlue hover:bg-slate-100 transition-colors text-left"
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
                <a
                  href="/#contacto"
                  onClick={() => setOpen(false)}
                  className="flex items-center justify-center gap-2 bg-easyliftBlue text-white font-semibold py-2 rounded-xl hover:bg-easyliftBlueSoft transition text-sm"
                >
                  Pedir presupuesto
                </a>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* CONTENIDO CATÁLOGO */}
      <div className="container pt-8 sm:pt-12 pb-16">
        {/* Top bar */}
        <div className="flex items-center justify-between gap-4">
          <button
            onClick={() => navigate("/")}
            className="inline-flex items-center gap-2 text-sm font-semibold text-easyliftBlue hover:underline"
            type="button"
          >
            <ArrowLeft size={16} />
            Volver a la Home
          </button>

          {hasFilters && (
            <button
              onClick={clearFilters}
              className="inline-flex items-center gap-2 rounded-xl border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50"
              type="button"
            >
              <X size={16} />
              Limpiar filtros
            </button>
          )}
        </div>

        <h1 className="mt-4 text-2xl sm:text-3xl md:text-4xl font-bold text-easyliftBlue">
          Catálogo
        </h1>
        <p className="mt-2 text-sm sm:text-base text-slate-600 max-w-2xl">
          Buscá por nombre o descripción y filtrá por categoría. Podés limpiar filtros para ver todo.
        </p>

        {/* Search + Filters */}
        <div className="mt-6 rounded-2xl bg-white shadow-md ring-1 ring-slate-200 p-4 sm:p-5">
          <div className="flex items-center gap-3">
            <div className="grid h-10 w-10 place-content-center rounded-xl bg-[#e1e6ff]">
              <Search className="text-easyliftBlue" size={18} />
            </div>

            <input
              value={q}
              onChange={(e) => {
                const next = e.target.value;
                setQuery(next);
                setSearch(next);
              }}
              placeholder="Buscar por nombre o descripción..."
              className="w-full rounded-xl border border-slate-300 px-4 py-2.5 outline-none text-slate-800 placeholder:text-slate-400 focus:ring-2 focus:ring-easyliftAccent"
            />
          </div>

          <div className="mt-4 flex flex-wrap gap-2">
            <button
              onClick={() => setCategory(null)}
              className={`rounded-xl px-3 py-2 text-sm font-medium ring-1 transition
                ${
                  !cat
                    ? "bg-easyliftBlue text-white ring-easyliftBlue"
                    : "bg-white text-slate-700 ring-slate-200 hover:bg-slate-50"
                }`}
              type="button"
            >
              Todos
            </button>

            {categories.map((c) => (
              <button
                key={c}
                onClick={() => setCategory(c)}
                className={`rounded-xl px-3 py-2 text-sm font-medium ring-1 transition
                  ${
                    cat === c
                      ? "bg-easyliftBlue text-white ring-easyliftBlue"
                      : "bg-white text-slate-700 ring-slate-200 hover:bg-slate-50"
                  }`}
                type="button"
              >
                {CATEGORY_LABEL[c]}
              </button>
            ))}
          </div>
        </div>

        {/* Cards */}
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((p) => (
            <div
              key={p.id}
              className="overflow-hidden rounded-2xl bg-white shadow-md ring-1 ring-slate-200 hover:shadow-lg transition"
            >
              <div className="h-44 w-full bg-slate-100">
                <img
                  src={p.image}
                  alt={p.name}
                  className="h-full w-full object-cover"
                  loading="lazy"
                  onError={(e) => {
                    const img = e.currentTarget;
                    if (img.src.includes(FALLBACK_IMG)) return;
                    img.src = FALLBACK_IMG;
                  }}
                />
              </div>
              <div className="p-5">
                <h3 className="text-lg font-semibold text-slate-900">{p.name}</h3>
                <p className="mt-2 text-sm text-slate-600">{p.description}</p>
              </div>
            </div>
          ))}

          {filtered.length === 0 && (
            <div className="rounded-2xl bg-white ring-1 ring-slate-200 p-6 text-slate-600">
              No se encontraron productos con esos filtros.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
