import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Loader2 } from 'lucide-react';
import { googleSignIn, emailSignIn } from '../lib/login-firebase';

function Login() {
  const { user, loading, login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const user = await emailSignIn(email, password);
      console.log("Logged in as", user);
      // Handle the logged-in user (navigate, update UI, etc.)
    } catch (error) {
      console.error("Login failed", error);
      // Handle login error (show error message, etc.)
    }
  };

  const handleGoogleLogin = async () => {
    try {
      const user = await googleSignIn();
      console.log("Logged in with Google", user);
      // Handle the logged-in user (navigate, update UI, etc.)
    } catch (error) {
      console.error("Google login failed", error);
      // Handle Google login error
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
      <main className="flex items-center justify-center min-h-screen">
        <div className="w-full max-w-md bg-gray-800 p-8 rounded-xl">
          <h2 className="text-3xl text-center text-white mb-6">Login</h2>
          <p className="text-center text-gray-400 mb-6">Create notes in minutes. Free forever. No credit card required.</p>

          {/* Google Login Button */}
          <button
            onClick={handleGoogleLogin}
            className="w-full py-3 mb-4 bg-gradient-to-r from-indigo-500 to-purple-500 text-white rounded-full hover:scale-105 transition-all"
          >
            Login with Google
          </button>

          {/* OR Separator */}
          <div className="flex items-center my-6">
            <hr className="flex-grow border-t border-gray-600" />
            <span className="mx-2 text-gray-400">OR</span>
            <hr className="flex-grow border-t border-gray-600" />
          </div>

          {/* Email/Password Login */}
          <form onSubmit={handleSubmit}>
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
            <button
              type="submit"
              className="w-full py-3 bg-gradient-to-r from-indigo-500 to-purple-500 text-white rounded-full hover:scale-105 transition-all"
            >
              Login
            </button>
          </form>

          {/* Forgot Password Link */}
          <div className="text-center mt-4">
            <a href="#" className="text-sm text-indigo-400 hover:underline">Forgot password?</a>
          </div>

          {/* Sign Up Link */}
          <div className="text-center mt-6">
            <p className="text-sm text-gray-400">Don't have an account? <a href="/signup" className="text-indigo-400 hover:underline">Sign Up</a></p>
          </div>

          {/* Terms of Service Link */}
          <div className="text-center mt-4 text-sm text-gray-400">
            By signing in, you agree to our <a href="/terms" className="text-indigo-400 hover:underline">Terms of Service</a> and <a href="/privacy-policy" className="text-indigo-400 hover:underline">Privacy Policy</a>.
          </div>
        </div>
      </main>
    </div>
  );
}

export default Login;
