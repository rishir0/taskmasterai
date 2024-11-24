import React from 'react';

export function LoginFooter() {
  return (
    <>
      <div className="mt-6 text-center">
        <p className="text-gray-300">
          Don't have an account?{' '}
          <a href="/signup" className="text-indigo-400 hover:text-indigo-300">
            Sign Up
          </a>
        </p>
      </div>

      <div className="mt-6 text-center text-sm text-gray-400">
        <p>
          By signing in, you agree to our{' '}
          <a href="/terms" className="text-indigo-400 hover:text-indigo-300">
            Terms of Service
          </a>{' '}
          and{' '}
          <a href="/privacy" className="text-indigo-400 hover:text-indigo-300">
            Privacy Policy
          </a>
          .
        </p>
      </div>
    </>
  );
}
