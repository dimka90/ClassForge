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

    await queryInterface.createTable("timetable_items", {

      id:{
        type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false
      },
      timetableId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "timetables",
          key: "id"
        },
        onDelete: "CASCADE",
        onUpdate: "CASCADE"
      },
       courseId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "courses",
          key: "id"
        },
        onDelete: "CASCADE",
        onUpdate: "CASCADE"
      },

       hallId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "halls",
          key: "id"
        },
        onDelete: "CASCADE",
        onUpdate: "CASCADE"
      },
       invigilatorId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "invigilators",
          key: "id"
        },
        onDelete: "CASCADE",
        onUpdate: "CASCADE"
      },
      date: {
        type: Sequelize.DATEONLY,
        allowNull: false
      },
      startTime: {
        type: Sequelize.TIME,
        allowNull: false
      },
      endTime: {
        type: Sequelize.TIME,
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
     await queryInterface.dropTable("timetable_items");
  }
};
