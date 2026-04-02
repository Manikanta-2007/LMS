import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Home, Search, Ghost, ArrowLeft } from 'lucide-react';

const NotFound = () => {
  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="max-w-md w-full bg-white rounded-3xl shadow-2xl p-10 text-center border border-slate-100"
      >
        <div className="relative mb-8 inline-block">
           <div className="absolute inset-0 bg-primary/10 rounded-full blur-2xl animate-pulse"></div>
           <Ghost className="h-20 w-20 text-primary relative z-10 mx-auto" />
        </div>
        
        <h1 className="text-6xl font-extrabold text-primary mb-4 tracking-tighter">404</h1>
        <h2 className="text-2xl font-bold text-slate-800 mb-4 tracking-tight">Resource Not Found</h2>
        <p className="text-slate-500 mb-10 leading-relaxed text-sm">
          Oops! The page you're looking for seems to have been archived or moved. Let's get you back on track.
        </p>
        
        <div className="grid grid-cols-2 gap-4">
           <Link 
            to="/" 
            className="flex items-center justify-center space-x-2 bg-primary text-white py-3 rounded-xl font-bold hover:bg-secondary transition-all shadow-lg hover:-translate-y-1"
          >
            <Home className="h-4 w-4" />
            <span>Go Home</span>
          </Link>
          <Link 
            to="/catalog" 
            className="flex items-center justify-center space-x-2 border border-slate-200 text-slate-700 py-3 rounded-xl font-bold hover:bg-slate-50 transition-all hover:-translate-y-1"
          >
            <Search className="h-4 w-4" />
            <span>Catalog</span>
          </Link>
        </div>
        
        <div className="mt-10 pt-8 border-t border-slate-50">
           <button 
              onClick={() => window.history.back()}
              className="flex items-center space-x-2 text-slate-400 hover:text-primary transition-colors text-xs font-bold uppercase tracking-widest mx-auto"
           >
              <ArrowLeft className="h-3 w-3" />
              <span>Go Back</span>
           </button>
        </div>
      </motion.div>
    </div>
  );
};

export default NotFound;
