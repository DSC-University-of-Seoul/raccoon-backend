import express from "express";
import { gameController } from "./game.controller";
import { asyncWrapper } from "../../utils/asyncWrapper";

const gameRoutes = express.Router();

gameRoutes.post("/", asyncWrapper(gameController.createGame));
gameRoutes.get("/", asyncWrapper(gameController.findAll));

export { gameRoutes };
