import { useState } from "react";
import { useEffect } from "react";

function Statedropdown() {
    const [states, showStates] = useState([])
    const [state, selectState] = useState("")
    const [district, showdistrict] = useState([])
    const [districts, selectDistricts] = useState("")

    useEffect(() => {
        fetch("/api/states").then(res => res.json())
        .then(data => {
            showStates(data)
        })
    }, [])
    useEffect(() => {
        if(!state) return;

        fetch(`/api/districts/${encodeURIComponent(state)}`)
        .then(res => res.json())
        .then(data => {
            showdistrict(data)
        })
    }, [state])
    return (
        <>
            <select onChange={(e) => selectState(e.target.value)} className="w-full mb-3 p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-400 outline-none transition text-black">
                <option value="">Select State</option>
                {
                    states.map((item, index) => (
                        <option key={index} value={item}>
                            {item}
                        </option>
                    ))
                }

            </select>

             <select onChange={(e) => selectDistricts(e.target.value)} className="w-full mb-3 p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-400 outline-none transition text-black">
                <option value="">Select District</option>
                {
                    district.map((item, index) => (
                        <option key={index} value={item}>
                            {JSON.stringify(item["State Name"])}
                        </option>
                    ))
                }
            </select>
        </>
    )
}

export default Statedropdown