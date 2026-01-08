
import React, { useEffect, useState } from 'react';

interface HeroProps {
  scrollY?: number;
}

export const Hero: React.FC<HeroProps> = ({ scrollY = 0 }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  // Parallax calculation
  const parallaxOffset = scrollY * 0.3;

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="relative h-screen w-full flex items-center justify-center overflow-hidden">
      {/* Background with Parallax */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/30 to-black z-10" />
        <img 
          src="https://images.unsplash.com/photo-154433334d-46e7f13ad664?auto=format&fit=crop&q=80&w=1920" 
          className="w-full h-full object-cover scale-110" 
          style={{ transform: `translateY(${parallaxOffset}px) scale(1.1)` }}
          alt="Spicy Latiao Close-up"
        />
      </div>

      <div className={`relative z-20 text-center px-6 transition-all duration-1000 transform ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
        <h2 className="text-red-500 font-bold tracking-[0.5em] mb-4 uppercase text-xs md:text-sm animate-[pulse_3s_infinite]">
          Handmade • Sincere • Emotional
        </h2>
        <h1 className="text-6xl md:text-9xl font-black italic mb-6 leading-tight uppercase tracking-tighter">
          辣，让味蕾<span className="text-red-600 drop-shadow-[0_0_30px_rgba(220,38,38,1)]">跳舞</span>🍷
        </h1>
        <p className="max-w-2xl mx-auto text-zinc-300 text-lg md:text-2xl font-light mb-10 leading-relaxed italic">
          “香辣在口，热情在心。这不只是一块辣条，这是你的热辣态度。”
        </p>
        
        <div className="flex flex-col md:flex-row gap-6 justify-center items-center">
          <button 
            onClick={() => scrollToSection('story')}
            className="group relative px-10 py-5 bg-red-600 text-white font-black uppercase tracking-widest text-sm rounded-sm overflow-hidden transition-all hover:scale-105 active:scale-95 shadow-2xl shadow-red-900/40"
          >
            <span className="relative z-10">阅览“辣·初心”</span>
            <div className="absolute top-0 right-0 w-0 h-full bg-red-800 transition-all group-hover:w-full" />
          </button>
          <button 
            onClick={() => scrollToSection('products')}
            className="px-10 py-5 border border-zinc-700 text-zinc-300 font-black uppercase tracking-widest text-sm hover:bg-zinc-800 hover:text-white transition-all rounded-sm active:scale-95"
          >
            辣出真味
          </button>
        </div>
      </div>

      {/* Down Arrow with Smooth Scroll Action */}
      <div 
        onClick={() => scrollToSection('story')}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce cursor-pointer opacity-50 hover:opacity-100 transition-all hover:scale-125 z-30"
      >
        <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
        </svg>
      </div>
    </div>
  );
};
