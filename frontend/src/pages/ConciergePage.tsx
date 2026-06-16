import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { PopupDialog } from "../components/PopupDialog";

const ConciergePage: React.FC = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [contact, setContact] = useState("");
  const [city, setCity] = useState("");
  const [serviceType, setServiceType] = useState("");
  const [notes, setNotes] = useState("");
  const [popup, setPopup] = useState<{
    open: boolean;
    title: string;
    message: string;
    tone: "success" | "error" | "info" | "warning";
    onConfirm?: () => void;
  }>({
    open: false,
    title: "",
    message: "",
    tone: "info",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setPopup({
      open: true,
      title: "Request received",
      message: `Thanks ${name || "there"}! Your concierge request has been received. We'll contact you at ${contact || "your contact"}.`,
      tone: "success",
      onConfirm: () => navigate("/memberships"),
    });
  };

  return (
    <div className="min-h-screen bg-[#FDFBF9] px-4 py-12 sm:px-6 sm:py-20 lg:px-8">
      <PopupDialog
        open={popup.open}
        title={popup.title}
        message={popup.message}
        tone={popup.tone}
        confirmLabel="Done"
        onConfirm={() => {
          const action = popup.onConfirm;
          setPopup((prev) => ({ ...prev, open: false }));
          action?.();
        }}
      />
      <div className="mx-auto max-w-3xl">
        <h1 className="mb-3 text-3xl font-serif sm:text-4xl">Concierge</h1>
        <p className="mb-8 text-stone-600">
          Need personalized help booking services, curated packages, or priority
          scheduling? Submit a concierge request and our team will respond
          within 24 hours.
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Your name"
              className="w-full rounded-lg border border-stone-200 p-3"
            />
            <input
              value={contact}
              onChange={(e) => setContact(e.target.value)}
              placeholder="Email or phone"
              className="w-full rounded-lg border border-stone-200 p-3"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <input
              value={city}
              onChange={(e) => setCity(e.target.value)}
              placeholder="City"
              className="w-full rounded-lg border border-stone-200 p-3"
            />
            <select
              value={serviceType}
              onChange={(e) => setServiceType(e.target.value)}
              className="w-full rounded-lg border border-stone-200 bg-white p-3"
            >
              <option value="">Service Type (optional)</option>
              <option value="facial">Facial</option>
              <option value="massage">Massage</option>
              <option value="bride">Bridal / Events</option>
              <option value="wellness">Wellness</option>
            </select>
          </div>

          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="Any preferences, dates, or notes"
            className="h-32 w-full rounded-lg border border-stone-200 p-3"
          />

          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            <button className="min-h-11 rounded-md bg-[#6B554D] px-5 py-3 text-white">
              Send Request
            </button>
            <button
              type="button"
              onClick={() => navigate(-1)}
              className="min-h-11 rounded-md bg-stone-200 px-5 py-3"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ConciergePage;
