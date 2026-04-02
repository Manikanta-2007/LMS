import { useState, useEffect } from 'react';
import axios from 'axios';
import { useLocation, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Search, 
  Filter, 
  FileText, 
  Download, 
  User, 
  Tag, 
  BookOpen, 
  GraduationCap, 
  X,
  ChevronRight,
  Info
} from 'lucide-react';

const Catalog = () => {
  const [resources, setResources] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('');
  const [resourceType, setResourceType] = useState('');
  const [subject, setSubject] = useState('');
  const [showFilters, setShowFilters] = useState(false);

  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const querySearch = searchParams.get('search') || '';
  const queryCategory = searchParams.get('category') || '';

  useEffect(() => {
    setSearch(querySearch);
    setCategory(queryCategory);
    fetchResources(querySearch, queryCategory);
  }, [querySearch, queryCategory]);

  const fetchResources = async (s = search, c = category) => {
    setLoading(true);
    try {
      let url = `http://localhost:5000/api/resources?`;
      if (s) url += `search=${s}&`;
      if (c) url += `category=${c}&`;
      if (resourceType) url += `resourceType=${resourceType}&`;
      if (subject) url += `subject=${subject}&`;

      const res = await axios.get(url);
      setResources(res.data.data);
      setError(null);
    } catch (err) {
      console.error('Error fetching resources:', err);
      setError('Failed to load resources. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  const handleApplyFilters = (e) => {
    e.preventDefault();
    fetchResources();
    if (window.innerWidth < 768) setShowFilters(false);
  };

  const resetFilters = () => {
    setSearch('');
    setCategory('');
    setResourceType('');
    setSubject('');
    fetchResources('', '');
  };

  const categories = ['Engineering', 'Science', 'Mathematics', 'Computer Science', 'Arts', 'Business', 'Medicine'];
  const resourceTypes = ['Textbook', 'Research Paper', 'Study Guide', 'Notes', 'Question Bank'];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Resource Catalog</h1>
          <p className="text-slate-500 mt-1">Explore our collection of high-quality educational materials.</p>
        </div>
        <div className="flex items-center space-x-2">
          <button 
            onClick={() => setShowFilters(!showFilters)}
            className="md:hidden flex items-center space-x-2 bg-white border border-slate-200 px-4 py-2 rounded-lg text-sm font-medium hover:bg-slate-50"
          >
            <Filter className="h-4 w-4" />
            <span>Filters</span>
          </button>
          <div className="text-sm text-slate-500 font-medium">
            Found {resources.length} materials
          </div>
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-8">
        {/* sidebar Filters */}
        <aside className={`
          md:w-64 space-y-6 md:block
          ${showFilters ? 'fixed inset-0 z-50 bg-white p-6 overflow-y-auto' : 'hidden'}
        `}>
          <div className="flex items-center justify-between md:hidden mb-6">
             <h2 className="text-xl font-bold">Filters</h2>
             <button onClick={() => setShowFilters(false)}><X className="h-6 w-6" /></button>
          </div>

          <form onSubmit={handleApplyFilters} className="space-y-6">
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2">Search</label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                <input 
                  type="text" 
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Keyword..."
                  className="w-full pl-10 pr-4 py-2 bg-slate-100 border-none rounded-lg focus:ring-2 focus:ring-primary text-sm"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2">Category</label>
              <select 
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full bg-slate-100 border-none rounded-lg focus:ring-2 focus:ring-primary text-sm p-2"
              >
                <option value="">All Categories</option>
                {categories.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>

            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2">Resource Type</label>
              <div className="space-y-2">
                <option value="" className="hidden">All Types</option>
                {resourceTypes.map(type => (
                  <label key={type} className="flex items-center space-x-2 cursor-pointer group">
                    <input 
                      type="radio" 
                      name="resourceType" 
                      value={type}
                      checked={resourceType === type}
                      onChange={(e) => setResourceType(e.target.value)}
                      className="text-primary focus:ring-primary"
                    />
                    <span className="text-sm text-slate-600 group-hover:text-primary transition-colors">{type}</span>
                  </label>
                ))}
              </div>
            </div>

            <div className="pt-4 space-y-2">
              <button 
                type="submit"
                className="w-full bg-primary text-white py-2 rounded-lg font-bold text-sm hover:bg-secondary transition-all shadow-md"
              >
                Apply Filters
              </button>
              <button 
                type="button"
                onClick={resetFilters}
                className="w-full bg-slate-200 text-slate-700 py-2 rounded-lg font-bold text-sm hover:bg-slate-300 transition-all"
              >
                Reset All
              </button>
            </div>
          </form>

          {/* Featured subjects tag cloud */}
          <div className="pt-6 border-t border-slate-200">
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">Popular Subjects</h3>
            <div className="flex flex-wrap gap-2">
              {['Physics', 'Bio', 'History', 'AI', 'Algorithms'].map(s => (
                <button 
                  key={s}
                  onClick={() => { setSubject(s); fetchResources(); }}
                  className="bg-white border border-slate-200 px-3 py-1 rounded-full text-xs font-medium hover:bg-slate-50 transition-colors"
                >
                  {s}
                </button>
              ))}
            </div>
          </div>
        </aside>

        {/* Resource Grid */}
        <div className="flex-grow">
          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3, 4, 5, 6].map(i => (
                <div key={i} className="animate-pulse bg-white rounded-2xl h-80 shadow-sm border border-slate-100"></div>
              ))}
            </div>
          ) : error ? (
            <div className="text-center py-20 bg-white rounded-3xl shadow-sm border border-slate-100">
              <div className="bg-red-50 p-4 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                 <Info className="h-8 w-8 text-red-500" />
              </div>
              <h2 className="text-xl font-bold text-slate-900 mb-2">{error}</h2>
              <button onClick={() => fetchResources()} className="text-primary font-bold hover:underline">Try Again</button>
            </div>
          ) : resources.length === 0 ? (
            <div className="text-center py-20 bg-white rounded-3xl shadow-sm border border-slate-100">
              <div className="bg-slate-50 p-6 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-6">
                 <Search className="h-10 w-10 text-slate-300" />
              </div>
              <h2 className="text-2xl font-bold text-slate-900 mb-2">No Resources Found</h2>
              <p className="text-slate-500 mb-8 max-w-sm mx-auto">We couldn't find any materials matching your criteria. Try adjusting your search or filters.</p>
              <button onClick={resetFilters} className="bg-primary text-white px-8 py-3 rounded-xl font-bold hover:bg-secondary">View All Resources</button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              <AnimatePresence>
                {resources.map((resource) => (
                  <motion.div
                    layout
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    key={resource._id}
                    className="bg-white rounded-2xl p-5 shadow-sm border border-slate-200 flex flex-col group hover:shadow-xl hover:border-primary/20 transition-all duration-300 overflow-hidden relative"
                  >
                    <div className="absolute top-0 left-0 w-1.5 h-full bg-primary transform origin-bottom scale-y-0 group-hover:scale-y-100 transition-transform duration-300"></div>
                    
                    <div className="flex items-start justify-between mb-4">
                      <div className="p-3 bg-blue-50 rounded-xl text-primary group-hover:bg-primary group-hover:text-white transition-colors duration-300">
                         <FileText className="h-6 w-6" />
                      </div>
                      <span className="bg-slate-100 text-slate-600 text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded-md">
                        {resource.resourceType}
                      </span>
                    </div>

                    <h3 className="text-lg font-bold text-slate-900 group-hover:text-primary transition-colors mb-2 line-clamp-2 min-h-[3.5rem]">
                      {resource.title}
                    </h3>
                    
                    <div className="space-y-2 mb-6 flex-grow">
                      <div className="flex items-center text-xs text-slate-500 space-x-2">
                        <User className="h-3 w-3" />
                        <span>{resource.author}</span>
                      </div>
                      <div className="flex items-center text-xs text-slate-500 space-x-2">
                        <BookOpen className="h-3 w-3" />
                        <span>{resource.subject}</span>
                      </div>
                      <div className="flex items-center text-xs text-slate-500 space-x-2">
                        <Tag className="h-3 w-3" />
                        <span>{resource.category}</span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-4 border-t border-slate-100 mt-auto">
                      <div className="flex items-center text-xs text-slate-400 font-medium">
                        <Download className="h-3 w-3 mr-1" />
                        <span>{resource.downloadsCount} downloads</span>
                      </div>
                      <Link 
                        to={`/resource/${resource._id}`}
                        className="flex items-center space-x-1 text-primary font-bold text-sm hover:underline"
                      >
                        <span>View Details</span>
                        <ChevronRight className="h-4 w-4" />
                      </Link>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Catalog;
