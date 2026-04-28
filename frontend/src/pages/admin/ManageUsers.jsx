import { useState, useEffect } from 'react';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Users, 
  Search, 
  Trash2, 
  ShieldCheck, 
  ShieldAlert, 
  UserMinus, 
  UserPlus, 
  Filter, 
  Mail, 
  Calendar,
  X 
} from 'lucide-react';
import { toast } from 'react-toastify';

const API = import.meta.env.VITE_API_URL || 'https://lms-2-9jwk.onrender.com';

const ManageUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [showStatusModal, setShowStatusModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const res = await axios.get(`${API}/api/users`);
      setUsers(res.data.data);
    } catch (err) {
      toast.error('Failed to load users from backend.');
      setUsers([]);
    } finally {
      setLoading(false);
    }
  };

  const handleStatusUpdate = async () => {
    const newStatus = selectedUser.status === 'active' ? 'blocked' : 'active';
    try {
      await axios.patch(`${API}/api/users/${selectedUser._id}/status`, { status: newStatus });
      toast.success(`User successfully ${newStatus === 'active' ? 'unblocked' : 'blocked'}`);
      setUsers(users.map(u => u._id === selectedUser._id ? { ...u, status: newStatus } : u));
      setShowStatusModal(false);
    } catch (err) {
      toast.error('Failed to update user status');
    }
  };

  const deleteUser = async (id) => {
    if (window.confirm('This action will permanently delete the user account. Proceed?')) {
      try {
        await axios.delete(`${API}/api/users/${id}`);
        toast.success('User deleted successfully');
        setUsers(users.filter(u => u._id !== id));
      } catch (err) {
        toast.error('Failed to delete user');
      }
    }
  };

  const filteredUsers = users.filter(user => 
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) return <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-primary mx-auto mt-20"></div>;

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-800 tracking-tight flex items-center space-x-3">
             <Users className="h-6 w-6 text-primary" />
             <span>Manager Portal: Users</span>
          </h2>
          <p className="text-slate-400 font-medium text-xs uppercase tracking-widest mt-1">Found {filteredUsers.length} total members</p>
        </div>
      </div>

      <div className="bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden">
        <div className="p-6 border-b border-slate-50 flex flex-col md:flex-row md:items-center justify-between gap-4 bg-slate-50/50">
           <div className="relative flex-grow max-w-md group">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400 group-focus-within:text-primary transition-colors" />
              <input 
                type="text" 
                placeholder="Search by name or email..."
                className="w-full pl-10 pr-4 py-2 border-none bg-white rounded-xl text-sm focus:ring-2 focus:ring-primary shadow-sm outline-none transition-all placeholder:text-slate-300 shadow-slate-200/40"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
           </div>
           <div className="flex items-center space-x-2">
              <button className="flex items-center space-x-2 bg-white text-slate-600 px-4 py-2 rounded-xl border border-slate-200 text-xs font-bold uppercase tracking-wider hover:bg-slate-50 transition-all">
                 <Filter className="h-4 w-4" />
                 <span>By Status</span>
              </button>
           </div>
        </div>

        <div className="overflow-x-auto p-4">
          <table className="w-full text-left">
            <thead>
              <tr className="text-xs font-bold text-slate-400 uppercase tracking-widest bg-slate-50 border-b border-slate-100">
                <th className="py-4 px-6 rounded-l-xl">Member Info</th>
                <th className="py-4 px-6">Access Role</th>
                <th className="py-4 px-6">Joined Date</th>
                <th className="py-4 px-6">Current Status</th>
                <th className="py-4 px-6 rounded-r-xl">Operations</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              <AnimatePresence>
                {filteredUsers.map((user) => (
                  <motion.tr 
                    layout
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    key={user._id} 
                    className="hover:bg-slate-50/80 transition-all group"
                  >
                    <td className="py-5 px-6">
                      <div className="flex items-center space-x-3">
                         <div className="h-10 w-10 bg-primary/10 text-primary rounded-full flex items-center justify-center font-bold text-sm">
                            {user.name.charAt(0)}
                         </div>
                         <div className="flex flex-col">
                            <span className="font-bold text-slate-800 text-sm group-hover:text-primary transition-colors">{user.name}</span>
                            <div className="flex items-center text-[10px] text-slate-400 font-medium">
                               <Mail className="h-2.5 w-2.5 mr-1" />
                               <span>{user.email}</span>
                            </div>
                         </div>
                      </div>
                    </td>
                    <td className="py-5 px-6">
                       <span className={`text-[10px] font-extrabold uppercase tracking-widest px-2 py-1 rounded-md ${
                        user.role === 'admin' ? 'bg-indigo-100 text-indigo-600' : 'bg-slate-100 text-slate-600'
                       }`}>
                         {user.role}
                       </span>
                    </td>
                    <td className="py-5 px-6">
                       <div className="flex items-center text-xs text-slate-400 font-medium">
                          <Calendar className="h-3 w-3 mr-1" />
                          <span>{new Date(user.createdAt).toLocaleDateString()}</span>
                       </div>
                    </td>
                    <td className="py-5 px-6">
                       <span className={`flex items-center space-x-1.5 text-[10px] font-bold uppercase tracking-wider ${
                        user.status === 'active' ? 'text-green-600' : 'text-red-500'
                       }`}>
                          <div className={`h-1.5 w-1.5 rounded-full ${user.status === 'active' ? 'bg-green-600' : 'bg-red-500'}`}></div>
                          <span>{user.status}</span>
                       </span>
                    </td>
                    <td className="py-5 px-6">
                      <div className="flex items-center space-x-2">
                        <button 
                          onClick={() => { setSelectedUser(user); setShowStatusModal(true); }}
                          className={`p-2 transition-all rounded-lg border border-transparent shadow-sm hover:shadow-md ${
                            user.status === 'active' 
                            ? 'text-slate-400 hover:text-red-500 hover:bg-red-50 hover:border-red-100' 
                            : 'text-slate-400 hover:text-green-600 hover:bg-green-50 hover:border-green-100'
                          }`}
                          title={user.status === 'active' ? 'Block Access' : 'Unblock Access'}
                        >
                           {user.status === 'active' ? <UserMinus className="h-4 w-4" /> : <UserPlus className="h-4 w-4" />}
                        </button>
                        <button 
                          onClick={() => deleteUser(user._id)}
                          className="p-2 text-slate-400 hover:text-red-600 hover:bg-white rounded-lg shadow-sm border border-transparent hover:border-red-50 transition-all"
                          title="Purge Account"
                        >
                           <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                  </motion.tr>
                ))}
              </AnimatePresence>
            </tbody>
          </table>
        </div>
      </div>

      {/* Access Override Modal */}
      {showStatusModal && selectedUser && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm animate-in fade-in duration-300">
           <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white max-w-sm w-full rounded-3xl p-8 shadow-2xl space-y-6 border border-slate-100 overflow-hidden relative"
           >
              <div className={`absolute top-0 left-0 w-full h-1.5 ${selectedUser.status === 'active' ? 'bg-red-500' : 'bg-green-600'}`}></div>
              <div className="bg-slate-50 p-4 rounded-full w-16 h-16 flex items-center justify-center mx-auto transition-transform group hover:rotate-12">
                 {selectedUser.status === 'active' ? <ShieldAlert className="h-8 w-8 text-red-500" /> : <ShieldCheck className="h-8 w-8 text-green-600" />}
              </div>
              <div className="text-center">
                 <h3 className="text-xl font-bold text-slate-800">Administrator Override</h3>
                 <p className="text-slate-500 text-sm leading-relaxed mt-2 italic px-2">
                    Are you certain you want to <span className="font-bold">{selectedUser.status === 'active' ? 'Revoke Access' : 'Restore Access'}</span> for <span className="text-primary font-bold">{selectedUser.name}</span>?
                 </p>
              </div>
              <div className="flex space-x-3 mt-8">
                 <button 
                  onClick={() => setShowStatusModal(false)}
                  className="flex-grow bg-slate-100 text-slate-600 py-3 rounded-xl font-bold text-sm hover:bg-slate-200"
                 >
                    Abort Override
                 </button>
                 <button 
                  onClick={handleStatusUpdate}
                  className={`flex-grow text-white py-3 rounded-xl font-bold text-sm shadow-lg transition-all ${
                    selectedUser.status === 'active' ? 'bg-red-500 hover:bg-red-600' : 'bg-green-600 hover:bg-green-700'
                  }`}
                 >
                    Confirm Choice
                 </button>
              </div>
           </motion.div>
        </div>
      )}
    </div>
  );
};

export default ManageUsers;
