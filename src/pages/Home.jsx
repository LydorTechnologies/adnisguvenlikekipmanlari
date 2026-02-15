import { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { Shield, HardHat, ArrowRight, Phone, MessageCircle, CheckCircle, Truck, Award, Users, ChevronLeft, ChevronRight } from 'lucide-react';
import { ayakkabilar } from '../data/mockData';

const categories = [...new Set(ayakkabilar.map(a => a.cate))];

const features = [
  { icon: Shield, title: 'CE Sertifikalı', desc: 'Tüm ürünlerimiz Avrupa standartlarına uygun CE sertifikalıdır.' },
  { icon: Truck, title: 'Hızlı Teslimat', desc: 'Siparişleriniz en kısa sürede kapınıza teslim edilir.' },
  { icon: Award, title: 'Kalite Garantisi', desc: 'En kaliteli iş güvenliği ekipmanlarını uygun fiyatlarla sunuyoruz.' },
  { icon: Users, title: 'Toplu Sipariş', desc: 'Kurumsal müşterilerimize özel fiyat avantajları sağlıyoruz.' },
];

// Pick showcase products - one from each category for variety
const heroProducts = [
  ayakkabilar[0],   // WENT
  ayakkabilar[12],  // Ayakkabı Serisi
  ayakkabilar[14],  // Bot Serisi
  ayakkabilar[18],  // Beyaz Serisi
  ayakkabilar[20],  // Comfort
  ayakkabilar[23],  // Hafif İş Ayakkabıları
  ayakkabilar[5],   // WENT another
  ayakkabilar[10],  // WENT bot
].filter(Boolean);

const Home = () => {
  const [current, setCurrent] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  const next = useCallback(() => {
    setCurrent((prev) => (prev + 1) % heroProducts.length);
  }, []);

  const prev = useCallback(() => {
    setCurrent((prev) => (prev - 1 + heroProducts.length) % heroProducts.length);
  }, []);

  useEffect(() => {
    if (isHovered) return;
    const timer = setInterval(next, 3000);
    return () => clearInterval(timer);
  }, [next, isHovered]);

  return (
    <div>
      {/* HERO */}
      <section className="relative bg-dark-900 overflow-hidden">
        {/* Background pattern */}
        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, #E4B33C 1px, transparent 0)', backgroundSize: '48px 48px' }} />
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-gold/5 rounded-full blur-[120px]" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-gold/3 rounded-full blur-[100px]" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-12 lg:pt-28 lg:pb-16">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            {/* Left - Text */}
            <div>
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-gold/10 border border-gold/20 rounded-full text-xs font-semibold text-gold tracking-wider uppercase mb-6">
                <span className="w-1.5 h-1.5 bg-gold rounded-full animate-pulse" />
                İş Güvenliği Ekipmanları
              </div>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white leading-[1.1] tracking-tight mb-5">
                Güvenliğiniz <br />
                <span className="text-gold">Bizim İşimiz</span>
              </h1>

              <p className="text-base lg:text-lg text-dark-300 leading-relaxed max-w-xl mb-8">
                ADN İş Güvenlik Ekipmanları olarak, çalışanlarınızın güvenliği için en kaliteli iş ayakkabıları ve koruyucu ekipmanları sunuyoruz.
              </p>

              <div className="flex flex-col sm:flex-row gap-3 mb-10">
                <Link
                  to="/urunler"
                  className="inline-flex items-center justify-center gap-2 bg-gold hover:bg-gold-dark text-dark-900 font-semibold px-7 py-3.5 rounded-xl hover:shadow-xl hover:shadow-gold/25 hover:-translate-y-0.5 transition-all duration-300 group"
                >
                  Ürünleri İnceleyin
                  <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                </Link>
                <a
                  href="https://wa.me/905356482213?text=Merhaba%2C%20ürünleriniz%20hakkında%20bilgi%20almak%20istiyorum."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 text-white font-medium border border-white/15 px-7 py-3.5 rounded-xl hover:border-gold/40 hover:bg-white/5 transition-all duration-300"
                >
                  <MessageCircle size={18} />
                  WhatsApp ile Yazın
                </a>
              </div>

              {/* Stats */}
              <div className="flex gap-8 sm:gap-10 pt-6 border-t border-white/5">
                {[
                  { num: '7+', label: 'Ürün Kategorisi' },
                  { num: '50+', label: 'Ürün Çeşidi' },
                  { num: '1000+', label: 'Mutlu Müşteri' },
                ].map((s) => (
                  <div key={s.label}>
                    <div className="text-xl sm:text-2xl font-bold text-gold">{s.num}</div>
                    <div className="text-xs text-dark-400 mt-1">{s.label}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right - Product Carousel */}
            <div
              className="hidden lg:block relative z-20"
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
            >
              <div className="relative w-full max-w-sm mx-auto">
                {/* Glow behind */}
                <div className="absolute -inset-6 bg-gold/8 rounded-[2rem] blur-2xl pointer-events-none" />

                {/* Main Card */}
                <div className="relative bg-dark-800/80 backdrop-blur border border-white/10 rounded-2xl overflow-hidden shadow-2xl">
                  {/* Product Image */}
                  <div className="relative h-64 bg-gradient-to-b from-dark-700/50 to-dark-800/50 p-6 flex items-center justify-center">
                    {heroProducts.map((item, i) => (
                      <img
                        key={i}
                        src={item.link}
                        alt={item.kod}
                        className={`absolute inset-6 w-auto h-auto max-w-[calc(100%-3rem)] max-h-[calc(100%-3rem)] object-contain m-auto transition-all duration-500 ${
                          i === current
                            ? 'opacity-100 scale-100'
                            : 'opacity-0 scale-90 pointer-events-none'
                        }`}
                      />
                    ))}
                  </div>

                  {/* Product Info */}
                  <div className="p-4 border-t border-white/5">
                    <div className="flex items-start justify-between gap-3">
                      <div className="min-w-0">
                        <span className="text-gold text-xs font-semibold">{heroProducts[current]?.cate}</span>
                        <h3 className="text-white font-bold mt-0.5 truncate">{heroProducts[current]?.kod}</h3>
                        <p className="text-dark-300 text-xs mt-1 line-clamp-2 leading-relaxed">{heroProducts[current]?.aciklama}</p>
                      </div>
                      <a
                        href={`https://wa.me/905356482213?text=Merhaba%2C%20${encodeURIComponent(heroProducts[current]?.kod || '')}%20hakkında%20bilgi%20almak%20istiyorum.`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="shrink-0 bg-gold hover:bg-gold-dark text-dark-900 p-2.5 rounded-xl transition-all hover:scale-105"
                        title="WhatsApp ile Bilgi Al"
                      >
                        <MessageCircle size={18} />
                      </a>
                    </div>
                  </div>
                </div>

                {/* Navigation */}
                <div className="relative z-30 flex items-center justify-between mt-4 px-1">
                  <button
                    type="button"
                    onClick={(e) => { e.stopPropagation(); prev(); }}
                    className="w-10 h-10 rounded-lg bg-white/10 hover:bg-gold/20 border border-white/10 hover:border-gold/30 flex items-center justify-center text-dark-200 hover:text-gold transition-all cursor-pointer"
                  >
                    <ChevronLeft size={20} />
                  </button>

                  {/* Dots */}
                  <div className="flex gap-1.5">
                    {heroProducts.map((_, i) => (
                      <button
                        type="button"
                        key={i}
                        onClick={(e) => { e.stopPropagation(); setCurrent(i); }}
                        className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                          i === current
                            ? 'w-7 bg-gold'
                            : 'w-2 bg-white/20 hover:bg-white/40'
                        }`}
                      />
                    ))}
                  </div>

                  <button
                    type="button"
                    onClick={(e) => { e.stopPropagation(); next(); }}
                    className="w-10 h-10 rounded-lg bg-white/10 hover:bg-gold/20 border border-white/10 hover:border-gold/30 flex items-center justify-center text-dark-200 hover:text-gold transition-all cursor-pointer"
                  >
                    <ChevronRight size={20} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CATEGORIES STRIP */}
      <section className="py-8 bg-white border-b border-dark-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap justify-center gap-3">
            {categories.map((cat) => (
              <Link
                key={cat}
                to="/urunler"
                className="px-5 py-2.5 bg-dark-50 hover:bg-gold/10 text-dark-500 hover:text-gold rounded-lg text-sm font-medium transition-all duration-200 border border-transparent hover:border-gold/20"
              >
                {cat}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section className="py-20 sm:py-28 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-3 text-xs font-semibold tracking-widest uppercase text-gold mb-4">
              <span className="w-8 h-px bg-gold" />
              Neden ADN?
              <span className="w-8 h-px bg-gold" />
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-dark-900 tracking-tight">
              Güvenilir Çözüm Ortağınız
            </h2>
            <p className="text-dark-400 max-w-xl mx-auto mt-4 leading-relaxed">
              İş güvenliği ekipmanlarında kalite ve güveni bir arada sunuyoruz.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((f, i) => {
              const Icon = f.icon;
              return (
                <div
                  key={f.title}
                  className="group bg-white rounded-2xl p-7 border border-dark-100 hover:border-gold/30 hover:-translate-y-1 hover:shadow-lg hover:shadow-gold/5 transition-all duration-300"
                >
                  <div className="w-14 h-14 bg-gold/10 text-gold rounded-xl flex items-center justify-center mb-5 group-hover:bg-gold group-hover:text-dark-900 transition-all duration-300">
                    <Icon size={26} strokeWidth={1.8} />
                  </div>
                  <h3 className="text-lg font-bold text-dark-900 mb-2">{f.title}</h3>
                  <p className="text-sm text-dark-400 leading-relaxed">{f.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* FEATURED PRODUCTS */}
      <section className="py-20 sm:py-28 bg-dark-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4 mb-12">
            <div>
              <div className="inline-flex items-center gap-3 text-xs font-semibold tracking-widest uppercase text-gold mb-4">
                <span className="w-8 h-px bg-gold" />
                Öne Çıkan Ürünler
              </div>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-dark-900 tracking-tight">
                Popüler Ürünlerimiz
              </h2>
            </div>
            <Link
              to="/urunler"
              className="inline-flex items-center gap-2 text-sm font-semibold text-gold hover:text-gold-dark transition-colors group"
            >
              Tüm Ürünler
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {ayakkabilar.slice(0, 8).map((item, i) => (
              <div
                key={i}
                className="group bg-white rounded-2xl border border-dark-100 hover:border-gold/30 hover:-translate-y-1 hover:shadow-xl hover:shadow-gold/5 transition-all duration-300 overflow-hidden"
              >
                <div className="aspect-square overflow-hidden bg-dark-50 p-4">
                  <img src={item.link} alt={item.kod} className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-500" loading="lazy" />
                </div>
                <div className="p-5">
                  <div className="text-xs text-gold font-semibold mb-1">{item.cate}</div>
                  <h3 className="font-bold text-dark-900 mb-2">{item.kod}</h3>
                  <p className="text-sm text-dark-400 leading-relaxed line-clamp-2">{item.aciklama}</p>
                  <a
                    href={`https://wa.me/905356482213?text=Merhaba%2C%20${encodeURIComponent(item.kod)}%20hakkında%20bilgi%20almak%20istiyorum.`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-4 flex items-center justify-center gap-2 w-full py-2.5 bg-dark-900 hover:bg-gold text-white hover:text-dark-900 rounded-lg text-sm font-semibold transition-all duration-200"
                  >
                    <MessageCircle size={14} />
                    Bilgi Al
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 sm:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative bg-dark-900 rounded-3xl p-10 sm:p-16 text-center overflow-hidden">
            <div className="absolute inset-0 opacity-[0.04]" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, #E4B33C 1px, transparent 0)', backgroundSize: '40px 40px' }} />
            <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-gold/10 rounded-full blur-[80px]" />
            <div className="absolute bottom-0 left-0 w-[200px] h-[200px] bg-gold/5 rounded-full blur-[60px]" />

            <div className="relative z-10">
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white leading-tight tracking-tight mb-4">
                Toplu Sipariş İçin <br />
                <span className="text-gold">Özel Fiyat Teklifi Alın</span>
              </h2>
              <p className="text-dark-300 max-w-lg mx-auto mb-8 leading-relaxed">
                Kurumsal ihtiyaçlarınız için en uygun fiyat teklifini hemen alın. WhatsApp üzerinden bize ulaşabilirsiniz.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href="https://wa.me/905356482213?text=Merhaba%2C%20toplu%20sipariş%20için%20fiyat%20teklifi%20almak%20istiyorum."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 bg-gold hover:bg-gold-dark text-dark-900 font-semibold px-8 py-4 rounded-xl hover:shadow-xl hover:shadow-gold/25 transition-all duration-300"
                >
                  <MessageCircle size={18} />
                  WhatsApp ile Teklif Alın
                </a>
                <a
                  href="tel:+905356482213"
                  className="inline-flex items-center justify-center gap-2 text-white font-medium border border-white/15 px-8 py-4 rounded-xl hover:border-gold/40 hover:bg-white/5 transition-all duration-300"
                >
                  <Phone size={18} />
                  +90 535 648 22 13
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
