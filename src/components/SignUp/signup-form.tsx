import React, { useState } from 'react';
import { useSignUpAuth } from '../../hooks/use-signup-auth';
import { GoogleSignUpButton } from './google-signup-button';

export function SignUpForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { error, signUpWithEmail } = useSignUpAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await signUpWithEmail(email, password);
  };

  return (
    <>
      <GoogleSignUpButton />

      <div className="flex items-center my-6">
        <hr className="flex-grow border-t border-gray-600" />
        <span className="mx-2 text-gray-400">OR</span>
        <hr className="flex-grow border-t border-gray-600" />
      </div>

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
            required
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
            required
          />
        </div>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <button
          type="submit"
          className="w-full py-3 bg-gradient-to-r from-indigo-500 to-purple-500 text-white rounded-full hover:scale-105 transition-all"
        >
          Sign Up
        </button>
      </form>
    </>
  );
}
