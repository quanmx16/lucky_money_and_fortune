import React, { useEffect, useState, useCallback } from 'react';
import { PredictionResult } from '../types';
import { Share2, RefreshCw, Star, Zap, PartyPopper, Quote, Volume2, StopCircle, Wallet } from 'lucide-react';

interface ResultViewProps {
  imageSrc: string;
  result: PredictionResult;
  onReset: () => void;
}

const ResultView: React.FC<ResultViewProps> = ({ imageSrc, result, onReset }) => {
  const [isPlaying, setIsPlaying] = useState(false);

  const speak = useCallback(() => {
    window.speechSynthesis.cancel();
    const textToRead = `Chúc mừng năm mới. Bạn chính là ${result.title}. ${result.description}`;
    const utterance = new SpeechSynthesisUtterance(textToRead);
    utterance.lang = 'vi-VN';
    
    const voices = window.speechSynthesis.getVoices();
    const vietnameseVoice = voices.find(voice => voice.lang.includes('vi'));
    if (vietnameseVoice) utterance.voice = vietnameseVoice;

    utterance.pitch = 1.1; 
    utterance.rate = 1.1;
    utterance.onstart = () => setIsPlaying(true);
    utterance.onend = () => setIsPlaying(false);
    utterance.onerror = () => setIsPlaying(false);

    window.speechSynthesis.speak(utterance);
  }, [result]);

  useEffect(() => {
    const timer = setTimeout(() => {
      speak();
    }, 500);
    return () => {
      clearTimeout(timer);
      window.speechSynthesis.cancel();
    };
  }, [speak]);

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: `Quẻ bói Tết 2026: ${result.title}`,
        text: `Năm 2026 tui là: ${result.title}. ${result.description} Lì xì tui: ${result.luckyMoney} nha!`,
      }).catch(console.error);
    } else {
      alert("Chụp màn hình lại để đòi lì xì nhé!");
    }
  };

  const toggleSpeech = () => {
    if (isPlaying) {
      window.speechSynthesis.cancel();
      setIsPlaying(false);
    } else {
      speak();
    }
  };

  return (
    <div className="flex flex-col items-center w-full max-w-xl mx-auto animate-in fade-in slide-in-from-bottom-8 duration-700 pb-10 z-20">
      
      {/* Tet Card Container - Lucky Money Envelope Style */}
      <div className="bg-gradient-to-br from-red-600 via-red-700 to-red-900 rounded-[2rem] shadow-[0_20px_60px_-15px_rgba(220,38,38,0.5)] overflow-visible w-full border-[3px] border-yellow-400 relative mt-16 ring-4 ring-red-900/30">
        
        {/* Shimmer Effect */}
        <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-transparent pointer-events-none z-0 rounded-[2rem]"></div>

        {/* Decorative Circles (Punch holes) */}
        <div className="absolute -left-3 top-24 w-6 h-6 bg-red-900 rounded-full z-20 border border-yellow-500"></div>
        <div className="absolute -right-3 top-24 w-6 h-6 bg-red-900 rounded-full z-20 border border-yellow-500"></div>

        {/* Header Texture */}
        <div className="h-36 bg-[url('https://www.transparenttextures.com/patterns/diagmonds-light.png')] bg-red-800/50 relative flex items-start justify-center pt-4 rounded-t-[2rem] border-b border-red-900/20">
          <div className="text-center z-10">
             <div className="inline-block px-6 py-1.5 bg-gradient-to-r from-yellow-300 to-yellow-500 text-red-900 font-black tracking-[0.2em] text-xs uppercase rounded-full shadow-lg mb-1 border border-yellow-100">
               Quẻ Bói Đầu Xuân
             </div>
          </div>
        </div>
        
        {/* Content Body (Cream/White part) */}
        <div className="bg-[#fffdf5] px-6 pb-8 pt-20 rounded-b-[2rem] relative min-h-[400px]">
          
          {/* Profile Picture (Centered & Overlapping) */}
          <div className="absolute -top-20 left-1/2 transform -translate-x-1/2 z-10 group">
            <div className="w-36 h-36 rounded-full p-1.5 bg-gradient-to-b from-yellow-300 to-yellow-600 shadow-[0_10px_25px_rgba(0,0,0,0.3)] group-hover:scale-105 transition-transform duration-300">
               <div className="w-full h-full rounded-full overflow-hidden border-4 border-white bg-white">
                 <img 
                  src={imageSrc} 
                  alt="Profile" 
                  className="w-full h-full object-cover transform scale-x-[-1]" 
                />
               </div>
            </div>
            {/* Tet Badge */}
            <div className="absolute -bottom-2 -right-2 bg-red-600 text-yellow-300 p-2.5 rounded-full border-2 border-yellow-300 shadow-md transform rotate-12 animate-pulse">
              <Star size={24} fill="currentColor" />
            </div>
          </div>

          {/* Main Info */}
          <div className="text-center space-y-3 mt-2 mb-6">
            <h3 className="text-2xl sm:text-4xl font-serif text-red-800 leading-tight uppercase px-2 tracking-wide drop-shadow-sm">
              {result.title}
            </h3>
            <p className="text-yellow-600 font-bold flex items-center justify-center gap-2 text-sm uppercase tracking-widest bg-red-50 py-1 px-4 rounded-full mx-auto w-max border border-red-100">
              <PartyPopper size={14} className="text-red-500" /> Chứng nhận bởi Vũ Trụ
            </p>
          </div>

          {/* Prediction Quote with Audio Button */}
          <div className="relative bg-gradient-to-br from-red-50 to-orange-50 p-6 rounded-2xl border border-red-100 shadow-inner group hover:shadow-md transition-shadow">
            <Quote className="absolute -top-4 -left-3 text-red-400 bg-white rounded-full p-1.5 shadow-sm border border-red-100" size={36} />
            
            {/* Audio Playback Control */}
            <div className="absolute -top-3 right-2">
               <button 
                onClick={toggleSpeech}
                className={`flex items-center gap-1.5 px-3 py-1 rounded-full border shadow-sm text-xs font-bold transition-all
                  ${isPlaying 
                    ? 'bg-yellow-400 text-red-900 border-yellow-500 ring-2 ring-yellow-200 animate-pulse' 
                    : 'bg-white text-red-600 border-red-200 hover:bg-red-50'}`}
               >
                 {isPlaying ? <StopCircle size={14} /> : <Volume2 size={14} />}
                 {isPlaying ? 'Dừng đọc' : 'Nghe phán'}
               </button>
            </div>

            <div className="relative z-10 text-center mt-2">
              <p className="text-lg text-slate-800 font-bold italic leading-relaxed font-sans">
                "{result.description}"
              </p>
            </div>
          </div>

          <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
            
            {/* Strength Card */}
            <div className="bg-blue-50 p-5 rounded-2xl border-2 border-blue-100 flex flex-col items-center text-center shadow-sm hover:-translate-y-1 transition-transform">
              <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 mb-2 shadow-inner">
                <Zap size={20} fill="currentColor" />
              </div>
              <div className="text-[10px] font-black text-blue-400 uppercase mb-1 tracking-widest">Siêu năng lực</div>
              <p className="font-bold text-blue-900 text-sm leading-tight">{result.strength}</p>
            </div>

            {/* Lucky Money Card */}
            <div className="bg-yellow-50 p-5 rounded-2xl border-2 border-yellow-200 relative overflow-hidden flex flex-col items-center text-center shadow-sm hover:-translate-y-1 transition-transform">
              <div className="absolute -right-4 -top-4 text-yellow-100 opacity-50 transform rotate-12">
                 <Wallet size={80} />
              </div>
              <div className="w-10 h-10 bg-yellow-100 rounded-full flex items-center justify-center text-yellow-600 mb-2 shadow-inner z-10">
                <span className="font-bold text-xl">₫</span>
              </div>
              <div className="text-[10px] font-black text-yellow-600 uppercase mb-1 tracking-widest z-10">Tài lộc (Lì xì)</div>
              <p className="font-serif text-red-600 text-2xl tracking-wider z-10 drop-shadow-sm">{result.luckyMoney}</p>
            </div>
          </div>

          {/* Advice Section */}
           <div className="mt-6 pt-5 border-t-2 border-dashed border-red-100 text-center relative">
              <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-[#fffdf5] px-2 text-red-200">✂</div>
              <p className="text-xs font-bold text-slate-400 uppercase mb-2 tracking-widest">Lời vàng ý ngọc</p>
              <p className="text-slate-700 text-sm font-semibold bg-white p-3 rounded-lg border border-slate-100 shadow-sm inline-block w-full">
                💡 {result.advice}
              </p>
            </div>

        </div>

        {/* Footer Actions */}
        <div className="bg-gradient-to-r from-red-800 to-red-900 p-5 flex justify-between items-center rounded-b-[2rem] border-t border-red-900/50">
          <button 
            onClick={onReset}
            className="flex items-center gap-2 px-5 py-2.5 text-red-100 hover:bg-white/10 rounded-xl transition-colors font-bold text-sm border border-transparent hover:border-white/20"
          >
            <RefreshCw size={18} />
            <span className="hidden sm:inline">Gieo lại</span>
          </button>
          
          <button 
            onClick={handleShare}
            className="flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-yellow-300 to-yellow-500 text-red-900 rounded-full font-black shadow-[0_4px_15px_rgba(234,179,8,0.4)] hover:shadow-[0_6px_20px_rgba(234,179,8,0.6)] hover:-translate-y-1 active:translate-y-0 transition-all text-sm uppercase tracking-wide border border-yellow-200"
          >
            <Share2 size={18} />
            Khoe Ngay
          </button>
        </div>
      </div>
      
      <div className="mt-6 text-center text-yellow-100/60 text-xs font-bold uppercase tracking-widest">
        <p>Quẻ này linh nghiệm nhất khi bạn cười</p>
      </div>
    </div>
  );
};

export default ResultView;