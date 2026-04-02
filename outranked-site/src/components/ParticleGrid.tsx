"use client";

import { useEffect, useRef, useState } from "react";

export default function ParticleGrid() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Skip on mobile / low-power devices
    const mq = window.matchMedia("(max-width: 768px)");
    if (mq.matches || navigator.hardwareConcurrency <= 2) {
      setIsMobile(true);
      return;
    }

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

    // Use IntersectionObserver to only animate when visible
    let isVisible = true;
    const observer = new IntersectionObserver(
      ([entry]) => {
        isVisible = entry.isIntersecting;
        if (isVisible && !animationId) animate();
      },
      { threshold: 0.1 }
    );
    observer.observe(canvas);

    function resize() {
      const dpr = Math.min(window.devicePixelRatio, 2); // Cap at 2x
      canvas!.width = canvas!.offsetWidth * dpr;
      canvas!.height = canvas!.offsetHeight * dpr;
      ctx!.scale(dpr, dpr);
      initParticles();
    }

    function initParticles() {
      particles.length = 0;
      const spacing = 50; // Wider spacing = fewer particles
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
      if (!isVisible) {
        animationId = 0;
        return;
      }

      ctx!.clearRect(0, 0, canvas!.offsetWidth, canvas!.offsetHeight);

      for (const p of particles) {
        const dx = mouse.x - p.x;
        const dy = mouse.y - p.y;
        const distSq = dx * dx + dy * dy; // Skip sqrt for comparison
        const maxDistSq = 14400; // 120^2

        if (distSq < maxDistSq) {
          const dist = Math.sqrt(distSq);
          const force = (120 - dist) / 120;
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

        const dispSq = (p.x - p.baseX) ** 2 + (p.y - p.baseY) ** 2;
        const displacement = Math.sqrt(dispSq);
        const alpha = Math.min(0.15 + displacement * 0.02, 0.8);

        ctx!.beginPath();
        ctx!.arc(p.x, p.y, p.size + displacement * 0.05, 0, Math.PI * 2);
        ctx!.fillStyle = `rgba(8, 145, 178, ${alpha})`;
        ctx!.fill();
      }

      // Draw connections — use spatial grid to avoid O(n²)
      const cellSize = 60;
      const grid = new Map<string, number[]>();
      for (let i = 0; i < particles.length; i++) {
        const cx = Math.floor(particles[i].x / cellSize);
        const cy = Math.floor(particles[i].y / cellSize);
        const key = `${cx},${cy}`;
        if (!grid.has(key)) grid.set(key, []);
        grid.get(key)!.push(i);
      }

      ctx!.lineWidth = 0.5;
      for (const [key, indices] of grid) {
        const [cx, cy] = key.split(",").map(Number);
        // Check this cell and neighbors
        for (let nx = cx - 1; nx <= cx + 1; nx++) {
          for (let ny = cy - 1; ny <= cy + 1; ny++) {
            const neighborKey = `${nx},${ny}`;
            const neighbors = grid.get(neighborKey);
            if (!neighbors) continue;
            for (const i of indices) {
              for (const j of neighbors) {
                if (j <= i) continue;
                const dx = particles[i].x - particles[j].x;
                const dy = particles[i].y - particles[j].y;
                const distSq = dx * dx + dy * dy;
                if (distSq < 3600) { // 60^2
                  const dist = Math.sqrt(distSq);
                  ctx!.beginPath();
                  ctx!.moveTo(particles[i].x, particles[i].y);
                  ctx!.lineTo(particles[j].x, particles[j].y);
                  ctx!.strokeStyle = `rgba(8, 145, 178, ${0.08 * (1 - dist / 60)})`;
                  ctx!.stroke();
                }
              }
            }
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

    canvas.addEventListener("mousemove", handleMouseMove, { passive: true });
    canvas.addEventListener("mouseleave", handleMouseLeave);
    window.addEventListener("resize", resize, { passive: true });

    resize();
    animate();

    return () => {
      cancelAnimationFrame(animationId);
      observer.disconnect();
      canvas.removeEventListener("mousemove", handleMouseMove);
      canvas.removeEventListener("mouseleave", handleMouseLeave);
      window.removeEventListener("resize", resize);
    };
  }, []);

  // Don't render canvas on mobile at all
  if (isMobile) return null;

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-auto"
      style={{ opacity: 0.6 }}
    />
  );
}
