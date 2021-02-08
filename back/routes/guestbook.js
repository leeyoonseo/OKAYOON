const express = require('express');
const bcrypt = require('bcrypt');
const router = express.Router();
const { Comment, Image, Guestbook } = require('../models');

// [D] 방명록 가져오기
router.get('/', (req, res) => { // GET /guestbook
    console.log('guestbook get /', req, res);
    // res.json({
    // }); 
});

// [D] 방명록 등록하기
router.post('/', async (req, res, next) => { // POST /guestbook
    try {
        console.log('guestbook post', req, res);

        const hashedPassword = await bcrypt.hash(req.body.password, 12);

        await Guestbook.create({
            avatar: req.body.avatar,
            nickname: req.body.nickname,
            password: hashedPassword,
            content: req.body.content,
        });

        res.status(200).send('ok');
        
    } catch (error) {
        console.error(error);
        next(error);
    }
    

    // creat는 테이블안에 데이터를 넣는것
    // await이 있어야하고 이게 await이니까 async 함수가 있어야함
    // await이 없어도 실행은되는데, 순서를 맞추기위해서 필수
    // await Comment.create({
    //     nickname: {

    //     }
    // });
});

// 방명록 가져오기, 방명록 등록하기, 방명록 삭제하기, 방명록 수정하기
// get post delete patch(수정) 

module.exports = router;