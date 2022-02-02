'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class playlist extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      playlist.belongsTo(models.user, {
        as: "user",
        foreignKey: {
          name: "userId",
        },
      });
      playlist.belongsTo(models.song, {
        as: "song",
        foreignKey: {
          name: "songId",
        },
      });
    }
  }
  playlist.init({
    userId: DataTypes.INTEGER,
    songId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'playlist',
  });
  return playlist;
};