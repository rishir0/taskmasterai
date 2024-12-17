// src/components/Pricing.tsx
import React, { useEffect, useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Loader2 } from 'lucide-react';
import { subscribeToAuthState } from '../lib/pricing-firebase';

function Pricing() {
  const { loading } = useAuth();
  const [user, setUser] = useState(null);
  const [isYearly, setIsYearly] = useState(true);

  useEffect(() => {
    // Subscribe to auth state to track user
    const unsubscribe = subscribeToAuthState((firebaseUser) => {
      setUser(firebaseUser);
    });
    return () => unsubscribe();
  }, []);

  // Pricing logic
  const standardPriceText = isYearly ? '$8.99 per month' : '$12.99 per month';
  const proPriceText = isYearly ? '$3.99 per month' : '$8.99 per month';
  const standardBillingText = isYearly ? 'Billed yearly' : 'Billed monthly';
  const proBillingText = isYearly ? 'Billed yearly' : 'Billed monthly';

  // Adjust CTA text and href based on user state
  const basicCtaText = user ? 'Subscribe Now' : 'Get Started for Free';
  const standardCtaText = user ? 'Subscribe Now' : 'Get Started Now';
  const proCtaText = user ? 'Subscribe Now' : 'Get Started Now';

  const basicCtaHref = user ? '/dashboard.html' : '/signup.html';
  const standardCtaHref = user ? '/payment.html' : '/signup.html';
  const proCtaHref = user ? '/payment.html' : '/signup.html';

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <Loader2 className="w-8 h-8 text-indigo-500 animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 font-poppins text-white">
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-indigo-400 mb-2">Choose Your Perfect Plan</h1>
          <p className="text-gray-300">Select a plan that works best for you.</p>
        </div>

        {/* Pricing Toggle */}
        <div className="flex justify-center mb-8">
          <div className="bg-gray-800 rounded-full flex">
            <button 
              className={`px-4 py-2 rounded-full transition-colors duration-300 ${isYearly ? 'bg-indigo-500 text-white' : 'text-gray-300'}`}
              onClick={() => setIsYearly(true)}
            >
              Yearly
            </button>
            <button 
              className={`px-4 py-2 rounded-full transition-colors duration-300 ${!isYearly ? 'bg-indigo-500 text-white' : 'text-gray-300'}`}
              onClick={() => setIsYearly(false)}
            >
              Monthly
            </button>
          </div>
        </div>

        {/* Pricing Plans */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
          {/* Basic Plan */}
          <div className="bg-gray-800 rounded-xl p-6 w-full sm:w-1/3">
            <h2 className="text-2xl font-bold mb-4">Basic</h2>
            <p className="text-3xl font-extrabold text-indigo-400 mb-1">Free</p>
            <p className="text-sm text-gray-400 mb-4">Billed yearly</p>
            <ul className="mb-6 space-y-2 text-gray-300">
              <li>2 PDF Uploads & 2 AI-Generated Text Outputs</li>
              <li>10 AI Chat Interactions per Month</li>
              <li>1 AI-Generated Note from Audio & YouTube Links</li>
              <li>500 Tokens Included</li>
              <li>Add Up to 3 Friends</li>
            </ul>
            <a 
              href={basicCtaHref}
              className="inline-block w-full text-center py-3 rounded-full font-semibold bg-indigo-500 text-white hover:scale-105 transition-transform"
            >
              {basicCtaText}
            </a>
          </div>

          {/* Premium Plan */}
          <div className="bg-gray-800 rounded-xl p-6 w-full sm:w-1/3 border-2 border-indigo-500 transform scale-105">
            <h2 className="text-2xl font-bold mb-4">Premium</h2>
            <p className="text-3xl font-extrabold text-indigo-400 mb-1">{standardPriceText}</p>
            <p className="text-sm text-gray-400 mb-4">{standardBillingText}</p>
            <ul className="mb-6 space-y-2 text-gray-300">
              <li>Unlimited PDF Uploads & AI-Generated Text Outputs</li>
              <li>Unlimited AI Chat Interactions</li>
              <li>Unlimited AI-Generated Notes</li>
              <li>1,500 Tokens Included</li>
              <li>Add Unlimited Friends</li>
            </ul>
            <a 
              href={standardCtaHref}
              className="inline-block w-full text-center py-3 rounded-full font-semibold bg-white text-indigo-600 hover:scale-105 transition-transform"
            >
              {standardCtaText}
            </a>
          </div>

          {/* Pro Plan */}
          <div className="bg-gray-800 rounded-xl p-6 w-full sm:w-1/3">
            <h2 className="text-2xl font-bold mb-4">Pro</h2>
            <p className="text-3xl font-extrabold text-indigo-400 mb-1">{proPriceText}</p>
            <p className="text-sm text-gray-400 mb-4">{proBillingText}</p>
            <ul className="mb-6 space-y-2 text-gray-300">
              <li>5 PDF Uploads & 5 AI-Generated Text Outputs per Month</li>
              <li>200 AI Chat Interactions per Month</li>
              <li>5 AI-Generated Notes from Audio & YouTube Links per Month</li>
              <li>750 Tokens Included</li>
              <li>Add Up to 10 Friends</li>
            </ul>
            <a 
              href={proCtaHref}
              className="inline-block w-full text-center py-3 rounded-full font-semibold bg-indigo-500 text-white hover:scale-105 transition-transform"
            >
              {proCtaText}
            </a>
          </div>
        </div>

        {/* Footer */}
        <footer className="mt-12 text-center text-sm text-gray-400">
          <div className="flex flex-col sm:flex-row items-center justify-center gap-2 mb-2">
            <a href="/privacy-policy.html" className="hover:underline">Privacy Policy</a>
            <span>|</span>
            <a href="/terms.html" className="hover:underline">Terms & Conditions</a>
          </div>
          <p>&copy; 2024 TaskMaster AI. All rights reserved.</p>
        </footer>
      </main>
    </div>
  );
}

export default Pricing;
