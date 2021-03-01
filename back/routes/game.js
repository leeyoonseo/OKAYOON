const express = require('express');
const router = express.Router();
const { Game, NonsenseQuiz } = require('../models');

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

// [D] 특정 게임 가져오기
router.get('/:gameName', async (req, res, next) => { // POST /game/list
    try {

        console.log('==============gameName', gameName);
        // const game = await Game.create({
        //     name: req.body.name,
        //     title: req.body.title,
        //     description: req.body.description, 
        //     image: req.body.image,
        // });

        // const resGame = await Game.findOne({ 
        //     where: { id: game.id },
        // });

        // res.status(200).json(resGame);
        res.status(200).send('ok');
    } catch (error) {
        console.error(error);
        next(error);
    }
});

// [D] 특정 게임 추가하기
router.post('/nonsensequiz', async (req, res, next) => { // POST /game/nonsensequiz
    try {
        const quiz = await NonsenseQuiz.create({
            name: req.body.name,
            title: req.body.title,
            description: req.body.description, 
            image: req.body.image,
        });

        const resQuiz = await NonsenseQuiz.findOne({ 
            where: { id: quiz.id },
        });

        res.status(200).json(resQuiz);
    } catch (error) {
        console.error(error);
        next(error);
    }
});

module.exports = router;