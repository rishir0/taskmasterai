// src/components/pricing/pricing-footer.tsx
import React from 'react';

export function PricingFooter() {
  return (
    <footer className="mt-12 text-center text-sm text-gray-400">
      <div className="flex flex-col sm:flex-row items-center justify-center gap-2 mb-2">
        <a href="/privacy-policy.html" className="hover:underline">Privacy Policy</a>
        <span>|</span>
        <a href="/terms.html" className="hover:underline">Terms & Conditions</a>
      </div>
      <p>&copy; 2024 TaskMaster AI. All rights reserved.</p>
    </footer>
  );
}
