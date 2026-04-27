import { useState, useEffect } from 'react';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FileText, 
  Search, 
  Edit2, 
  Trash2, 
  Eye, 
  Download, 
  PlusCircle,
  Filter,
  X,
  ShieldAlert
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';

const ManageResources = () => {
  const [resources, setResources] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteId, setDeleteId] = useState(null);

  useEffect(() => {
    fetchResources();
  }, []);

  const fetchResources = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/resources');
      setResources(res.data.data);
    } catch (err) {
      toast.error('Failed to load resources');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:5000/api/resources/${deleteId}`);
      toast.success('Resource deleted successfully');
      setResources(resources.filter(r => r._id !== deleteId));
      setShowDeleteModal(false);
    } catch (err) {
      toast.error('Failed to delete resource');
    }
  };

  const filteredResources = resources.filter(res => 
    res.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    res.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
    res.subject.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) return <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-primary mx-auto mt-20"></div>;

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-800 tracking-tight flex items-center space-x-3">
             <FileText className="h-6 w-6 text-primary" />
             <span>Manager Portal: Resources</span>
          </h2>
          <p className="text-slate-400 font-medium text-xs uppercase tracking-widest mt-1">Found {filteredResources.length} educational materials</p>
        </div>
        <Link 
          to="/admin/add-resource"
          className="bg-primary text-white px-6 py-3 rounded-xl font-bold flex items-center space-x-2 hover:bg-secondary transition-all shadow-lg active:scale-95"
        >
          <PlusCircle className="h-5 w-5" />
          <span>Add New Entry</span>
        </Link>
      </div>

      <div className="bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden">
        <div className="p-6 border-b border-slate-50 flex items-center space-x-4 bg-slate-50/50">
           <div className="relative flex-grow max-w-md group">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400 group-focus-within:text-primary transition-colors" />
              <input 
                type="text" 
                placeholder="Search resources by title, author, or subject..."
                className="w-full pl-10 pr-4 py-2 border-none bg-white rounded-xl text-sm focus:ring-2 focus:ring-primary shadow-sm outline-none transition-all placeholder:text-slate-300"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
           </div>
           <button className="p-2 bg-white rounded-xl shadow-sm border border-slate-100 text-slate-400 hover:text-primary transition-colors">
              <Filter className="h-5 w-5" />
           </button>
        </div>

        <div className="overflow-x-auto p-4">
          <table className="w-full text-left">
            <thead>
              <tr className="text-xs font-bold text-slate-400 uppercase tracking-widest bg-slate-50 border-b border-slate-100">
                <th className="py-4 px-6 rounded-l-xl">Resource Info</th>
                <th className="py-4 px-6">Subject / Category</th>
                <th className="py-4 px-6">Type</th>
                <th className="py-4 px-6">Downloads</th>
                <th className="py-4 px-6 rounded-r-xl">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              <AnimatePresence>
                {filteredResources.length > 0 ? (
                  filteredResources.map((res) => (
                    <motion.tr 
                      layout
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      key={res._id} 
                      className="hover:bg-slate-50/80 transition-all group"
                    >
                      <td className="py-5 px-6">
                        <div className="flex flex-col">
                           <span className="font-bold text-slate-800 text-sm group-hover:text-primary transition-colors">{res.title}</span>
                           <span className="text-[10px] text-slate-400 italic">By {res.author} • Updated {new Date(res.createdAt).toLocaleDateString()}</span>
                        </div>
                      </td>
                      <td className="py-5 px-6">
                         <div className="flex flex-col">
                            <span className="text-sm font-bold text-slate-700">{res.subject}</span>
                            <span className="text-xs text-slate-400 mt-0.5">{res.category}</span>
                         </div>
                      </td>
                      <td className="py-5 px-6">
                         <span className="bg-blue-100 text-primary text-[10px] font-extrabold uppercase tracking-widest px-2 py-1 rounded-md">
                           {res.resourceType}
                         </span>
                      </td>
                      <td className="py-5 px-6">
                         <div className="flex items-center space-x-2">
                            <div className="w-24 bg-slate-100 h-2 rounded-full overflow-hidden">
                               <div className="bg-primary h-full rounded-full" style={{ width: `${Math.min(res.downloadsCount / 10, 100)}%` }}></div>
                            </div>
                            <span className="text-[10px] font-bold text-slate-400">{res.downloadsCount}</span>
                         </div>
                      </td>
                      <td className="py-5 px-6">
                        <div className="flex items-center space-x-2">
                          <Link to={`/resource/${res._id}`} className="p-2 text-slate-400 hover:text-primary transition-colors hover:bg-white rounded-lg shadow-sm border border-transparent hover:border-slate-100">
                            <Eye className="h-4 w-4" />
                          </Link>
                          <Link to={`/admin/edit-resource/${res._id}`} className="p-2 text-slate-400 hover:text-amber-500 transition-colors hover:bg-white rounded-lg shadow-sm border border-transparent hover:border-slate-100">
                            <Edit2 className="h-4 w-4" />
                          </Link>
                          <button 
                            onClick={() => { setDeleteId(res._id); setShowDeleteModal(true); }}
                            className="p-2 text-slate-400 hover:text-red-500 transition-colors hover:bg-white rounded-lg shadow-sm border border-transparent hover:border-slate-100"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      </td>
                    </motion.tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5" className="py-20 text-center">
                       <FileText className="h-10 w-10 text-slate-200 mx-auto mb-4" />
                       <h3 className="text-xl font-bold text-slate-800">No resources matched your search</h3>
                       <p className="text-slate-400 text-sm mt-1">Try broadening your keywords or check the system logs.</p>
                    </td>
                  </tr>
                )}
              </AnimatePresence>
            </tbody>
          </table>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm animate-in fade-in duration-300">
           <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white max-w-sm w-full rounded-3xl p-8 shadow-2xl space-y-6 border border-slate-100"
           >
              <div className="bg-red-50 p-4 rounded-full w-16 h-16 flex items-center justify-center mx-auto">
                 <ShieldAlert className="h-8 w-8 text-red-500" />
              </div>
              <div className="text-center">
                 <h3 className="text-xl font-bold text-slate-800">Confirm Removal</h3>
                 <p className="text-slate-500 text-sm leading-relaxed mt-2 italic px-2">"You are about to delete an educational resource from the permanent repository. This action is irreversible."</p>
              </div>
              <div className="flex space-x-3 mt-8">
                 <button 
                  onClick={() => setShowDeleteModal(false)}
                  className="flex-grow bg-slate-100 text-slate-600 py-3 rounded-xl font-bold text-sm hover:bg-slate-200"
                 >
                    Abort Action
                 </button>
                 <button 
                  onClick={handleDelete}
                  className="flex-grow bg-red-500 text-white py-3 rounded-xl font-bold text-sm hover:bg-red-600 shadow-lg shadow-red-200"
                 >
                    Confirm Deletion
                 </button>
              </div>
           </motion.div>
        </div>
      )}
    </div>
  );
};

export default ManageResources;
