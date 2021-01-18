const { Op } = require('sequelize');
const { ipcMain } = require('electron');
const { IPC_RENDERER_ON_MESSAGE } = require('./constant');
const db = require('../../sqlite/models');

const initTaskIPCEvent = () => {
  ipcMain.on('listTask', async (event, arg) => {
    console.log('[IPC:main] listTask', arg);

    db.Task.findAll({
      include: [
        {
          model: db.Project,
          attributes: ['name'],
        },
        {
          model: db.Category,
          attributes: ['name'],
        },
      ],
      where: {
        date: arg.date,
      },
      order: [['startTime', 'ASC']],
    }).then((result) => {
      result = result.map((el) => el.get({ plain: true }));
      event.sender.send(IPC_RENDERER_ON_MESSAGE, {
        event: {
          data: {
            resultCode: 0,
            resultMsg: 'success',
            data: result,
          },
          sendMessage: arg.sendMessage,
          callbackIpcId: arg.callbackIpcId,
        },
      });
    });
  });

  ipcMain.on('listTaskByProject', async (event, arg) => {
    console.log('[IPC:main] listTaskByProject', arg);

    db.Task.findAll({
      include: [
        {
          model: db.Project,
          attributes: ['name'],
        },
        {
          model: db.Category,
          attributes: ['name'],
        },
      ],
      where: {
        projectId: arg.projectId,
        date: {
          [Op.between]: [arg.startDate, arg.endDate],
        },
      },
      order: [['updatedAt', 'DESC']],
    }).then((result) => {
      result = result.map((el) => el.get({ plain: true }));
      event.sender.send(IPC_RENDERER_ON_MESSAGE, {
        event: {
          data: {
            resultCode: 0,
            resultMsg: 'success',
            data: result,
          },
          sendMessage: arg.sendMessage,
          callbackIpcId: arg.callbackIpcId,
        },
      });
    });
  });

  ipcMain.on('listTaskByRangeDate', async (event, arg) => {
    console.log('[IPC:main] listTaskByRangeDate', arg);

    db.Task.findAll({
      include: [
        {
          model: db.Project,
          attributes: ['name'],
        },
        {
          model: db.Category,
          attributes: ['name'],
        },
      ],
      where: {
        date: {
          [Op.between]: [arg.startDate, arg.endDate],
        },
      },
      order: [['updatedAt', 'DESC']],
    }).then((result) => {
      result = result.map((el) => el.get({ plain: true }));
      event.sender.send(IPC_RENDERER_ON_MESSAGE, {
        event: {
          data: {
            resultCode: 0,
            resultMsg: 'success',
            data: result,
          },
          sendMessage: arg.sendMessage,
          callbackIpcId: arg.callbackIpcId,
        },
      });
    });
  });

  ipcMain.on('createTask', async (event, arg) => {
    console.log('[IPC:main] createTask', arg);

    const { task } = arg;
    const model = {
      date: task.date,
      projectId: task.projectId,
      categoryId: task.categoryId,
      title: task.title,
      contents: task.contents,
      link: task.link,
      estimationMinutes: task.estimationMinutes ? task.estimationMinutes : 0,
      startTime: task.startTime,
      endTime: task.endTime,
    };
    db.Task.create(model)
      .then((result) => {
        event.sender.send(IPC_RENDERER_ON_MESSAGE, {
          event: {
            data: {
              resultCode: 0,
              resultMsg: 'success',
              data: true,
            },
            sendMessage: arg.sendMessage,
            callbackIpcId: arg.callbackIpcId,
          },
        });
      })
      .catch((err) => {
        event.sender.send(IPC_RENDERER_ON_MESSAGE, {
          event: {
            error: err,
            sendMessage: arg.sendMessage,
            callbackIpcId: arg.callbackIpcId,
          },
        });
      });
  });

  ipcMain.on('updateTask', async (event, arg) => {
    console.log('[IPC:main] updateTask', arg);

    const { task } = arg;
    const model = {
      date: task.date,
      projectId: task.projectId,
      categoryId: task.categoryId,
      title: task.title,
      contents: task.contents,
      link: task.link,
      estimationMinutes: task.estimationMinutes ? task.estimationMinutes : 0,
      startTime: task.startTime,
      endTime: task.endTime,
    };
    db.Task.update(model, {
      where: { id: task.id },
    })
      .then((result) => {
        event.sender.send(IPC_RENDERER_ON_MESSAGE, {
          event: {
            data: {
              resultCode: 0,
              resultMsg: 'success',
              data: true,
            },
            sendMessage: arg.sendMessage,
            callbackIpcId: arg.callbackIpcId,
          },
        });
      })
      .catch((err) => {
        event.sender.send(IPC_RENDERER_ON_MESSAGE, {
          event: {
            error: err,
            sendMessage: arg.sendMessage,
            callbackIpcId: arg.callbackIpcId,
          },
        });
      });
  });

  ipcMain.on('deleteTask', async (event, arg) => {
    console.log('[IPC:main] deleteTask', arg);

    const { taskId } = arg;

    db.Task.destroy({
      where: { id: taskId },
    })
      .then((result) => {
        event.sender.send(IPC_RENDERER_ON_MESSAGE, {
          event: {
            data: {
              resultCode: 0,
              resultMsg: 'success',
              data: true,
            },
            sendMessage: arg.sendMessage,
            callbackIpcId: arg.callbackIpcId,
          },
        });
      })
      .catch((err) => {
        event.sender.send(IPC_RENDERER_ON_MESSAGE, {
          event: {
            error: err,
            sendMessage: arg.sendMessage,
            callbackIpcId: arg.callbackIpcId,
          },
        });
      });
  });
};

module.exports = {
  initTaskIPCEvent,
};
