import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { motion } from 'framer-motion';
import { UserPlus, Mail, Lock, User, ShieldCheck, ArrowRight, BookOpen } from 'lucide-react';
import { toast } from 'react-toastify';

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [loading, setLoading] = useState(false);
  const { register } = useAuth();
  const navigate = useNavigate();

  const { name, email, password, confirmPassword } = formData;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      return toast.error('Passwords do not match');
    }

    setLoading(true);
    const result = await register({ name, email, password });
    setLoading(false);

    if (result.success) {
      toast.success('Account created successfully!');
      navigate('/login');
    } else {
      toast.error(result.message);
    }
  };

  return (
    <div className="min-h-[calc(100vh-64px)] flex items-center justify-center bg-academic-gray px-4 py-12">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="max-w-xl w-full bg-white rounded-3xl shadow-xl overflow-hidden border border-slate-100 flex flex-col md:flex-row"
      >
        {/* Left: Info Side */}
        <div className="hidden md:flex md:w-2/5 bg-primary p-12 text-white flex-col justify-center relative overflow-hidden">
           <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16 blur-2xl"></div>
           <div className="absolute bottom-0 left-0 w-32 h-32 bg-white/10 rounded-full -ml-16 -mb-16 blur-2xl"></div>
           
           <BookOpen className="h-12 w-12 mb-8 relative z-10" />
           <h2 className="text-3xl font-bold mb-6 relative z-10 leading-tight">Join the Library</h2>
           <ul className="space-y-4 text-sm text-blue-100 relative z-10">
              <li className="flex items-center space-x-2">
                 <ShieldCheck className="h-4 w-4 text-blue-300" />
                 <span>Free unlimited downloads</span>
              </li>
              <li className="flex items-center space-x-2">
                 <ShieldCheck className="h-4 w-4 text-blue-300" />
                 <span>Bookmark resources</span>
              </li>
              <li className="flex items-center space-x-2">
                 <ShieldCheck className="h-4 w-4 text-blue-300" />
                 <span>Join the community</span>
              </li>
           </ul>
        </div>

        {/* Right: Form Side */}
        <div className="flex-grow p-8 md:p-12">
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2 px-1">Full Name</label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-300 group-focus-within:text-primary transition-colors">
                  <User className="h-5 w-5" />
                </div>
                <input
                  type="text"
                  name="name"
                  required
                  className="block w-full pl-12 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
                  placeholder="John Doe"
                  value={name}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2 px-1">Email Address</label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-300 group-focus-within:text-primary transition-colors">
                  <Mail className="h-5 w-5" />
                </div>
                <input
                  type="email"
                  name="email"
                  required
                  className="block w-full pl-12 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
                  placeholder="john@university.edu"
                  value={email}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2 px-1">Password</label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-300 group-focus-within:text-primary transition-colors">
                    <Lock className="h-4 w-4" />
                  </div>
                  <input
                    type="password"
                    name="password"
                    required
                    className="block w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all text-sm"
                    placeholder="••••••••"
                    value={password}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2 px-1">Confirm</label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-300 group-focus-within:text-primary transition-colors">
                    <ShieldCheck className="h-4 w-4" />
                  </div>
                  <input
                    type="password"
                    name="confirmPassword"
                    required
                    className="block w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all text-sm"
                    placeholder="••••••••"
                    value={confirmPassword}
                    onChange={handleChange}
                  />
                </div>
              </div>
            </div>

            <div className="pt-4">
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-primary text-white py-4 rounded-2xl font-bold hover:bg-secondary transition-all disabled:opacity-50 flex items-center justify-center space-x-2 shadow-lg hover:shadow-primary/20 hover:-translate-y-0.5"
              >
                {loading ? (
                  <div className="h-5 w-5 border-2 border-white border-t-transparent animate-spin rounded-full"></div>
                ) : (
                  <>
                    <span>Create Free Account</span>
                    <ArrowRight className="h-5 w-5" />
                  </>
                )}
              </button>
            </div>
            
            <div className="pt-4 text-center">
              <p className="text-sm text-slate-500">
                Already have an account?
              </p>
              <Link to="/login" className="inline-block mt-1 text-primary font-bold hover:underline">
                Sign in to your library
              </Link>
            </div>
          </form>
        </div>
      </motion.div>
    </div>
  );
};

export default Register;
