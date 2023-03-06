'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('bucket_items', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      movie_id: {
        type: Sequelize.INTEGER,
        onUpdate : 'CASCADE',
        onDelete : 'CASCADE',
        references: {
          model: {
            tableName: 'movies'
          },
          key: 'id'
        },
      },
      bucket_id: {
        type: Sequelize.INTEGER,
        onUpdate : 'CASCADE',
        onDelete : 'CASCADE',
        references: {
          model: {
            tableName: 'buckets'
          },
          key: 'id'
        },
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('bucket_items');
  }
};