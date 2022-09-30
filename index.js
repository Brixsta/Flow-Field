let canvas;
let ctx;
let flowField;
let flowFieldAnimation;
window.onload = () => {
  canvas = document.querySelector("#game");
  ctx = canvas.getContext("2d");
  canvas.height = window.innerHeight;
  canvas.width = window.innerWidth;
  flowField = new FlowFieldEffect(canvas.width, canvas.height, ctx);
  flowField.animate();
};

window.addEventListener("resize", () => {
  window.cancelAnimationFrame(flowFieldAnimation);
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  flowField = new FlowFieldEffect(canvas.width, canvas.height, ctx);
  flowField.animate();
});

class FlowFieldEffect {
  constructor(width, height, ctx) {
    this.ctx = ctx;
    this.width = width;
    this.height = height;
    this.cellSize = 15;
    this.x = 0;
    this.y = 0;
    this.angle = 1;
    this.gradient;
    this.createGradient();
    this.ctx.strokeStyle = this.gradient;
    this.radius = 0;
    this.vr = 0.01;
  }

  #draw(angle, x, y) {
    this.ctx.beginPath();
    this.ctx.lineWidth = 2;
    this.ctx.moveTo(x, y);
    this.ctx.lineTo(
      x + Math.cos(angle * 2) * 110,
      y + Math.sin(angle * 2) * 110
    );
    this.ctx.stroke();
  }

  createGradient() {
    this.gradient = this.ctx.createLinearGradient(
      0,
      0,
      this.width,
      this.height
    );
    this.gradient.addColorStop("0.1", "orange");
    this.gradient.addColorStop(".2", "#e60000 ");
    this.gradient.addColorStop(".3", "blue");
    this.gradient.addColorStop(".5", "teal");
    this.gradient.addColorStop(".8", "magenta");
    this.gradient.addColorStop(".9", "#00FF00");
  }

  animate(timeStamp) {
    this.ctx.clearRect(0, 0, canvas.width, canvas.height);
    this.radius += this.vr;
    if (this.radius > 5) {
      this.vr *= -1;
    }

    if (this.radius < -5) {
      this.vr *= -1;
    }
    for (let y = 0; y < this.height; y += this.cellSize) {
      for (let x = 0; x < this.width; x += this.cellSize) {
        const angle = (Math.cos(x * 0.001) + Math.sin(y * 0.001)) * this.radius;
        this.#draw(angle, x, y);
      }
    }
    flowFieldAnimation = window.requestAnimationFrame(this.animate.bind(this));
  }
}
