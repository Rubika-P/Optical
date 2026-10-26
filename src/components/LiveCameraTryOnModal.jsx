import React, { useState, useRef, useEffect } from 'react';
import { Camera, X, RefreshCw, Check, Upload, Sparkles, AlertCircle, Eye, Sliders, ArrowRight } from 'lucide-react';
import { useShop } from '../context/ShopContext';

const SAMPLE_FACES = [
  { id: 'f1', label: 'Female Model (Oval)', url: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80' },
  { id: 'm1', label: 'Male Model (Square)', url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=800&q=80' },
  { id: 'f2', label: 'Female Model (Heart)', url: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=800&q=80' }
];

const LiveCameraTryOnModal = () => {
  const { isLiveCameraModalOpen, closeLiveCameraModal, activateVirtualTryOn } = useShop();

  const [cameraActive, setCameraActive] = useState(false);
  const [cameraError, setCameraError] = useState(null);
  const [capturedPhoto, setCapturedPhoto] = useState(null);
  const [countdown, setCountdown] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const videoRef = useRef(null);
  const streamRef = useRef(null);
  const canvasRef = useRef(null);
  const fileInputRef = useRef(null);

  // Initialize camera when modal opens
  useEffect(() => {
    if (isLiveCameraModalOpen && !capturedPhoto) {
      startCamera();
    } else {
      stopCamera();
    }
    return () => {
      stopCamera();
    };
  }, [isLiveCameraModalOpen, capturedPhoto]);

  const startCamera = async () => {
    setCameraError(null);
    setCameraActive(false);
    try {
      if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        throw new Error('Camera API is not supported in this browser environment.');
      }
      const stream = await navigator.mediaDevices.getUserMedia({
        video: {
          facingMode: 'user',
          width: { ideal: 1280 },
          height: { ideal: 720 }
        },
        audio: false
      });
      streamRef.current = stream;
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.play();
        setCameraActive(true);
      }
    } catch (err) {
      console.warn('Camera access issue:', err);
      setCameraError(
        err.name === 'NotAllowedError'
          ? 'Camera access was blocked. You can upload a photo or choose a sample model below.'
          : 'Could not connect to webcam. Please upload a photo or pick a sample model below.'
      );
      setCameraActive(false);
    }
  };

  const stopCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop());
      streamRef.current = null;
    }
    setCameraActive(false);
  };

  const handleCaptureCountdown = () => {
    setCountdown(3);
    const interval = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          takeSnapshot();
          return null;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const takeSnapshot = () => {
    const video = videoRef.current;
    const canvas = canvasRef.current;
    if (!video || !canvas) return;

    const width = video.videoWidth || 640;
    const height = video.videoHeight || 480;

    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext('2d');

    // Flip horizontally for natural mirror feel
    ctx.translate(width, 0);
    ctx.scale(-1, 1);
    ctx.drawImage(video, 0, 0, width, height);

    const dataUrl = canvas.toDataURL('image/jpeg', 0.92);
    setCapturedPhoto(dataUrl);
    stopCamera();
  };

  const handleFileUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      setCapturedPhoto(event.target.result);
      stopCamera();
    };
    reader.readAsDataURL(file);
  };

  const handleSelectSample = (url) => {
    setCapturedPhoto(url);
    stopCamera();
  };

  const handleRetake = () => {
    setCapturedPhoto(null);
    startCamera();
  };

  const handleConfirmTryOn = () => {
    if (!capturedPhoto) return;
    setIsProcessing(true);
    setTimeout(() => {
      activateVirtualTryOn(capturedPhoto);
      setIsProcessing(false);
    }, 400);
  };

  if (!isLiveCameraModalOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl bg-[#090D16] text-white rounded-3xl border border-white/20 shadow-2xl overflow-hidden max-h-[92vh] flex flex-col">
        {/* Top Header */}
        <div className="p-4 sm:p-6 border-b border-white/10 flex items-center justify-between bg-gradient-to-r from-[#0F172A] to-[#090D16]">
          <div className="flex items-center space-x-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-[#0284C7] to-[#38BDF8] flex items-center justify-center text-white shadow-lg">
              <Camera className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-bold text-white flex items-center space-x-2">
                <span>3D Virtual Try-On Studio</span>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#38BDF8]/20 text-[#38BDF8] font-mono font-bold">
                  LIVE AI FIT
                </span>
              </h3>
              <p className="text-xs text-[#94A3B8]">
                Take or choose a photo — all glasses in the store will display you wearing each frame!
              </p>
            </div>
          </div>

          <button
            onClick={() => {
              stopCamera();
              closeLiveCameraModal();
            }}
            className="p-2 text-white/60 hover:text-white rounded-xl hover:bg-white/10 transition-colors cursor-pointer"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-4 sm:p-6 overflow-y-auto space-y-5">
          {/* Viewport: Live Webcam Feed OR Captured Photo Preview */}
          <div className="relative aspect-[4/3] w-full rounded-2xl overflow-hidden bg-black border border-white/10 shadow-inner flex items-center justify-center">
            {capturedPhoto ? (
              // Captured Photo Preview with Glasses Simulation
              <div className="relative w-full h-full flex items-center justify-center bg-black">
                <img
                  src={capturedPhoto}
                  alt="Captured Portrait"
                  className="w-full h-full object-cover object-center"
                />

                {/* Simulated Overlay Glasses on Bridge */}
                <div
                  className="absolute pointer-events-none transition-all duration-300"
                  style={{
                    top: '43%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: '46%'
                  }}
                >
                  {/* Chic overlay glasses illustration */}
                  <svg viewBox="0 0 300 90" className="w-full drop-shadow-2xl">
                    <defs>
                      <linearGradient id="frameGrad" x1="0" y1="0" x2="1" y2="1">
                        <stop offset="0%" stopColor="#C5A880" />
                        <stop offset="50%" stopColor="#FFFFFF" stopOpacity="0.8" />
                        <stop offset="100%" stopColor="#C5A880" />
                      </linearGradient>
                      <linearGradient id="lensReflect" x1="0" y1="0" x2="1" y2="1">
                        <stop offset="0%" stopColor="#38BDF8" stopOpacity="0.35" />
                        <stop offset="60%" stopColor="#FFFFFF" stopOpacity="0.1" />
                        <stop offset="100%" stopColor="#0284C7" stopOpacity="0.25" />
                      </linearGradient>
                    </defs>
                    {/* Bridge */}
                    <path d="M 125 35 Q 150 24 175 35" fill="none" stroke="url(#frameGrad)" strokeWidth="4.5" strokeLinecap="round" />
                    {/* Left Frame */}
                    <rect x="18" y="12" width="105" height="66" rx="18" fill="url(#lensReflect)" stroke="url(#frameGrad)" strokeWidth="5.5" />
                    {/* Right Frame */}
                    <rect x="177" y="12" width="105" height="66" rx="18" fill="url(#lensReflect)" stroke="url(#frameGrad)" strokeWidth="5.5" />
                    {/* Glare shine */}
                    <line x1="35" y1="20" x2="65" y2="60" stroke="#FFFFFF" strokeWidth="2.5" strokeOpacity="0.5" strokeLinecap="round" />
                    <line x1="195" y1="20" x2="225" y2="60" stroke="#FFFFFF" strokeWidth="2.5" strokeOpacity="0.5" strokeLinecap="round" />
                  </svg>
                </div>

                {/* Success Watermark */}
                <div className="absolute bottom-3 inset-x-3 flex items-center justify-between pointer-events-none">
                  <div className="glass-dark px-3 py-1.5 rounded-full border border-white/20 text-[11px] font-bold text-white flex items-center space-x-2">
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Photo Ready for All Glasses</span>
                  </div>
                </div>
              </div>
            ) : (
              // Live Camera Stream
              <div className="relative w-full h-full flex items-center justify-center">
                <video
                  ref={videoRef}
                  autoPlay
                  playsInline
                  muted
                  className={`w-full h-full object-cover transform -scale-x-100 ${
                    cameraActive ? 'opacity-100' : 'opacity-0'
                  }`}
                />

                {/* Oval Face Guide Overlay */}
                {cameraActive && (
                  <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
                    <div className="w-56 h-72 sm:w-64 sm:h-80 border-2 border-dashed border-[#38BDF8]/60 rounded-[50%] flex items-center justify-center shadow-[0_0_40px_rgba(56,189,248,0.2)]">
                      <div className="w-full flex items-center justify-center px-4">
                        <div className="w-full h-0.5 border-t border-dotted border-white/40 relative">
                          <span className="absolute -top-6 left-1/2 -translate-x-1/2 text-[10px] uppercase font-mono tracking-wider text-[#BAE6FD] bg-black/60 px-2 py-0.5 rounded backdrop-blur-sm">
                            Align Eye Line
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Countdown Overlay */}
                {countdown !== null && (
                  <div className="absolute inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-30">
                    <span className="text-7xl font-extrabold text-[#38BDF8] animate-ping font-mono">
                      {countdown}
                    </span>
                  </div>
                )}

                {/* Camera Fallback / Error Alert */}
                {!cameraActive && cameraError && (
                  <div className="p-6 text-center max-w-sm space-y-3">
                    <AlertCircle className="w-10 h-10 text-amber-400 mx-auto" />
                    <p className="text-xs text-[#CBD5E1] leading-relaxed">
                      {cameraError}
                    </p>
                    <button
                      onClick={startCamera}
                      className="px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-xl text-xs font-semibold uppercase tracking-wider transition-colors inline-flex items-center space-x-1.5"
                    >
                      <RefreshCw className="w-3.5 h-3.5" />
                      <span>Retry Webcam</span>
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>

          <canvas ref={canvasRef} className="hidden" />
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleFileUpload}
            className="hidden"
          />

          {/* Primary Controls */}
          {capturedPhoto ? (
            <div className="flex flex-col sm:flex-row items-center gap-3">
              <button
                onClick={handleRetake}
                className="w-full sm:w-1/3 py-3 px-4 rounded-xl border border-white/20 hover:border-white/40 bg-white/5 hover:bg-white/10 text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center space-x-2 transition-all cursor-pointer"
              >
                <RefreshCw className="w-4 h-4" />
                <span>Retake Photo</span>
              </button>

              <button
                onClick={handleConfirmTryOn}
                disabled={isProcessing}
                className="w-full sm:flex-1 py-3 px-6 rounded-xl bg-gradient-to-r from-[#0284C7] to-[#38BDF8] hover:from-[#0B4D8C] hover:to-[#0284C7] text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center space-x-2 transition-all shadow-xl hover:shadow-cyan-500/25 cursor-pointer"
              >
                <Sparkles className="w-4 h-4" />
                <span>{isProcessing ? 'Fitting Catalog...' : 'Activate Store Virtual Try-On'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="flex flex-col sm:flex-row items-center gap-3">
                <button
                  onClick={handleCaptureCountdown}
                  disabled={!cameraActive}
                  className={`w-full sm:flex-1 py-3 px-6 rounded-xl font-bold text-xs uppercase tracking-wider flex items-center justify-center space-x-2 transition-all shadow-lg cursor-pointer ${
                    cameraActive
                      ? 'bg-gradient-to-r from-[#0284C7] to-[#38BDF8] hover:from-[#0B4D8C] hover:to-[#0284C7] text-white'
                      : 'bg-white/10 text-white/40 cursor-not-allowed'
                  }`}
                >
                  <Camera className="w-4 h-4" />
                  <span>Take Live Photo (3s Timer)</span>
                </button>

                <button
                  onClick={() => fileInputRef.current?.click()}
                  className="w-full sm:w-auto py-3 px-5 rounded-xl border border-white/20 hover:border-white/40 bg-white/5 hover:bg-white/10 text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center space-x-2 transition-all cursor-pointer"
                >
                  <Upload className="w-4 h-4 text-[#38BDF8]" />
                  <span>Upload Photo</span>
                </button>
              </div>

              {/* Sample Model Quick Selectors */}
              <div className="pt-2 border-t border-white/10">
                <span className="text-[11px] font-semibold text-[#94A3B8] block mb-2">
                  Or try instantly with our professional models:
                </span>
                <div className="grid grid-cols-3 gap-2.5">
                  {SAMPLE_FACES.map((face) => (
                    <button
                      key={face.id}
                      onClick={() => handleSelectSample(face.url)}
                      className="group flex items-center space-x-2.5 p-2 rounded-xl bg-white/[0.04] hover:bg-white/[0.1] border border-white/10 hover:border-[#38BDF8]/50 transition-all text-left cursor-pointer"
                    >
                      <img
                        src={face.url}
                        alt={face.label}
                        className="w-8 h-8 rounded-lg object-cover"
                      />
                      <span className="text-[11px] text-white/90 font-medium line-clamp-1">
                        {face.label}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default LiveCameraTryOnModal;
