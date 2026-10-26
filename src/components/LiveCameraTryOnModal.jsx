import React, { useState, useRef, useEffect } from 'react';
import { Camera, X, RefreshCw, Check, Upload, Sparkles, AlertCircle, Eye, Sliders, ArrowRight, ChevronUp, ChevronDown, Plus, Minus } from 'lucide-react';
import { useShop } from '../context/ShopContext';

const SAMPLE_FACES = [
  { id: 'f1', label: 'Female Model (Oval)', url: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80' },
  { id: 'm1', label: 'Male Model (Square)', url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=800&q=80' },
  { id: 'f2', label: 'Female Model (Heart)', url: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=800&q=80' }
];

const LiveCameraTryOnModal = () => {
  const { 
    isLiveCameraModalOpen, 
    closeLiveCameraModal, 
    activateVirtualTryOn,
    tryOnPosition,
    updateTryOnPosition,
    adjustTryOnY,
    adjustTryOnScale
  } = useShop();

  const [cameraActive, setCameraActive] = useState(false);
  const [cameraError, setCameraError] = useState(null);
  const [capturedPhoto, setCapturedPhoto] = useState(null);
  const [countdown, setCountdown] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);

  // Local calibration state for the preview
  const [previewY, setPreviewY] = useState(tryOnPosition?.y || 50.5);
  const [previewScale, setPreviewScale] = useState(tryOnPosition?.scale || 52);

  const videoRef = useRef(null);
  const streamRef = useRef(null);
  const canvasRef = useRef(null);
  const fileInputRef = useRef(null);

  // Sync initial position when modal opens
  useEffect(() => {
    if (tryOnPosition) {
      setPreviewY(tryOnPosition.y || 50.5);
      setPreviewScale(tryOnPosition.scale || 52);
    }
  }, [tryOnPosition, isLiveCameraModalOpen]);

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
      activateVirtualTryOn(capturedPhoto, { y: previewY, scale: previewScale });
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
                  PRECISION FIT
                </span>
              </h3>
              <p className="text-xs text-[#94A3B8]">
                Take photo or pick model — all glasses will show you wearing them directly over your eyes!
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

                {/* Simulated Overlay Glasses accurately sitting on eye-line */}
                <div
                  className="absolute pointer-events-none transition-all duration-150"
                  style={{
                    top: `${previewY}%`,
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: `${previewScale}%`
                  }}
                >
                  {/* Calibrated realistic glasses silhouette with nose bridge and reflections */}
                  <svg viewBox="0 0 280 100" className="w-full" style={{ filter: 'drop-shadow(0 6px 12px rgba(0,0,0,0.65))' }}>
                    <defs>
                      <linearGradient id="prevLensReflect" x1="0" y1="0" x2="1" y2="1">
                        <stop offset="0%" stopColor="#38BDF8" stopOpacity="0.3" />
                        <stop offset="50%" stopColor="#FFFFFF" stopOpacity="0.15" />
                        <stop offset="100%" stopColor="#0284C7" stopOpacity="0.25" />
                      </linearGradient>
                      <linearGradient id="prevFrameGrad" x1="0" y1="0" x2="1" y2="1">
                        <stop offset="0%" stopColor="#C5A880" />
                        <stop offset="50%" stopColor="#FFFFFF" stopOpacity="0.9" />
                        <stop offset="100%" stopColor="#C5A880" />
                      </linearGradient>
                    </defs>
                    {/* Bridge */}
                    <path d="M 120 46 Q 140 35 160 46" fill="none" stroke="url(#prevFrameGrad)" strokeWidth="5.5" strokeLinecap="round" />
                    {/* Nose pads */}
                    <path d="M 124 52 Q 120 61 122 65" fill="none" stroke="#FFFFFF" strokeWidth="2.5" strokeLinecap="round" />
                    <path d="M 156 52 Q 160 61 158 65" fill="none" stroke="#FFFFFF" strokeWidth="2.5" strokeLinecap="round" />
                    {/* Left Frame */}
                    <rect x="22" y="20" width="98" height="60" rx="10" fill="url(#prevLensReflect)" stroke="url(#prevFrameGrad)" strokeWidth="6" />
                    {/* Right Frame */}
                    <rect x="160" y="20" width="98" height="60" rx="10" fill="url(#prevLensReflect)" stroke="url(#prevFrameGrad)" strokeWidth="6" />
                    {/* Temples */}
                    <line x1="22" y1="30" x2="2" y2="24" stroke="url(#prevFrameGrad)" strokeWidth="5" strokeLinecap="round" />
                    <line x1="258" y1="30" x2="278" y2="24" stroke="url(#prevFrameGrad)" strokeWidth="5" strokeLinecap="round" />
                    {/* Glare shine */}
                    <line x1="40" y1="28" x2="68" y2="68" stroke="#FFFFFF" strokeWidth="3" strokeOpacity="0.5" strokeLinecap="round" />
                    <line x1="178" y1="28" x2="206" y2="68" stroke="#FFFFFF" strokeWidth="3" strokeOpacity="0.5" strokeLinecap="round" />
                  </svg>
                </div>

                {/* Eye Line Alignment Crosshair Hint */}
                <div className="absolute top-3 left-3 glass-dark px-3 py-1 rounded-full border border-white/20 text-[11px] font-bold text-white flex items-center space-x-1.5 shadow-md">
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Aligned at {previewY}% Eye-Height</span>
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

                {/* Oval Face Guide Overlay with Eye Line explicitly marked */}
                {cameraActive && (
                  <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
                    <div className="w-56 h-72 sm:w-64 sm:h-80 border-2 border-dashed border-[#38BDF8]/70 rounded-[50%] flex items-center justify-center shadow-[0_0_40px_rgba(56,189,248,0.25)] relative">
                      {/* Dotted Eye-line guide directly at 50% height */}
                      <div className="w-full flex items-center justify-center px-4">
                        <div className="w-full h-0.5 border-t-2 border-dotted border-[#38BDF8] relative">
                          <span className="absolute -top-6 left-1/2 -translate-x-1/2 text-[10px] uppercase font-mono font-bold tracking-wider text-white bg-[#0284C7] px-2.5 py-0.5 rounded-full shadow-md whitespace-nowrap">
                            👀 Position Eyes Along This Line
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Countdown Overlay */}
                {countdown !== null && (
                  <div className="absolute inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-30">
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
            <div className="space-y-4">
              {/* Fine-Tuning Calibration Controls for User */}
              <div className="bg-white/[0.04] p-3 rounded-2xl border border-white/10">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-bold text-[#38BDF8] flex items-center space-x-1.5">
                    <Sliders className="w-3.5 h-3.5" />
                    <span>Adjust Glasses Position Over Eyes</span>
                  </span>
                  <span className="text-[10px] text-white/50 font-mono">
                    Y: {previewY}% | Size: {previewScale}%
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-3 text-xs">
                  {/* Move Up/Down */}
                  <div className="flex items-center justify-between bg-black/40 p-2 rounded-xl border border-white/5">
                    <span className="text-[11px] text-[#94A3B8]">Move Vertical:</span>
                    <div className="flex items-center space-x-1">
                      <button
                        onClick={() => setPreviewY((y) => Math.max(38, parseFloat((y - 1).toFixed(1))))}
                        className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white"
                        title="Move Higher"
                      >
                        <ChevronUp className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => setPreviewY((y) => Math.min(62, parseFloat((y + 1).toFixed(1))))}
                        className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white"
                        title="Move Lower"
                      >
                        <ChevronDown className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>

                  {/* Frame Size */}
                  <div className="flex items-center justify-between bg-black/40 p-2 rounded-xl border border-white/5">
                    <span className="text-[11px] text-[#94A3B8]">Frame Size:</span>
                    <div className="flex items-center space-x-1">
                      <button
                        onClick={() => setPreviewScale((s) => Math.max(40, parseFloat((s - 2).toFixed(1))))}
                        className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white"
                        title="Smaller Frame"
                      >
                        <Minus className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => setPreviewScale((s) => Math.min(68, parseFloat((s + 2).toFixed(1))))}
                        className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white"
                        title="Larger Frame"
                      >
                        <Plus className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Confirm / Retake Buttons */}
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
                  <span>{isProcessing ? 'Fitting Catalog...' : 'Confirm & Fit All Glasses'}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
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
