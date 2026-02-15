import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';

function BlogDetail() {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [relatedPosts, setRelatedPosts] = useState([]);

  useEffect(() => {
    try {
      const posts = JSON.parse(localStorage.getItem('blog_posts') || '[]');
      const currentPost = posts.find(p => String(p.id) === String(id));
      setPost(currentPost || null);

      if (currentPost) {
        const related = posts
          .filter(p => p.category === currentPost.category && String(p.id) !== String(id))
          .slice(0, 3);
        setRelatedPosts(related);
      }
    } catch {
      setPost(null);
    } finally {
      setLoading(false);
    }
  }, [id]);

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">Yükleniyor...</div>;
  }

  if (!post) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Blog yazısı bulunamadı</h1>
          <Link to="/blog" className="text-green-600 hover:text-green-700">
            Blog sayfasına dön
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 py-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-3 gap-12">
          {/* Sol Kolon - Ana İçerik */}
          <div className={relatedPosts.length > 0 ? "lg:col-span-2" : "lg:col-span-3"}>
            <article className="bg-white rounded-2xl shadow-lg overflow-hidden">
              {/* Görsel */}
              {post.image && (
                <div className="relative">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-96 object-cover"
                  />
                </div>
              )}

              {/* İçerik */}
              <div className="p-8 md:p-12">
                {/* Kategori Badge */}
                <div className="mb-4">
                  <span className="inline-block bg-yellow-400 text-gray-900 px-4 py-1 rounded-full text-sm font-semibold">
                    {post.category}
                  </span>
                </div>

                {/* Başlık */}
                <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                  {post.title}
                </h1>

                {/* Tarih */}
                {post.created_at && (
                  <div className="flex items-center text-gray-500 mb-8">
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    <span>{new Date(post.created_at).toLocaleDateString('tr-TR')}</span>
                  </div>
                )}

                {/* Paylaş Butonları */}
                <div className="bg-gray-50 rounded-lg p-4 mb-8">
                  <p className="text-sm font-semibold text-gray-700 mb-3">Paylaş:</p>
                  <div className="flex flex-wrap gap-3">
                    <button
                      onClick={() => {
                        navigator.clipboard.writeText(window.location.href);
                        alert('Link kopyalandı!');
                      }}
                      className="w-10 h-10 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition"
                      title="Linki Kopyala"
                    >
                      <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                      </svg>
                    </button>

                    <button
                      onClick={() => window.open(`https://wa.me/?text=${encodeURIComponent(post.title + ' ' + window.location.href)}`, '_blank')}
                      className="w-10 h-10 rounded-full bg-green-500 hover:bg-green-600 flex items-center justify-center transition shadow-sm text-white"
                      title="WhatsApp'ta Paylaş"
                    >
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                      </svg>
                    </button>

                    <button
                      onClick={() => window.open(`https://www.facebook.com/sharer/sharer.php?u=${window.location.href}`, '_blank')}
                      className="w-10 h-10 rounded-full bg-blue-600 hover:bg-blue-700 flex items-center justify-center transition shadow-sm text-white"
                      title="Facebook'ta Paylaş"
                    >
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.954 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                      </svg>
                    </button>
                  </div>
                </div>

                {/* Özet */}
                <p className="text-lg text-gray-700 mb-8 leading-relaxed">
                  {post.excerpt}
                </p>

                {/* Ana İçerik */}
                <div className="prose prose-lg max-w-none">
                  <div dangerouslySetInnerHTML={{ __html: post.content }} />
                </div>
              </div>
            </article>

            {/* Geri Dön Butonu */}
            <div className="mt-8">
              <Link
                to="/blog"
                className="inline-flex items-center text-green-600 hover:text-green-700 font-semibold"
              >
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                Blog'a Dön
              </Link>
            </div>
          </div>

          {/* Sağ Kolon - İlgili Yazılar */}
          {relatedPosts.length > 0 && (
            <div className="lg:col-span-1">
              <div className="sticky top-24">
                <div className="bg-white rounded-2xl shadow-lg p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-6">
                    İlgili Yazılar
                  </h3>
                  <div className="space-y-6">
                    {relatedPosts.map((relatedPost) => (
                      <Link
                        key={relatedPost.id}
                        to={`/blog/${relatedPost.id}`}
                        className="block group"
                      >
                        {relatedPost.image && (
                          <div className="rounded-lg overflow-hidden mb-3">
                            <img
                              src={relatedPost.image}
                              alt={relatedPost.title}
                              className="w-full h-40 object-cover group-hover:scale-110 transition-transform duration-300"
                            />
                          </div>
                        )}
                        <h4 className="font-semibold text-gray-900 mb-2 group-hover:text-green-600 transition line-clamp-2">
                          {relatedPost.title}
                        </h4>
                        {relatedPost.created_at && (
                          <p className="text-sm text-gray-500">
                            {new Date(relatedPost.created_at).toLocaleDateString('tr-TR')}
                          </p>
                        )}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default BlogDetail;
