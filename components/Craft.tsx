import React, { useRef, useState } from "react";

const steps = [
  {
    id: "01",
    title: "选料",
    desc: "选自特定产区优质小麦，天然纯度，保证口感劲道。",
  },
  { id: "02", title: "研磨", desc: "低温石磨粉碎，保留谷物原始清香。" },
  { id: "03", title: "揉捏", desc: "千次手工摔打揉捏，形成独特蜂窝状结构。" },
  {
    id: "04",
    title: "浸渍",
    desc: "72小时恒温油浸，让每一根辣条都吸饱秘制辣油。",
  },
];

export const Craft: React.FC = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const playVideo = () => {
    // 播放video 隐藏播放按钮
    if (videoRef.current) {
      videoRef.current.play();
      setIsPlaying(true);
    }
  };

  const handleVideoEnd = () => {
    if (videoRef.current) {
      // 视频播放结束，显示播放按钮
      videoRef.current.pause();
      setIsPlaying(false);
    }
  };
  return (
    <div className="container mx-auto px-6">
      <div className="bg-zinc-900/30 rounded-3xl p-12 border border-zinc-800/50 backdrop-blur-sm relative overflow-hidden reveal">
        <div className="absolute top-0 right-0 p-10 opacity-5">
          <svg
            className="w-64 h-64 text-red-600"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
          </svg>
        </div>

        <div className="max-w-2xl mb-16 relative z-10 reveal">
          <span className="text-red-600 font-bold uppercase tracking-widest text-sm">
            Our Craft
          </span>
          <h2 className="text-4xl md:text-5xl font-black mt-4 mb-6 italic uppercase tracking-tighter">
            慢工出细活，辣是<span className="text-red-500">磨</span>出来的
          </h2>
          <p className="text-zinc-400 leading-relaxed">
            在这个工业化快节奏的时代，我们依然坚持繁琐的手工步骤。因为我们相信，只有指尖的温度，才能赋予辣条真正的灵魂。
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative z-10">
          {steps.map((step, idx) => (
            <div
              key={step.id}
              className="group p-6 hover:bg-red-600/5 transition-colors rounded-xl border border-transparent hover:border-red-900/30 reveal"
              style={{ transitionDelay: `${idx * 0.1}s` }}
            >
              <span className="text-5xl font-black text-red-600/10 mb-4 block group-hover:text-red-600/30 transition-colors">
                {step.id}
              </span>
              <h4 className="text-xl font-bold mb-3">{step.title}</h4>
              <p className="text-zinc-500 text-sm leading-loose group-hover:text-zinc-400 transition-colors">
                {step.desc}
              </p>
            </div>
          ))}
        </div>

        <div
          className="mt-16 flex justify-center reveal"
          style={{ transitionDelay: "0.4s" }}
        >
          <div className="relative group cursor-pointer overflow-hidden rounded-xl border border-zinc-800 w-full max-w-4xl">
            <video
              loop
              ref={videoRef}
              src="/video.mp4"
              className="w-full h-80 object-cover opacity-50 group-hover:scale-105 transition-transform duration-1000"
            />
            {!isPlaying && (
              <div className="absolute inset-0 flex items-center justify-center">
                <div
                  className="w-20 h-20 bg-red-600 rounded-full flex items-center justify-center shadow-2xl shadow-red-900/40 group-hover:scale-110 transition-transform"
                  onClick={() => playVideo()}
                >
                  <svg
                    className="w-8 h-8 text-white fill-current translate-x-1"
                    viewBox="0 0 24 24"
                  >
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </div>
                <span className="absolute bottom-6 font-bold tracking-widest uppercase text-xs text-white/80">
                  观看工艺短片 / PROCESS VIDEO
                </span>
              </div>
            )}
            {isPlaying && (
              <div className="absolute inset-0 flex items-center justify-center">
                {/* 暂停按钮 */}
                <div
                  className="w-20 h-20 bg-red-600 rounded-full flex items-center justify-center shadow-2xl shadow-red-900/40 group-hover:scale-110 transition-transform"
                  onClick={() => handleVideoEnd()}
                >
                  <svg
                    className="w-8 h-8 text-white fill-current translate-x-1"
                    viewBox="0 0 24 24"
                  >
                    <path d="M6 4h4v16H6zM14 4h4v16h-4z" />
                  </svg>
                </div>
                <span className="absolute bottom-6 font-bold tracking-widest uppercase text-xs text-white/80">
                  STOPS VIDEO
                </span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
