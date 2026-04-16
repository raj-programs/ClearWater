import express from "express";
import waterQuality from "../controller/waterQuality.controller.js";

const waterQualityRoute = express.Router();

waterQualityRoute.get("/", waterQuality);

export default waterQualityRoute;
