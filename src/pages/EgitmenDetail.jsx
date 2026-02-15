import React, { useEffect, useRef } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Clock, GraduationCap, Users, Phone, Mail, Award, ArrowLeft, Music, Camera, Star } from 'lucide-react';
import { getEgitmenById, getEgitmenByBrans, getEgitimById } from '../data/mockData';

const EgitmenDetail = () => {
  const { id } = useParams();
  const egitmen = getEgitmenById(id);
  const observerRef = useRef(null);

  useEffect(() => {
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('in-view');
            observerRef.current.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );
    document.querySelectorAll('.reveal-on-scroll').forEach((el) => observerRef.current.observe(el));
    return () => observerRef.current?.disconnect();
  }, [id]);

  if (!egitmen) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <h1 className="text-4xl font-black text-mor mb-4">Eğitmen Bulunamadı</h1>
          <Link to="/egitimlerimiz" className="text-turkuaz hover:underline">Eğitimlerimize Dön</Link>
        </div>
      </div>
    );
  }

  const egitim = getEgitimById(egitmen.brans);
  const digerEgitmenler = getEgitmenByBrans(egitmen.brans).filter((e) => e.id !== egitmen.id);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* ===== HERO SECTION ===== */}
      <section className="relative bg-gradient-to-br from-mor-dark via-mor to-mor-light pt-32 pb-32 overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0 opacity-[0.06]" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, rgba(255,255,255,0.3) 1px, transparent 0)', backgroundSize: '40px 40px' }} />
        <div className="absolute w-[500px] h-[500px] bg-mercan rounded-full opacity-[0.1] -top-32 -right-32 blur-3xl animate-pulse" />
        <div className="absolute w-[300px] h-[300px] bg-turkuaz rounded-full opacity-[0.1] bottom-0 -left-16 blur-2xl" />

        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <Link to="/egitimlerimiz" className="inline-flex items-center gap-2 text-white/70 hover:text-white transition-colors mb-10 text-sm font-medium bg-white/10 px-4 py-2 rounded-full backdrop-blur-sm">
            <ArrowLeft size={16} />
            Eğitimlerimize Dön
          </Link>

          <div className="flex flex-col md:flex-row items-end gap-8 lg:gap-12">
            {/* Büyük Profil Fotoğrafı */}
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-br from-mercan to-turuncu rounded-[2.5rem] blur opacity-40 group-hover:opacity-60 transition-opacity duration-500"></div>
              <div className="relative w-48 h-48 md:w-64 md:h-64 rounded-[2.5rem] overflow-hidden shadow-2xl ring-4 ring-white/20">
                <img src={egitmen.foto} alt={egitmen.ad} className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700" />
              </div>
              <div className="absolute -bottom-6 -right-6 w-16 h-16 bg-white rounded-2xl flex items-center justify-center text-3xl shadow-xl rotate-12 group-hover:rotate-0 transition-transform duration-300">
                {egitim?.icon}
              </div>
            </div>

            <div className="flex-1 pb-4">
              <div className="flex items-center gap-3 mb-4">
                <span className="px-4 py-1.5 bg-white/15 backdrop-blur-md rounded-full text-xs font-bold text-white uppercase tracking-wider border border-white/10 shadow-sm">
                  {egitim?.title} Eğitmeni
                </span>
                <div className="flex text-yellow-400">
                   {[...Array(5)].map((_,i) => <Star key={i} size={14} fill="currentColor" />)}
                </div>
              </div>
              
              <h1 className="font-display text-4xl md:text-6xl font-black text-white mb-4 leading-tight">
                {egitmen.ad}
              </h1>
              <p className="text-xl text-white/80 mb-8 font-light max-w-2xl">{egitmen.unvan}</p>

              {/* Hızlı İstatistikler */}
              <div className="grid grid-cols-3 gap-4 md:gap-8 border-t border-white/10 pt-6">
                <div className="text-white">
                  <div className="flex items-center gap-2 text-white/60 text-sm font-medium mb-1"><Clock size={14}/> Deneyim</div>
                  <div className="text-xl md:text-2xl font-bold">{egitmen.deneyim}</div>
                </div>
                <div className="text-white border-l border-white/10 pl-4 md:pl-8">
                  <div className="flex items-center gap-2 text-white/60 text-sm font-medium mb-1"><GraduationCap size={14}/> Eğitim</div>
                  <div className="text-lg md:text-xl font-bold truncate max-w-[150px]">{egitmen.egitim.split(' ')[0]}...</div>
                </div>
                <div className="text-white border-l border-white/10 pl-4 md:pl-8">
                  <div className="flex items-center gap-2 text-white/60 text-sm font-medium mb-1"><Users size={14}/> Öğrenci</div>
                  <div className="text-xl md:text-2xl font-bold">{egitmen.ogrenciSayisi}+</div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Dalga Efekti */}
        <div className="absolute bottom-[-1px] left-0 right-0 h-16 sm:h-24 bg-gray-50" style={{ clipPath: 'polygon(0 100%, 100% 100%, 100% 0)' }} />
      </section>

      {/* ===== MAIN CONTENT ===== */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid lg:grid-cols-3 gap-10 lg:gap-16">
          
          {/* LEFT COLUMN (Details) */}
          <div className="lg:col-span-2 space-y-12">
            
            {/* Biyografi */}
            <div className="reveal-on-scroll">
              <h2 className="font-display text-2xl font-black text-gray-900 mb-6 flex items-center gap-3">
                <span className="w-10 h-10 bg-mor/10 rounded-xl flex items-center justify-center text-mor"><Music size={22} /></span>
                Hakkında
              </h2>
              <p className="text-gray-600 leading-[1.8] text-lg text-justify">{egitmen.bpiografi}</p>
            </div>

            {/* Galeri (YENİ BÖLÜM) */}
            {egitmen.galeri && egitmen.galeri.length > 0 && (
              <div className="reveal-on-scroll">
                <h2 className="font-display text-2xl font-black text-gray-900 mb-6 flex items-center gap-3">
                  <span className="w-10 h-10 bg-turuncu/10 rounded-xl flex items-center justify-center text-turuncu"><Camera size={22} /></span>
                  Derslerden Kareler
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {egitmen.galeri.map((foto, index) => (
                    <div 
                      key={index} 
                      className={`group relative overflow-hidden rounded-2xl shadow-md cursor-pointer ${index === 0 ? 'sm:col-span-2 sm:h-64' : 'h-48'}`}
                    >
                      <img 
                        src={foto.src} 
                        alt={foto.caption} 
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                        <span className="text-white font-medium transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                          {foto.caption}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Uzmanlık Alanları & Başarılar Grid */}
            <div className="grid md:grid-cols-2 gap-8">
              <div className="reveal-on-scroll bg-white rounded-3xl p-8 border border-gray-100 shadow-sm hover:shadow-lg transition-shadow">
                <h3 className="font-display text-lg font-bold text-gray-900 mb-6 flex items-center gap-2">
                  <Award size={20} className="text-turuncu" /> Uzmanlıklar
                </h3>
                <div className="flex flex-wrap gap-2">
                  {egitmen.uzmanliklar.map((u) => (
                    <span key={u} className="px-3 py-1.5 bg-gray-100 text-gray-600 rounded-lg text-sm font-medium hover:bg-mor/10 hover:text-mor transition-colors">
                      {u}
                    </span>
                  ))}
                </div>
              </div>

              <div className="reveal-on-scroll bg-white rounded-3xl p-8 border border-gray-100 shadow-sm hover:shadow-lg transition-shadow">
                <h3 className="font-display text-lg font-bold text-gray-900 mb-6 flex items-center gap-2">
                  <Star size={20} className="text-mercan" /> Başarılar
                </h3>
                <ul className="space-y-4">
                  {egitmen.basarilar.map((b, i) => (
                    <li key={i} className="flex items-start gap-3 text-sm text-gray-600">
                      <div className="w-1.5 h-1.5 rounded-full bg-mercan mt-2 flex-shrink-0" />
                      {b}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN (Sticky Sidebar) */}
          <div className="lg:col-span-1">
            <div className="sticky top-28 space-y-6">
              {/* İletişim Kartı */}
              <div className="bg-white rounded-[2rem] p-8 shadow-xl shadow-mor/5 border border-mor/10 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-mor/5 rounded-full -mr-10 -mt-10" />
                
                <h3 className="font-display text-xl font-bold text-gray-900 mb-6 relative z-10">İletişim</h3>
                <div className="space-y-5 relative z-10">
                  <a href={`tel:${egitmen.telefon.replace(/\s/g, '')}`} className="flex items-center gap-4 group">
                    <div className="w-12 h-12 bg-turkuaz/10 rounded-2xl flex items-center justify-center group-hover:bg-turkuaz group-hover:text-white transition-all text-turkuaz">
                      <Phone size={20} />
                    </div>
                    <div>
                      <div className="text-xs text-gray-400 font-medium uppercase">Telefon</div>
                      <div className="text-gray-700 font-semibold group-hover:text-turkuaz transition-colors">{egitmen.telefon}</div>
                    </div>
                  </a>
                  
                  {/*<a href={`mailto:${egitmen.email}`} className="flex items-center gap-4 group">
                    <div className="w-12 h-12 bg-mercan/10 rounded-2xl flex items-center justify-center group-hover:bg-mercan group-hover:text-white transition-all text-mercan">
                      <Mail size={20} />
                    </div>
                    <div>
                      <div className="text-xs text-gray-400 font-medium uppercase">E-posta</div>
                      <div className="text-gray-700 font-semibold group-hover:text-mercan transition-colors text-sm">{egitmen.email}</div>
                    </div>
                  </a>*/}
                </div>

                <hr className="my-8 border-gray-100" />

                <div className="text-center">
                   <p className="text-gray-500 text-sm mb-4">Deneme dersi için hemen arayın veya mesaj bırakın.</p>
                   <Link to="/iletisim" className="block w-full py-4 bg-gray-900 text-white rounded-xl font-bold hover:bg-mor transition-colors shadow-lg hover:shadow-mor/30">
                     Randevu Oluştur
                   </Link>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* Diğer Eğitmenler */}
        {digerEgitmenler.length > 0 && (
          <div className="mt-24 pt-12 border-t border-gray-200">
            <div className="flex items-center justify-between mb-8">
               <h2 className="font-display text-2xl md:text-3xl font-black text-gray-900">
                Diğer {egitim?.title} Eğitmenleri
              </h2>
              <Link to="/ekibimiz" className="text-mor font-semibold hover:underline">Tümünü Gör</Link>
            </div>
           
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {digerEgitmenler.map((e) => (
                <Link
                  key={e.id}
                  to={`/egitmen/${e.id}`}
                  className="group bg-white rounded-[2rem] p-4 border border-gray-100 hover:border-mor/20 hover:shadow-xl hover:shadow-mor/5 transition-all duration-300 flex items-center gap-4"
                >
                  <div className="w-20 h-20 rounded-2xl overflow-hidden flex-shrink-0">
                    <img src={e.foto} alt={e.ad} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                  </div>
                  <div>
                    <h3 className="font-display font-bold text-gray-900 text-lg group-hover:text-mor transition-colors">{e.ad}</h3>
                    <p className="text-sm text-gray-500">{e.unvan}</p>
                  </div>
                  <div className="ml-auto w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center text-gray-300 group-hover:bg-mor group-hover:text-white transition-all">
                    <ArrowLeft size={18} className="rotate-180" />
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default EgitmenDetail;