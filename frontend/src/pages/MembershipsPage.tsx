import React from "react";
import { useNavigate } from "react-router-dom";
import { PopupDialog } from "../components/PopupDialog";

const MembershipsPage: React.FC = () => {
  const navigate = useNavigate();
  const [popup, setPopup] = React.useState<{
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

  return (
    <div className="min-h-screen bg-[#FDFBF9] px-4 py-12 sm:px-6 sm:py-20 lg:px-8">
      <PopupDialog
        open={popup.open}
        title={popup.title}
        message={popup.message}
        tone={popup.tone}
        confirmLabel="OK"
        onConfirm={() => setPopup((prev) => ({ ...prev, open: false }))}
      />
      <div className="mx-auto max-w-4xl text-center">
        <h1 className="mb-4 text-3xl font-serif sm:text-4xl">Memberships</h1>
        <p className="mb-8 text-base text-stone-600 sm:text-lg">
          Coming soon — stay tuned! We're working on memberships to provide
          exclusive perks, discounts, and priority bookings.
        </p>

        <div className="flex flex-col items-stretch justify-center gap-4 sm:flex-row sm:items-center">
          <button
            onClick={() => navigate(-1)}
            className="min-h-11 rounded-md bg-[#6B554D] px-5 py-3 text-white"
          >
            Go Back
          </button>
          <button
            onClick={() =>
              setPopup({
                open: true,
                title: "Notification saved",
                message: "We'll notify you when memberships launch!",
                tone: "success",
              })
            }
            className="min-h-11 rounded-md bg-[#C49B89] px-5 py-3 text-white"
          >
            Notify Me
          </button>
        </div>
      </div>
    </div>
  );
};

export default MembershipsPage;
