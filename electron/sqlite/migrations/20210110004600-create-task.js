'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Tasks', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      projectId: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      categoryId: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      date: {
        type: Sequelize.DATEONLY,
      },
      title: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      contents: {
        type: Sequelize.TEXT,
      },
      link: {
        type: Sequelize.STRING(1024),
      },
      estimationMinutes: {
        type: Sequelize.INTEGER,
      },
      startTime: {
        type: Sequelize.TIME,
        defaultValue: Sequelize.NOW,
      },
      endTime: {
        type: Sequelize.TIME,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Tasks');
  },
};
