'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Movie extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
    }
  }
  Movie.init({
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    title: DataTypes.STRING,
    genre: DataTypes.STRING,
    country: DataTypes.STRING,
    link: DataTypes.STRING,
    image: DataTypes.STRING,
    subTitle: DataTypes.STRING,
    pubDate: DataTypes.DATE,
    runningTime : DataTypes.STRING,
    director: DataTypes.STRING,
    actor: DataTypes.STRING,
    userRating: DataTypes.FLOAT(4,2),
    story: DataTypes.TEXT('medium'),
    random: DataTypes.INTEGER,
    thumb: DataTypes.STRING

  }, {
    sequelize,
    modelName: 'movie',
    underscored: true, /* 카멜 표기법을 스네이크 표기법으로 바꾸는 옵션 */
    charset: 'utf8', /* 인코딩 */
    timestamps : false,
  });
  return Movie;
};