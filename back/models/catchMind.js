const DataTypes = require('sequelize');
const { Model } = DataTypes;

module.exports = class CatchMind extends Model {
    static init(sequelize) {
        return super.init({
            question: {
                type: DataTypes.TEXT,
                allowNull: false, 
            },
            correct: {
                type: DataTypes.STRING(100),
                allowNull: false,
            },
            incorrect: {
                type: DataTypes.TEXT,
                allowNull: false, 
            },
        }, {
            modelName: "CatchMind", 
            tableName: "CatchMind", 
            timestamps: false,
            charset: 'utf8mb4', 
            collate: 'utf8mb4_general_ci',
            sequelize,
        });
    }

    static associate(db) {}
};