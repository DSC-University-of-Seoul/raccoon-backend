import express from 'express';
import gameController from './game.controller';
import { asyncWrapper } from '../../utils/asyncWrapper';

const gameRoutes = express.Router();

gameRoutes.get('/:gameId', asyncWrapper(gameController.findGame));
gameRoutes.put('/:gameId', asyncWrapper(gameController.updateGame));
gameRoutes.delete('/:gameId', asyncWrapper(gameController.deleteGame));

export { gameRoutes };
