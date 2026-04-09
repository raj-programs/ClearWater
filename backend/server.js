import express from "express"
import dotenv from "dotenv"
import cors from "cors"
import geocodeRoute from "./src/controller/geocode.controller.js"
import registerRoute from "./src/controller/register.controller.js"

dotenv.config()
const app = express()

app.use(cors())
app.use(express.json())
app.use("/geocode", geocodeRoute)
app.use("/api/register", registerRoute)

app.get("/", (req, res) => {
    res.send("Server Running...")
})

const port = process.env.PORT || 3000

app.listen(port, () => {
    console.log(`http://localhost:${port}`);
})