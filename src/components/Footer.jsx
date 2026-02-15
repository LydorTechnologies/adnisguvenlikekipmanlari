import { Link } from 'react-router-dom';
import { Phone, MessageCircle, MapPin, ArrowUpRight } from 'lucide-react';
import logo from '../assets/logo.jpeg';

const Footer = () => {
  return (
    <footer className="bg-dark-900 text-dark-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-3 mb-5">
              {/*<img src={logo} alt="ADN" className="h-11 w-11 rounded-lg object-cover ring-2 ring-gold/30" />*/}
              <div>
                <span className="text-gold font-bold text-lg block leading-tight">ADN</span>
                <span className="text-dark-300 text-xs block">İş Güvenlik Ekipmanları</span>
              </div>
            </div>
            <p className="text-dark-400 text-sm leading-relaxed">
              İş güvenliği ekipmanlarında güvenilir çözüm ortağınız.
              Kaliteli ürünler, uygun fiyatlar.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-semibold text-sm uppercase tracking-wider mb-5">Hızlı Bağlantılar</h4>
            <ul className="space-y-3">
              {[
                { to: '/', label: 'Ana Sayfa' },
                { to: '/urunler', label: 'Ürünler' },
                { to: '/hakkimizda', label: 'Hakkımızda' },
                { to: '/iletisim', label: 'İletişim' },
              ].map(({ to, label }) => (
                <li key={to}>
                  <Link to={to} className="text-dark-400 hover:text-gold text-sm transition-colors duration-200 flex items-center gap-1 group">
                    {label}
                    <ArrowUpRight size={12} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-white font-semibold text-sm uppercase tracking-wider mb-5">İletişim</h4>
            <ul className="space-y-4">
              <li>
                <a href="tel:+905356482213" className="flex items-center gap-3 text-dark-400 hover:text-gold text-sm transition-colors">
                  <Phone size={16} className="text-gold shrink-0" />
                  +90 535 648 22 13
                </a>
              </li>
              <li>
                <a href="https://wa.me/905356482213" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-dark-400 hover:text-gold text-sm transition-colors">
                  <MessageCircle size={16} className="text-gold shrink-0" />
                  WhatsApp
                </a>
              </li>
              <li>
                <div className="flex items-start gap-3 text-dark-400 text-sm">
                  <MapPin size={16} className="text-gold shrink-0 mt-0.5" />
                  <span>Türkiye</span>
                </div>
              </li>
            </ul>
          </div>

          {/* CTA */}
          <div>
            <h4 className="text-white font-semibold text-sm uppercase tracking-wider mb-5">Teklif Alın</h4>
            <p className="text-dark-400 text-sm mb-5">
              Toplu siparişlerde özel fiyatlar için bizimle iletişime geçin.
            </p>
            <a
              href="https://wa.me/905356482213?text=Merhaba%2C%20ürünleriniz%20hakkında%20bilgi%20almak%20istiyorum."
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-gold hover:bg-gold-dark text-dark-900 px-5 py-2.5 rounded-lg text-sm font-semibold transition-all hover:shadow-lg hover:shadow-gold/25"
            >
              <MessageCircle size={16} />
              WhatsApp ile Yazın
            </a>
          </div>
        </div>
      </div>

      <div className="border-t border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-dark-500 text-xs">
            &copy; 2026 ADN İş Güvenlik Ekipmanları. Tüm hakları saklıdır.
          </p>
          <p className="text-dark-500 text-xs">
            Güvenliğiniz bizim önceliğimiz.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
