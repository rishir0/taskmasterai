// src/components/pricing/pricing-container.tsx
import React from 'react';

type PricingContainerProps = {
  children: React.ReactNode;
};

export function PricingContainer({ children }: PricingContainerProps) {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 min-h-screen bg-gray-900">
      {children}
    </div>
  );
}
