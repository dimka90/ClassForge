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

    await queryInterface.createTable('timetables', 
    
      {
        id:{
           type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false
        },
         level: {
      type: Sequelize.STRING,
      allowNull: false
    },
       sessionId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "sessions",
          key: "id"
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
       },
       createdAt: {
           type: Sequelize.DATEONLY,
           allowNull: false,
           defaultValue: Sequelize.NOW
       },
       updatedAt: {
             type: Sequelize.DATEONLY,
           allowNull: false,
           defaultValue: Sequelize.NOW
       },
       generatedAt: {
           type: Sequelize.DATE,
           allowNull: false,
           defaultValue: Sequelize.NOW
       }
    },
  
  ) },

  async down (queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */

    await queryInterface.dropTable('timetables')
  }
};
