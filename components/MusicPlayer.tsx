import React, { useState, useRef, useEffect } from 'react';
import { Volume2, VolumeX } from 'lucide-react';
import tetMusicFile from '../tet_music.mp3';

const MusicPlayer: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);
  const hasTriedAutoplay = useRef(false);

  useEffect(() => {
    if (audioRef.current && !hasTriedAutoplay.current) {
      audioRef.current.volume = 0.3; // Set default volume to 30%
      hasTriedAutoplay.current = true;

      // Try to autoplay when component mounts
      const attemptPlay = () => {
        const playPromise = audioRef.current?.play();
        if (playPromise !== undefined) {
          playPromise
            .then(() => {
              setIsPlaying(true);
            })
            .catch(() => {
              // Autoplay was prevented, try again on user interaction
              setIsPlaying(false);
            });
        }
      };

      // Attempt to play immediately
      attemptPlay();

      // Also try to play on any user interaction if it failed
      const handleInteraction = () => {
        if (audioRef.current && audioRef.current.paused) {
          attemptPlay();
        }
      };

      document.addEventListener('click', handleInteraction, { once: true });
      document.addEventListener('touchstart', handleInteraction, { once: true });
      document.addEventListener('keydown', handleInteraction, { once: true });
    }
  }, []);

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
        setIsPlaying(false);
      } else {
        audioRef.current.play();
        setIsPlaying(true);
      }
    }
  };

  return (
    <>
      <audio ref={audioRef} loop>
        <source src={tetMusicFile} type="audio/mpeg" />
      </audio>

      <button
        onClick={togglePlay}
        className="fixed bottom-6 right-6 z-50 p-4 bg-gradient-to-r from-red-600 to-red-700 text-yellow-300 rounded-full shadow-2xl hover:from-red-500 hover:to-red-600 transition-all duration-300 border-4 border-yellow-400 hover:scale-110 group"
        aria-label={isPlaying ? "Tắt nhạc" : "Bật nhạc"}
      >
        {isPlaying ? (
          <Volume2 size={24} className="animate-pulse" />
        ) : (
          <VolumeX size={24} className="group-hover:animate-bounce" />
        )}
      </button>
    </>
  );
};

export default MusicPlayer;
