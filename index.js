let canvas;
let ctx;
let flowField;
let flowFieldAnimation;

window.onload = () => {
  canvas = document.getElementById("game");
  ctx = canvas.getContext("2d");
  canvas.height = window.innerHeight;
  canvas.width = window.innerWidth;
  flowField = new FlowFieldEffect(canvas.width, canvas.height, ctx);
  flowField.animate(0);
};

window.addEventListener("resize", () => {
  window.cancelAnimationFrame(flowFieldAnimation);
  canvas.height = window.innerHeight;
  canvas.width = window.innerWidth;
  flowField = new FlowFieldEffect(canvas.width, canvas.height, ctx);
  flowField.animate(0);
});

class FlowFieldEffect {
  constructor(width, height, ctx) {
    this.width = width;
    this.height = height;
    this.cellSize = 15;
    this.ctx = ctx;
    this.ctx.lineWidth = 2;
    this.createGradient();
    this.gradient;
    this.ctx.strokeStyle = this.gradient;
    this.radius = 5;
    this.vr = 0.004;
    this.oldTimeStamp = 0;
    this.interval = 16;
    this.counter = 0;
  }

  draw(x, y, angle) {
    this.ctx.beginPath();
    this.ctx.moveTo(x, y);
    this.ctx.lineTo(x + Math.cos(angle) * 50, y + Math.sin(angle) * 50);
    this.ctx.stroke();
  }

  createGradient() {
    this.gradient = this.ctx.createLinearGradient(
      0,
      0,
      this.width,
      this.height
    );
    this.gradient.addColorStop("0.1", "blue");
    this.gradient.addColorStop("0.2", "	#FFF700");
    this.gradient.addColorStop("0.5", "#FF007F");
    this.gradient.addColorStop("0.7", "#1974D2");
    this.gradient.addColorStop("0.9", "#66FF00");
  }

  animate(timeStamp) {
    let deltaTime = timeStamp - this.oldTimeStamp;

    if (this.counter > this.interval) {
      this.ctx.clearRect(0, 0, this.width, this.height);
      this.radius += this.vr;

      if (this.radius > 10 || this.radius < 1) {
        this.vr *= -1;
      }
      for (let y = 0; y < this.height; y += this.cellSize) {
        for (let x = 0; x < this.width; x += this.cellSize) {
          const angle =
            (Math.cos(x * 0.0005) + Math.sin(y * 0.0005)) * this.radius;
          this.draw(x, y, angle);
        }
      }
    } else {
      this.counter += deltaTime;
    }

    flowFieldAnimation = window.requestAnimationFrame(this.animate.bind(this));
  }
}
