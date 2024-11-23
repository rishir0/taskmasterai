import React, { useState, useEffect } from 'react';
import { Logo } from './components/Logo';
import { HeroSection } from './components/HeroSection';
import { MainFeatures } from './components/MainFeatures';
import { auth, db } from './firebase';

function App() {
  const [user, setUser] = useState(null);  // State to track the authenticated user

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user);  // Update the state when authentication state changes
    });

    return () => unsubscribe();  // Clean up the listener on component unmount
  }, []);

  return (
    <div className="min-h-screen bg-gray-900 font-poppins">
      <header className="fixed w-full bg-gray-900/80 backdrop-blur-lg border-b border-gray-800 z-50">
        <div className="container mx-auto px-4 py-4">
          <nav className="flex items-center justify-between">
            <Logo />

            <div className="hidden md:flex items-center space-x-8">
              <a href="#features" className="text-gray-300 hover:text-indigo-400 transition-colors">Features</a>
              <a href="#pricing" className="text-gray-300 hover:text-indigo-400 transition-colors">Pricing</a>
              <a href="#contact" className="text-gray-300 hover:text-indigo-400 transition-colors">Contact</a>
              <a 
                href={user ? 'dashboard.html' : 'signup.html'} 
                id="get-started-btn"
                className="px-4 py-2 bg-indigo-500 hover:bg-indigo-600 text-white rounded-full transition-all transform hover:scale-105">
                {user ? 'Dashboard' : 'Get started today'}
              </a>
            </div>

            <button className="md:hidden text-gray-300">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </nav>
        </div>
      </header>

      <main>
        <HeroSection />
        <MainFeatures />
      </main>

      <footer className="bg-gray-900 border-t border-gray-800">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="flex items-center space-x-4">
              <a href="/privacy" className="text-sm text-gray-400 hover:text-indigo-400">Privacy Policy</a>
              <span className="text-gray-600">|</span>
              <a href="/terms" className="text-sm text-gray-400 hover:text-indigo-400">Terms & Conditions</a>
            </div>
            <p className="text-sm text-gray-400 mt-4 md:mt-0">
              © 2024 TaskMaster AI. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
