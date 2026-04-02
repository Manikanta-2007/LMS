import { Link } from 'react-router-dom';
import { BookOpen, Github, Twitter, Linkedin, Mail } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-slate-900 text-slate-300 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-1">
            <Link to="/" className="flex items-center space-x-2 text-white mb-4">
              <BookOpen className="h-6 w-6" />
              <span className="font-bold text-lg">EduResource</span>
            </Link>
            <p className="text-sm">
              Providing modern educational materials to students and educators worldwide. 
              Empowering the next generation of learners.
            </p>
          </div>
          <div>
            <h3 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li><Link to="/" className="hover:text-white">Home</Link></li>
              <li><Link to="/catalog" className="hover:text-white">Resource Catalog</Link></li>
              <li><Link to="/about" className="hover:text-white">About Project</Link></li>
              <li><Link to="/contact" className="hover:text-white">Contact Us</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">Legal</h3>
            <ul className="space-y-2 text-sm">
              <li><Link to="#" className="hover:text-white">Privacy Policy</Link></li>
              <li><Link to="#" className="hover:text-white">Terms of Service</Link></li>
              <li><Link to="#" className="hover:text-white">Cookie Policy</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">Connect</h3>
            <div className="flex space-x-4">
              <Link to="#" className="hover:text-white"><Twitter className="h-5 w-5" /></Link>
              <Link to="#" className="hover:text-white"><Linkedin className="h-5 w-5" /></Link>
              <Link to="#" className="hover:text-white"><Github className="h-5 w-5" /></Link>
              <Link to="#" className="hover:text-white"><Mail className="h-5 w-5" /></Link>
            </div>
            <p className="mt-4 text-sm">
              Subscribe to our newsletter for the latest updates.
            </p>
          </div>
        </div>
        <div className="mt-12 pt-8 border-t border-slate-800 text-center text-sm">
          <p>&copy; {new Date().getFullYear()} FSAD-PS28 EduResource Library. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
