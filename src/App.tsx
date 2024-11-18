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

const App = () => {
  return (
    <>
      <Toaster position="top-right" />
      <Routes>
        {/* Public Routes */}
        <Route path="/signup" element={<SignUp />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/" element={<LandingPage />} />
        <Route path="/home" element={<Home />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/forgotpassword" element={<ForgotPassword />} />
        <Route path="/resetpassword" element={<ResetPassword />} />
        <Route path="/details" element={<MedicalForm />} />

        {/* Main Layout with Sidebar */}
        <Route path="/main" element={<Main />}>
          {/* Nested Routes for Dashboard */}
          <Route index element={<Navigate to="dashboard" />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="users" element={<Users />} />
        </Route>
      </Routes>
    </>
  );
};

export default App;

