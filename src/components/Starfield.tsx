
import React, { useEffect, useRef } from 'react';

interface StarfieldProps {
  starCount?: number;
  speed?: number;
}

const Starfield: React.FC<StarfieldProps> = ({ 
  starCount = 500, 
  speed = 0.2 
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    // Set canvas to full screen
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    
    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();
    
    // Create stars with varying brightness and sizes
    const stars = Array.from({ length: starCount }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      radius: Math.random() * 2 + 0.2,
      speed: Math.random() * speed + 0.1,
      brightness: Math.random() * 0.7 + 0.3,
      pulse: Math.random() * 0.05,
      pulseSpeed: 0.01 + Math.random() * 0.02
    }));
    
    // Animation loop
    let animationFrameId: number;
    let pulseFactor = 0;
    let pulseDirection = 1;
    
    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = 'rgba(0, 0, 0, 0)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      // Update pulse effect
      pulseFactor += 0.01 * pulseDirection;
      if (pulseFactor > 1) {
        pulseDirection = -1;
      } else if (pulseFactor < 0) {
        pulseDirection = 1;
      }
      
      // Draw stars
      stars.forEach(star => {
        // Pulsing effect
        const pulseBrightness = star.brightness + (star.pulse * Math.sin(pulseFactor * star.pulseSpeed * 50));
        
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${pulseBrightness})`;
        ctx.fill();
        
        // Draw glow for larger stars
        if (star.radius > 1.3) {
          ctx.beginPath();
          ctx.arc(star.x, star.y, star.radius * 2.5, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(255, 255, 255, ${pulseBrightness * 0.15})`;
          ctx.fill();
        }
        
        // Move star
        star.y += star.speed;
        
        // Reset star position if it goes off screen
        if (star.y > canvas.height) {
          star.y = 0;
          star.x = Math.random() * canvas.width;
          star.radius = Math.random() * 2 + 0.2;
          star.speed = Math.random() * speed + 0.1;
        }
      });
      
      animationFrameId = window.requestAnimationFrame(render);
    };
    
    render();
    
    // Cleanup
    return () => {
      window.cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', resizeCanvas);
    };
  }, [starCount, speed]);
  
  return (
    <canvas 
      ref={canvasRef} 
      className="fixed inset-0 z-[-1] pointer-events-none"
    />
  );
};

export default Starfield;
