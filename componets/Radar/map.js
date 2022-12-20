class MapView {
  mouse = {x: 0, y: 0, oldX: 0, oldY: 0, button: false};
  scale = 1;              // current this.scale
  pos = {x: 0, y: 0}; // current position of origin
  mapContext;
  maxCircles = 5;
  zoom_factor = 0.04;
  constructor(map) {
    this.map = map;
    this.mapContext = map.getContext("2d");
    this.pos = {x: this.map.width / 2, y: this.map.height / 2};
    // set background color black


    this.map.addEventListener("mousemove", this.mouseEvent, {passive: true});
    this.map.addEventListener("mousedown", this.mouseEvent, {passive: true});
    this.map.addEventListener("mouseup", this.mouseEvent, {passive: true});
    this.map.addEventListener("mouseout", this.mouseEvent, {passive: true});
    this.map.addEventListener("touchstart", this.mouseEvent, {passive: true});
    this.map.addEventListener("touchend", this.mouseEvent, {passive: true});
    this.map.addEventListener("touchmove", this.mouseEvent, {passive: true});

    this.map.addEventListener("wheel", this.mouseWheelEvent, {passive: false});
    this.map.addEventListener("resize", () => this.pos = {x: this.map.width / 2, y: this.map.height / 2},
      {passive: true});


    requestAnimationFrame(this.drawCanvas);
  }

  reset() {
    this.scale = 1;
    this.pos = {x: this.map.width / 2, y: this.map.height / 2};
  }

  scaleAt(at, amount) {
    this.scale = Math.max(1, this.scale + amount);
  }

  drawCanvas = (frame) => {
    this.mapContext.clearRect(0, 0, this.map.width, this.map.height);
    this.mapContext.fillStyle = "rgba(7,59,13,1)";
    this.mapContext.fillRect(0, 0, this.map.width, this.map.height);
    this.radarScan(frame / 2000);

    const step = canvas.width / this.maxCircles / 2;
    const radius = Array(this.maxCircles * 8).fill(1)
      .map((v, i) => (step * (i + this.scale)) % (canvas.width * 4))

    radius.forEach(this.drawCircle);
    this.set_logo()
    requestAnimationFrame(this.drawCanvas);
  };

  mouseWheelEvent = (event) => {
    const x = event.offsetX;
    const y = event.offsetY;

    if (event.deltaY < 0)
      this.scaleAt({x, y}, this.zoom_factor);
    else
      this.scaleAt({x, y}, -this.zoom_factor);

    event.preventDefault();
  };

  mouseEvent = async (event) => {
    if (event.type === "mousedown" || event.type === "touchstart")
      this.mouse.button = true;

    if (event.type === "mouseup" || event.type === "mouseout" || event.type === "touchend")
      this.mouse.button = false;

    this.mouse.oldX = this.mouse.x;
    this.mouse.oldY = this.mouse.y;
    this.mouse.x = event.offsetX ?? event.touches[0]?.clientX;
    this.mouse.y = event.offsetY ?? event.touches[0]?.clientY;

    if (this.mouse.button && this.scale > 0) {
      const x = Math.max(this.mouse.x - this.mouse.oldX + this.pos.x, 0) || 0;
      const y = Math.max(this.mouse.y - this.mouse.oldY + this.pos.y, 0) || 0;

      this.pos = {x: Math.min(x, this.map.width), y: Math.min(y, this.map.height)};
    }
  };


  set_logo() {
    const logo = new Image();
    logo.src = "img/logo.png";
    logo.width = 100;
    logo.height = 100;
    this.mapContext.drawImage(logo, this.pos.x-logo.width/2, this.pos.y-logo.height/2, logo.width, logo.height);

  }
  radarScan(angle) {
    const start = angle;
    const end = start + Math.PI / 2;

    const r = this.map.width / 2;
    const x1 = this.pos.x;
    const y1 = this.pos.y;
    const x2 = this.pos.x + r * Math.cos(start);
    const y2 = this.pos.y + r * Math.sin(start);

    const gradient = this.mapContext.createLinearGradient(x1, y1, x2, y2);

    gradient.addColorStop(0, "rgba(55,174,71,1)");
    gradient.addColorStop(0.01, "rgba(55,174,71,0.4)");
    gradient.addColorStop(1, "rgba(55,174,71,0)");

    this.mapContext.fillStyle = gradient;
    this.mapContext.lineWidth = 0;

    this.mapContext.beginPath();
    this.mapContext.moveTo(this.pos.x, this.pos.y);
    this.mapContext.arc(this.pos.x, this.pos.y, r * 4, start, end);
    this.mapContext.closePath();
    this.mapContext.fill();
  }

  drawCircle = (radius) =>{
    // draw circle with green stroke
    this.mapContext.strokeStyle = "#37AE47";
    this.mapContext.beginPath();
    this.mapContext.arc(this.pos.x, this.pos.y, radius, 0, 2 * Math.PI);
    this.mapContext.stroke();
  }

}

const canvas = document.getElementById("canvas");
function setSize(){
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}

addEventListener("resize", setSize);
addEventListener("load", setSize);
setSize();

const map = new MapView(canvas);
