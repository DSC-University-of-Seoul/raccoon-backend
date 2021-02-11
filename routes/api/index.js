import express from "express";
import { todoRoutes } from "../../module/todo/todo.routes";
import { gameRoutes } from "../../module/game/game.routes";

const apiRoutes = express.Router();

apiRoutes.use("/todos", todoRoutes);
apiRoutes.use("/game", gameRoutes);

export default apiRoutes;
