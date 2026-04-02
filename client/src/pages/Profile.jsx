import { useAuth } from '../context/AuthContext';
import { motion } from 'framer-motion';
import { User, Mail, Shield, Calendar, BookOpen, Download, Settings, LogOut } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
  const { user, logout, isAdmin } = useAuth();
  const navigate = useNavigate();

  if (!user) return null;

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const userStats = [
    { label: 'Saved Resources', value: '12', icon: BookOpen },
    { label: 'Total Downloads', value: '45', icon: Download },
    { label: 'Reviews Posted', value: '8', icon: Settings },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        {/* Profile Card */}
        <div className="lg:col-span-1 space-y-6">
           <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-3xl p-8 shadow-xl border border-slate-100 text-center relative overflow-hidden"
           >
              <div className="absolute top-0 left-0 w-full h-24 bg-primary px-4 py-3 flex items-center justify-between text-white">
                 <span className="text-[10px] font-bold uppercase tracking-widest bg-white/20 px-2 py-1 rounded-md">ID: {user.id.slice(-6).toUpperCase()}</span>
                 {isAdmin && <Shield className="h-5 w-5 text-blue-300" />}
              </div>
              
              <div className="relative mt-12 mb-6 inline-block">
                 <div className="absolute inset-0 bg-primary/20 rounded-full blur-xl scale-125"></div>
                 <div className="relative z-10 w-32 h-32 bg-white rounded-full mx-auto flex items-center justify-center border-4 border-white shadow-xl">
                    <User className="h-16 w-16 text-primary" />
                 </div>
              </div>

              <h2 className="text-2xl font-bold text-slate-800 tracking-tight">{user.name}</h2>
              <p className="text-sm font-bold text-primary uppercase tracking-widest mt-1">{user.role}</p>
              
              <div className="mt-8 space-y-4 text-left">
                 <div className="flex items-center space-x-3 p-3 bg-slate-50 rounded-xl">
                    <Mail className="h-5 w-5 text-slate-400" />
                    <span className="text-sm font-medium text-slate-600">{user.email}</span>
                 </div>
                 <div className="flex items-center space-x-3 p-3 bg-slate-50 rounded-xl">
                    <Calendar className="h-5 w-5 text-slate-400" />
                    <span className="text-sm font-medium text-slate-600">Joined Mar 2024</span>
                 </div>
              </div>

              <div className="pt-8 border-t border-slate-50 mt-8">
                 <button 
                  onClick={handleLogout}
                  className="w-full flex items-center justify-center space-x-2 text-red-500 font-bold hover:bg-red-50 py-3 rounded-xl transition-all"
                 >
                    <LogOut className="h-5 w-5" />
                    <span>Sign Out</span>
                 </button>
              </div>
           </motion.div>
        </div>

        {/* Stats and Activity */}
        <div className="lg:col-span-2 space-y-8">
           <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {userStats.map((stat, i) => (
                <motion.div 
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                  key={i} 
                  className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100 flex items-center space-x-4"
                >
                   <div className="p-3 bg-blue-50 text-primary rounded-2xl">
                      <stat.icon className="h-6 w-6" />
                   </div>
                   <div>
                      <p className="text-3xl font-extrabold text-slate-800 leading-none">{stat.value}</p>
                      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-2">{stat.label}</p>
                   </div>
                </motion.div>
              ))}
           </div>

           <div className="bg-white rounded-3xl p-8 shadow-sm border border-slate-100">
              <h3 className="text-xl font-bold text-slate-900 mb-8 flex items-center">
                 <Settings className="h-6 w-6 mr-3 text-primary" />
                 Account Settings
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                 <div className="space-y-4">
                    <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest pl-1">Personal Details</h4>
                    <div className="space-y-4">
                       <div>
                          <label className="block text-xs font-bold mb-1 text-slate-500 pl-1">Display Name</label>
                          <input type="text" value={user.name} readOnly className="w-full bg-slate-50 border border-slate-100 p-3 rounded-xl text-sm font-medium focus:ring-0 outline-none text-slate-400" />
                       </div>
                       <div>
                          <label className="block text-xs font-bold mb-1 text-slate-500 pl-1">Email</label>
                          <input type="text" value={user.email} readOnly className="w-full bg-slate-50 border border-slate-100 p-3 rounded-xl text-sm font-medium focus:ring-0 outline-none text-slate-400" />
                       </div>
                    </div>
                 </div>

                 <div className="space-y-4">
                    <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest pl-1">Security</h4>
                    <div className="space-y-4">
                       <button className="w-full text-left bg-slate-100 p-4 rounded-xl text-sm font-bold text-slate-700 hover:bg-slate-200 transition-all flex justify-between items-center group">
                          <span>Change Password</span>
                          <Settings className="h-4 w-4 text-slate-400 group-hover:rotate-90 transition-transform" />
                       </button>
                       <button className="w-full text-left bg-slate-100 p-4 rounded-xl text-sm font-bold text-slate-700 hover:bg-slate-200 transition-all flex justify-between items-center group">
                          <span>Privacy Settings</span>
                          <Settings className="h-4 w-4 text-slate-400 group-hover:rotate-90 transition-transform" />
                       </button>
                    </div>
                 </div>
              </div>

              <div className="mt-12 pt-8 border-t border-slate-50 flex justify-between items-center">
                 <p className="text-xs text-slate-400 font-medium">To update your academic credentials, contact the administration.</p>
                 <button className="bg-primary text-white px-8 py-3 rounded-xl font-bold hover:bg-secondary shadow-lg transition-all">Save Changes</button>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
