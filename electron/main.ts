import { app, BrowserWindow, ipcMain } from 'electron'
import { createRequire } from 'node:module'
import { fileURLToPath } from 'node:url'
import { promises as fs } from 'fs'
import path from 'node:path'

const require = createRequire(import.meta.url)
const __dirname = path.dirname(fileURLToPath(import.meta.url))

// The built directory structure
//
// ├─┬─┬ dist
// │ │ └── index.html
// │ │
// │ ├─┬ dist-electron
// │ │ ├── main.js
// │ │ └── preload.mjs
// │
process.env.APP_ROOT = path.join(__dirname, '..')

// 🚧 Use ['ENV_NAME'] avoid vite:define plugin - Vite@2.x
export const VITE_DEV_SERVER_URL = process.env['VITE_DEV_SERVER_URL']
export const MAIN_DIST = path.join(process.env.APP_ROOT, 'dist-electron')
export const RENDERER_DIST = path.join(process.env.APP_ROOT, 'dist')

process.env.VITE_PUBLIC = VITE_DEV_SERVER_URL ? path.join(process.env.APP_ROOT, 'public') : RENDERER_DIST

let win: BrowserWindow | null

function createWindow() {
  win = new BrowserWindow({
    icon: path.join(process.env.VITE_PUBLIC, 'electron-vite.svg'),
    webPreferences: {
      preload: path.join(__dirname, 'preload.mjs'),
    },
  })

  // Test active push message to Renderer-process.
  win.webContents.on('did-finish-load', () => {
    win?.webContents.send('main-process-message', (new Date).toLocaleString())
  })

  if (VITE_DEV_SERVER_URL) {
    win.loadURL(VITE_DEV_SERVER_URL)
  } else {
    // win.loadFile('dist/index.html')
    win.loadFile(path.join(RENDERER_DIST, 'index.html'))
  }
}

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
    win = null
  }
})

app.on('activate', () => {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow()
  }
})

// Data storage functions
const getDataPath = () => {
  return path.join(app.getPath('userData'), 'data.json')
}

// IPC handlers for data persistence
ipcMain.handle('save-data', async (event, data) => {
  try {
    const dataPath = getDataPath()
    
    // Ensure directory exists
    const dir = path.dirname(dataPath)
    await fs.mkdir(dir, { recursive: true })
    
    await fs.writeFile(dataPath, JSON.stringify(data, null, 2))
    return { success: true }
  } catch (error) {
    console.error('Save failed:', error)
    return { success: false, error: error.message }
  }
})

ipcMain.handle('load-data', async () => {
  try {
    const dataPath = getDataPath()
    const data = await fs.readFile(dataPath, 'utf8')
    return { success: true, data: JSON.parse(data) }
  } catch (error) {
    // File doesn't exist or is corrupted - return empty structure
    console.log('No existing data file found, returning empty structure')
    return { success: true, data: { categories: [] } }
  }
})

app.whenReady().then(createWindow)
