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

  const nextImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (selectedProduct && selectedProduct.images.length > 1) {
      setCurrentImgIndex((prev) => (prev + 1) % selectedProduct.images.length);
    }
  };

  const prevImage = (e: React.MouseEvent) => {
    e.stopPropagation();
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
        <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-4">
          <button
            onClick={goHomeTop}
            className="flex items-center transition-transform hover:scale-[1.03]"
            type="button"
          >
            <img
              src="/easylift-logo.png"
              alt="Easylift"
              className="h-14 w-auto object-contain sm:h-16 md:h-20"
              style={{ minWidth: "150px" }}
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

      <div className="mx-auto max-w-7xl px-4 pb-16 pt-8 sm:pt-12">
        <div className="grid min-h-[52px] grid-cols-2 items-center gap-4">
          <button
            onClick={goHomeTop}
            className="justify-self-start inline-flex items-center gap-2 text-sm font-semibold text-easyliftBlue hover:underline"
            type="button"
          >
            <ArrowLeft size={16} /> Volver
          </button>

          <button
            onClick={clearFilters}
            className={`justify-self-end inline-flex h-11 min-w-[150px] items-center justify-center gap-2 rounded-xl border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-700 transition ${
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

        <div className="mt-8 rounded-[24px] bg-white p-5 shadow-[0_10px_30px_rgba(2,6,23,0.06)] ring-1 ring-slate-200 sm:p-6">
          <div className="flex items-center gap-4">
            <div className="grid h-12 w-12 shrink-0 place-content-center rounded-2xl bg-slate-50 ring-1 ring-slate-200">
              <Search className="text-slate-700" size={22} />
            </div>

            <input
              value={q}
              onChange={(e) => {
                setQuery(e.target.value);
                setSearch(e.target.value);
              }}
              placeholder="Buscar..."
              className="h-12 w-full rounded-2xl border border-slate-200 bg-white px-4 text-[15px] text-slate-800 outline-none placeholder:text-slate-400 focus:ring-2 focus:ring-easyliftAccent"
            />
          </div>

          <div className="mt-5 flex flex-wrap gap-2">
            <button
              onClick={() => setCategory(null)}
              className={`h-11 rounded-2xl px-4 text-sm font-medium ring-1 transition ${
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
                className={`h-11 rounded-2xl px-4 text-sm font-medium ring-1 transition ${
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

        <div className="mt-8 grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
          {filtered.map((p) => (
            <button
              key={p.id}
              type="button"
              onClick={() => openModal(p)}
              className="overflow-hidden rounded-[26px] bg-white text-left shadow-[0_14px_30px_rgba(15,23,42,0.07)] ring-1 ring-slate-200 transition hover:-translate-y-1 hover:shadow-[0_20px_40px_rgba(15,23,42,0.10)]"
            >
              <div className="flex h-56 w-full items-center justify-center overflow-hidden bg-[#edf2f7]">
                <img
                  src={p.images[0]}
                  alt={p.name}
                  className="h-full w-full object-contain p-5"
                  loading="lazy"
                />
              </div>

              <div className="p-5 sm:p-6">
                <span className="inline-flex items-center rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-600">
                  {p.id}
                </span>

                <h3 className="mt-4 text-xl font-semibold leading-tight text-slate-900">
                  {p.name}
                </h3>

                <p className="mt-3 line-clamp-3 text-[15px] leading-7 text-slate-600">
                  {p.description}
                </p>
              </div>
            </button>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {selectedProduct && (
          <motion.div
            className="fixed inset-0 z-[60] bg-black/70 p-4 backdrop-blur-sm md:p-8"
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
              <div className="grid h-[90vh] w-full overflow-hidden rounded-3xl bg-white shadow-2xl md:grid-cols-[1.35fr_0.85fr]">
                <div className="group relative flex items-center justify-center overflow-hidden bg-slate-100 p-4 md:p-8">
                  {selectedProduct.images.length > 1 && (
                    <button
                      onClick={prevImage}
                      className="absolute left-4 z-10 hidden rounded-full bg-white/80 p-2 text-easyliftBlue shadow-md transition-all hover:bg-white md:block md:opacity-0 md:group-hover:opacity-100"
                    >
                      <ChevronLeft size={28} />
                    </button>
                  )}

                  <div
                    className="flex h-full w-full cursor-pointer items-center justify-center overflow-hidden"
                    onClick={
                      selectedProduct.images.length > 1 ? nextImage : undefined
                    }
                  >
                    <AnimatePresence mode="wait">
                      <motion.img
                        key={currentImgIndex}
                        initial={{ opacity: 0, x: 10 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -10 }}
                        transition={{ duration: 0.2 }}
                        src={selectedProduct.images[currentImgIndex]}
                        alt={selectedProduct.name}
                        className={`h-full w-full object-contain ${
                          selectedProduct.id === "CTS20S"
                            ? "scale-[0.88] -translate-y-4"
                            : ""
                        }`}
                      />
                    </AnimatePresence>
                  </div>

                  {selectedProduct.images.length > 1 && (
                    <button
                      onClick={nextImage}
                      className="absolute right-4 z-10 hidden rounded-full bg-white/80 p-2 text-easyliftBlue shadow-md transition-all hover:bg-white md:block md:opacity-0 md:group-hover:opacity-100"
                    >
                      <ChevronRight size={28} />
                    </button>
                  )}
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
                    >
                      <X size={22} />
                    </button>
                  </div>

                  <div className="flex-1 min-w-0 overflow-y-auto p-5 md:p-6">
                    <div className="rounded-2xl bg-slate-50 p-4 ring-1 ring-slate-200">
                      <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-500">
                        Categoría
                      </p>
                      <p className="mt-1 text-sm font-semibold text-slate-800">
                        {CATEGORY_LABEL[selectedProduct.category]}
                      </p>
                    </div>

                    <div className="mt-5">
                      <h3 className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-500">
                        Descripción
                      </h3>
                      <p className="mt-2 text-[15px] leading-7 text-slate-700">
                        {selectedProduct.description}
                      </p>
                    </div>

                    {selectedFeatures.length > 0 && (
                      <div className="mt-6">
                        <h3 className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-500">
                          Características
                        </h3>

                        <ul className="mt-3 space-y-2 pl-5">
                          {selectedFeatures.map((feature, index) => (
                            <li
                              key={`${selectedProduct.id}-feature-${index}`}
                              className="list-disc whitespace-normal break-words text-sm leading-6 text-slate-700 marker:text-easyliftBlue"
                            >
                              {feature}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {selectedProduct.images.length > 1 && (
                      <div className="mt-6">
                        <h3 className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-500">
                          Más imágenes
                        </h3>

                        <div className="mt-3 flex flex-wrap gap-2">
                          {selectedProduct.images.map((img, index) => (
                            <button
                              key={`${selectedProduct.id}-thumb-${index}`}
                              type="button"
                              onClick={() => setCurrentImgIndex(index)}
                              className={`h-16 w-16 overflow-hidden rounded-xl border transition ${
                                currentImgIndex === index
                                  ? "border-easyliftBlue ring-2 ring-easyliftBlue/20"
                                  : "border-slate-200 hover:border-slate-300"
                              }`}
                            >
                              <img
                                src={img}
                                alt={`${selectedProduct.name} ${index + 1}`}
                                className="h-full w-full object-cover"
                              />
                            </button>
                          ))}
                        </div>
                      </div>
                    )}
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