const db = require('./models');

const { createDateTimeForSQLite } = require('./help');

function getProjectsPromise() {
  db.Project.findAll()
    .then((result) => {
      result.forEach((project) => {
        console.log(project);
      });
    })
    .catch((err) => {
      console.log(err);
    });
}

function getCategoriesPromise() {
  db.Category.findAll()
    .then((result) => {
      result.forEach((category) => {
        console.log(category);
      });
    })
    .catch((err) => {
      console.log(err);
    });
}

function getDayWorksPromise() {
  db.DayWork.findAll()
    .then((result) => {
      result.forEach((daywork) => {
        console.log(daywork);
      });
    })
    .catch((err) => {
      console.log(err);
    });
}

function getTasksPromise() {
  db.Task.findAll()
    .then((result) => {
      result = result.map((el) => el.get({ plain: true }));
      result.forEach((task) => {
        console.log(task);
      });
    })
    .catch((err) => {
      console.log(err);
    });
}

function createTaskPromise() {
  // console.log(createDateTimeForSQLite('2020-12-28T10:00:00'));
  // return;
  // const model = {
  //   dayWorkId: 1,
  //   projectId: 1,
  //   categoryId: 1,
  //   title: 'test title',
  //   description: 'test desc',
  //   link: 'www.line.me',
  //   estimationMinutes: 0,
  //   startTime: '10:00',
  //   endTime: '11:00',
  // };
  const model = {
    dayWorkId: 1,
    projectId: 1,
    categoryId: 1,
    title: 'title test',
    description: 'description test',
    link: 'https://line.com',
    startTime: createDateTimeForSQLite('2020-12-28T10:00:00'),
    endTime: createDateTimeForSQLite('2020-12-28T12:00:00'),
  };

  db.Task.create(model)
    .then((result) => {
      console.log(result);
    })
    .catch((err) => {
      console.error(err);
    });
}

// Async Await
// async function getTasksAsync() {
//   try {
//     const tasks = await db.Task.findAll();
//     tasks.forEach((task) => {
//       console.log(task.taskName);
//     });
//   } catch (err) {
//     console.log(err);
//   }
// }

function sync() {
  db.sequelize
    .sync()
    .then(() => {
      console.log(' DB 연결 성공');
      createTaskPromise();
    })
    .catch((err) => {
      console.log('연결 실패');
      console.log(err);
    });
}
sync();
// getTasksPromise();
// getTasksAsync();
