import React, { useState, useEffect } from "react";
import Image from "next/image";
import { Search, MapPin, ChevronDown, X } from "lucide-react";
import Logo from "../../../public/logo.png";

const Navbar = ({ onCommoditySelect, onFilterChange }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedLocation, setSelectedLocation] = useState({
    state: "",
    district: "",
    market: "",
  });
  const [isLocationOpen, setIsLocationOpen] = useState(false);
  const [filteredCommodities, setFilteredCommodities] = useState([]);
  const [isSearchFocused, setIsSearchFocused] = useState(false);

  const getLocationData = () => {
    return {
      Maharashtra: {
        Pune: ["Pune Market", "Khadki Market"],
        Mumbai: ["Dadar Market", "Byculla Market"],
      },
      Karnataka: {
        Bangalore: ["KR Market", "Yeshwanthpur Market"],
        Mysore: ["Devaraja Market", "Bandipalya Market"],
      },
    };
  };

  const locationData = getLocationData();
  const states = Object.keys(locationData);

  const getCommodities = () => {
    return [
      {
        id: 1,
        name: "Tomato",
        variety: "Local",
        grade: "A",
        image: "/tomato.jpg",
      },
      {
        id: 2,
        name: "Onion",
        variety: "Red",
        grade: "Premium",
        image: "/onion.jpg",
      },
      // more commodities...
    ];
  };

  useEffect(() => {
    const commodities = getCommodities();
    const filtered = commodities.filter(
      (commodity) =>
        commodity.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        commodity.variety.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredCommodities(filtered);
    onFilterChange({ filtered, topRated: commodities });
  }, [searchTerm, onFilterChange]);

  const handleSearch = (e) => {
    e.preventDefault();
    const selected = filteredCommodities[0];
    if (selected) {
      onCommoditySelect(selected);
    }
  };

  const handleLocationSelect = (type, value) => {
    setSelectedLocation((prev) => {
      const newLocation = { ...prev, [type]: value };
      if (type === "state") {
        newLocation.district = "";
        newLocation.market = "";
      } else if (type === "district") {
        newLocation.market = "";
      }
      return newLocation;
    });

    if (type === "market") {
      setIsLocationOpen(false);
      onFilterChange({ location: selectedLocation });
    }
  };

  return (
    <nav className="sticky top-0 z-20 bg-white bg-opacity-40 backdrop-filter backdrop-blur-lg shadow-md transition-all duration-300 ease-in-out h-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-center items-center h-16 space-x-10">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center">
            <Image
              src={Logo}
              alt="Krishi Saathi Logo"
              width={40}
              height={40}
              className="transition-transform duration-300 ease-in-out hover:scale-110"
            />
            <span className="ml-3 text-xl font-bold text-green-700 hover:text-green-600 transition-colors duration-300">
              Krishi Saathi
            </span>
          </div>

          {/* Search bar */}
          <div className="max-w-lg w-full lg:max-w-xs relative">
            <form onSubmit={handleSearch} className="relative">
              <input
                type="text"
                placeholder="Search for commodities..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onFocus={() => setIsSearchFocused(true)}
                onBlur={() => setTimeout(() => setIsSearchFocused(false), 200)}
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-2 focus:ring-green-500 focus:border-green-500 sm:text-sm transition-all duration-300 ease-in-out"
              />
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              {searchTerm && (
                <button
                  type="button"
                  onClick={() => setSearchTerm("")}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                >
                  <X className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                </button>
              )}
            </form>
            {isSearchFocused && filteredCommodities.length > 0 && (
              <div className="absolute z-10 mt-1 w-full bg-white shadow-lg max-h-60 rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm">
                {filteredCommodities.map((commodity) => (
                  <div
                    key={commodity.id}
                    className="cursor-pointer select-none relative py-2 pl-3 pr-9 hover:bg-green-50 flex items-center"
                    onClick={() => {
                      onCommoditySelect(commodity);
                      setSearchTerm("");
                    }}
                  >
                    <Image
                      src={commodity.image}
                      alt={commodity.name}
                      width={40}
                      height={40}
                      className="rounded-full mr-3"
                    />
                    <div>
                      <span className="font-medium block truncate">
                        {commodity.name}
                      </span>
                      <span className="text-gray-500 block text-sm">
                        {commodity.variety} - Grade {commodity.grade}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Location select */}
          <div className="ml-4 flex items-center">
            <div className="relative">
              <button
                onClick={() => setIsLocationOpen(!isLocationOpen)}
                className="flex items-center text-sm font-medium text-gray-700 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-all duration-300 ease-in-out"
              >
                <MapPin className="mr-1 h-5 w-5 text-gray-400" />
                <span className="hidden md:inline">
                  {selectedLocation.market ||
                    selectedLocation.district ||
                    selectedLocation.state ||
                    "Select Location"}
                </span>
                <span className="md:hidden">Location</span>
                <ChevronDown
                  className={`ml-1 h-4 w-4 text-gray-400 transition-transform duration-300 ${
                    isLocationOpen ? "transform rotate-180" : ""
                  }`}
                />
              </button>

              {isLocationOpen && (
                <div className="origin-top-right absolute right-0 mt-2 w-64 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none transition-all duration-300 ease-in-out">
                  <div
                    className="py-1"
                    role="menu"
                    aria-orientation="vertical"
                    aria-labelledby="options-menu"
                  >
                    {!selectedLocation.state && (
                      <>
                        <div className="px-4 py-2 text-sm font-semibold text-gray-700 bg-gray-100">
                          Select State
                        </div>
                        {states.map((state, index) => (
                          <button
                            key={index}
                            onClick={() => handleLocationSelect("state", state)}
                            className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-green-50 hover:text-gray-900 transition-colors duration-150 ease-in-out"
                            role="menuitem"
                          >
                            {state}
                          </button>
                        ))}
                      </>
                    )}
                    {selectedLocation.state && !selectedLocation.district && (
                      <>
                        <div className="px-4 py-2 text-sm font-semibold text-gray-700 bg-gray-100">
                          Select District
                        </div>
                        {Object.keys(locationData[selectedLocation.state]).map(
                          (district, index) => (
                            <button
                              key={index}
                              onClick={() =>
                                handleLocationSelect("district", district)
                              }
                              className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-green-50 hover:text-gray-900 transition-colors duration-150 ease-in-out"
                              role="menuitem"
                            >
                              {district}
                            </button>
                          )
                        )}
                      </>
                    )}
                    {selectedLocation.state && selectedLocation.district && (
                      <>
                        <div className="px-4 py-2 text-sm font-semibold text-gray-700 bg-gray-100">
                          Select Market
                        </div>
                        {locationData[selectedLocation.state][
                          selectedLocation.district
                        ].map((market, index) => (
                          <button
                            key={index}
                            onClick={() =>
                              handleLocationSelect("market", market)
                            }
                            className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-green-50 hover:text-gray-900 transition-colors duration-150 ease-in-out"
                            role="menuitem"
                          >
                            {market}
                          </button>
                        ))}
                      </>
                    )}
                    {selectedLocation.state && (
                      <button
                        onClick={() =>
                          setSelectedLocation({
                            state: "",
                            district: "",
                            market: "",
                          })
                        }
                        className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 hover:text-red-700 transition-colors duration-150 ease-in-out"
                        role="menuitem"
                      >
                        Clear Selection
                      </button>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
