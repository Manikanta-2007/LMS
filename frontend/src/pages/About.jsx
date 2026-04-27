import { motion } from 'framer-motion';
import { BookOpen, Users, Target, ShieldCheck, Mail, MapPin, Phone } from 'lucide-react';

const About = () => {
  const stats = [
    { label: 'Resources', value: '10K+' },
    { label: 'Active Users', value: '5K+' },
    { label: 'Downloads', value: '50K+' },
    { label: 'Feedback', value: '2K+' },
  ];

  const team = [
    { name: 'Dr. Sarah Connor', role: 'Chief Librarian', image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop' },
    { name: 'Prof. Mark Davis', role: 'Academic Coordinator', image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop' },
    { name: 'Elena Rodriguez', role: 'Resource Manager', image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop' },
  ];

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="bg-slate-900 py-24 px-4 text-center relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-primary/20 -skew-x-12 translate-x-1/2"></div>
        <div className="max-w-4xl mx-auto relative z-10">
          <motion.h1 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-4xl md:text-5xl font-extrabold text-white mb-6"
          >
            Empowering Education Through <span className="text-secondary text-blue-400">Knowledge Sharing</span>
          </motion.h1>
          <p className="text-xl text-slate-400 leading-relaxed max-w-2xl mx-auto">
            EduResource Library is a collaborative platform dedicated to centralizing academic materials for students and educators globally.
          </p>
        </div>
      </section>

      {/* Stats Section */}
      <section className="-mt-12 max-w-5xl mx-auto px-4 relative z-20">
        <div className="bg-white rounded-3xl shadow-2xl p-8 grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, i) => (
            <div key={i} className="text-center group">
              <p className="text-3xl font-extrabold text-primary group-hover:scale-110 transition-transform duration-300">{stat.value}</p>
              <p className="text-sm font-bold text-slate-400 uppercase tracking-widest mt-1">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Content Section */}
      <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <div>
            <div className="inline-flex items-center space-x-2 bg-blue-50 text-primary px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider mb-6">
               <Target className="h-4 w-4" />
               <span>Our Mission</span>
            </div>
            <h2 className="text-3xl font-bold text-slate-900 mb-6 sm:text-4xl leading-tight">
              Bridging the gap between students and quality educational resources.
            </h2>
            <p className="text-lg text-slate-600 mb-8 leading-relaxed">
              We believe that access to education is a fundamental right. Our platform is designed to break down barriers to learning by providing a centralized repository for high-quality, peer-reviewed materials that are easy to find and completely free to use.
            </p>
            <div className="space-y-4">
              <div className="flex items-start space-x-4">
                 <div className="bg-slate-100 p-2 rounded-lg text-primary mt-1">
                    <ShieldCheck className="h-5 w-5" />
                 </div>
                 <div>
                    <h4 className="font-bold text-slate-900">Open Access</h4>
                    <p className="text-sm text-slate-500">Free materials for everyone, everywhere.</p>
                 </div>
              </div>
              <div className="flex items-start space-x-4">
                 <div className="bg-slate-100 p-2 rounded-lg text-primary mt-1">
                    <BookOpen className="h-5 w-5" />
                 </div>
                 <div>
                    <h4 className="font-bold text-slate-900">Curated Quality</h4>
                    <p className="text-sm text-slate-500">Every resource is reviewed before being published.</p>
                 </div>
              </div>
            </div>
          </div>
          <div className="relative">
            <div className="bg-primary/5 absolute inset-0 -skew-y-3 rounded-3xl translate-x-4 translate-y-4"></div>
            <img 
              src="https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=800&h=600&fit=crop" 
              alt="Students Studying" 
              className="relative z-10 rounded-3xl shadow-2xl grayscale hover:grayscale-0 transition-all duration-700"
            />
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-24 bg-academic-gray">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
           <div className="text-center mb-16">
              <h2 className="text-3xl font-bold text-slate-900 sm:text-4xl mb-4">Meet the Visionaries</h2>
              <p className="text-slate-500 max-w-xl mx-auto">Behind every great resource is a team of dedicated educators and librarians working to make knowledge accessible.</p>
           </div>
           <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
              {team.map((member, i) => (
                <div key={i} className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 text-center overflow-hidden">
                   <div className="relative mb-6 inline-block">
                      <div className="absolute inset-0 bg-primary/20 rounded-full blur-xl animate-pulse"></div>
                      <img src={member.image} alt={member.name} className="relative z-10 w-32 h-32 rounded-full mx-auto object-cover border-4 border-white shadow-lg" />
                   </div>
                   <h3 className="text-xl font-bold text-slate-900 leading-tight">{member.name}</h3>
                   <p className="text-primary font-bold text-sm tracking-wide mt-1">{member.role}</p>
                </div>
              ))}
           </div>
        </div>
      </section>

      {/* Contact Simple Section */}
      <section className="py-24 max-w-5xl mx-auto px-4">
         <div className="bg-white rounded-3xl shadow-lg border border-slate-100 overflow-hidden flex flex-col md:flex-row">
            <div className="bg-primary p-12 text-white md:w-2/5">
               <h3 className="text-2xl font-bold mb-8">Contact Info</h3>
               <div className="space-y-6">
                  <div className="flex items-center space-x-4">
                     <Phone className="h-5 w-5 text-blue-300" />
                     <span className="text-sm">+91 987654321</span>
                  </div>
                  <div className="flex items-center space-x-4">
                     <Mail className="h-5 w-5 text-blue-300" />
                     <span className="text-sm"><a href="mailto:bollumanikana16@gmail.com" className="hover:underline">bollumanikana16@gmail.com</a></span>
                  </div>
                  <div className="flex items-center space-x-4">
                     <MapPin className="h-5 w-5 text-blue-300" />
                     <span className="text-sm">KL University</span>
                  </div>
               </div>
            </div>
            <div className="p-12 md:w-3/5">
                <h3 className="text-2xl font-bold text-slate-900 mb-8 leading-tight">Got questions? <br/> We're here to help.</h3>
                <p className="text-slate-500 mb-8 leading-relaxed">
                  Whether you're a student looking for specific materials or an educator wishing to contribute, our team is ready to assist you.
                </p>
                <div className="flex space-x-4">
                   <button className="bg-primary text-white px-8 py-3 rounded-xl font-bold hover:bg-secondary shadow-lg transition-all">
                      Email Us
                   </button>
                   <button className="border border-slate-200 px-8 py-3 rounded-xl font-bold hover:bg-slate-50 transition-all text-slate-700">
                      Visit FAQ
                   </button>
                </div>
            </div>
         </div>
      </section>
    </div>
  );
};

export default About;
