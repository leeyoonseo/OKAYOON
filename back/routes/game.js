const express = require('express');
const router = express.Router();
const { Game } = require('../models');

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



module.exports = router;