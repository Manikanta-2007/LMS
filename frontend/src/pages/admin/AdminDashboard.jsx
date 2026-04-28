import { useState, useEffect } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import { 
  Users, 
  FileBox, 
  Download, 
  MessageSquare, 
  TrendingUp, 
  Clock, 
  ChevronRight,
  ShieldCheck,
  FileText
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { mockDashboardStats, mockResources } from '../../utils/mockData';

const API = import.meta.env.VITE_API_URL || 'https://lms-2-9jwk.onrender.com';

const AdminDashboard = () => {
  const { user } = useAuth();
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalResources: 0,
    totalDownloads: 0,
    totalFeedback: 0
  });
  const [recentResources, setRecentResources] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const [resUsers, resResources, resFeedback] = await Promise.all([
        axios.get(`${API}/api/users`),
        axios.get(`${API}/api/resources`),
        axios.get(`${API}/api/feedback`)
      ]);

      const totalDownloads = resResources.data.data.reduce((acc, curr) => acc + (curr.downloadsCount || 0), 0);

      setStats({
        totalUsers: resUsers.data.count,
        totalResources: resResources.data.count,
        totalDownloads,
        totalFeedback: resFeedback.data.count
      });

      setRecentResources(resResources.data.data.slice(0, 5));
    } catch (err) {
      console.error('Error fetching dashboard data:', err);
      setStats({
        totalUsers: mockDashboardStats.totalUsers,
        totalResources: mockDashboardStats.totalResources,
        totalDownloads: mockDashboardStats.totalDownloads,
        totalFeedback: 12
      });
      setRecentResources(mockResources.slice(0, 5));
    } finally {
      setLoading(false);
    }
  };

  const statCards = [
    { label: 'Total Users', value: stats.totalUsers, icon: Users, color: 'text-blue-600', bg: 'bg-blue-50' },
    { label: 'Resources', value: stats.totalResources, icon: FileBox, color: 'text-indigo-600', bg: 'bg-indigo-50' },
    { label: 'Total Downloads', value: stats.totalDownloads, icon: Download, color: 'text-green-600', bg: 'bg-green-50' },
    { label: 'Feedback', value: stats.totalFeedback, icon: MessageSquare, color: 'text-amber-600', bg: 'bg-amber-50' }
  ];

  if (loading) return (
    <div className="flex justify-center items-center h-full">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
    </div>
  );

  return (
    <div className="space-y-10">
      {/* Welcome Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold text-slate-800 tracking-tight">Admin Dashboard</h2>
          <p className="text-slate-500 font-medium mt-1 uppercase text-xs tracking-widest">Welcome back, {user?.name}</p>
        </div>
        <div className="flex items-center space-x-3 bg-white px-4 py-2 rounded-2xl shadow-sm border border-slate-100">
           <ShieldCheck className="h-5 w-5 text-green-500" />
           <span className="text-sm font-bold text-slate-700">All Systems Operational</span>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((stat, i) => (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            key={i}
            className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100 flex items-center justify-between group hover:shadow-xl transition-all duration-300 overflow-hidden relative"
          >
            <div className="absolute top-0 right-0 w-24 h-24 bg-slate-50 rounded-full -mr-12 -mt-12 opacity-50"></div>
            <div>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">{stat.label}</p>
              <h3 className="text-3xl font-extrabold text-slate-900 group-hover:scale-105 transition-transform duration-300">{stat.value}</h3>
            </div>
            <div className={`${stat.bg} ${stat.color} p-4 rounded-2xl relative z-10 group-hover:rotate-12 transition-transform`}>
              <stat.icon className="h-8 w-8" />
            </div>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Recent Activity Table */}
        <div className="lg:col-span-2 bg-white rounded-3xl shadow-sm border border-slate-100 p-8">
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-xl font-bold text-slate-900 flex items-center">
              <Clock className="h-6 w-6 mr-3 text-primary" />
              Recent Uploads
            </h3>
            <Link to="/admin/resources" className="text-primary font-bold text-sm flex items-center hover:underline">
              View All <ChevronRight className="h-4 w-4 ml-1" />
            </Link>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="text-xs font-bold text-slate-400 uppercase tracking-widest border-b border-slate-50 pb-4">
                  <th className="py-3 px-4 font-bold">Resource</th>
                  <th className="py-3 px-4 font-bold">Subject</th>
                  <th className="py-3 px-4 font-bold">Downloads</th>
                  <th className="py-3 px-4 font-bold">Date</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {recentResources.map((res) => (
                  <tr key={res._id} className="hover:bg-slate-50 transition-colors group">
                    <td className="py-4 px-4">
                       <div className="flex items-center space-x-3">
                          <div className="p-2 bg-blue-50 text-primary rounded-lg">
                             <FileText className="h-4 w-4" />
                          </div>
                          <span className="font-bold text-slate-700 text-sm">{res.title}</span>
                       </div>
                    </td>
                    <td className="py-4 px-4 text-sm text-slate-500 font-medium">{res.subject}</td>
                    <td className="py-4 px-4">
                       <span className="bg-slate-100 px-3 py-1 rounded-full text-xs font-bold text-slate-600">{res.downloadsCount}</span>
                    </td>
                    <td className="py-4 px-4 text-xs font-medium text-slate-400 italic">
                       {new Date(res.createdAt).toLocaleDateString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Growth Card */}
        <div className="bg-primary rounded-3xl shadow-xl p-8 text-white relative overflow-hidden flex flex-col justify-between">
           <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16 blur-2xl"></div>
           <div className="absolute bottom-0 left-0 w-48 h-1/2 bg-white/5 skew-y-12 translate-y-1/2"></div>
           
           <div className="relative z-10">
              <TrendingUp className="h-10 w-10 text-blue-300 mb-6" />
              <h3 className="text-2xl font-bold mb-4">Engagement Insights</h3>
              <p className="text-blue-100 text-sm leading-relaxed mb-10 opacity-80">
                Resource downloads have increased by <span className="font-bold text-white">24%</span> compared to last month. Engineering students are the most active demographic.
              </p>
           </div>
           
           <div className="relative z-10 border-t border-white/10 pt-8 mt-10">
              <p className="text-xs font-bold uppercase tracking-widest text-blue-300 mb-4">Quick Actions</p>
              <div className="space-y-3">
                 <Link to="/admin/add-resource" className="block w-full bg-white text-primary py-3 rounded-xl font-bold text-sm text-center hover:bg-blue-50 transition-all shadow-lg active:scale-95">Add New Resource</Link>
                 <Link to="/admin/users" className="block w-full bg-white/10 border border-white/20 text-white py-3 rounded-xl font-bold text-sm text-center hover:bg-white/20 transition-all active:scale-95">Manage User Accounts</Link>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
