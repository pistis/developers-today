'use strict';

// https://stackoverflow.com/questions/10645994/how-to-format-a-utc-date-as-a-yyyy-mm-dd-hhmmss-string-using-nodejs
const createdAt = new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '');
const updatedAt = new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    let data = [
      {
        name: 'Boosting',
        description: '준비',
        createdAt,
        updatedAt,
      },
      {
        name: 'Development',
        description: '개발(코딩)',
        createdAt,
        updatedAt,
      },
      {
        name: 'Code Review (for My PR)',
        description: 'Pull Request/offline Code Review',
        createdAt,
        updatedAt,
      },
      {
        name: 'Code Review (for co-worker PR)',
        description: 'Pull Request/offline Code Review',
        createdAt,
        updatedAt,
      },
      {
        name: 'Review',
        description: '기타 업무 사항 검토',
        createdAt,
        updatedAt,
      },
      {
        name: 'MTG',
        description: '미팅',
        createdAt,
        updatedAt,
      },
      {
        name: 'Document',
        description: '문서 작성',
        createdAt,
        updatedAt,
      },

      {
        name: 'Report',
        description: '조직장 보고',
        createdAt,
        updatedAt,
      },
      {
        name: 'Communication',
        description: 'mail, slack',
        createdAt,
        updatedAt,
      },

      {
        name: 'Lunch',
        description: '점심',
        createdAt,
        updatedAt,
      },
      {
        name: 'Coffee',
        description: '커피',
        createdAt,
        updatedAt,
      },
      {
        name: 'Web Surfing',
        description: '웹서핑',
        createdAt,
        updatedAt,
      },
    ];

    await queryInterface.bulkInsert('Categories', data, {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Categories', null, {});
  },
};
