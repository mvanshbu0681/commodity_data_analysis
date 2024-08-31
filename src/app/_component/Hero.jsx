import React from "react";

const Hero = ({ title, subtitle, lastUpdate, status, price, unit }) => {
  const statusColor =
    status === "Satisfactory" ? "bg-yellow-400" : "bg-gray-400";
  const priceColor =
    status === "Satisfactory" ? "text-yellow-400" : "text-gray-400";

  return (
    <div className="bg-white text-black p-12 rounded-xl mx-auto mt-8 shadow-2xl">
      <div className="text-4xl font-extrabold mb-4 border-b-4 border-yellow-400 pb-2">
        {title}
      </div>
      <div className="text-xl mb-6">{subtitle}</div>
      <div className="flex items-center justify-between">
        <div className="text-gray-500">Last Update: {lastUpdate}</div>
        <div
          className={`${statusColor} text-black p-2 rounded-3xl text-sm font-semibold`}
        >
          {status}
        </div>
      </div>

      <div className="flex items-end mt-8 text-yellow-900">
        <span className={`text-7xl font-extrabold mr-4`}>{price}</span>
        <span className="text-base mb-3">({unit})</span>
      </div>
    </div>
  );
};

export default Hero;
