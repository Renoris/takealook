'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('movies', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      title: {
        type: Sequelize.STRING
      },
      genre:{
        type: Sequelize.STRING
      },
      country:{
        type: Sequelize.STRING
      },
      year: {
        type: Sequelize.INTEGER
      },
      link: {
        type: Sequelize.STRING
      },
      image: {
        type: Sequelize.STRING
      },
      sub_title: {
        type: Sequelize.STRING
      },
      pub_date: {
        type: Sequelize.DATE
      },
      director: {
        type: Sequelize.STRING
      },
      actor: {
        type: Sequelize.STRING
      },
      user_rating: {
        type: Sequelize.float(4,2)
      },
      story: {
        type: Sequelize.TEXT('medium')
      },

    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('movies');
  }
};