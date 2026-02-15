import React, { useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ArrowRight, Check } from 'lucide-react';
import { egitimler, getEgitmenByBrans } from '../data/mockData';

function Egitimlerimiz() {
  const observerRef = useRef(null);
  const location = useLocation();

  useEffect(() => {
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('in-view');
          }
        });
      },
      { threshold: 0.1 }
    );
    document.querySelectorAll('.reveal-on-scroll').forEach((el) => observerRef.current.observe(el));
    return () => observerRef.current?.disconnect();
  }, []);

  useEffect(() => {
    if (location.hash) {
      const id = location.hash.replace('#', '');
      setTimeout(() => {
        document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 300);
    }
  }, [location]);

  return (
    <div className="bg-white min-h-screen">
      {/* Hero Banner */}
      <section className="relative bg-gradient-to-br from-mor-dark via-mor to-mor-light pt-32 pb-24 overflow-hidden">
        <div className="absolute inset-0 opacity-[0.06]" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, rgba(255,255,255,0.3) 1px, transparent 0)', backgroundSize: '40px 40px' }} />
        <div className="max-w-5xl mx-auto px-6 text-center relative z-10">
          <h1 className="font-display text-5xl md:text-6xl font-black text-white mb-6 tracking-tight">Eğitimlerimiz</h1>
          <p className="text-xl text-white/70 max-w-2xl mx-auto font-light">
            Asya Müzik kalitesiyle, her enstrümanda kişiye özel müfredat ve profesyonel yaklaşım.
          </p>
        </div>
        <div className="absolute bottom-[-1px] left-0 right-0 h-20 bg-white" style={{ clipPath: 'ellipse(55% 100% at 50% 100%)' }} />
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="space-y-32">
          {egitimler.map((egitim, index) => {
            const egitmenlerList = getEgitmenByBrans(egitim.id);
            const isReversed = index % 2 === 1;
            const colors = ['from-mor to-mor-light', 'from-mercan to-turuncu', 'from-turkuaz to-turkuaz-light', 'from-turuncu to-turuncu-light'];
            const bgColor = colors[index % 4];

            return (
              <div key={egitim.id} id={egitim.id} className="scroll-mt-28">
                <div
                  className={`reveal-on-scroll flex flex-col ${isReversed ? 'md:flex-row-reverse' : 'md:flex-row'} gap-10 lg:gap-16 items-stretch`}
                >
                  {/* Visual Card - Artık yanındaki içerikle aynı boyda uzayacak */}
                  <div className="w-full md:w-1/2 flex-1">
                    <div className="md:sticky md:top-28 h-full min-h-[400px] md:min-h-full rounded-[2.5rem] overflow-hidden relative group shadow-2xl">
                      <img 
                        src={egitim.foto} 
                        alt={egitim.title} 
                        className="w-full h-full object-cover absolute inset-0 group-hover:scale-110 transition-transform duration-[1.5s]" 
                        loading="lazy" 
                      />
                      <div className={`absolute inset-0 bg-gradient-to-t ${bgColor} opacity-40 mix-blend-multiply`} />
                      
                      {/* Overlay Icon */}
                      <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/10 backdrop-blur-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                        <span className="text-8xl transform -translate-y-4 group-hover:translate-y-0 transition-transform duration-500">{egitim.icon}</span>
                      </div>
                      
                      <div className="absolute bottom-8 left-8">
                         <span className="text-white/20 font-black text-8xl leading-none select-none">
                           {String(index + 1).padStart(2, '0')}
                         </span>
                      </div>
                    </div>
                  </div>

                  {/* Content Card */}
                  <div className="w-full md:w-1/2 flex flex-col">
                    <div className="bg-white rounded-[2.5rem] p-8 lg:p-12 shadow-[0_20px_50px_rgba(0,0,0,0.05)] border border-gray-50 h-full flex flex-col justify-center">
                      <div className="flex items-center gap-4 mb-6">
                        <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${bgColor} flex items-center justify-center text-white text-3xl shadow-lg`}>
                          {egitim.icon}
                        </div>
                        <h2 className="font-display text-3xl lg:text-4xl font-black text-gray-900 leading-tight">
                          {egitim.title}
                        </h2>
                      </div>
                      
                      <p className="text-gray-500 text-lg leading-relaxed mb-8">
                        {egitim.description}
                      </p>

                      {/* Features List */}
                      <div className="grid grid-cols-1 gap-4 mb-10">
                        {egitim.features.map((feature, idx) => (
                          <div key={idx} className="flex items-center gap-3 group/item">
                            <div className={`w-6 h-6 rounded-full bg-gradient-to-br ${bgColor} flex items-center justify-center flex-shrink-0 transition-transform group-hover/item:scale-110`}>
                              <Check size={14} className="text-white" strokeWidth={3} />
                            </div>
                            <span className="text-gray-700 font-medium">{feature}</span>
                          </div>
                        ))}
                      </div>

                      {/* Instructors Section */}
                      {egitmenlerList.length > 0 && (
                        <div className="mt-auto pt-8 border-t border-gray-100">
                          <h3 className="font-display font-bold text-gray-400 mb-5 text-xs uppercase tracking-[0.2em]">Eğitmen Kadrosu</h3>
                          <div className="grid gap-4">
                            {egitmenlerList.map((egitmen) => (
                              <Link
                                key={egitmen.id}
                                to={`/egitmen/${egitmen.id}`}
                                className="flex items-center gap-4 p-4 rounded-2xl bg-gray-50 hover:bg-white hover:shadow-xl hover:shadow-mor/5 transition-all duration-300 group/link border border-transparent hover:border-gray-100"
                              >
                                <div className="w-14 h-14 rounded-xl overflow-hidden flex-shrink-0 ring-4 ring-white shadow-sm">
                                  <img src={egitmen.foto} alt={egitmen.ad} className="w-full h-full object-cover" />
                                </div>
                                <div className="flex-1 min-w-0">
                                  <h4 className="font-bold text-gray-900 group-hover/link:text-mor transition-colors">{egitmen.ad}</h4>
                                  <p className="text-xs text-gray-500 font-medium">{egitmen.deneyim} Deneyim</p>
                                </div>
                                <div className="w-10 h-10 rounded-full flex items-center justify-center bg-white opacity-0 group-hover/link:opacity-100 group-hover/link:translate-x-1 transition-all">
                                  <ArrowRight size={18} className="text-mercan" />
                                </div>
                              </Link>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Improved CTA */}
        <div className="mt-32 reveal-on-scroll relative rounded-[3rem] overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-mor-dark via-mor to-mor-light" />
          <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]" />
          
          <div className="relative z-10 p-12 md:p-20 text-center">
            <h2 className="font-display text-4xl md:text-5xl font-black text-white mb-6">
              Müzik Yolculuğun <br/><span className="text-turkuaz-light italic font-serif">Burada Başlıyor</span>
            </h2>
            <p className="text-white/70 text-lg mb-10 max-w-2xl mx-auto">
              Ücretsiz deneme dersi randevusu alarak, eğitmenlerimizle tanışın ve yeteneğinizi keşfedin.
            </p>
            <Link
              to="/iletisim"
              className="inline-flex items-center gap-3 bg-white text-mor-dark font-black px-10 py-5 rounded-full hover:bg-mercan hover:text-white transition-all transform hover:-translate-y-2 shadow-2xl"
            >
              Hemen Randevu Al <ArrowRight size={20} />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Egitimlerimiz;