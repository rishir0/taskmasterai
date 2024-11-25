import React from 'react';
import { LoginForm } from '../components/login/login-form';
import { LoginContainer } from '../components/login/login-container';
import { LoginHeader } from '../components/login/login-header';
import { LoginFooter } from '../components/login/login-footer';

export function LoginPage() {
  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center px-4">
      <LoginContainer>
        <LoginHeader />
        <LoginForm />
        <LoginFooter />
      </LoginContainer>
    </div>
  );
}
