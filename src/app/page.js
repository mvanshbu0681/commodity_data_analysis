"use client";
import React, { useState } from "react";
import Hero from "./_component/Hero";
import Navbar from "./_component/Navbar";
import TopMarkets from "./_component/TopMarkets";
import MarketMap from "./_component/MarketMap";
import { ContainerWithChildren } from "postcss/lib/container";

export default function Home() {
  const [selectedCommodityData, setSelectedCommodityData] = useState(null);
  const [topMarkets, setTopMarkets] = useState([]);

  const handleCommoditySelect = (commodityData) => {
    setSelectedCommodityData(commodityData);
  };

  const handleFilterChange = ({ filtered, topRated}) => {

    const selectedMarket = selectedCommodityData?.Market;

    // Filter out the selected market
    const otherMarkets = filtered.filter(item => item.Market !== selectedMarket);

    // Sort the remaining markets by Modal_Price and take the top 5
    const topMarkets = topRated ? topRated?.sort((a, b) => b.Modal_Price - a.Modal_Price)
      .slice(0, 5)
      .map(item => ({
        name: item.Market,
        price: item.Modal_Price,
        state: item.State,
        district: item.District,
      })): [];

    setTopMarkets(topMarkets);
  };

  return (
    <div>
      <Navbar onCommoditySelect={handleCommoditySelect} onFilterChange={handleFilterChange} />
      <div className="flex w-full">
      <div className="flex-1 p-4">
        {selectedCommodityData && (
          <Hero
            commodityName={selectedCommodityData.Commodity}
            variety={selectedCommodityData.Variety}
            lastUpdate={selectedCommodityData.Arrival_Date}
            price={selectedCommodityData.Modal_Price}
            unit="Quintal"
          />
        )}
      </div>
      <div className="flex-1 p-4">
        {topMarkets.length > 0 && (
          
          <TopMarkets
            title={`Top 5 Markets for ${selectedCommodityData?.Commodity || "Commodity"}`}
            markets={topMarkets}
            priceLabel="Price"
          />
        )}
      </div>
    </div>
    {/* <div
          className="w-full z-0 shadow-custom-shadow rounded-2xl bg-white"
          style={{ paddingRight: "20px" }}
        >
          <MarketMap />
        </div> */}
    </div>
  );
}
