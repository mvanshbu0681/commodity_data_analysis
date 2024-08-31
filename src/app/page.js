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
      <div className="w-3/4 mx-auto flex flex-col">
        {/* Adjust the layout to have two columns */}
        <div className="flex flex-row justify-between gap-2">
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
      <div className="w-3/4 mx-auto flex gap-8">
        <MLTable />
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3500.8859420014956!2d77.2095036749579!3d28.663133632691288!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390cfd7400d9a88d%3A0xc003bcf8723bef94!2sAzad%20Market%2C%20Delhi%2C%20110006!5e0!3m2!1sen!2sin!4v1725115370555!5m2!1sen!2sin"
          width="620"
          height="500"
          style={{ border: 0, borderRadius: "20px" }}
          allowfullscreen=""
          className="mx-auto"
          loading="lazy"
          referrerpolicy="no-referrer-when-downgrade"
        ></iframe>
      </div>
      <div className="flex flex-col mt-8">
        <Component />
      </div>
    </div>
  );
}
