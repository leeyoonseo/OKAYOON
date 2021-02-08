module.exports = (sequelize, DataTypes) => {
    const Comment = sequelize.define('Comment', {
        nickname: {
            type: DataTypes.STRING(20),
            allowNull: false, 
        },
        avatar: {
            type: DataTypes.INTEGER(1),
            allowNull: false,
        },
        password: {
            type: DataTypes.STRING(100),
            allowNull: false, 
        },
        content: {
            type: DataTypes.STRING(100),
            allowNull: false, 
        },

    }, {
        charset: 'utf8mb4', 
        collate: 'utf8mb4_general_ci',
    });

    Comment.associate = (db) => {
        db.Comment.belongsTo(db.Guestbook);
        db.Comment.belongsTo(db.Admin);
    };

    return Comment;
};