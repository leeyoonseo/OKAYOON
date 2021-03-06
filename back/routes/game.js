const express = require('express');
const router = express.Router();
const { NonsenseQuiz, CatchMind } = require('../models');
const { isAdminLoggedIn } = require('./middlewares');

const NONSENSE_QUIZ = 'nonsensequiz';
const CATCH_MIND = 'catchmind';

// [D] 넌센스퀴즈 데이터 가져오기
router.get('/nonsensequiz', async (req, res, next) => { // POST /game/nonsensequiz
    try {
        const quiz = await NonsenseQuiz.findAll();

        if (quiz.length < 1) {
            return res.status(404).send('퀴즈 데이터가 없습니다.');
        }

        res.status(200).json({ 
            name: NONSENSE_QUIZ,
            quiz: quiz
        });
    } catch (error) {
        console.error(error);
        next(error);
    }
});

// [D] 그림퀴즈 데이터 가져오기
router.get('/catchmind', async (req, res, next) => { // POST /game/nonsensequiz
    try {
        const quiz = await CatchMind.findAll();

        if (quiz.length < 1) {
            return res.status(204).send('퀴즈 데이터가 없습니다.');
        }

        res.status(200).json({ 
            name: CATCH_MIND,
            quiz: quiz
        });
    } catch (error) {
        console.error(error);
        next(error);
    }
});

// [D] 넌센스퀴즈 데이터 추가하기
router.post('/nonsensequiz', isAdminLoggedIn, async (req, res, next) => { // POST /game/nonsensequiz
    try {
        await NonsenseQuiz.create({
            question: req.body.question,
            example: req.body.example,
        });

        res.status(200).send('넌센스퀴즈 데이터 추가 완료');
    } catch (error) {
        console.error(error);
        next(error);
    }
});

// [D] 그림퀴즈 데이터 추가하기
router.post('/catchmind', isAdminLoggedIn, async (req, res, next) => { // POST /game/catchmind
    try {
        await CatchMind.create({
            question: req.body.question,
            correct: req.body.correct,
            incorrect: req.body.incorrect, 
        });

        res.status(200).send('그림퀴즈 데이터 추가 완료');
    } catch (error) {
        console.error(error);
        next(error);
    }
});

module.exports = router;