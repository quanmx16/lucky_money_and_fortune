import React, { useRef, useState, useEffect } from 'react';
import { Camera, RefreshCw, Aperture, Loader2 } from 'lucide-react';

interface CameraCaptureProps {
  onCapture: (imageSrc: string) => void;
  onCancel: () => void;
}

const CameraCapture: React.FC<CameraCaptureProps> = ({ onCapture, onCancel }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [error, setError] = useState<string>('');
  const [isStreaming, setIsStreaming] = useState(false);

  useEffect(() => {
    let mediaStream: MediaStream | null = null;
    let isMounted = true;

    const startCamera = async () => {
      try {
        setIsStreaming(false);
        const stream = await navigator.mediaDevices.getUserMedia({
          video: { 
            facingMode: 'user', 
            width: { ideal: 1280 }, 
            height: { ideal: 720 } 
          }
        });

        if (!isMounted) {
          stream.getTracks().forEach(track => track.stop());
          return;
        }

        mediaStream = stream;
        
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          videoRef.current.onloadedmetadata = () => {
            if (isMounted && videoRef.current) {
              videoRef.current.play().catch(e => console.error("Play error:", e));
              setIsStreaming(true);
            }
          };
        }
      } catch (err: any) {
        console.error("Camera error:", err);
        if (isMounted) {
          if (err.name === 'NotAllowedError' || err.name === 'PermissionDeniedError') {
             setError("Vui lòng cấp quyền camera để thầy bói xem mặt.");
          } else {
             setError("Không thể mở camera. Vui lòng kiểm tra thiết bị.");
          }
        }
      }
    };

    startCamera();

    return () => {
      isMounted = false;
      if (mediaStream) {
        mediaStream.getTracks().forEach(track => track.stop());
      }
    };
  }, []); 

  const capturePhoto = () => {
    if (videoRef.current && canvasRef.current && isStreaming) {
      const video = videoRef.current;
      const canvas = canvasRef.current;
      
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      
      const context = canvas.getContext('2d');
      if (context) {
        context.drawImage(video, 0, 0, canvas.width, canvas.height);
        const imageSrc = canvas.toDataURL('image/jpeg', 0.85);
        onCapture(imageSrc);
      }
    }
  };

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center h-full p-8 text-center bg-red-50 rounded-xl border-2 border-red-200 min-h-[400px]">
        <div className="text-red-500 mb-4">
          <Camera size={48} />
        </div>
        <p className="text-lg font-bold text-red-700 mb-4">{error}</p>
        <button 
          onClick={onCancel}
          className="px-6 py-2 bg-red-600 text-white rounded-lg font-semibold hover:bg-red-700 transition"
        >
          Quay lại
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center w-full max-w-md mx-auto">
      <div className="relative w-full aspect-[3/4] sm:aspect-[4/3] bg-black rounded-3xl overflow-hidden shadow-2xl border-4 border-yellow-400 mb-6">
        
        {/* Loading Spinner */}
        {!isStreaming && (
          <div className="absolute inset-0 flex items-center justify-center z-10 text-white">
            <Loader2 className="animate-spin" size={48} />
          </div>
        )}

        <video
          ref={videoRef}
          autoPlay
          playsInline
          muted
          className={`w-full h-full object-cover transform scale-x-[-1] transition-opacity duration-500 ${isStreaming ? 'opacity-100' : 'opacity-0'}`}
        />
        <canvas ref={canvasRef} className="hidden" />
      </div>

      <div className="flex items-center gap-6">
        <button 
          onClick={onCancel}
          className="p-4 bg-red-100 text-red-800 rounded-full hover:bg-red-200 transition-colors"
          aria-label="Cancel"
        >
          <RefreshCw size={24} />
        </button>
        
        <button
          onClick={capturePhoto}
          disabled={!isStreaming}
          className={`p-6 text-white rounded-full shadow-lg transition-all transform border-4 border-yellow-400 
            ${isStreaming 
              ? 'bg-red-600 hover:bg-red-700 hover:scale-105 cursor-pointer' 
              : 'bg-slate-400 cursor-not-allowed scale-100'}`}
          aria-label="Take Photo"
        >
          <Aperture size={40} />
        </button>
      </div>
      <p className="mt-4 text-red-600/70 text-sm font-bold">Cười tươi lên nào!</p>
    </div>
  );
};

export default CameraCapture;