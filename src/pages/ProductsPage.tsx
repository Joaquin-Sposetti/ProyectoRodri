import { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate, useSearchParams, useLocation } from "react-router-dom";
import {
  ArrowLeft,
  Search,
  X,
  Menu,
  Phone,
  Instagram,
} from "lucide-react";
import {
  CATEGORY_LABEL,
  PRODUCTS,
  type ProductCategory,
  type Product,
} from "../data/products";

const WHATSAPP = "https://wa.me/5493516501260";
const FALLBACK_IMG = "/fondo2.png";

const nav = [
  { id: "inicio", label: "Inicio" },
  { id: "productos", label: "Productos" },
  { id: "servicios", label: "Servicios" },
  { id: "pasos", label: "Proceso" },
  { id: "sectores", label: "Sectores" },
  { id: "contacto", label: "Contacto" },
];

const categories: ProductCategory[] = [
  "autoelevadores",
  "transpaletas",
  "apiladores",
  "plataformas",
  "limpieza",
];

export default function ProductsPage() {
  const [open, setOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const navigate = useNavigate();
  const location = useLocation();

  const [params, setParams] = useSearchParams();
  const cat = (params.get("cat") as ProductCategory | null) ?? null;
  const qParam = params.get("q") ?? "";
  const [q, setQuery] = useState(qParam);

  useEffect(() => {
    if (open || selectedProduct) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "";

    return () => {
      document.body.style.overflow = "";
    };
  }, [open, selectedProduct]);

  useEffect(() => {
    setQuery(qParam);
  }, [qParam]);

  const hasFilters = !!cat || !!qParam;

  const filtered = useMemo(() => {
    const query = qParam.trim().toLowerCase();

    return PRODUCTS.filter((p) => {
      const okCat = !cat || p.category === cat;
      const haystack = `${p.id} ${p.name} ${p.description}`.toLowerCase();
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

  const goToSection = (id: string) => {
    setOpen(false);

    if (location.pathname === "/") {
      const el = document.getElementById(id);
      if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
    } else {
      navigate(`/#${id}`);
    }
  };

  const goHomeTop = () => {
    navigate("/");
    setOpen(false);

    setTimeout(() => {
      if (typeof window !== "undefined") {
        window.scrollTo({ top: 0, left: 0, behavior: "auto" });
      }
    }, 0);
  };

  const closeModal = () => setSelectedProduct(null);

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-[#edf2ff] text-slate-900">
      {/* NAVBAR */}
      <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/90 backdrop-blur-lg shadow-[0_2px_8px_rgba(0,0,0,0.03)]">
        <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-4">
          <button
            onClick={goHomeTop}
            className="flex items-center hover:scale-[1.03] transition-transform"
            type="button"
          >
            <img
              src="/easylift-logo.png"
              alt="Easylift"
              className="h-14 sm:h-16 md:h-20 w-auto object-contain"
              style={{ minWidth: "150px" }}
            />
          </button>

          <nav className="hidden md:flex items-center gap-10 ml-10">
            {nav.map((n) => (
              <button
                key={n.id}
                type="button"
                onClick={() => goToSection(n.id)}
                className="text-[15px] font-medium text-slate-600 hover:text-easyliftBlue transition-colors"
              >
                {n.label}
              </button>
            ))}
          </nav>

          <div className="hidden md:flex items-center gap-6 ml-8 pl-8 border-l border-slate-200">
            <div className="flex items-center gap-3">
              <a
                href="https://www.instagram.com"
                target="_blank"
                rel="noreferrer"
                className="text-slate-500 hover:text-easyliftBlue transition"
              >
                <Instagram size={20} />
              </a>
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

          <button
            className="md:hidden rounded-xl p-2 hover:bg-slate-100"
            onClick={() => setOpen(true)}
            aria-label="Abrir menú"
            type="button"
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
                  type="button"
                >
                  <X />
                </button>
              </div>

              <nav className="mt-6 flex flex-col gap-2 border-t border-slate-200 pt-6">
                {nav.map((n) => (
                  <button
                    key={n.id}
                    type="button"
                    onClick={() => goToSection(n.id)}
                    className="rounded-lg px-4 py-3 text-base font-medium hover:bg-slate-100 transition-colors text-left"
                  >
                    {n.label}
                  </button>
                ))}
              </nav>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* CONTENIDO */}
      <div className="mx-auto max-w-7xl px-4 pt-8 sm:pt-12 pb-16">
        {/* FILA SUPERIOR FIJA */}
        <div className="grid grid-cols-2 items-center gap-4 min-h-[52px]">
          <div className="justify-self-start">
            <button
              onClick={goHomeTop}
              className="inline-flex items-center gap-2 text-sm font-semibold text-easyliftBlue hover:underline"
              type="button"
            >
              <ArrowLeft size={16} />
              Volver
            </button>
          </div>

          <div className="justify-self-end">
            <button
              onClick={clearFilters}
              className={`inline-flex h-11 min-w-[150px] items-center justify-center gap-2 rounded-xl border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-700 transition
                ${
                  hasFilters
                    ? "opacity-100"
                    : "opacity-0 pointer-events-none"
                }`}
              type="button"
            >
              <X size={16} />
              Limpiar filtros
            </button>
          </div>
        </div>

        {/* TÍTULO */}
        <div className="mt-4">
          <h1 className="text-2xl sm:text-3xl md:text-5xl font-bold tracking-tight text-easyliftBlue">
            Catálogo
          </h1>
        </div>

        {/* BUSCADOR + FILTROS */}
        <div className="mt-8 rounded-[24px] bg-white shadow-[0_10px_30px_rgba(2,6,23,0.06)] ring-1 ring-slate-200 p-5 sm:p-6">
          <div className="flex items-center gap-4">
            <div className="grid h-12 w-12 shrink-0 place-content-center rounded-2xl bg-slate-50 ring-1 ring-slate-200">
              <Search className="text-slate-700" size={22} />
            </div>

            <input
              value={q}
              onChange={(e) => {
                const next = e.target.value;
                setQuery(next);
                setSearch(next);
              }}
              placeholder="Buscar..."
              className="h-12 w-full rounded-2xl border border-slate-200 bg-white px-4 text-[15px] outline-none text-slate-800 placeholder:text-slate-400 focus:ring-2 focus:ring-easyliftAccent"
            />
          </div>

          <div className="mt-5 flex flex-wrap gap-2">
            <button
              onClick={() => setCategory(null)}
              className={`h-11 rounded-2xl px-4 text-sm font-medium ring-1 transition
                ${
                  !cat
                    ? "bg-easyliftBlue text-white ring-easyliftBlue shadow-[0_10px_20px_rgba(29,78,216,0.20)]"
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
                className={`h-11 rounded-2xl px-4 text-sm font-medium ring-1 transition
                  ${
                    cat === c
                      ? "bg-easyliftBlue text-white ring-easyliftBlue shadow-[0_10px_20px_rgba(29,78,216,0.20)]"
                      : "bg-white text-slate-700 ring-slate-200 hover:bg-slate-50"
                  }`}
                type="button"
              >
                {CATEGORY_LABEL[c]}
              </button>
            ))}
          </div>
        </div>

        {/* CARDS */}
        <div className="mt-8 grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
          {filtered.map((p) => (
            <button
              key={p.id}
              type="button"
              onClick={() => setSelectedProduct(p)}
              className="overflow-hidden rounded-[26px] bg-white shadow-[0_14px_30px_rgba(15,23,42,0.07)] ring-1 ring-slate-200 hover:-translate-y-1 hover:shadow-[0_20px_40px_rgba(15,23,42,0.10)] transition text-left"
            >
              <div className="h-56 w-full bg-[#edf2f7] flex items-center justify-center overflow-hidden">
                <img
                  src={p.image}
                  alt={p.name}
                  className="h-full w-full object-contain p-5"
                  loading="lazy"
                  onError={(e) => {
                    const img = e.currentTarget;
                    if (img.src.includes(FALLBACK_IMG)) return;
                    img.src = FALLBACK_IMG;
                  }}
                />
              </div>

              <div className="p-5 sm:p-6">
                <span className="inline-flex items-center rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-600">
                  {p.id}
                </span>

                <h3 className="mt-4 text-xl font-semibold leading-tight text-slate-900">
                  {p.name}
                </h3>

                <p className="mt-3 text-[15px] leading-8 text-slate-600">
                  {p.description}
                </p>
              </div>
            </button>
          ))}

          {filtered.length === 0 && (
            <div className="rounded-[26px] bg-white ring-1 ring-slate-200 p-6 text-slate-600">
              No se encontraron productos con esos filtros.
            </div>
          )}
        </div>
      </div>

      {/* MODAL PRODUCTO */}
      <AnimatePresence>
        {selectedProduct && (
          <motion.div
            className="fixed inset-0 z-[60] bg-black/70 backdrop-blur-sm p-4 md:p-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeModal}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.96, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: 10 }}
              transition={{ duration: 0.2 }}
              onClick={(e) => e.stopPropagation()}
              className="mx-auto flex h-full max-w-7xl items-center justify-center"
            >
              <div className="grid h-[90vh] w-full overflow-hidden rounded-3xl bg-white shadow-2xl md:grid-cols-[1.4fr_0.8fr]">
                <div className="flex items-center justify-center bg-slate-100 p-4 md:p-8 overflow-hidden">
  <div className="flex h-full w-full items-center justify-center overflow-hidden">
    <img
      src={selectedProduct.image}
      alt={selectedProduct.name}
      className={`h-full w-full object-contain transition-transform duration-200 ${
        selectedProduct.id === "CTS20S"
          ? "scale-[0.88] -translate-y-4"
          : ""
      }`}
      onError={(e) => {
        const img = e.currentTarget;
        if (img.src.includes(FALLBACK_IMG)) return;
        img.src = FALLBACK_IMG;
      }}
    />
  </div>
</div>

                <div className="relative flex h-full flex-col border-l border-slate-200 bg-white">
                  <div className="flex items-start justify-between border-b border-slate-200 p-5 md:p-6">
                    <div>
                      <span className="inline-block rounded-full bg-[#e8edff] px-3 py-1 text-xs font-semibold text-easyliftBlue">
                        {selectedProduct.id}
                      </span>

                      <h2 className="mt-3 text-2xl font-bold text-slate-900">
                        {selectedProduct.name}
                      </h2>
                    </div>

                    <button
                      type="button"
                      onClick={closeModal}
                      className="rounded-xl p-2 text-slate-500 hover:bg-slate-100 hover:text-slate-900"
                      aria-label="Cerrar"
                    >
                      <X size={22} />
                    </button>
                  </div>

                  <div className="flex-1 overflow-y-auto p-5 md:p-6">
                    <div className="rounded-2xl bg-slate-50 p-4 ring-1 ring-slate-200">
                      <p className="text-sm font-medium uppercase tracking-wide text-slate-500">
                        Categoría
                      </p>
                      <p className="mt-1 text-base font-semibold text-slate-800">
                        {CATEGORY_LABEL[selectedProduct.category]}
                      </p>
                    </div>

                    <div className="mt-5">
                      <h3 className="text-sm font-semibold uppercase tracking-wide text-slate-500">
                        Descripción
                      </h3>
                      <p className="mt-2 text-base leading-7 text-slate-700">
                        {selectedProduct.description}
                      </p>
                    </div>
                  </div>

                  <div className="border-t border-slate-200 p-5 md:p-6">
                    <a
                      href={`${WHATSAPP}?text=${encodeURIComponent(
                        `Hola, me interesa el producto ${selectedProduct.name} (${selectedProduct.id}).`
                      )}`}
                      target="_blank"
                      rel="noreferrer"
                      className="flex w-full items-center justify-center rounded-2xl bg-easyliftBlue px-5 py-3 text-sm font-semibold text-white hover:bg-easyliftBlueSoft transition"
                    >
                      Consultar por WhatsApp
                    </a>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}