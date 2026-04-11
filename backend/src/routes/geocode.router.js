import express from "express"
import getGeocode from "../controller/geocode.controller.js"

const geocodeRoute = express.Router()

geocodeRoute.get("/", getGeocode)

export default geocodeRoute;