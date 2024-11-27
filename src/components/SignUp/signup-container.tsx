import React from 'react';
import { SignUpHeader } from './signup-header';
import { SignUpForm } from './signup-form';
import { SignUpFooter } from './signup-footer';

export function SignUpContainer() {
  return (
    <div className="w-full max-w-md bg-gray-800 p-8 rounded-xl">
      <SignUpHeader />
      <SignUpForm />
      <SignUpFooter />
    </div>
  );
}
