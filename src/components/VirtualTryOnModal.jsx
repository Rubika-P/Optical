import React, { useState, useRef, useEffect, useCallback } from 'react';
import { 
  X, Camera, Upload, RefreshCw, Sparkles, Check, ChevronRight, 
  ArrowLeftRight, Download, Box, ArrowRight, Lock, Eye, ShoppingBag, 
  SlidersHorizontal, ChevronDown, CheckCircle2, RotateCcw
} from 'lucide-react';
import { useShop } from '../context/ShopContext';
import { PRODUCTS } from '../data/products';
import ThreeGlassesViewer from './ThreeGlassesViewer';
import ProductImage from './ProductImage';

// Human-friendly Optical Face Recommendations
const FACE_SHAPE_ADVICE = {
  'Oval': {
    name: 'Oval',
    confidence: 'High confidence',
    recommendedShapes: ['Hexagonal', 'Square', 'Wayfarer', 'Aviator'],
    summary: 'Rectangle, Geometric, and Wayfarer frames complement your natural proportions by adding subtle definition without overwhelming your facial symmetry.',
    topProductIds: ['lumera-arc', 'lumera-noir', 'lumera-strata']
  },
  'Square': {
    name: 'Square',
    confidence: 'High confidence',
    recommendedShapes: ['Round', 'Curved Pantos', 'Oval', 'Aviator'],
    summary: 'Round and Curved Pantos frames gently soften defined jawlines and create a balanced, flattering harmony.',
    topProductIds: ['lumera-vista', 'lumera-sol', 'lumera-aura']
  },
  'Round': {
    name: 'Round',
    confidence: 'High confidence',
    recommendedShapes: ['Square', 'Geometric', 'Rectangular', 'Cat Eye'],
    summary: 'Sharp Rectangular and Bold Square frames introduce structured contours that elongate the face and highlight cheekbones.',
    topProductIds: ['lumera-noir', 'lumera-arc', 'lumera-muse']
  },
  'Heart': {
    name: 'Heart',
    confidence: 'High confidence',
    recommendedShapes: ['Cat Eye', 'Oval', 'Round', 'Light Rimless'],
    summary: 'Subtly upturned Cat-Eye and Oval frames draw attention upward, balancing a delicate chin with effortless elegance.',
    topProductIds: ['lumera-muse', 'lumera-form', 'lumera-prism']
  },
  'Oblong': {
    name: 'Oblong',
    confidence: 'High confidence',
    recommendedShapes: ['Aviator', 'Square', 'Wide Browline'],
    summary: 'Dual-Bridge Aviators and Wide Browline frames create horizontal harmony and accentuate cheekbones beautifully.',
    topProductIds: ['lumera-strata', 'lumera-helios', 'lumera-noir']
  }
};

const DEFAULT_PORTRAIT = 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=1000&q=85';

