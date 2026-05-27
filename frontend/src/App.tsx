import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import { LandingPageWrapper } from "./pages/LandingPage";
import TreatmentsPage from "./pages/TreatmentsPage";
import MembershipsPage from "./pages/MembershipsPage";
import ConciergePage from "./pages/ConciergePage";
import Navbar from "./components/Navbar";
import { SalonDetailsPage } from "./pages/SalonDetailsPage";
import { CheckoutPage } from "./pages/CheckoutPage";
import SignInPage from "./pages/SignInPage";
import { BookingConfirmationPage } from "./pages/BookingConfirmationPage";
import { MyBookingsPage } from "./pages/MyBookingsPage";

function AppRoutes() {
  const [location, setLocation] = useState("");
  const [isLoadingLocation, setIsLoadingLocation] = useState(false);
  const [latitude, setLatitude] = useState<number | null>(null);
  const [longitude, setLongitude] = useState<number | null>(null);
  
  // Track watch ID to prevent multiple watchers
  const [watchId, setWatchId] = useState<number | null>(null);

  // Cleanup watcher on unmount
  useEffect(() => {
    return () => {
      if (watchId !== null) navigator.geolocation.clearWatch(watchId);
    };
  }, [watchId]);

  const handleUseMyLocation = () => {
    if (!navigator.geolocation) {
      alert("Geolocation is not supported by your browser");
      return;
    }

    if (watchId !== null) {
      // Already tracking
      return;
    }

    setIsLoadingLocation(true);
    let hasGeocoded = false;

    const id = navigator.geolocation.watchPosition(
      async (position) => {
        try {
            const { latitude, longitude } = position.coords;
            setLatitude(latitude);
            setLongitude(longitude);
            
            // Only reverse-geocode the first time to save API rate limits
            if (!hasGeocoded) {
              const response = await fetch(
                `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}&email=admin@glowup.com`,
              );
              const data = await response.json();

              if (data && data.address) {
                const city =
                  data.address.city ||
                  data.address.town ||
                  data.address.village ||
                  data.address.county ||
                  "";
                const state = data.address.state || data.address.country || "";
                const displayLoc = [city, state].filter(Boolean).join(", ");
                setLocation(
                  displayLoc || `${latitude.toFixed(4)}, ${longitude.toFixed(4)}`,
                );
              } else {
                setLocation(`${latitude.toFixed(4)}, ${longitude.toFixed(4)}`);
              }
              hasGeocoded = true;
            }
        } catch (error) {
          console.error("Error fetching location details:", error);
          if (!hasGeocoded) {
            setLocation(
              `${position.coords.latitude.toFixed(4)}, ${position.coords.longitude.toFixed(4)}`,
            );
            hasGeocoded = true;
          }
        } finally {
          setIsLoadingLocation(false);
        }
      },
      (error) => {
        console.error("Error getting location:", error);
        alert("Unable to retrieve your location");
        setIsLoadingLocation(false);
      },
      { enableHighAccuracy: true, maximumAge: 10000, timeout: 5000 }
    );
    setWatchId(id);
  };


  return (
    <Routes>
        <Route
          path="/"
          element={
            <LandingPageWrapper
              location={location}
              setLocation={setLocation}
              isLoadingLocation={isLoadingLocation}
              onUseMyLocation={handleUseMyLocation}
              latitude={latitude}
              longitude={longitude}
            />
          }
        />
      <Route path="/signin" element={<SignInPage />} />
      <Route path="/memberships" element={<MembershipsPage />} />
      <Route path="/concierge" element={<ConciergePage />} />
        <Route path="/treatments" element={<TreatmentsPage latitude={latitude} longitude={longitude} />} />
      <Route path="/salon/:id" element={<SalonDetailsPage />} />
      <Route path="/checkout" element={<CheckoutPage />} />
      <Route path="/booking-confirmation/:id" element={<BookingConfirmationPage />} />
      <Route path="/my-bookings" element={<MyBookingsPage />} />
    </Routes>
  );
}

function InnerApp() {
  return (
    <>
      <Navbar />
      <AppRoutes />
    </>
  );
}

function App() {
  return (
    <BrowserRouter>
      <InnerApp />
    </BrowserRouter>
  );
}

export default App;
