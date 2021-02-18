const DataTypes = require('sequelize');
const { Model } = DataTypes;

module.exports = class Image extends Model {
  static init(sequelize) {
    return super.init({
        src: {
            type: DataTypes.STRING(200),
            allowNull: false,
        },
    }, {
        charset: 'utf8', 
        collate: 'utf8_general_ci',
        sequelize,
    });
  }

    static associate(db) {
        db.Image.belongsTo(db.Guestbook);
    }
};

// TODO: 나중엔 index번호만