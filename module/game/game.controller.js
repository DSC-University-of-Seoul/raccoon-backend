import { gameModel } from "./game.model";
import { quizModel } from "./quiz.model";
import { StatusCodes, ReasonPhrases } from "http-status-codes";

const gameController = {};

gameController.createGame = async (req, res) => {
  try {
    let gameName = req.body.name;
    let quizs = req.body.quizIds;
    let quizIds = [];

    for (let quiz of quizs) {
      const tmp = await quizModel.create(quiz);
      quizIds.push(tmp._id);
    }

    const createBody = await gameModel.create({
      name: gameName,
      quizIds: quizIds,
    });
    return res.json(createBody);
  } catch (error) {
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: error.toString() });
  }
};

gameController.findAll = async (req, res) => {
  try {
    const games = await gameModel
      .find()
      .populate({ path: "quizIds", model: "quiz" })
      .exec();
    return res.json(games);
  } catch (error) {
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: error.toString() });
  }
};

export { gameController };
