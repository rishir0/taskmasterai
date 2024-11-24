import React, { FormEvent } from 'react';
import { useLoginAuth } from '../../hooks/use-login-auth';
import { GoogleLoginButton } from './google-login-button';

export function LoginForm() {
  const { handleEmailSignIn } = useLoginAuth();

  return (
    <>
      <GoogleLoginButton />

      <div className="relative mb-6">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-gray-700"></div>
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="px-2 bg-gray-800/50 text-gray-400">OR</span>
        </div>
      </div>

      <form onSubmit={handleEmailSignIn}>
        <div className="mb-4">
          <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-1">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            required
            className="w-full px-4 py-2 bg-gray-700/50 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="password" className="block text-sm font-medium text-gray-300 mb-1">
            Password
          </label>
          <input
            type="password"
            id="password"
            name="password"
            required
            className="w-full px-4 py-2 bg-gray-700/50 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
          />
        </div>

        <div className="text-right mb-6">
          <a href="/forgot-password" className="text-sm text-indigo-400 hover:text-indigo-300">
            Forgot password?
          </a>
        </div>

        <button
          type="submit"
          className="w-full bg-gradient-to-r from-indigo-500 to-purple-500 text-white py-2 px-4 rounded-lg hover:from-indigo-600 hover:to-purple-600 transition-all transform hover:scale-[1.02]"
        >
          Sign In
        </button>
      </form>
    </>
  );
}
