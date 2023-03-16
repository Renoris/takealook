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
      bucket_item.belongsTo(models.bucket, {
        foreignKey: {
          name : 'bucket_id'
        }
      });
      bucket_item.belongsTo(models.movie, {
        foreignKey: {
          name : 'movie_id'
        }
      });
    }
  }
  bucket_item.init({
    movieId: DataTypes.INTEGER,
    bucketId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'bucket_item',
    underscored: true, /* 카멜 표기법을 스네이크 표기법으로 바꾸는 옵션 */
    charset: 'utf8'
  });
  return bucket_item;
};