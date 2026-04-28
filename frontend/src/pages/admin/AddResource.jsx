import { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  PlusCircle, 
  Upload, 
  ArrowLeft, 
  FileText, 
  Check,
  Hash,
  Book,
  User,
  Info,
  X,
  FileCheck
} from 'lucide-react';
import { toast } from 'react-toastify';

const API = import.meta.env.VITE_API_URL || 'https://lms-2-9jwk.onrender.com';

const AddResource = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEdit = !!id;

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    author: '',
    subject: '',
    category: '',
    tags: '',
    resourceType: 'Textbook'
  });
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(isEdit);

  useEffect(() => {
    if (isEdit) {
      fetchResource();
    }
  }, [id]);

  const fetchResource = async () => {
    try {
      const res = await axios.get(`${API}/api/resources/${id}`);
      const data = res.data.data;
      setFormData({
        title: data.title,
        description: data.description,
        author: data.author,
        subject: data.subject,
        category: data.category,
        tags: data.tags.join(', '),
        resourceType: data.resourceType
      });
    } catch (err) {
      toast.error('Failed to fetch resource details');
    } finally {
      setFetching(false);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const data = new FormData();
    Object.keys(formData).forEach(key => {
      if (key === 'tags') {
        data.append(key, formData[key].split(',').map(tag => tag.trim()));
      } else {
        data.append(key, formData[key]);
      }
    });

    if (file) {
      data.append('file', file);
    }

    try {
      if (isEdit) {
        await axios.put(`${API}/api/resources/${id}`, data);
        toast.success('Resource updated successfully');
      } else {
        await axios.post(`${API}/api/resources`, data);
        toast.success('Resource uploaded successfully');
      }
      navigate('/admin/resources');
    } catch (err) {
      toast.error(err.response?.data?.error || 'Failed to process resource');
    } finally {
      setLoading(false);
    }
  };

  const categories = ['Engineering', 'Science', 'Mathematics', 'Computer Science', 'Arts', 'Business', 'Medicine'];
  const resourceTypes = ['Textbook', 'Research Paper', 'Study Guide', 'Notes', 'Question Bank'];

  if (fetching) return <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-primary mx-auto mt-20"></div>;

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="flex items-center justify-between">
        <Link to="/admin/resources" className="flex items-center space-x-2 text-slate-400 hover:text-primary transition-colors font-bold text-sm group">
          <ArrowLeft className="h-4 w-4 group-hover:-translate-x-1 transition-transform" />
          <span>Back to Library</span>
        </Link>
        <div className="text-right">
          <h2 className="text-2xl font-bold text-slate-800 tracking-tight">{isEdit ? 'Edit Repository Entry' : 'New Resource Submission'}</h2>
          <p className="text-xs text-slate-400 uppercase font-bold tracking-widest mt-1">Role: Administrator</p>
        </div>
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-3xl shadow-xl border border-slate-100 overflow-hidden"
      >
        <div className="bg-primary p-6 text-white flex items-center justify-between">
           <div className="flex items-center space-x-3">
              <div className="bg-white/20 p-2 rounded-lg">
                 {isEdit ? <FileCheck className="h-6 w-6" /> : <PlusCircle className="h-6 w-6" />}
              </div>
              <span className="font-bold tracking-wide uppercase text-sm">{isEdit ? 'Resource Update Protocol' : 'Resource Inclusion Protocol'}</span>
           </div>
        </div>

        <form onSubmit={handleSubmit} className="p-10 space-y-8">
          {/* Main Info */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-4">
               <div>
                  <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2 flex items-center">
                    <FileText className="h-3 w-3 mr-2" />
                    Resource Title
                  </label>
                  <input 
                    type="text" 
                    name="title"
                    required
                    value={formData.title}
                    onChange={handleChange}
                    className="w-full bg-slate-50 border border-slate-100 p-3 rounded-xl focus:ring-2 focus:ring-primary outline-none transition-all text-sm font-medium"
                    placeholder="e.g. Advanced Quantum Mechanics"
                  />
               </div>
               <div>
                  <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2 flex items-center">
                    <User className="h-3 w-3 mr-2" />
                    Primary Author
                  </label>
                  <input 
                    type="text" 
                    name="author"
                    required
                    value={formData.author}
                    onChange={handleChange}
                    className="w-full bg-slate-50 border border-slate-100 p-3 rounded-xl focus:ring-2 focus:ring-primary outline-none transition-all text-sm font-medium"
                    placeholder="e.g. Dr. Richard Feynman"
                  />
               </div>
               <div>
                  <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2 flex items-center">
                    <Book className="h-3 w-3 mr-2" />
                    Academic Subject
                  </label>
                  <input 
                    type="text" 
                    name="subject"
                    required
                    value={formData.subject}
                    onChange={handleChange}
                    className="w-full bg-slate-50 border border-slate-100 p-3 rounded-xl focus:ring-2 focus:ring-primary outline-none transition-all text-sm font-medium"
                    placeholder="e.g. Physics"
                  />
               </div>
            </div>

            <div className="space-y-4">
               <div>
                  <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Category Discipline</label>
                  <select 
                    name="category"
                    required
                    value={formData.category}
                    onChange={handleChange}
                    className="w-full bg-slate-50 border border-slate-100 p-3 rounded-xl focus:ring-2 focus:ring-primary outline-none transition-all text-sm font-medium"
                  >
                    <option value="">Select Category</option>
                    {categories.map(c => <option key={c} value={c}>{c}</option>)}
                  </select>
               </div>
               <div>
                  <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Material Type</label>
                  <select 
                    name="resourceType"
                    required
                    value={formData.resourceType}
                    onChange={handleChange}
                    className="w-full bg-slate-50 border border-slate-100 p-3 rounded-xl focus:ring-2 focus:ring-primary outline-none transition-all text-sm font-medium"
                  >
                    {resourceTypes.map(t => <option key={t} value={t}>{t}</option>)}
                  </select>
               </div>
               <div>
                  <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2 flex items-center">
                    <Hash className="h-3 w-3 mr-2" />
                    Keywords (comma separated)
                  </label>
                  <input 
                    type="text" 
                    name="tags"
                    value={formData.tags}
                    onChange={handleChange}
                    className="w-full bg-slate-50 border border-slate-100 p-3 rounded-xl focus:ring-2 focus:ring-primary outline-none transition-all text-sm font-medium"
                    placeholder="e.g. quantum, physics, theory"
                  />
               </div>
            </div>
          </div>

          <div>
             <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2 flex items-center">
                <Info className="h-3 w-3 mr-2" />
                Descriptive Overview
             </label>
             <textarea 
               name="description"
               required
               value={formData.description}
               onChange={handleChange}
               className="w-full bg-slate-50 border border-slate-100 p-4 rounded-xl focus:ring-2 focus:ring-primary outline-none transition-all text-sm font-medium min-h-[120px]"
               placeholder="Provide a detailed summary of the educational content..."
             ></textarea>
          </div>

          <div className="pt-4">
             <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">Final Asset Upload</label>
             <div className="relative group">
                <input 
                  type="file" 
                  onChange={handleFileChange}
                  required={!isEdit}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-20"
                />
                <div className={`
                  w-full border-2 border-dashed rounded-3xl p-10 text-center flex flex-col items-center justify-center transition-all duration-300
                  ${file ? 'bg-primary/5 border-primary shadow-inner' : 'border-slate-200 hover:border-primary/40 hover:bg-slate-50 bg-white shadow-sm'}
                `}>
                   {file ? (
                      <div className="animate-in zoom-in duration-300 flex flex-col items-center">
                         <div className="p-4 bg-primary text-white rounded-2xl mb-4 shadow-lg shadow-primary/30">
                            <Check className="h-8 w-8" />
                         </div>
                         <p className="text-lg font-bold text-slate-800">{file.name}</p>
                         <p className="text-xs text-slate-400 mt-1 uppercase font-bold tracking-widest">({(file.size / 1024 / 1024).toFixed(2)} MB)</p>
                         <button type="button" onClick={() => setFile(null)} className="mt-4 text-xs font-bold text-red-500 hover:underline">Change File</button>
                      </div>
                   ) : (
                      <>
                         <div className="p-4 bg-slate-100 text-slate-400 rounded-2xl mb-4 group-hover:scale-110 transition-transform">
                            <Upload className="h-8 w-8" />
                         </div>
                         <p className="text-slate-700 font-bold">Drop PDF or Documents here</p>
                         <p className="text-xs text-slate-400 mt-2 max-w-xs mx-auto">Max file size 20MB. Supported formats: PDF, DOCX, TXT, ZIP.</p>
                      </>
                   )}
                </div>
             </div>
          </div>

          <div className="pt-8 border-t border-slate-50 flex items-center justify-between">
             <div className="text-xs text-slate-400 italic">
                {isEdit ? '* Leave file empty if you want to keep the existing document' : '* All fields are required for new submissions'}
             </div>
             <button 
                type="submit"
                disabled={loading}
                className="bg-primary text-white px-12 py-4 rounded-2xl font-bold flex items-center space-x-3 hover:bg-secondary transition-all shadow-xl shadow-primary/20 active:scale-95 disabled:opacity-50"
             >
                {loading ? (
                   <div className="h-5 w-5 border-2 border-white border-t-transparent animate-spin rounded-full"></div>
                ) : (
                   <>
                      <span>{isEdit ? 'Authorize Update' : 'Finalize Submission'}</span>
                      <PlusCircle className="h-5 w-5" />
                   </>
                )}
             </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
};

export default AddResource;
