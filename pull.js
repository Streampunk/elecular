const { app, BrowserWindow } = require('electron')
const Koa = require('koa');
const kapp = new Koa();
const cors = require('@koa/cors');
kapp.use(cors());

app.disableHardwareAcceleration()
app.commandLine.appendSwitch('force-device-scale-factor', '1');

let win
const width = 1920;
const height = 1080;

app.once('ready', () => {
  win = new BrowserWindow({
		show: false,
    frame: false,
		width: width,
		height: height,
    webPreferences: {
      offscreen: true,
      transparent: true
    }
  })

	let counter = 0;
	let lastBuf = Buffer.alloc(width * 3 * height);

	win.loadURL('https://app.singular.live/output/3KTkvd53TvQHZ95Q4Bg0Ld/Default?aspect=16:9')
	// win.webContents.enableDeviceEmulation({ screenSize: { width: 1920, height: 1080 }, viewSize: { width: 1920, height: 1080 }});
	win.webContents.on('paint', (event, dirty, image) => {
    console.log(counter++, dirty);
		lastBuf = image.toBitmap();
  })
  win.webContents.setFrameRate(25)

	kapp.use(async ctx => {
		ctx.body = lastBuf;
	})

	let server = kapp.listen(3000);
	process.on('SIGHUP', server.close)
})
