'use client';

import React, { useEffect, useRef } from 'react';

interface ParticleTextProps {
  text: string;
  className?: string;
}

class Point {
  x: number;
  y: number;
  vx: number;
  vy: number;
  ctx: CanvasRenderingContext2D;
  canvas: HTMLCanvasElement;
  pointsRef: React.MutableRefObject<Point[]>;
  maskRef: React.MutableRefObject<ImageData | null>;

  constructor(
    x: number, 
    y: number, 
    vx: number = 1, 
    vy: number = 1,
    ctx: CanvasRenderingContext2D,
    canvas: HTMLCanvasElement,
    pointsRef: React.MutableRefObject<Point[]>,
    maskRef: React.MutableRefObject<ImageData | null>
  ) {
    this.x = x;
    this.y = y;
    this.vx = vx;
    this.vy = vy;
    this.ctx = ctx;
    this.canvas = canvas;
    this.pointsRef = pointsRef;
    this.maskRef = maskRef;
  }

  update() {
    this.ctx.beginPath();
    this.ctx.fillStyle = '#95a5a6';
    this.ctx.arc(this.x, this.y, 1, 0, 2 * Math.PI);
    this.ctx.fill();
    this.ctx.closePath();

    // Change direction if running into black pixel
    if (
      this.x + this.vx >= this.canvas.width ||
      this.x + this.vx < 0 ||
      (this.maskRef.current && this.maskRef.current.data[this.coordsToI(this.x + this.vx, this.y, this.maskRef.current.width)] != 255)
    ) {
      this.vx *= -1;
      this.x += this.vx * 2;
    }
    if (
      this.y + this.vy >= this.canvas.height ||
      this.y + this.vy < 0 ||
      (this.maskRef.current && this.maskRef.current.data[this.coordsToI(this.x, this.y + this.vy, this.maskRef.current.width)] != 255)
    ) {
      this.vy *= -1;
      this.y += this.vy * 2;
    }

    // Draw connections between nearby points
    for (let k = 0; k < this.pointsRef.current.length; k++) {
      if (this.pointsRef.current[k] === this) continue;

      const d = Math.sqrt(
        Math.pow(this.x - this.pointsRef.current[k].x, 2) +
        Math.pow(this.y - this.pointsRef.current[k].y, 2)
      );
      
      if (d < 5) {
        this.ctx.strokeStyle = '#95a5a6';
        this.ctx.lineWidth = 0.2;
        this.ctx.beginPath();
        this.ctx.moveTo(this.x, this.y);
        this.ctx.lineTo(this.pointsRef.current[k].x, this.pointsRef.current[k].y);
        this.ctx.stroke();
      }
      if (d < 20) {
        this.ctx.strokeStyle = '#95a5a6';
        this.ctx.lineWidth = 0.1;
        this.ctx.beginPath();
        this.ctx.moveTo(this.x, this.y);
        this.ctx.lineTo(this.pointsRef.current[k].x, this.pointsRef.current[k].y);
        this.ctx.stroke();
      }
    }

    this.x += this.vx;
    this.y += this.vy;
  }

  private coordsToI(x: number, y: number, w: number) {
    if (!this.maskRef.current) return 0;
    return (this.maskRef.current.width * y + x) * 4;
  }
}

export default function ParticleText({ text, className = '' }: ParticleTextProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number | null>(null);
  const pointsRef = useRef<Point[]>([]);
  const whitePixelsRef = useRef<number[][]>([]);
  const maskRef = useRef<ImageData | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const pointCount = 500;
    const fontStr = 'bold 128pt Helvetica Neue, Helvetica, Arial, sans-serif';

    function loop() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      for (let k = 0; k < pointsRef.current.length; k++) {
        pointsRef.current[k].update();
      }
      animationRef.current = requestAnimationFrame(loop);
    }

    function init() {
      // Set canvas size based on text
      ctx.font = fontStr;
      ctx.textAlign = 'center';
      canvas.width = ctx.measureText(text).width;
      canvas.height = 128; // Set to font size

      // Draw text
      ctx.beginPath();
      ctx.fillStyle = '#000';
      ctx.rect(0, 0, canvas.width, canvas.height);
      ctx.fill();
      ctx.font = fontStr;
      ctx.textAlign = 'left';
      ctx.fillStyle = '#fff';
      ctx.fillText(text, 0, canvas.height / 2 + canvas.height / 2);
      ctx.closePath();

      // Save mask
      maskRef.current = ctx.getImageData(0, 0, canvas.width, canvas.height);

      // Draw background
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Save all white pixels in an array
      whitePixelsRef.current = [];
      for (let i = 0; i < maskRef.current.data.length; i += 4) {
        if (
          maskRef.current.data[i] == 255 &&
          maskRef.current.data[i + 1] == 255 &&
          maskRef.current.data[i + 2] == 255 &&
          maskRef.current.data[i + 3] == 255
        ) {
          whitePixelsRef.current.push([iToX(i, maskRef.current.width), iToY(i, maskRef.current.width)]);
        }
      }

      // Create points
      pointsRef.current = [];
      for (let k = 0; k < pointCount; k++) {
        addPoint();
      }

      // Start animation
      loop();
    }

    function addPoint() {
      if (whitePixelsRef.current.length === 0) return;
      
      const spawn = whitePixelsRef.current[Math.floor(Math.random() * whitePixelsRef.current.length)];
      const p = new Point(
        spawn[0],
        spawn[1],
        Math.floor(Math.random() * 2 - 1) || 1,
        Math.floor(Math.random() * 2 - 1) || 1,
        ctx,
        canvas,
        pointsRef,
        maskRef
      );
      pointsRef.current.push(p);
    }

    function iToX(i: number, w: number) {
      return (i % (4 * w)) / 4;
    }

    function iToY(i: number, w: number) {
      return Math.floor(i / (4 * w));
    }

    init();

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [text]);

  return (
    <canvas
      ref={canvasRef}
      className={className}
      style={{
        maxWidth: '100%',
        height: 'auto',
      }}
    />
  );
}