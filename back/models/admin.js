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