'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */

      await queryInterface.createTable('courses', 
        { 
          id: {
            type: Sequelize.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
          },

          code: {
            type: Sequelize.INTEGER,
            allowNull: false,
            unique: true
          },
          title:{
            type: Sequelize.STRING,
            allowNull: false
          },
          level: {
            type: Sequelize.STRING,
            allowNull: false
          }
        }
      )

  },


  async down (queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    await queryInterface.dropTable('courses')
  }
};
