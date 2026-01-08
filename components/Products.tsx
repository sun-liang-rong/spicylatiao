
import React, { useState, useRef, useEffect } from 'react';
import { PRODUCTS } from '../constants';

export const Products: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);
  const startX = useRef(0);
  const scrollLeft = useRef(0);

  // Sync active index with scroll position
  const handleScroll = () => {
    if (!scrollRef.current) return;
    const container = scrollRef.current;
    const center = container.scrollLeft + container.offsetWidth / 2;
    
    let minDistance = Infinity;
    let closestIndex = 0;

    const children = container.children;
    for (let i = 0; i < children.length; i++) {
      const child = children[i] as HTMLElement;
      const childCenter = child.offsetLeft + child.offsetWidth / 2;
      const distance = Math.abs(center - childCenter);
      if (distance < minDistance) {
        minDistance = distance;
        closestIndex = i;
      }
    }

    if (closestIndex !== activeIndex) {
      setActiveIndex(closestIndex);
    }
  };

  // Mouse Drag functionality for "silky" desktop experience
  const handleMouseDown = (e: React.MouseEvent) => {
    if (!scrollRef.current) return;
    isDragging.current = true;
    startX.current = e.pageX - scrollRef.current.offsetLeft;
    scrollLeft.current = scrollRef.current.scrollLeft;
    scrollRef.current.style.scrollSnapType = 'none'; 
    scrollRef.current.style.scrollBehavior = 'auto'; 
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging.current || !scrollRef.current) return;
    e.preventDefault();
    const x = e.pageX - scrollRef.current.offsetLeft;
    const walk = (x - startX.current) * 1.5; 
    scrollRef.current.scrollLeft = scrollLeft.current - walk;
  };

  const handleMouseUp = () => {
    if (!isDragging.current || !scrollRef.current) return;
    isDragging.current = false;
    scrollRef.current.style.scrollSnapType = 'x mandatory';
    scrollRef.current.style.scrollBehavior = 'smooth';
    
    // Snap to closest based on current scroll
    handleScroll();
  };

  const scrollToCard = (index: number) => {
    if (!scrollRef.current) return;
    const target = scrollRef.current.children[index] as HTMLElement;
    if (target) {
      scrollRef.current.scrollTo({
        left: target.offsetLeft - (scrollRef.current.offsetWidth / 2) + (target.offsetWidth / 2),
        behavior: 'smooth'
      });
    }
  };

  return (
    <div id="products" className="container mx-auto px-6 overflow-hidden select-none">
      <div className="text-center mb-12 reveal">
        <span className="text-red-600 font-bold uppercase tracking-widest text-sm">Visual Stage</span>
        <h2 className="text-4xl md:text-6xl font-black mb-4 uppercase italic tracking-tighter">视觉主舞台</h2>
        <p className="text-zinc-500 max-w-xl mx-auto text-sm md:text-base">
          横向平铺展示，点击或拖动发现更多“爆辣”选择。
        </p>
      </div>

      <div className="relative">
        {/* Active Info Banner */}
        <div className="mb-10 h-40 md:h-52 flex flex-col items-center justify-center reveal">
          <div className="text-center transition-all duration-700 ease-[cubic-bezier(0.23,1,0.32,1)] transform" key={activeIndex}>
            <div className="inline-block px-3 py-1 border border-red-900/50 text-red-500 text-[10px] font-bold uppercase tracking-[0.2em] rounded-full mb-3 animate-[fadeIn_0.4s]">
              Intensity Level 0{PRODUCTS[activeIndex].spicyLevel}
            </div>
            <h3 className="text-4xl md:text-6xl font-black text-white italic uppercase tracking-tighter mb-1 animate-[slideUp_0.5s]">
              {PRODUCTS[activeIndex].name}
            </h3>
            <p className="text-base md:text-xl text-red-500/70 font-serif italic animate-[slideUp_0.7s]">
              {PRODUCTS[activeIndex].tagline}
            </p>
          </div>
        </div>

        {/* Unfolded/Spread Slider */}
        <div className="relative group">
          <div 
            ref={scrollRef}
            onScroll={handleScroll}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
            className="flex space-x-6 md:space-x-10 overflow-x-auto pb-16 pt-10 scrollbar-hide snap-x snap-mandatory cursor-grab active:cursor-grabbing px-[10vw] md:px-[20vw]"
            style={{ scrollBehavior: 'smooth' }}
          >
            {PRODUCTS.map((product, index) => {
              const isActive = activeIndex === index;
              return (
                <div
                  key={product.id}
                  onClick={() => scrollToCard(index)}
                  className={`relative flex-shrink-0 w-72 md:w-96 h-[450px] md:h-[550px] snap-center transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] transform ${
                    isActive 
                      ? 'scale-100 z-20 shadow-[0_40px_100px_-20px_rgba(220,38,38,0.4)] border-white/20' 
                      : 'scale-95 opacity-60 z-10 border-transparent'
                  } rounded-2xl overflow-hidden border backdrop-blur-sm group/card`}
                >
                  {/* Image */}
                  <img 
                    src={product.image} 
                    className={`absolute inset-0 w-full h-full object-cover transition-transform duration-[5s] ease-out ${isActive ? 'scale-110' : 'scale-100'}`} 
                    alt={product.name} 
                  />
                  
                  {/* Gradient Overlay */}
                  <div className={`absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent transition-opacity duration-700 ${isActive ? 'opacity-100' : 'opacity-60'}`} />
                  
                  {/* Card Content */}
                  <div className={`absolute bottom-8 left-8 right-8 transition-all duration-700 transform ${isActive ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-50'}`}>
                    <div className="flex items-center space-x-3 mb-2">
                       <span className={`h-[2px] flex-1 ${isActive ? 'bg-red-600' : 'bg-zinc-700'}`}></span>
                       <span className={`text-[10px] ${isActive ? 'text-red-500' : 'text-zinc-500'} font-bold tracking-[0.3em] uppercase whitespace-nowrap`}>SERIES 0{product.id}</span>
                    </div>
                    <h4 className="text-3xl font-black text-white uppercase italic tracking-tighter">{product.name}</h4>
                    {isActive && (
                      <p className="mt-4 text-zinc-400 text-sm leading-relaxed animate-[fadeIn_1s]">
                        {product.description}
                      </p>
                    )}
                  </div>

                  {/* Intensity Overlay on Hover */}
                  <div className="absolute top-6 right-6 opacity-0 group-hover/card:opacity-100 transition-opacity">
                     <div className="w-12 h-12 rounded-full border border-red-600 flex items-center justify-center text-red-500 font-bold text-xs backdrop-blur-md">
                        {product.spicyLevel}🔥
                     </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Custom Scroll Progress Bar */}
          <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-64 h-1 bg-zinc-900 rounded-full overflow-hidden">
             <div 
                className="h-full bg-red-600 transition-all duration-500 ease-out shadow-[0_0_10px_#dc2626]"
                style={{ width: `${((activeIndex + 1) / PRODUCTS.length) * 100}%` }}
             />
          </div>

          {/* Navigation Arrows (Desktop) */}
          <button 
            onClick={() => scrollToCard(Math.max(0, activeIndex - 1))}
            className="absolute top-1/2 left-8 md:left-20 -translate-y-1/2 w-14 h-14 rounded-full border border-white/10 bg-black/40 backdrop-blur-md flex items-center justify-center text-white hover:bg-red-600 hover:border-red-600 transition-all opacity-0 group-hover:opacity-100 z-30"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
          </button>
          <button 
            onClick={() => scrollToCard(Math.min(PRODUCTS.length - 1, activeIndex + 1))}
            className="absolute top-1/2 right-8 md:right-20 -translate-y-1/2 w-14 h-14 rounded-full border border-white/10 bg-black/40 backdrop-blur-md flex items-center justify-center text-white hover:bg-red-600 hover:border-red-600 transition-all opacity-0 group-hover:opacity-100 z-30"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
          </button>
        </div>

        {/* Dynamic Action Button */}
        <div className="mt-16 flex justify-center reveal" style={{ transitionDelay: '0.2s' }}>
           <button className="group relative px-14 py-6 bg-white text-black font-black uppercase tracking-[0.2em] text-xs rounded-full overflow-hidden transition-all hover:scale-105 active:scale-95 shadow-2xl shadow-red-900/10">
              <span className="relative z-10 transition-colors group-hover:text-white">立即选购 {PRODUCTS[activeIndex].name}</span>
              <div className="absolute inset-0 bg-red-600 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-[cubic-bezier(0.19,1,0.22,1)]" />
           </button>
        </div>
      </div>

      <style>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        @keyframes slideUp {
          from { opacity: 0; transform: translateY(15px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
      `}</style>
    </div>
  );
};
