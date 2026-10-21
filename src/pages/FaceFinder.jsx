import React, { useState } from 'react';
import { Sparkles, ArrowRight, Check, RefreshCw, Eye, ShieldCheck, Star } from 'lucide-react';
import { PRODUCTS, FACE_SHAPES_DATA } from '../data/products';
import ProductCard from '../components/ProductCard';

const FaceFinder = () => {
  const [step, setStep] = useState(1);
  const [answers, setAnswers] = useState({
    faceShape: 'Oval',
    style: 'Minimal',
    occasion: 'Daily Creative & Screen Focus',
    colorPreference: 'Muted Gold & Dark Titanium'
  });
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [showResults, setShowResults] = useState(false);

  const faceShapes = [
    { name: 'Oval', desc: 'Balanced proportions with slightly narrower jaw.' },
    { name: 'Round', desc: 'Equal width & height with gentle soft curves.' },
    { name: 'Square', desc: 'Bold, structured jawline and proportional forehead.' },
    { name: 'Heart', desc: 'Wider forehead tapering into a delicate chin.' },
    { name: 'Diamond', desc: 'Dramatic high cheekbones with narrow forehead & chin.' },
    { name: 'Oblong', desc: 'Graceful elongated facial length with tall brow.' }
  ];

  const styles = [
    { name: 'Minimal', desc: 'Clean, whisper-thin titanium architectural lines.' },
    { name: 'Classic', desc: 'Timeless mid-century pantos and wayfarer staples.' },
    { name: 'Bold', desc: 'Substantial chunky bio-acetate statement frames.' },
    { name: 'Trendy', desc: 'Contemporary geometric and cat-eye silhouettes.' },
    { name: 'Professional', desc: 'Subtle semi-rimless executive poise.' },
    { name: 'Vintage', desc: 'Engraved filigree double-bridge Riviera styling.' }
  ];

  const occasions = [
    { name: 'Daily Creative & Screen Focus', desc: 'Digital office work with blue-light filtering.' },
    { name: 'Executive & Formal Presentations', desc: 'Polished authority and clean silhouette.' },
    { name: 'Outdoor & High-Sun Lifestyle', desc: 'Polarized UVA/UVB high protection.' },
    { name: 'Evening & Fashion Statement', desc: 'Sculptural eye-catching statement pieces.' }
  ];

  const colors = [
    { name: 'Muted Gold & Dark Titanium', hex: '#C5A880' },
    { name: 'Deep Charcoal & Pitch Black', hex: '#141414' },
    { name: 'Champagne Tortoise & Warm Amber', hex: '#8B5A2B' },
    { name: 'Crystal Clear & Translucent', hex: '#EAEAEA' },
    { name: 'Silver Frost & Palladium', hex: '#C0C0C0' }
  ];

  const handleNext = () => {
    if (step < 4) {
      setStep(step + 1);
    } else {
      // Trigger AI Calculation Animation
      setIsAnalyzing(true);
      setTimeout(() => {
        setIsAnalyzing(false);
        setShowResults(true);
      }, 1500);
    }
  };

  const resetQuiz = () => {
    setStep(1);
    setShowResults(false);
  };

  // Matched recommendations
  const matchedProducts = PRODUCTS.filter((p) => {
    const shapeMatch = p.faceShapes?.includes(answers.faceShape);
    const styleMatch = p.style === answers.style;
    return shapeMatch || styleMatch;
  }).slice(0, 4);

  const currentShapeData = FACE_SHAPES_DATA.find((f) => f.shape === answers.faceShape) || FACE_SHAPES_DATA[0];

  return (
    <div className="bg-[#FBF9F5] min-h-screen text-[#171717] py-12 sm:py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center space-x-2 bg-[#171717] text-[#C5A880] px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.25em] mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Intelligent Frame Diagnostic</span>
          </div>
          <h1 className="font-serif text-3xl sm:text-5xl font-normal text-[#171717] mb-3">
            Your face. Your style. Your frame.
          </h1>
          <p className="text-xs sm:text-sm text-[#6B655F]">
            Answer 4 quick questions to compute the millimeter frame dimensions and silhouette shapes engineered for your facial geometry.
          </p>
        </div>

        {/* Diagnostic Wizard Box */}
        {!showResults && !isAnalyzing && (
          <div className="bg-white border border-[#ECE6DC] p-6 sm:p-10 shadow-sm">
            {/* Progress Stepper */}
            <div className="flex items-center justify-between pb-8 border-b border-[#ECE6DC] mb-8">
              {[1, 2, 3, 4].map((s) => (
                <div key={s} className="flex items-center space-x-2">
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold font-mono transition-colors ${
                      step === s
                        ? 'bg-[#171717] text-white ring-4 ring-[#EADECA]'
                        : step > s
                        ? 'bg-[#C5A880] text-[#141414]'
                        : 'bg-[#F4EFEB] text-[#9E968E]'
                    }`}
                  >
                    {step > s ? <Check className="w-4 h-4" /> : s}
                  </div>
                  <span className="hidden sm:inline text-xs uppercase tracking-wider font-semibold text-[#6B655F]">
                    {s === 1 ? 'Face Shape' : s === 2 ? 'Aesthetic' : s === 3 ? 'Occasion' : 'Color Tone'}
                  </span>
                </div>
              ))}
            </div>

            {/* Step 1: Face Shape */}
            {step === 1 && (
              <div className="space-y-6">
                <div>
                  <h3 className="font-serif text-2xl text-[#171717] mb-1">
                    1. What is your dominant face shape?
                  </h3>
                  <p className="text-xs text-[#7A736B]">
                    Select the contour that best reflects your jawline, forehead and cheekbone width.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                  {faceShapes.map((f) => (
                    <button
                      key={f.name}
                      onClick={() => setAnswers({ ...answers, faceShape: f.name })}
                      className={`p-4 text-left border transition-all ${
                        answers.faceShape === f.name
                          ? 'border-[#171717] bg-[#FAF7F2] ring-1 ring-[#171717]'
                          : 'border-[#E0D8CB] hover:border-[#171717] bg-white'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-serif text-lg font-medium text-[#171717]">{f.name}</span>
                        {answers.faceShape === f.name && <Check className="w-4 h-4 text-[#8B6B3F]" />}
                      </div>
                      <p className="text-[11px] text-[#7A736B] leading-snug">{f.desc}</p>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Step 2: Preferred Style */}
            {step === 2 && (
              <div className="space-y-6">
                <div>
                  <h3 className="font-serif text-2xl text-[#171717] mb-1">
                    2. Which design aesthetic best reflects your personal wardrobe?
                  </h3>
                  <p className="text-xs text-[#7A736B]">
                    Choose the design philosophy that matches your daily eyewear mood.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                  {styles.map((st) => (
                    <button
                      key={st.name}
                      onClick={() => setAnswers({ ...answers, style: st.name })}
                      className={`p-4 text-left border transition-all ${
                        answers.style === st.name
                          ? 'border-[#171717] bg-[#FAF7F2] ring-1 ring-[#171717]'
                          : 'border-[#E0D8CB] hover:border-[#171717] bg-white'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-serif text-lg font-medium text-[#171717]">{st.name}</span>
                        {answers.style === st.name && <Check className="w-4 h-4 text-[#8B6B3F]" />}
                      </div>
                      <p className="text-[11px] text-[#7A736B] leading-snug">{st.desc}</p>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Step 3: Occasion */}
            {step === 3 && (
              <div className="space-y-6">
                <div>
                  <h3 className="font-serif text-2xl text-[#171717] mb-1">
                    3. What primary occasion are you shopping for?
                  </h3>
                  <p className="text-xs text-[#7A736B]">
                    Helps optimize lens index, coatings, and structural temple flexibility.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {occasions.map((occ) => (
                    <button
                      key={occ.name}
                      onClick={() => setAnswers({ ...answers, occasion: occ.name })}
                      className={`p-5 text-left border transition-all ${
                        answers.occasion === occ.name
                          ? 'border-[#171717] bg-[#FAF7F2] ring-1 ring-[#171717]'
                          : 'border-[#E0D8CB] hover:border-[#171717] bg-white'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-serif text-base font-medium text-[#171717]">{occ.name}</span>
                        {answers.occasion === occ.name && <Check className="w-4 h-4 text-[#8B6B3F]" />}
                      </div>
                      <p className="text-[11px] text-[#7A736B] leading-snug">{occ.desc}</p>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Step 4: Color Palette */}
            {step === 4 && (
              <div className="space-y-6">
                <div>
                  <h3 className="font-serif text-2xl text-[#171717] mb-1">
                    4. What frame finish tone complements your complexion?
                  </h3>
                  <p className="text-xs text-[#7A736B]">
                    Harmonize metal or acetate tones with your jewelry and skin undertone.
                  </p>
                </div>

                <div className="space-y-3">
                  {colors.map((col) => (
                    <button
                      key={col.name}
                      onClick={() => setAnswers({ ...answers, colorPreference: col.name })}
                      className={`w-full p-4 text-left border flex items-center justify-between transition-all ${
                        answers.colorPreference === col.name
                          ? 'border-[#171717] bg-[#FAF7F2] ring-1 ring-[#171717]'
                          : 'border-[#E0D8CB] hover:border-[#171717] bg-white'
                      }`}
                    >
                      <div className="flex items-center space-x-3">
                        <span
                          className="w-6 h-6 rounded-full border border-black/20"
                          style={{ backgroundColor: col.hex }}
                        />
                        <span className="font-serif text-base text-[#171717]">{col.name}</span>
                      </div>
                      {answers.colorPreference === col.name && <Check className="w-4 h-4 text-[#8B6B3F]" />}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Stepper Navigation Actions */}
            <div className="mt-10 pt-6 border-t border-[#ECE6DC] flex items-center justify-between">
              {step > 1 ? (
                <button
                  onClick={() => setStep(step - 1)}
                  className="px-6 py-2.5 border border-[#DCD3C5] text-xs font-semibold uppercase tracking-wider text-[#6B655F] hover:text-[#171717]"
                >
                  Back
                </button>
              ) : (
                <div />
              )}

              <button
                onClick={handleNext}
                className="px-8 py-3.5 bg-[#171717] hover:bg-[#C5A880] text-white hover:text-[#141414] text-xs font-bold uppercase tracking-widest transition-all duration-300 flex items-center space-x-2"
              >
                <span>{step === 4 ? 'Compute Frame Compatibility' : 'Continue'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* Analyzing Animation State */}
        {isAnalyzing && (
          <div className="bg-white border border-[#ECE6DC] p-16 text-center space-y-6 shadow-sm">
            <div className="w-16 h-16 rounded-full bg-[#171717] text-[#C5A880] flex items-center justify-center mx-auto animate-spin">
              <Sparkles className="w-8 h-8" />
            </div>
            <h3 className="font-serif text-2xl text-[#171717]">
              Analyzing Facial Geometric Ratios...
            </h3>
            <p className="text-xs text-[#7A736B] max-w-sm mx-auto">
              Matching {answers.faceShape} bone structure with millimeter optical centers and Japanese titanium silhouettes.
            </p>
          </div>
        )}

        {/* Results Screen */}
        {showResults && (
          <div className="space-y-10">
            {/* Analysis Summary Box */}
            <div className="bg-[#171717] text-white p-8 sm:p-10 border border-[#2B2B2B]">
              <div className="flex flex-col md:flex-row md:items-center justify-between pb-6 border-b border-[#333333] mb-6">
                <div>
                  <span className="text-[10px] uppercase tracking-[0.3em] text-[#C5A880] font-semibold block mb-1">
                    AI Diagnostic Report
                  </span>
                  <h2 className="font-serif text-3xl font-medium text-white">
                    Optimal Match: {answers.faceShape} Facial Architecture
                  </h2>
                </div>
                <button
                  onClick={resetQuiz}
                  className="mt-4 md:mt-0 text-xs uppercase tracking-wider text-[#C5A880] hover:underline flex items-center space-x-1"
                >
                  <RefreshCw className="w-3.5 h-3.5 mr-1" /> Retake Diagnostic
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs text-[#D8CEBE]">
                <div>
                  <h4 className="font-semibold uppercase tracking-wider text-white mb-2">
                    Why These Silhouettes Work:
                  </h4>
                  <p className="leading-relaxed mb-3">
                    {currentShapeData.description}
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {currentShapeData.recommendations.map((rec) => (
                      <span key={rec} className="px-2.5 py-1 bg-white/10 text-white font-mono text-[11px] border border-white/20">
                        ✓ {rec} Frames
                      </span>
                    ))}
                  </div>
                </div>

                <div className="p-4 bg-white/5 border border-white/10">
                  <h4 className="font-semibold uppercase tracking-wider text-[#C5A880] mb-1">
                    Diagnostic Parameters:
                  </h4>
                  <ul className="space-y-1 text-[11px] text-[#A89F91]">
                    <li>• Style Preference: <strong>{answers.style}</strong></li>
                    <li>• Recommended Tint: <strong>{answers.colorPreference}</strong></li>
                    <li>• Usage Context: <strong>{answers.occasion}</strong></li>
                    <li>• Weight Target: <strong>Under 15.0 grams</strong></li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Recommended Products Grid */}
            <div>
              <h3 className="font-serif text-2xl sm:text-3xl text-[#171717] mb-2">
                Your Recommended Frames
              </h3>
              <p className="text-xs text-[#7A736B] mb-6">
                Selected for structural balance, lens width compatibility and aesthetic poise.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {matchedProducts.map((prod) => (
                  <div key={prod.id} className="relative flex flex-col">
                    <ProductCard product={prod} />
                    <div className="mt-2 p-2.5 bg-[#FAF7F2] border border-[#E0D8CB] text-[11px] text-[#6B655F]">
                      <span className="text-[#8B6B3F] font-semibold">Match Rationale:</span> Works exceptionally well with {answers.faceShape} contours & {answers.style} aesthetic.
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default FaceFinder;
