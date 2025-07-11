const { app, BrowserWindow } = require('electron')
const path = require('path')
// app，这个模块控制着您应用程序的事件生命周期。
// BrowserWindow，这个模块创建和管理 app 的窗口。

// const { app, BrowserWindow } = require('electron/main')
// 为了在编写 TypeScript 代码时进行更好的类型检查，您可以选择从electron/main导入主进程模块。

// 在应用准备就绪时调用函数
const createWindow = () => {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
    },
  })

  win.loadFile('index.html')
}

// 在应用准备就绪时调用函数
app.whenReady().then(() => {
  createWindow()
  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow()
    }
  })
})

// 在所有窗口关闭时退出应用
app.on('window-all-closed', () => {
  // 非 macOS 关闭窗口时退出应用
  if (process.platform !== 'darwin') {
    app.quit()
  }
})
