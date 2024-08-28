import Image from "next/image";
import Navbar from "./_component/Navbar";
import Hero from "./_component/Hero";
import { Chart } from "./_component/Chart";
import dynamic from "next/dynamic";
//import { DataTable } from "./_component/DataTable/DataTable";
import MLTable from "./_component/MLTable";
import { Component } from "./_component/Mlchart";
//import Map from "./_component/Map";
//import { DataTable } from "./_component/DataTable/DataTable";

export default function Home() {
  return (
    <div>
      <Navbar />
      <div className="flex flex-col">
        {/* Adjust the layout to have two columns */}
        <div className="flex flex-row justify-between gap-8 p-8">
          {/* Hero Section */}
          <div className="flex-1">
            <Hero
              title="Essential Food Commodities Price:"
              subtitle="Real-time Commodity Pricing Uttar Pradesh"
              lastUpdate="2024-08-24 15:00:00"
              status="Satisfactory"
              price="8800"
              unit="per 100kg"
            />
          </div>

          <div className="flex-1">
            <Chart />
          </div>
        </div>
      </div>

      {/* <Map /> */}
      <div className="flex flex-col">
        <MLTable />
      </div>
      <div className="flex flex-col mt-8">
        <Component />
      </div>
    </div>
  );
}
