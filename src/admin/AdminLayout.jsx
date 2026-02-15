import React from 'react';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import { LayoutDashboard, Coffee, FileText, Settings, LogOut, ArrowLeft } from 'lucide-react';

const AdminLayout = ({ onLogout }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    onLogout();
    navigate('/admingiris');
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-900 text-white flex flex-col">
        <div className="p-6 text-xl font-bold border-b border-gray-700">
          Yönetim Paneli
        </div>
        <nav className="flex-1 p-4 space-y-2 text-sm">
          <Link to="/admin" className="flex items-center p-3 hover:bg-gray-800 rounded">
            <LayoutDashboard size={18} className="mr-3" /> Genel Durum
          </Link>
          <Link to="/admin/blog" className="flex items-center p-3 hover:bg-gray-800 rounded">
            <FileText size={18} className="mr-3" /> Blog Yazıları
          </Link>
          <Link to="/admin/calismalar" className="flex items-center p-3 hover:bg-gray-800 rounded">
            <Settings size={18} className="mr-3" /> Çalışmalar
          </Link>
        </nav>
        <div className="border-t border-gray-800">
          <a
            href="/"
            className="w-full flex items-center justify-center p-3 bg-blue-600 hover:bg-blue-700 text-sm"
          >
            <ArrowLeft size={16} className="mr-2" /> Siteye Dön
          </a>
          <button
            onClick={handleLogout}
            className="w-full flex items-center justify-center p-3 bg-red-600 hover:bg-red-700 text-sm"
          >
            <LogOut size={16} className="mr-2" /> Çıkış Yap
          </button>
        </div>
      </aside>

      {/* Content */}
      <main id="admin-content" className="flex-1 overflow-auto p-6 bg-gray-50">
        <div className="bg-white rounded-2xl shadow-sm border p-6 min-h-full">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default AdminLayout;
