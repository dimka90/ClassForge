'use strict';


/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     * 
     */

    await queryInterface.createTable("halls", {
      id:{
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      name: {
          type: Sequelize.STRING,
          allowNull: false,
          unique: true
      },
      capacity: {
          type: Sequelize.INTEGER,
          allowNull: false
      },
  
        createdAt: {
      type: Sequelize.DATE,
      allowNull: false,
       defaultValue: Sequelize.NOW
    },
    updatedAt: {
      type: Sequelize.DATE,
      allowNull: false,
      defaultValue: Sequelize.NOW
    }
    })
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
await queryInterface.dropTable('halls');
  }
};
