import { Phone, MessageCircle, MapPin, Clock, ArrowRight } from 'lucide-react';

const contactItems = [
  { icon: Phone, label: 'Telefon', value: '+90 535 648 22 13', href: 'tel:+905356482213' },
  { icon: MessageCircle, label: 'WhatsApp', value: 'WhatsApp ile Yazın', href: 'https://wa.me/905356482213?text=Merhaba%2C%20ürünleriniz%20hakkında%20bilgi%20almak%20istiyorum.', external: true },
  { icon: MapPin, label: 'Konum', value: 'Türkiye' },
  { icon: Clock, label: 'Çalışma Saatleri', value: 'Pazartesi - Cumartesi: 09:00 - 18:00' },
];

const Contact = () => {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <section className="relative bg-dark-900 pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, #E4B33C 1px, transparent 0)', backgroundSize: '48px 48px' }} />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-gold/5 rounded-full blur-[100px]" />
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-4 tracking-tight">İletişim</h1>
          <p className="text-lg text-dark-300 max-w-lg mx-auto">
            Bizimle iletişime geçmek için aşağıdaki bilgileri kullanabilirsiniz.
          </p>
        </div>
      </section>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Contact Info */}
          <div className="bg-white p-8 sm:p-10 rounded-2xl border border-dark-100 space-y-2">
            <h2 className="text-2xl font-extrabold text-dark-900 mb-6">İletişim Bilgileri</h2>

            {contactItems.map((item) => {
              const Icon = item.icon;
              const content = (
                <div className="flex items-start gap-4 p-4 rounded-xl hover:bg-dark-50 transition-colors">
                  <div className="w-12 h-12 bg-gold/10 text-gold rounded-xl flex items-center justify-center shrink-0">
                    <Icon size={22} />
                  </div>
                  <div>
                    <h3 className="font-bold text-dark-900 mb-1">{item.label}</h3>
                    <span className="text-dark-400">{item.value}</span>
                  </div>
                </div>
              );

              if (item.href) {
                return (
                  <a
                    key={item.label}
                    href={item.href}
                    {...(item.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                    className="block"
                  >
                    {content}
                  </a>
                );
              }
              return <div key={item.label}>{content}</div>;
            })}

            {/* WhatsApp CTA */}
            <div className="pt-4">
              <a
                href="https://wa.me/905356482213?text=Merhaba%2C%20ürünleriniz%20hakkında%20bilgi%20almak%20istiyorum."
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 w-full bg-green-500 hover:bg-green-600 text-white font-semibold py-4 rounded-xl hover:shadow-lg hover:shadow-green-500/25 transition-all duration-300"
              >
                <MessageCircle size={20} />
                WhatsApp ile Hemen Yazın
              </a>
            </div>

            <div className="pt-2">
              <a
                href="tel:+905356482213"
                className="flex items-center justify-center gap-2 w-full bg-gold hover:bg-gold-dark text-dark-900 font-semibold py-4 rounded-xl hover:shadow-lg hover:shadow-gold/25 transition-all duration-300"
              >
                <Phone size={20} />
                +90 535 648 22 13
              </a>
            </div>
          </div>

          {/* Info Card */}
          <div className="space-y-6">
            <div className="bg-dark-900 rounded-2xl p-8 sm:p-10 overflow-hidden relative">
              <div className="absolute inset-0 opacity-[0.04]" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, #E4B33C 1px, transparent 0)', backgroundSize: '40px 40px' }} />
              <div className="absolute top-0 right-0 w-[200px] h-[200px] bg-gold/10 rounded-full blur-[60px]" />
              <div className="relative z-10">
                <h2 className="text-2xl font-extrabold text-white mb-4">Toplu Sipariş</h2>
                <p className="text-dark-300 leading-relaxed mb-6">
                  Kurumsal müşterilerimize özel fiyat avantajları sunuyoruz.
                  İhtiyacınız olan ürünleri ve miktarları belirterek bizimle iletişime geçin,
                  size özel teklif hazırlayalım.
                </p>
                <ul className="space-y-3 mb-6">
                  {[
                    'Toplu siparişlerde özel indirimler',
                    'Kurumsal fatura desteği',
                    'Hızlı kargo ile teslimat',
                    'Geniş ürün yelpazesi',
                  ].map((item) => (
                    <li key={item} className="flex items-center gap-2 text-dark-200 text-sm">
                      <span className="w-1.5 h-1.5 bg-gold rounded-full shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
                <a
                  href="https://wa.me/905356482213?text=Merhaba%2C%20toplu%20sipariş%20için%20fiyat%20teklifi%20almak%20istiyorum."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-gold hover:bg-gold-dark text-dark-900 font-semibold px-6 py-3 rounded-xl transition-all duration-300 group"
                >
                  Teklif Alın
                  <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                </a>
              </div>
            </div>

            <div className="bg-gold/5 border border-gold/20 rounded-2xl p-8">
              <h3 className="text-lg font-bold text-dark-900 mb-3">Hızlı İletişim</h3>
              <p className="text-dark-400 text-sm leading-relaxed mb-4">
                En hızlı dönüş için WhatsApp üzerinden bize yazabilirsiniz.
                Ürün bilgisi, fiyat teklifi veya sipariş için 7/24 mesaj bırakabilirsiniz.
              </p>
              <div className="flex items-center gap-2 text-gold font-semibold text-sm">
                <MessageCircle size={16} />
                Ortalama yanıt süresi: 30 dakika
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
