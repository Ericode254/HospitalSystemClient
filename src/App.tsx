import { Routes, Route, Navigate } from 'react-router-dom';
import SignUp from './pages/auth/SignUp';
import { Toaster } from 'react-hot-toast';
import SignIn from './pages/auth/SignIn';
import LandingPage from './pages/main/LandingPage';
import Home from './pages/main/Home';
import Contact from './pages/main/Contact';
import ForgotPassword from './pages/auth/ForgotPassword';
import ResetPassword from './pages/auth/ResetPassword';
import MedicalForm from './pages/main/MedicalForm';
import Main from './pages/dashboard/Main';
import Dashboard from './pages/dashboard/Dashboard';
import Users from './pages/dashboard/Users';
import ProtectedRoute from './components/ProtectedRoute';

const App = () => {
  return (
    <>
      <Toaster position="top-right" />
      <Routes>
        {/* Public Routes */}
        <Route path="/signup" element={<SignUp />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/" element={<LandingPage />} />
        <Route path="/forgotpassword" element={<ForgotPassword />} />
        <Route path="/resetpassword" element={<ResetPassword />} />

        {/* Protected Routes */}
        <Route
          path="/home"
          element={
            <ProtectedRoute allowedRoles={['user', 'admin']}>
              <Home />
            </ProtectedRoute>
          }
        />
        <Route
          path="/contact"
          element={
            <ProtectedRoute allowedRoles={['user', 'admin']}>
              <Contact />
            </ProtectedRoute>
          }
        />
        <Route
          path="/details"
          element={
            <ProtectedRoute allowedRoles={['user', 'admin']}>
              <MedicalForm />
            </ProtectedRoute>
          }
        />

        {/* Admin-Only Routes */}
        <Route
          path="/main"
          element={
            <ProtectedRoute allowedRoles={['admin']}>
              <Main />
            </ProtectedRoute>
          }
        >
          {/* Nested Routes for Dashboard */}
          <Route index element={<Navigate to="dashboard" />} />
          <Route
            path="dashboard"
            element={
              <ProtectedRoute allowedRoles={['admin']}>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="users"
            element={
              <ProtectedRoute allowedRoles={['admin']}>
                <Users />
              </ProtectedRoute>
            }
          />
        </Route>
      </Routes>
    </>
  );
};

export default App;

