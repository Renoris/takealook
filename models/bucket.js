'use strict';
const {
  Model, Op, Sequelize
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class bucket extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      bucket.hasMany(models.bucket_item);
      bucket.belongsTo(models.member, {
        foreignKey: 'ownerId',
        targetKey: 'id',
        sourceKey: 'id',
        on: {
          ownerId: {[Op.eq]:Sequelize.col('members.id')}
        }
      });
    }
  }
  bucket.init({
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    bucketName: DataTypes.STRING,
    bucketTag: DataTypes.STRING,
    ownerId: DataTypes.INTEGER,
    publish: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'bucket',
    underscored: true, /* 카멜 표기법을 스네이크 표기법으로 바꾸는 옵션 */
    charset: 'utf8' /* 인코딩 */
  });
  return bucket;
};