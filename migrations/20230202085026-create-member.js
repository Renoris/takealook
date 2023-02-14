'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('members', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      user_name: {
        type: Sequelize.STRING
      },
      role: {
        type: Sequelize.STRING(30),
      },
      email: {
        type: Sequelize.STRING
      },
      profile_image: {
        type: Sequelize.STRING
      },
      allow: {
        type: Sequelize.BOOLEAN
      },
      disable:{
        type: Sequelize.BOOLEAN
      },
      refresh_token: {
        type: Sequelize.STRING
      },
      token_expire: {
        type: Sequelize.DATE
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue:Sequelize.fn('now')
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('members');
  }
};