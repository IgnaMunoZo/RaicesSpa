import React, { useState } from 'react';
import {
  MessageCircle,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  ArrowRight,
  X,
  Camera,
  Maximize2,
  CheckCircle2,
  Users,
  Sparkles
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

import logoImg from './assets/images/logo.webp';

// Fotos Clientes
import ftoImg from './assets/images/fto.webp';
import fto2Img from './assets/images/fto2.webp';
import fto3Img from './assets/images/fto3.webp';

// Fotos Servicios
import masajeImg from './assets/images/masaje.webp';
import masaje2Img from './assets/images/masaje2.webp';
import tinajaImg from './assets/images/tinaja.webp';
import tinaja2Img from './assets/images/tinaja2.webp';
import tinaja3Img from './assets/images/tinaja3.webp';
import tinaja4Img from './assets/images/tinaja4.webp';
import piscinaImg from './assets/images/piscina.webp';
import piscina2Img from './assets/images/piscina2.webp';
import saunaImg from './assets/images/sauna.webp';
import coctelImg from './assets/images/coctel.webp';
import quinchoImg from './assets/images/quincho.webp';
import quincho2Img from './assets/images/quincho2.webp';

const WHATSAPP_PHONE_NUMBER = "56966851831";
const DEFAULT_WHATSAPP_MESSAGE = "¡Hola Raíces Spa! Me gustaría consultar disponibilidad y agendar una experiencia.";

interface SpaceImage {
  src: string;
  alt: string;
}

interface ServiceSpace {
  id: string;
  title: string;
  category: string;
  description: string;
  features?: string[];
  images: SpaceImage[];
}

const CLIENT_PHOTOS: SpaceImage[] = [
  { src: ftoImg, alt: "Cliente disfrutando en Raíces Spa" },
  { src: fto2Img, alt: "Momento de relajación de clientes" }
];

const SPACES: ServiceSpace[] = [
  {
    id: "masajes",
    title: "Sala de Masajes Terapéuticos & Estética",
    category: "Terapias Corporales & Estética",
    description: "Espacio climatizado y privado diseñado para masajes descontracturantes, relajantes, linfáticos y reductivos.",
    features: [
      "Masaje descontracturante y relajante",
      "Drenaje linfático y reductivo",
      "Camilla profesional y aceites naturales"
    ],
    images: [
      { src: masajeImg, alt: "Sala de masajes terapéuticos y estética" },
      { src: masaje2Img, alt: "Detalle de camilla y espacio de masajes" }
    ]
  },
  {
    id: "tinaja",
    title: "Tinaja de Hidromasaje & Espacio Romántico",
    category: "Hidroterapia & Romance",
    description: "Sumérgete en aguas cálidas y reconfortantes en un entorno íntimo decorado con hermosos detalles florales e iluminación tenue.",
    features: [
      "Agua a temperatura ideal",
      "Decoración romántica con corona floral",
      "Hidromasaje y ambiente exclusivo"
    ],
    images: [
      { src: tinajaImg, alt: "Tinaja de hidromasaje con cóctel y corona de flores" },
      { src: tinaja2Img, alt: "Ambiente cálido en tinaja de madera" },
      { src: tinaja3Img, alt: "Detalle de tinaja y velas aromáticas" },
      { src: tinaja4Img, alt: "Vista de la tinaja iluminada" }
    ]
  },
  {
    id: "piscina",
    title: "Piscina Nocturna & Deck de Madera",
    category: "Aguas Cristalinas & Velas",
    description: "Disfruta de nuestra piscina al aire libre rodeada de un acogedor deck de madera iluminado con velas y luces suaves bajo la noche.",
    features: [
      "Piscina cristalina al aire libre",
      "Deck de madera con iluminación de velas",
      "Silla colgante y zona de descanso"
    ],
    images: [
      { src: piscinaImg, alt: "Piscina iluminada con velas y deck de madera" },
      { src: piscina2Img, alt: "Vista panorámica de piscina y área lounge" }
    ]
  },
  {
    id: "sauna",
    title: "Sauna Finlandés en Madera Nativa",
    category: "Termoterapia & Detox",
    description: "Ambiente cálido de sauna seco para desintoxicar tu cuerpo, aliviar la fatiga muscular y disfrutar de un descanso reparador.",
    features: [
      "Madera nativa y calor envolvente",
      "Desintoxicación y relajación muscular",
      "Ambiente privado y silencioso"
    ],
    images: [
      { src: saunaImg, alt: "Sauna seco de madera rústica" }
    ]
  },
  {
    id: "coctel",
    title: "Tabla de Picoteo & Brindis de Bienvenida",
    category: "Gastronomía & Placer",
    description: "Acompaña tu día de descanso con exquisitas tablas de quesos, fiambres, frutos secos y copas con frutillas para brindar.",
    features: [
      "Selección de quesos y embutidos",
      "Copas con espumante y frutillas frescas",
      "Snacks y frutos secos variados"
    ],
    images: [
      { src: coctelImg, alt: "Tabla de picoteo con copas de espumante y frutillas" }
    ]
  },
  {
    id: "quincho",
    title: "Quincho Rústico & Zona de Parrilla",
    category: "Espacios & Convivencia",
    description: "Espacio campestre equipado con asador y mesón de madera para compartir momentos especiales rodeados de tranquilidad.",
    features: [
      "Parrilla y asador campestre",
      "Mesón y lavaplatos rústico de madera",
      "Ambiente techado y acogedor"
    ],
    images: [
      { src: quinchoImg, alt: "Quincho rústico con parrilla y mesón de madera" },
      { src: quincho2Img, alt: "Zona de descanso en quincho" }
    ]
  }
];

// Componente Reutilizable de Carrusel
function ImageCarousel({
  images,
  onImageClick,
  aspectRatioClass = "h-[360px] sm:h-[480px] md:h-[540px]",
  showControlsAlways = false
}: {
  images: SpaceImage[];
  onImageClick: (img: SpaceImage) => void;
  aspectRatioClass?: string;
  showControlsAlways?: boolean;
}) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const prevSlide = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const nextSlide = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  const currentImg = images[currentIndex] || images[0];

  return (
    <div className="group/carousel cursor-pointer space-y-2.5">
      <div
        onClick={() => onImageClick(currentImg)}
        className="relative rounded-2xl overflow-hidden bg-[#142017] shadow-inner border border-[#1e3324] group-hover/carousel:border-[#b89569] transition-all"
      >
        <AnimatePresence mode="wait">
          <motion.img
            key={currentIndex}
            src={currentImg.src}
            alt={currentImg.alt}
            initial={{ opacity: 0.4, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0.4, scale: 0.98 }}
            transition={{ duration: 0.35, ease: "easeInOut" }}
            className={`w-full ${aspectRatioClass} object-cover object-center`}
          />
        </AnimatePresence>

        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-40 group-hover/carousel:opacity-10 transition-opacity" />

        {/* Botón flotante para agrandar imagen */}
        <div className="absolute top-4 right-4 p-2.5 rounded-full bg-black/60 backdrop-blur-md text-white opacity-0 group-hover/carousel:opacity-100 transition-opacity shadow-lg">
          <Maximize2 className="w-4 h-4" />
        </div>

        {/* Controles de Navegación del Carrusel (Flechas Izquierda / Derecha) */}
        {images.length > 1 && (
          <>
            <button
              onClick={prevSlide}
              aria-label="Foto anterior"
              className={`absolute left-3 top-1/2 -translate-y-1/2 p-2.5 sm:p-3 rounded-full bg-black/65 hover:bg-black/85 text-white backdrop-blur-md border border-white/10 transition-all ${showControlsAlways ? 'opacity-90 hover:opacity-100' : 'opacity-0 group-hover/carousel:opacity-100'
                }`}
            >
              <ChevronLeft className="w-5 h-5 text-zinc-100" />
            </button>

            <button
              onClick={nextSlide}
              aria-label="Siguiente foto"
              className={`absolute right-3 top-1/2 -translate-y-1/2 p-2.5 sm:p-3 rounded-full bg-black/65 hover:bg-black/85 text-white backdrop-blur-md border border-white/10 transition-all ${showControlsAlways ? 'opacity-90 hover:opacity-100' : 'opacity-0 group-hover/carousel:opacity-100'
                }`}
            >
              <ChevronRight className="w-5 h-5 text-zinc-100" />
            </button>

            {/* Indicadores de bolitas (Dots) y contador */}
            <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-black/60 backdrop-blur-md border border-white/10">
              {images.map((_, dotIdx) => (
                <button
                  key={dotIdx}
                  onClick={(e) => {
                    e.stopPropagation();
                    setCurrentIndex(dotIdx);
                  }}
                  className={`h-2 rounded-full transition-all ${dotIdx === currentIndex ? 'w-5 bg-[#25D366]' : 'w-2 bg-white/40 hover:bg-white/70'
                    }`}
                  aria-label={`Ir a foto ${dotIdx + 1}`}
                />
              ))}
            </div>
          </>
        )}
      </div>

      {/* Mensaje de Click para ampliar debajo de la imagen */}
      <div className="flex items-center justify-end text-xs text-zinc-400 group-hover/carousel:text-[#25D366] transition-colors px-1">
        <div className="flex items-center gap-1.5">
          <Maximize2 className="w-3.5 h-3.5 text-[#25D366]" />
          <span className="font-medium text-[11px] tracking-wide">Click para ampliar</span>
        </div>
      </div>
    </div>
  );
}

