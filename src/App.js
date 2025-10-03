import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Import Components
import Navbar from './components/Navbar';
import Footer from './components/Footer';

// Import Pages
import Home from './pages/Home';
import About from './pages/About';
import Login from './pages/Login';
import Register from './pages/Register';

// Import Styles (assuming you use App.css for global styles)
import './styles/style.css';

function App() {
  return (
    // 1. BrowserRouter allows routing to work
    <Router>
      {/* 2. Navbar appears on all pages */}
      <Navbar />

      {/* 3. Routes defines which component to render for a given path */}
      <div className="main-content"> {/* Optional: A wrapper for content styling */}
        <Routes>
          {/* Default home page route */}
          <Route path="/" element={<Home />} />
          
          {/* Other defined pages */}
          <Route path="/about" element={<About />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

         
        </Routes>
      </div>

      
      <Footer />
    </Router>
  );
}

export default App;