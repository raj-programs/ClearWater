import supabase from "../database/supabaseConfig.js";
const districtFetch = async (req, res) => {
     const state = decodeURIComponent(req.params.state)

    const { data, error } = await supabase
    .from("State")
    .select("District")
    .ilike('"State Name"', state.trim())

    if(error){
        return res.status(500).json({error})
    }

    return res.json(data)
}

export default districtFetch;