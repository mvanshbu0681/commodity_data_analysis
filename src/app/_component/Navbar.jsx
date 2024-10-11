import React, { useState, useEffect } from "react";
import Image from "next/image";
import { Search, MapPin, ChevronDown, X } from "lucide-react";
import Logo from "../../../public/logo.png";
import Papa from "papaparse";

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
  const [locationData, setLocationData] = useState({});

  useEffect(() => {
    fetch("/data/commoditydata.csv")
      .then((response) => response.text())
      .then((csvText) => {
        Papa.parse(csvText, {
          header: true,
          complete: (results) => {
            const data = results.data;
            const locationData = data.reduce((acc, row) => {
              const { state, district, market } = row;
              if (!acc[state]) acc[state] = {};
              if (!acc[state][district]) acc[state][district] = [];
              acc[state][district].push(market);
              return acc;
            }, {});
            setLocationData(locationData);
          },
        });
      });
  }, []);

  const states = Object.keys(locationData);

  const getCommodities = () => {
    return [
      {
        id: 1,
        name: "Tomato",
        variety: "Local",
        grade: "A",
        image: "/Tomato.jpeg",
      },
      {
        id: 2,
        name: "Onion",
        variety: "Red",
        grade: "Premium",
        image: "/onion.jpg",
      },
      {
        id: 3,
        name: "Potato",
        variety: "White",
        grade: "B",
        image: "/potato.jpeg",
      },
      {
        id: 4,
        name: "Carrot",
        variety: "Orange",
        grade: "A",
        image: "/carrot.jpeg",
      },
      {
        id: 5,
        name: "Cabbage",
        variety: "Green",
        grade: "A",
        image: "/cabbage.jpeg",
      },
      {
        id: 6,
        name: "Cauliflower",
        variety: "White",
        grade: "A",
        image: "/cauliflower.jpeg",
      },
      {
        id: 7,
        name: "Spinach",
        variety: "Green",
        grade: "A",
        image: "/spinach.jpeg",
      },
      {
        id: 8,
        name: "Broccoli",
        variety: "Green",
        grade: "A",
        image: "/broccoli.jpeg",
      },
      {
        id: 9,
        name: "Peas",
        variety: "Green",
        grade: "A",
        image: "/peas.jpeg",
      },
      {
        id: 10,
        name: "Capsicum",
        variety: "Green",
        grade: "A",
        image: "/capsicum.jpeg",
      },
      {
        id: 11,
        name: "Brinjal",
        variety: "Purple",
        grade: "A",
        image: "/brinjal.jpeg",
      },
      {
        id: 12,
        name: "Pumpkin",
        variety: "Orange",
        grade: "A",
        image: "/pumpkin.jpeg",
      },
      {
        id: 13,
        name: "Radish",
        variety: "White",
        grade: "A",
        image: "/radish.jpeg",
      },
      {
        id: 14,
        name: "Beetroot",
        variety: "Red",
        grade: "A",
        image: "/beetroot.jpeg",
      },
      {
        id: 15,
        name: "Garlic",
        variety: "White",
        grade: "A",
        image: "/garlic.jpeg",
      },
      {
        id: 16,
        name: "Ginger",
        variety: "Brown",
        grade: "A",
        image: "/ginger.jpeg",
      },
      {
        id: 17,
        name: "Chilli",
        variety: "Green",
        grade: "A",
        image: "/chilli.jpeg",
      },
      {
        id: 18,
        name: "Cucumber",
        variety: "Green",
        grade: "A",
        image: "/cucumber.jpeg",
      },
      {
        id: 19,
        name: "Lettuce",
        variety: "Green",
        grade: "A",
        image: "/lettuce.jpeg",
      },
      {
        id: 20,
        name: "Mushroom",
        variety: "White",
        grade: "A",
        image: "/mushroom.jpeg",
      },
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
    <nav className="sticky top-0 z-20 bg-white bg-opacity-40 shadow-md transition-all duration-300 ease-in-out backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <div className="flex-shrink-0 flex items-center">
            <Image
              src={Logo}
              alt="Krishi Saathi Logo"
              width={48}
              height={48}
              className="transition-transform duration-300 ease-in-out hover:scale-110"
            />
            <span className="ml-3 text-2xl font-bold text-green-700 hover:text-green-600 transition-colors duration-300">
              Krishi Saathi
            </span>
          </div>

          <div className="flex-1 flex items-center justify-center px-2 lg:ml-6 lg:justify-end">
            <div className="max-w-lg w-full lg:max-w-xs relative">
              <form onSubmit={handleSearch} className="relative">
                <input
                  type="text"
                  placeholder="Search for commodities..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  onFocus={() => setIsSearchFocused(true)}
                  onBlur={() =>
                    setTimeout(() => setIsSearchFocused(false), 200)
                  }
                  className="block w-full pl-12 pr-3 py-3 border border-gray-300 rounded-md leading-5 bg-white bg-opacity-90 placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-2 focus:ring-green-500 focus:border-green-500 sm:text-sm transition-all duration-300 ease-in-out"
                />
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search className="h-6 w-6 text-gray-400" />
                </div>
                {searchTerm && (
                  <button
                    type="button"
                    onClick={() => setSearchTerm("")}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  >
                    <X className="h-6 w-6 text-gray-400 hover:text-gray-600" />
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
          </div>

          <div className="ml-4 flex items-center">
            <div className="relative">
              <button
                onClick={() => setIsLocationOpen(!isLocationOpen)}
                className="flex items-center text-base font-medium text-gray-700 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-all duration-300 ease-in-out"
              >
                <MapPin className="mr-1 h-6 w-6 text-gray-400" />
                <span className="hidden md:inline">
                  {selectedLocation.market ||
                    selectedLocation.district ||
                    selectedLocation.state ||
                    "Select Location"}
                </span>
                <span className="md:hidden">Location</span>
                <ChevronDown
                  className={`ml-1 h-5 w-5 text-gray-400 transition-transform duration-300 ${
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
