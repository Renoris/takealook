'use strict';
/** @type {import('sequelize-cli').Migration} */

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('buckets', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      bucket_name: {
        type: Sequelize.STRING
      },
      bucket_tag: {
        type: Sequelize.STRING
      },
      owner_id: {
        type: Sequelize.INTEGER,
        onUpdate : 'CASCADE',
        onDelete : 'CASCADE',
        references: {
          model: {
            tableName: 'members'
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
    await queryInterface.dropTable('buckets');
  }
};