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
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import {
  CATEGORY_LABEL,
  PRODUCTS,
  type ProductCategory,
  type Product,
} from "../data/products";

const WHATSAPP = "https://wa.me/5493516501260";

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
  const [currentImgIndex, setCurrentImgIndex] = useState(0);

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
      const haystack =
        `${p.id} ${p.name} ${p.description} ${p.features.join(" ")}`.toLowerCase();
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

  const openModal = (product: Product) => {
    setSelectedProduct(product);
    setCurrentImgIndex(0);
  };

  const closeModal = () => {
    setSelectedProduct(null);
    setCurrentImgIndex(0);
  };

  const nextImage = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    if (selectedProduct && selectedProduct.images.length > 1) {
      setCurrentImgIndex((prev) => (prev + 1) % selectedProduct.images.length);
    }
  };

  const prevImage = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    if (selectedProduct && selectedProduct.images.length > 1) {
      setCurrentImgIndex(
        (prev) =>
          (prev - 1 + selectedProduct.images.length) %
          selectedProduct.images.length
      );
    }
  };

  const selectedFeatures = selectedProduct?.features ?? [];

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-[#edf2ff] text-slate-900">
      <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/90 backdrop-blur-lg shadow-[0_2px_8px_rgba(0,0,0,0.03)]">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:h-20">
          <button
            onClick={goHomeTop}
            className="flex items-center transition-transform hover:scale-[1.03]"
            type="button"
          >
            <img
              src="/easylift-logo.png"
              alt="Easylift"
              className="h-11 w-auto object-contain sm:h-16 md:h-20"
              style={{ minWidth: "110px" }}
            />
          </button>

          <nav className="ml-10 hidden items-center gap-10 md:flex">
            {nav.map((n) => (
              <button
                key={n.id}
                type="button"
                onClick={() => goToSection(n.id)}
                className="text-[15px] font-medium text-slate-600 transition-colors hover:text-easyliftBlue"
              >
                {n.label}
              </button>
            ))}
          </nav>

          <div className="ml-8 hidden items-center gap-6 border-l border-slate-200 pl-8 md:flex">
            <a
              href="https://www.instagram.com"
              target="_blank"
              rel="noreferrer"
              className="text-slate-500 transition hover:text-easyliftBlue"
            >
              <Instagram size={20} />
            </a>
            <a
              href={WHATSAPP}
              target="_blank"
              rel="noreferrer"
              className="flex items-center justify-center gap-2 rounded-lg border border-easyliftBlue px-5 py-2.5 font-medium text-easyliftBlue shadow-sm transition hover:bg-easyliftBlue hover:text-white"
            >
              <Phone size={18} /> Llamar
            </a>
          </div>

          <button
            className="rounded-xl p-2 hover:bg-slate-100 md:hidden"
            onClick={() => setOpen(true)}
            type="button"
          >
            <Menu />
          </button>
        </div>
      </header>

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
              className="fixed right-0 top-0 z-50 flex h-screen w-full max-w-xs flex-col bg-white p-6 text-slate-800 shadow-lg sm:max-w-sm"
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
                    className="rounded-lg px-4 py-3 text-left text-base font-medium transition-colors hover:bg-slate-100"
                  >
                    {n.label}
                  </button>
                ))}
              </nav>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="mx-auto max-w-7xl px-4 pb-16 pt-6 sm:pt-12">
        <div className="grid min-h-[52px] grid-cols-1 gap-3 sm:grid-cols-2 sm:items-center sm:gap-4">
          <button
            onClick={goHomeTop}
            className="inline-flex items-center gap-2 text-sm font-semibold text-easyliftBlue hover:underline sm:justify-self-start"
            type="button"
          >
            <ArrowLeft size={16} /> Volver
          </button>

          <button
            onClick={clearFilters}
            className={`inline-flex h-11 w-full items-center justify-center gap-2 rounded-xl border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-700 transition sm:min-w-[150px] sm:w-auto sm:justify-self-end ${
              hasFilters ? "opacity-100" : "pointer-events-none opacity-0"
            }`}
            type="button"
          >
            <X size={16} /> Limpiar filtros
          </button>
        </div>

        <div className="mt-4">
          <h1 className="text-2xl font-bold tracking-tight text-easyliftBlue sm:text-3xl md:text-5xl">
            Catálogo
          </h1>
        </div>

        <div className="mt-6 rounded-[24px] bg-white p-4 shadow-[0_10px_30px_rgba(2,6,23,0.06)] ring-1 ring-slate-200 sm:mt-8 sm:p-6">
          <div className="flex items-center gap-3 sm:gap-4">
            <div className="grid h-11 w-11 shrink-0 place-content-center rounded-2xl bg-slate-50 ring-1 ring-slate-200 sm:h-12 sm:w-12">
              <Search className="text-slate-700" size={20} />
            </div>

            <input
              value={q}
              onChange={(e) => {
                setQuery(e.target.value);
                setSearch(e.target.value);
              }}
              placeholder="Buscar..."
              className="h-11 w-full rounded-2xl border border-slate-200 bg-white px-4 text-[15px] text-slate-800 outline-none placeholder:text-slate-400 focus:ring-2 focus:ring-easyliftAccent sm:h-12"
            />
          </div>

          <div className="mt-4 flex flex-wrap gap-2 sm:mt-5">
            <button
              onClick={() => setCategory(null)}
              className={`h-10 rounded-2xl px-4 text-sm font-medium ring-1 transition sm:h-11 ${
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
                className={`h-10 rounded-2xl px-4 text-sm font-medium ring-1 transition sm:h-11 ${
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

        <div className="mt-6 grid gap-5 sm:mt-8 sm:grid-cols-2 xl:grid-cols-3">
          {filtered.map((p) => (
            <button
              key={p.id}
              type="button"
              onClick={() => openModal(p)}
              className="overflow-hidden rounded-[26px] bg-white text-left shadow-[0_14px_30px_rgba(15,23,42,0.07)] ring-1 ring-slate-200 transition hover:-translate-y-1 hover:shadow-[0_20px_40px_rgba(15,23,42,0.10)]"
            >
              <div className="flex h-48 w-full items-center justify-center overflow-hidden bg-[#edf2f7] sm:h-56">
                <img
                  src={p.images[0]}
                  alt={p.name}
                  className="h-full w-full object-contain p-4 sm:p-5"
                  loading="lazy"
                />
              </div>

              <div className="p-4 sm:p-6">
                <span className="inline-flex items-center rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-600">
                  {p.id}
                </span>

                <h3 className="mt-3 text-lg font-semibold leading-tight text-slate-900 sm:mt-4 sm:text-xl">
                  {p.name}
                </h3>

                <p className="mt-2 line-clamp-3 text-sm leading-6 text-slate-600 sm:mt-3 sm:text-[15px] sm:leading-7">
                  {p.description}
                </p>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* MODAL DETALLE DE PRODUCTO (ESTILO DRAWER/SHEET) */}
      <AnimatePresence>
        {selectedProduct && (
          <>
            {/* Backdrop oscuro con blur */}
            <motion.div
              className="fixed inset-0 z-[60] bg-slate-900/60 backdrop-blur-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={closeModal}
            />

            <motion.div
              initial={{ y: "100%" }}
              animate={{ y: "4%" }} // Deja un pequeño margen arriba para que se vea el fondo
              exit={{ y: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed inset-x-0 bottom-0 z-[70] mx-auto flex h-[96dvh] w-full max-w-5xl flex-col overflow-hidden rounded-t-[40px] bg-white shadow-2xl md:h-[90dvh] md:rounded-3xl md:grid md:grid-cols-[1.2fr_0.8fr]"
              onClick={(e) => e.stopPropagation()}
            >

              {/* Botón Cerrar Flotante */}
              <button 
                onClick={closeModal} 
                className="absolute right-5 top-5 z-50 flex h-10 w-10 items-center justify-center rounded-full bg-slate-100 text-slate-500 transition-transform active:scale-90"
              >
                <X size={20} />
              </button>

              {/* COLUMNA IZQUIERDA: Galería */}
              <div className="relative flex h-[35%] items-center justify-center bg-slate-50 p-6 md:h-full md:p-12">
                <AnimatePresence mode="wait">
                  <motion.img
                    key={currentImgIndex}
                    src={selectedProduct.images[currentImgIndex]}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    className="h-full w-full object-contain"
                  />
                </AnimatePresence>
                
                {selectedProduct.images.length > 1 && (
                  <div className="absolute inset-x-4 top-1/2 flex -translate-y-1/2 justify-between">
                    <button onClick={prevImage} className="rounded-full bg-white/80 p-2 shadow-sm backdrop-blur-md hover:bg-white"><ChevronLeft /></button>
                    <button onClick={nextImage} className="rounded-full bg-white/80 p-2 shadow-sm backdrop-blur-md hover:bg-white"><ChevronRight /></button>
                  </div>
                )}
              </div>

              {/* COLUMNA DERECHA: Información */}
              <div className="flex flex-1 flex-col overflow-hidden border-t border-slate-100 md:border-l md:border-t-0">
                <div className="flex-1 overflow-y-auto p-6 md:p-10">
                  <span className="text-[10px] font-black uppercase tracking-widest text-easyliftBlue/50">Modelo {selectedProduct.id}</span>
                  <h2 className="mt-1 text-2xl font-extrabold text-slate-900 md:text-3xl">{selectedProduct.name}</h2>
                  
                  <div className="mt-3 inline-flex items-center gap-2 rounded-full bg-blue-50 px-3 py-1 text-xs font-bold text-easyliftBlue">
                    <div className="h-1.5 w-1.5 rounded-full bg-easyliftBlue" />
                    {CATEGORY_LABEL[selectedProduct.category]}
                  </div>

                  <div className="mt-8 space-y-6">
                    <section>
                      <h3 className="text-[11px] font-black uppercase tracking-wider text-slate-400">Descripción</h3>
                      <p className="mt-2 text-sm leading-relaxed text-slate-600 md:text-base">{selectedProduct.description}</p>
                    </section>

                    {selectedFeatures.length > 0 && (
                      <section>
                        <h3 className="text-[11px] font-black uppercase tracking-wider text-slate-400">Especificaciones</h3>
                        <ul className="mt-3 grid gap-2">
                          {selectedFeatures.map((f, i) => (
                            <li key={i} className="flex items-start gap-3 rounded-xl border border-slate-100 bg-slate-50/50 p-3 text-sm text-slate-600">
                              <div className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-easyliftBlue/40" />
                              {f}
                            </li>
                          ))}
                        </ul>
                      </section>
                    )}
                  </div>
                </div>

                {/* Acción fija abajo */}
                <div className="border-t border-slate-100 bg-white p-6 md:p-10">
                  <a
                    href={`${WHATSAPP}?text=Hola! Me interesa el equipo: ${selectedProduct.name}`}
                    target="_blank" rel="noreferrer"
                    className="flex w-full items-center justify-center gap-3 rounded-2xl bg-easyliftBlue py-4 text-sm font-bold text-white shadow-xl shadow-blue-200 transition-all hover:brightness-110 active:scale-[0.98]"
                  >
                    Consultar por WhatsApp <Phone size={18} />
                  </a>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}