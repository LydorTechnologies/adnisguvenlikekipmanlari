import { useState, useEffect } from 'react';

const getStoredServices = () => {
  try {
    return JSON.parse(localStorage.getItem('services') || '[]');
  } catch { return []; }
};

const saveServices = (services) => {
  localStorage.setItem('services', JSON.stringify(services));
};

export default function ServicesAdminPage() {
  const [services, setServices] = useState(getStoredServices);
  const [loading, setLoading] = useState(false);
  const [editingService, setEditingService] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    image: '',
    features: [],
    is_featured: false,
    display_order: 0
  });
  const [newFeature, setNewFeature] = useState('');

  useEffect(() => {
    saveServices(services);
  }, [services]);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (file.size > 15 * 1024 * 1024) {
      alert('Dosya boyutu 15MB\'dan küçük olmalıdır');
      return;
    }

    if (!file.type.startsWith('image/')) {
      alert('Lütfen bir resim dosyası seçin');
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      setFormData(prev => ({ ...prev, image: event.target.result }));
    };
    reader.readAsDataURL(file);
  };

  const handleAddFeature = (e) => {
    e.preventDefault();
    if (newFeature.trim()) {
      setFormData(prev => ({
        ...prev,
        features: [...prev.features, newFeature.trim()]
      }));
      setNewFeature('');
    }
  };

  const handleRemoveFeature = (indexToRemove) => {
    setFormData(prev => ({
      ...prev,
      features: prev.features.filter((_, index) => index !== indexToRemove)
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    let order = formData.display_order;
    if (!editingService && services.length > 0) {
      const maxOrder = Math.max(...services.map(s => s.display_order || 0));
      order = maxOrder + 1;
    }

    const serviceData = {
      title: formData.title,
      description: formData.description,
      image: formData.image,
      features: formData.features,
      is_featured: formData.is_featured,
      display_order: order
    };

    if (editingService) {
      setServices(services.map(s => s.id === editingService.id ? { ...s, ...serviceData } : s));
    } else {
      setServices([...services, { ...serviceData, id: Date.now() }]);
    }

    resetForm();
    alert('İşlem başarılı!');
  };

  const handleDelete = (id) => {
    if (!window.confirm('Bu hizmeti silmek istediğinize emin misiniz?')) return;
    setServices(services.filter(s => s.id !== id));
  };

  const handleEdit = (service) => {
    const mainContent = document.getElementById('admin-content');
    if (mainContent) {
      mainContent.scrollTo({ top: 0, behavior: 'smooth' });
    }
    setEditingService(service);
    setFormData({
      title: service.title,
      description: service.description,
      image: service.image || '',
      features: service.features || [],
      is_featured: service.is_featured || false,
      display_order: service.display_order || 0
    });
  };

  const handleDragStart = (e, index) => {
    e.dataTransfer.setData('text/plain', index);
    e.currentTarget.style.opacity = '0.4';
  };

  const handleDragEnd = (e) => {
    e.currentTarget.style.opacity = '1';
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e, targetIndex) => {
    e.preventDefault();
    const sourceIndex = parseInt(e.dataTransfer.getData('text/plain'));
    if (sourceIndex === targetIndex) return;

    const newServices = [...services];
    const [movedItem] = newServices.splice(sourceIndex, 1);
    newServices.splice(targetIndex, 0, movedItem);

    const reordered = newServices.map((s, i) => ({ ...s, display_order: i }));
    setServices(reordered);
  };

  const toggleFeatured = (id, currentStatus) => {
    setServices(services.map(s => s.id === id ? { ...s, is_featured: !currentStatus } : s));
  };

  const resetForm = () => {
    setEditingService(null);
    setFormData({
      title: '',
      description: '',
      image: '',
      features: [],
      is_featured: false,
      display_order: 0
    });
    setNewFeature('');
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Çalışmalar Yönetimi</h1>

      {/* Form */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <h2 className="text-xl font-semibold mb-4">
          {editingService ? 'Çalışma Düzenle' : 'Yeni Çalışma Ekle'}
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Başlık
            </label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Açıklama
            </label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
              rows="4"
              required
            />
          </div>

          <div>
            <label className="flex items-center space-x-2 cursor-pointer">
              <input
                type="checkbox"
                checked={formData.is_featured}
                onChange={(e) => setFormData({ ...formData, is_featured: e.target.checked })}
                className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
              />
              <span className="text-sm font-medium text-gray-700">Öne Çıkarılan</span>
            </label>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Özellikler
            </label>
            <div className="flex gap-2 mb-2">
              <input
                type="text"
                value={newFeature}
                onChange={(e) => setNewFeature(e.target.value)}
                className="flex-1 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                placeholder="Yeni özellik ekle (örn: Haftalık kontrol)"
                onKeyPress={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    handleAddFeature(e);
                  }
                }}
              />
              <button
                type="button"
                onClick={handleAddFeature}
                className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700"
              >
                Ekle
              </button>
            </div>
            {formData.features.length > 0 && (
              <ul className="space-y-2 mt-2">
                {formData.features.map((feature, index) => (
                  <li key={index} className="flex items-center justify-between bg-gray-50 p-2 rounded">
                    <span className="text-sm text-gray-700">{feature}</span>
                    <button
                      type="button"
                      onClick={() => handleRemoveFeature(index)}
                      className="text-red-500 hover:text-red-700 p-1"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Görsel
            </label>
            <div className="space-y-2">
              <input
                type="text"
                value={formData.image}
                onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                placeholder="Görsel URL girin veya dosya yükleyin"
              />
              <div className="flex gap-2">
                <label className="flex-1">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                  />
                  <div className="w-full px-4 py-2 bg-gray-100 hover:bg-gray-200 border rounded-lg cursor-pointer text-center transition-colors">
                    Dosya Seç
                  </div>
                </label>
              </div>
            </div>
            {formData.image && (
              <div className="mt-2 relative inline-block">
                <img
                  src={formData.image}
                  alt="Preview"
                  className="h-32 object-cover rounded"
                />
                <button
                  type="button"
                  onClick={() => setFormData({ ...formData, image: '' })}
                  className="absolute top-1 right-1 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center hover:bg-red-600"
                >
                  ×
                </button>
              </div>
            )}
          </div>

          <div className="flex gap-2">
            <button
              type="submit"
              className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors"
            >
              {editingService ? 'Güncelle' : 'Ekle'}
            </button>
            {editingService && (
              <button
                type="button"
                onClick={resetForm}
                className="px-6 bg-gray-500 text-white py-2 rounded-lg hover:bg-gray-600 transition-colors"
              >
                İptal
              </button>
            )}
          </div>
        </form>
      </div>

      {/* Hizmet Listesi */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-semibold mb-4">Mevcut Çalışmalar</h2>
        <div className="space-y-4">
          {services.map((service, index) => (
            <div
              key={service.id}
              draggable
              onDragStart={(e) => handleDragStart(e, index)}
              onDragEnd={handleDragEnd}
              onDragOver={handleDragOver}
              onDrop={(e) => handleDrop(e, index)}
              className="border rounded-lg p-4 flex gap-4 items-center cursor-move hover:shadow-lg transition-all"
            >
              <div className="flex flex-col gap-1 mr-2 text-gray-400">
                <svg className="w-6 h-6 cursor-grab active:cursor-grabbing" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8h16M4 16h16" />
                </svg>
              </div>
              <div className="flex-shrink-0">
                {service.image && (
                  <img
                    src={service.image}
                    alt={service.title}
                    className="h-20 w-20 object-cover rounded"
                  />
                )}
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="font-semibold text-lg">{service.title}</h3>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleFeatured(service.id, service.is_featured);
                    }}
                    className={`text-sm px-2 py-0.5 rounded-full border ${service.is_featured ? 'bg-yellow-100 text-yellow-800 border-yellow-200' : 'bg-gray-100 text-gray-500 border-gray-200'}`}
                    title="Öne çıkarılan durumu değiştir"
                  >
                    {service.is_featured ? '★ Öne Çıkan' : '☆ Normal'}
                  </button>
                </div>
                <p className="text-gray-600 mt-1">{service.description}</p>
              </div>
              <div className="flex-shrink-0 flex gap-2">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleEdit(service);
                  }}
                  className="px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600 transition-colors"
                >
                  Düzenle
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDelete(service.id);
                  }}
                  className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
                >
                  Sil
                </button>
              </div>
            </div>
          ))}
          {services.length === 0 && (
            <p className="text-gray-500 text-center py-8">Henüz hizmet eklenmemiş.</p>
          )}
        </div>
      </div>
    </div>
  );
}
