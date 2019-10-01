const { app, BrowserWindow } = require('electron')
const wsl = require('ws')

app.disableHardwareAcceleration()
app.commandLine.appendSwitch('force-device-scale-factor', '1');

let win

app.once('ready', () => {
  win = new BrowserWindow({
		show: false,
    frame: false,
		width: 1920,
		height: 1080,
    webPreferences: {
      offscreen: true,
      transparent: true
    }
  })

	let counter = 0;
	let wss = new wsl.Server({ port: 8080 });
	let ws = null;
	let sent = true;

	win.loadURL('https://app.singular.live/output/3KTkvd53TvQHZ95Q4Bg0Ld/Default?width=1920&height=1080')
	// win.webContents.enableDeviceEmulation({ screenSize: { width: 1920, height: 1080 }, viewSize: { width: 1920, height: 1080 }});
	win.webContents.on('paint', (event, dirty, image) => {
    console.log(counter++, dirty, image.getBitmap().length)
		if (ws && sent) {
			sent = false;
			ws.send(image.toBitmap(), () => { sent = true; });
		}
  })
  win.webContents.setFrameRate(25)

	wss.on('connection', (webby) => {
		ws = webby;
	})

})
