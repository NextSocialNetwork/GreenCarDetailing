import { useState } from 'react';
import { Image, Eye, Sparkles, Filter } from 'lucide-react';

const STATIC_GALLERY_IMAGES = [
  {
    id: 'img-1',
    category: 'exterior',
    title: 'Precision Clay Wash & Wax Rejuvenation',
    subtitle: 'Chevrolet Corvette C8 Stingray - Rapid Blue on Pacific Coast Hwy',
    url: 'https://images.unsplash.com/photo-1542282088-fe8426682b8f?auto=format&fit=crop&q=80&w=800',
    stats: '6-Hour Hand Treatment'
  },
  {
    id: 'img-2',
    category: 'interior',
    title: 'Nappa Leather Steam Sanitation & Deep Care',
    subtitle: 'Cadillac Escalade Platinum V - Tuscan Oak Cabin over Chicago Skyline',
    url: 'https://images.unsplash.com/photo-1617814076367-b759c7d7e738?auto=format&fit=crop&q=80&w=800',
    stats: 'Full Odor Elimination'
  },
  {
    id: 'img-3',
    category: 'ceramic',
    title: 'Graphene Ceramic Crystalline Shell Coat',
    subtitle: 'Dodge Challenger SRT Hellcat - TorRed Pearl at Route 66',
    url: 'https://images.unsplash.com/photo-1615906655593-ad0386982a0f?auto=format&fit=crop&q=80&w=800',
    stats: '2-Year Covalent Bond Shield'
  },
  {
    id: 'img-4',
    category: 'exterior',
    title: 'Intense Swirl Removal & Optical Polish',
    subtitle: 'Ford Mustang Shelby GT500 - Oxford White Classic',
    url: 'https://images.unsplash.com/photo-1583121274602-3e2820c69888?auto=format&fit=crop&q=80&w=800',
    stats: 'Dual Action Machine Correction'
  },
  {
    id: 'img-5',
    category: 'interior',
    title: 'Micro-Fiber Header Sanitation & Steam Reset',
    subtitle: 'Tesla Model S Plaid Alcantara Cockpit - Silicon Valley Sunset View',
    url: 'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&q=80&w=800',
    stats: 'Dry-vapor Steam Clean'
  },
  {
    id: 'img-6',
    category: 'engine',
    title: 'Engine Bay Steam Degrease & Dressing Restore',
    subtitle: 'Twin-Turbocharged Carbon fiber V8 - Detroit Tuned Garage',
    url: 'https://images.unsplash.com/photo-1616422285623-13ff0162193c?auto=format&fit=crop&q=80&w=800',
    stats: 'Waterless Protective Coating'
  }
];

