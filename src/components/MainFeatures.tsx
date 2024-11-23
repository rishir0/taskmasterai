import React from 'react';
import { Zap, FileText, LayoutDashboard, Users, MessageSquareMore, Calendar } from 'lucide-react';

const features = [
  {
    icon: <Zap className="w-8 h-8" />,
    title: "Distraction Control",
    subtitle: "Block Distractions, Boost Focus",
    description: "Manage your focus like a pro. Block distracting websites and apps, mute notifications, and enjoy calming ambient sounds to enhance productivity."
  },
  {
    icon: <FileText className="w-8 h-8" />,
    title: "Notes",
    subtitle: "Create and Manage Notes Effortlessly",
    description: "Generate notes with AI from text, videos, PDFs, or audio, or craft your own. Export notes as PDFs, share publicly or keep them private, and open in a focused tab for distraction-free reviewing."
  },
  {
    icon: <LayoutDashboard className="w-8 h-8" />,
    title: "Dashboard",
    subtitle: "Your Productivity Hub",
    description: "Organize tasks, goals, plans, and projects all in one place. Sync everything with your calendar, and use custom timers, including a Pomodoro timer, to stay on track."
  },
  {
    icon: <Users className="w-8 h-8" />,
    title: "Friends",
    subtitle: "Collaborate and Connect",
    description: "Chat with friends, create group conversations, and share files seamlessly. Pin messages, reply with ease, and add reactions to keep collaboration fun and efficient."
  },
  {
    icon: <MessageSquareMore className="w-8 h-8" />,
    title: "AI Chat Bot",
    subtitle: "Your Personal Assistant",
    description: "Get instant answers, boost productivity, and tackle questions with ease. The AI Chat Bot is here to support you across various topics whenever you need it."
  },
  {
    icon: <Calendar className="w-8 h-8" />,
    title: "Calendar",
    subtitle: "Plan Smarter, Stay Organized",
    description: "Manage schedules effortlessly. View and edit tasks, goals, plans, and projects with due dates, all synced with your dashboard for a streamlined experience."
  }
];

export function MainFeatures() {
  return (
    <section className="py-20 bg-gray-800/30">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="p-6 bg-gray-900/50 backdrop-blur-sm rounded-xl hover:bg-gray-800/50 transition-all duration-300 border border-gray-800/50">
              <div className="text-indigo-400 mb-4">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">{feature.title}</h3>
              <h4 className="text-indigo-400 font-medium mb-3">{feature.subtitle}</h4>
              <p className="text-gray-400 leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}