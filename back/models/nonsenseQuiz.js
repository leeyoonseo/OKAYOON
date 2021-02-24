const DataTypes = require('sequelize');
const { Model } = DataTypes;

module.exports = class NonsenseQuiz extends Model {
    static init(sequelize) {
        return super.init({
            question: {
                type: DataTypes.STRING(50),
                allowNull: false, 
            },
            example: {
                type: DataTypes.TEXT,
                allowNull: false,
            },
            description: {
                type: DataTypes.STRING(20),
                allowNull: false, 
            },
            image: {
                type: DataTypes.STRING(200),
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

    static associate(db) {
        db.NonsenseQuiz.belongsTo(db.Game);
    }
};