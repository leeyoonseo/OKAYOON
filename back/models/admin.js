module.exports = (sequelize, DataTypes) => {
    const Admin = sequelize.define('Admin', {
        nickname: {
            type: DataTypes.STRING(20),
            allowNull: false, 
        },
        password: {
            type: DataTypes.STRING(100),
            allowNull: false, 
        },
    }, {
        modelName: "Admin", 
        tableName: "Admin", 
        timestamps: false,
        charset: 'utf8mb4', 
        collate: 'utf8mb4_general_ci',
    });

    Admin.associate = (db) => {
        db.Admin.hasMany(db.Guestbook);
        db.Admin.hasMany(db.Comment);
        db.Admin.hasMany(db.Image);
    };

    return Admin;
};

// TODO:
// - 아바타 관리자꺼만 다른거 사용하기.
// - 관리자 로그인 기능있게 만들기