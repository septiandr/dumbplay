'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class transaction extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      transaction.belongsTo(models.user, {
        as: "users",
        foreignKey: {
          name: "userId",
        },
      });
    }
  }
  transaction.init({
    startDate: DataTypes.DATE,
    dueDate: DataTypes.DATE,
    account:DataTypes.INTEGER,
    userId:DataTypes.INTEGER,
    attache: DataTypes.TEXT,
    status: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'transaction',
  });
  return transaction;
};