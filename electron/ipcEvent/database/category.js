const { ipcMain } = require('electron');
const { IPC_RENDERER_ON_MESSAGE } = require('./constant');
const db = require('../../sqlite/models');

const initCategoryIPCEvent = () => {
  ipcMain.on('listCategory', async (event, arg) => {
    console.log('[IPC:main] listCategory', arg);
    db.Category.findAll().then((result) => {
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

  ipcMain.on('createCategory', async (event, arg) => {
    console.log('[IPC:main] createCategory', arg);

    const { category } = arg;
    const model = {
      name: category.name,
      description: category.description,
    };
    db.Category.create(model)
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

  ipcMain.on('updateCategory', async (event, arg) => {
    console.log('[IPC:main] updateCategory', arg);

    const { category } = arg;
    const model = {
      name: category.name,
      description: category.description,
    };
    db.Category.update(model, {
      where: { id: category.id },
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

  ipcMain.on('deleteCategory', async (event, arg) => {
    console.log('[IPC:main] deleteCategory', arg);

    const { categoryId } = arg;

    db.Category.destroy({
      where: { id: categoryId },
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
  initCategoryIPCEvent,
};
