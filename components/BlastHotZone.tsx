
import React, { useState } from 'react';

export const BlastHotZone: React.FC = () => {
  const [level, setLevel] = useState(3);
  const [isBlasting, setIsBlasting] = useState(false);

  const getLevelInfo = (lvl: number) => {
    switch (lvl) {
      case 1: return { label: '微辣萌芽', color: 'text-yellow-500', bg: 'bg-yellow-500', desc: '像初吻般温柔，微微的麻。' };
      case 2: return { label: '中辣热流', color: 'text-orange-500', bg: 'bg-orange-500', desc: '血液开始沸沸腾，额头微出汗。' };
      case 3: return { label: '爆辣战歌', color: 'text-red-500', bg: 'bg-red-500', desc: '舌尖的蹦迪，灵魂的战栗。' };
      case 4: return { label: '地狱熔岩', color: 'text-red-700', bg: 'bg-red-700', desc: '火光冲天，味觉进入无尽荒野。' };
      case 5: return { label: '超维禁忌', color: 'text-red-900', bg: 'bg-red-900', desc: '不可言说的力量，这一刻你是神。' };
      default: return { label: '', color: '', bg: '', desc: '' };
    }
  };

  const info = getLevelInfo(level);

  const handleBlast = () => {
    setIsBlasting(true);
    setTimeout(() => setIsBlasting(false), 2000);
  };

  return (
    <div className="container mx-auto px-6 reveal">
      <div className={`relative overflow-hidden rounded-[3rem] p-12 md:p-24 bg-zinc-950 border border-red-900/20 transition-all duration-300 ${isBlasting ? 'animate-[shake_0.2s_infinite]' : ''}`}>
        
        {/* Visual FX background based on level */}
        <div 
          className="absolute inset-0 opacity-10 transition-colors duration-500 pointer-events-none" 
          style={{ backgroundColor: info.bg.replace('bg-', '') }} 
        />

        <div className="relative z-10 text-center max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-5xl font-black mb-4 uppercase tracking-tighter italic">Blast Hot Zone 🔥</h2>
          <p className="text-zinc-400 mb-12">测试你的受辣极限。拖动滑块，开启你的热辣维度。</p>

          <div className="mb-16 reveal" style={{ transitionDelay: '0.2s' }}>
            <input 
              type="range" 
              min="1" 
              max="5" 
              step="1" 
              value={level} 
              onChange={(e) => setLevel(parseInt(e.target.value))}
              className="w-full h-3 bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-red-600 mb-8"
            />
            <div className="flex justify-between text-xs font-bold text-zinc-600 uppercase tracking-tighter">
              <span>MILD</span>
              <span>MEDIUM</span>
              <span>HOT</span>
              <span>CRAZY</span>
              <span>DEADLY</span>
            </div>
          </div>

          <div className="space-y-4 animate-[fadeIn_0.5s] reveal" style={{ transitionDelay: '0.4s' }}>
            <span className={`text-6xl md:text-8xl font-black italic block transition-colors duration-500 ${info.color}`}>
              {info.label}
            </span>
            <p className="text-xl text-zinc-300 font-light italic">{info.desc}</p>
          </div>

          <button 
            onClick={handleBlast}
            className={`mt-12 px-12 py-5 rounded-full font-black text-lg uppercase tracking-widest transition-all reveal ${isBlasting ? 'bg-zinc-800 scale-95' : 'bg-red-600 hover:bg-red-500 hover:shadow-[0_0_40px_rgba(220,38,38,0.5)] active:scale-95'}`}
            style={{ transitionDelay: '0.6s' }}
          >
            {isBlasting ? 'B L A S T I N G !' : '开启爆辣模拟'}
          </button>
        </div>

        {/* Floating Emoticons FX during blast */}
        {isBlasting && (
            <div className="absolute inset-0 pointer-events-none flex items-center justify-center overflow-hidden">
                {Array.from({ length: 20 }).map((_, i) => (
                    <span 
                        key={i} 
                        className="absolute animate-bounce text-4xl"
                        style={{ 
                            left: `${Math.random() * 100}%`, 
                            top: `${Math.random() * 100}%`,
                            animationDelay: `${Math.random() * 0.5}s`,
                            animationDuration: `${0.5 + Math.random()}s`
                        }}
                    >
                        {['🔥', '🌶️', '🥵', '💥'][Math.floor(Math.random() * 4)]}
                    </span>
                ))}
            </div>
        )}
      </div>
      
      <style>{`
        @keyframes shake {
          0% { transform: translate(1px, 1px) rotate(0deg); }
          10% { transform: translate(-1px, -2px) rotate(-1deg); }
          20% { transform: translate(-3px, 0px) rotate(1deg); }
          30% { transform: translate(3px, 2px) rotate(0deg); }
          40% { transform: translate(1px, -1px) rotate(1deg); }
          50% { transform: translate(-1px, 2px) rotate(-1deg); }
          60% { transform: translate(-3px, 1px) rotate(0deg); }
          70% { transform: translate(3px, 1px) rotate(-1deg); }
          80% { transform: translate(-1px, -1px) rotate(1deg); }
          90% { transform: translate(1px, 2px) rotate(0deg); }
          100% { transform: translate(1px, -2px) rotate(-1deg); }
        }
      `}</style>
    </div>
  );
};
