import React from 'react';
import { Loader2 } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { SignUpContainer } from '../components/SignUp/signup-container';

export function SignUpPage() {
  const { loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <Loader2 className="w-8 h-8 text-indigo-500 animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 font-poppins">
      <main className="flex items-center justify-center min-h-screen">
        <SignUpContainer />
      </main>
    </div>
  );
}
