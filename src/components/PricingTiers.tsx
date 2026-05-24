import { Check, Clock, ShieldCheck, HelpCircle } from 'lucide-react';
import { SERVICE_PACKAGES } from '../data';

interface PricingTiersProps {
  onSelectPackage: (packageId: string) => void;
}

export default function PricingTiers({ onSelectPackage }: PricingTiersProps) {
  return (
    <section id="pricing" className="py-24 bg-slate-50 text-slate-900 scroll-mt-12">
      <div className="max-w-6xl mx-auto px-4 md:px-6">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-green-100 text-green-800 text-xs font-semibold mb-3 tracking-wide uppercase border border-green-200">
            <ShieldCheck className="w-3.5 h-3.5 text-green-700" />
            Transparent No-Surprise Pricing
          </div>
          <h2 className="text-3xl md:text-5xl font-display font-bold tracking-tight text-slate-900">
            Select Your <span className="text-green-700">Detailing Tier</span>
          </h2>
          <p className="mt-4 text-slate-600 text-sm md:text-base leading-relaxed">
            All services use 100% biodegradable polymers and high-pressure steam extraction. Pick your package below, and customize with add-ons on the checkout.
          </p>
        </div>

        {/* Pricing Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
          {SERVICE_PACKAGES.map((pkg) => {
            const isSignature = pkg.id === 'ngreen-signature';
            const isCeramic = pkg.id === 'showroom-ceramic';
            
            return (
              <div
                key={pkg.id}
                id={`price-card-${pkg.id}`}
                className={`relative flex flex-col justify-between rounded-3xl p-6 sm:p-8 transition-all duration-300 border ${
                  isSignature
                    ? 'bg-slate-900 text-white border-green-400 shadow-xl shadow-green-500/10 md:-translate-y-4 scale-[1.01]'
                    : 'bg-white text-slate-800 border-slate-200 shadow-md hover:border-slate-300'
                }`}
              >
                {/* Popular Badge */}
                {pkg.tag && (
                  <span
                    className={`absolute -top-3.5 left-1/2 -translate-x-1/2 px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider shadow-sm ${
                      isSignature
                        ? 'bg-green-400 text-slate-950 font-display'
                        : isCeramic
                        ? 'bg-amber-100 text-amber-900 border border-amber-200 font-display'
                        : 'bg-slate-100 text-slate-800 border border-slate-200'
                    }`}
                  >
                    {pkg.tag}
                  </span>
                )}

                {/* Card Top Information */}
                <div>
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className={`text-xl font-display font-medium leading-none ${isSignature ? 'text-white' : 'text-slate-900'}`}>
                        {pkg.name}
                      </h3>
                      <div className="flex items-center gap-1.5 mt-2.5 text-xs font-mono">
                        <Clock className={`w-3.5 h-3.5 ${isSignature ? 'text-green-400' : 'text-green-700'}`} />
                        <span className={isSignature ? 'text-slate-350' : 'text-slate-500'}>
                          Est: {Math.floor(pkg.durationMinutes / 60)} hrs {pkg.durationMinutes % 60 > 0 ? `${pkg.durationMinutes % 60}m` : ''}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Price */}
                  <div className="my-6">
                    <span className="text-sm font-semibold align-super">$</span>
                    <span className={`text-4xl md:text-5xl font-display font-extrabold tracking-tight ${isSignature ? 'text-white' : 'text-slate-950'}`}>
                      {pkg.priceBase}
                    </span>
                    <span className={`text-xs ml-1 ${isSignature ? 'text-slate-400' : 'text-slate-500'}`}>
                      starting price
                    </span>
                  </div>

                  <p className={`text-xs sm:text-sm mb-6 pb-6 border-b leading-relaxed ${
                    isSignature ? 'text-slate-300 border-slate-800' : 'text-slate-600 border-slate-100'
                  }`}>
                    {pkg.shortDescription}
                  </p>

                  {/* Checkmarks */}
                  <div className="space-y-3.5">
                    <p className={`text-xs font-semibold tracking-wider uppercase font-mono ${
                      isSignature ? 'text-green-300' : 'text-green-800'
                    }`}>
                      What's Included
                    </p>
                    <ul className="space-y-3">
                      {pkg.features.map((feature, fIdx) => (
                        <li key={fIdx} className="flex items-start gap-2.5">
                          <Check className={`w-4 h-4 shrink-0 mt-0.5 ${
                            isSignature ? 'text-green-400' : 'text-green-600'
                          }`} />
                          <span className={`text-xs sm:text-sm leading-tight ${
                            isSignature ? 'text-slate-300' : 'text-slate-650'
                          }`}>
                            {feature}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Footer and Button */}
                <div className="mt-8 pt-6 border-t border-dashed border-slate-200/50">
                  <p className={`text-xs italic leading-snug mb-4 ${
                    isSignature ? 'text-slate-400' : 'text-slate-500'
                  }`}>
                    <strong>Perfect for:</strong> {pkg.recommendedFor}
                  </p>
                  
                  <button
                    onClick={() => onSelectPackage(pkg.id)}
                    className={`w-full py-3.5 px-4 rounded-xl text-xs sm:text-sm font-semibold font-display shadow-md transition-all duration-300 flex items-center justify-center gap-1.5 cursor-pointer ${
                      isSignature
                        ? 'bg-green-400 text-slate-950 hover:bg-green-350 shadow-green-500/10'
                        : 'bg-green-700 text-white hover:bg-green-800 shadow-slate-200'
                    }`}
                  >
                    Select & Customize
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Pricing notice info */}
        <div className="mt-12 p-5 bg-slate-100/80 rounded-2xl border border-slate-200 flex flex-col sm:flex-row items-start sm:items-center gap-4 text-xs text-slate-600 max-w-4xl mx-auto">
          <HelpCircle className="w-6 h-6 text-green-700 shrink-0" />
          <div>
            <strong>*Vehicle size adjustments:</strong> Pricing shown is the base tier for Compact/Midsize Coupes or Sedans. Surcharges are applied for larger vehicular frames: Crossovers/SUVs feel an extra <strong>+$35</strong>, and Trucks/Jeeps/Three-Row Vehicles feel <strong>+$60</strong> to cover the supplementary organic solutions and labour hours.
          </div>
        </div>
      </div>
    </section>
  );
}
