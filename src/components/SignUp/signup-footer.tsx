import React from 'react';

export function SignUpFooter() {
  return (
    <>
      <div className="text-center mt-6">
        <p className="text-sm text-gray-400">
          Already have an account?{' '}
          <a href="/login" className="text-indigo-400 hover:underline">
            Login
          </a>
        </p>
      </div>

      <div className="text-center mt-4 text-sm text-gray-400">
        By signing up, you agree to our{' '}
        <a href="/terms" className="text-indigo-400 hover:underline">
          Terms of Service
        </a>{' '}
        and{' '}
        <a href="/privacy-policy" className="text-indigo-400 hover:underline">
          Privacy Policy
        </a>
        .
      </div>
    </>
  );
}
