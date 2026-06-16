import { Star, Clock, Plus, ArrowRight, X, Loader2 } from "lucide-react";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { PopupDialog } from "../components/PopupDialog";
import { API_BASE_URL } from "../services/apiBase";

import { formatINR } from "../utils/currency";

export function SalonDetailsPage() {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();

  const [salon, setSalon] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [selectedServices, setSelectedServices] = useState<any[]>([]);

  const [showPhoneModal, setShowPhoneModal] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [popup, setPopup] = useState<{
    open: boolean;
    title: string;
    message: string;
    tone: "success" | "error" | "info" | "warning";
  }>({
    open: false,
    title: "",
    message: "",
    tone: "info",
  });

  // Fetch real salon details and services from backend
  useEffect(() => {
    const fetchSalonDetails = async () => {
      try {
        const res = await fetch(`${API_BASE_URL}/salons/${id}`);
        const body = await res.json();
        if (body && body.success) {
          const fetchedSalon = body.data;
          // Keep services list in sync with latest admin updates.
          fetchedSalon.services = Array.isArray(fetchedSalon.services)
            ? fetchedSalon.services
            : [];

          if (id) {
            const servicesRes = await fetch(
              `${API_BASE_URL}/services?salon_id=${id}`,
            );
            if (servicesRes.ok) {
              const servicesBody = await servicesRes.json();
              if (servicesBody && servicesBody.success) {
                fetchedSalon.services = Array.isArray(servicesBody.data)
                  ? servicesBody.data
                  : [];
              }
            }
          }

          setSalon(fetchedSalon);
          // Start with no preselected services; user chooses services to book
          setSelectedServices([]);
        } else {
          setSalon(null);
          setSelectedServices([]);
        }
      } catch (err) {
        console.error("Failed to fetch salon details:", err);
        setSalon(null);
        setSelectedServices([]);
      } finally {
        setLoading(false);
      }
    };
    if (id) fetchSalonDetails();
  }, [id]);

  const toggleService = (service: any) => {
    const isAlreadySelected = selectedServices.some((s) => s.id === service.id);
    if (isAlreadySelected) {
      setSelectedServices(selectedServices.filter((s) => s.id !== service.id));
    } else {
      setSelectedServices([...selectedServices, service]);
    }
  };

  const handleContinueToBook = () => {
    if (selectedServices.length === 0) {
      setPopup({
        open: true,
        title: "Select a service",
        message:
          "Please select at least one service before continuing to book.",
        tone: "warning",
      });
      return;
    }
    // Save selections in sessionStorage for dynamic Checkout consumption
    sessionStorage.setItem("selectedSalon", JSON.stringify(salon));
    sessionStorage.setItem(
      "selectedServices",
      JSON.stringify(selectedServices),
    );
    sessionStorage.setItem(
      "selectedSalonServices",
      JSON.stringify(salon?.services || []),
    );
    setShowPhoneModal(true);
  };

  const handlePhoneSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (phoneNumber.trim().length >= 10) {
      setShowPhoneModal(false);
      navigate("/checkout");
    }
  };

  // Calculations
  const subtotal = selectedServices.reduce(
    (sum, s) => sum + Number(s.price),
    0,
  );
  const tax = subtotal * 0.08;
  const total = subtotal + tax;

  if (loading) {
    return (
      <div className="min-h-screen bg-[#FDFBF9] flex flex-col items-center justify-center gap-4">
        <Loader2 size={40} className="text-[#C49B89] animate-spin" />
        <p className="text-stone-500 font-medium font-serif text-lg">
          Curating luxury experience...
        </p>
      </div>
    );
  }

  const salonServices =
    salon?.services && salon.services.length > 0 ? salon.services : [];

  return (
    <div className="min-h-screen bg-[#FDFBF9] font-sans text-stone-800">
      <PopupDialog
        open={popup.open}
        title={popup.title}
        message={popup.message}
        tone={popup.tone}
        confirmLabel="OK"
        onConfirm={() => setPopup((prev) => ({ ...prev, open: false }))}
      />
      {/* Phone Number Modal */}
      {showPhoneModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-stone-900/40 backdrop-blur-sm p-4 animate-in fade-in duration-300">
          <div className="bg-white rounded-3xl w-full max-w-md p-8 shadow-2xl relative animate-in zoom-in-95 duration-300">
            <button
              onClick={() => setShowPhoneModal(false)}
              className="absolute top-6 right-6 text-stone-400 hover:text-stone-600 transition-colors cursor-pointer"
            >
              <X size={20} />
            </button>

            <h2 className="font-serif text-2xl font-medium text-stone-900 mb-2">
              Almost there!
            </h2>
            <p className="text-stone-500 mb-8 text-sm">
              Please enter your phone number to proceed with booking. We'll send
              your confirmation details here.
            </p>

            <form onSubmit={handlePhoneSubmit} className="flex flex-col gap-6">
              <div className="flex flex-col gap-2">
                <label className="text-sm font-medium text-stone-600">
                  Phone Number
                </label>
                <div className="flex gap-3">
                  <div className="bg-[#F6F5F2] px-4 py-3.5 rounded-xl border border-stone-200 text-stone-500 font-medium flex items-center shrink-0">
                    +91
                  </div>
                  <input
                    type="tel"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    placeholder="Enter 10-digit mobile number"
                    required
                    maxLength={10}
                    pattern="[0-9]{10}"
                    className="bg-[#F6F5F2] border border-transparent focus:border-[#C49B89] focus:ring-1 focus:ring-[#C49B89] focus:bg-white rounded-xl px-5 py-3.5 outline-none transition-all text-stone-700 w-full"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={phoneNumber.length < 10}
                className="w-full bg-[#6B554D] hover:bg-[#5C4841] disabled:bg-stone-300 disabled:cursor-not-allowed text-white px-6 py-4 rounded-xl font-medium transition-colors shadow-md cursor-pointer"
              >
                Continue to Checkout
              </button>
            </form>
          </div>
        </div>
      )}

      <main className="mx-auto max-w-6xl px-4 pb-20 sm:px-6 sm:pb-28 lg:px-8">
        {/* Header Hero Image */}
        <div className="relative mb-10 h-64 w-full overflow-hidden rounded-4xl shadow-md sm:h-80 lg:h-95">
          <img
            src={
              salon?.image ||
              "https://images.unsplash.com/photo-1560066984-138dadb4c035?q=80&w=2874&auto=format&fit=crop"
            }
            alt={salon?.name || "Salon background"}
            className="w-full h-full object-cover object-center"
          />
          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/10 to-transparent"></div>

          {/* Content on Image */}
          <div className="absolute bottom-6 left-6 z-10 text-white sm:bottom-8 sm:left-8">
            <h1 className="mb-3 text-2xl font-serif font-medium sm:text-3xl">
              {salon?.name || "Glowup Atelier"}
            </h1>
            <div className="flex flex-wrap items-center gap-3 text-sm font-medium text-white/90 sm:gap-4">
              <span className="flex items-center py-1 px-3 bg-black/20 backdrop-blur-md rounded-full gap-1.5">
                <Star size={14} className="text-[#DEB5A4]" fill="#DEB5A4" />{" "}
                {salon?.rating || "4.9"}{" "}
                <span className="font-normal opacity-80">(120 reviews)</span>
              </span>
              <span className="opacity-60">•</span>
              <span className="flex items-center py-1 px-3 bg-black/20 backdrop-blur-md rounded-full gap-1.5">
                <Clock size={14} /> Open until 9 PM
              </span>
            </div>
          </div>
        </div>

        {/* Main Detail Grid Layout */}
        <div className="grid grid-cols-1 items-start gap-10 lg:grid-cols-[minmax(0,1fr)_360px] lg:gap-14">
          {/* Left Content Column */}
          <div className="flex flex-col">
            {/* Tabs */}
            <div className="mb-8 flex gap-6 overflow-x-auto border-b border-stone-200 pb-px sm:gap-8">
              <button className="whitespace-nowrap border-b-2 border-stone-800 pb-3 text-sm font-medium text-stone-800">
                Services
              </button>
              <button className="whitespace-nowrap border-b-2 border-transparent pb-3 text-sm font-medium text-stone-400 transition-colors hover:text-stone-800">
                Gallery
              </button>
              <button className="whitespace-nowrap border-b-2 border-transparent pb-3 text-sm font-medium text-stone-400 transition-colors hover:text-stone-800">
                Reviews
              </button>
              <button className="whitespace-nowrap border-b-2 border-transparent pb-3 text-sm font-medium text-stone-400 transition-colors hover:text-stone-800">
                About
              </button>
            </div>

            {/* Service Category */}
            <div className="mb-10">
              <h3 className="font-serif text-lg font-medium text-stone-800 mb-6">
                Available Treatments
              </h3>
              <div className="flex flex-col gap-4">
                {salonServices.length === 0 ? (
                  <div className="text-stone-500 py-4 italic">
                    No services listed for this salon.
                  </div>
                ) : (
                  salonServices.map((service: any) => {
                    const isSelected = selectedServices.some(
                      (s) => s.id === service.id,
                    );
                    return (
                      <div
                        key={service.id}
                        onClick={() => toggleService(service)}
                        className={`group flex cursor-pointer flex-col gap-4 rounded-2xl border bg-white p-5 shadow-sm transition-all hover:shadow-md sm:flex-row sm:items-center sm:justify-between sm:p-6 ${
                          isSelected
                            ? "border-[#C49B89] bg-[#FDFBF9] shadow-[0_4px_20px_-4px_rgba(196,155,137,0.15)] scale-[1.01]"
                            : "border-stone-100 hover:border-stone-200"
                        }`}
                      >
                        <div>
                          <h4 className="text-stone-800 font-medium mb-1 font-serif text-lg group-hover:text-[#C49B89] transition-colors">
                            {service.name}
                          </h4>
                          <p className="text-stone-500 text-sm mb-4">
                            {service.duration || "60 min"} • Professional
                            pampering session.
                          </p>
                          <p className="text-[#C49B89] font-semibold text-lg">
                            {formatINR(service.price)}
                          </p>
                        </div>
                        <button
                          className={`flex h-11 w-11 items-center justify-center rounded-full border transition-all cursor-pointer ${
                            isSelected
                              ? "bg-[#C49B89] border-[#C49B89] text-white rotate-45"
                              : "border-stone-200 text-[#C49B89] group-hover:bg-[#C49B89] group-hover:text-white"
                          }`}
                        >
                          <Plus size={20} />
                        </button>
                      </div>
                    );
                  })
                )}
              </div>
            </div>
          </div>

          {/* Right Sticky Booking Panel */}
          <div className="bg-white border border-stone-100 shadow-xl shadow-stone-200/40 rounded-3xl p-5 lg:sticky lg:top-8 sm:p-7">
            <h2 className="font-serif text-lg font-medium text-stone-800 mb-6">
              Booking Summary
            </h2>

            {/* Selected Services Rows */}
            <div className="flex flex-col gap-4 mb-6">
              {selectedServices.map((s) => (
                <div
                  key={s.id}
                  className="flex flex-col gap-2 border-b border-stone-50 pb-3 sm:flex-row sm:items-start sm:justify-between"
                >
                  <div>
                    <h4 className="text-stone-800 font-medium text-[15px]">
                      {s.name}
                    </h4>
                    <p className="text-stone-400 text-[13px] mt-1">
                      {s.duration || "60 min"}
                    </p>
                  </div>
                  <span className="text-stone-600 font-semibold text-sm">
                    {formatINR(s.price)}
                  </span>
                </div>
              ))}
            </div>

            {selectedServices.length === 0 && (
              <p className="text-stone-400 text-sm italic mb-8 pb-6 border-b border-stone-100 border-dashed">
                No services selected. Click '+' to add services.
              </p>
            )}

            {/* Price Breakdown */}
            <div className="mb-6 flex flex-col gap-3 border-t border-stone-100 pt-3">
              <div className="flex justify-between items-center text-[15px] text-stone-500">
                <span>Subtotal</span>
                <span>{formatINR(subtotal)}</span>
              </div>
              <div className="flex justify-between items-center text-[15px] text-stone-500">
                <span>Tax (8%)</span>
                <span>{formatINR(tax)}</span>
              </div>
            </div>

            {/* Total */}
            <div className="mb-8 flex items-center justify-between border-t border-stone-100 pt-4 text-lg font-medium text-stone-800">
              <span>Total</span>
              <span>{formatINR(total)}</span>
            </div>

            <button
              onClick={handleContinueToBook}
              disabled={selectedServices.length === 0}
              className="w-full bg-[#6B554D] hover:bg-[#5C4841] disabled:bg-stone-200 disabled:text-stone-400 disabled:cursor-not-allowed text-white px-6 py-4 rounded-2xl font-medium transition-all flex items-center justify-center gap-2 shadow-md relative overflow-hidden cursor-pointer"
            >
              Continue to Book
              <ArrowRight size={18} />
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}
