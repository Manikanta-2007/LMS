import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { motion } from 'framer-motion';
import { 
  Download, 
  User, 
  BookOpen, 
  Calendar, 
  MessageSquare, 
  Star, 
  ArrowLeft,
  FileText,
  Info,
  ExternalLink,
  ShieldAlert
} from 'lucide-react';
import { toast } from 'react-toastify';

const ResourceDetails = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const [resource, setResource] = useState(null);
  const [feedback, setFeedback] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    fetchResource();
    fetchFeedback();
  }, [id]);

  const fetchResource = async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/resources/${id}`);
      setResource(res.data.data);
    } catch (err) {
      setError('Resource not found');
    } finally {
      setLoading(false);
    }
  };

  const fetchFeedback = async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/feedback/resource/${id}`);
      setFeedback(res.data.data);
    } catch (err) {
      console.error('Error fetching feedback:', err);
    }
  };

  const handleDownload = async () => {
    try {
      window.open(`${import.meta.env.VITE_API_URL}/api/resources/${id}/download`, '_blank');
      toast.success('Download started!');
      // Update local state for immediate feedback
      setResource(prev => ({ ...prev, downloadsCount: prev.downloadsCount + 1 }));
    } catch (err) {
      toast.error('Download failed');
    }
  };

  const handleFeedbackSubmit = async (e) => {
    e.preventDefault();
    if (!user) {
      toast.error('Please login to leave feedback');
      return;
    }
    setSubmitting(true);
    try {
      await axios.post(import.meta.env.VITE_API_URL + '/api/feedback', {
        resourceId: id,
        rating,
        message: comment
      });
      toast.success('Feedback submitted!');
      setComment('');
      setRating(5);
      fetchFeedback();
    } catch (err) {
      toast.error('Failed to submit feedback');
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) return (
    <div className="flex justify-center items-center h-screen">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
    </div>
  );

  if (error || !resource) return (
    <div className="max-w-7xl mx-auto px-4 py-20 text-center">
      <ShieldAlert className="h-20 w-20 text-red-500 mx-auto mb-6" />
      <h1 className="text-3xl font-bold text-slate-900 mb-4">{error || 'Resource Not Found'}</h1>
      <Link to="/catalog" className="text-primary font-bold hover:underline">Back to Catalog</Link>
    </div>
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <Link to="/catalog" className="inline-flex items-center text-sm font-bold text-slate-500 hover:text-primary transition-colors mb-8 group">
        <ArrowLeft className="h-4 w-4 mr-2 group-hover:-translate-x-1 transition-transform" />
        <span>Back to Catalog</span>
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        {/* Left: Main details */}
        <div className="lg:col-span-2 space-y-8">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-3xl p-8 shadow-sm border border-slate-100"
          >
            <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
              <span className="bg-blue-100 text-primary text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full">
                {resource.resourceType}
              </span>
              <div className="flex items-center text-slate-400 text-xs font-medium italic">
                <Calendar className="h-3 w-3 mr-1" />
                <span>Uploaded on {new Date(resource.createdAt).toLocaleDateString()}</span>
              </div>
            </div>

            <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6 leading-tight">
              {resource.title}
            </h1>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8 text-sm">
              <div className="flex items-center space-x-3 p-4 bg-slate-50 rounded-2xl">
                <div className="p-2 bg-white rounded-lg shadow-sm text-primary">
                   <User className="h-5 w-5" />
                </div>
                <div>
                   <p className="text-slate-400 font-medium uppercase text-[10px] tracking-wider leading-none">Author</p>
                   <p className="text-slate-800 font-bold mt-1 text-base">{resource.author}</p>
                </div>
              </div>
              <div className="flex items-center space-x-3 p-4 bg-slate-50 rounded-2xl">
                <div className="p-2 bg-white rounded-lg shadow-sm text-primary">
                   <BookOpen className="h-5 w-5" />
                </div>
                <div>
                   <p className="text-slate-400 font-medium uppercase text-[10px] tracking-wider leading-none">Subject</p>
                   <p className="text-slate-800 font-bold mt-1 text-base">{resource.subject}</p>
                </div>
              </div>
            </div>

            <div className="prose prose-slate max-w-none mb-10">
              <h3 className="text-xl font-bold text-slate-900 mb-4 flex items-center">
                <Info className="h-5 w-5 mr-2 text-primary" />
                Description
              </h3>
              <p className="text-slate-600 leading-relaxed">
                {resource.description}
              </p>
            </div>

            <div className="flex flex-wrap gap-2 mb-10">
              {resource.tags.map((tag, i) => (
                <span key={i} className="bg-slate-100 text-slate-600 text-xs font-medium px-4 py-2 rounded-lg border border-slate-200">
                  #{tag}
                </span>
              ))}
            </div>

            <div className="p-6 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-6 mt-10">
               <div className="text-center sm:text-left">
                  <p className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-1">Impact</p>
                  <p className="text-2xl font-bold text-slate-900">{resource.downloadsCount} Successful Downloads</p>
               </div>
               <button 
                  onClick={handleDownload}
                  className="w-full sm:w-auto bg-primary text-white px-10 py-4 rounded-2xl font-bold hover:bg-secondary transition-all shadow-xl flex items-center justify-center space-x-3 hover:-translate-y-1"
               >
                  <Download className="h-5 w-5" />
                  <span>Download Resource</span>
               </button>
            </div>
          </motion.div>

          {/* Feedback Section */}
          <div className="bg-white rounded-3xl p-8 shadow-sm border border-slate-100">
            <h3 className="text-2xl font-bold text-slate-900 mb-8 flex items-center">
              <MessageSquare className="h-6 w-6 mr-3 text-primary" />
              Community Reviews
            </h3>

            {/* Form */}
            {user ? (
               <div className="bg-slate-50 p-6 rounded-2xl mb-10">
                  <h4 className="text-lg font-bold text-slate-900 mb-4">Leave a Feedback</h4>
                  <form onSubmit={handleFeedbackSubmit} className="space-y-4">
                     <div className="flex items-center space-x-4 mb-4">
                        <span className="text-sm font-bold text-slate-700">Rating:</span>
                        <div className="flex space-x-1">
                           {[1, 2, 3, 4, 5].map(star => (
                              <button
                                 key={star}
                                 type="button"
                                 onClick={() => setRating(star)}
                                 className="transition-transform active:scale-90"
                              >
                                 <Star 
                                    className={`h-6 w-6 ${star <= rating ? 'text-yellow-400 fill-yellow-400' : 'text-slate-300'}`} 
                                 />
                              </button>
                           ))}
                        </div>
                     </div>
                     <textarea 
                        className="w-full p-4 rounded-xl border border-slate-200 focus:ring-2 focus:ring-primary focus:border-transparent min-h-[120px] transition-all"
                        placeholder="Share your experience with this resource..."
                        required
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                     ></textarea>
                     <button 
                        type="submit"
                        disabled={submitting}
                        className="bg-primary text-white px-8 py-3 rounded-xl font-bold hover:bg-secondary transition-all disabled:opacity-50 flex items-center space-x-2"
                     >
                        {submitting ? 'Submitting...' : 'Submit Review'}
                     </button>
                  </form>
               </div>
            ) : (
               <div className="p-6 bg-blue-50 border border-blue-100 rounded-2xl text-center mb-10">
                  <p className="text-slate-600 font-medium mb-4">You need to be logged in to leave feedback.</p>
                  <Link to="/login" className="text-primary font-bold hover:underline">Login to my account</Link>
               </div>
            )}

            {/* List */}
            <div className="space-y-6">
               {feedback.length === 0 ? (
                  <div className="text-center py-10">
                     <p className="text-slate-400 font-medium">No reviews yet. Be the first to share your thoughts!</p>
                  </div>
               ) : (
                  feedback.map((item) => (
                     <div key={item._id} className="border-b border-slate-50 pb-6 last:border-b-0">
                        <div className="flex items-start justify-between mb-2">
                           <div className="flex items-center space-x-3">
                              <div className="bg-primary/10 text-primary w-10 h-10 rounded-full flex items-center justify-center font-bold">
                                 {item.userId.name.charAt(0)}
                              </div>
                              <div>
                                 <p className="text-sm font-bold text-slate-800">{item.userId.name}</p>
                                 <p className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">
                                    {item.userId.role} • {new Date(item.createdAt).toLocaleDateString()}
                                 </p>
                              </div>
                           </div>
                           <div className="flex">
                              {[1, 2, 3, 4, 5].map(star => (
                                 <Star 
                                    key={star}
                                    className={`h-3 w-3 ${star <= item.rating ? 'text-yellow-400 fill-yellow-400' : 'text-slate-200'}`} 
                                 />
                              ))}
                           </div>
                        </div>
                        <p className="text-slate-600 text-sm italic leading-relaxed">
                           "{item.message}"
                        </p>
                     </div>
                  ))
               )}
            </div>
          </div>
        </div>

        {/* Right: Summary sidebar */}
        <div className="lg:col-span-1 space-y-6">
           <div className="bg-white rounded-3xl p-8 shadow-sm border border-slate-100 flex flex-col items-center text-center">
              <div className="w-24 h-24 bg-primary/5 rounded-3xl flex items-center justify-center mb-6">
                 <FileText className="h-12 w-12 text-primary" />
              </div>
              <h4 className="text-lg font-bold text-slate-900 mb-2">Academic Identity</h4>
              <p className="text-sm text-slate-500 mb-6">Internal Library Code: PS28-{resource._id.slice(-6).toUpperCase()}</p>
              
              <div className="w-full space-y-4 text-sm font-medium">
                 <div className="flex justify-between py-3 border-b border-slate-50">
                    <span className="text-slate-400">File Type</span>
                    <span className="text-slate-800">Portable Document (PDF)</span>
                 </div>
                 <div className="flex justify-between py-3 border-b border-slate-50">
                    <span className="text-slate-400">Category</span>
                    <span className="text-slate-800">{resource.category}</span>
                 </div>
                 <div className="flex justify-between py-3">
                    <span className="text-slate-400">Copyright</span>
                    <span className="text-slate-800">Academic License</span>
                 </div>
              </div>
           </div>

           <div className="bg-slate-900 rounded-3xl p-8 text-white shadow-xl">
              <h4 className="font-bold mb-4 flex items-center">
                <ShieldAlert className="h-5 w-5 mr-2 text-blue-400" />
                Fair Use Notice
              </h4>
              <p className="text-xs text-blue-200 leading-relaxed">
                This document is provided for educational and research purposes only. Redistributing this material for commercial purposes is strictly prohibited without prior permission from the author.
              </p>
              <button className="mt-8 w-full border border-white/20 py-3 rounded-xl hover:bg-white/10 transition-all text-xs font-bold uppercase tracking-wider">
                 Report Content
              </button>
           </div>
        </div>
      </div>
    </div>
  );
};

export default ResourceDetails;
