import { MapPin, Search, CheckCircle2, Star, Calendar, Heart, Loader2 } from 'lucide-react';

interface LandingPageProps {
  location: string;
  setLocation: (loc: string) => void;
  isLoadingLocation: boolean;
  onUseMyLocation: () => void;
  onSelectSalon: (salon: string) => void;
}

export function LandingPage({
  location,
  setLocation,
  isLoadingLocation,
  onUseMyLocation,
  onSelectSalon,
}: LandingPageProps) {
  return (
    <div className="min-h-screen bg-[#FDFBF9] font-sans text-stone-800">
      {/* Navbar */}
      <nav className="flex items-center justify-between px-8 py-5 mx-auto max-w-7xl">
        <div className="text-2xl font-semibold font-serif text-[#C49B89]">Glowup</div>
        
        <div className="hidden md:flex items-center space-x-8 text-sm tracking-wide font-medium text-stone-600">
          <a href="#" className="text-stone-900 border-b-2 border-stone-900 pb-1">DISCOVER</a>
          <a href="#" className="hover:text-stone-900 transition-colors">TREATMENTS</a>
          <a href="#" className="hover:text-stone-900 transition-colors">MEMBERSHIPS</a>
          <a href="#" className="hover:text-stone-900 transition-colors">CONCIERGE</a>
        </div>

        <div className="flex items-center space-x-6">
          <button className="text-stone-600 hover:text-stone-900 transition-colors">
            <Search size={20} />
          </button>
          <button className="bg-[#6B554D] hover:bg-[#5C4841] text-white px-6 py-2.5 rounded-md text-sm font-medium transition-colors">
            Sign In
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <main className="relative max-w-7xl mx-auto px-8 pt-20 pb-32 flex h-[700px]">
        {/* Background Image/Overlay */}
        <div className="absolute top-0 right-0 w-[55%] h-full -z-10 rounded-[40px] overflow-hidden opacity-90 blur-[0.5px]">
           <img 
            src="https://images.unsplash.com/photo-1522337660859-02fbefca4702?q=80&w=2938&auto=format&fit=crop" 
            alt="Salon background" 
            className="w-full h-full object-cover object-center opacity-40 mix-blend-multiply filter blur-[2px]"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#FDFBF9] via-[#FDFBF9]/80 to-transparent"></div>
        </div>

        <div className="max-w-2xl pt-16">
          <h1 className="text-[3.5rem] leading-[1.1] font-serif mb-6 text-stone-900">
            Find & Book Top Salons Near<br />You Instantly
          </h1>
          <p className="text-stone-500 text-lg mb-10 max-w-[420px] leading-relaxed">
            Real-time availability. Verified salons. Instant booking. Elevate your self-care routine with curated professionals.
          </p>

          {/* Search/Location Form */}
          <div className="flex flex-col sm:flex-row gap-4 mb-12">
            <button 
              onClick={onUseMyLocation}
              disabled={isLoadingLocation}
              className="flex items-center justify-center gap-2 bg-[#6B554D] hover:bg-[#5C4841] text-white px-6 py-3.5 rounded-lg font-medium transition-colors w-full sm:w-auto shrink-0 shadow-sm disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {isLoadingLocation ? (
                <Loader2 size={18} className="text-white animate-spin" />
              ) : (
                <MapPin size={18} fill="currentColor" className="text-white" />
              )}
              {isLoadingLocation ? "Locating..." : "Use My Location"}
            </button>
            <div className="relative w-full max-w-[320px]">
              <input 
                type="text" 
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="Or enter city manually..." 
                className="w-full pl-5 pr-12 py-3.5 rounded-lg border border-stone-200 bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-[#C49B89] focus:border-transparent text-stone-600"
              />
              <MapPin size={18} className="absolute right-4 top-1/2 -translate-y-1/2 text-stone-400" />
            </div>
          </div>

          {/* Stats/Badges */}
          <div className="flex items-center gap-8 text-sm font-medium text-stone-500 uppercase tracking-wide">
            <div className="flex items-center gap-2">
              <CheckCircle2 size={18} className="text-[#C49B89]" fill="#F4E9E5" />
              <span>Verified Salons</span>
            </div>
            <div className="flex items-center gap-2">
              <Star size={18} className="text-[#C49B89]" fill="#C49B89" />
              <span>4.5+ Ratings</span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar size={18} className="text-[#C49B89]" />
              <span>10,000+ Bookings</span>
            </div>
          </div>
        </div>
      </main>

      {/* Second Page / Search Results Section */}
      <section className="max-w-7xl mx-auto px-8 pb-32">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.3fr] gap-x-12 gap-y-10 items-start">
          
          {/* Left Column: Filters & List */}
          <div className="flex flex-col gap-6">
            
            {/* Inline Filter Bar */}
            <div className="flex flex-wrap items-center gap-2 mb-2">
              <button className="flex items-center gap-2 text-stone-500 border border-stone-200 rounded-lg px-4 py-2 text-sm font-medium bg-stone-50/50 hover:bg-stone-50 transition-colors">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="4" x2="20" y1="21" y2="21"/><line x1="4" x2="20" y1="14" y2="14"/><line x1="4" x2="20" y1="7" y2="7"/></svg>
                Filters
              </button>
              <button className="text-stone-500 hover:text-stone-900 border border-transparent hover:border-stone-200 px-4 py-2 text-sm font-medium transition-colors rounded-lg bg-stone-50/30 hover:bg-stone-50 pointer">Distance</button>
              <button className="text-stone-500 hover:text-stone-900 border border-transparent hover:border-stone-200 px-4 py-2 text-sm font-medium transition-colors rounded-lg bg-stone-50/30 hover:bg-stone-50 pointer">Price</button>
              <button className="text-stone-500 hover:text-stone-900 border border-transparent hover:border-stone-200 px-4 py-2 text-sm font-medium transition-colors rounded-lg bg-stone-50/30 hover:bg-stone-50 pointer">Rating</button>
              <button className="text-stone-500 hover:text-stone-900 border border-transparent hover:border-stone-200 px-4 py-2 text-sm font-medium transition-colors rounded-lg bg-stone-50/30 hover:bg-stone-50 pointer">Services</button>
            </div>

            {/* Salon Cards */}
            <div className="flex flex-col gap-5">
              
              {/* Card 1 */}
              <div 
                onClick={() => onSelectSalon('aura')}
                className="bg-white rounded-2xl p-4 shadow-[0_2px_12px_-4px_rgba(0,0,0,0.04)] border border-stone-100 flex gap-5 hover:shadow-md transition-shadow group cursor-pointer"
              >
                <div className="w-[120px] h-[120px] shrink-0 rounded-xl overflow-hidden bg-stone-100">
                  <img src="https://images.unsplash.com/photo-1595476108010-b4d1f10d5e43?q=80&w=800&auto=format&fit=crop" alt="The Aura Collective" className="w-full h-full object-cover" />
                </div>
                <div className="flex-1 flex flex-col justify-between py-1">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-serif text-xl font-medium text-stone-800 mb-1 group-hover:text-[#C49B89] transition-colors">The Aura Collective</h3>
                      <div className="flex items-center gap-2 text-sm text-stone-400">
                        <span className="flex items-center gap-1 text-stone-500"><Star size={12} fill="#C49B89" className="text-[#C49B89]" /> 4.9</span>
                        <span>•</span>
                        <span>1.2km away</span>
                      </div>
                    </div>
                    <button className="text-stone-300 hover:text-red-400 mt-1 transition-colors"><Heart size={20} /></button>
                  </div>
                  <div className="flex justify-between items-end">
                    <div>
                      <p className="text-[10px] text-stone-400 uppercase tracking-wider mb-0.5">Starts From</p>
                      <p className="font-semibold text-stone-800">$85</p>
                    </div>
                    <button className="bg-[#6B554D] hover:bg-[#5C4841] text-white px-5 py-2 rounded-lg text-sm font-medium transition-colors">Book Now</button>
                  </div>
                </div>
              </div>

              {/* Card 2 */}
              <div 
                onClick={() => onSelectSalon('noir')}
                className="bg-white rounded-2xl p-4 shadow-[0_2px_12px_-4px_rgba(0,0,0,0.04)] border border-stone-100 flex gap-5 hover:shadow-md transition-shadow group cursor-pointer"
              >
                <div className="w-[120px] h-[120px] shrink-0 rounded-xl overflow-hidden bg-stone-100">
                  <img src="https://images.unsplash.com/photo-1600334089648-b0d9d3028eb2?q=80&w=800&auto=format&fit=crop" alt="Noir Facials & Spa" className="w-full h-full object-cover" />
                </div>
                <div className="flex-1 flex flex-col justify-between py-1">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-serif text-xl font-medium text-stone-800 mb-1 group-hover:text-[#C49B89] transition-colors">Noir Facials & Spa</h3>
                      <div className="flex items-center gap-2 text-sm text-stone-400">
                        <span className="flex items-center gap-1 text-stone-500"><Star size={12} fill="#C49B89" className="text-[#C49B89]" /> 4.8</span>
                        <span>•</span>
                        <span>2.4km away</span>
                      </div>
                    </div>
                    <button className="text-stone-300 hover:text-red-400 mt-1 transition-colors"><Heart size={20} /></button>
                  </div>
                  <div className="flex justify-between items-end">
                    <div>
                      <p className="text-[10px] text-stone-400 uppercase tracking-wider mb-0.5">Starts From</p>
                      <p className="font-semibold text-stone-800">$120</p>
                    </div>
                    <button className="bg-[#6B554D] hover:bg-[#5C4841] text-white px-5 py-2 rounded-lg text-sm font-medium transition-colors">Book Now</button>
                  </div>
                </div>
              </div>

              {/* Card 3 */}
              <div className="bg-white rounded-2xl p-4 shadow-[0_2px_12px_-4px_rgba(0,0,0,0.04)] border border-stone-100 flex gap-5 hover:shadow-md transition-shadow group">
                <div className="w-[120px] h-[120px] shrink-0 rounded-xl overflow-hidden bg-stone-100 relative">
                  <div className="absolute inset-0 bg-black/60 z-10 flex items-center justify-center">
                    <span className="text-[9px] font-bold text-white tracking-widest uppercase px-2 text-center leading-tight">Fully Booked<br/>Today</span>
                  </div>
                  <img src="https://images.unsplash.com/photo-1503951914875-452162b0f3f1?q=80&w=800&auto=format&fit=crop" alt="Luxe Grooming" className="w-full h-full object-cover grayscale" />
                </div>
                <div className="flex-1 flex flex-col justify-between py-1">
                  <div className="flex justify-between items-start opacity-70">
                    <div>
                      <h3 className="font-serif text-xl font-medium text-stone-800 mb-1">Luxe Grooming</h3>
                      <div className="flex items-center gap-2 text-sm text-stone-400">
                        <span className="flex items-center gap-1 text-stone-500"><Star size={12} fill="#C49B89" className="text-[#C49B89]" /> 4.7</span>
                        <span>•</span>
                        <span>0.8km away</span>
                      </div>
                    </div>
                    <button className="text-stone-300 hover:text-red-400 mt-1 transition-colors"><Heart size={20} /></button>
                  </div>
                  <div className="flex justify-between items-end">
                    <div className="opacity-70">
                      <p className="text-[10px] text-stone-400 uppercase tracking-wider mb-0.5">Starts From</p>
                      <p className="font-semibold text-stone-800">$55</p>
                    </div>
                    <button className="bg-stone-100 text-stone-400 px-5 py-2 rounded-lg text-sm font-medium cursor-not-allowed">Waitlist</button>
                  </div>
                </div>
              </div>

            </div>
          </div>

          {/* Right Column: Map */}
          <div className="bg-[#9CA7A6] rounded-[2rem] w-full min-h-[600px] h-[calc(100vh-140px)] sticky top-6 shadow-sm overflow-hidden flex items-center justify-center p-8 relative">
            {/* Embedded map representation using a background image */}
            <div className="absolute inset-0 bg-cover bg-center opacity-80 mix-blend-overlay" style={{backgroundImage: "url('https://images.unsplash.com/photo-1524661135-423995f22d0b?q=80&w=2000&auto=format&fit=crop')"}}></div>
            
            <div className="relative w-full h-full bg-white/90 rounded-2xl shadow-xl backdrop-blur-sm border border-white/50 overflow-hidden flex items-center justify-center">
              <img src="https://images.unsplash.com/photo-1478860409681-18e38ea8f3f8?q=80&w=2600&auto=format&fit=crop" className="absolute inset-0 w-full h-full object-cover opacity-60" alt="Map layout" />
              <div className="bg-white px-4 py-2 rounded-full shadow-lg font-medium text-sm text-stone-800 flex items-center gap-2 relative z-10 border border-stone-200">
                <div className="w-2 h-2 rounded-full bg-[#CA9A86] animate-pulse"></div> Interactive Map 
              </div>
            </div>
          </div>

        </div>
      </section>

    </div>
  );
}
