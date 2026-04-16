import { useState, useEffect } from "react";

function Dropdown({ setState, setDistrict, setRiver }) {

    const [states, showStates] = useState([]);
    const [state, selectState] = useState("");

    const [district, showdistrict] = useState([]);
    const [districts, selectDistricts] = useState("");

    const [rivers, showRivers] = useState([]);

    const handleStateChange = (value) => {
        selectState(value);
        setState(value);              //send to parent
        showdistrict([]);
        selectDistricts("");
        showRivers([]);
    };

    const handleDistrictChange = (value) => {
        selectDistricts(value);
        setDistrict(value);           //send to parent
        showRivers([]);
    };

    const handleRiverChange = (value) => {
        setRiver(value);              //send to parent
    };

    useEffect(() => {
        fetch("/api/states")
            .then(res => res.json())
            .then(showStates);
    }, []);

    useEffect(() => {
        if (!state) return;

        fetch(`/api/districts/${encodeURIComponent(state)}`)
            .then(res => res.json())
            .then(showdistrict);
    }, [state]);

    useEffect(() => {
        if (!state || !districts) return;

        fetch(`/api/rivers?state=${encodeURIComponent(state)}&districts=${encodeURIComponent(districts)}`)
            .then(res => res.json())
            .then(showRivers);
    }, [state, districts]);

    return (
        <>
            <select onChange={(e) => handleStateChange(e.target.value)} value={state}>
                <option value="">Select State</option>
                {states.map((item, i) => (
                    <option key={i} value={item}>{item}</option>
                ))}
            </select>

            <select onChange={(e) => handleDistrictChange(e.target.value)} value={districts}>
                <option value="">Select District</option>
                {district.map((item, i) => (
                    <option key={i} value={item["District"]}>
                        {item["District"]}
                    </option>
                ))}
            </select>

            <select onChange={(e) => handleRiverChange(e.target.value)}>
                <option value="">Select Monitoring Location</option>
                {rivers.map((item, i) => (
                    <option key={i} value={item["Monitoring Location"]}>
                        {item["Monitoring Location"]}
                    </option>
                ))}
            </select>
        </>
    );
}

export default Dropdown;