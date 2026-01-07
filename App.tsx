import React, { useState } from 'react';
import { AppState, PredictionResult } from './types';
import CameraCapture from './components/CameraCapture';
import ResultView from './components/ResultView';
import TetBackground from './components/TetBackground';
import { analyzeImageForPrediction } from './services/geminiService';
import { Sparkles, Camera, Wallet, PartyPopper, Settings2 } from 'lucide-react';

const App: React.FC = () => {
  const [appState, setAppState] = useState<AppState>(AppState.INTRO);
  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  const [result, setResult] = useState<PredictionResult | null>(null);
  const [loadingMessage, setLoadingMessage] = useState<string>('Đang gieo quẻ đầu năm...');
  
  // State for Lucky Money Range
  const [minMoney, setMinMoney] = useState<number>(50000);
  const [maxMoney, setMaxMoney] = useState<number>(500000);

  const LOADING_MESSAGES = [
    "Đang xem tướng mạo...",
    "Đang lắc ống xăm...",
    "Đang hỏi ý kiến Táo Quân...",
    "Đang tính toán độ dày ví tiền...",
    "Đang soi độ duyên dáng...",
    "Đang tìm quẻ 'Mã Đáo Thành Công'...",
    "Chờ chút, thầy đang cho ngựa ăn...",
    "Đang đếm hạt dưa...",
  ];

  const handleCapture = async (imageSrc: string) => {
    setCapturedImage(imageSrc);
    setAppState(AppState.ANALYZING);
    
    // Cycle random funny messages while loading
    const msgInterval = setInterval(() => {
      setLoadingMessage(LOADING_MESSAGES[Math.floor(Math.random() * LOADING_MESSAGES.length)]);
    }, 1500);

    try {
      const predictionData = await analyzeImageForPrediction(imageSrc, minMoney, maxMoney);
      setResult(predictionData);
      setAppState(AppState.RESULT);

    } catch (error) {
      console.error(error);
      setAppState(AppState.ERROR);
    } finally {
      clearInterval(msgInterval);
    }
  };

  const resetApp = () => {
    setCapturedImage(null);
    setResult(null);
    setAppState(AppState.INTRO);
  };

  return (
    <div className="min-h-screen flex flex-col items-center py-6 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto relative overflow-hidden">
      
      <TetBackground />

      {/* Decorative Couplets (Hidden on mobile, visible on lg) */}
      <div className="fixed top-1/2 left-4 -translate-y-1/2 hidden xl:flex flex-col items-center gap-2 animate-bounce-slow z-0">
         <div className="bg-red-700 text-yellow-300 font-serif text-2xl p-4 rounded-lg shadow-2xl border-4 border-yellow-500 writing-vertical-rl text-stroke-gold">
            Tết này vẫn giống Tết xưa
         </div>
      </div>
      <div className="fixed top-1/2 right-4 -translate-y-1/2 hidden xl:flex flex-col items-center gap-2 animate-bounce-slow z-0" style={{ animationDelay: '1.5s' }}>
         <div className="bg-red-700 text-yellow-300 font-serif text-2xl p-4 rounded-lg shadow-2xl border-4 border-yellow-500 writing-vertical-rl text-stroke-gold">
            Vẫn chưa có gấu vẫn ưa lì xì
         </div>
      </div>

      {/* Header */}
      <header className="mb-8 text-center z-10 relative mt-4">
        <div className="inline-flex items-center justify-center p-3 bg-red-100/90 backdrop-blur rounded-full mb-4 shadow-lg border-2 border-yellow-400">
           <PartyPopper className="text-red-600 mr-2" size={24} />
           <Wallet className="text-yellow-600 mr-2" size={24} />
           <Sparkles className="text-red-600" size={24} />
        </div>
        <h1 className="text-5xl sm:text-7xl font-serif text-yellow-400 tracking-wide mb-2 drop-shadow-[0_4px_4px_rgba(0,0,0,0.5)] uppercase">
          Gieo Quẻ <br className="sm:hidden" /><span className="text-stroke-red text-6xl sm:text-7xl">2026</span>
        </h1>
        <p className="text-xl text-yellow-100 font-bold bg-red-900/50 px-4 py-1 rounded-full inline-block backdrop-blur-sm border border-yellow-500/30">
          Xem bói vui • Nhận lì xì ảo • Cười cả năm
        </p>
      </header>

      {/* Main Content Area */}
      <main className="w-full flex-1 flex flex-col items-center justify-center min-h-[400px] z-10 relative">
        
        {appState === AppState.INTRO && (
          <div className="text-center space-y-8 animate-in zoom-in-95 duration-500 w-full">
            <div className="bg-white/95 backdrop-blur-md p-6 sm:p-10 rounded-3xl shadow-2xl border-[6px] border-yellow-500 max-w-md mx-auto relative overflow-visible ring-4 ring-red-600 ring-offset-4 ring-offset-red-800">
              
              <div className="text-7xl mb-4 mt-2 filter drop-shadow-md animate-bounce">🐎</div>
              <h2 className="text-3xl font-serif text-red-700 mb-4 uppercase tracking-wide">Năm Ngựa bạn là ai?</h2>
              <p className="text-slate-700 mb-8 leading-relaxed font-bold text-lg">
                Chụp một tấm ảnh selfie để thầy AI phán xem năm nay bạn là "Chiến mã oai phong" hay "Ngựa non háu đá" nhé!
              </p>

              {/* Lucky Money Settings */}
              <div className="bg-red-50/80 rounded-xl p-4 mb-8 border-2 border-red-200 relative group hover:border-yellow-400 transition-colors">
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-white px-3 py-1 rounded-full border-2 border-red-200 text-xs font-bold text-red-600 uppercase tracking-wide flex items-center gap-1 shadow-sm group-hover:border-yellow-400 group-hover:text-yellow-600 transition-colors">
                  <Settings2 size={12} /> Cài đặt Lì Xì
                </div>
                <div className="grid grid-cols-2 gap-4 mt-2">
                  <div className="text-left">
                    <label className="block text-[10px] font-bold text-red-500 uppercase mb-1 ml-1">Tối thiểu</label>
                    <div className="relative">
                        <input 
                        type="number" 
                        value={minMoney}
                        onChange={(e) => setMinMoney(Number(e.target.value))}
                        className="w-full px-3 py-2 rounded-lg border-2 border-red-200 focus:border-yellow-500 focus:ring-2 focus:ring-yellow-200 outline-none text-red-800 font-bold text-center bg-white shadow-inner"
                        step={10000}
                        />
                        <span className="absolute right-2 top-2 text-xs text-red-400 font-bold">đ</span>
                    </div>
                  </div>
                  <div className="text-left">
                    <label className="block text-[10px] font-bold text-red-500 uppercase mb-1 ml-1">Tối đa</label>
                    <div className="relative">
                        <input 
                        type="number" 
                        value={maxMoney}
                        onChange={(e) => setMaxMoney(Number(e.target.value))}
                        className="w-full px-3 py-2 rounded-lg border-2 border-red-200 focus:border-yellow-500 focus:ring-2 focus:ring-yellow-200 outline-none text-red-800 font-bold text-center bg-white shadow-inner"
                        step={10000}
                        />
                        <span className="absolute right-2 top-2 text-xs text-red-400 font-bold">đ</span>
                    </div>
                  </div>
                </div>
              </div>
              
              <button 
                onClick={() => setAppState(AppState.CAMERA)}
                className="group relative inline-flex items-center justify-center px-8 py-4 font-bold text-yellow-50 transition-all duration-200 bg-gradient-to-r from-red-600 to-red-700 font-lg rounded-full hover:from-red-500 hover:to-red-600 focus:outline-none ring-offset-2 focus:ring-2 ring-yellow-400 hover:shadow-[0_0_20px_rgba(234,179,8,0.5)] w-full sm:w-auto border-b-4 border-red-900 active:border-b-0 active:translate-y-1 transform"
              >
                <Camera className="mr-2 group-hover:rotate-12 transition-transform" size={20} />
                <span className="uppercase tracking-wider">Xem Bói Ngay</span>
              </button>
            </div>
            
            <p className="text-xs text-yellow-200/80 italic max-w-sm mx-auto font-medium">
              *Kết quả chỉ mang tính chất giải trí. Miễn đổi trả nếu quẻ bói quá phũ.
            </p>
          </div>
        )}

        {appState === AppState.CAMERA && (
          <div className="w-full animate-in fade-in duration-500">
            <CameraCapture 
              onCapture={handleCapture}
              onCancel={() => setAppState(AppState.INTRO)}
            />
          </div>
        )}

        {appState === AppState.ANALYZING && (
          <div className="flex flex-col items-center justify-center text-center p-12 bg-white/90 backdrop-blur-md rounded-full aspect-square w-80 h-80 animate-bounce-slow border-[8px] border-yellow-400 shadow-[0_0_50px_rgba(234,179,8,0.4)]">
            <div className="relative mb-4">
              <div className="absolute inset-0 bg-red-500 rounded-full opacity-20 animate-ping"></div>
              <div className="relative bg-red-100 p-6 rounded-full shadow-lg border-2 border-red-300">
                <Sparkles className="text-red-600 animate-spin-slow" size={48} />
              </div>
            </div>
            <h3 className="text-2xl font-serif text-red-800 mb-2 uppercase tracking-wide">Thầy đang luận giải</h3>
            <p className="text-red-600 font-bold text-lg min-h-[30px] transition-all italic px-4">
              "{loadingMessage}"
            </p>
          </div>
        )}

        {appState === AppState.RESULT && capturedImage && result && (
          <ResultView 
            imageSrc={capturedImage}
            result={result}
            onReset={resetApp}
          />
        )}

        {appState === AppState.ERROR && (
          <div className="bg-red-50 p-8 rounded-2xl text-center max-w-md border-4 border-red-200 shadow-2xl">
            <div className="text-5xl mb-4">😿</div>
            <h3 className="text-2xl font-serif text-red-800 mb-2">Quẻ này khó quá!</h3>
            <p className="text-red-600 mb-6 text-sm font-medium">
              Thầy bói đang bận đi chúc Tết hoặc mạng bị nghẽn. Vui lòng thử lại sau nhé.
            </p>
            <button 
              onClick={resetApp}
              className="px-6 py-3 bg-red-600 text-white rounded-full font-bold hover:bg-red-700 transition shadow-lg hover:shadow-xl uppercase tracking-wider"
            >
              Gieo quẻ lại
            </button>
          </div>
        )}
      </main>

      <footer className="mt-12 text-center text-yellow-500/60 text-xs pb-4 tracking-widest uppercase font-bold z-10">
        <p>Chúc Mừng Năm Mới 2026 • Bính Ngọ • Mã Đáo Thành Công</p>
      </footer>
    </div>
  );
};

export default App;