import express from "express"
import getGeocode from "../controller/geocode.controller.js"

const router = express.Router()

router.get("/", getGeocode)

export default router;