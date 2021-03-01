const DataTypes = require('sequelize');
const { Model } = DataTypes;

module.exports = class NonsenseRanking extends Model {
    static init(sequelize) {
        return super.init({
            nickname: {
                type: DataTypes.STRING(50),
                allowNull: false,
            },
            score: {
                type: DataTypes.STRING(50),
                allowNull: false,
            },
        }, {
            modelName: "NonsenseRanking", 
            tableName: "NonsenseRanking", 
            timestamps: false,
            charset: 'utf8mb4', 
            collate: 'utf8mb4_general_ci',
            sequelize,
        });
    }

    static associate(db) {
        db.NonsenseRanking.belongsTo(db.Game);
    }
};

// TODO:
// - 아바타 이미지