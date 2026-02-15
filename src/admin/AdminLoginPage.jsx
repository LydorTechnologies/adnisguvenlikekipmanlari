import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const ADMIN_USERNAME = 'admin';
const ADMIN_PASSWORD = 'admin123';

const AdminLoginPage = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
      onLogin();
      navigate('/admin');
    } else {
      setError('Kullanıcı adı veya şifre hatalı.');
      setLoading(false);
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen flex items-center justify-center px-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-sm border p-6">
        <h1 className="text-2xl font-bold mb-2 text-gray-900 text-center">Admin Girişi</h1>
        <p className="text-gray-600 text-sm mb-6 text-center">
          Lütfen admin bilgilerinizi giriniz.
        </p>

        {error && (
          <div className="mb-4 text-sm px-4 py-2 rounded border border-red-200 bg-red-50 text-red-800">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4 text-sm">
          <div>
            <label className="block mb-1 font-medium">Kullanıcı Adı</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
              placeholder="admin"
              autoComplete="username"
              required
            />
          </div>
          <div>
            <label className="block mb-1 font-medium">Şifre</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
              placeholder="******"
              autoComplete="current-password"
              required
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-green-600 text-white py-2 rounded-full font-semibold hover:bg-green-700 disabled:opacity-50"
          >
            {loading ? 'Giriş Yapılıyor...' : 'Giriş Yap'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminLoginPage;
