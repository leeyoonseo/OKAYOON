const express = require('express');
const router = express.Router();
const { Op } = require('sequelize');
const bcrypt = require('bcrypt');
const { Comment, Guestbook, Admin } = require('../models');

// [D] 방명록 가져오기
router.get('/', async (req, res, next) => { // GET /guestbook
    try {
        const where = {};

        if (parseInt(req.query.lastId, 10)) {
            where.id = { [Op.lt]: parseInt(req.query.lastId, 10)}
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

        const allGuestbook = await Guestbook.findAndCountAll();
        res.status(200).json({
            count: allGuestbook.count, 
            list: guestbook
        });
        
    } catch (error) {
        console.error(error);
        next(error);
    }
});

// [D] 방명록 등록
router.post('/', async (req, res, next) => { // POST /guestbook
    try {
        const hashedPassWord = await bcrypt.hash(req.body.password, 12);

        const guestbook = await Guestbook.create({
            avatar: req.body.avatar,
            nickname: req.body.nickname,
            password: hashedPassWord,
            content: req.body.content,
        });

        const withoutPwGuestbook = await Guestbook.findOne({
            where: { id: guestbook.id },
            attributes: {
                exclude: ['password'],
            }
        });

        res.status(200).json(withoutPwGuestbook);

    } catch (error) {
        console.error(error);
        next(error);
    }
});

// [D] 방명록 수정
router.patch('/:guestbookId', async (req, res, next) => {
    try {
        
        const guestbook = await Guestbook.findOne({
            where: { id: req.params.guestbookId }
        });

        if (!guestbook) {
            return res.status(403).send('존재하지 않는 게시글입니다.');
        }
        
        await Guestbook.update({
            avatar: req.body.avatar,
            nickname: req.body.niakname,
            content: req.body.content,
        },{
            where: { id: parseInt(req.params.guestbookId, 10) },
        });

        res.status(200).json({
            id: parseInt(req.params.guestbookId, 10),
            nickname: req.body.nickname,
            avatar: req.body.avatar,
            content: req.body.content,
        });

    } catch (error) {
        console.error(error);
        next(error);
    }
});

// [D] 권한 요청
router.post('/permission/:guestbookId', async (req, res, next) => { // POST /guestbook/1/permission
    try {   
        const guestbook = await Guestbook.findOne({
            where: { id: parseInt(req.params.guestbookId, 10) }
        });

        if (!guestbook) {
            return res.status(403).send('존재하지 않는 게시글입니다.');
        }
    
        if (!bcrypt.compareSync(req.body.password, guestbook.password)) {
            return res.status(403).send('비밀번호가 틀렸습니다.');
        }

        res.status(200).json(parseInt(req.params.guestbookId, 10));
    } catch (error) {
        console.error(error);
        next(error);
    }
});

// [D] 방명록 삭제
router.post('/:guestbookId/delete', async (req, res, next) => {
    try {
        const guestbook = await Guestbook.findOne({
            where: { id: parseInt(req.params.guestbookId, 10) }
        });

        if (!guestbook) {
            return res.status(403).send('존재하지 않는 게시글입니다.');
        }

        const admin = await Admin.findOne({
            where: { userId: req.body.password }
        });

        if (!admin) {
            if (!bcrypt.compareSync(req.body.password, guestbook.password)) {
                return res.status(403).send('비밀번호가 틀렸습니다.');
            }
        }

        await Guestbook.destroy({
            where: { id: parseInt(req.params.guestbookId, 10) },
        });

        res.status(200).json(parseInt(req.params.guestbookId, 10));

    } catch (error) {
        console.error(error);
        next(error);
    }
});

// [D] 댓글 등록
router.post('/comment/:guestbookId', async (req, res, next) => { // POST /guestbook/1/comment
    try {   
        const guestbook = await Guestbook.findOne({
            where: { id: req.params.guestbookId }
        });

        if (!guestbook) {
            return res.status(403).send('존재하지 않는 게시글입니다.');
        }
        
        const hashedPassWord = await bcrypt.hash(req.body.password, 12);

        const comment = await Comment.create({
            nickname: req.body.nickname,
            avatar: req.body.avatar,
            content: req.body.content,
            password: hashedPassWord,
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


// [D] 댓글 삭제
router.post('/comment/:commentId/delete', async (req, res, next) => {
    try {
        const comment = await Comment.findOne({
            where: { id: parseInt(req.params.commentId, 10) },
        });

        if (!comment) {
            return res.status(403).send('존재하지 않는 댓글입니다.');
        }

        const admin = await Admin.findOne({
            where: { userId: req.body.password }
        });

        if (!admin) {
            if (!bcrypt.compareSync(req.body.password, comment.password)) {
                return res.status(403).send('비밀번호가 틀렸습니다.');
            }
        }

        await Comment.destroy({
            where: { id: parseInt(req.params.commentId, 10) },
        });

        res.status(200).send({
            guestbookId: comment.GuestbookId,
            commentId: comment.id,
        });

    } catch (error) {
        console.error(error);
        next(error);
    }
});

module.exports = router;