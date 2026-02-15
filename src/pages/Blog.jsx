import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function Blog() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    try {
      const stored = JSON.parse(localStorage.getItem('blog_posts') || '[]');
      setPosts(stored);
    } catch {
      setPosts([]);
    }
  }, []);

  const popularPosts = posts.slice(0, 4);

  return (
    <div className="bg-gray-50 py-16">
      {/* Header */}
      <div className="bg-white py-12 mb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-700">
            Blog
          </h1>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {posts.length === 0 ? (
          <div className="text-center py-16 text-gray-500">
            <p className="text-xl">Henüz blog yazısı eklenmemiş.</p>
          </div>
        ) : (
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Sol Kolon - Blog Yazıları */}
            <div className="lg:col-span-2 space-y-8">
              {posts.map((post) => (
                <article
                  key={post.id}
                  className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-shadow duration-300"
                >
                  <div className="md:flex">
                    {/* Görsel */}
                    <div className="md:w-1/2">
                      <img
                        src={post.image || 'https://via.placeholder.com/400x300'}
                        alt={post.title}
                        className="w-full h-64 md:h-full object-cover"
                      />
                    </div>

                    {/* İçerik */}
                    <div className="md:w-1/2 p-6 flex flex-col justify-between">
                      <div>
                        <div className="flex items-center gap-4 mb-3">
                          <span className="inline-block bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-semibold uppercase">
                            {post.category}
                          </span>
                          <span className="text-sm text-gray-500">
                            {post.created_at ? new Date(post.created_at).toLocaleDateString('tr-TR') : ''}
                          </span>
                        </div>

                        <h2 className="text-2xl font-bold text-gray-900 mb-3 hover:text-green-600 transition">
                          <Link to={`/blog/${post.id}`}>
                            {post.title}
                          </Link>
                        </h2>

                        <p className="text-gray-600 mb-4 line-clamp-3">
                          {post.excerpt}
                        </p>
                      </div>

                      <Link
                        to={`/blog/${post.id}`}
                        className="inline-flex items-center text-green-600 font-semibold hover:text-green-700 transition"
                      >
                        Devamını Oku
                        <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </Link>
                    </div>
                  </div>
                </article>
              ))}
            </div>

            {/* Sağ Kolon - Popüler Yazılar */}
            <div className="lg:col-span-1">
              <div className="sticky top-24">
                <div className="bg-white rounded-2xl shadow-lg p-6">
                  <h3 className="text-2xl font-bold text-gray-900 mb-6">
                    Popüler Yazılar
                  </h3>
                  <div className="space-y-6">
                    {popularPosts.map((post) => (
                      <Link
                        key={post.id}
                        to={`/blog/${post.id}`}
                        className="flex gap-4 group"
                      >
                        {/* Küçük Görsel */}
                        <div className="w-20 h-20 rounded-lg overflow-hidden flex-shrink-0">
                          <img
                            src={post.image || 'https://via.placeholder.com/150'}
                            alt={post.title}
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                          />
                        </div>

                        {/* İçerik */}
                        <div className="flex-1">
                          <h4 className="font-semibold text-gray-900 mb-1 line-clamp-2 group-hover:text-green-600 transition">
                            {post.title}
                          </h4>
                          <p className="text-sm text-gray-500 line-clamp-2">
                            {post.excerpt}
                          </p>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>

                {/* Kategoriler */}
                <div className="bg-white rounded-2xl shadow-lg p-6 mt-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-4">
                    Kategoriler
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {['Beslenme', 'Sağlık', 'Yaşam Tarzı', 'Tarifler', 'Spor'].map((category) => (
                      <button
                        key={category}
                        className="px-4 py-2 bg-gray-100 hover:bg-green-100 text-gray-700 hover:text-green-700 rounded-full text-sm font-medium transition"
                      >
                        {category}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Blog;
