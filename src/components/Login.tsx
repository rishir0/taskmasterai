import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Loader2 } from 'lucide-react';
import { googleSignIn, emailSignIn } from '../lib/login-firebase';

function Login() {
  const { loading } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const user = await emailSignIn(email, password);
      console.log("Logged in as", user);
      // Redirect to splashscreen.html after successful login
      window.location.href = '/splashscreen.html';
    } catch (error) {
      console.error("Login failed", error);
      // Handle login error (show error message, etc.)
    }
  };

  const handleGoogleLogin = async () => {
    try {
      const user = await googleSignIn();
      console.log("Logged in with Google", user);
      // Redirect to splashscreen.html after successful login
      window.location.href = '/splashscreen.html';
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
  className="w-full py-3 mb-4 bg-blue-500 text-white rounded-full flex items-center justify-center gap-3 hover:scale-105 transition-all"
>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-5 w-5"
    viewBox="0 0 48 48"
    fill="none"
  >
    <path
      fill="#EA4335"
      d="M24 9.5c3.14 0 5.98 1.1 8.21 2.91l6.15-6.15C34.55 3.03 29.63 1 24 1 14.73 1 6.97 6.77 3.39 14.4l7.26 5.62C12.68 12.37 17.9 9.5 24 9.5z"
    />
    <path
      fill="#34A853"
      d="M46.5 24c0-1.6-.16-3.14-.45-4.64H24v9h12.8c-.5 2.6-2 4.8-4.2 6.28l6.62 5.12C42.7 36.04 46.5 30.56 46.5 24z"
    />
    <path
      fill="#4A90E2"
      d="M9.65 28.58c-1.06-3.13-1.06-6.63 0-9.76L2.39 13.2c-3.58 7.63-3.58 16.57 0 24.2l7.26-5.62z"
    />
    <path
      fill="#FBBC04"
      d="M24 46.5c5.63 0 10.55-2.03 14.08-5.38l-6.62-5.12c-2 1.36-4.55 2.12-7.46 2.12-6.1 0-11.32-2.87-14.35-7.22l-7.26 5.62C6.97 41.23 14.73 46.5 24 46.5z"
    />
  </svg>
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
