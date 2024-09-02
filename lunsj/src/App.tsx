import React from 'react';
import './App.css';
import PageNotFound from './pages/PageNotFound';
import LandingPage from './pages/LandingPage';
import { HashRouter, Route, Routes, } from "react-router-dom"
import Navbar from './components/Navbar';
import { AuthProvider } from './context/AuthContext';
import Footer from './components/Footer';

function App() {
  return (
    <div className="App w-screen overflow-hidden">
      <HashRouter>
          <AuthProvider >
            <Navbar />
            <Routes>
              <Route path="/" element={<LandingPage />} />
              <Route path="*" element={<PageNotFound />} />
            </Routes>
            <Footer />
          </AuthProvider>
      </HashRouter>
  </div>
  );
}

export default App;
