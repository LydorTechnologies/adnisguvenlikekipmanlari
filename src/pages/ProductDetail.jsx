import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { MessageCircle, ArrowLeft, ZoomIn, X, ChevronLeft, ChevronRight } from 'lucide-react';
import { ayakkabilar } from '../data/mockData';

// Kod'u URL slug'ına çevir: "YL 702-02" -> "yl-702-02"
export const kodToSlug = (kod) => kod.toLowerCase().replace(/\s+/g, '-');

const ProductDetail = () => {
  const { slug } = useParams();
  const product = ayakkabilar.find((a) => kodToSlug(a.kod) === slug);

  const allImages = product ? [product.link, ...(product.resimler || [])] : [];

  const [activeImg, setActiveImg] = useState(0);
  const [lightbox, setLightbox] = useState(false);
  const [lightboxIdx, setLightboxIdx] = useState(0);

  if (!product) {
    return (
      <div className="min-h-screen bg-white flex flex-col items-center justify-center gap-4">
        <h2 className="text-2xl font-bold text-dark-900">Ürün bulunamadı</h2>
        <Link to="/urunler" className="inline-flex items-center gap-2 text-gold hover:underline font-medium">
          <ArrowLeft size={16} /> Ürünlere dön
        </Link>
      </div>
    );
  }

  const openLightbox = (idx) => {
    setLightboxIdx(idx);
    setLightbox(true);
  };

  const closeLightbox = () => setLightbox(false);

  const prevLightbox = () => setLightboxIdx((i) => (i - 1 + allImages.length) % allImages.length);
  const nextLightbox = () => setLightboxIdx((i) => (i + 1) % allImages.length);

  const hasDetails = product.serisi || product.enIso || product.numaralar || product.ozellikler;

  return (
    <div className="min-h-screen bg-white">
      {/* Breadcrumb */}
      <div className="bg-dark-900 pt-28 pb-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2 text-sm text-dark-400">
            <Link to="/urunler" className="hover:text-gold transition-colors flex items-center gap-1">
              <ArrowLeft size={14} />
              Ürünler
            </Link>
            <span>/</span>
            <span className="text-dark-200">{product.cate}</span>
            <span>/</span>
            <span className="text-gold font-semibold">{product.kod}</span>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid lg:grid-cols-2 gap-12">

          {/* Left — Image Gallery */}
          <div className="space-y-4">
            {/* Main image */}
            <div
              className="relative aspect-square bg-dark-50 rounded-2xl overflow-hidden border border-dark-100 cursor-zoom-in group"
              onClick={() => openLightbox(activeImg)}
            >
              <img
                src={allImages[activeImg]}
                alt={product.kod}
                className="w-full h-full object-contain p-6 group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity bg-dark-900/70 backdrop-blur-sm text-white rounded-lg px-3 py-1.5 text-xs font-medium flex items-center gap-1.5">
                <ZoomIn size={13} /> Büyüt
              </div>
            </div>

            {/* Thumbnail strip — only if more than 1 image */}
            {allImages.length > 1 && (
              <div className="flex gap-3 overflow-x-auto pb-1 scrollbar-hide">
                {allImages.map((src, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveImg(i)}
                    className={`shrink-0 w-20 h-20 rounded-xl border-2 overflow-hidden bg-dark-50 transition-all duration-200 ${
                      activeImg === i
                        ? 'border-gold shadow-md shadow-gold/20'
                        : 'border-dark-100 hover:border-dark-300'
                    }`}
                  >
                    <img src={src} alt="" className="w-full h-full object-contain p-1" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Right — Product Info */}
          <div className="flex flex-col gap-6">
            {/* Category badge */}
            <span className="inline-flex self-start px-3 py-1 bg-gold/10 text-gold text-xs font-semibold rounded-full">
              {product.cate}
            </span>

            <h1 className="text-4xl font-extrabold text-dark-900 tracking-tight">{product.kod}</h1>

            <p className="text-dark-500 leading-relaxed text-base">{product.aciklama}</p>

            {/* Spec table */}
            {hasDetails && (
              <div className="rounded-2xl border border-dark-100 overflow-hidden">
                <table className="w-full text-sm">
                  <tbody>
                    {product.serisi && (
                      <tr className="border-b border-dark-100">
                        <td className="px-5 py-3.5 font-semibold text-dark-500 bg-dark-50 w-2/5">Serisi</td>
                        <td className="px-5 py-3.5 text-dark-900">{product.serisi}</td>
                      </tr>
                    )}
                    {product.enIso && (
                      <tr className="border-b border-dark-100">
                        <td className="px-5 py-3.5 font-semibold text-dark-500 bg-dark-50">EN ISO 20345</td>
                        <td className="px-5 py-3.5 text-dark-900">
                          <div className="flex flex-wrap gap-1.5">
                            {product.enIso.split(' ').map((s) => (
                              <span key={s} className="px-2 py-0.5 bg-gold/10 text-gold text-xs font-semibold rounded-md">
                                {s}
                              </span>
                            ))}
                          </div>
                        </td>
                      </tr>
                    )}
                    {product.numaralar && (
                      <tr className={product.ozellikler ? 'border-b border-dark-100' : ''}>
                        <td className="px-5 py-3.5 font-semibold text-dark-500 bg-dark-50">Numaralar</td>
                        <td className="px-5 py-3.5 text-dark-900">{product.numaralar}</td>
                      </tr>
                    )}
                    {product.ozellikler &&
                      Object.entries(product.ozellikler).map(([key, val], idx, arr) => (
                        <tr key={key} className={idx < arr.length - 1 ? 'border-b border-dark-100' : ''}>
                          <td className="px-5 py-3.5 font-semibold text-dark-500 bg-dark-50">{key}</td>
                          <td className="px-5 py-3.5 text-dark-900">{val}</td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            )}

            {/* CTA */}
            <a
              href={`https://wa.me/905356482213?text=Merhaba%2C%20${encodeURIComponent(product.kod)}%20hakkında%20bilgi%20almak%20istiyorum.`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 bg-gold hover:bg-gold-dark text-dark-900 font-bold px-8 py-4 rounded-xl hover:shadow-xl hover:shadow-gold/25 transition-all duration-300 text-base"
            >
              <MessageCircle size={20} />
              Bilgi Al
            </a>
          </div>
        </div>
      </div>

      {/* Lightbox */}
      {lightbox && (
        <div
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-sm flex items-center justify-center"
          onClick={closeLightbox}
        >
          {/* Close */}
          <button
            className="absolute top-5 right-5 text-white/70 hover:text-white bg-white/10 hover:bg-white/20 rounded-full p-2 transition-all"
            onClick={closeLightbox}
          >
            <X size={22} />
          </button>

          {/* Prev */}
          {allImages.length > 1 && (
            <button
              className="absolute left-4 text-white/70 hover:text-white bg-white/10 hover:bg-white/20 rounded-full p-3 transition-all"
              onClick={(e) => { e.stopPropagation(); prevLightbox(); }}
            >
              <ChevronLeft size={26} />
            </button>
          )}

          {/* Image */}
          <img
            src={allImages[lightboxIdx]}
            alt={product.kod}
            className="max-h-[85vh] max-w-[85vw] object-contain rounded-xl shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          />

          {/* Next */}
          {allImages.length > 1 && (
            <button
              className="absolute right-4 text-white/70 hover:text-white bg-white/10 hover:bg-white/20 rounded-full p-3 transition-all"
              onClick={(e) => { e.stopPropagation(); nextLightbox(); }}
            >
              <ChevronRight size={26} />
            </button>
          )}

          {/* Counter */}
          {allImages.length > 1 && (
            <div className="absolute bottom-5 left-1/2 -translate-x-1/2 text-white/60 text-sm">
              {lightboxIdx + 1} / {allImages.length}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ProductDetail;
