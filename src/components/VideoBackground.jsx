import React from 'react';

export default function VideoBackground({ overlayOpacity = 'opacity-50' }) {
  return (
    <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none select-none">
      <video
        autoPlay
        loop
        muted
        playsInline
        className="w-full h-full object-cover scale-105 filter brightness-75 contrast-110 saturate-125"
        poster="https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1600&q=80"
      >
        <source 
          src="https://assets.mixkit.co/videos/preview/mixkit-wind-blowing-in-a-wheat-field-41525-large.mp4" 
          type="video/mp4" 
        />
        {/* Fallback image */}
        <img 
          src="https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1600&q=80" 
          alt="Golden Fasal Field" 
          className="w-full h-full object-cover"
        />
      </video>
      {/* Apple Atmospheric Vignette Gradients */}
      <div className={`absolute inset-0 bg-[#1d1d1f] ${overlayOpacity}`}></div>
      <div className="absolute inset-0 bg-gradient-to-t from-[#1d1d1f] via-transparent to-[#000000]/70"></div>
    </div>
  );
}
