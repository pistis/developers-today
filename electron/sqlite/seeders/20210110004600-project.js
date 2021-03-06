'use strict';

// https://stackoverflow.com/questions/10645994/how-to-format-a-utc-date-as-a-yyyy-mm-dd-hhmmss-string-using-nodejs
const createdAt = new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '');
const updatedAt = new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    let data = [
      {
        name: 'My Task 2021',
        description: '나의 업무 준비/마무리 등',
        type: 'PERSONAL',
        startDate: '2021-01-01',
        createdAt,
        updatedAt,
      },
      {
        name: 'Break Time',
        description: '점심 시간, 커피, 웹서핑 등의 휴식',
        type: 'PERSONAL',
        startDate: '2021-01-01',
        createdAt,
        updatedAt,
      },
      {
        name: 'My Team 2021',
        description: 'My Team 2021년 팀 업무',
        type: 'TEAM',
        startDate: '2021-01-01',
        endDate: '2021-12-31',
        createdAt,
        updatedAt,
      },
      {
        name: 'Recruitment Activities 2021',
        description: '2021년 채용 프로젝트(서류 검토, 기술 면접관)',
        type: 'TEAM',
        startDate: '2021-01-01',
        endDate: '2021-12-31',
        createdAt,
        updatedAt,
      },
      {
        name: 'Hot Project 2021',
        description: '2021년 회사의 매우 Hot 한 프로젝트',
        type: 'PRODUCT',
        startDate: '2021-01-01',
        createdAt,
        updatedAt,
      },
      {
        name: 'Small Project 2021',
        description: '2021년 작은 프로젝트 one',
        type: 'PRODUCT',
        startDate: '2020-11-30',
        createdAt,
        updatedAt,
      },
    ];

    await queryInterface.bulkInsert('Projects', data, {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Projects', null, {});
  },
};
