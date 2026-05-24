import React, { useState, useRef, useEffect } from 'react';
import { Sparkles, ArrowLeftRight } from 'lucide-react';
import { GALLERY_ITEMS } from '../data';

export default function BeforeAfterSlider() {
  const [activeItemIndex, setActiveItemIndex] = useState(0);
  const [sliderPosition, setSliderPosition] = useState(50); // percentage 0 to 100
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const activeItem = GALLERY_ITEMS[activeItemIndex];

  const handleMove = (clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    let percentage = (x / rect.width) * 100;
    if (percentage < 0) percentage = 0;
    if (percentage > 100) percentage = 100;
    setSliderPosition(percentage);
  };

  const handleTouchMove = (e: TouchEvent) => {
    if (!isDragging) return;
    if (e.touches.length > 0) {
      handleMove(e.touches[0].clientX);
    }
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (!isDragging) return;
    handleMove(e.clientX);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  useEffect(() => {
    if (isDragging) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
      window.addEventListener('touchmove', handleTouchMove);
      window.addEventListener('touchend', handleMouseUp);
    }

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', handleMouseUp);
    };
  }, [isDragging]);

  const handleContainerClick = (e: React.MouseEvent<HTMLDivElement>) => {
    // If they click without dragging, center the slider around the click
    if ((e.target as HTMLElement).closest('.slider-handle')) return;
    handleMove(e.clientX);
  };

  return (
    <section id="gallery" className="py-20 bg-slate-900 text-white overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 md:px-6">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-green-500/10 text-green-400 text-xs font-semibold mb-3 tracking-wide uppercase border border-green-500/20">
            <Sparkles className="w-3 px-0.5 h-3" />
            Untouched Transformations
          </div>
          <h2 className="text-3xl md:text-5xl font-display font-semibold tracking-tight">
            See the <span className="text-green-400 glow-text">Prismatic Gloss</span> Reset
          </h2>
          <p className="mt-4 text-slate-400 text-sm md:text-base">
            Drag the center divider back & forth to witness how our dry-vapor and eco-polymer treatment strips away decades of swirl marks, deep-seat stains, and weather fading.
          </p>
        </div>

        {/* Tab Selection */}
        <div className="flex justify-center flex-wrap gap-2 mb-8">
          {GALLERY_ITEMS.map((item, idx) => (
            <button
              key={item.id}
              onClick={() => {
                setActiveItemIndex(idx);
                setSliderPosition(50);
              }}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-medium transition-all duration-300 border ${
                activeItemIndex === idx
                  ? 'bg-green-500 text-slate-950 border-green-400 shadow-md shadow-green-500/10 scale-[1.02]'
                  : 'bg-slate-800 text-slate-300 border-slate-700 hover:bg-slate-700 hover:text-white'
              }`}
            >
              {item.title}
            </button>
          ))}
        </div>

        {/* Before / After Slider Container */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-8">
            <div
              id="slider-container"
              ref={containerRef}
              onMouseDown={() => setIsDragging(true)}
              onTouchStart={() => setIsDragging(true)}
              onClick={handleContainerClick}
              className="relative aspect-[16/10] w-full rounded-2xl overflow-hidden cursor-ew-resize border border-slate-800 select-none shadow-2xl"
            >
              {/* After Image (Right Side background, revealed as slider shifts left) */}
              <img
                src={activeItem.afterUrl}
                alt="After Detail"
                referrerPolicy="no-referrer"
                className="absolute inset-0 w-full h-full object-cover pointer-events-none"
              />
              <div className="absolute right-4 bottom-4 bg-green-500/90 text-slate-950 px-2 py-1 sm:px-3 sm:py-1 rounded-md text-xs font-bold uppercase tracking-wider z-10 pointer-events-none shadow-md">
                After Detail
              </div>

              {/* Before Image (Left Side, clipped based on sliderPosition) */}
              <div
                className="absolute inset-0 w-full h-full object-cover pointer-events-none transition-all duration-75"
                style={{ clipPath: `polygon(0 0, ${sliderPosition}% 0, ${sliderPosition}% 100%, 0 100%)` }}
              >
                <img
                  src={activeItem.beforeUrl}
                  alt="Before Detail"
                  referrerPolicy="no-referrer"
                  className="absolute inset-0 w-full h-full object-cover pointer-events-none"
                />
                <div className="absolute left-4 bottom-4 bg-red-600/90 text-white px-2 py-1 sm:px-3 sm:py-1 rounded-md text-xs font-bold uppercase tracking-wider z-10 pointer-events-none shadow-md">
                  Before Grime
                </div>
              </div>

              {/* Slider Handle Divider */}
              <div
                className="slider-handle absolute top-0 bottom-0 w-1 bg-white hover:bg-green-400 transition-colors cursor-ew-resize z-20"
                style={{ left: `${sliderPosition}%` }}
              >
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-9 h-9 sm:w-11 sm:h-11 rounded-full bg-white text-slate-950 flex items-center justify-center shadow-2xl border-2 border-slate-900 pointer-events-none hover:scale-110 active:scale-95 transition-transform">
                  <ArrowLeftRight className="w-4 h-4 text-slate-900" />
                </div>
              </div>
            </div>
            
            <p className="text-center text-xs text-slate-500 mt-3 italic">
              Slide back and forth or tap/click anywhere inside the frame to adjust view.
            </p>
          </div>

          <div className="lg:col-span-4 space-y-6">
            <div>
              <span className="text-xs uppercase font-semibold text-green-400 tracking-wider font-mono">Featured Project</span>
              <h3 className="text-xl sm:text-2xl font-display font-medium text-white tracking-tight mt-1">{activeItem.subtitle}</h3>
              <p className="text-sm text-slate-400 mt-2 italic">"{activeItem.title}"</p>
            </div>

            <div className="space-y-4 pt-4 border-t border-slate-800">
              <div className="bg-slate-900 p-4 rounded-xl border border-red-500/10 shadow-3d-dark">
                <h4 className="text-xs font-semibold text-red-500 uppercase tracking-wider mb-1 font-mono">State of the vehicle before:</h4>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">{activeItem.beforeDesc}</p>
              </div>

              <div className="bg-slate-900 p-4 rounded-xl border border-green-500/10 shadow-3d-dark">
                <h4 className="text-xs font-semibold text-green-400 uppercase tracking-wider mb-1 font-mono">Green Car Detailing Restored Result:</h4>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">{activeItem.afterDesc}</p>
              </div>
            </div>

            <div className="pt-2">
              <a
                href="#booking"
                className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl text-sm font-semibold text-slate-950 bg-green-400 hover:bg-green-300 transition-all font-display shadow-lg shadow-green-500/10"
              >
                Book This Exact Treatment
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
