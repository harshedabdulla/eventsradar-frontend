import React, {useState, useEffect, useRef} from 'react';
import { isMobile } from 'react-device-detect';

import style from "./Radar.module.scss";


const eventRadarLogo = "http://localhost:3000/assets/logo.svg";
const tedLogo = "http://localhost:3000/assets/tedLogo.png";



class MapView {
  mouse = { x: 0, y: 0, oldX: 0, oldY: 0, button: false };
  scale = 5;              // current this.scale
  pos = { x: 0, y: 0 }; // current position of origin
  mapContext;
  maxCircles = 10;
  zoom_factor = 0.04;
  getEvent = () => 0;

  constructor(map, getEvent) {
    this.map = map;
    this.getEvent = getEvent;
    this.mapContext = map.getContext("2d");
    this.pos = { x: this.map.width / 2, y: this.map.height / 2 };

    this.map.addEventListener("mousemove", this.mouseEvent, { passive: true });
    this.map.addEventListener("mousedown", this.mouseEvent, { passive: true });
    this.map.addEventListener("mouseup", this.mouseEvent, { passive: true });
    this.map.addEventListener("mouseout", this.mouseEvent, { passive: true });
    this.map.addEventListener("touchstart", this.mouseEvent, { passive: true });
    this.map.addEventListener("touchend", this.mouseEvent, { passive: true });
    this.map.addEventListener("touchmove", this.mouseEvent, { passive: true });

    this.map.addEventListener("wheel", this.mouseWheelEvent, { passive: false });
    this.map.addEventListener("resize", () => this.pos = { x: this.map.width / 2, y: this.map.height / 2 }, { passive: true });

    requestAnimationFrame(this.drawCanvas);
  }

  reset() {
    this.scale = 1;
    this.pos = { x: this.map.width / 2, y: this.map.height / 2 };
  }

  scaleAt(at, amount) {
    if (amount > 0) {
      if (this.scale > 5.2)
        this.scale = Math.max(1, this.scale);
      else
        this.scale = Math.max(1, this.scale + amount);
    }
    else {
      this.scale = Math.max(1, this.scale + amount);
    }
  }

  drawCanvas = (frame) => {
    this.mapContext.clearRect(0, 0, this.map.width, this.map.height);
    this.radarScan(frame / 2000);

    const step = this.map.width / this.maxCircles / 2;
    const days = Array(this.maxCircles * 8)
        .fill(1)
        .map((v, i) => (step * (i + this.scale)));

    console.log(days);

    const radius = days.map((day) => day % (this.map.width * 4));
    const events = days.map((day) => [day  % (this.map.width * 4), this.getEvent(day)]);

    radius.forEach(this.drawCircle);
    events.forEach(this.drawEvent);

    requestAnimationFrame(this.drawCanvas);
  };

  drawCircle = (radius) => {
    this.mapContext.strokeStyle = "#37AE47";
    this.mapContext.beginPath();
    this.mapContext.arc(this.pos.x, this.pos.y, radius, 0, 2 * Math.PI);
    this.mapContext.stroke();
  }

  drawEvent = ([r, event]) =>
  {
      const x = r*Math.cos(event) + this.pos.x;
      const y = r*Math.sin(event) + this.pos.y;

      this.mapContext.fillText(event, x, y, 30);
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

  mouseWheelEvent = (event) => {
    const x = event.offsetX;
    const y = event.offsetY;

    if (event.deltaY < 0) {
      this.scaleAt({ x, y }, this.zoom_factor);
    }
    else
      this.scaleAt({ x, y }, -this.zoom_factor);

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
      if (isMobile && event.type !== "touchmove") {
        this.mouse.oldX = this.mouse.x;
        this.mouse.oldY = this.mouse.y;
      }
      const x = Math.max(this.mouse.x - this.mouse.oldX + this.pos.x, 0) || 0;
      const y = Math.max(this.mouse.y - this.mouse.oldY + this.pos.y, 0) || 0;
      this.pos = { x: Math.min(x, this.map.width), y: Math.min(y, this.map.height) };
    }
  };
}

const Radar = (props) => {

  const canvas = useRef();
  const [view, setView] = useState(null);

  function getEvent(day){
    return day;
  }

  useEffect(() => {
    if(!canvas.current)
      return;

    canvas.current.width = window.innerWidth;
    canvas.current.height = window.innerHeight;

    setView(new MapView(canvas.current, getEvent));
  }, [canvas]);

  return (
    <div>
      <canvas ref={canvas}></canvas>
    </div>
  )
}

export default Radar
