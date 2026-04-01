"use client";

import { useEffect, useRef } from "react";

export default function ParticleGrid() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationId: number;
    let mouse = { x: -1000, y: -1000 };

    const particles: {
      x: number;
      y: number;
      baseX: number;
      baseY: number;
      vx: number;
      vy: number;
      size: number;
    }[] = [];

    function resize() {
      canvas!.width = canvas!.offsetWidth * window.devicePixelRatio;
      canvas!.height = canvas!.offsetHeight * window.devicePixelRatio;
      ctx!.scale(window.devicePixelRatio, window.devicePixelRatio);
      initParticles();
    }

    function initParticles() {
      particles.length = 0;
      const spacing = 40;
      const cols = Math.ceil(canvas!.offsetWidth / spacing);
      const rows = Math.ceil(canvas!.offsetHeight / spacing);
      for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
          particles.push({
            x: i * spacing + spacing / 2,
            y: j * spacing + spacing / 2,
            baseX: i * spacing + spacing / 2,
            baseY: j * spacing + spacing / 2,
            vx: 0,
            vy: 0,
            size: 1.5,
          });
        }
      }
    }

    function animate() {
      ctx!.clearRect(0, 0, canvas!.offsetWidth, canvas!.offsetHeight);

      for (const p of particles) {
        const dx = mouse.x - p.x;
        const dy = mouse.y - p.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const maxDist = 120;

        if (dist < maxDist) {
          const force = (maxDist - dist) / maxDist;
          const angle = Math.atan2(dy, dx);
          p.vx -= Math.cos(angle) * force * 2;
          p.vy -= Math.sin(angle) * force * 2;
        }

        p.vx += (p.baseX - p.x) * 0.05;
        p.vy += (p.baseY - p.y) * 0.05;
        p.vx *= 0.9;
        p.vy *= 0.9;
        p.x += p.vx;
        p.y += p.vy;

        const displacement = Math.sqrt(
          (p.x - p.baseX) ** 2 + (p.y - p.baseY) ** 2
        );
        const alpha = Math.min(0.15 + displacement * 0.02, 0.8);

        ctx!.beginPath();
        ctx!.arc(p.x, p.y, p.size + displacement * 0.05, 0, Math.PI * 2);
        ctx!.fillStyle = `rgba(8, 145, 178, ${alpha})`;
        ctx!.fill();
      }

      // Draw connections
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 60) {
            ctx!.beginPath();
            ctx!.moveTo(particles[i].x, particles[i].y);
            ctx!.lineTo(particles[j].x, particles[j].y);
            ctx!.strokeStyle = `rgba(8, 145, 178, ${0.08 * (1 - dist / 60)})`;
            ctx!.lineWidth = 0.5;
            ctx!.stroke();
          }
        }
      }

      animationId = requestAnimationFrame(animate);
    }

    function handleMouseMove(e: MouseEvent) {
      const rect = canvas!.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
    }

    function handleMouseLeave() {
      mouse = { x: -1000, y: -1000 };
    }

    canvas.addEventListener("mousemove", handleMouseMove);
    canvas.addEventListener("mouseleave", handleMouseLeave);
    window.addEventListener("resize", resize);

    resize();
    animate();

    return () => {
      cancelAnimationFrame(animationId);
      canvas.removeEventListener("mousemove", handleMouseMove);
      canvas.removeEventListener("mouseleave", handleMouseLeave);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-auto"
      style={{ opacity: 0.6 }}
    />
  );
}
