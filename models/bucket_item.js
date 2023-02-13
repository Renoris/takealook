'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class bucket_item extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  bucket_item.init({
    movie_id: DataTypes.INTEGER,
    bucket_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'bucket_item',
  });
  return bucket_item;
};