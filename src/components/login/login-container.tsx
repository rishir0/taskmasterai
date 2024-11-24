import React, { ReactNode } from 'react';

interface LoginContainerProps {
  children: ReactNode;
}

export function LoginContainer({ children }: LoginContainerProps) {
  return (
    <div className="bg-gray-800/50 backdrop-blur-lg border border-gray-700/50 rounded-lg p-8 w-full max-w-md">
      {children}
    </div>
  );
}
