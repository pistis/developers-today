const db = require("../../sqlite/models");
const { initProjectIPCEvent } = require("./project");
const { initCategoryIPCEvent } = require("./category");
const { initTaskIPCEvent } = require("./task");

async function syncDatabase() {
  try {
    return await db.sequelize.sync();
  } catch (e) {
    console.log(e);
    throw new Error("데이터베이스 연결 실패");
  }
}

function initDatabaseIPCEvent() {
  initProjectIPCEvent();
  initCategoryIPCEvent();
  initTaskIPCEvent();
}

module.exports = {
  init: async () => {
    await syncDatabase();
    console.log("데이터베이스 연결 성공");
    initDatabaseIPCEvent();
    console.log("데이터베이스 IPC Event 초기화");
  },
};
