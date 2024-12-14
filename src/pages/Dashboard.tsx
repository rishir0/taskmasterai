import React, { useEffect, useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { db } from '../firebase';
import { AISummary } from '../components/AISummary';
import { ProductivityStats } from '../components/ProductivityStats';
import { TasksSection } from '../components/TasksSection';
import { DeadlinesSection } from '../components/DeadlinesSection';

export const Dashboard: React.FC = () => {
  const { currentUser } = useAuth();
  const [greeting, setGreeting] = useState('');

  useEffect(() => {
    const getGreeting = () => {
      const hour = new Date().getHours();
      if (hour >= 5 && hour < 12) return 'Good morning';
      if (hour >= 12 && hour < 17) return 'Good afternoon';
      if (hour >= 17 && hour < 21) return 'Good evening';
      return 'Good night';
    };

    setGreeting(getGreeting());
  }, []);

  return (
    <>
      <div className="dashboard-header">
        <h1>{greeting}, {currentUser?.displayName}</h1>
      </div>

      <AISummary />
      <ProductivityStats />
      <DeadlinesSection />
      <TasksSection />
    </>
  );
};
