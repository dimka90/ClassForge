'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize){

    await queryInterface.createTable("admins", {

       /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
      id:{
        type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false
      },
       username: {
      type: Sequelize.STRING,
      allowNull: false
    },
    email: {
      type: Sequelize.STRING,
      unique: true,
      allowNull: false
    },

    password: {
    type:Sequelize.STRING,
    allowNull: false
    },
    createdAt: {
      type: Sequelize.DATE,
      allowNull: false,

    },
    updatedAt: {
      type: Sequelize.DATE,
      allowNull: false,
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
      await queryInterface.dropTable('admins');
    
  }
};
