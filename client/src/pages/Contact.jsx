import { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Send, HelpCircle, MessageCircle } from 'lucide-react';
import { toast } from 'react-toastify';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitting(true);
    // Simulate API call
    setTimeout(() => {
      toast.success('Message sent! We will contact you soon.');
      setFormData({ name: '', email: '', subject: '', message: '' });
      setSubmitting(false);
    }, 1500);
  };

  const contactOptions = [
    { icon: HelpCircle, title: 'Support Helpdesk', desc: 'Need technical help? Our support team is available 24/7.', action: 'Visit Help Center' },
    { icon: MessageCircle, title: 'Feedback / Suggestions', desc: 'We value your input. Help us improve our resource library.', action: 'Send Feedback' },
    { icon: Mail, title: 'Collaborations', desc: 'Interested in partnering with us? Let us know in your message.', action: 'Partner with Us' }
  ];

  return (
    <div className="bg-academic-gray min-h-[calc(100vh-64px)] pb-10">
      {/* Header */}
      <section className="bg-primary pt-20 pb-20 px-4 text-center">
         <motion.h1 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-4xl md:text-5xl font-extrabold text-white mb-4"
         >
           Get in <span className="text-blue-300">Touch</span>
         </motion.h1>
         <p className="text-blue-100 text-lg max-w-2xl mx-auto opacity-80">
            Have questions about our educational materials? Need technical support? We're here to help you.
         </p>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* Contact Methods */}
          <div className="lg:col-span-1 space-y-6">
             {contactOptions.map((opt, i) => (
                <div key={i} className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100 flex flex-col items-center text-center group hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                   <div className="bg-blue-50 p-4 rounded-2xl text-primary mb-6 group-hover:bg-primary group-hover:text-white transition-colors duration-300">
                      <opt.icon className="h-8 w-8" />
                   </div>
                   <h3 className="text-xl font-bold text-slate-800 mb-3">{opt.title}</h3>
                   <p className="text-slate-500 text-sm mb-6 leading-relaxed">{opt.desc}</p>
                   <button className="text-primary font-bold text-sm hover:underline">{opt.action}</button>
                </div>
             ))}
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-2">
            <motion.div 
               initial={{ opacity: 0, x: 20 }}
               animate={{ opacity: 1, x: 0 }}
               className="bg-white rounded-3xl shadow-xl overflow-hidden flex flex-col md:flex-row border border-slate-100"
            >
               <div className="md:w-1/3 bg-slate-900 p-12 text-white flex flex-col justify-between">
                  <div>
                    <h3 className="text-2xl font-bold mb-8">Contact Information</h3>
                    <div className="space-y-8">
                       <div className="flex items-start space-x-4">
                          <Mail className="h-5 w-5 text-primary mt-1" />
                          <div>
                             <p className="text-xs uppercase font-bold text-slate-500 tracking-widest mb-1">Email</p>
                             <p className="text-slate-200">contact@eduresource.edu</p>
                          </div>
                       </div>
                       <div className="flex items-start space-x-4">
                          <Phone className="h-5 w-5 text-primary mt-1" />
                          <div>
                             <p className="text-xs uppercase font-bold text-slate-500 tracking-widest mb-1">Phone</p>
                             <p className="text-slate-200">+1 (555) 123-4567</p>
                          </div>
                       </div>
                       <div className="flex items-start space-x-4">
                          <MapPin className="h-5 w-5 text-primary mt-1" />
                          <div>
                             <p className="text-xs uppercase font-bold text-slate-500 tracking-widest mb-1">Location</p>
                             <p className="text-slate-200 whitespace-pre-line">123 Academic Way, Science City, SC 90210</p>
                          </div>
                       </div>
                    </div>
                  </div>
                  <div className="mt-12 text-xs text-slate-500">
                     Our team typically responds within 24 business hours.
                  </div>
               </div>

               <div className="md:w-2/3 p-12">
                  <h3 className="text-2xl font-bold text-slate-800 mb-8">Send a Message</h3>
                  <form onSubmit={handleSubmit} className="space-y-6">
                     <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        <div>
                           <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Your Name</label>
                           <input 
                              type="text" 
                              name="name"
                              value={formData.name}
                              onChange={handleChange}
                              className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-primary outline-none transition-all"
                              placeholder="Jane Doe"
                              required
                           />
                        </div>
                        <div>
                           <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Email Address</label>
                           <input 
                              type="email" 
                              name="email"
                              value={formData.email}
                              onChange={handleChange}
                              className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-primary outline-none transition-all"
                              placeholder="jane@university.edu"
                              required
                           />
                        </div>
                     </div>
                     <div>
                        <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Subject</label>
                        <input 
                           type="text" 
                           name="subject"
                           value={formData.subject}
                           onChange={handleChange}
                           className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-primary outline-none transition-all"
                           placeholder="How can we help?"
                           required
                        />
                     </div>
                     <div>
                        <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Message</label>
                        <textarea 
                           name="message"
                           value={formData.message}
                           onChange={handleChange}
                           className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-primary outline-none transition-all min-h-[150px]"
                           placeholder="Type your message here..."
                           required
                        ></textarea>
                     </div>
                     <button 
                        type="submit"
                        disabled={submitting}
                        className="w-full bg-primary text-white py-4 rounded-2xl font-bold hover:bg-secondary transition-all shadow-lg flex items-center justify-center space-x-3 disabled:opacity-50"
                     >
                        {submitting ? (
                          <div className="h-5 w-5 border-2 border-white border-t-transparent animate-spin rounded-full"></div>
                        ) : (
                          <>
                            <span>Send Message</span>
                            <Send className="h-5 w-5" />
                          </>
                        )}
                     </button>
                  </form>
               </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
