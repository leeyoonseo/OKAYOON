const express = require('express');
const { Op } = require('sequelize');
const bcrypt = require('bcrypt');
const router = express.Router();
const { Comment, Image, Guestbook } = require('../models');

// [D] 방명록 가져오기
router.get('/', async (req, res, next) => { // GET /guestbook
    try {
        // const where = {};

        // // 초기 로딩이 아닐 때
        // if (parseInt(req.body.lastId, 10)) {
        //     where.id = { [Op.lt]: parseInt(req.query.lastId, 10) };
        // }

        // const guestbook = await Guestbook.findAll({
        //     where,
        //     limit: 10,
        //     order: [
        //         ['createdAt', 'DESC'],
        //         [Comment, 'createdAt', 'DESC'],
        //     ], 
        //     include: [{
        //         model: Image,
        //     }, {
        //         model: Comment,
        //         attributes: ['id'],
        //     }]
        // });

        // res.status(200).send(guestbook);

        const guestbook = await Guestbook.findAll();
        res.status(200).send(guestbook);

    } catch (error) {
        console.error(error);
        next(error);
    }
});

// [D] 방명록 등록하기
router.post('/', async (req, res, next) => { // POST /guestbook
    try {
        const hashedPW = await bcrypt.hash(req.body.password, 12);
        const avatar = (req.body.avatar === null ? 'null' : req.body.avatar); 

        const guestbook = await Guestbook.create({
            avatar: avatar,
            nickname: req.body.nickname,
            password: hashedPW,
            content: req.body.content,
        });

        res.status(200).send(guestbook);

    } catch (error) {
        console.error(error);
        next(error);
    }
});

// 방명록 가져오기, 방명록 등록하기, 방명록 삭제하기, 방명록 수정하기
// get post delete patch(수정) 

module.exports = router;