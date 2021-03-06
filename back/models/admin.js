const DataTypes = require('sequelize');
const { Model } = DataTypes;

module.exports = class Admin extends Model {
    static init(sequelize) {
        return super.init({
                userId: {
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
                sequelize,
            });
        }

    static associate(db) {}
};

// TODO:
// - 아바타 관리자꺼만 다른거 사용하기.
// - 관리자 로그인 기능있게 만들기
