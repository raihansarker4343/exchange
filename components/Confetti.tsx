import React, { useEffect, useState } from 'react';

interface ConfettiProps {
  isActive: boolean;
}

const Confetti: React.FC<ConfettiProps> = ({ isActive }) => {
  const [particles, setParticles] = useState<Array<{x: number, y: number, color: string, speed: number, angle: number}>>([]);

  useEffect(() => {
    if (isActive) {
      const colors = ['#8b5cf6', '#ec4899', '#3b82f6', '#10b981', '#f59e0b'];
      const newParticles = Array.from({ length: 100 }).map(() => ({
        x: Math.random() * 100, // vw
        y: -10, // above screen
        color: colors[Math.floor(Math.random() * colors.length)],
        speed: Math.random() * 2 + 3,
        angle: Math.random() * 360,
      }));
      setParticles(newParticles);
    } else {
      setParticles([]);
    }
  }, [isActive]);

  if (!isActive) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
      {particles.map((p, i) => (
        <div
          key={i}
          className="absolute w-2 h-2 rounded-sm animate-fall"
          style={{
            left: `${p.x}vw`,
            backgroundColor: p.color,
            top: `${Math.random() * -20}vh`,
            animation: `confetti-fall ${p.speed}s linear forwards`,
            animationDelay: `${Math.random() * 2}s`
          }}
        />
      ))}
      <style>{`
        @keyframes confetti-fall {
          0% { transform: translateY(0) rotate(0deg); opacity: 1; }
          100% { transform: translateY(110vh) rotate(720deg); opacity: 0; }
        }
      `}</style>
    </div>
  );
};

export default Confetti;
