import React, { useState, useEffect } from 'react';

const getStoredPosts = () => {
  try {
    return JSON.parse(localStorage.getItem('blog_posts') || '[]');
  } catch { return []; }
};

const savePosts = (posts) => {
  localStorage.setItem('blog_posts', JSON.stringify(posts));
};

export default function BlogAdminPage() {
  const [posts, setPosts] = useState(getStoredPosts);
  const [isEditing, setIsEditing] = useState(false);
  const [filterCategory, setFilterCategory] = useState('all');
  const [currentPost, setCurrentPost] = useState({
    id: null,
    title: '',
    content: '',
    excerpt: '',
    image: '',
    category: '',
    date: '',
    author: '',
    featured: false,
  });

  const categories = ['Beslenme', 'Sağlık', 'Yaşam Tarzı', 'Tarifler', 'Spor'];

  useEffect(() => {
    savePosts(posts);
  }, [posts]);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (file.size > 15 * 1024 * 1024) {
      alert('Dosya boyutu 15MB\'dan küçük olmalıdır');
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      setCurrentPost({ ...currentPost, image: event.target.result });
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (currentPost.id) {
      setPosts(posts.map(p => p.id === currentPost.id ? { ...currentPost, updated_at: new Date().toISOString() } : p));
    } else {
      const newPost = {
        ...currentPost,
        id: Date.now(),
        created_at: new Date().toISOString(),
      };
      setPosts([newPost, ...posts]);
    }

    resetForm();
    alert('İşlem başarılı!');
  };

  const handleEdit = (post) => {
    const mainContent = document.getElementById('admin-content');
    if (mainContent) {
      mainContent.scrollTo({ top: 0, behavior: 'smooth' });
    }
    setCurrentPost(post);
    setIsEditing(true);
  };

  const handleDelete = (id) => {
    if (!window.confirm('Bu yazıyı silmek istediğinize emin misiniz?')) return;
    setPosts(posts.filter(p => p.id !== id));
  };

  const resetForm = () => {
    setCurrentPost({
      id: null,
      title: '',
      content: '',
      excerpt: '',
      image: '',
      category: '',
      date: '',
      author: '',
      featured: false,
    });
    setIsEditing(false);
  };

  const filteredPosts = filterCategory === 'all'
    ? posts
    : posts.filter(post => post.category === filterCategory);

  return (
    <div className="max-w-7xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Blog Yönetimi</h1>
        <p className="text-gray-600">Blog yazılarını ekleyin, düzenleyin veya silin</p>
      </div>

      {/* Form */}
      <div className="bg-white rounded-xl shadow-md p-6 mb-8">
        <h2 className="text-xl font-semibold mb-4">
          {isEditing ? 'Yazıyı Düzenle' : 'Yeni Yazı Ekle'}
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Başlık</label>
              <input
                type="text"
                value={currentPost.title}
                onChange={(e) => setCurrentPost({ ...currentPost, title: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Kategori</label>
              <select
                value={currentPost.category}
                onChange={(e) => setCurrentPost({ ...currentPost, category: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                required
              >
                <option value="">Kategori Seçin</option>
                {categories.map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Özet</label>
            <input
              type="text"
              value={currentPost.excerpt}
              onChange={(e) => setCurrentPost({ ...currentPost, excerpt: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">İçerik</label>
            <textarea
              value={currentPost.content}
              onChange={(e) => setCurrentPost({ ...currentPost, content: e.target.value })}
              rows="8"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Görsel</label>
            <div className="space-y-3">
              <div className="flex space-x-2">
                <input
                  type="text"
                  value={currentPost.image}
                  onChange={(e) => setCurrentPost({ ...currentPost, image: e.target.value })}
                  placeholder="URL girin veya dosya yükleyin"
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
                <label className="relative cursor-pointer">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                  />
                  <span className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 transition">
                    Dosya Seç
                  </span>
                </label>
              </div>
              {currentPost.image && (
                <div className="relative">
                  <img
                    src={currentPost.image}
                    alt="Önizleme"
                    className="w-full h-48 object-cover rounded-lg"
                    onError={(e) => {
                      e.target.src = 'https://via.placeholder.com/800x400?text=Görsel+Yüklenemedi';
                    }}
                  />
                  <button
                    type="button"
                    onClick={() => setCurrentPost({ ...currentPost, image: '' })}
                    className="absolute top-2 right-2 bg-red-500 hover:bg-red-600 text-white w-8 h-8 rounded-full transition flex items-center justify-center"
                  >
                    ✕
                  </button>
                </div>
              )}
            </div>
          </div>

          <div className="flex space-x-3">
            <button
              type="submit"
              className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg font-medium transition"
            >
              {isEditing ? 'Güncelle' : 'Ekle'}
            </button>
            {isEditing && (
              <button
                type="button"
                onClick={resetForm}
                className="bg-gray-500 hover:bg-gray-600 text-white px-6 py-2 rounded-lg font-medium transition"
              >
                İptal
              </button>
            )}
          </div>
        </form>
      </div>

      {/* Filter */}
      <div className="bg-white rounded-xl shadow-md p-4 mb-6">
        <div className="flex items-center space-x-4 overflow-x-auto">
          <span className="text-sm font-medium text-gray-700">Filtrele:</span>
          <div className="flex space-x-2">
            <button
              onClick={() => setFilterCategory('all')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition whitespace-nowrap ${filterCategory === 'all'
                ? 'bg-green-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
            >
              Tümü ({posts.length})
            </button>
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setFilterCategory(cat)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition whitespace-nowrap ${filterCategory === cat
                  ? 'bg-green-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Posts List */}
      <div className="bg-white rounded-xl shadow-md overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Başlık
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Kategori
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Yazar
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Tarih
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Durum
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  İşlemler
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredPosts.map((post) => (
                <tr key={post.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <div className="flex items-center">
                      {post.featured && <span className="text-yellow-500 mr-2">⭐</span>}
                      <div className="text-sm font-medium text-gray-900">{post.title}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                      {post.category}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {post.author || '-'}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {post.created_at ? new Date(post.created_at).toLocaleDateString('tr-TR') : post.date}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {post.featured ? (
                      <span className="px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-100 text-yellow-800">
                        Öne Çıkan
                      </span>
                    ) : (
                      <span className="px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-gray-100 text-gray-800">
                        Normal
                      </span>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <button
                      onClick={() => handleEdit(post)}
                      className="text-blue-600 hover:text-blue-900 mr-4"
                    >
                      Düzenle
                    </button>
                    <button
                      onClick={() => handleDelete(post.id)}
                      className="text-red-600 hover:text-red-900"
                    >
                      Sil
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
