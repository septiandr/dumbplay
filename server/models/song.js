'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class song extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      song.belongsTo(models.artist, {
        as: "artist",
        foreignKey: {
          name: "artistId",
        },
      });
    }
  }
  song.init({
    title: DataTypes.STRING,
    year: DataTypes.DATE,
    thumbnail: DataTypes.TEXT,
    attache: DataTypes.TEXT,
    artistId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'song',
  });
  return song;
};