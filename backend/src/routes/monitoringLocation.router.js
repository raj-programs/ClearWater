import express from "express"
import monitoringLocation from "../controller/monitoringLocation.controller.js";

const monitoringLocationRoute = express.Router()

monitoringLocationRoute.get("/rivers", monitoringLocation)

export default monitoringLocationRoute;