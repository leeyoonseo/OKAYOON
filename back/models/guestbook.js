const DataTypes = require('sequelize');
const { Model } = DataTypes;

module.exports = class Guestbook extends Model {
  static init(sequelize) {
    return super.init({
        nickname: {
            type: DataTypes.STRING(20),
            allowNull: false,
        },
        avatar: {
            type: DataTypes.TEXT,
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
        sequelize,
    });
  }

    static associate(db) {
        db.Guestbook.hasMany(db.Comment);
    }
};