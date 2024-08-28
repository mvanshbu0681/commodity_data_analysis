import React from "react";

const MLTable = () => {
  const forecastData = [
    { date: "Aug 27", Price: 8900.3 },
    { date: "Aug 28", Price: 5000.9 },
    { date: "Aug 29", Price: 1200.29 },
    { date: "Aug 30", Price: 6800.89 },
    { date: "Aug 31", Price: 4785.41 },
    { date: "Aug 31", Price: 4785.41 },
  ];

  return (
    <div className="relative w-full h-[500px] flex justify-end">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-2xl">
        {" "}
        {/* Increase the max width to xl */}
        <h2 className="text-2xl font-semibold text-blue-600 mb-4">
          Commodity Pricing Plan
        </h2>
        <p className="text-sm text-gray-600 mb-6">
          Future commodity pricing is based on historical data.
        </p>
        <div className="bg-blue-500 text-white py-2 px-4 rounded-full text-center mb-6">
          Pricing of Commodity
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
          {forecastData.map((item, index) => (
            <div
              key={index}
              className="bg-green-100 p-4 rounded-lg shadow-md text-center"
            >
              <p className="text-gray-800 font-medium mb-2">{item.date}</p>
              <div className="bg-green-300 py-2 px-4 rounded-lg text-lg font-semibold">
                {item.Price.toFixed(2)}
              </div>
              <p className="text-gray-600 mt-2">INR/100kg</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MLTable;
