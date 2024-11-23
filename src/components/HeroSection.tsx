import React from 'react';
import { GradientMesh } from './GradientMesh';
import { ArrowRight, Sparkles } from 'lucide-react';

export function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <GradientMesh />
      
      <div className="container relative px-4 pt-32 pb-20">
        <div className="max-w-4xl mx-auto text-center">
          <div className="flex justify-center mb-8">
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-gray-800/50 border border-gray-700/50 backdrop-blur-sm">
              <Sparkles className="w-4 h-4 text-yellow-500 mr-2" />
              <span className="text-sm text-gray-300">Powered by our Advanced AI Models</span>
            </div>
          </div>
          
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-8 leading-tight bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">
            <span className="block">
              Smart scheduling,
            </span>
            <span className="block">
              seamless collaboration
            </span>
            <span className="block">
              and beyond.
            </span>
          </h1>
          
          <p className="text-xl text-gray-300 mb-12 max-w-2xl mx-auto leading-relaxed">
            Upload any document, audio, or video and let TaskMaster
            <span className="text-indigo-400"> TaskMaster</span> organize, summarize, and transform them into useful insights.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <div className="flex flex-col items-center">
              <a href="/signup" 
                 className="group relative inline-flex items-center px-8 py-3 bg-gradient-to-r from-indigo-500 to-purple-500 text-white rounded-full text-lg font-semibold transition-all transform hover:scale-105 hover:shadow-lg hover:shadow-indigo-500/25">
                <span className="text-white">Start now for free</span>
                <ArrowRight className="w-5 h-5 ml-2 transition-transform group-hover:translate-x-1" />
                <div className="absolute inset-0 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 blur-lg opacity-50 group-hover:opacity-75 transition-opacity" />
              </a>
              <span className="text-sm text-gray-400 mt-2">No credit card required.</span>
            </div>
            
            <a href="#demo" 
               className="inline-flex items-center px-8 py-3 bg-gray-800/50 text-white rounded-full text-lg font-semibold border border-gray-700/50 backdrop-blur-sm transition-all hover:bg-gray-700/50">
              Watch demo
            </a>
          </div>
          
          <div className="mt-12 flex items-center justify-center gap-8">
            <div className="flex -space-x-2">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="w-10 h-10 rounded-full border-2 border-gray-800 bg-gray-900 flex items-center justify-center overflow-hidden">
                  <img
                    src={`https://source.unsplash.com/random/100x100?face&${i}`}
                    alt={`User ${i}`}
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
            </div>
            <p className="text-sm text-gray-400">
              Joined by <span className="text-indigo-400 font-semibold">10,000+</span> professionals
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
