import { ArrowLeft, User, CreditCard, Calendar, MapPin, Lock, CheckCircle2, Heart, Share2 } from 'lucide-react';

interface CheckoutPageProps {
  onBack: () => void;
  onBackHome: () => void;
}

export function CheckoutPage({ onBack, onBackHome }: CheckoutPageProps) {
  return (
    <div className="min-h-screen bg-[#FDFBF9] font-sans text-stone-800">
      {/* Detail View Navbar */}
      <nav className="flex items-center justify-between px-8 py-5 mx-auto max-w-6xl">
        <div className="flex items-center gap-4">
           <button 
              onClick={onBack}
              className="w-10 h-10 flex items-center justify-center border border-stone-200 text-stone-500 rounded-lg hover:border-stone-400 hover:text-stone-800 transition-colors bg-white shadow-sm"
            >
              <ArrowLeft size={18} strokeWidth={2.5}/>
           </button>
           <button 
            onClick={onBackHome}
            className="text-2xl font-semibold font-serif italic text-[#313131] hover:text-[#C49B89] transition-colors"
          >
            Glowup
          </button>
        </div>
        
        <div className="flex items-center space-x-4">
          <button className="text-stone-600 hover:text-stone-900 transition-colors p-2">
            <Heart size={20} />
          </button>
          <button className="text-stone-600 hover:text-stone-900 transition-colors p-2">
            <Share2 size={20} />
          </button>
        </div>
      </nav>

      <main className="max-w-6xl mx-auto px-8 pb-32 pt-8">
        <div className="grid grid-cols-1 lg:grid-cols-[1.5fr_1fr] gap-12 items-start">
          
          {/* Left Checkout Forms Column */}
          <div className="flex flex-col gap-10">
            
            <section>
              <h2 className="flex items-center gap-2 font-serif text-[1.4rem] font-medium text-[#0A2640] mb-6">
                <User size={20} className="text-[#645041]" />
                Contact Details
              </h2>
              
              <div className="bg-white rounded-[24px] p-8 shadow-[0_2px_20px_-4px_rgba(0,0,0,0.04)] border border-stone-100 flex flex-col gap-6">
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="flex flex-col gap-2">
                      <label className="text-sm font-medium text-stone-600">Full Name</label>
                      <input type="text" placeholder="Julianne Moore" className="bg-[#F6F5F2] border-transparent focus:border-[#C49B89] focus:ring-1 focus:ring-[#C49B89] focus:bg-white rounded-xl px-5 py-3.5 outline-none transition-all text-stone-700" />
                    </div>
                    <div className="flex flex-col gap-2">
                      <label className="text-sm font-medium text-stone-600">Email Address</label>
                      <input type="email" placeholder="j.moore@atelier.com" className="bg-[#F6F5F2] border-transparent focus:border-[#C49B89] focus:ring-1 focus:ring-[#C49B89] focus:bg-white rounded-xl px-5 py-3.5 outline-none transition-all text-stone-700" />
                    </div>
                 </div>
                 <div className="flex flex-col gap-2">
                    <label className="text-sm font-medium text-stone-600">Phone Number</label>
                    <input type="tel" placeholder="+1 (555) 000-0000" className="bg-[#F6F5F2] border-transparent focus:border-[#C49B89] focus:ring-1 focus:ring-[#C49B89] focus:bg-white rounded-xl px-5 py-3.5 outline-none transition-all text-stone-700 w-full" />
                  </div>
              </div>
            </section>

            <section>
              <h2 className="flex items-center gap-2 font-serif text-[1.4rem] font-medium text-[#0A2640] mb-6">
                <CreditCard size={20} className="text-[#645041]" />
                Payment Method
              </h2>
              
              <div className="grid grid-cols-2 gap-4 mb-6">
                <button className="flex items-center justify-center gap-2 bg-[#F9F4F2] border border-[#DEB5A4] text-stone-700 px-6 py-4 rounded-xl font-medium transition-colors ring-1 ring-[#DEB5A4]/30">
                  <CreditCard size={18} className="text-[#645041]" /> Credit/Debit Card
                </button>
                 <button className="flex items-center justify-center gap-2 bg-white border border-stone-200 text-stone-500 hover:border-stone-300 px-6 py-4 rounded-xl font-medium transition-colors">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-stone-400"><rect x="3" y="8" width="18" height="12" rx="2" ry="2"/><path d="M12 8v12"/><path d="m3 8 2-4h14l2 4"/></svg>
                  Pay at Salon
                </button>
              </div>

              <div className="bg-white rounded-[24px] p-8 shadow-[0_2px_20px_-4px_rgba(0,0,0,0.04)] border border-stone-100 flex flex-col gap-6">
                 <div className="flex flex-col gap-2">
                    <label className="text-sm font-medium text-stone-600">Card Number</label>
                    <div className="relative">
                      <input type="text" placeholder="**** **** **** 4421" className="bg-[#F6F5F2] border-transparent focus:border-[#C49B89] focus:ring-1 focus:ring-[#C49B89] focus:bg-white rounded-xl pl-5 pr-12 py-3.5 outline-none transition-all text-stone-700 w-full font-mono tracking-wider" />
                      <div className="absolute right-4 top-1/2 -translate-y-1/2 opacity-30">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 8v8"/><path d="M8 12h8"/></svg>
                      </div>
                    </div>
                  </div>
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="flex flex-col gap-2">
                      <label className="text-sm font-medium text-stone-600">Expiry Date</label>
                      <input type="text" placeholder="MM / YY" className="bg-[#F6F5F2] border-transparent focus:border-[#C49B89] focus:ring-1 focus:ring-[#C49B89] focus:bg-white rounded-xl px-5 py-3.5 outline-none transition-all text-stone-700 font-mono tracking-widest uppercase" />
                    </div>
                    <div className="flex flex-col gap-2">
                      <label className="text-sm font-medium text-stone-600">CVV</label>
                      <input type="text" placeholder="***" className="bg-[#F6F5F2] border-transparent focus:border-[#C49B89] focus:ring-1 focus:ring-[#C49B89] focus:bg-white rounded-xl px-5 py-3.5 outline-none transition-all text-stone-700 font-mono tracking-widest" />
                    </div>
                 </div>
                 <div className="flex items-center gap-3 mt-2">
                   <div className="w-5 h-5 rounded border border-stone-300 flex items-center justify-center cursor-pointer hover:border-[#DEB5A4] transition-colors"></div>
                   <span className="text-sm text-stone-600">Securely save this card for future bookings</span>
                 </div>
              </div>
            </section>

          </div>

          {/* Right Summary Sticky Panel */}
          <div className="bg-white border border-stone-100 shadow-[0_8px_30px_-6px_rgba(0,0,0,0.05)] rounded-[32px] overflow-hidden sticky top-8">
            {/* Visual Card Representation */}
            <div className="w-full h-44 relative">
              <img src="https://images.unsplash.com/photo-1560066984-138dadb4c035?q=80&w=2874&auto=format&fit=crop" className="w-full h-full object-cover" alt="Salon header" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
              <div className="absolute bottom-5 left-5 text-white">
                <h3 className="font-serif text-2xl font-medium mb-1">The Silk Atelier</h3>
                <div className="text-white/80 text-sm flex items-center gap-1.5">Beverly Hills, CA</div>
              </div>
            </div>

            <div className="p-7 flex flex-col gap-7">
              {/* Specifics */}
              <div className="flex justify-between items-start">
                <div>
                  <h5 className="text-[11px] font-bold text-stone-400 tracking-[0.15em] uppercase mb-1.5">SERVICE</h5>
                  <h4 className="text-stone-800 font-serif font-medium text-[16px] mb-1 border-b border-white">Signature Silk Facial</h4>
                  <p className="text-stone-500 text-xs">60 mins • Lead Esthetician</p>
                </div>
                <span className="text-[#333] font-medium">$145</span>
              </div>

              <div className="h-[1px] w-full bg-stone-100"></div>

              <div className="flex flex-col gap-5">
                 <div className="flex gap-4">
                   <div className="w-10 h-10 rounded-xl bg-stone-100 text-stone-500 flex items-center justify-center shrink-0">
                     <Calendar size={18} />
                   </div>
                   <div>
                     <h5 className="text-[11px] text-stone-500 mb-0.5">Date & Time</h5>
                     <p className="text-[14px] text-stone-800 font-medium">Thursday, Oct 24 • 2:30 PM</p>
                   </div>
                 </div>
                 <div className="flex gap-4">
                   <div className="w-10 h-10 rounded-xl bg-stone-100 text-stone-500 flex items-center justify-center shrink-0">
                     <MapPin size={18} />
                   </div>
                   <div>
                     <h5 className="text-[11px] text-stone-500 mb-0.5">Location</h5>
                     <p className="text-[14px] text-stone-800 font-medium leading-snug pr-4">452 North Canon Drive, 90210</p>
                   </div>
                 </div>
              </div>

              {/* Price Breakdown container */}
              <div className="border border-stone-100 bg-[#FCFBFB] rounded-[24px] p-6 mt-2 flex flex-col gap-4">
                <div className="flex justify-between items-center text-[13px] text-stone-500">
                  <span>Subtotal</span>
                  <span>$145.00</span>
                </div>
                <div className="flex justify-between items-center text-[13px] text-stone-500">
                  <span>Service Fee (5%)</span>
                  <span>$7.25</span>
                </div>
                <div className="flex justify-between items-center text-[13px] text-stone-500">
                  <span>Tax</span>
                  <span>$11.60</span>
                </div>
                <div className="flex justify-between items-center text-[18px] font-medium text-stone-800 border-t border-stone-200 border-dashed pt-4 mt-1">
                  <span>Total</span>
                  <span>$163.85</span>
                </div>
              </div>

              <div className="flex flex-col items-center gap-4">
                <button className="w-full bg-[#CA9A86] hover:bg-[#B38775] text-white px-6 py-4 rounded-xl font-medium transition-colors flex items-center justify-center gap-2 shadow-sm text-[15px]">
                  <Lock size={16} /> Confirm Booking
                </button>
                <p className="flex items-center gap-1.5 text-[11px] text-stone-400 font-medium tracking-wide">
                  <CheckCircle2 size={12} /> Secure 256-bit SSL encrypted payment
                </p>
              </div>
            </div>
          </div>

        </div>
      </main>
    </div>
  );
}
