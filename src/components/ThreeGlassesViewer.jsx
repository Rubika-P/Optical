import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { RotateCw, Sparkles, Layers, Eye, RefreshCw, ZoomIn, ZoomOut, Maximize2 } from 'lucide-react';

const ThreeGlassesViewer = ({
  product,
  selectedColor,
  lensTint = 'clear',
  isExploded = false,
  autoRotate = true,
  height = '480px'
}) => {
  const mountRef = useRef(null);
  const sceneRef = useRef(null);
  const rendererRef = useRef(null);
  const glassesGroupRef = useRef(null);
  const partsRef = useRef({});
  const animationFrameId = useRef(null);

  const [isRotating, setIsRotating] = useState(autoRotate);
  const [explodedState, setExplodedState] = useState(isExploded);
  const [activeLensType, setActiveLensType] = useState(lensTint); // 'clear', 'dark', 'amber', 'mirror'

  useEffect(() => {
    const currentMount = mountRef.current;
    if (!currentMount) return;

    const width = currentMount.clientWidth || 600;
    const canvasHeight = currentMount.clientHeight || 480;

    // 1. Scene Setup
    const scene = new THREE.Scene();
    sceneRef.current = scene;

    // Subtle dark luxury studio background gradient
    scene.background = new THREE.Color('#0D0D0D');
    scene.fog = new THREE.FogExp2('#0D0D0D', 0.04);

    // 2. Camera Setup
    const camera = new THREE.PerspectiveCamera(40, width / canvasHeight, 0.1, 100);
    camera.position.set(0, 0.8, 4.8);
    camera.lookAt(0, 0, 0);

    // 3. WebGL Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: 'high-performance' });
    renderer.setSize(width, canvasHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.25;
    rendererRef.current = renderer;

    currentMount.replaceChildren(renderer.domElement);

    // 4. Studio Lighting System
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.2);
    scene.add(ambientLight);

    // Key Light
    const keyLight = new THREE.DirectionalLight(0xfff5e6, 3.5);
    keyLight.position.set(4, 5, 5);
    keyLight.castShadow = true;
    keyLight.shadow.mapSize.width = 1024;
    keyLight.shadow.mapSize.height = 1024;
    scene.add(keyLight);

    // Fill Light (Cool tint)
    const fillLight = new THREE.DirectionalLight(0xddeeff, 2.0);
    fillLight.position.set(-4, 3, -3);
    scene.add(fillLight);

    // Rim / Backlight (Gold accent)
    const rimLight = new THREE.DirectionalLight(0xc5a880, 2.8);
    rimLight.position.set(0, -4, -4);
    scene.add(rimLight);

    // Top Studio Softbox
    const topLight = new THREE.PointLight(0xffffff, 2.5, 10);
    topLight.position.set(0, 4, 0);
    scene.add(topLight);

    // Ground shadow receiver plane
    const shadowPlaneGeo = new THREE.PlaneGeometry(10, 10);
    const shadowPlaneMat = new THREE.ShadowMaterial({ opacity: 0.35 });
    const shadowPlane = new THREE.Mesh(shadowPlaneGeo, shadowPlaneMat);
    shadowPlane.rotation.x = -Math.PI / 2;
    shadowPlane.position.y = -1.2;
    shadowPlane.receiveShadow = true;
    scene.add(shadowPlane);

    // 5. Build 3D Eyewear Assembly
    const glassesGroup = new THREE.Group();
    glassesGroupRef.current = glassesGroup;
    scene.add(glassesGroup);

    // Material definitions
    const frameColorHex = selectedColor?.hex || product?.colors?.[0]?.hex || '#C5A880';
    const isMetallic = !product?.material?.toLowerCase().includes('acetate');

    const frameMaterial = new THREE.MeshStandardMaterial({
      color: new THREE.Color(frameColorHex),
      metalness: isMetallic ? 0.92 : 0.25,
      roughness: isMetallic ? 0.18 : 0.12,
      envMapIntensity: 2.0
    });

    // Lens Materials
    const getLensMaterial = (type) => {
      let lensColor = 0xe8f4f8;
      let opacity = 0.28;
      let roughness = 0.05;
      let transmission = 0.92;

      if (type === 'dark') {
        lensColor = 0x111111;
        opacity = 0.88;
        transmission = 0.2;
      } else if (type === 'amber') {
        lensColor = 0xb57c32;
        opacity = 0.75;
        transmission = 0.45;
      } else if (type === 'mirror') {
        lensColor = 0x88ccff;
        opacity = 0.85;
        roughness = 0.02;
        transmission = 0.15;
      }

      return new THREE.MeshPhysicalMaterial({
        color: new THREE.Color(lensColor),
        transparent: true,
        opacity: opacity,
        roughness: roughness,
        metalness: type === 'mirror' ? 0.85 : 0.1,
        transmission: transmission,
        ior: 1.52,
        reflectivity: 0.9,
        clearcoat: 1.0,
        clearcoatRoughness: 0.04
      });
    };

    const lensMaterial = getLensMaterial(activeLensType);

    // 3D Geometry: Shape identification
    const shape = product?.frameShape || 'Geometric';
    const isRound = shape === 'Round' || shape === 'Oval';
    const isAviator = shape === 'Aviator';
    const isCatEye = shape === 'Cat Eye';
    const isRimless = product?.rimType === 'Rimless';

    // Parts storage for explosion animation
    const parts = {
      leftRim: null,
      rightRim: null,
      leftLens: null,
      rightLens: null,
      bridge: null,
      leftTemple: null,
      rightTemple: null,
      nosePads: []
    };

    const lensRadius = isRound ? 0.65 : 0.72;
    const lensSpacing = 0.98;

    // A. Left Lens & Right Lens
    let leftLensGeo, rightLensGeo;
    if (isRound) {
      leftLensGeo = new THREE.CylinderGeometry(0.62, 0.62, 0.04, 36);
      rightLensGeo = new THREE.CylinderGeometry(0.62, 0.62, 0.04, 36);
      leftLensGeo.rotateX(Math.PI / 2);
      rightLensGeo.rotateX(Math.PI / 2);
    } else if (isAviator) {
      leftLensGeo = new THREE.CylinderGeometry(0.68, 0.60, 0.04, 32);
      rightLensGeo = new THREE.CylinderGeometry(0.68, 0.60, 0.04, 32);
      leftLensGeo.rotateX(Math.PI / 2);
      rightLensGeo.rotateX(Math.PI / 2);
    } else {
      leftLensGeo = new THREE.BoxGeometry(1.25, 0.92, 0.04);
      rightLensGeo = new THREE.BoxGeometry(1.25, 0.92, 0.04);
    }

    const leftLens = new THREE.Mesh(leftLensGeo, lensMaterial);
    leftLens.position.set(-lensSpacing, 0, 0);
    leftLens.castShadow = true;
    glassesGroup.add(leftLens);
    parts.leftLens = leftLens;

    const rightLens = new THREE.Mesh(rightLensGeo, lensMaterial);
    rightLens.position.set(lensSpacing, 0, 0);
    rightLens.castShadow = true;
    glassesGroup.add(rightLens);
    parts.rightLens = rightLens;

    // B. Left & Right Frame Rims
    if (!isRimless) {
      let rimGeo;
      if (isRound) {
        rimGeo = new THREE.TorusGeometry(0.63, 0.045, 16, 48);
      } else if (isAviator) {
        rimGeo = new THREE.TorusGeometry(0.65, 0.04, 16, 48);
      } else {
        // Torus / rectangular frame border
        rimGeo = new THREE.TorusGeometry(0.70, 0.05, 16, 4);
        rimGeo.rotateZ(Math.PI / 4);
      }

      const leftRim = new THREE.Mesh(rimGeo, frameMaterial);
      leftRim.position.set(-lensSpacing, 0, 0);
      leftRim.castShadow = true;
      glassesGroup.add(leftRim);
      parts.leftRim = leftRim;

      const rightRim = new THREE.Mesh(rimGeo, frameMaterial);
      rightRim.position.set(lensSpacing, 0, 0);
      rightRim.castShadow = true;
      glassesGroup.add(rightRim);
      parts.rightRim = rightRim;
    }

    // C. Center Bridge
    const bridgeCurve = new THREE.CatmullRomCurve3([
      new THREE.Vector3(-0.35, 0.1, 0),
      new THREE.Vector3(0, 0.22, 0.05),
      new THREE.Vector3(0.35, 0.1, 0)
    ]);
    const bridgeGeo = new THREE.TubeGeometry(bridgeCurve, 24, isRimless ? 0.025 : 0.035, 12, false);
    const bridgeMesh = new THREE.Mesh(bridgeGeo, frameMaterial);
    bridgeMesh.castShadow = true;
    glassesGroup.add(bridgeMesh);
    parts.bridge = bridgeMesh;

    // Top Aviator Bar if Aviator
    if (isAviator) {
      const topBarCurve = new THREE.CatmullRomCurve3([
        new THREE.Vector3(-0.6, 0.42, 0),
        new THREE.Vector3(0, 0.44, 0.02),
        new THREE.Vector3(0.6, 0.42, 0)
      ]);
      const topBarGeo = new THREE.TubeGeometry(topBarCurve, 20, 0.025, 10, false);
      const topBarMesh = new THREE.Mesh(topBarGeo, frameMaterial);
      glassesGroup.add(topBarMesh);
    }

    // D. Left & Right Temples (Arms)
    const leftTempleCurve = new THREE.CatmullRomCurve3([
      new THREE.Vector3(-lensSpacing - 0.65, 0.12, 0),
      new THREE.Vector3(-lensSpacing - 0.70, 0.12, -0.8),
      new THREE.Vector3(-lensSpacing - 0.68, 0.05, -2.0),
      new THREE.Vector3(-lensSpacing - 0.62, -0.32, -2.4) // curved ear tip
    ]);
    const templeGeo = new THREE.TubeGeometry(leftTempleCurve, 36, 0.035, 12, false);
    const leftTemple = new THREE.Mesh(templeGeo, frameMaterial);
    leftTemple.castShadow = true;
    glassesGroup.add(leftTemple);
    parts.leftTemple = leftTemple;

    const rightTempleCurve = new THREE.CatmullRomCurve3([
      new THREE.Vector3(lensSpacing + 0.65, 0.12, 0),
      new THREE.Vector3(lensSpacing + 0.70, 0.12, -0.8),
      new THREE.Vector3(lensSpacing + 0.68, 0.05, -2.0),
      new THREE.Vector3(lensSpacing + 0.62, -0.32, -2.4)
    ]);
    const rightTempleGeo = new THREE.TubeGeometry(rightTempleCurve, 36, 0.035, 12, false);
    const rightTemple = new THREE.Mesh(rightTempleGeo, frameMaterial);
    rightTemple.castShadow = true;
    glassesGroup.add(rightTemple);
    parts.rightTemple = rightTemple;

    // E. Medical Silicone Nose Pads
    const padMaterial = new THREE.MeshStandardMaterial({
      color: 0xffffff,
      transparent: true,
      opacity: 0.75,
      roughness: 0.3
    });
    const padGeo = new THREE.CapsuleGeometry(0.04, 0.12, 8, 16);

    const leftPad = new THREE.Mesh(padGeo, padMaterial);
    leftPad.position.set(-0.32, -0.15, -0.15);
    leftPad.rotation.z = -Math.PI / 8;
    glassesGroup.add(leftPad);

    const rightPad = new THREE.Mesh(padGeo, padMaterial);
    rightPad.position.set(0.32, -0.15, -0.15);
    rightPad.rotation.z = Math.PI / 8;
    glassesGroup.add(rightPad);
    parts.nosePads = [leftPad, rightPad];

    partsRef.current = parts;

    // 6. Interactive Mouse Drag & Touch Rotation
    let isDragging = false;
    let previousMousePosition = { x: 0, y: 0 };

    const handlePointerDown = (e) => {
      isDragging = true;
      setIsRotating(false);
      previousMousePosition = {
        x: e.clientX || e.touches?.[0]?.clientX || 0,
        y: e.clientY || e.touches?.[0]?.clientY || 0
      };
    };

    const handlePointerMove = (e) => {
      if (!isDragging) return;

      const currentX = e.clientX || e.touches?.[0]?.clientX || 0;
      const currentY = e.clientY || e.touches?.[0]?.clientY || 0;

      const deltaX = currentX - previousMousePosition.x;
      const deltaY = currentY - previousMousePosition.y;

      glassesGroup.rotation.y += deltaX * 0.008;
      glassesGroup.rotation.x = Math.max(-0.6, Math.min(0.6, glassesGroup.rotation.x + deltaY * 0.008));

      previousMousePosition = { x: currentX, y: currentY };
    };

    const handlePointerUp = () => {
      isDragging = false;
    };

    const domElement = renderer.domElement;
    domElement.addEventListener('pointerdown', handlePointerDown);
    window.addEventListener('pointermove', handlePointerMove);
    window.addEventListener('pointerup', handlePointerUp);

    // 7. Render Loop
    let clock = new THREE.Clock();

    const animate = () => {
      const delta = clock.getDelta();

      if (isRotating && !isDragging) {
        glassesGroup.rotation.y += 0.008;
      }

      // Smooth Exploded View Interpolation
      const targetOffset = explodedState ? 0.6 : 0;
      if (parts.leftLens && parts.rightLens) {
        parts.leftLens.position.z = THREE.MathUtils.lerp(parts.leftLens.position.z, targetOffset * 1.5, 0.08);
        parts.rightLens.position.z = THREE.MathUtils.lerp(parts.rightLens.position.z, targetOffset * 1.5, 0.08);
      }
      if (parts.leftRim && parts.rightRim) {
        parts.leftRim.position.x = THREE.MathUtils.lerp(parts.leftRim.position.x, -lensSpacing - targetOffset * 0.5, 0.08);
        parts.rightRim.position.x = THREE.MathUtils.lerp(parts.rightRim.position.x, lensSpacing + targetOffset * 0.5, 0.08);
      }
      if (parts.leftTemple && parts.rightTemple) {
        parts.leftTemple.position.x = THREE.MathUtils.lerp(parts.leftTemple.position.x, -targetOffset * 0.8, 0.08);
        parts.rightTemple.position.x = THREE.MathUtils.lerp(parts.rightTemple.position.x, targetOffset * 0.8, 0.08);
      }

      renderer.render(scene, camera);
      animationFrameId.current = requestAnimationFrame(animate);
    };

    animate();

    // 8. Handle Window Resize
    const handleResize = () => {
      if (!currentMount) return;
      const newWidth = currentMount.clientWidth;
      const newHeight = currentMount.clientHeight;
      camera.aspect = newWidth / newHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(newWidth, newHeight);
    };
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      domElement.removeEventListener('pointerdown', handlePointerDown);
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('pointerup', handlePointerUp);
      if (animationFrameId.current) cancelAnimationFrame(animationFrameId.current);
      renderer.dispose();
    };
  }, [product, selectedColor, explodedState, activeLensType, isRotating]);

  return (
    <div className="relative w-full rounded-none overflow-hidden bg-[#0D0D0D] border border-[#2B2B2B] flex flex-col items-center justify-center select-none" style={{ height }}>
      {/* 3D WebGL Canvas Container */}
      <div ref={mountRef} className="w-full h-full cursor-grab active:cursor-grabbing" />

      {/* Top HUD Badges */}
      <div className="absolute top-4 left-4 z-20 flex items-center space-x-2 pointer-events-none">
        <div className="bg-black/80 backdrop-blur-md px-3 py-1.5 border border-white/20 text-xs text-white flex items-center space-x-2">
          <Sparkles className="w-3.5 h-3.5 text-[#C5A880]" />
          <span className="font-mono text-[11px] uppercase tracking-wider text-[#C5A880]">
            WebGL 3D Engine · {product?.name || 'GRAND OPTICALS FRAME'}
          </span>
        </div>
      </div>

      {/* Interaction Help Pill */}
      <div className="absolute top-4 right-4 z-20 pointer-events-none">
        <div className="bg-black/70 backdrop-blur-md px-2.5 py-1 border border-white/15 text-[10px] text-[#A89F91] uppercase tracking-widest">
          360° Drag & Orbit
        </div>
      </div>

      {/* Bottom Floating 3D Tool Controls */}
      <div className="absolute bottom-4 inset-x-4 z-20 flex flex-wrap items-center justify-between gap-2 pointer-events-none">
        {/* Lens Coating Switcher */}
        <div className="flex items-center space-x-1.5 bg-black/80 backdrop-blur-md p-1 border border-white/20 pointer-events-auto">
          <span className="text-[10px] uppercase tracking-wider text-[#8C847A] px-2 hidden sm:inline">Coatings:</span>
          {[
            { id: 'clear', label: 'Clear Blue' },
            { id: 'dark', label: 'Polarized' },
            { id: 'amber', label: 'Amber' },
            { id: 'mirror', label: 'Mirror' }
          ].map((lens) => (
            <button
              key={lens.id}
              type="button"
              onClick={() => setActiveLensType(lens.id)}
              className={`px-2.5 py-1 text-[11px] uppercase tracking-wider transition-colors ${
                activeLensType === lens.id
                  ? 'bg-[#C5A880] text-[#141414] font-bold'
                  : 'text-white hover:text-[#C5A880]'
              }`}
            >
              {lens.label}
            </button>
          ))}
        </div>

        {/* 3D Action Buttons */}
        <div className="flex items-center space-x-2 pointer-events-auto">
          {/* Exploded View Toggle */}
          <button
            type="button"
            onClick={() => setExplodedState(!explodedState)}
            className={`px-3 py-1.5 text-xs uppercase tracking-wider font-semibold border backdrop-blur-md flex items-center space-x-1.5 transition-colors ${
              explodedState
                ? 'bg-[#C5A880] text-[#141414] border-[#C5A880]'
                : 'bg-black/80 text-white border-white/20 hover:border-[#C5A880]'
            }`}
            title="Explode 3D Anatomical Assembly"
          >
            <Layers className="w-3.5 h-3.5" />
            <span>{explodedState ? 'Assembled' : '3D Anatomy'}</span>
          </button>

          {/* Auto-Rotation Toggle */}
          <button
            type="button"
            onClick={() => setIsRotating(!isRotating)}
            className={`p-2 rounded-none border backdrop-blur-md transition-colors ${
              isRotating
                ? 'bg-[#C5A880] text-[#141414] border-[#C5A880]'
                : 'bg-black/80 text-white border-white/20 hover:border-[#C5A880]'
            }`}
            title={isRotating ? 'Pause 3D Rotation' : 'Start Auto 3D Rotation'}
          >
            <RotateCw className={`w-3.5 h-3.5 ${isRotating ? 'animate-spin' : ''}`} />
          </button>

          {/* Reset Orbit Position */}
          <button
            type="button"
            onClick={() => {
              if (glassesGroupRef.current) {
                glassesGroupRef.current.rotation.set(0, 0, 0);
              }
              setIsRotating(true);
            }}
            className="p-2 bg-black/80 text-white hover:text-[#C5A880] border border-white/20 rounded-none backdrop-blur-md transition-colors"
            title="Reset 3D Angle"
          >
            <RefreshCw className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ThreeGlassesViewer;
