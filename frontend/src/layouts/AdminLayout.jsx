import { Outlet, Link, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  FileBox, 
  Users, 
  MessageSquare, 
  PlusCircle, 
  ArrowLeft 
} from 'lucide-react';

const AdminLayout = () => {
  const location = useLocation();

  const menuItems = [
    { name: 'Dashboard', path: '/admin/dashboard', icon: LayoutDashboard },
    { name: 'Manage Resources', path: '/admin/resources', icon: FileBox },
    { name: 'Add Resource', path: '/admin/add-resource', icon: PlusCircle },
    { name: 'Manage Users', path: '/admin/users', icon: Users },
    { name: 'Feedbacks', path: '/admin/feedback', icon: MessageSquare },
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <div className="flex h-screen bg-slate-100">
      {/* Sidebar */}
      <aside className="w-64 bg-primary text-white flex-shrink-0 hidden md:flex flex-col shadow-xl">
        <div className="p-6 border-b border-white/10">
          <Link to="/" className="flex items-center space-x-2 text-xl font-bold">
            <ArrowLeft className="h-5 w-5" />
            <span>Edu Admin</span>
          </Link>
        </div>
        <nav className="flex-grow p-4 space-y-2">
          {menuItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center space-x-3 p-3 rounded-lg transition-colors ${
                isActive(item.path) 
                  ? 'bg-secondary text-white shadow-md' 
                  : 'hover:bg-white/10 text-white/80'
              }`}
            >
              <item.icon className="h-5 w-5" />
              <span className="font-medium text-sm">{item.name}</span>
            </Link>
          ))}
        </nav>
        <div className="p-4 border-t border-white/10 text-xs text-white/50 text-center">
          EduResource Admin v1.0
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-grow flex flex-col overflow-hidden">
        <header className="bg-white h-16 shadow-sm flex items-center justify-between px-8">
          <h1 className="text-xl font-semibold text-slate-800 uppercase tracking-wide">
            {menuItems.find(item => isActive(item.path))?.name || 'Administrator'}
          </h1>
          <div className="flex items-center space-x-4">
             <div className="text-right">
                <p className="text-sm font-medium text-slate-700 leading-none">Admin Portal</p>
                <p className="text-xs text-slate-400 mt-1">Status: Online</p>
             </div>
          </div>
        </header>
        <main className="flex-grow overflow-y-auto p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
