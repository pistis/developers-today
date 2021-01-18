const { ipcMain } = require('electron');
const { IPC_RENDERER_ON_MESSAGE } = require('./constant');
const db = require('../../sqlite/models');

const initProjectIPCEvent = () => {
  ipcMain.on('listProject', async (event, arg) => {
    console.log('[IPC:main] listProject', arg);
    db.Project.findAll({
      order: [['type', 'DESC']],
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

  ipcMain.on('createProject', async (event, arg) => {
    console.log('[IPC:main] createProject', arg);

    const { project } = arg;
    const model = {
      name: project.name,
      description: project.description,
      type: project.type,
      startDate: project.startDate,
      endDate: project.endDate,
    };
    db.Project.create(model)
      .then(() => {
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

  ipcMain.on('updateProject', async (event, arg) => {
    console.log('[IPC:main] updateProject', arg);

    const { project } = arg;
    const model = {
      name: project.name,
      description: project.description,
      type: project.type,
      startDate: project.startDate,
      endDate: project.endDate,
    };
    db.Project.update(model, {
      where: { id: project.id },
    })
      .then(() => {
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

  ipcMain.on('deleteProject', async (event, arg) => {
    console.log('[IPC:main] deleteProject', arg);

    const { projectId } = arg;

    db.Project.destroy({
      where: { id: projectId },
    })
      .then(() => {
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
  initProjectIPCEvent,
};
