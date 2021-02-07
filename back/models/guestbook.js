module.exports = (sequelize, DataTypes) => {
    const Guestbook = sequelize.define('Guestbook', {
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
        collate: 'utf8_general_ci',
    });

    Guestbook.associate = (db) => {
        db.Guestbook.hasMany(db.Comment);
        db.Guestbook.hasMany(db.Image);
    };

    return Guestbook;
};

// 닉네임 (바뀜)
// 아바타 (바뀜)
// 패스워드 
// 내용 (바뀜)
// 만든날짜 
// 코멘트