const express = require('express');
const router = express.Router();
const passport = require('passport');
const { Admin } = require('../models');

router.post('/login', (req, res, next) => { // POST /admin/login
    passport.authenticate('local', (err, user, info) => {
        if (err) {
            console.error(err);
            return next(err);
        }

        if (info) {
            return res.status(401).send(info.reason);
        }

        return req.login(user, async (loginErr) => {
            if (loginErr) {
                console.error(loginErr);
                return next(loginErr);
            }

            const withoutPassword = await Admin.findOne({
                where: { nickname: user.nickname },
                attributes: {
                    exclude: ['password']
                }
            });

            return res.status(200).json(withoutPassword);
        });
    })(req, res, next);
});

module.exports = router;