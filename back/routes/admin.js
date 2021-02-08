const express = require('express');
const router = express.Router();
const { Guestbook, Image, Comment } = require('../models');

router.post('/', async (req, res, next) => { // POST /admin
    try {
        // const exAdmin = await Admin.findOne({
        //     where: {
        //         adminId: req.body.adminId,
        //     }
        // });

        // if(exAdmin) {
        //     return res.status(403).send('관리자에 로그인할 수 없습니다.');
        // }

        res.status(200).send('ok');

    } catch (error) {
        console.error(error);
        next(error);
    }
});

module.exports = router;