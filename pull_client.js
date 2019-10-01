const wsl = require('ws');
const macadam = require('macadam');
const request = require('request-promise-native')

//  let ws = new wsl('http://localhost:8080')
let playback

// console.dir(macadam.getDeviceInfo()[0].outputDisplayModes);

let timer = (w) => new Promise((resolve) => {
	setTimeout(resolve, w);
})

async function init () {
  playback = await macadam.playback({
	  deviceIndex: 0, // Index relative to the 'macadam.getDeviceInfo()' array
	  displayMode: macadam.bmdModeHD1080i50,
	  pixelFormat: macadam.bmdFormat8BitBGRA
	});
	// ws.on('message', m => {
	// 	console.log(m.length);
	// 	playback.displayFrame(m);
	// });
	let start = process.hrtime();
	let counter = 0;
	while (true) {
		let frame = await request('http://localhost:3000/', { encoding: null });
		playback.displayFrame(frame);
		let end = process.hrtime(start);
		let wait = (40000000 * counter - end[1]) / 1000000 | 0;
		await timer(wait);
	}
};

init();
