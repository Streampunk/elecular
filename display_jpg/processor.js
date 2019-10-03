let processor = {
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

    doLoad: () => {
      this.c1 = document.getElementById("c1");
      this.ctx1 = this.c1.getContext("2d");
			if (!this.img) { this.img = new Image(); this.counter = 0; }
      let self = this;
			this.img.src = `http://localhost:3000/${self.counter++}.jpg`;

			img.onload = oEvent => {
				self.ctx1.drawImage(self.img, 0, 0);
				self.img.src = `http://localhost:3000/${self.counter++}jpg`;
			};
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
