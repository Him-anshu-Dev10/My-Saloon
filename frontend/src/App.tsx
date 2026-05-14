import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import { LandingPageWrapper } from "./pages/LandingPage";
import Navbar from "./components/Navbar";
import { SalonDetailsPage } from "./pages/SalonDetailsPage";
import { CheckoutPage } from "./pages/CheckoutPage";
import SignInPage from "./pages/SignInPage";

function AppRoutes() {
  const [location, setLocation] = useState("");
  const [isLoadingLocation, setIsLoadingLocation] = useState(false);

  const handleUseMyLocation = () => {
    if (!navigator.geolocation) {
      alert("Geolocation is not supported by your browser");
      return;
    }

    setIsLoadingLocation(true);
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        try {
          const { latitude, longitude } = position.coords;
          const response = await fetch(
            `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`,
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
        } catch (error) {
          console.error("Error fetching location details:", error);
          setLocation(
            `${position.coords.latitude.toFixed(4)}, ${position.coords.longitude.toFixed(4)}`,
          );
        } finally {
          setIsLoadingLocation(false);
        }
      },
      (error) => {
        console.error("Error getting location:", error);
        alert("Unable to retrieve your location");
        setIsLoadingLocation(false);
      },
    );
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
          />
        }
      />
      <Route path="/signin" element={<SignInPage />} />
      <Route path="/salon/:id" element={<SalonDetailsPage />} />
      <Route path="/checkout" element={<CheckoutPage />} />
    </Routes>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <AppRoutes />
    </BrowserRouter>
  );
}

export default App;
