const DataTypes = require('sequelize');
const { Model } = DataTypes;

module.exports = class NonsenseQuiz extends Model {
    static init(sequelize) {
        return super.init({
            question: {
                type: DataTypes.STRING(100),
                allowNull: false, 
            },
            example: {
                type: DataTypes.TEXT,
                allowNull: false,
            },
        }, {
            modelName: "NonsenseQuiz", 
            tableName: "NonsenseQuiz", 
            timestamps: false,
            charset: 'utf8mb4', 
            collate: 'utf8mb4_general_ci',
            sequelize,
        });
    }

    static associate(db) {}
};