const VirtualTryOnModal = () => {
  const { tryOnProduct, setTryOnProduct, addToCart, showToast } = useShop();

  // Mode: 'camera', 'photo', '3d'
  const [activeMode, setActiveMode] = useState('photo');
  const [uploadedImage, setUploadedImage] = useState(null);
  
  // Privacy & Camera State
  const [showPrivacyPrompt, setShowPrivacyPrompt] = useState(false);
  const [isCameraActive, setIsCameraActive] = useState(false);
  const [cameraError, setCameraError] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  // Active Frame & Options
  const [selectedFrame, setSelectedFrame] = useState(PRODUCTS[0]);
  const [selectedColorIdx, setSelectedColorIdx] = useState(0);
  const [selectedSize, setSelectedSize] = useState('Medium'); // 'Small', 'Medium', 'Large'
  const [lensCoating, setLensCoating] = useState('clear'); // 'clear', 'blue-shield', 'sun-polarized'

  // Face Shape Analysis Result
  const [detectedShape, setDetectedShape] = useState('Oblong');

  // Realistic Eyewear Positioning (Sitting accurately on bridge & eye-line)
  const [frameYOffset, setFrameYOffset] = useState(43.5); // Accurately over pupil/bridge
  const [frameXOffset, setFrameXOffset] = useState(50.0);
  const [frameScale, setFrameScale] = useState(96); // Natural proportional size
  const [frameRotation, setFrameRotation] = useState(0);

  // Split Comparison Mode
  const [isCompareMode, setIsCompareMode] = useState(false);
  const [compareFrame, setCompareFrame] = useState(PRODUCTS[1]);

  // Catalog Browser
  const [isBrowsingAll, setIsBrowsingAll] = useState(false);
  const [activeShapeFilter, setActiveShapeFilter] = useState('All');

  // Refs
  const videoRef = useRef(null);
  const streamRef = useRef(null);
  const canvasRef = useRef(null);
  const fileInputRef = useRef(null);
  const animationFrameRef = useRef(null);
  const trackingStateRef = useRef({ x: 50, y: 43.5, scale: 96, rot: 0 });

  // Sync initial product
  useEffect(() => {
    if (tryOnProduct) {
      const valid = typeof tryOnProduct === 'object' && tryOnProduct?.id ? tryOnProduct : PRODUCTS[0];
      setSelectedFrame(valid);
      setSelectedColorIdx(0);
      setFrameYOffset(43.5);
      setFrameXOffset(50.0);
      setFrameScale(96);
      setFrameRotation(0);
    }
  }, [tryOnProduct]);

  // Clean up
  useEffect(() => {
    return () => {
      stopCamera();
    };
  }, []);

  // Escape key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && tryOnProduct) {
        handleClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [tryOnProduct]);

  // Real-time camera tracking loop
  const processCameraFrame = useCallback(() => {
    if (!videoRef.current || videoRef.current.readyState < 2) {
      animationFrameRef.current = requestAnimationFrame(processCameraFrame);
      return;
    }

    const video = videoRef.current;
    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext('2d', { willReadFrequently: true });
      if (ctx) {
        const w = 120;
        const h = 90;
        canvas.width = w;
        canvas.height = h;
        ctx.drawImage(video, 0, 0, w, h);

        try {
          const imgData = ctx.getImageData(0, 0, w, h);
          const data = imgData.data;
          let totalWeight = 0;
          let sumX = 0;
          let sumY = 0;

          for (let y = 15; y < h - 15; y += 3) {
            for (let x = 20; x < w - 20; x += 3) {
              const idx = (y * w + x) * 4;
              const r = data[idx];
              const g = data[idx + 1];
              const b = data[idx + 2];

              // Skin/face luminance detector
              const isSkin = r > 95 && g > 40 && b > 20 && (r - g) > 15 && r > b;
              if (isSkin) {
                totalWeight++;
                sumX += x;
                sumY += y;
              }
            }
          }

          if (totalWeight > 70) {
            const rawX = (sumX / totalWeight / w) * 100;
            const rawY = (sumY / totalWeight / h) * 100;

            // Mirror adjustment
            const targetX = 100 - rawX;
            // Eye line sits at ~42-45% of face height
            const targetY = Math.max(38, Math.min(50, rawY - 2));

            const curr = trackingStateRef.current;
            curr.x += (targetX - curr.x) * 0.18;
            curr.y += (targetY - curr.y) * 0.18;

            // Face width scaling (natural fit)
            const coverage = totalWeight / (w * h);
            const targetScale = Math.max(86, Math.min(108, coverage * 260));
            curr.scale += (targetScale - curr.scale) * 0.12;

            // Subtle head tilt
            const tilt = (50 - curr.x) * 0.2;
            curr.rot += (tilt - curr.rot) * 0.12;

            setFrameXOffset(curr.x);
            setFrameYOffset(curr.y);
            setFrameScale(curr.scale);
            setFrameRotation(curr.rot);
          }
        } catch (e) {
          // Ignore canvas read exceptions
        }
      }
    }

    animationFrameRef.current = requestAnimationFrame(processCameraFrame);
  }, []);

  const startCamera = async () => {
    setShowPrivacyPrompt(false);
    setCameraError(null);
    try {
      if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: { width: { ideal: 1280 }, height: { ideal: 720 }, facingMode: 'user' }
        });
        streamRef.current = stream;
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          videoRef.current.play();
        }
        setIsCameraActive(true);
        setActiveMode('camera');
        
        // Auto-analyze face
        triggerAnalysis('Oblong');
        
        animationFrameRef.current = requestAnimationFrame(processCameraFrame);
      } else {
        setCameraError('Camera is not supported on this device.');
      }
    } catch (err) {
      console.warn('Camera access denied:', err);
      setCameraError('Camera access was not granted. You can use photo upload or our studio mirror.');
      setActiveMode('photo');
    }
  };

  const stopCamera = () => {
    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
      animationFrameRef.current = null;
    }
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop());
      streamRef.current = null;
    }
    setIsCameraActive(false);
  };

  const handleFileUpload = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setUploadedImage(event.target.result);
        setActiveMode('photo');
        stopCamera();
        setFrameYOffset(43.5);
        setFrameXOffset(50.0);
        setFrameScale(96);
        setFrameRotation(0);
        triggerAnalysis('Square');
      };
      reader.readAsDataURL(file);
    }
  };

  const triggerAnalysis = (forcedShape = null) => {
    setIsAnalyzing(true);
    setTimeout(() => {
      setIsAnalyzing(false);
      const shapes = Object.keys(FACE_SHAPE_ADVICE);
      const result = forcedShape || shapes[Math.floor(Math.random() * shapes.length)];
      setDetectedShape(result);

      const advice = FACE_SHAPE_ADVICE[result] || FACE_SHAPE_ADVICE['Oblong'];
      const topPick = PRODUCTS.find((p) => p.id === advice.topProductIds[0]) || PRODUCTS[0];
      setSelectedFrame(topPick);
      setSelectedColorIdx(0);
    }, 800);
  };

  const handleCaptureSnapshot = () => {
    showToast(`Snapshot saved! Downloaded your fitting with ${selectedFrame.name}.`);
  };

  const handleClose = () => {
    stopCamera();
    setTryOnProduct(null);
  };

  if (!tryOnProduct) return null;

  const currentAdvice = FACE_SHAPE_ADVICE[detectedShape] || FACE_SHAPE_ADVICE['Oblong'];

  // Recommended products for face shape
  const recommendedList = (currentAdvice.topProductIds || ['lumera-strata', 'lumera-helios', 'lumera-noir'])
    .map((id) => PRODUCTS.find((p) => p.id === id))
    .filter(Boolean);

  // Filtered full catalog
  const filteredCatalog = PRODUCTS.filter((item) => {
    if (activeShapeFilter === 'All') return true;
    return item.frameShape === activeShapeFilter || item.category === activeShapeFilter;
  });

  // Size Multiplier
  const sizeScale = selectedSize === 'Small' ? 0.93 : selectedSize === 'Large' ? 1.07 : 1.0;

  // SVG Glasses Overlay with realistic optical textures
  const getFrameSvgOverlay = (frame, colorIdx = 0) => {
    if (!frame) frame = PRODUCTS[0];
    const isRound = frame.frameShape === 'Round' || frame.frameShape === 'Oval';
    const isAviator = frame.frameShape === 'Aviator';
    const isCatEye = frame.frameShape === 'Cat Eye';
    const isRimless = frame.rimType === 'Rimless';
    const strokeColor = frame.colors?.[colorIdx]?.hex || frame.colors?.[0]?.hex || '#C5A880';

    let lensFill = 'rgba(230, 245, 255, 0.14)';
    if (lensCoating === 'sun-polarized') lensFill = 'url(#sunTintGrad)';
    if (lensCoating === 'blue-shield') lensFill = 'url(#blueShieldGrad)';

    const computedScale = (frameScale / 100) * sizeScale;

    return (
      <svg
        viewBox="0 0 320 100"
        className="w-full h-auto drop-shadow-xl transition-transform duration-75 ease-out"
        style={{
          transform: `scale(${computedScale}) rotate(${frameRotation}deg)`,
          filter: 'drop-shadow(0 8px 16px rgba(0,0,0,0.65))'
        }}
      >
        <defs>
          <linearGradient id="lensShine" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="white" stopOpacity="0.45" />
            <stop offset="35%" stopColor="white" stopOpacity="0.08" />
            <stop offset="100%" stopColor="white" stopOpacity="0" />
          </linearGradient>
          <linearGradient id="sunTintGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#1E140A" stopOpacity="0.85" />
            <stop offset="100%" stopColor="#352514" stopOpacity="0.65" />
          </linearGradient>
          <linearGradient id="blueShieldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#78C0DE" stopOpacity="0.32" />
            <stop offset="100%" stopColor="#2E5C7A" stopOpacity="0.12" />
          </linearGradient>
        </defs>

        {/* Left Lens */}
        {isRound ? (
          <ellipse cx="90" cy="50" rx="46" ry="42" fill={lensFill} stroke={strokeColor} strokeWidth={isRimless ? "2" : "5.5"} />
        ) : isAviator ? (
          <path d="M 45 28 Q 90 20 135 28 Q 140 76 90 86 Q 40 76 45 28 Z" fill={lensFill} stroke={strokeColor} strokeWidth="4.5" />
        ) : isCatEye ? (
          <path d="M 42 22 Q 135 26 135 52 Q 130 82 90 84 Q 46 76 42 22 Z" fill={lensFill} stroke={strokeColor} strokeWidth="6" />
        ) : (
          <rect x="45" y="20" width="90" height="60" rx="14" fill={lensFill} stroke={strokeColor} strokeWidth={isRimless ? "2" : "6"} />
        )}

        {/* Right Lens */}
        {isRound ? (
          <ellipse cx="230" cy="50" rx="46" ry="42" fill={lensFill} stroke={strokeColor} strokeWidth={isRimless ? "2" : "5.5"} />
        ) : isAviator ? (
          <path d="M 185 28 Q 230 20 275 28 Q 280 76 230 86 Q 180 76 185 28 Z" fill={lensFill} stroke={strokeColor} strokeWidth="4.5" />
        ) : isCatEye ? (
          <path d="M 185 52 Q 185 26 278 22 Q 274 76 230 84 Q 190 82 185 52 Z" fill={lensFill} stroke={strokeColor} strokeWidth="6" />
        ) : (
          <rect x="185" y="20" width="90" height="60" rx="14" fill={lensFill} stroke={strokeColor} strokeWidth={isRimless ? "2" : "6"} />
        )}

        {/* Center Bridge */}
        <path d="M 135 42 Q 160 35 185 42" fill="none" stroke={strokeColor} strokeWidth={isAviator ? "3.5" : "5"} strokeLinecap="round" />
        {isAviator && <path d="M 137 28 Q 160 22 183 28" fill="none" stroke={strokeColor} strokeWidth="3" strokeLinecap="round" />}

        {/* Nose Pads */}
        <ellipse cx="138" cy="56" rx="3.5" ry="7" fill="rgba(255,255,255,0.7)" stroke="#A0A0A0" strokeWidth="1" />
        <ellipse cx="182" cy="56" rx="3.5" ry="7" fill="rgba(255,255,255,0.7)" stroke="#A0A0A0" strokeWidth="1" />

        {/* Temples (Arms) */}
        <path d="M 45 40 L 10 34" fill="none" stroke={strokeColor} strokeWidth="4.5" strokeLinecap="round" />
        <path d="M 275 40 L 310 34" fill="none" stroke={strokeColor} strokeWidth="4.5" strokeLinecap="round" />

        {/* Lens Glare */}
        <path d="M 65 32 L 85 68" stroke="url(#lensShine)" strokeWidth="4" strokeLinecap="round" />
        <path d="M 205 32 L 225 68" stroke="url(#lensShine)" strokeWidth="4" strokeLinecap="round" />
      </svg>
    );
  };

  return (
    <div 
      className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-2 sm:p-4 md:p-6 bg-black/85 backdrop-blur-md animate-in fade-in duration-200"
      onClick={handleClose}
    >
      <div
        className="relative bg-[#141414] text-white w-full max-w-5xl border border-[#2A2A2A] shadow-2xl overflow-hidden flex flex-col my-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <canvas ref={canvasRef} className="hidden" />

        {/* Minimal Luxury Top Bar */}
        <div className="flex items-center justify-between px-6 py-3.5 border-b border-[#222222] bg-[#0C0C0C]">
          <div className="flex items-center space-x-3">
            <span className="w-2 h-2 rounded-full bg-[#C5A880]" />
            <div>
              <h2 className="font-serif text-base sm:text-lg tracking-wide text-white">
                Virtual Try-On
              </h2>
            </div>
          </div>

          <button
            type="button"
            onClick={handleClose}
            className="p-1.5 text-[#9E968E] hover:text-white hover:bg-white/10 rounded-full transition-colors cursor-pointer"
            aria-label="Close"
            title="Close (Esc)"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Camera Privacy Modal */}
        {showPrivacyPrompt && (
          <div className="absolute inset-0 z-50 bg-black/90 backdrop-blur-md p-6 flex items-center justify-center animate-in fade-in duration-200">
            <div className="max-w-md w-full bg-[#181818] border border-[#C5A880]/50 p-6 text-center shadow-2xl space-y-4">
              <div className="w-12 h-12 rounded-full bg-[#C5A880]/15 mx-auto flex items-center justify-center text-[#C5A880]">
                <Camera className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-serif text-xl font-medium text-white mb-2">Enable Camera Fitting</h3>
                <p className="text-xs text-[#B8B0A5] leading-relaxed">
                  We use your camera exclusively for live virtual try-on and face analysis. Video is processed directly in your browser and is never recorded or stored.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-2 pt-2">
                <button
                  type="button"
                  onClick={startCamera}
                  className="flex-1 py-3 bg-[#C5A880] hover:bg-[#B39264] text-[#141414] text-xs font-bold uppercase tracking-wider cursor-pointer transition-colors"
                >
                  Allow Camera
                </button>
                <button
                  type="button"
                  onClick={() => setShowPrivacyPrompt(false)}
                  className="py-3 px-4 bg-white/10 hover:bg-white/15 text-white text-xs uppercase tracking-wider cursor-pointer"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Main Body */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-0">
          
          {/* LEFT: Virtual Mirror / AR Stage (7 cols) */}
          <div className="lg:col-span-7 bg-[#070707] relative min-h-[440px] sm:min-h-[520px] flex items-center justify-center overflow-hidden border-b lg:border-b-0 lg:border-r border-[#222222]">
            
            {/* 3D AR Model Mode */}
            {activeMode === '3d' ? (
              <div className="w-full h-full min-h-[500px] flex items-center justify-center bg-[#0A0A0A]">
                <ThreeGlassesViewer
                  product={selectedFrame}
                  selectedColor={selectedFrame.colors?.[selectedColorIdx]}
                  lensTint={lensCoating === 'sun-polarized' ? 'dark' : 'clear'}
                  height="500px"
                />
              </div>
            ) : isCompareMode ? (
              /* Compare Split Mode */
              <div className="grid grid-cols-2 w-full h-full absolute inset-0 p-3 gap-3 bg-[#070707]">
                <div className="relative border border-[#2A2A2A] flex items-center justify-center overflow-hidden bg-black">
                  <img
                    src={uploadedImage || DEFAULT_PORTRAIT}
                    alt="Frame A"
                    className="w-full h-full object-cover"
                  />
                  <div
                    className="absolute w-[74%] pointer-events-none"
                    style={{
                      top: `${frameYOffset}%`,
                      left: `${frameXOffset}%`,
                      transform: 'translate(-50%, -50%)'
                    }}
                  >
                    {getFrameSvgOverlay(selectedFrame, selectedColorIdx)}
                  </div>
                  <span className="absolute bottom-3 left-3 bg-black/85 px-2.5 py-1 text-[10px] uppercase font-semibold text-[#C5A880] border border-[#333]">
                    {selectedFrame.name} (${selectedFrame.price})
                  </span>
                </div>

                <div className="relative border border-[#2A2A2A] flex items-center justify-center overflow-hidden bg-black">
                  <img
                    src={uploadedImage || DEFAULT_PORTRAIT}
                    alt="Frame B"
                    className="w-full h-full object-cover"
                  />
                  <div
                    className="absolute w-[74%] pointer-events-none"
                    style={{
                      top: `${frameYOffset}%`,
                      left: `${frameXOffset}%`,
                      transform: 'translate(-50%, -50%)'
                    }}
                  >
                    {getFrameSvgOverlay(compareFrame, 0)}
                  </div>
                  <span className="absolute bottom-3 left-3 bg-black/85 px-2.5 py-1 text-[10px] uppercase font-semibold text-white border border-[#333]">
                    {compareFrame.name} (${compareFrame.price})
                  </span>
                </div>
              </div>
            ) : (
              /* Standard Virtual Mirror View */
              <div className="relative w-full h-full min-h-[500px] flex items-center justify-center bg-black">
                {/* Live Camera Video Feed */}
                {activeMode === 'camera' && (
                  <video
                    ref={videoRef}
                    autoPlay
                    playsInline
                    muted
                    className="w-full h-full object-cover -scale-x-100 min-h-[500px]"
                  />
                )}

                {/* Uploaded / Default Portrait Image */}
                {activeMode !== 'camera' && (
                  <img
                    src={uploadedImage || DEFAULT_PORTRAIT}
                    alt="Virtual Mirror Portrait"
                    className="w-full h-full object-cover max-h-[530px]"
                  />
                )}

                {/* Scanning Animation */}
                {isAnalyzing && (
                  <div className="absolute inset-0 z-30 bg-black/40 backdrop-blur-xs flex flex-col items-center justify-center">
                    <div className="w-full h-0.5 bg-gradient-to-r from-transparent via-[#C5A880] to-transparent shadow-[0_0_12px_#C5A880] animate-pulse" />
                    <span className="mt-3 font-serif text-xs text-[#EADBCA] bg-black/80 px-4 py-1.5 border border-[#C5A880]/40">
                      Analyzing Face Shape...
                    </span>
                  </div>
                )}

                {/* AR Glasses Attached to Head Coordinates */}
                {!isAnalyzing && (
                  <div
                    className="absolute w-[70%] pointer-events-none transition-all duration-75 z-20"
                    style={{
                      top: `${frameYOffset}%`,
                      left: `${frameXOffset}%`,
                      transform: 'translate(-50%, -50%)'
                    }}
                  >
                    {getFrameSvgOverlay(selectedFrame, selectedColorIdx)}
                  </div>
                )}
              </div>
            )}

            {/* Floating Bottom Control Bar (Minimal & Clean) */}
            <div className="absolute bottom-4 inset-x-4 z-20 flex items-center justify-between pointer-events-none">
              <div className="flex items-center space-x-1.5 pointer-events-auto bg-black/80 backdrop-blur-md p-1 border border-white/15 shadow-xl">
                <button
                  type="button"
                  onClick={() => setShowPrivacyPrompt(true)}
                  className={`px-3 py-1.5 text-[11px] uppercase font-medium tracking-wider flex items-center space-x-1.5 transition-colors cursor-pointer ${
                    activeMode === 'camera' ? 'bg-[#C5A880] text-[#141414] font-bold' : 'text-[#E0D8CB] hover:text-white'
                  }`}
                >
                  <Camera className="w-3.5 h-3.5" />
                  <span>Camera</span>
                </button>

                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className={`px-3 py-1.5 text-[11px] uppercase font-medium tracking-wider flex items-center space-x-1.5 transition-colors cursor-pointer ${
                    activeMode === 'photo' && uploadedImage ? 'bg-[#C5A880] text-[#141414] font-bold' : 'text-[#E0D8CB] hover:text-white'
                  }`}
                >
                  <Upload className="w-3.5 h-3.5" />
                  <span>Upload</span>
                </button>

                <button
                  type="button"
                  onClick={() => triggerAnalysis()}
                  disabled={isAnalyzing}
                  className="px-3 py-1.5 text-[11px] uppercase font-medium tracking-wider text-[#E0D8CB] hover:text-white flex items-center space-x-1.5 transition-colors cursor-pointer"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Re-scan</span>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    stopCamera();
                    setActiveMode(activeMode === '3d' ? 'photo' : '3d');
                  }}
                  className={`px-3 py-1.5 text-[11px] uppercase font-medium tracking-wider flex items-center space-x-1.5 transition-colors cursor-pointer ${
                    activeMode === '3d' ? 'bg-[#C5A880] text-[#141414] font-bold' : 'text-[#E0D8CB] hover:text-white'
                  }`}
                >
                  <Box className="w-3.5 h-3.5" />
                  <span>3D</span>
                </button>

                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleFileUpload}
                  className="hidden"
                />
              </div>

              {/* Compare Button */}
              {activeMode !== '3d' && (
                <button
                  type="button"
                  onClick={() => setIsCompareMode(!isCompareMode)}
                  className={`pointer-events-auto px-3 py-1.5 text-[11px] uppercase font-medium tracking-wider border backdrop-blur-md transition-colors cursor-pointer flex items-center space-x-1.5 ${
                    isCompareMode
                      ? 'bg-[#C5A880] text-[#141414] border-[#C5A880] font-bold'
                      : 'bg-black/80 text-white border-white/20 hover:border-white'
                  }`}
                >
                  <ArrowLeftRight className="w-3.5 h-3.5" />
                  <span>{isCompareMode ? 'Exit Compare' : 'Compare'}</span>
                </button>
              )}
            </div>
          </div>

          {/* RIGHT: Intelligent Styling & Recommendations (5 cols) */}
          <div className="lg:col-span-5 p-5 sm:p-6 bg-[#141414] flex flex-col justify-between max-h-[550px] overflow-y-auto space-y-4">
            
            <div className="space-y-4">
              
              {/* 1. SIMPLIFIED FACE-SHAPE RESULT */}
              <div className="p-4 bg-[#1B1917] border border-[#2E2A26] space-y-2">
                <div className="flex items-center justify-between">
                  <div className="text-xs text-[#9E968E] uppercase tracking-wider">
                    Face Analysis
                  </div>
                  <span className="text-[10px] text-[#C5A880] bg-[#C5A880]/15 px-2 py-0.5 font-medium border border-[#C5A880]/30">
                    {currentAdvice.confidence}
                  </span>
                </div>

                <div className="font-serif text-lg sm:text-xl text-white">
                  Your face shape: <strong className="text-[#C5A880] font-normal">{currentAdvice.name}</strong>
                </div>

                <div className="text-xs text-[#D8CEBE] font-light leading-relaxed">
                  <span className="text-white font-medium">Recommended frame shapes:</span> {currentAdvice.recommendedShapes.join(', ')}
                </div>

                <p className="text-[11px] text-[#A89F91] leading-relaxed pt-1 border-t border-white/5">
                  {currentAdvice.summary}
                </p>
              </div>

              {/* 2. SECTION: RECOMMENDED FOR YOUR FACE SHAPE */}
              <div>
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-serif text-base text-white">
                    Recommended for Your Face Shape
                  </h3>
                  
                  <button
                    type="button"
                    onClick={() => setIsBrowsingAll(!isBrowsingAll)}
                    className="text-xs text-[#C5A880] hover:underline cursor-pointer"
                  >
                    {isBrowsingAll ? 'Show Recommended' : 'Browse All Frames'}
                  </button>
                </div>

                {/* Recommended List of Frames (Larger & Clearer) */}
                {!isBrowsingAll ? (
                  <div className="space-y-2.5">
                    {recommendedList.map((item) => {
                      const isSelected = selectedFrame.id === item.id;
                      return (
                        <div
                          key={item.id}
                          className={`p-2.5 border transition-all flex items-center justify-between ${
                            isSelected
                              ? 'border-[#C5A880] bg-[#221C16]'
                              : 'border-[#282828] bg-[#181818] hover:border-[#444]'
                          }`}
                        >
                          <div className="flex items-center space-x-3 min-w-0">
                            <div className="w-16 h-12 bg-[#0E0E0E] overflow-hidden flex-shrink-0 flex items-center justify-center">
                              <ProductImage
                                src={item.image}
                                alt={item.name}
                                frameShape={item.frameShape}
                                aspectRatio="aspect-[4/3]"
                                className="w-16 h-12"
                              />
                            </div>
                            <div className="min-w-0">
                              <h4 className="font-serif text-sm text-white truncate">{item.name}</h4>
                              <p className="text-[11px] text-[#9E968E]">{item.frameShape} · ${item.price}</p>
                            </div>
                          </div>

                          <button
                            type="button"
                            onClick={() => {
                              if (isCompareMode) {
                                setCompareFrame(item);
                              } else {
                                setSelectedFrame(item);
                                setSelectedColorIdx(0);
                              }
                            }}
                            className={`px-3 py-1.5 text-xs font-semibold uppercase tracking-wider transition-colors cursor-pointer flex-shrink-0 ${
                              isSelected
                                ? 'bg-[#C5A880] text-[#141414]'
                                : 'bg-white/10 hover:bg-white text-white hover:text-black'
                            }`}
                          >
                            {isSelected ? 'Selected' : 'Try On'}
                          </button>
                        </div>
                      );
                    })}
                  </div>
                ) : (
                  /* Full Catalog Browser (Shape Filter + Cards) */
                  <div className="space-y-2.5 animate-in fade-in duration-150">
                    <div className="flex items-center space-x-1.5 overflow-x-auto no-scrollbar pb-1">
                      {['All', 'Geometric', 'Square', 'Round', 'Cat Eye', 'Aviator'].map((shape) => (
                        <button
                          key={shape}
                          type="button"
                          onClick={() => setActiveShapeFilter(shape)}
                          className={`px-2.5 py-1 text-[10px] uppercase font-medium tracking-wider border whitespace-nowrap cursor-pointer ${
                            activeShapeFilter === shape
                              ? 'bg-[#C5A880] text-[#141414] border-[#C5A880] font-bold'
                              : 'bg-[#1A1A1A] text-[#9E968E] border-[#333] hover:text-white'
                          }`}
                        >
                          {shape}
                        </button>
                      ))}
                    </div>

                    <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
                      {filteredCatalog.map((item) => {
                        const isSelected = selectedFrame.id === item.id;
                        return (
                          <div
                            key={item.id}
                            className={`p-2 border transition-all flex items-center justify-between ${
                              isSelected
                                ? 'border-[#C5A880] bg-[#221C16]'
                                : 'border-[#282828] bg-[#181818] hover:border-[#444]'
                            }`}
                          >
                            <div className="flex items-center space-x-3 min-w-0">
                              <div className="w-14 h-10 bg-[#0E0E0E] overflow-hidden flex-shrink-0 flex items-center justify-center">
                                <ProductImage
                                  src={item.image}
                                  alt={item.name}
                                  frameShape={item.frameShape}
                                  aspectRatio="aspect-[4/3]"
                                  className="w-14 h-10"
                                />
                              </div>
                              <div className="min-w-0">
                                <h4 className="font-serif text-xs text-white truncate">{item.name}</h4>
                                <p className="text-[10px] text-[#9E968E]">{item.frameShape} · ${item.price}</p>
                              </div>
                            </div>

                            <button
                              type="button"
                              onClick={() => {
                                if (isCompareMode) {
                                  setCompareFrame(item);
                                } else {
                                  setSelectedFrame(item);
                                  setSelectedColorIdx(0);
                                }
                              }}
                              className={`px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wider transition-colors cursor-pointer flex-shrink-0 ${
                                isSelected
                                  ? 'bg-[#C5A880] text-[#141414]'
                                  : 'bg-white/10 hover:bg-white text-white hover:text-black'
                              }`}
                            >
                              {isSelected ? 'Selected' : 'Try On'}
                            </button>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>

              {/* 3. FINISH & SIZING OPTIONS */}
              <div className="pt-2 border-t border-[#242424] flex items-center justify-between">
                {/* Frame Color Swatches */}
                {selectedFrame.colors && selectedFrame.colors.length > 0 && (
                  <div className="flex items-center space-x-2">
                    <span className="text-[11px] text-[#9E968E] uppercase">Color:</span>
                    <div className="flex items-center space-x-1.5">
                      {selectedFrame.colors.map((col, idx) => (
                        <button
                          key={col.name}
                          type="button"
                          onClick={() => setSelectedColorIdx(idx)}
                          className={`w-4 h-4 rounded-full border transition-all cursor-pointer ${
                            selectedColorIdx === idx
                              ? 'ring-2 ring-offset-1 ring-offset-black ring-[#C5A880] scale-110'
                              : 'border-white/30 opacity-70 hover:opacity-100'
                          }`}
                          style={{ backgroundColor: col.hex }}
                          title={col.name}
                        />
                      ))}
                    </div>
                  </div>
                )}

                {/* Sizing: S / M / L */}
                <div className="flex items-center space-x-1 bg-[#1A1A1A] p-0.5 border border-[#333]">
                  {['Small', 'Medium', 'Large'].map((sz) => (
                    <button
                      key={sz}
                      type="button"
                      onClick={() => setSelectedSize(sz)}
                      className={`px-2 py-0.5 text-[9px] uppercase font-bold tracking-wider transition-colors cursor-pointer ${
                        selectedSize === sz ? 'bg-[#C5A880] text-[#141414]' : 'text-[#9E968E] hover:text-white'
                      }`}
                    >
                      {sz[0]}
                    </button>
                  ))}
                </div>
              </div>

            </div>

            {/* Bottom Actions */}
            <div className="pt-3 border-t border-[#242424] space-y-2">
              <button
                type="button"
                onClick={() => {
                  addToCart(selectedFrame, { 
                    color: selectedFrame.colors?.[selectedColorIdx]?.name,
                    size: selectedSize 
                  });
                  handleClose();
                }}
                className="w-full py-3 bg-[#C5A880] hover:bg-[#B39264] text-[#141414] text-xs font-bold uppercase tracking-widest transition-colors shadow-lg cursor-pointer flex items-center justify-center space-x-2"
              >
                <span>Add {selectedFrame.name} to Bag · ${selectedFrame.price}</span>
              </button>

              <button
                type="button"
                onClick={handleCaptureSnapshot}
                className="w-full py-2 bg-transparent hover:bg-white/5 border border-white/20 text-white text-[11px] uppercase tracking-wider flex items-center justify-center space-x-1.5 transition-colors cursor-pointer"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Save Photo</span>
              </button>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
};

export default VirtualTryOnModal;
