// src/components/pricing/pricing-plans.tsx
import React from 'react';
import { PricingPlan } from './pricing-plan';

interface PricingPlansProps {
  isYearly: boolean;
  user: any; // Replace with a proper user type if needed
}

export function PricingPlans({ isYearly, user }: PricingPlansProps) {
  const standardPrice = isYearly ? '$8.99 per month' : '$12.99 per month';
  const proPrice = isYearly ? '$3.99 per month' : '$8.99 per month';
  const standardBilling = isYearly ? 'Billed yearly' : 'Billed monthly';
  const proBilling = isYearly ? 'Billed yearly' : 'Billed monthly';

  const basicCtaText = user ? 'Subscribe Now' : 'Get Started for Free';
  const standardCtaText = user ? 'Subscribe Now' : 'Get Started Now';
  const proCtaText = user ? 'Subscribe Now' : 'Get Started Now';

  const basicCtaHref = user ? '/dashboard.html' : '/signup.html';
  const standardCtaHref = user ? '/payment.html' : '/signup.html';
  const proCtaHref = user ? '/payment.html' : '/signup.html';

  return (
    <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
      <PricingPlan
        title="Basic"
        price="Free"
        billing="Billed yearly"
        features={[
          "2 PDF Uploads & 2 AI-Generated Text Outputs",
          "10 AI Chat Interactions per Month",
          "1 AI-Generated Note from Audio & YouTube Links",
          "500 Tokens Included",
          "Add Up to 3 Friends"
        ]}
        ctaText={basicCtaText}
        ctaHref={basicCtaHref}
      />

      <PricingPlan
        title="Premium"
        price={standardPrice}
        billing={standardBilling}
        features={[
          "Unlimited PDF Uploads & AI-Generated Text Outputs",
          "Unlimited AI Chat Interactions",
          "Unlimited AI-Generated Notes",
          "1,500 Tokens Included",
          "Add Unlimited Friends"
        ]}
        ctaText={standardCtaText}
        ctaHref={standardCtaHref}
        featured
      />

      <PricingPlan
        title="Pro"
        price={proPrice}
        billing={proBilling}
        features={[
          "5 PDF Uploads & 5 AI-Generated Text Outputs per Month",
          "200 AI Chat Interactions per Month",
          "5 AI-Generated Notes from Audio & YouTube Links per Month",
          "750 Tokens Included",
          "Add Up to 10 Friends"
        ]}
        ctaText={proCtaText}
        ctaHref={proCtaHref}
      />
    </div>
  );
}
