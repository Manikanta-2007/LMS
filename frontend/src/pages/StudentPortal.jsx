import { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { motion } from 'framer-motion';
import pqPdf from '../assets/priority-queues.pdf';
import depqPdf from '../assets/double-ended-priority-queues.pdf';
import impDepqPdf from '../assets/implementation-depq.pdf';
import { BookOpen, Download, FileText, ChevronRight, GraduationCap } from 'lucide-react';
import { toast } from 'react-toastify';
import { mockResources } from '../utils/mockData';

const API = import.meta.env.VITE_API_URL || 'https://lms-2-9jwk.onrender.com';

const StudentPortal = () => {
  const { user } = useAuth();
  const [resources, setResources] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchResources();
  }, []);

  const fetchResources = async () => {
    try {
      const res = await axios.get(`${API}/api/resources`);
      // For student portal, we might just want to show recent resources or all of them.
      setResources(res.data.data);
    } catch (err) {
      console.error('Error fetching resources:', err);
      setError('Backend unreachable. Showing offline demo data.');
      setResources(mockResources);
    } finally {
      setLoading(false);
    }
  };

  const handleDownload = async (id, title) => {
    try {
      window.open(`${API}/api/resources/${id}/download`, '_blank');
      toast.success(`Downloading ${title}...`);
      // Update local state for immediate feedback
      setResources(prev => 
        prev.map(res => 
          res._id === id ? { ...res, downloadsCount: res.downloadsCount + 1 } : res
        )
      );
    } catch (err) {
      toast.error('Download failed');
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="bg-primary rounded-3xl p-8 mb-10 text-white shadow-xl flex flex-col md:flex-row items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold mb-2 flex items-center">
            <GraduationCap className="h-8 w-8 mr-3" />
            Student Portal
          </h1>
          <p className="text-blue-100 italic">Welcome back, {user?.name}! Here are the resources available for you.</p>
        </div>
        <div className="mt-6 md:mt-0 bg-white/10 p-4 rounded-xl border border-white/20 text-center min-w-[200px]">
          <p className="text-sm font-medium uppercase tracking-widest text-blue-200">Available Materials</p>
          <p className="text-3xl font-bold">{resources.length}</p>
        </div>
      </div>

      {/* Featured Quick Resources */}
      <div className="mb-10">
        <h2 className="text-xl font-bold text-slate-900 mb-4 flex items-center">
          <FileText className="h-6 w-6 mr-2 text-primary" />
          Featured Notes
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            { title: 'Priority Queues', file: pqPdf },
            { title: 'Double Ended Priority Queues', file: depqPdf },
            { title: 'Implementation of DEPQ', file: impDepqPdf },
          ].map((item, idx) => (
            <a 
              key={idx} 
              href={item.file} 
              target="_blank" 
              rel="noreferrer"
              className="bg-blue-50 border border-blue-100 p-4 rounded-xl flex items-center justify-between hover:bg-blue-100 hover:border-blue-200 transition-colors group"
            >
              <div className="flex items-center">
                <div className="bg-white p-2 rounded-lg text-primary shadow-sm mr-3">
                  <FileText className="h-5 w-5" />
                </div>
                <span className="font-bold text-sm text-slate-800 group-hover:text-primary transition-colors">{item.title}</span>
              </div>
              <Download className="h-4 w-4 text-slate-400 group-hover:text-primary" />
            </a>
          ))}
        </div>
      </div>

      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3].map(i => (
            <div key={i} className="animate-pulse bg-white rounded-2xl h-64 shadow-sm border border-slate-100"></div>
          ))}
        </div>
      ) : error ? (
        <div className="text-center py-20 bg-white rounded-3xl shadow-sm border border-slate-100 text-red-500 font-bold">
          {error}
        </div>
      ) : resources.length === 0 ? (
        <div className="text-center py-20 bg-white rounded-3xl shadow-sm border border-slate-100">
          <BookOpen className="h-12 w-12 text-slate-300 mx-auto mb-4" />
          <h2 className="text-xl font-bold text-slate-900 mb-2">No Resources Found</h2>
          <p className="text-slate-500">Check back later for new materials.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {resources.map((resource) => (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              key={resource._id}
              className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200 flex flex-col group hover:shadow-xl hover:border-primary/30 transition-all duration-300 relative overflow-hidden"
            >
               <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                  <FileText className="h-20 w-20 text-primary" />
               </div>
               
               <div className="relative z-10 flex-grow">
                  <span className="bg-blue-50 text-primary text-xs font-bold uppercase tracking-wider px-2 py-1 rounded-md mb-4 inline-block">
                     {resource.resourceType}
                  </span>
                  <h3 className="text-xl font-bold text-slate-900 mb-2 line-clamp-2">
                     {resource.title}
                  </h3>
                  <p className="text-sm text-slate-500 mb-4 line-clamp-3">
                     {resource.description}
                  </p>
               </div>

               <div className="relative z-10 pt-4 border-t border-slate-100 mt-4 flex items-center justify-between gap-2">
                  <Link 
                     to={`/resource/${resource._id}`}
                     className="flex-1 bg-slate-50 text-slate-700 py-2 rounded-xl text-sm font-bold text-center hover:bg-slate-100 transition-colors border border-slate-200"
                  >
                     View Details
                  </Link>
                  <button 
                     onClick={() => handleDownload(resource._id, resource.title)}
                     className="flex-1 bg-primary text-white py-2 rounded-xl text-sm font-bold flex items-center justify-center space-x-1 hover:bg-secondary transition-colors shadow-md hover:-translate-y-0.5"
                  >
                     <Download className="h-4 w-4" />
                     <span>Download</span>
                  </button>
               </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
};

export default StudentPortal;
