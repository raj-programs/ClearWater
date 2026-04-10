import districtFetch from "../controller/districtFetch.controller.js";
import express from "express";

const router = express.Router();

router.get("/districts/:state", districtFetch)

export default router;