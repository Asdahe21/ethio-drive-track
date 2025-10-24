import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { getAuth, onAuthStateChanged } from 'firebase/auth'; // 💡 NEW: Import Firebase Auth functions

// Import Components
import Navbar from './components/Navbar';
import Footer from './components/Footer';

// Import Pages
import Home from './pages/Home';
import About from './pages/About';
import Login from './pages/Login';
import Register from './pages/Register';
import ContactUs from './pages/contact';
import Pricing from './pages/pricing';
import WhyPage from './pages/why';
import ReportPage from './pages/report';
import Samplereport from './pages/samplereport';

// Import Styles
import './styles/style.css';
import { app } from './firebase'; // Ensure Firebase is initialized

// --- Main App Component ---
function App() {
  return (
    <Router>
      <MainLayout />
    </Router>
  );
}

// --- Layout Component with Auth Logic ---
function MainLayout() {
  // 1. 💡 NEW: STATE MANAGEMENT FOR AUTH
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true); // CRITICAL: Prevents rendering until auth status is known
  const auth = getAuth(app); // Get the auth instance

  // 2. 💡 NEW: AUTH STATE LISTENER
  useEffect(() => {
    // This listener runs once on mount and whenever the user signs in/out
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setIsLoggedIn(!!user); // Set true if user object exists, false otherwise
      setLoading(false);    // Authentication check is complete
    });

    // Cleanup subscription on component unmount
    return () => unsubscribe();
  }, [auth]); // Depend on 'auth' instance

  const location = useLocation();

  // Hide Navbar and Footer on these routes
  const hideLayout = location.pathname === '/login' || location.pathname === '/register';

  // 3. 💡 NEW: HANDLE INITIAL LOADING STATE
  if (loading) {
    return (
      <div style={{ padding: '20px', textAlign: 'center' }}>
        Checking user session...
      </div>
    );
  }

  // 4. RENDER LAYOUT AND ROUTES
  return (
    <>
      {/* Navbar only shown if not on login/register */}
      {!hideLayout && <Navbar isLoggedIn={isLoggedIn} />}

      <div className="main-content">
        <Routes>
          {/* 💡 IMPORTANT: Pass isLoggedIn state to Home (which contains the Hero component) */}
          <Route path="/" element={<Home isLoggedIn={isLoggedIn} />} /> 
          
          <Route path="/about" element={<About />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/contact" element={<ContactUs />} />
          <Route path="/pricing" element={<Pricing />} />
          <Route path="/report/:vin" element={<ReportPage isLoggedIn={isLoggedIn} />} />          
          <Route path="/why" element={<WhyPage />} />
          <Route path="/samplereport" element={<Samplereport />} />
        </Routes>
      </div>

      {/* Footer only shown if not on login/register */}
      {!hideLayout && <Footer />}
    </>
  );
}

export default App;