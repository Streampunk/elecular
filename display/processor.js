let processor = {
	  socket : new WebSocket('ws://localhost:8080'),
    // timerCallback: function() {
    //   if (this.video.paused || this.video.ended) {
    //     return;
    //   }
    //   this.computeFrame();
    //   let self = this;
    //   setTimeout(function () {
    //       self.timerCallback();
    //     }, 0);
    // },

    doLoad: function() {
      this.c1 = document.getElementById("c1");
      this.ctx1 = this.c1.getContext("2d");
      let self = this;
			this.socket.addEventListener('message', event => {
				event.data.arrayBuffer().then(ab => {
					//let frame = new ImageData(Uint8ClampedArray.from(ab), 1920, 1080);
					let frame = new ImageData(new Uint8ClampedArray(ab), 1920, 1080);
					console.log(frame);
					this.ctx1.putImageData(frame, 0, 0);
				});
			})
    }

  //   computeFrame: function() {
  //     this.ctx1.drawImage(this.video, 0, 0, this.width, this.height);
  //     let frame = this.ctx1.getImageData(0, 0, this.width, this.height);
  //         let l = frame.data.length / 4;
	//
  //     for (let i = 0; i < l; i++) {
  //       let r = frame.data[i * 4 + 0];
  //       let g = frame.data[i * 4 + 1];
  //       let b = frame.data[i * 4 + 2];
  //       if (g > 100 && r > 100 && b < 43)
  //         frame.data[i * 4 + 3] = 0;
  //     }
  //     this.ctx2.putImageData(frame, 0, 0);
  //     return;
  //   }
};

document.addEventListener("DOMContentLoaded", () => {
  processor.doLoad();
});
