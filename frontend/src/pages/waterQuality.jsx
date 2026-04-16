import { useState } from "react";
import MapView from "../components/mapview";
import ResultCard from "../components/ResultCard";
import Dropdown from "../components/dropdown";

function WaterQuality() {
  const [display, showDisplay] = useState(false);
  const [usage, setUsage] = useState("");

  const [state, setState] = useState("");
  const [district, setDistrict] = useState("");
  const [river, setRiver] = useState("");

  return (
    <div className="flex gap-6 h-screen p-6 bg-gradient-to-br from-blue-50 via-white to-blue-100">

      {/* Map Area */}
      <div className="flex-1 h-full rounded-2xl overflow-hidden shadow-xl border border-gray-200">
        <MapView 
          state={state}
          district={district}
          river={river}
        />
      </div>

      {/* Right Panel */}
      <div className="flex flex-col gap-4 w-96">

        <div className="backdrop-blur-xl bg-white/70 border border-white/40 rounded-2xl shadow-lg p-6">

          <h2 className="text-xl font-semibold mb-5 text-gray-800">
            Check Water Quality
          </h2>

          {/* PASS SETTERS */}
          <Dropdown 
            setState={setState}
            setDistrict={setDistrict}
            setRiver={setRiver}
          />

          <select
            value={usage}
            onChange={(e) => setUsage(e.target.value)}
            className="w-full mb-4 p-3 rounded-lg border border-gray-300"
          >
            <option value="">Usage</option>
            <option value="A">Drinking Water</option>
            <option value="B">Outdoor Bathing</option>
            <option value="C">After Treatment</option>
            <option value="D">Wildlife</option>
            <option value="E">Irrigation</option>
          </select>

          <button
            onClick={() => showDisplay(true)}
            className="w-full bg-blue-600 text-white py-3 rounded-lg"
          >
            Check Quality
          </button>
        </div>

        {display && (
          <div className="bg-white p-6 rounded-2xl shadow-lg">
            <ResultCard />
          </div>
        )}

      </div>
    </div>
  );
}

export default WaterQuality;