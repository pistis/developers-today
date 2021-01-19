'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    let data = [
      {
        projectId: 1,
        categoryId: 1,
        date: '2021-01-11',
        title: '하루 업무 준비',
        contents: '메일 확인, 오늘 할 일 list up',
        link: '',
        estimationMinutes: null,
        startTime: '10:00:00',
        endTime: '10:15:00',
        createdAt: '2021-01-11 09:00:00',
        updatedAt: '2021-01-11 09:00:00',
      },
    ];

    await queryInterface.bulkInsert('Tasks', data, {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Tasks', null, {});
  },
};