export default function Gallery() {
  const [activeCategory, setActiveCategory] = useState<'all' | 'exterior' | 'interior' | 'ceramic' | 'engine'>('all');
  const [selectedPhoto, setSelectedPhoto] = useState<typeof STATIC_GALLERY_IMAGES[0] | null>(null);

  const filteredImages = activeCategory === 'all'
    ? STATIC_GALLERY_IMAGES
    : STATIC_GALLERY_IMAGES.filter(img => img.category === activeCategory);

  return (
    <section id="showroom" className="py-24 bg-white text-slate-950 scroll-mt-12">
      <div className="max-w-6xl mx-auto px-4 md:px-6">
        
        {/* Gallery Title header info */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6 pb-6 border-b border-slate-100">
          <div className="max-w-xl">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-green-50 text-green-700 text-xs font-semibold mb-3 tracking-wide uppercase border border-green-150">
              <Image className="w-3.5 h-3.5" />
              Completed Showroom Luster
            </div>
            <h2 className="text-3xl md:text-5xl font-display font-semibold tracking-tight text-slate-900">
              Prismatic <span className="text-green-700 font-bold">Portfolio</span>
            </h2>
            <p className="mt-3 text-slate-500 text-sm leading-relaxed">
              Real high-resolution photographs illustrating our detailing outcomes. Fully chemical-free steam sanitation, deep microfiber polishing and precision graphene application.
            </p>
          </div>

          {/* Filtering buttons row */}
          <div className="flex flex-wrap gap-1.5 shrink-0">
            {[
              { id: 'all', label: 'All Projects' },
              { id: 'exterior', label: 'Exterior Waxing' },
              { id: 'interior', label: 'Cabin Restore' },
              { id: 'ceramic', label: 'Ceramic Coating' },
              { id: 'engine', label: 'Engine Bays' },
            ].map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id as any)}
                className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all border cursor-pointer ${
                  activeCategory === cat.id
                    ? 'bg-green-700 text-white border-green-700 font-display shadow-md shadow-green-500/10'
                    : 'bg-slate-50 text-slate-650 border-slate-200 hover:bg-slate-100'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Photogrid layout */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredImages.map((img) => (
            <div
              key={img.id}
              onClick={() => setSelectedPhoto(img)}
              className="group relative rounded-2xl overflow-hidden aspect-[4/3] bg-slate-100 border border-slate-250 cursor-pointer shadow-sm hover:shadow-lg transition-all duration-300"
            >
              <img
                src={img.url}
                alt={img.title}
                referrerPolicy="no-referrer"
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              {/* Overlay on hover */}
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-slate-950/90 via-slate-950/60 to-transparent p-4 flex flex-col justify-end translate-y-3 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                <span className="text-[10px] uppercase tracking-wider font-mono text-green-400 font-bold">{img.stats}</span>
                <h3 className="text-xs sm:text-sm font-semibold text-white tracking-tight leading-snug mt-1">{img.title}</h3>
                <p className="text-[10px] text-slate-300 truncate mt-0.5">{img.subtitle}</p>
                <div className="mt-2 text-[10px] underline text-white font-bold flex items-center gap-1">
                  <Eye className="w-3.5 h-3.5 text-green-400" /> Click to Expand View
                </div>
              </div>
              <div className="absolute top-3 right-3 bg-slate-900/40 text-slate-50 p-2 rounded-xl backdrop-blur-xs border border-slate-200/10 pointer-events-none transition-all group-hover:opacity-0">
                <Eye className="w-3.5 h-3.5" />
              </div>
            </div>
          ))}
        </div>

        {/* Expanded Lightbox Modal */}
        {selectedPhoto && (
          <div
            onClick={() => setSelectedPhoto(null)}
            className="fixed inset-0 bg-slate-950/95 z-55 flex flex-col items-center justify-center p-4 cursor-zoom-out animate-fade-in"
          >
            <div className="max-w-4xl w-full text-right mb-2">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedPhoto(null);
                }}
                className="text-white hover:text-green-450 text-xs uppercase font-semibold font-mono tracking-wider cursor-pointer"
              >
                Close (ESC)
              </button>
            </div>
            
            <div
              onClick={(e) => e.stopPropagation()}
              className="bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden max-w-4xl w-full shadow-2xl relative"
            >
              <div className="aspect-[16/10] w-full relative">
                <img
                  src={selectedPhoto.url}
                  alt={selectedPhoto.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-6 bg-slate-900 border-t border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <span className="text-xs font-mono font-bold text-green-400 uppercase tracking-widest bg-green-500/10 px-2 py-0.5 rounded border border-green-500/20">
                    {selectedPhoto.stats}
                  </span>
                  <h3 className="text-lg font-display text-white mt-2 font-medium tracking-tight">{selectedPhoto.title}</h3>
                  <p className="text-xs text-slate-400 leading-snug">{selectedPhoto.subtitle}</p>
                </div>

                <button
                  type="button"
                  onClick={() => {
                    setSelectedPhoto(null);
                    const el = document.getElementById('booking');
                    if (el) el.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="px-4 py-2.5 bg-green-500 text-slate-950 font-semibold font-display text-xs rounded-xl hover:bg-green-400 transition-all cursor-pointer inline-flex items-center justify-center gap-1.5"
                >
                  <Sparkles className="w-4 h-4 text-slate-950" /> Schedule This Detail
                </button>
              </div>
            </div>
            <p className="text-slate-500 text-[10px] mt-4 font-mono">Click anywhere outside the frame to close</p>
          </div>
        )}
      </div>
    </section>
  );
}
