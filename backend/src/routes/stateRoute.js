import express from "express"
import stateFetch from "../controller/stateFetch.controller.js";
const router = express.Router();

router.get("/states", stateFetch)

export default router;