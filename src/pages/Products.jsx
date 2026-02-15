import { useState, useMemo } from 'react';
import { MessageCircle, Search, Filter, X } from 'lucide-react';
import { ayakkabilar } from '../data/mockData';

const Products = () => {
  const [activeCategory, setActiveCategory] = useState('Tümü');
  const [searchQuery, setSearchQuery] = useState('');

  const categories = useMemo(() => {
    const cats = [...new Set(ayakkabilar.map(a => a.cate))];
    return ['Tümü', ...cats];
  }, []);

  const filteredProducts = useMemo(() => {
    return ayakkabilar.filter(item => {
      const matchCategory = activeCategory === 'Tümü' || item.cate === activeCategory;
      const matchSearch = searchQuery === '' ||
        item.kod.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.aciklama.toLowerCase().includes(searchQuery.toLowerCase());
      return matchCategory && matchSearch;
    });
  }, [activeCategory, searchQuery]);

  const groupedProducts = useMemo(() => {
    if (activeCategory !== 'Tümü') {
      return [{ category: activeCategory, items: filteredProducts }];
    }
    const groups = {};
    filteredProducts.forEach(item => {
      if (!groups[item.cate]) groups[item.cate] = [];
      groups[item.cate].push(item);
    });
    return Object.entries(groups).map(([category, items]) => ({ category, items }));
  }, [filteredProducts, activeCategory]);

  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <section className="relative bg-dark-900 pt-32 pb-16 overflow-hidden">
        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, #E4B33C 1px, transparent 0)', backgroundSize: '48px 48px' }} />
        <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-gold/5 rounded-full blur-[100px]" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-4 tracking-tight">
              Ürünlerimiz
            </h1>
            <p className="text-lg text-dark-300 max-w-xl mx-auto mb-8">
              İş güvenliği ayakkabıları ve ekipmanlarında geniş ürün yelpazemizi keşfedin.
            </p>

            {/* Search */}
            <div className="max-w-md mx-auto relative">
              <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-dark-400" />
              <input
                type="text"
                placeholder="Ürün kodu veya açıklama ara..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-11 pr-10 py-3.5 bg-dark-800 border border-white/10 rounded-xl text-white placeholder-dark-400 text-sm focus:outline-none focus:border-gold/50 focus:ring-1 focus:ring-gold/25 transition-all"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-dark-400 hover:text-white transition-colors"
                >
                  <X size={16} />
                </button>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Category Filter */}
      <section className="sticky top-20 z-30 bg-white/95 backdrop-blur-md border-b border-dark-100 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2 py-4 overflow-x-auto scrollbar-hide">
            <Filter size={16} className="text-dark-400 shrink-0" />
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-all duration-200 ${
                  activeCategory === cat
                    ? 'bg-dark-900 text-gold shadow-sm'
                    : 'bg-dark-50 text-dark-500 hover:bg-dark-100 hover:text-dark-700'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Products */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {filteredProducts.length === 0 ? (
            <div className="text-center py-20">
              <div className="w-20 h-20 bg-dark-50 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Search size={32} className="text-dark-300" />
              </div>
              <h3 className="text-xl font-bold text-dark-900 mb-2">Sonuç bulunamadı</h3>
              <p className="text-dark-400">Farklı bir arama terimi veya kategori deneyin.</p>
            </div>
          ) : (
            <div className="space-y-16">
              {groupedProducts.map(({ category, items }) => (
                <div key={category}>
                  {/* Category Header */}
                  <div className="flex items-center gap-4 mb-8">
                    <h2 className="text-2xl font-extrabold text-dark-900">{category}</h2>
                    <span className="px-3 py-1 bg-gold/10 text-gold text-xs font-semibold rounded-full">
                      {items.length} ürün
                    </span>
                    <div className="flex-1 h-px bg-dark-100" />
                  </div>

                  {/* Product Grid */}
                  <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
                    {items.map((item, i) => (
                      <div
                        key={`${item.kod}-${i}`}
                        className="group bg-white rounded-2xl border border-dark-100 hover:border-gold/30 hover:-translate-y-1 hover:shadow-xl hover:shadow-gold/5 transition-all duration-300 overflow-hidden"
                      >
                        <div className="aspect-square overflow-hidden bg-dark-50 p-4 relative">
                          <img
                            src={item.link}
                            alt={item.kod}
                            className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-500"
                            loading="lazy"
                          />
                          <div className="absolute top-3 left-3">
                            <span className="px-2.5 py-1 bg-dark-900/80 text-gold text-[10px] font-semibold rounded-md backdrop-blur-sm">
                              {item.cate}
                            </span>
                          </div>
                        </div>
                        <div className="p-5">
                          <h3 className="font-bold text-dark-900 text-lg mb-2">{item.kod}</h3>
                          <p className="text-sm text-dark-400 leading-relaxed line-clamp-3 mb-4">{item.aciklama}</p>
                          <a
                            href={`https://wa.me/905356482213?text=Merhaba%2C%20${encodeURIComponent(item.kod)}%20hakkında%20bilgi%20almak%20istiyorum.`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center justify-center gap-2 w-full py-2.5 bg-dark-900 hover:bg-gold text-white hover:text-dark-900 rounded-lg text-sm font-semibold transition-all duration-200"
                          >
                            <MessageCircle size={14} />
                            Bilgi Al
                          </a>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="py-16 bg-dark-50">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h3 className="text-2xl font-extrabold text-dark-900 mb-3">
            Aradığınız ürünü bulamadınız mı?
          </h3>
          <p className="text-dark-400 mb-6">
            Katalogumuzda olmayan ürünler için de bize ulaşabilirsiniz. Size en uygun çözümü sunalım.
          </p>
          <a
            href="https://wa.me/905356482213?text=Merhaba%2C%20ürün%20kataloğunuz%20dışında%20bir%20ürün%20hakkında%20bilgi%20almak%20istiyorum."
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-gold hover:bg-gold-dark text-dark-900 font-semibold px-8 py-4 rounded-xl hover:shadow-xl hover:shadow-gold/25 transition-all duration-300"
          >
            <MessageCircle size={18} />
            Bize Sorun
          </a>
        </div>
      </section>
    </div>
  );
};

export default Products;
