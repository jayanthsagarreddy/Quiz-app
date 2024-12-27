const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    await mongoose.connect('mongodb://localhost:27017/quiz-app', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('MongoDB Connected');
  } catch (error) {
    console.error('MongoDB Connection Failed:', error.message);
    process.exit(1);
  }
};

module.exports = connectDB;
const mongoose = require('mongoose');

const QuestionSchema = new mongoose.Schema({
  topic: String,
  question: String,
  options: [String],
  correctAnswer: String,
});

module.exports = mongoose.model('Question', QuestionSchema);
const express = require('express');
const router = express.Router();
const Question = require('../models/Question');

// Get all questions
router.get('/', async (req, res) => {
  try {
    const questions = await Question.find();
    res.json(questions);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Add a question
router.post('/', async (req, res) => {
  const question = new Question({
    topic: req.body.topic,
    question: req.body.question,
    options: req.body.options,
    correctAnswer: req.body.correctAnswer,
  });

  try {
    const newQuestion = await question.save();
    res.status(201).json(newQuestion);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;
const express = require('express');
const connectDB = require('./config/db');
const quizRoutes = require('./routes/quizzes');
const cors = require('cors');

const app = express();
connectDB();

app.use(cors());
app.use(express.json());
app.use('/api/quizzes', quizRoutes);

app.listen(3000, () => {
  console.log('Server running on http://localhost:3000');
});
