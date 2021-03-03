const Sequelize = require('sequelize');
const admin = require('./admin');
const comment = require('./comment');
const guestbook = require('./guestbook');
const image = require('./image');
const NonsenseQuiz = require('./NonsenseQuiz');

const env = process.env.NODE_ENV || 'development';
const config = require('../config/config')[env];
const db = {};

const sequelize = new Sequelize(config.database, config.username, config.password, config);

db.Admin = admin;
db.Comment = comment;
db.Guestbook = guestbook;
db.Image = image;
db.NonsenseQuiz = NonsenseQuiz;

Object.keys(db).forEach(modelName => {
    db[modelName].init(sequelize);
})

Object.keys(db).forEach(modelName => {
    if (db[modelName].associate) {
        db[modelName].associate(db);
    }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
