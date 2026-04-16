import supabase from "../database/supabaseConfig.js"

const monitoringLocation = async (req, res) => {
    let {state, districts} = req.query
    state = decodeURIComponent(state || "").trim()
    districts = decodeURIComponent(districts || "").trim()

    const { data, error } = await supabase
    .from("water_quality_data")
    .select('"Monitoring Location", lattitude, longitude')
    .ilike('"State Name"', `%${state.trim()}%`)
    .ilike("District", districts)

    if(error){
        return res.status(500).json({error})
    }

    return res.json(data)
}

export default monitoringLocation;