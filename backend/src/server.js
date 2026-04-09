import express from "express"
import dotenv from "dotenv"
import geocodeRoute from "./controller/geocode.controller.js"

dotenv.config()
const app = express()

app.use("/geocode", geocodeRoute)

app.get("/", (req, res) => {
    res.send("Server Running...")
})

const port = process.env.PORT || 3000

app.listen(port, () => {
    console.log(`http://localhost:${port}`);
})