module.exports = (sequelize, DataTypes) => {
    const Guestbook = sequelize.define('Guestbook', {
        nickname: {
            type: DataTypes.STRING(20),
            allowNull: false,
        },
        avatar: {
            type: DataTypes.STRING(100),
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
        modelName: "Guestbook", 
        tableName: "Guestbook", 
        charset: 'utf8mb4',
        collate: 'utf8mb4_general_ci',
    });

    Guestbook.associate = (db) => {
        db.Guestbook.hasMany(db.Comment);
        db.Guestbook.hasMany(db.Image);
    };

    return Guestbook;
};

// TODO: 나중엔 index번호만
