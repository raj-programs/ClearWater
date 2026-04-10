import supabase from "../database/supabaseConfig.js"

const stateFetch = async (req, res) => {
    const { data, error } = await supabase
    .from("State")
    .select('"State Name"')

    if (error) {
        return res.status(500).json({error})
    }

    const uniqueStates = [...new Set(data.map(d => d["State Name"]))];

    return res.json(uniqueStates)
    
}

export default stateFetch;