const db = require('./models');
const moment = require('moment');

function convertDateTimeStringForSQLite(date) {
  const SQLITE_DATETIME_FORMAT = 'YYYY-MM-DD HH:mm:ss';
  return moment(date).format(SQLITE_DATETIME_FORMAT);
}

function convertISOStringForSQLite(dateStr) {
  return new Date(dateStr).toISOString().replace(/T/, ' ').replace(/\..+/, '');
}

async function createTaskSeeder() {
  try {
    let tasks = await db.Task.findAll();
    tasks = tasks.map((el) => el.get({ plain: true }));
    const result = tasks.map((task) => {
      return {
        dayWorkId: task.dayWorkId,
        projectId: task.projectId,
        categoryId: task.categoryId,
        title: task.title,
        description: task.description,
        link: task.link,
        estimationMinutes: task.estimationMinutes,
        startTime: convertISOStringForSQLite(new Date(task.startTime)),
        endTime: convertISOStringForSQLite(new Date(task.endTime)),
        createdAt: convertISOStringForSQLite(new Date(task.createdAt)),
        updatedAt: convertISOStringForSQLite(new Date(task.updatedAt)),
      };
    });
    console.log(JSON.stringify(result, null, 2));
  } catch (err) {
    console.log(err);
  }
}

(function () {
  createTaskSeeder(); // dev.sqlite db의 내용으로 task seed 만들기 (json string output)
})();
