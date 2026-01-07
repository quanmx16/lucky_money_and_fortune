import React, { useEffect, useState } from 'react';

const TetBackground: React.FC = () => {
  const [flowers, setFlowers] = useState<Array<{id: number, left: number, delay: number, duration: number, type: string, size: number}>>([]);

  useEffect(() => {
    // Generate random flowers
    const flowerTypes = ['🌸', '🌼', '🏵️'];
    const newFlowers = Array.from({ length: 25 }).map((_, i) => ({
      id: i,
      left: Math.random() * 100, // Random horizontal position
      delay: Math.random() * 5, // Random start delay
      duration: 5 + Math.random() * 5, // Random fall duration (5-10s)
      type: flowerTypes[Math.floor(Math.random() * flowerTypes.length)],
      size: 1.5 + Math.random() * 1.5 // Random size (1.5rem - 3rem)
    }));
    setFlowers(newFlowers);
  }, []);

  return (
    <>
      {/* Falling Flowers */}
      {flowers.map((flower) => (
        <div
          key={flower.id}
          className="flower"
          style={{
            left: `${flower.left}%`,
            animationDuration: `${flower.duration}s`,
            animationDelay: `${flower.delay}s`,
            fontSize: `${flower.size}rem`,
            opacity: 0.7
          }}
        >
          {flower.type}
        </div>
      ))}

      {/* Hanging Lanterns (Top Corners) - Visible on all screens */}
      <div className="fixed top-0 left-4 z-0 lantern-sway" style={{ animationDelay: '0s' }}>
        <div className="w-1 h-12 bg-yellow-600 mx-auto"></div>
        <div className="text-6xl drop-shadow-lg filter brightness-110">🏮</div>
        <div className="w-24 bg-red-800 text-yellow-300 text-center font-serif text-xs py-1 rounded-b-lg border border-yellow-500 shadow-lg -mt-2 relative z-10">
          Vạn Sự
        </div>
        <div className="w-16 h-24 mx-auto flex justify-center">
            <div className="w-1 bg-red-500/50 h-full"></div>
            <div className="w-1 bg-red-500/50 h-3/4 ml-1"></div>
            <div className="w-1 bg-red-500/50 h-full ml-1"></div>
        </div>
      </div>

      <div className="fixed top-0 right-4 z-0 lantern-sway" style={{ animationDelay: '1.5s' }}>
        <div className="w-1 h-8 bg-yellow-600 mx-auto"></div>
        <div className="text-6xl drop-shadow-lg filter brightness-110">🏮</div>
        <div className="w-24 bg-red-800 text-yellow-300 text-center font-serif text-xs py-1 rounded-b-lg border border-yellow-500 shadow-lg -mt-2 relative z-10">
          Như Ý
        </div>
        <div className="w-16 h-24 mx-auto flex justify-center">
            <div className="w-1 bg-red-500/50 h-full"></div>
            <div className="w-1 bg-red-500/50 h-3/4 ml-1"></div>
            <div className="w-1 bg-red-500/50 h-full ml-1"></div>
        </div>
      </div>
    </>
  );
};

export default TetBackground;