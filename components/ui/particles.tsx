"use client";

import React, { type CSSProperties, useEffect, useRef } from "react";

type ParticlesProps = {
  particleCount?: number;
  particleSpread?: number;
  speed?: number;
  particleColors?: string[];
  moveParticlesOnHover?: boolean;
  particleHoverFactor?: number;
  alphaParticles?: boolean;
  particleBaseSize?: number;
  sizeRandomness?: number;
  cameraDistance?: number;
  disableRotation?: boolean;
  pixelRatio?: number;
  className?: string;
  style?: CSSProperties;
};

type Particle = {
  x: number;
  y: number;
  z: number;
  vx: number;
  vy: number;
  vz: number;
  size: number;
  color: string;
  phase: number;
};

const defaultColors = ["#ffffff", "#cbd5e1", "#94a3b8"];

const clamp = (value: number, min: number, max: number) =>
  Math.min(max, Math.max(min, value));

export default function Particles({
  particleCount = 200,
  particleSpread = 10,
  speed = 0.1,
  particleColors = defaultColors,
  moveParticlesOnHover = false,
  particleHoverFactor = 1,
  alphaParticles = false,
  particleBaseSize = 100,
  sizeRandomness = 1,
  cameraDistance = 25,
  disableRotation = false,
  pixelRatio = 1,
  className,
  style,
}: ParticlesProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const pointerRef = useRef<{ x: number; y: number } | null>(null);
  const frameRef = useRef<number | null>(null);

  useEffect(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;

    if (!container || !canvas) {
      return;
    }

    const context = canvas.getContext("2d");
    if (!context) {
      return;
    }

    const colors = particleColors.length > 0 ? particleColors : defaultColors;
    const spread = Math.max(1, particleSpread);
    const count = Math.max(0, Math.round(particleCount));
    const baseSize = Math.max(1, particleBaseSize);
    const sizeSpread = Math.max(0, sizeRandomness);
    const worldScale = 28;
    const hoverStrength = Math.max(0, particleHoverFactor) * 0.0006 * speed;

    const createParticle = (): Particle => ({
      x: (Math.random() - 0.5) * spread * 2,
      y: (Math.random() - 0.5) * spread * 2,
      z: (Math.random() - 0.5) * spread * 2,
      vx: (Math.random() - 0.5) * 0.01 * speed,
      vy: (Math.random() - 0.5) * 0.01 * speed,
      vz: (Math.random() - 0.5) * 0.004 * speed,
      size: (baseSize / 100) * (0.4 + Math.random() * (0.5 + sizeSpread * 0.5)),
      color: colors[Math.floor(Math.random() * colors.length)] ?? defaultColors[0],
      phase: Math.random() * Math.PI * 2,
    });

    const resetParticles = () => {
      particlesRef.current = Array.from({ length: count }, createParticle);
    };

    const resize = () => {
      const rect = container.getBoundingClientRect();
      const dpr = Math.max(1, (window.devicePixelRatio || 1) * pixelRatio);

      canvas.width = Math.max(1, Math.floor(rect.width * dpr));
      canvas.height = Math.max(1, Math.floor(rect.height * dpr));
      canvas.style.width = `${rect.width}px`;
      canvas.style.height = `${rect.height}px`;
      context.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const handlePointerMove = (event: PointerEvent) => {
      if (!moveParticlesOnHover) {
        return;
      }

      const rect = container.getBoundingClientRect();
      if (
        event.clientX < rect.left ||
        event.clientX > rect.right ||
        event.clientY < rect.top ||
        event.clientY > rect.bottom
      ) {
        pointerRef.current = null;
        return;
      }

      pointerRef.current = {
        x: ((event.clientX - rect.left) / Math.max(rect.width, 1)) * 2 - 1,
        y: ((event.clientY - rect.top) / Math.max(rect.height, 1)) * 2 - 1,
      };
    };

    const draw = (time: number) => {
      const width = canvas.width / Math.max(1, (window.devicePixelRatio || 1) * pixelRatio);
      const height = canvas.height / Math.max(1, (window.devicePixelRatio || 1) * pixelRatio);
      const elapsed = time * 0.001;

      context.clearRect(0, 0, width, height);
      context.globalCompositeOperation = "source-over";
      context.globalAlpha = 1;

      const rotationY = disableRotation ? 0 : elapsed * 0.25;
      const rotationX = disableRotation ? 0 : Math.sin(elapsed * 0.35) * 0.18;
      const cosY = Math.cos(rotationY);
      const sinY = Math.sin(rotationY);
      const cosX = Math.cos(rotationX);
      const sinX = Math.sin(rotationX);
      const hover = pointerRef.current;

      for (const particle of particlesRef.current) {
        particle.vx += Math.sin(elapsed * 0.7 + particle.phase) * 0.00008 * speed;
        particle.vy += Math.cos(elapsed * 0.8 + particle.phase) * 0.00008 * speed;
        particle.vz += Math.sin(elapsed * 0.5 + particle.phase) * 0.00003 * speed;

        if (hover) {
          const targetX = hover.x * spread;
          const targetY = -hover.y * spread;
          const deltaX = targetX - particle.x;
          const deltaY = targetY - particle.y;
          const distance = Math.max(Math.hypot(deltaX, deltaY), 0.001);
          const influence = clamp(1 - distance / (spread * 1.5), 0, 1) * hoverStrength;

          particle.vx += (deltaX / distance) * influence;
          particle.vy += (deltaY / distance) * influence;
        }

        particle.x += particle.vx;
        particle.y += particle.vy;
        particle.z += particle.vz;

        particle.vx *= 0.995;
        particle.vy *= 0.995;
        particle.vz *= 0.995;

        if (particle.x > spread) particle.x = -spread;
        if (particle.x < -spread) particle.x = spread;
        if (particle.y > spread) particle.y = -spread;
        if (particle.y < -spread) particle.y = spread;
        if (particle.z > spread) particle.z = -spread;
        if (particle.z < -spread) particle.z = spread;

        const rotatedX = particle.x * cosY - particle.z * sinY;
        const rotatedZ = particle.x * sinY + particle.z * cosY;
        const tiltedY = particle.y * cosX - rotatedZ * sinX;
        const perspective = cameraDistance / Math.max(1, cameraDistance + rotatedZ);
        const screenX = width / 2 + rotatedX * worldScale * perspective;
        const screenY = height / 2 + tiltedY * worldScale * perspective;
        const radius = Math.max(0.45, particle.size * perspective * 0.9);

        if (
          screenX < -radius ||
          screenX > width + radius ||
          screenY < -radius ||
          screenY > height + radius
        ) {
          continue;
        }

        context.beginPath();
        context.fillStyle = particle.color;
        context.globalAlpha = alphaParticles
          ? clamp(0.18 + perspective * 0.7, 0.1, 0.9)
          : 0.85;
        context.arc(screenX, screenY, radius, 0, Math.PI * 2);
        context.fill();
      }

      context.globalAlpha = 1;
      frameRef.current = window.requestAnimationFrame(draw);
    };

    resetParticles();
    resize();
    frameRef.current = window.requestAnimationFrame(draw);

    const observer = new ResizeObserver(resize);
    observer.observe(container);
    window.addEventListener("resize", resize);

    if (moveParticlesOnHover) {
      window.addEventListener("pointermove", handlePointerMove, { passive: true });
    }

    return () => {
      if (frameRef.current !== null) {
        window.cancelAnimationFrame(frameRef.current);
      }

      observer.disconnect();
      window.removeEventListener("resize", resize);

      if (moveParticlesOnHover) {
        window.removeEventListener("pointermove", handlePointerMove);
      }
    };
  }, [
    alphaParticles,
    cameraDistance,
    disableRotation,
    moveParticlesOnHover,
    particleBaseSize,
    particleColors,
    particleCount,
    particleHoverFactor,
    particleSpread,
    pixelRatio,
    sizeRandomness,
    speed,
  ]);

  return (
    <div
      ref={containerRef}
      className={`pointer-events-none ${className ?? ""}`}
      style={style}
      aria-hidden="true"
    >
      <canvas ref={canvasRef} className="block h-full w-full" />
    </div>
  );
}
