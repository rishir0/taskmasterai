// src/components/pricing/pricing-toggle.tsx
import React from 'react';

interface PricingToggleProps {
  isYearly: boolean;
  onToggle: (isYearly: boolean) => void;
}

export function PricingToggle({ isYearly, onToggle }: PricingToggleProps) {
  return (
    <div className="flex justify-center mb-8">
      <div className="pricing-toggle bg-gray-800 rounded-full flex">
        <button 
          className={`px-4 py-2 rounded-full transition-colors duration-300 ${isYearly ? 'bg-indigo-500 text-white' : 'text-gray-300'}`}
          onClick={() => onToggle(true)}
        >
          Yearly
        </button>
        <button 
          className={`px-4 py-2 rounded-full transition-colors duration-300 ${!isYearly ? 'bg-indigo-500 text-white' : 'text-gray-300'}`}
          onClick={() => onToggle(false)}
        >
          Monthly
        </button>
      </div>
    </div>
  );
}
