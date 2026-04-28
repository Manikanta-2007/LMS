import { useState, useEffect } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import { 
  MessageSquare, 
  User, 
  FileText, 
  Star, 
  Calendar, 
  Trash2, 
  Search,
  MessageCircle,
  Filter,
  X
} from 'lucide-react';
import { toast } from 'react-toastify';
import { mockFeedback } from '../../utils/mockData';

const API = import.meta.env.VITE_API_URL || 'https://lms-2-9jwk.onrender.com';

const ViewFeedback = () => {
  const [feedback, setFeedback] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchFeedback();
  }, []);

  const fetchFeedback = async () => {
    try {
      const res = await axios.get(`${API}/api/feedback`);
      setFeedback(res.data.data);
    } catch (err) {
      toast.error('Backend unreachable. Showing offline demo data.');
      setFeedback(mockFeedback);
    } finally {
      setLoading(false);
    }
  };

  const filteredFeedback = feedback.filter(f => 
    f.message.toLowerCase().includes(searchTerm.toLowerCase()) ||
    f.userId?.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    f.resourceId?.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) return <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-primary mx-auto mt-20"></div>;

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-800 tracking-tight flex items-center space-x-3">
             <MessageCircle className="h-6 w-6 text-primary" />
             <span>Manager Portal: Feedback Center</span>
          </h2>
          <p className="text-slate-400 font-medium text-xs uppercase tracking-widest mt-1">Found {filteredFeedback.length} community reviews</p>
        </div>
      </div>

      <div className="bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden">
        <div className="p-6 border-b border-slate-50 flex flex-col md:flex-row md:items-center justify-between gap-4 bg-slate-50/50">
           <div className="relative flex-grow max-w-md group">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400 group-focus-within:text-primary transition-colors" />
              <input 
                type="text" 
                placeholder="Search feedback by content, user, or resource..."
                className="w-full pl-10 pr-4 py-2 border-none bg-white rounded-xl text-sm focus:ring-2 focus:ring-primary shadow-sm outline-none transition-all placeholder:text-slate-300"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
           </div>
           <div className="flex items-center space-x-2">
              <button className="flex items-center space-x-2 bg-white text-slate-600 px-4 py-2 rounded-xl border border-slate-200 text-xs font-bold uppercase tracking-wider hover:bg-slate-50 transition-all">
                 <Filter className="h-4 w-4" />
                 <span>High Ratings Only</span>
              </button>
           </div>
        </div>

        <div className="overflow-x-auto p-4">
          <table className="w-full text-left">
            <thead>
              <tr className="text-xs font-bold text-slate-400 uppercase tracking-widest bg-slate-50 border-b border-slate-100">
                <th className="py-4 px-6 rounded-l-xl">User & Resource</th>
                <th className="py-4 px-6">Rating</th>
                <th className="py-4 px-6">Review Content</th>
                <th className="py-4 px-6">Date</th>
                <th className="py-4 px-6 rounded-r-xl">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {filteredFeedback.length > 0 ? (
                filteredFeedback.map((item) => (
                  <motion.tr 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    key={item._id} 
                    className="hover:bg-slate-50/80 transition-all group"
                  >
                    <td className="py-5 px-6">
                      <div className="flex flex-col space-y-2">
                        <div className="flex items-center space-x-2">
                           <div className="p-1.5 bg-blue-50 text-primary rounded-md">
                              <User className="h-3 w-3" />
                           </div>
                           <span className="font-bold text-slate-800 text-xs">{item.userId?.name || 'Deleted Account'}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                           <div className="p-1.5 bg-slate-100 text-slate-500 rounded-md">
                              <FileText className="h-3 w-3" />
                           </div>
                           <span className="text-[11px] text-slate-500 italic max-w-[150px] truncate">{item.resourceId?.title || 'Resource ID: ' + item.resourceId}</span>
                        </div>
                      </div>
                    </td>
                    <td className="py-5 px-6">
                      <div className="flex space-x-0.5">
                        {[1, 2, 3, 4, 5].map(star => (
                           <Star 
                              key={star}
                              className={`h-3 w-3 ${star <= item.rating ? 'text-yellow-400 fill-yellow-400' : 'text-slate-200'}`} 
                           />
                        ))}
                      </div>
                    </td>
                    <td className="py-5 px-6">
                       <p className="text-xs text-slate-600 font-medium leading-relaxed max-w-sm line-clamp-2 italic">
                          "{item.message}"
                       </p>
                    </td>
                    <td className="py-5 px-6">
                       <div className="flex items-center text-[10px] text-slate-400 font-bold uppercase tracking-widest whitespace-nowrap">
                          <Calendar className="h-3 w-3 mr-1.5 opacity-50" />
                          <span>{new Date(item.createdAt).toLocaleDateString()}</span>
                       </div>
                    </td>
                    <td className="py-5 px-6">
                       <span className="bg-green-50 text-green-600 text-[10px] font-extrabold uppercase tracking-widest px-2 py-1 rounded-md">
                          Verified
                       </span>
                    </td>
                  </motion.tr>
                ))
              ) : (
                <tr>
                   <td colSpan="5" className="py-20 text-center">
                      <MessageSquare className="h-10 w-10 text-slate-200 mx-auto mb-4" />
                      <h3 className="text-xl font-bold text-slate-800 tracking-tight">No feedback found</h3>
                      <p className="text-slate-400 text-sm mt-1">Refine your search or check again later.</p>
                   </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ViewFeedback;
