import React from 'react';
import { Logo } from './components/Logo';
import { useAuth } from './contexts/AuthContext';
import { HeroSection } from './components/HeroSection';
import { MainFeatures } from './components/MainFeatures';
import { Loader2 } from 'lucide-react';


function App() {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <Loader2 className="w-8 h-8 text-indigo-500 animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 font-poppins">
      <header className="fixed w-full bg-gray-900/80 backdrop-blur-lg border-b border-gray-800 z-50">
        <div className="container mx-auto px-4 py-4">
          <nav className="flex items-center justify-between">
            {/* Make the logo clickable and navigate to index.html */}
            <a href="index.html">
              <Logo />
            </a>
            
            <div className="hidden md:flex items-center space-x-8">
              <a href="#features" className="text-gray-300 hover:text-indigo-400 transition-colors">Features</a>
              <a href="pricing.html" className="text-gray-300 hover:text-indigo-400 transition-colors">Pricing</a>
              <a href="contact.html" className="text-gray-300 hover:text-indigo-400 transition-colors">Contact</a>
              <a 
                href={user ? "/dashboard.html" : "/signup.html"} 
                className="px-4 py-2 bg-gradient-to-r from-indigo-500 to-purple-500 text-white rounded-full transition-all transform hover:scale-105"
              >
                {user ? "Dashboard" : "Get Started Today"}
              </a>
            </div>
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
              <a href="/privacy-policy" className="text-sm text-gray-400 hover:text-indigo-400">Privacy Policy</a>
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
