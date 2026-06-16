import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Star } from "lucide-react";
import { formatINR } from "../utils/currency";
import { API_BASE_URL } from "../services/apiBase";

type Service = {
  id: string;
  name: string;
  price: number;
  duration: string;
};

type Salon = {
  id: string;
  name: string;
  image: string;
  rating: number;
  distance?: string;
  services: Service[];
};

const TreatmentsPage: React.FC<{
  latitude?: number | null;
  longitude?: number | null;
}> = ({ latitude, longitude }) => {
  const navigate = useNavigate();
  const [salons, setSalons] = useState<Salon[]>([]);

  useEffect(() => {
    const fetchSalons = async () => {
      try {
        const base = API_BASE_URL;
        let url = `${base}/salons`;
        if (typeof latitude === "number" && typeof longitude === "number") {
          url = `${base}/salons?lat=${latitude}&lon=${longitude}&radius=10`;
        }

        const r = await fetch(url);
        const body = await r.json();
        if (body && body.success) setSalons(body.data || []);
      } catch (err) {
        console.error("Failed to fetch salons:", err);
      }
    };

    fetchSalons();
  }, [latitude, longitude]);

  return (
    <div className="min-h-screen bg-[#FDFBF9] px-4 py-10 sm:px-6 sm:py-12 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <h2 className="mb-6 text-3xl font-serif">Treatments</h2>
        <p className="mb-8 text-stone-600">
          Browse salons and the treatments they offer. Click a service to
          continue booking.
        </p>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
          {salons.map((salon) => (
            <div
              key={salon.id}
              className="flex flex-col gap-4 rounded-2xl border border-stone-100 bg-white p-4 shadow-sm sm:p-6 lg:flex-row lg:gap-6"
            >
              <div className="aspect-[16/10] w-full overflow-hidden rounded-xl bg-stone-100 lg:aspect-[16/13] lg:w-40">
                <img
                  src={salon.image}
                  alt={salon.name}
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                    <h3 className="font-serif text-xl font-medium text-stone-800">
                      {salon.name}
                    </h3>
                    <div className="flex items-center gap-2 text-sm text-stone-500">
                      <Star size={14} className="text-[#C49B89]" />
                      <span>{salon.rating}</span>
                    </div>
                  </div>

                  <p className="text-sm text-stone-400 mb-3">
                    {salon.distance} away
                  </p>

                  <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                    {(salon.services || []).map((s) => (
                      <div
                        key={s.id}
                        className="flex flex-col gap-3 rounded-lg border border-stone-100 p-3 sm:flex-row sm:items-center sm:justify-between"
                      >
                        <div>
                          <div className="font-medium">{s.name}</div>
                          <div className="text-xs text-stone-400">
                            {s.duration}
                          </div>
                        </div>
                        <div className="flex items-center gap-3 sm:justify-end">
                          <div className="font-semibold">
                            {formatINR(s.price)}
                          </div>
                          <button
                            onClick={() => navigate(`/salon/${salon.id}`)}
                            className="min-h-11 rounded-md bg-[#6B554D] px-3 py-2 text-sm text-white transition-colors hover:bg-[#5C4841]"
                          >
                            Book
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                  <button
                    onClick={() => navigate(`/salon/${salon.id}`)}
                    className="text-sm text-[#6B554D] hover:underline"
                  >
                    View Salon
                  </button>
                  <button
                    onClick={() => navigate(`/checkout`)}
                    className="min-h-11 rounded-md bg-[#C49B89] px-4 py-2 text-sm text-white transition-colors hover:bg-[#b89b8a]"
                  >
                    Continue to Checkout
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
export default TreatmentsPage;
