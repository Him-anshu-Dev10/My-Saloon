import { Heart, Share2, Star, Clock, Plus, ArrowRight, X } from 'lucide-react';
import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

export function SalonDetailsPage() {
  const navigate = useNavigate();
  const params = useParams(); // Might use 'params.id' later to fetch salon details
  const id = params.id;
  if (!id) console.log("Salon ID:", id); // Suppress TS6133 by logging
  
  const [showPhoneModal, setShowPhoneModal] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState('');

  const handleContinueToBook = () => {
    setShowPhoneModal(true);
  };

  const handlePhoneSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (phoneNumber.trim().length >= 10) {
      setShowPhoneModal(false);
      navigate('/checkout');
    }
  };

  return (
    <div className="min-h-screen bg-[#FDFBF9] font-sans text-stone-800">
      
      {/* Phone Number Modal */}
      {showPhoneModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-stone-900/40 backdrop-blur-sm p-4">
          <div className="bg-white rounded-3xl w-full max-w-md p-8 shadow-2xl relative">
            <button 
              onClick={() => setShowPhoneModal(false)}
              className="absolute top-6 right-6 text-stone-400 hover:text-stone-600 transition-colors"
            >
              <X size={20} />
            </button>
            
            <h2 className="font-serif text-2xl font-medium text-[#0A2640] mb-2">Almost there!</h2>
            <p className="text-stone-500 mb-8">Please enter your phone number to proceed with booking. We'll send your confirmation details here.</p>
            
            <form onSubmit={handlePhoneSubmit} className="flex flex-col gap-6">
              <div className="flex flex-col gap-2">
                <label className="text-sm font-medium text-stone-600">Phone Number</label>
                <div className="flex gap-3">
                  <div className="bg-[#F6F5F2] px-4 py-3.5 rounded-xl border border-stone-200 text-stone-500 font-medium flex items-center shrink-0">
                    +1
                  </div>
                  <input 
                    type="tel" 
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    placeholder="(555) 000-0000" 
                    required
                    className="bg-[#F6F5F2] border-transparent focus:border-[#C49B89] focus:ring-1 focus:ring-[#C49B89] focus:bg-white rounded-xl px-5 py-3.5 outline-none transition-all text-stone-700 w-full" 
                  />
                </div>
              </div>
              
              <button 
                type="submit"
                disabled={phoneNumber.length < 10}
                className="w-full bg-[#CA9A86] hover:bg-[#B38775] disabled:bg-stone-300 disabled:cursor-not-allowed text-white px-6 py-4 rounded-xl font-medium transition-colors shadow-sm"
              >
                Continue to Checkout
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Detail View Navbar */}
      <nav className="flex items-center justify-between px-8 py-5 mx-auto max-w-6xl">
        <button 
          onClick={() => navigate('/')}
          className="text-2xl font-semibold font-serif italic text-[#313131] hover:text-[#C49B89] transition-colors"
        >
          Glowup
        </button>
        
        <div className="hidden md:flex items-center space-x-8 text-sm tracking-wide font-medium text-stone-500">
          <a href="#" className="text-[#C49B89] border-b-2 border-transparent hover:border-[#C49B89]">Atelier</a>
          <a href="#" className="hover:text-stone-900 transition-colors">Bookings</a>
          <a href="#" className="hover:text-stone-900 transition-colors">Saved</a>
          <a href="#" className="hover:text-stone-900 transition-colors">Profile</a>
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

      <main className="max-w-6xl mx-auto px-8 pb-32">
        {/* Header Hero Image */}
        <div className="relative w-full h-[380px] rounded-[32px] overflow-hidden mb-10 shadow-sm">
          <img 
            src="https://images.unsplash.com/photo-1560066984-138dadb4c035?q=80&w=2874&auto=format&fit=crop" 
            alt="Salon background" 
            className="w-full h-full object-cover object-center"
          />
          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent"></div>
          
          {/* Content on Image */}
          <div className="absolute bottom-8 left-8 text-white z-10">
            <h1 className="text-3xl font-serif font-medium mb-3">The Aurelia Atelier</h1>
            <div className="flex items-center gap-4 text-sm font-medium text-white/90">
              <span className="flex items-center py-1 px-3 bg-black/20 backdrop-blur-md rounded-full gap-1.5"><Star size={14} className="text-[#DEB5A4]" fill="#DEB5A4" /> 4.9 <span className="font-normal opacity-80">(120 reviews)</span></span>
              <span className="opacity-60">•</span>
              <span className="flex items-center py-1 px-3 bg-black/20 backdrop-blur-md rounded-full gap-1.5"><Clock size={14} /> Open until 9 PM</span>
            </div>
          </div>
          
          <button className="absolute bottom-8 right-8 bg-white/20 backdrop-blur-md hover:bg-white/30 border border-white/30 text-white px-6 py-2.5 rounded-xl text-sm font-medium transition-colors shadow-lg">
            Book Appointment
          </button>
        </div>

        {/* Main Detail Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-14 items-start">
          
          {/* Left Content Column */}
          <div className="flex flex-col">
            
            {/* Tabs */}
            <div className="flex items-center gap-8 border-b border-stone-200 mb-8 pb-[1px]">
              <button className="text-stone-800 border-b-2 border-stone-800 pb-3 text-sm font-medium">Services</button>
              <button className="text-stone-400 hover:text-stone-800 border-b-2 border-transparent pb-3 text-sm font-medium transition-colors">Gallery</button>
              <button className="text-stone-400 hover:text-stone-800 border-b-2 border-transparent pb-3 text-sm font-medium transition-colors">Reviews</button>
              <button className="text-stone-400 hover:text-stone-800 border-b-2 border-transparent pb-3 text-sm font-medium transition-colors">About</button>
            </div>

            {/* Service Category */}
            <div className="mb-10">
              <h3 className="font-serif text-lg font-medium text-stone-800 mb-6">Hair Styling</h3>
              <div className="flex flex-col gap-4">
                
                {/* Service Item */}
                <div className="bg-white border border-stone-100 rounded-2xl p-6 shadow-sm flex items-center justify-between group hover:shadow-md hover:border-stone-200 transition-all cursor-pointer">
                  <div>
                    <h4 className="text-stone-800 font-medium mb-1 font-serif text-lg group-hover:text-[#C49B89] transition-colors">Signature Haircut</h4>
                    <p className="text-stone-500 text-sm mb-4">60 min • Professional wash, cut, and signature blowout.</p>
                    <p className="text-[#C49B89] font-medium">$85</p>
                  </div>
                  <button className="w-10 h-10 rounded-full border border-stone-200 flex items-center justify-center text-[#C49B89] group-hover:bg-[#C49B89] group-hover:text-white transition-colors">
                    <Plus size={20} />
                  </button>
                </div>

                {/* Service Item */}
                <div className="bg-white border border-stone-100 rounded-2xl p-6 shadow-sm flex items-center justify-between group hover:shadow-md hover:border-stone-200 transition-all cursor-pointer">
                  <div>
                    <h4 className="text-stone-800 font-medium mb-1 font-serif text-lg group-hover:text-[#C49B89] transition-colors">Luxe Balayage</h4>
                    <p className="text-stone-500 text-sm mb-4">180 min • Hand-painted highlights for a sun-kissed finish.</p>
                    <p className="text-[#C49B89] font-medium">$240</p>
                  </div>
                  <button className="w-10 h-10 rounded-full border border-stone-200 flex items-center justify-center text-[#C49B89] group-hover:bg-[#C49B89] group-hover:text-white transition-colors">
                    <Plus size={20} />
                  </button>
                </div>

              </div>
            </div>

          </div>

          {/* Right Sticky Booking Panel */}
          <div className="bg-white border border-stone-100 shadow-xl shadow-stone-200/40 rounded-3xl p-7 sticky top-8">
            <h2 className="font-serif text-lg font-medium text-stone-800 mb-6">Booking Summary</h2>
            
            {/* Selected Service Row */}
            <div className="flex justify-between items-start mb-6">
              <div>
                <h4 className="text-stone-800 font-medium text-[15px]">Signature Haircut</h4>
                <p className="text-stone-400 text-[13px] mt-1">60 min</p>
              </div>
              <span className="text-stone-500 text-sm">$85</span>
            </div>

            <p className="text-stone-400 text-sm italic mb-8 pb-6 border-b border-stone-100 border-dashed">
              No other services selected...
            </p>

            {/* Price Breakdown */}
            <div className="flex flex-col gap-3 mb-6">
              <div className="flex justify-between items-center text-[15px] text-stone-500">
                <span>Subtotal</span>
                <span>$85.00</span>
              </div>
              <div className="flex justify-between items-center text-[15px] text-stone-500">
                <span>Tax (8%)</span>
                <span>$6.80</span>
              </div>
            </div>

            {/* Total */}
            <div className="flex justify-between items-center text-lg font-medium text-stone-800 mb-8">
              <span>Total</span>
              <span>$91.80</span>
            </div>

            <button 
              onClick={handleContinueToBook}
              className="w-full bg-[#CA9A86] hover:bg-[#B38775] text-white px-6 py-4 rounded-2xl font-medium transition-colors flex items-center justify-center gap-2 shadow-sm relative overflow-hidden"
            >
              Continue to Book
              <ArrowRight size={18} />
              <div className="absolute inset-x-0 border-t border-dashed border-white/40 top-0 m-1 rounded-[14px] bottom-1 right-1 left-1 pointer-events-none border-b border-l border-r border-[#ffffff40]"></div>
            </button>

          </div>

        </div>
      </main>
    </div>
  );
}
