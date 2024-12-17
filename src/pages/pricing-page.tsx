// src/pages/pricing-page.tsx
import React, { useEffect, useState } from 'react';
import { subscribeToAuthState } from '../lib/pricing-firebase';
import { PricingContainer } from '../components/pricing/pricing-container';
import { PricingHeader } from '../components/pricing/pricing-header';
import { PricingToggle } from '../components/pricing/pricing-toggle';
import { PricingPlans } from '../components/pricing/pricing-plans';
import { PricingFooter } from '../components/pricing/pricing-footer';

export function PricingPage() {
  const [isYearly, setIsYearly] = useState(true);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = subscribeToAuthState((firebaseUser) => {
      setUser(firebaseUser);
    });
    return () => unsubscribe();
  }, []);

  return (
    <PricingContainer>
      <PricingHeader />
      <PricingToggle isYearly={isYearly} onToggle={setIsYearly} />
      <PricingPlans isYearly={isYearly} user={user} />
      <PricingFooter />
    </PricingContainer>
  );
}
