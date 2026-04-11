import { useState, useEffect } from "react";

function Statedropdown() {
    const [states, showStates] = useState([]);
    const [state, selectState] = useState("");

    const [district, showdistrict] = useState([]);
    const [districts, selectDistricts] = useState("");

    const [rivers, showRivers] = useState([]);

    const handleStateChange = (value) => {
        selectState(value);
        showdistrict([]);
        selectDistricts("");
        showRivers([]);
    };

    const handleDistrictChange = (value) => {
        selectDistricts(value);
        showRivers([]);
    };

    useEffect(() => {
        fetch("/api/states")
            .then(res => res.json())
            .then(data => {
                showStates(data);
            });
    }, []);

    useEffect(() => {
        if (!state) return;

        fetch(`/api/districts/${encodeURIComponent(state)}`)
            .then(res => res.json())
            .then(data => {
                showdistrict(data);
            });
    }, [state]);

    useEffect(() => {
        if (!state || !districts) return;

        fetch(`/api/rivers?state=${encodeURIComponent(state)}&districts=${encodeURIComponent(districts)}`)
            .then(res => res.json())
            .then(data => {
                showRivers(data);
            });
    }, [state, districts]);

    return (
        <>
            <select
                onChange={(e) => handleStateChange(e.target.value)}
                value={state}
                className="w-full mb-3 p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-400 outline-none transition text-black"
            >
                <option value="">Select State</option>
                {states.map((item, index) => (
                    <option key={index} value={item}>
                        {item}
                    </option>
                ))}
            </select>

            <select
                onChange={(e) => handleDistrictChange(e.target.value)}
                value={districts}
                className="w-full mb-3 p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-400 outline-none transition text-black"
            >
                <option value="">Select District</option>
                {district.map((item, index) => (
                    <option key={index} value={item["District"]}>
                        {item["District"]}
                    </option>
                ))}
            </select>

            <select
                className="w-full mb-3 p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-400 outline-none transition text-black"
            >
                <option value="">Select Monitoring Location</option>
                {rivers.map((item, index) => (
                    <option
                        key={item["Monitoring Location"] + index}
                        value={item["Monitoring Location"]}
                    >
                        {item["Monitoring Location"]}
                    </option>
                ))}
            </select>
        </>
    );
}

export default Statedropdown;