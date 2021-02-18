const express = require('express');
const router = express.Router();
const { Op } = require('sequelize');
const bcrypt = require('bcrypt');
const { Comment, Image, Guestbook } = require('../models');

// [D] 댓글 등록하기
router.post('/:guestbookId/comment', async (req, res, next) => { // POST /guestbook/1/comment
    try {   
        const guestbook = await Guestbook.findOne({
            where: { id: req.params.guestbookId }
        });

        if (!guestbook) {
            return res.status(403).send('존재하지 않는 게시글입니다.');
        }

        const comment = await Comment.create({
            nickname: req.body.nickname,
            avatar: req.body.avatar,
            content: req.body.content,
            password: req.body.password,
            GuestbookId: parseInt(req.params.guestbookId, 10),
        });

        const resComment = await Comment.findOne({
            where: { id: comment.id },
            attributes: {
                exclude: ['password'],
            },
        });

        res.status(201).json(resComment);
    } catch (error) {
        console.error(error);
        next(error);
    }
});

// [D] 방명록 가져오기
router.get('/', async (req, res, next) => { // GET /guestbook
    try {
        const where = {};

        if (parseInt(req.query.lastId, 10)) {
            where.id = { [Op.lt]: parseInt(req.query.lastId, 10)};
        }

        const guestbook = await Guestbook.findAll({
            where,
            limit: 10,
            order: [
                ['createdAt', 'DESC'],
                [Comment, 'createdAt', 'DESC'],
            ],
            attributes: {
                exclude: ['password'],
            },
            include: [{
                model: Comment,
                attributes: ['id', 'nickname', 'avatar', 'content', 'createdAt' , 'GuestbookId'],
            }]
        });

        res.status(200).json(guestbook);
        
    } catch (error) {
        console.error(error);
        next(error);
    }
});

// [D] 방명록 등록하기
router.post('/', async (req, res, next) => { // POST /guestbook
    try {
        const hashedPassWord = await bcrypt.hash(req.body.password, 12);

        const guestbook = await Guestbook.create({
            avatar: req.body.avatar,
            nickname: req.body.nickname,
            password: hashedPassWord,
            content: req.body.content,
        });

        res.status(200).json(guestbook);

    } catch (error) {
        console.error(error);
        next(error);
    }
});



// 방명록 가져오기, 방명록 등록하기, 방명록 삭제하기, 방명록 수정하기
// get post delete patch(수정) 

module.exports = router;