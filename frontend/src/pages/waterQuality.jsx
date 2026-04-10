import { useState } from "react";
import MapView from "../components/mapview";
import ResultCard from "../components/ResultCard";
import Statedropdown from "../components/stateDropdown";

function WaterQuality() {
  const [display, showDisplay] = useState(false);

  return (
    <div className="flex gap-6 h-screen p-6 bg-gradient-to-br from-blue-50 via-white to-blue-100">

      {/* Map Area */}
      <div className="flex-1 h-full rounded-2xl overflow-hidden shadow-xl border border-gray-200">
        <MapView />
      </div>

      {/* Right Panel */}
      <div className="flex flex-col gap-4 w-96">

        {/* Control Panel */}
        <div className="backdrop-blur-xl bg-white/70 border border-white/40 rounded-2xl shadow-lg p-6 transition hover:shadow-2xl">

          <h2 className="text-xl font-semibold mb-5 text-gray-800 tracking-wide">
            Check Water Quality
          </h2>

          {/* Dropdowns */}
          <Statedropdown />

          <select className="w-full mb-4 p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-400 outline-none transition">
            <option>Usage</option>
          </select>

          {/* Button */}
          <button
            onClick={() => showDisplay(true)}
            className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-3 rounded-lg font-medium tracking-wide shadow-md hover:scale-[1.02] hover:shadow-lg transition duration-200"
          >
            Check Quality
          </button>
        </div>

        {/* Result Card */}
        {display && (
          <div className="backdrop-blur-xl bg-white/70 border border-white/40 rounded-2xl shadow-lg p-6 animate-fade-in">
            <ResultCard />
          </div>
        )}

      </div>

    </div>
  );
}

export default WaterQuality;