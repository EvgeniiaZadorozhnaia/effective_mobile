'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Appeal extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Appeal.init({
    status: DataTypes.STRING,
    topic: DataTypes.STRING,
    description: DataTypes.STRING,
    solution: DataTypes.STRING,
    cancel_reason: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Appeal',
  });
  return Appeal;
};