import districtFetch from "../controller/districtFetch.controller.js";
import express from "express";

const districtRoute = express.Router();

districtRoute.get("/districts/:state", districtFetch)

export default districtRoute;