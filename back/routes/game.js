const express = require('express');
const router = express.Router();
const { sequelize, NonsenseQuiz, CatchMind } = require('../models');

// [D] 넌센스퀴즈 데이터 가져오기
router.get('/nonsensequiz', async (req, res, next) => { // POST /game/nonsensequiz
    try {
        const quiz = await NonsenseQuiz.findAll({
            limit: 20,
            order: sequelize.random()
        });

        res.status(200).json(quiz);
    } catch (error) {
        console.error(error);
        next(error);
    }
});

// [D] 그림퀴즈 데이터 가져오기
router.get('/catchmind', async (req, res, next) => { // POST /game/nonsensequiz
    try {
        const quiz = await CatchMind.findAll({
            // limit: 10,
            order: sequelize.random()
        });

        res.status(200).json(quiz);
    } catch (error) {
        console.error(error);
        next(error);
    }
});

// [D] 넌센스퀴즈 데이터 추가하기
router.post('/nonsensequiz', async (req, res, next) => { // POST /game/nonsensequiz
    try {
        await NonsenseQuiz.create({
            question: req.body.question,
            example: req.body.example,
            description: req.body.description, 
        });

        res.status(200).send('넌센스퀴즈 데이터 추가 완료');
    } catch (error) {
        console.error(error);
        next(error);
    }
});

// [D] 그림퀴즈 데이터 추가하기
router.post('/catchmind', async (req, res, next) => { // POST /game/catchmind
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