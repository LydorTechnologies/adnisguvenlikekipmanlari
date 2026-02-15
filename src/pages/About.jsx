import { Link } from 'react-router-dom';
import { Shield, Award, Users, Target, Truck, CheckCircle, ArrowRight, MessageCircle } from 'lucide-react';

const values = [
  { icon: Shield, title: 'Güvenlik Önceliğimiz', desc: 'CE sertifikalı, uluslararası standartlara uygun ürünlerle çalışanlarınızın güvenliğini garanti altına alıyoruz.' },
  { icon: Award, title: 'Kalite Garantisi', desc: 'Sektörün önde gelen markalarıyla çalışarak en kaliteli iş güvenliği ekipmanlarını sunuyoruz.' },
  { icon: Users, title: 'Müşteri Memnuniyeti', desc: 'Her müşterimize özel çözümler sunuyor, satış sonrası destek ile yanınızda oluyoruz.' },
  { icon: Truck, title: 'Hızlı Teslimat', desc: 'Geniş stok ağımızla siparişlerinizi en kısa sürede kapınıza teslim ediyoruz.' },
];

const stats = [
  { num: '7+', label: 'Ürün Kategorisi' },
  { num: '50+', label: 'Ürün Çeşidi' },
  { num: '1000+', label: 'Mutlu Müşteri' },
  { num: '10+', label: 'Yıl Deneyim' },
];

const About = () => {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <section className="relative bg-dark-900 pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, #E4B33C 1px, transparent 0)', backgroundSize: '48px 48px' }} />
        <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-gold/5 rounded-full blur-[100px]" />
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-4 tracking-tight">Hakkımızda</h1>
          <p className="text-lg text-dark-300 max-w-lg mx-auto">
            ADN İş Güvenlik Ekipmanları'nı yakından tanıyın.
          </p>
        </div>
      </section>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-20">
        {/* Main About */}
        <div className="bg-white p-8 sm:p-12 rounded-2xl border border-dark-100">
          <div className="inline-flex items-center gap-3 text-xs font-semibold tracking-widest uppercase text-gold mb-6">
            <span className="w-8 h-px bg-gold" />
            Biz Kimiz?
          </div>
          <h2 className="text-3xl font-extrabold text-dark-900 mb-6">
            ADN İş Güvenlik Ekipmanları
          </h2>
          <p className="text-dark-400 mb-6 text-lg leading-relaxed">
            ADN İş Güvenlik Ekipmanları olarak, iş güvenliği sektöründe uzun yıllardır faaliyet göstermekteyiz.
            Amacımız, çalışanların iş ortamlarında en yüksek güvenlik standartlarına sahip ekipmanlarla korunmasını sağlamaktır.
          </p>
          <p className="text-dark-400 mb-6 text-lg leading-relaxed">
            WENT, Yılmaz Ayakkabı ve daha birçok sektörün önde gelen markasının geniş ürün yelpazesini müşterilerimize
            sunuyor, her ihtiyaca uygun iş güvenliği çözümleri üretiyoruz. İş ayakkabılarından botlara, comfort modellerden
            hafif iş ayakkabılarına kadar geniş bir ürün gamına sahibiz.
          </p>
          <p className="text-dark-400 text-lg leading-relaxed">
            Toplu siparişlerde özel fiyat avantajları sağlıyor, hızlı teslimat ile müşteri memnuniyetini ön planda tutuyoruz.
          </p>
        </div>

        {/* Values */}
        <div>
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-3 text-xs font-semibold tracking-widest uppercase text-gold mb-4">
              <span className="w-8 h-px bg-gold" />
              Değerlerimiz
              <span className="w-8 h-px bg-gold" />
            </div>
            <h2 className="text-3xl font-extrabold text-dark-900">Neden ADN?</h2>
          </div>

          <div className="grid sm:grid-cols-2 gap-5">
            {values.map((v) => {
              const Icon = v.icon;
              return (
                <div key={v.title} className="group flex items-start gap-5 p-6 bg-white rounded-2xl border border-dark-100 hover:border-gold/30 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-gold/5 transition-all duration-300">
                  <div className="w-12 h-12 bg-gold/10 text-gold rounded-xl flex items-center justify-center shrink-0 group-hover:bg-gold group-hover:text-dark-900 transition-all duration-300">
                    <Icon size={22} />
                  </div>
                  <div>
                    <h3 className="font-bold text-dark-900 mb-1.5">{v.title}</h3>
                    <p className="text-sm text-dark-400 leading-relaxed">{v.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
          {stats.map((s) => (
            <div key={s.label} className="bg-dark-900 rounded-2xl p-6 text-center">
              <div className="text-3xl font-extrabold text-gold mb-1">{s.num}</div>
              <div className="text-sm text-dark-300">{s.label}</div>
            </div>
          ))}
        </div>

        {/* Mission */}
        <div className="relative bg-dark-900 rounded-2xl p-8 sm:p-12 overflow-hidden">
          <div className="absolute inset-0 opacity-[0.04]" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, #E4B33C 1px, transparent 0)', backgroundSize: '40px 40px' }} />
          <div className="absolute top-0 right-0 w-[250px] h-[250px] bg-gold/10 rounded-full blur-[80px]" />
          <div className="relative z-10">
            <h2 className="text-2xl font-extrabold text-white mb-4">Misyonumuz</h2>
            <p className="text-dark-300 text-lg leading-relaxed mb-6">
              Her çalışanın güvenli bir ortamda, kaliteli ekipmanlarla çalışma hakkına sahip olduğuna inanıyoruz.
              ADN İş Güvenlik Ekipmanları olarak, sektörün en güvenilir tedarikçisi olmayı ve müşterilerimize
              en iyi hizmeti sunmayı kendimize misyon edindik.
            </p>
            <div className="flex flex-wrap gap-3">
              {['CE Sertifikalı Ürünler', 'S1/S2/S3 Standartları', 'Toplu Sipariş Avantajı', 'Hızlı Kargo'].map((tag) => (
                <span key={tag} className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-gold/10 text-gold text-xs font-semibold rounded-lg border border-gold/20">
                  <CheckCircle size={12} />
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center py-8">
          <h3 className="text-2xl font-extrabold text-dark-900 mb-4">
            Hemen İletişime Geçin
          </h3>
          <p className="text-dark-400 mb-8 max-w-md mx-auto">
            İhtiyacınız olan iş güvenliği ekipmanları için bize ulaşın, size en uygun çözümü sunalım.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/iletisim"
              className="inline-flex items-center justify-center gap-2 bg-gold hover:bg-gold-dark text-dark-900 font-semibold px-8 py-4 rounded-xl hover:shadow-xl hover:shadow-gold/25 transition-all duration-300 group"
            >
              İletişime Geçin
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </Link>
            <a
              href="https://wa.me/905356482213?text=Merhaba%2C%20ürünleriniz%20hakkında%20bilgi%20almak%20istiyorum."
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 bg-dark-900 hover:bg-dark-800 text-white font-medium px-8 py-4 rounded-xl transition-all duration-300"
            >
              <MessageCircle size={16} />
              WhatsApp ile Yazın
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
