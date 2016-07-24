const electron = require('electron')
const app = electron.app
BrowserWindow = electron.BrowserWindow

let mainWindow

function createWindow () {
  mainWindow = new BrowserWindow({width: 1000, height: 1000})
  mainWindow.loadURL(`file://${__dirname}/index.html`)
  // mainWindow.webContents.openDevTools()
  mainWindow.on('closed', ()=>{
    mainWindow = null
  })
}

app.on('ready', createWindow)

app.on('window-all-closed', ()=>{
  if(process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', ()=>{
  if(mainWindow === null) {
    createWindow()
  }
})