import { gameModel } from './game.model';
import { quizModel } from './quiz.model';
import { StatusCodes, ReasonPhrases } from 'http-status-codes';

const gameController = {};

gameController.findGame = async (req, res) => {
	try {
		console.log(req.params.gameId);
		//해당 game 에 참조된 id를 quiz 데이터로 대체해서 response에 넣는다.
		const game = await gameModel
			.findOne({ _id: req.params.gameId })
			.populate({ path: 'quizIds', model: 'quiz' })
			.exec();
		if (!game) {
			return res
				.status(StatusCodes.BAD_REQUEST)
				.json({ message: 'Game not found' });
		}
		return res.json(game);
	} catch (error) {
		return res
			.status(StatusCodes.INTERNAL_SERVER_ERROR)
			.json({ error: error.toString() });
	}
};

gameController.updateGame = async (req, res) => {
	try {
		let game = await gameModel.findById(req.params.gameId);
		if (!game) {
			return res
				.status(StatusCodes.BAD_REQUEST)
				.json({ message: 'Game not found' });
		}
		// 수정된 game 퀴즈들을 퀴즈 collection에 추가
		let quizs = req.body.quizIds;
		let newQuizIds = [];
		for (let quiz of quizs) {
			const tmp = await new quizModel(quiz).save();
			newQuizIds.push(tmp._id);
		}
		//추가가 끝나면 추가된 퀴즈 Id와 나머지 업데이트 정보들로 game을 업데이트
		let updateBody = req.body;
		updateBody.quizIds = newQuizIds;
		Object.assign(game, updateBody);
		await game.save();
		return res.json(game);
	} catch (error) {
		return res
			.status(StatusCodes.INTERNAL_SERVER_ERROR)
			.json({ error: error.toString() });
	}
};

gameController.deleteGame = async (req, res) => {
	try {
		const game = await gameModel.findByIdAndDelete(req.params.gameId);
		if (!game) {
			return res
				.status(StatusCodes.BAD_REQUEST)
				.json({ message: 'Game not found' });
		}
		return res.json({ message: 'Game deleted successfully' });
	} catch (error) {
		return res
			.status(StatusCodes.INTERNAL_SERVER_ERROR)
			.json({ error: error.toString() });
	}
};

export default gameController;
