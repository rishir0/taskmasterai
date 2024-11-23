import React from 'react';

export function GradientMesh() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <div className="absolute -top-1/2 -left-1/2 w-[200%] h-[200%] bg-gradient-radial from-indigo-500/20 via-transparent to-transparent animate-pulse-slow" />
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-gradient-radial from-purple-500/20 via-transparent to-transparent animate-pulse-slower" />
      <div className="absolute -bottom-32 left-1/2 w-[800px] h-[800px] bg-gradient-conic from-indigo-500/30 via-purple-500/30 to-pink-500/30 blur-3xl opacity-30 animate-spin-slow" />
    </div>
  );
}