// src/components/pricing/pricing-plan.tsx
import React from 'react';

interface PricingPlanProps {
  title: string;
  price: string;
  billing: string;
  features: string[];
  ctaText: string;
  ctaHref: string;
  featured?: boolean;
}

export function PricingPlan({ title, price, billing, features, ctaText, ctaHref, featured }: PricingPlanProps) {
  return (
    <div className={`bg-gray-800 rounded-xl p-6 w-full sm:w-1/3 ${featured ? 'border-2 border-indigo-500 transform scale-105' : ''}`}>
      <h2 className="text-2xl font-bold text-white mb-4">{title}</h2>
      <p className="text-3xl font-extrabold text-indigo-400 mb-1">{price}</p>
      <p className="text-sm text-gray-400 mb-4">{billing}</p>
      <ul className="mb-6 space-y-2">
        {features.map((feature, idx) => (
          <li key={idx} className="flex items-start text-gray-300">
            <span className="mr-2 text-indigo-400">✔</span> {feature}
          </li>
        ))}
      </ul>
      <a 
        href={ctaHref} 
        className={`inline-block w-full text-center py-3 rounded-full font-semibold transition-transform duration-300 ${
          featured 
            ? 'bg-white text-indigo-600 hover:scale-105' 
            : 'bg-indigo-500 text-white hover:scale-105'
        }`}
      >
        {ctaText}
      </a>
    </div>
  );
}
