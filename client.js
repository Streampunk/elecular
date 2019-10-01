const wsl = require('ws');
const macadam = require('macadam');

let ws = new wsl('http://localhost:8080')
let playback

// console.dir(macadam.getDeviceInfo()[0].outputDisplayModes);

async function init () {
  playback = await macadam.playback({
	  deviceIndex: 0, // Index relative to the 'macadam.getDeviceInfo()' array
	  displayMode: macadam.bmdModeHD1080i50,
	  pixelFormat: macadam.bmdFormat8BitBGRA
	});
	ws.on('message', m => {
		console.log(m.length);
		playback.displayFrame(m);
	});
};

init();


process.on('SIGHUP', ws.close);
