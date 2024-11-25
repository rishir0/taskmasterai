import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext'; // Adjust if necessary to import the correct hook for your auth context
import { Loader2 } from 'lucide-react';
import { loginWithEmailPassword, loginWithGoogle } from '../services/login-firebase'; // Adjust the import path

function Login() {
  const { user, loading, setUser } = useAuth();  // Adjust to match your useAuth context
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleEmailLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const user = await loginWithEmailPassword(email, password);
      setUser(user);  // Update the user context after successful login
    } catch (error) {
      console.error("Error during email login:", error);
      // Handle errors (e.g., display an error message)
    }
  };

  const handleGoogleLogin = async () => {
    try {
      const user = await loginWithGoogle();
      setUser(user);  // Update the user context after successful login
    } catch (error) {
      console.error("Error during Google login:", error);
      // Handle errors (e.g., display an error message)
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <Loader2 className="w-8 h-8 text-indigo-500 animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 font-poppins">
      <head>
        <title>Login | TaskMaster AI</title>
      </head>

      <main className="flex items-center justify-center min-h-screen">
        <div className="w-full max-w-md bg-gray-800 p-8 rounded-xl">
          <h2 className="text-3xl text-center text-white mb-2">Login</h2>
          <p className="text-center text-gray-300 mb-6">Create notes in minutes. Free forever. No credit card required.</p>
          
          {/* Google Login Button */}
          <button 
            onClick={handleGoogleLogin}
            className="w-full py-3 mb-4 bg-blue-600 text-white rounded-full hover:scale-105 transition-all"
          >
            Login with Google
          </button>

          {/* OR Divider */}
          <div className="flex items-center justify-center space-x-2 mb-4">
            <hr className="w-1/4 border-t border-gray-600" />
            <span className="text-gray-300">OR</span>
            <hr className="w-1/4 border-t border-gray-600" />
          </div>

          {/* Email and Password Form */}
          <form onSubmit={handleEmailLogin}>
            <div className="mb-4">
              <label htmlFor="email" className="text-gray-300">Email</label>
              <input 
                type="email" 
                id="email" 
                className="w-full p-3 mt-2 rounded-lg bg-gray-700 text-white"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="mb-6">
              <label htmlFor="password" className="text-gray-300">Password</label>
              <input 
                type="password" 
                id="password" 
                className="w-full p-3 mt-2 rounded-lg bg-gray-700 text-white"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </form>

          {/* Forgot Password Link */}
          <div className="text-center mb-6">
            <a href="/forgot-password" className="text-sm text-indigo-400 hover:text-indigo-500">Forgot password?</a>
          </div>

          {/* Login Button */}
          <button 
            type="submit" 
            className="w-full py-3 bg-gradient-to-r from-indigo-500 to-purple-500 text-white rounded-full hover:scale-105 transition-all"
          >
            Login
          </button>

          {/* Additional Links */}
          <div className="mt-6 text-center text-gray-400">
            <p>
              Don't have an account?{' '}
              <a href="/signup" className="text-indigo-400 hover:text-indigo-500">Sign Up</a>
            </p>
            <p className="mt-4 text-sm">
              By signing in, you agree to our{' '}
              <a href="/terms" className="text-indigo-400 hover:text-indigo-500">Terms of Service</a> and{' '}
              <a href="/privacy-policy" className="text-indigo-400 hover:text-indigo-500">Privacy Policy</a>.
            </p>
          </div>
        </div>
      </main>

    </div>
  );
}

export default Login;
