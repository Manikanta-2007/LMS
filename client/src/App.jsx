import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { ProtectedRoute } from './routes/ProtectedRoute';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Layouts
import RootLayout from './layouts/RootLayout';
import AdminLayout from './layouts/AdminLayout';

// Public Pages
import Home from './pages/Home';
import About from './pages/About';
import Catalog from './pages/Catalog';
import ResourceDetails from './pages/ResourceDetails';
import Login from './pages/Login';
import Register from './pages/Register';
import Contact from './pages/Contact';
import NotFound from './pages/NotFound';

// Protected User Pages
import Profile from './pages/Profile';

// Admin Pages
import AdminDashboard from './pages/admin/AdminDashboard';
import ManageResources from './pages/admin/ManageResources';
import AddResource from './pages/admin/AddResource';
import ManageUsers from './pages/admin/ManageUsers';
import ViewFeedback from './pages/admin/ViewFeedback';

function App() {
  return (
    <AuthProvider>
      <Router>
        <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} />
        <Routes>
          {/* Public Routes inside RootLayout */}
          <Route element={<RootLayout />}>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/catalog" element={<Catalog />} />
            <Route path="/resource/:id" element={<ResourceDetails />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/contact" element={<Contact />} />
            
            {/* Protected User Routes */}
            <Route element={<ProtectedRoute />}>
              <Route path="/profile" element={<Profile />} />
            </Route>
          </Route>

          {/* Admin Routes inside AdminLayout */}
          <Route path="/admin" element={<ProtectedRoute adminOnly={true} />}>
             <Route element={<AdminLayout />}>
                <Route index element={<Navigate to="/admin/dashboard" replace />} />
                <Route path="dashboard" element={<AdminDashboard />} />
                <Route path="resources" element={<ManageResources />} />
                <Route path="add-resource" element={<AddResource />} />
                <Route path="edit-resource/:id" element={<AddResource />} />
                <Route path="users" element={<ManageUsers />} />
                <Route path="feedback" element={<ViewFeedback />} />
             </Route>
          </Route>

          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
