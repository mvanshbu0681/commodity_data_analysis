"use client";
import React, { useState, useEffect } from "react";
import csvData from 'F:/Education/COLLEGE/PROGRAMING/Python/PROJECTS/CommodityDataAnalysisProject/Silver/2024/8/31/Silver_commoditydata_31082024.csv';
import Select from "react-select";

function Navbar({ onCommoditySelect, onFilterChange }) {
  const [selectedState, setSelectedState] = useState("");
  const [selectedDistrict, setSelectedDistrict] = useState("");
  const [selectedMarket, setSelectedMarket] = useState("");
  const [commodities, setCommodities] = useState([]);
  const [filteredCommodities, setFilteredCommodities] = useState([]);
  const [selectedCommodity, setSelectedCommodity] = useState(null);

  useEffect(() => {
    // Process the CSV data
    setCommodities(csvData);
  }, []);

  const states = [...new Set(csvData.map(item => item.State))];
  const districts = selectedState
    ? [...new Set(csvData.filter(item => item.State === selectedState).map(item => item.District))]
    : [];
  const markets = selectedDistrict
    ? [...new Set(csvData.filter(item => item.District === selectedDistrict).map(item => item.Market))]
    : [];
  const markets = selectedDistrict
    ? [...new Set(csvData.filter(item => item.District === selectedDistrict).map(item => item.Market))]
    : [];

  // Filter commodities based on selected state, district, and market
  useEffect(() => {
    if (selectedState && selectedDistrict && selectedMarket && selectedCommodity) {
      const filtered = csvData.filter(
        item =>
          item.State === selectedState &&
          item.District === selectedDistrict &&
          item.Market === selectedMarket
      );
      const topRated = csvData.filter(
        item =>
          item.Commodity === selectedCommodity
      );
      setFilteredCommodities(filtered);
      onFilterChange({ filtered, topRated });
    } else {
      setFilteredCommodities([]);
      onFilterChange({ filtered: [] });
    }
  }, [selectedState, selectedDistrict, selectedMarket, selectedCommodity, onFilterChange]);

  const commodityOptions = filteredCommodities.map(item => ({
    value: item,
    label: `${item.Commodity} - ${item.Variety} (${item.Grade})`
  }));

  const handleCommodityChange = (selectedOption) => {
    setSelectedCommodity(selectedOption);
    onCommoditySelect(selectedOption ? selectedOption.value : null);
  };

  return (
    <nav className="sticky top-0 z-10 bg-white backdrop-filter backdrop-blur-2xl bg-opacity-10 shadow-2xl border-slate-800">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <a href="/" className="flex items-center gap-3">
          <span className="lg:text-3xl text-xl text-black font-semibold">
            Krishi Saathi
          </span>
        </a>

        <div className="w-full md:w-auto md:order-1 md:flex">
          <ul className="flex flex-col md:flex-row md:space-x-8 items-center">
            <div className="flex space-x-4 text-black items-center">
              {/* Add your links here */}
            </div>

            <div className="flex space-x-4">
              <select
                value={selectedState}
                onChange={(e) => setSelectedState(e.target.value)}
                className="block p-2 text-sm border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="" disabled>Select State</option>
                {states.map((state) => (
                  <option key={state} value={state}>
                    {state}
                  </option>
                ))}
              </select>

              <select
                value={selectedDistrict}
                onChange={(e) => setSelectedDistrict(e.target.value)}
                className="block p-2 text-sm border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500"
                disabled={!selectedState}
              >
                <option value="" disabled>Select District</option>
                {districts.map((district) => (
                  <option key={district} value={district}>
                    {district}
                  </option>
                ))}
              </select>

              <select
                value={selectedMarket}
                onChange={(e) => setSelectedMarket(e.target.value)}
                className="block p-2 text-sm border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500"
                disabled={!selectedDistrict}
              >
                <option value="" disabled>Select Market</option>
                {markets.map((market) => (
                  <option key={market} value={market}>
                    {market}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex space-x-4">
              <Select
                options={commodityOptions}
                placeholder="Select Commodity"
                isClearable
                value={selectedCommodity}
                onChange={handleCommodityChange}
                className="w-full text-sm border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
