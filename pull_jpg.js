const { app, BrowserWindow } = require('electron')
const Koa = require('koa');
const kapp = new Koa();
const cors = require('@koa/cors');
kapp.use(cors());

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
	let lastBuf = Buffer.alloc(8294400);

	win.loadURL('https://app.singular.live/output/3KTkvd53TvQHZ95Q4Bg0Ld/Default?aspect=16:9')
	// win.webContents.enableDeviceEmulation({ screenSize: { width: 1920, height: 1080 }, viewSize: { width: 1920, height: 1080 }});
	win.webContents.on('paint', (event, dirty, image) => {
    console.log(counter++, dirty);
		lastBuf = image.toJPEG(50);
  })
  win.webContents.setFrameRate(25)

	kapp.use(async ctx => {
		ctx.type = 'image/jpeg';
		ctx.body = lastBuf;
	})

	let server = kapp.listen(3000);
	process.on('SIGHUP', server.close)
})
