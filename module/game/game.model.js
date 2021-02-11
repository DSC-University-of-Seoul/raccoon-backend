import mongoose from "mongoose";

const Schema = mongoose.Schema;

const gameSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  quizIds: {
    type: [{ type: Schema.Types.ObjectId, ref: "quiz" }],
    required: false,
  },
});

const gameModel = mongoose.model("game", gameSchema);
export { gameModel };
