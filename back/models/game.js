const DataTypes = require('sequelize');
const { Model } = DataTypes;

module.exports = class Game extends Model {
    static init(sequelize) {
        return super.init({
            gameId: {
                type: DataTypes.STRING(20),
                allowNull: false, 
            },
            name: {
                type: DataTypes.STRING(20),
                allowNull: false,
            },
            title: {
                type: DataTypes.STRING(20),
                allowNull: false,
            },
            description: {
                type: DataTypes.STRING(100),
                allowNull: false,
            },
            image: {
                type: DataTypes.STRING(200),
                allowNull: false, 
            },
        }, {
            modelName: "Game", 
            tableName: "Game", 
            timestamps: false,
            charset: 'utf8mb4', 
            collate: 'utf8mb4_general_ci',
            sequelize,
        });
    }

    static associate(db) {
        db.Game.hasMany(db.NonsenseQuiz);
    }
};

// TODO:
// - 아바타 이미지