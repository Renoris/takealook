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
      // define association here
    }
  }
  Movie.init({
    title: DataTypes.STRING,
    genre: DataTypes.STRING,
    country: DataTypes.STRING,
    year : Sequelize.INTEGEG,
    link: DataTypes.STRING,
    image: DataTypes.STRING,
    subtitle: DataTypes.STRING,
    pubDate: DataTypes.DATE,
    director: DataTypes.STRING,
    actor: DataTypes.STRING,
    userRating: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'movie',
    underscored: true, /* 카멜 표기법을 스네이크 표기법으로 바꾸는 옵션 */
    charset: 'utf8' /* 인코딩 */
  });
  return Movie;
};