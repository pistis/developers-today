const { app, BrowserWindow } = require("electron");
const path = require("path");
const isDev = require("electron-is-dev");
const database = require("./ipcEvent/database");

let win = null;

function createWindow() {
  win = new BrowserWindow({
    width: 1280,
    height: 1024,
    resizable: true,
    webPreferences: {
      nodeIntegration: true,
      preload: path.join(__dirname, "preload.js"),
    },
  });

  if (isDev) {
    win.loadURL("http://localhost:3000/index.html");
  } else {
    // 'build/index.html'
    win.loadURL(`file://${__dirname}/../build/index.html`);
  }

  win.on("closed", () => (win = null));

  // Hot Reloading
  if (isDev) {
    // 'node_modules/.bin/electronPath'
    require("electron-reload")(__dirname, {
      electron: path.join(
        __dirname,
        "..",
        "..",
        "node_modules",
        ".bin",
        "electron"
      ),
      forceHardReset: true,
      hardResetMethod: "exit",
    });
  }

  if (isDev) {
    win.webContents.openDevTools();
  }
}

app.on("ready", async () => {
  try {
    await database.init();
    createWindow();
  } catch (e) {
    // console.error(e);
  }
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  if (win === null) {
    createWindow();
  }
});
