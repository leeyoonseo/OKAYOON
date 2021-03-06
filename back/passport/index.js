const passport = require('passport');
const local = require('./local');
const { Admin } = require('../models');

module.exports = () => {
    passport.serializeUser((user, done) => {
        done(null, user.id);
    });

    passport.deserializeUser(async (id, done) => {
        try {
            const admin = await Admin.findOne({ where: { id } });
            console.log('==================deserializeUser', admin)
            done(null, admin);
        } catch (error) {
            console.error(error);
            done(error);
        }   
    });

    local();
};