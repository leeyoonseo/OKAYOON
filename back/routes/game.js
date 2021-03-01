const express = require('express');
const router = express.Router();
// const Sequelize = require('sequelize');
const { Game, NonsenseQuiz, sequelize } = require('../models');

// [D] 게임리스트 가져오기
router.get('/list', async (req, res, next) => { // POST /game/list
    try {
        const list = await Game.findAll();
        
        if (!list) {
            return res.status(403).send('게임이 존재하지 않습니다.');
        }

        res.status(200).json(list);

    } catch (error) {
        console.error(error);
        next(error);
    }
});

// [D] 게임리스트 추가하기
router.post('/list', async (req, res, next) => { // POST /game/list
    try {
        const game = await Game.create({
            name: req.body.name,
            title: req.body.title,
            description: req.body.description, 
            image: req.body.image,
        });

        const resGame = await Game.findOne({ 
            where: { id: game.id },
        });

        res.status(200).json(resGame);

    } catch (error) {
        console.error(error);
        next(error);
    }
});

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

// [D] 넌센스퀴즈 데이터 추가하기
router.post('/nonsensequiz', async (req, res, next) => { // POST /game/nonsensequiz
    try {
        const quiz = await NonsenseQuiz.create({
            question: req.body.question,
            example: req.body.example,
            description: req.body.description, 
        });

        const resQuiz = await NonsenseQuiz.findOne({ 
            where: { id: quiz.id },
        });

        res.status(200).send('넌센스퀴즈 데이터 추가 완료');
    } catch (error) {
        console.error(error);
        next(error);
    }
});

module.exports = router;