module.exports = (sequelize, DataTypes) => {
    const Comment = sequelize.define('Comment', {
        nickname: {},
        password: {},
        content: {},
    }, {
        charset: 'utf8mb4', 
        collate: 'utf8_general_ci',
    });

    Comment.associate = (db) => {};

    return Comment;
};