import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const quizSchema = new Schema({
	quizDesc: {
		type: String,
		required: true,
	},
	chooseDesc: {
		type: [String],
		required: false,
		default: ['', '', '', ''],
	},
	answer: {
		type: Number,
		required: true,
	},
});

const quizModel = mongoose.model('quiz', quizSchema);
export { quizModel };
