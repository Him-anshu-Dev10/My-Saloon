import React, { useState, useRef, useEffect } from "react";
import { ChevronDown } from "lucide-react";

export interface Country {
  code: string;
  name: string;
  flag: string;
  dialCode: string;
}

export const countries: Country[] = [
  { code: "IN", name: "India", flag: "🇮🇳", dialCode: "+91" },
  { code: "US", name: "United States", flag: "🇺🇸", dialCode: "+1" },
  { code: "GB", name: "United Kingdom", flag: "🇬🇧", dialCode: "+44" },
  { code: "AU", name: "Australia", flag: "🇦🇺", dialCode: "+61" },
  { code: "CA", name: "Canada", flag: "🇨🇦", dialCode: "+1" },
  { code: "AE", name: "United Arab Emirates", flag: "🇦🇪", dialCode: "+971" },
];

interface CountryCodeSelectorProps {
  selectedCountry: string; // dialCode
  onChange: (dialCode: string) => void;
}

export const CountryCodeSelector: React.FC<CountryCodeSelectorProps> = ({
  selectedCountry,
  onChange,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const selected =
    countries.find((c) => c.dialCode === selectedCountry) || countries[0];

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 bg-[#F6F5F2] border border-transparent focus:border-[#C49B89] focus:ring-1 focus:ring-[#C49B89] focus:bg-white rounded-l-xl px-4 py-3.5 outline-none transition-all text-stone-700 h-full w-[110px] justify-between"
      >
        <span className="flex items-center gap-2 text-base">
          {selected.flag} {selected.dialCode}
        </span>
        <ChevronDown size={14} className="text-stone-400" />
      </button>

      {isOpen && (
        <div className="absolute z-10 top-full left-0 mt-2 w-[280px] bg-white border border-stone-200 rounded-xl shadow-xl overflow-hidden py-2 max-h-60 overflow-y-auto">
          {countries.map((country) => (
            <button
              key={country.code}
              type="button"
              onClick={() => {
                onChange(country.dialCode);
                setIsOpen(false);
              }}
              className={`w-full flex items-center justify-between px-4 py-3 hover:bg-[#F6F5F2] transition-colors ${
                selectedCountry === country.dialCode ? "bg-[#F9F4F2]" : ""
              }`}
            >
              <div className="flex items-center gap-3">
                <span className="text-xl">{country.flag}</span>
                <span className="text-stone-700 text-sm font-medium">
                  {country.name}
                </span>
              </div>
              <span className="text-stone-500 text-sm">{country.dialCode}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};
