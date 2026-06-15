import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import HomePage from './pages/HomePage';
import ListingsPage from './pages/ListingsPage';
import PropertyDetailPage from './pages/PropertyDetailPage';
import BookingPage from './pages/BookingPage';
import BookingConfirmPage from './pages/BookingConfirmPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import MyBookingsPage from './pages/MyBookingsPage';
import MapPage from './pages/MapPage';
import AdminPage from './pages/AdminPage';
import BecomeHostPage from './pages/BecomeHostPage';
import HelpPage from './pages/HelpPage';
import ContactPage from './pages/ContactPage';
import HostDashboardPage from './pages/HostDashboardPage';
import { PrivacyPage, TermsPage, CancellationPage, SafetyPage } from './pages/PolicyPages';
import './App.css';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="app">
          <Navbar />
          <main className="main-content">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/listings" element={<ListingsPage />} />
              <Route path="/map" element={<MapPage />} />
              <Route path="/property/:id" element={<PropertyDetailPage />} />
              <Route path="/book/:id" element={<BookingPage />} />
              <Route path="/confirm" element={<BookingConfirmPage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />
              <Route path="/my-bookings" element={<MyBookingsPage />} />
              <Route path="/admin" element={<AdminPage />} />
              <Route path="/host" element={<HostDashboardPage />} />
              <Route path="/become-a-host" element={<BecomeHostPage />} />
              <Route path="/help" element={<HelpPage />} />
              <Route path="/contact" element={<ContactPage />} />
              <Route path="/privacy" element={<PrivacyPage />} />
              <Route path="/terms" element={<TermsPage />} />
              <Route path="/cancellation-policy" element={<CancellationPage />} />
              <Route path="/safety" element={<SafetyPage />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;