export default function App() {
  const [selectedImage, setSelectedImage] = useState<SpaceImage | null>(null);

  const getWhatsAppLink = (customText?: string) => {
    const text = customText || DEFAULT_WHATSAPP_MESSAGE;
    return `https://wa.me/${WHATSAPP_PHONE_NUMBER}?text=${encodeURIComponent(text)}`;
  };

  const scrollToService = (id: string) => {
    const element = document.getElementById(`espacio-${id}`);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="min-h-screen bg-[#070d0a] text-zinc-100 relative selection:bg-[#346346] selection:text-white">

      {/* ========================================================================= */}
      {/* 1. SECCIÓN PRINCIPAL (HERO / LOGO)                                        */}
      {/* ========================================================================= */}
      <section className="min-h-screen flex flex-col items-center justify-center p-6 relative overflow-hidden text-center">
        {/* Imagen de fondo Hero (fto3) más clara y nítida */}
        <div className="absolute inset-0 z-0 pointer-events-none">
          <img
            src={fto3Img}
            alt="Fondo Raíces Spa"
            className="w-full h-full object-cover object-center opacity-30 filter scale-105"
          />
          {/* Capas suaves de degradado para mantener legibilidad sin oscurecer de más */}
          <div className="absolute inset-0 bg-gradient-to-b from-[#070d0a]/50 via-[#070d0a]/35 to-[#070d0a]" />
        </div>

        {/* Resplandores ambientales */}
        <div className="absolute w-[600px] h-[600px] bg-emerald-950/25 rounded-full blur-3xl pointer-events-none -top-20 z-0" />
        <div className="absolute w-[400px] h-[400px] bg-amber-950/20 rounded-full blur-3xl pointer-events-none bottom-10 z-0" />

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="relative z-10 max-w-lg mx-auto flex flex-col items-center space-y-6 w-full"
        >
          {/* Logo Principal */}
          <div className="relative group">
            <div className="absolute -inset-1.5 rounded-full bg-gradient-to-r from-emerald-600/50 via-amber-600/40 to-teal-600/50 blur-lg group-hover:blur-xl transition-all duration-700 opacity-80 group-hover:opacity-100" />
            <img
              src={logoImg}
              alt="Logo RaicesSpa"
              className="relative w-40 h-40 sm:w-52 sm:h-52 rounded-full object-cover shadow-2xl border-2 border-emerald-700/40 transform transition-transform duration-700 group-hover:scale-105"
            />
          </div>

          {/* Nombre de la Página */}
          <div className="space-y-2">
            <h1 className="text-4xl sm:text-6xl font-serif tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-[#faeee0] via-[#dec3a0] to-[#b3ceb5] drop-shadow-md">
              RaicesSpa
            </h1>
            <p className="text-sm sm:text-base text-[#cfc2af] font-light tracking-wide max-w-sm mx-auto">
              El espacio perfecto para un momento relajante
            </p>
          </div>

          {/* ========================================================================= */}
          {/* CARRUSEL DE CLIENTES (Debajo del título y arriba de WhatsApp)              */}
          {/* ========================================================================= */}
          <div className="w-full max-w-sm sm:max-w-md pt-2">
            <div className="mb-3 inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#111e16] border border-[#233f2c] text-[#c9af88] text-xs font-semibold tracking-wider uppercase shadow-sm">
              <Users className="w-3.5 h-3.5 text-[#25D366]" />
              <span>Ultimos Clientes</span>
            </div>

            <ImageCarousel
              images={CLIENT_PHOTOS}
              onImageClick={(img) => setSelectedImage(img)}
              aspectRatioClass="h-64 sm:h-80"
              showControlsAlways={true}
            />
          </div>

          {/* Botón Principal WhatsApp */}
          <a
            href={getWhatsAppLink()}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 px-8 py-3.5 rounded-full bg-gradient-to-r from-[#25D366] to-[#1a9f4e] hover:from-[#2ef076] hover:to-[#1eb95b] text-[#071c0f] font-semibold text-sm shadow-xl shadow-[#25D366]/20 transition-all duration-300 transform hover:-translate-y-0.5"
          >
            <MessageCircle className="w-5 h-5 fill-current" />
            <span>Contactar por WhatsApp</span>
          </a>

          {/* Flecha animada hacia los servicios */}
          <a
            href="#servicios"
            className="pt-4 flex flex-col items-center gap-2 text-zinc-400 hover:text-[#d8be9b] transition-colors text-xs font-medium tracking-wider uppercase cursor-pointer"
          >
            <span>Nuestros Servicios</span>
            <motion.div
              animate={{ y: [0, 6, 0] }}
              transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
            >
              <ChevronDown className="w-5 h-5 text-[#caa479]" />
            </motion.div>
          </a>
        </motion.div>
      </section>

      {/* ========================================================================= */}
      {/* 2. SECCIÓN: NUESTROS SERVICIOS (CUADROS CLICKEABLES)                      */}
      {/* ========================================================================= */}
      <section id="servicios" className="py-20 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto space-y-12">

        <div className="text-center space-y-3">
          <span className="text-[#c5a478] text-xs font-semibold uppercase tracking-widest">
            Carta de Experiencias
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif text-[#faf5ee]">
            Nuestros Servicios
          </h2>
          <p className="text-zinc-400 text-sm sm:text-base max-w-xl mx-auto leading-relaxed">
            Haz clic en cualquiera de los cuadros para ir directo a ver sus fotos y detalles, o continúa deslizándote hacia abajo.
          </p>
        </div>

        {/* Grid de Cuadros de Texto Clickeables */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {SPACES.map((space, index) => (
            <motion.a
              key={space.id}
              href={`#espacio-${space.id}`}
              onClick={(e) => {
                e.preventDefault();
                scrollToService(space.id);
              }}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.06 }}
              whileHover={{ scale: 1.02, y: -4 }}
              whileTap={{ scale: 0.98 }}
              className="cursor-pointer text-left p-6 rounded-3xl bg-[#0c1410] hover:bg-[#111d16] border border-[#1e3324] hover:border-[#8f7451] transition-all duration-300 shadow-lg hover:shadow-2xl hover:shadow-[#000000]/70 group flex flex-col justify-between"
            >
              <div className="space-y-3">
                <span className="text-[11px] font-semibold tracking-wider text-[#b89569] uppercase block">
                  {space.category}
                </span>

                <h3 className="text-lg sm:text-xl font-serif text-[#f6efe4] group-hover:text-[#ead7bf] transition-colors leading-snug">
                  {space.title}
                </h3>

                <p className="text-xs text-zinc-300 font-light leading-relaxed">
                  {space.description}
                </p>
              </div>

              {/* Botón integrado para ir a ver fotos */}
              <div className="pt-4 mt-4 border-t border-[#1a2c20] flex items-center justify-between text-xs font-medium text-[#c8a983] group-hover:text-white transition-colors">
                <span className="flex items-center gap-1.5">
                  <Camera className="w-3.5 h-3.5 text-[#25D366]" />
                  <span>Ver fotos del espacio</span>
                </span>
                <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
              </div>
            </motion.a>
          ))}
        </div>

      </section>

      {/* ========================================================================= */}
      {/* 3. GALERÍA VISIBLE AL DESLIZAR HACIA ABAJO (CON CARRUSELES)               */}
      {/* ========================================================================= */}
      <section id="galeria" className="py-16 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto space-y-24">

        <div className="text-center space-y-3 pt-6 border-t border-[#16271c]">
          <span className="text-[#c5a478] text-xs font-semibold uppercase tracking-widest">
            Galería Fotográfica
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif text-[#faf5ee]">
            Fotos de las Instalaciones
          </h2>
          <p className="text-zinc-400 text-sm sm:text-base max-w-xl mx-auto leading-relaxed">
            Explora cada rincón de Raíces Spa. Desliza hacia los lados en las fotos o haz clic para verlas en pantalla completa.
          </p>
        </div>

        {/* Lista de Espacios con Carrusel de Fotos */}
        <div className="space-y-20">
          {SPACES.map((space) => (
            <article
              key={space.id}
              id={`espacio-${space.id}`}
              className="bg-[#0e1611] rounded-3xl border border-[#1e3324] overflow-hidden shadow-2xl p-6 sm:p-8 backdrop-blur-sm transition-all duration-300 hover:border-[#8f7451]/60 space-y-6 scroll-mt-12"
            >
              {/* Encabezado: Categoría, Título y Descripción */}
              <div className="space-y-2 text-left">
                <span className="text-xs font-semibold tracking-wider text-[#b89569] uppercase block">
                  {space.category}
                </span>

                <h3 className="text-2xl sm:text-3xl font-serif text-[#f6efe4]">
                  {space.title}
                </h3>

                <p className="text-sm sm:text-base text-zinc-300 font-light leading-relaxed">
                  {space.description}
                </p>

                {/* Características destacadas */}
                {space.features && (
                  <div className="pt-2 space-y-2">
                    <span className="text-[11px] font-semibold tracking-wider text-[#b89569] uppercase block">
                      Incluye:
                    </span>
                    <div className="flex flex-wrap gap-2">
                      {space.features.map((feat, idx) => (
                        <span
                          key={idx}
                          className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#142319] border border-[#263e2c] text-xs text-[#cadfcb]"
                        >
                          <CheckCircle2 className="w-3.5 h-3.5 text-[#25D366]" />
                          {feat}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Carrusel de Fotos del Espacio */}
              <ImageCarousel
                images={space.images}
                onImageClick={(img) => setSelectedImage(img)}
                aspectRatioClass="h-[360px] sm:h-[480px] md:h-[540px]"
              />
            </article>
          ))}
        </div>

      </section>

      {/* ========================================================================= */}
      {/* 4. LIGHTBOX DE PANTALLA COMPLETA                                          */}
      {/* ========================================================================= */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/95 backdrop-blur-lg"
            onClick={() => setSelectedImage(null)}
          >
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute top-6 right-6 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
              title="Cerrar vista completa"
            >
              <X className="w-6 h-6" />
            </button>

            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              onClick={(e) => e.stopPropagation()}
              className="max-w-4xl max-h-[85vh] flex flex-col items-center"
            >
              <img
                src={selectedImage.src}
                alt={selectedImage.alt}
                className="max-w-full max-h-[80vh] object-contain rounded-2xl shadow-2xl border border-white/10"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ========================================================================= */}
      {/* 5. FOOTER / CONTACTO FINAL                                                */}
      {/* ========================================================================= */}
      <footer className="bg-[#050906] border-t border-[#16261c] py-16 px-4 text-center text-xs text-zinc-500">
        <div className="max-w-xl mx-auto space-y-6">
          <h4 className="text-2xl font-serif text-[#f2ece2]">
            ¿Listo para tu momento de descanso?
          </h4>
          <p className="text-zinc-400 text-sm">
            Escríbenos directamente a nuestro WhatsApp para consultar disponibilidad y agendar tu visita.
          </p>

          <div>
            <a
              href={getWhatsAppLink()}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 px-8 py-4 rounded-full bg-gradient-to-r from-[#25D366] to-[#1a9f4e] hover:from-[#2ef076] hover:to-[#1eb95b] text-[#071c0f] font-semibold text-sm sm:text-base shadow-xl shadow-[#25D366]/20 transition-all duration-300 transform hover:-translate-y-0.5"
            >
              <MessageCircle className="w-5 h-5 fill-current" />
              <span>Agendar por WhatsApp</span>
            </a>
          </div>

          <div className="pt-8 border-t border-[#142218] text-zinc-500 text-[11px]">
            © {new Date().getFullYear()} RaicesSpa. Todos los derechos reservados.
          </div>
        </div>
      </footer>

      {/* ========================================================================= */}
      {/* BOTÓN FLOTANTE PERMANENTE DE WHATSAPP                                     */}
      {/* ========================================================================= */}
      <div className="fixed bottom-6 right-6 z-40">
        <a
          id="floating-whatsapp-btn"
          href={getWhatsAppLink()}
          target="_blank"
          rel="noopener noreferrer"
          title="Contactar por WhatsApp"
          className="w-14 h-14 rounded-full bg-[#25D366] hover:bg-[#2fe671] text-[#071a0e] flex items-center justify-center shadow-2xl shadow-[#25D366]/40 hover:scale-110 transition-transform duration-300 focus:outline-none"
        >
          <MessageCircle className="w-7 h-7 fill-current" />
        </a>
      </div>

    </div>
  );
}
