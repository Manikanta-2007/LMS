import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { BookOpen, User, LogOut, LayoutDashboard, Search, Menu, X } from 'lucide-react';
import { useState } from 'react';

const Navbar = () => {
  const { user, logout, isAdmin } = useAuth();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="bg-primary text-white shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0 flex items-center space-x-2">
              <BookOpen className="h-8 w-8 text-white" />
              <span className="font-bold text-xl tracking-tight hidden md:block">EduResource</span>
            </Link>
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-4">
                <Link to="/" className="px-3 py-2 rounded-md text-sm font-medium hover:bg-secondary">Home</Link>
                <Link to="/catalog" className="px-3 py-2 rounded-md text-sm font-medium hover:bg-secondary">Catalog</Link>
                <Link to="/about" className="px-3 py-2 rounded-md text-sm font-medium hover:bg-secondary">About</Link>
              </div>
            </div>
          </div>
          <div className="hidden md:block">
            <div className="ml-4 flex items-center md:ml-6 space-x-2">
              {user ? (
                <>
                  {isAdmin ? (
                    <Link to="/admin" className="flex items-center space-x-1 px-3 py-2 rounded-md text-sm font-medium hover:bg-secondary">
                      <LayoutDashboard className="h-4 w-4" />
                      <span>Dashboard</span>
                    </Link>
                  ) : (
                    <Link to="/student-portal" className="flex items-center space-x-1 px-3 py-2 rounded-md text-sm font-medium hover:bg-secondary">
                      <BookOpen className="h-4 w-4" />
                      <span>Student Portal</span>
                    </Link>
                  )}
                  <Link to="/profile" className="flex items-center space-x-1 px-3 py-2 rounded-md text-sm font-medium hover:bg-secondary">
                    <User className="h-4 w-4" />
                    <span>{user.name}</span>
                  </Link>
                  <button 
                    onClick={handleLogout}
                    className="flex items-center space-x-1 px-3 py-2 rounded-md text-sm font-medium hover:bg-red-600 transition-colors"
                  >
                    <LogOut className="h-4 w-4" />
                    <span>Logout</span>
                  </button>
                </>
              ) : (
                <>
                  <Link to="/login" className="px-4 py-2 rounded-md text-sm font-medium bg-white text-primary hover:bg-blue-50 transition-colors">Login</Link>
                  <Link to="/register" className="px-4 py-2 rounded-md text-sm font-medium border border-white hover:bg-white/10 transition-colors">Register</Link>
                </>
              )}
            </div>
          </div>
          <div className="-mr-2 flex md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-white hover:bg-secondary focus:outline-none"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-primary px-2 pt-2 pb-3 space-y-1 sm:px-3 animate-in slide-in-from-top duration-300">
          <Link to="/" onClick={() => setIsOpen(false)} className="block px-3 py-2 rounded-md text-base font-medium hover:bg-secondary">Home</Link>
          <Link to="/catalog" onClick={() => setIsOpen(false)} className="block px-3 py-2 rounded-md text-base font-medium hover:bg-secondary">Catalog</Link>
          <Link to="/about" onClick={() => setIsOpen(false)} className="block px-3 py-2 rounded-md text-base font-medium hover:bg-secondary">About</Link>
          {user ? (
            <>
              {isAdmin ? (
                <Link to="/admin" onClick={() => setIsOpen(false)} className="block px-3 py-2 rounded-md text-base font-medium hover:bg-secondary">Dashboard</Link>
              ) : (
                <Link to="/student-portal" onClick={() => setIsOpen(false)} className="block px-3 py-2 rounded-md text-base font-medium hover:bg-secondary">Student Portal</Link>
              )}
              <Link to="/profile" onClick={() => setIsOpen(false)} className="block px-3 py-2 rounded-md text-base font-medium hover:bg-secondary">Profile</Link>
              <button 
                onClick={() => { setIsOpen(false); handleLogout(); }}
                className="w-full text-left block px-3 py-2 rounded-md text-base font-medium text-red-300 hover:bg-red-900/30"
              >
                Logout
              </button>
            </>
          ) : (
            <div className="pt-4 space-y-1">
              <Link to="/login" onClick={() => setIsOpen(false)} className="block px-3 py-2 rounded-md text-base font-medium hover:bg-secondary">Login</Link>
              <Link to="/register" onClick={() => setIsOpen(false)} className="block px-3 py-2 rounded-md text-base font-medium hover:bg-secondary">Register</Link>
            </div>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
