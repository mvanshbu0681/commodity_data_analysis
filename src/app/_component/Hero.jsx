import React from "react";

const Hero = ({ title, subtitle, lastUpdate, status, price, unit }) => {
  return (
    <div className="bg-white text-black p-10 rounded-lg w-[800px] ml-5 mt-5 shadow-lg pb-16 h-[450px]">
      <div className="text-4xl font-bold mb-5">{title}</div>
      <div className="text-2xl mb-10">{subtitle}</div>
      <div className="text-lg text-gray-400 mb-10">
        Last Update: {lastUpdate}
      </div>
      <div className="flex items-center justify-between">
        <div
          className={`bg-${
            status === "Satisfactory" ? "yellow-400" : "gray-400"
          } text-black px-10 py-5 rounded font-bold`}
        >
          {status}
        </div>
        <div className="flex items-center">
          <span
            className={`text-6xl font-bold ${
              status === "Satisfactory" ? "text-yellow-400" : "text-gray-400"
            } mr-5`}
          >
            {price}
          </span>
          <span className="text-xl text-black">({unit})</span>
        </div>
      </div>
    </div>
  );
};

export default Hero;
