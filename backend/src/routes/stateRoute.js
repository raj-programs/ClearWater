import express from "express"
import stateFetch from "../controller/stateFetch.controller.js";
const stateRoute = express.Router();

stateRoute.get("/states", stateFetch)

export default stateRoute;