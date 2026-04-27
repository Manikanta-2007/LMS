import { motion } from 'framer-motion';
import { Search, BookOpen, GraduationCap, Download, ShieldCheck, ArrowRight } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';

const Home = () => {
  const [search, setSearch] = useState('');
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (search.trim()) {
      navigate(`/catalog?search=${encodeURIComponent(search)}`);
    }
  };

  const features = [
    {
      icon: BookOpen,
      title: 'Diverse Resources',
      description: 'Access thousands of textbooks, research papers, and study guides in one place.'
    },
    {
      icon: GraduationCap,
      title: 'Academic Focus',
      description: 'Materials curated for students and educators across all major disciplines.'
    },
    {
      icon: Download,
      title: 'Easy Access',
      description: 'One-click downloads for PDFs and documents to study offline anytime.'
    },
    {
      icon: ShieldCheck,
      title: 'Verified Content',
      description: 'High-quality educational materials reviewed and uploaded by experts.'
    }
  ];

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="relative bg-primary py-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
          <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[60%] rounded-full bg-white blur-3xl"></div>
          <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[60%] rounded-full bg-white blur-3xl"></div>
        </div>
        
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center">
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl md:text-6xl"
            >
              Your Gateway to Academic <span className="text-blue-200">Excellence</span>
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="mt-6 max-w-2xl mx-auto text-xl text-blue-100"
            >
              Search and access thousands of educational materials, textbooks, and research papers carefully curated for your learning journey.
            </motion.p>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mt-10 max-w-xl mx-auto"
            >
              <form onSubmit={handleSearch} className="flex items-center bg-white rounded-full p-1 shadow-2xl">
                <div className="flex-grow flex items-center pl-4">
                  <Search className="h-5 w-5 text-slate-400" />
                  <input 
                    type="text" 
                    placeholder="Search by title, subject, or author..."
                    className="w-full px-4 py-3 text-slate-700 focus:outline-none placeholder:text-slate-400"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                  />
                </div>
                <button 
                  type="submit"
                  className="bg-secondary text-white px-8 py-3 rounded-full font-bold hover:bg-indigo-700 transition-all shadow-lg flex items-center space-x-2"
                >
                  <span>Search</span>
                </button>
              </form>
              <div className="mt-4 flex flex-wrap justify-center gap-2 text-sm text-blue-100">
                <span>Popular:</span>
                <Link to="/catalog?category=Engineering" className="hover:underline">Engineering</Link>
                <Link to="/catalog?category=Science" className="hover:underline">Science</Link>
                <Link to="/catalog?category=Mathematics" className="hover:underline">Mathematics</Link>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-academic-gray">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-slate-900 sm:text-4xl">Why Choose EduResource?</h2>
            <p className="mt-4 text-lg text-slate-600 max-w-2xl mx-auto">
              We provide the tools and resources you need to succeed in your academic pursuits.
            </p>
          </div>
          
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {features.map((feature, index) => (
              <motion.div 
                key={index}
                whileHover={{ y: -5 }}
                className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 flex flex-col items-center text-center transition-all hover:shadow-md"
              >
                <div className="bg-blue-50 p-4 rounded-xl mb-6">
                  <feature.icon className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">{feature.title}</h3>
                <p className="text-slate-600 leading-relaxed">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-primary rounded-3xl overflow-hidden shadow-2xl relative">
            <div className="absolute right-0 top-0 w-1/3 h-full bg-white/5 skew-x-12 transform origin-top-right"></div>
            <div className="px-8 py-12 md:px-16 md:py-20 flex flex-col md:flex-row items-center justify-between relative z-10">
              <div className="text-center md:text-left mb-8 md:mb-0">
                <h2 className="text-3xl font-bold text-white md:text-4xl mb-4">Start Learning Today</h2>
                <p className="text-blue-100 text-lg max-w-md">
                  Join thousands of students who are already using EduResource to reach their goals.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link 
                  to="/register" 
                  className="bg-white text-primary px-8 py-4 rounded-xl font-bold hover:bg-blue-50 flex items-center justify-center space-x-2 transition-all shadow-lg"
                >
                  <span>Create Free Account</span>
                  <ArrowRight className="h-5 w-5" />
                </Link>
                <Link 
                  to="/catalog" 
                  className="border border-white/30 text-white px-8 py-4 rounded-xl font-bold hover:bg-white/10 flex items-center justify-center transition-all bg-white/5"
                >
                  Browse Library
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
