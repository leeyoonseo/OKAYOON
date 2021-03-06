const express = require('express');
const router = express.Router();
const passport = require('passport');
const { Admin } = require('../models');
const { isAdminLoggedIn, isNotAdminLoggedIn } = require('./middlewares');

// [D] 사용자 정보 
router.get('/', async (req, res, next) => { // GET /admin
    try {
        if (req.user) {
            const admin = await Admin.findOne({
                where: { userId: req.user.userId },
                attributes: {
                    exclude: ['id', 'password'],
                }
            });

            res.status(200).json(admin);
            
        } else {
            res.status(200).json(null);
        }
    } catch (error) {
        console.error(error);
        next(error);
    }
    
});

// [D] 로그인
router.post('/login', isNotAdminLoggedIn, async (req, res, next) => { // POST /admin/login
    passport.authenticate('local', (err, user, info) => {
        if (err) {
            console.error(err);
            return next(err);
        }

        if (info) {
            return res.status(401).send(info.reason);
        }

        req.login(user, async (loginErr) => {
            if (loginErr) {
                console.error(loginErr);
                return next(loginErr);
            }

            const withoutPassword = await Admin.findOne({
                where: { userId: user.userId },
                attributes: {
                    exclude: ['id', 'password']
                }
            });

            return res.status(200).json(withoutPassword);
        });
    })(req, res, next);
}); 

// [D] 로그아웃
router.post('/logout', isAdminLoggedIn, async (req, res, next) => { // POST /admin/logout  
    req.logout();
    req.session.destroy();
    res.status(200).send('정상적으로 관리자 로그아웃되었습니다.');
});

module.exports = router;