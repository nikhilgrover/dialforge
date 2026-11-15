import React, { useState, useEffect, useRef } from 'react';
import type { WatchBuild } from '../types/watch';
import { Play, Pause, RotateCw, Sparkles, Eye, Moon, Sun, Layers } from 'lucide-react';

interface WatchCanvasProps {
  build: WatchBuild;
}

export const WatchCanvas: React.FC<WatchCanvasProps> = ({ build }) => {
  const [isRunning, setIsRunning] = useState<boolean>(true);
  const [viewMode, setViewMode] = useState<'front' | 'back'>('front');
  const [renderMode, setRenderMode] = useState<'photo' | 'blueprint'>('photo');
  const [isLumeMode, setIsLumeMode] = useState<boolean>(false);
  const [currentTime, setCurrentTime] = useState<{ hours: number; minutes: number; seconds: number }>({
    hours: 10,
    minutes: 10,
    seconds: 36
  });

  const {
    movement,
    case: watchCase,
    dial,
    hands,
    secondsAccent,
    bezelInsert,
    rotor,
    strap
  } = build;

  // Animation loop for ticking/sweeping hands
  const requestRef = useRef<number | null>(null);
  const lastTickRef = useRef<number>(0);

  useEffect(() => {
    lastTickRef.current = Date.now();
    if (!isRunning) {
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
      return;
    }

    const beatsPerSec = movement?.beatsPerSecond || 6;
    const stepInterval = 1000 / beatsPerSec;

    const animate = () => {
      const now = Date.now();
      const delta = now - lastTickRef.current;

      if (delta >= stepInterval) {
        lastTickRef.current = now;
        setCurrentTime(prev => {
          const stepSize = 1 / beatsPerSec;
          let newSec = prev.seconds + stepSize;
          let newMin = prev.minutes;
          let newHour = prev.hours;

          if (newSec >= 60) {
            newSec = 0;
            newMin += 1 / 60;
            if (newMin >= 60) {
              newMin = 0;
              newHour = (newHour + 1) % 12;
            }
          }
          return { hours: newHour, minutes: newMin, seconds: newSec };
        });
      }
      requestRef.current = requestAnimationFrame(animate);
    };

    requestRef.current = requestAnimationFrame(animate);
    return () => {
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
    };
  }, [isRunning, movement?.beatsPerSecond]);

  // Hand angles
  const hourAngle = (currentTime.hours % 12) * 30 + (currentTime.minutes / 60) * 30;
  const minuteAngle = currentTime.minutes * 6;
  const secondAngle = currentTime.seconds * 6;

  // Dial & lume colors
  const dialColor = dial?.colorHex || '#18181b';
  const lumeColor = dial?.lume === 'C3' ? '#4ade80' : dial?.lume === 'Vintage' ? '#fde047' : '#38bdf8'; // BGW9 default
  const secHandColor = secondsAccent
    ? secondsAccent.colorHex
    : hands?.finish === 'gold'
    ? '#eab308'
    : '#ef4444';

  const caseId = watchCase?.id || 'case-sub-40';
  const isPvd = watchCase?.caseFinish === 'pvd-black';
  const hasCyclops = (caseId === 'case-datejust-36' || caseId === 'case-sub-40') && dial?.dateWindow === '3.0' && movement?.hasDate;

  // Lume filter color for photoreal glow mode
  const lumeGlowFilter = isLumeMode
    ? dial?.lume === 'C3'
      ? 'drop-shadow(0 0 12px rgba(74, 222, 128, 0.95)) drop-shadow(0 0 24px rgba(74, 222, 128, 0.6)) brightness(1.25)'
      : dial?.lume === 'Vintage'
      ? 'drop-shadow(0 0 12px rgba(253, 224, 71, 0.95)) drop-shadow(0 0 24px rgba(253, 224, 71, 0.6)) brightness(1.25)'
      : 'drop-shadow(0 0 12px rgba(56, 189, 248, 0.95)) drop-shadow(0 0 24px rgba(56, 189, 248, 0.6)) brightness(1.25)'
    : undefined;

  return (
    <div
      className={`flex flex-col items-center justify-center p-4 sm:p-6 rounded-2xl border shadow-2xl relative overflow-hidden backdrop-blur-md transition-colors duration-500 ${
        isLumeMode
          ? 'bg-neutral-950 border-neutral-800'
          : 'bg-slate-900/90 border-slate-800'
      }`}
    >
      {/* Background studio ambient lighting */}
      <div
        className={`absolute inset-0 pointer-events-none transition-opacity duration-500 ${
          isLumeMode
            ? 'opacity-20 bg-[radial-gradient(circle_at_center,_rgba(56,189,248,0.15)_0%,_transparent_70%)]'
            : 'opacity-100 bg-gradient-to-b from-brass-500/5 via-transparent to-sky-500/5'
        }`}
      />

      {/* Header controls bar */}
      <div className="w-full flex flex-wrap items-center justify-between gap-2 mb-4 z-10 px-1">
        <div className="flex items-center gap-2">
          {/* Mode Selector */}
          <div className="flex items-center rounded-lg bg-slate-800/90 p-0.5 border border-slate-700/80">
            <button
              onClick={() => setRenderMode('photo')}
              className={`flex items-center gap-1 px-2.5 py-1 rounded-md text-xs font-mono font-medium transition ${
                renderMode === 'photo'
                  ? 'bg-brass-500 text-slate-950 font-semibold shadow-sm'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Studio Photoreal</span>
            </button>
            <button
              onClick={() => setRenderMode('blueprint')}
              className={`flex items-center gap-1 px-2.5 py-1 rounded-md text-xs font-mono font-medium transition ${
                renderMode === 'blueprint'
                  ? 'bg-sky-500 text-slate-950 font-semibold shadow-sm'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Layers className="w-3.5 h-3.5" />
              <span>CAD Blueprint</span>
            </button>
          </div>

          {movement && (
            <span className="hidden sm:inline-flex items-center px-2 py-0.5 rounded text-xs font-mono bg-slate-800/80 text-brass-300 border border-slate-700/60">
              {movement.beatsPerSecond} Hz • {movement.movementType === 'quartz-sweeping' ? 'Sweeping Quartz' : movement.movementType === 'automatic' ? 'Mechanical' : 'Step Quartz'}
            </span>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-1.5 sm:gap-2">
          {/* Night Lume Glow Toggle */}
          <button
            onClick={() => setIsLumeMode(!isLumeMode)}
            title="Toggle Luminous Night Glow"
            className={`flex items-center gap-1 px-2.5 py-1.5 text-xs font-medium rounded-lg border transition ${
              isLumeMode
                ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40 shadow-[0_0_12px_rgba(74,222,128,0.3)]'
                : 'bg-slate-800 text-slate-300 border-slate-700 hover:bg-slate-700'
            }`}
          >
            {isLumeMode ? <Sun className="w-3.5 h-3.5 text-emerald-400" /> : <Moon className="w-3.5 h-3.5 text-sky-400" />}
            <span className="hidden sm:inline">{isLumeMode ? 'Daylight' : 'Lume Test'}</span>
          </button>

          {/* Front / Caseback Toggle */}
          <button
            onClick={() => setViewMode(prev => (prev === 'front' ? 'back' : 'front'))}
            className="flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-medium rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition"
          >
            <RotateCw className="w-3.5 h-3.5 text-slate-400" />
            <span className="hidden sm:inline">{viewMode === 'front' ? 'Caseback' : 'Dial View'}</span>
          </button>

          {/* Sweep Animation Toggle */}
          <button
            onClick={() => setIsRunning(!isRunning)}
            className={`flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-medium rounded-lg border transition ${
              isRunning
                ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30 hover:bg-emerald-500/20'
                : 'bg-slate-800 text-slate-400 border-slate-700 hover:bg-slate-700'
            }`}
          >
            {isRunning ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
            <span className="hidden sm:inline">{isRunning ? 'Running' : 'Paused'}</span>
          </button>
        </div>
      </div>

      {/* ========================================================
          CANVAS STAGE
          ======================================================== */}
      {renderMode === 'photo' ? (
        /* --------------------------------------------------------
           PHOTOREALISTIC ASSEMBLE-STYLE COMPOSITING ENGINE
           -------------------------------------------------------- */
        <div className="relative w-full max-w-[420px] aspect-[450/660] flex items-center justify-center select-none overflow-hidden my-2">
          {/* Circular Stage Pedestal Glow */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[380px] h-[380px] rounded-full bg-[radial-gradient(circle_at_center,_rgba(255,255,255,0.05)_0%,_transparent_70%)] pointer-events-none" />

          {/* LAYER 0: STRAP / BRACELET (Extends vertically behind watch case) */}
          {strap?.imageUrl ? (
            <img
              src={strap.imageUrl}
              alt={strap.name}
              className="absolute w-full h-full object-contain z-0 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 drop-shadow-[0_25px_35px_rgba(0,0,0,0.85)] pointer-events-none select-none"
            />
          ) : strap ? (
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[48%] h-[92%] bg-gradient-to-b from-slate-700 via-slate-800 to-slate-700 rounded-lg z-0 drop-shadow-2xl" />
          ) : null}

          {viewMode === 'front' ? (
            /* ----------------------------------------------------
               FRONT VIEW: Case, Dial, Bezel Insert, Hands & Glass
               ---------------------------------------------------- */
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[84%] aspect-square z-10 flex items-center justify-center">
              {/* LAYER 10: CASE */}
              {watchCase?.imageUrl ? (
                <img
                  src={watchCase.imageUrl}
                  alt={watchCase.name}
                  className="absolute inset-0 w-full h-full object-contain z-10 drop-shadow-[0_15px_30px_rgba(0,0,0,0.7)] pointer-events-none select-none"
                />
              ) : null}

              {/* LAYER 30: DIAL */}
              {dial?.imageUrl ? (
                <div
                  className="absolute inset-0 z-30 flex items-center justify-center pointer-events-none select-none transition-all duration-300"
                  style={{ filter: lumeGlowFilter }}
                >
                  <img
                    src={dial.imageUrl}
                    alt={dial.name}
                    className="w-full h-full object-contain"
                  />
                  {/* Radial depth vignette around dial edge under bezel */}
                  {!isLumeMode && (
                    <div className="absolute inset-[17%] rounded-full bg-[radial-gradient(circle,_transparent_82%,_rgba(0,0,0,0.4)_100%)] pointer-events-none" />
                  )}
                </div>
              ) : null}

              {/* LAYER 35: BEZEL INSERT (For diver & GMT cases) */}
              {watchCase?.hasRotatingBezel && bezelInsert?.imageUrl && (
                <img
                  src={bezelInsert.imageUrl}
                  alt={bezelInsert.name}
                  className="absolute inset-0 w-full h-full object-contain z-[35] pointer-events-none select-none drop-shadow-[0_4px_8px_rgba(0,0,0,0.4)]"
                />
              )}

              {/* LAYER 40: ROTATING HANDS STACK */}
              {hands?.handComponents ? (
                <div
                  className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none z-40 w-[64.9%] h-[64.9%] select-none transition-all duration-300"
                  style={{ filter: lumeGlowFilter }}
                >
                  {/* Hour Hand */}
                  {hands.handComponents.hour && (
                    <img
                      src={hands.handComponents.hour}
                      alt="Hour Hand"
                      className="h-[50%] w-auto absolute inset-0 m-auto select-none pointer-events-none drop-shadow-[0_3px_5px_rgba(0,0,0,0.55)]"
                      style={{ transform: `rotate(${hourAngle}deg)` }}
                    />
                  )}

                  {/* Minute Hand */}
                  {hands.handComponents.minute && (
                    <img
                      src={hands.handComponents.minute}
                      alt="Minute Hand"
                      className="h-[80%] w-auto absolute inset-0 m-auto select-none pointer-events-none drop-shadow-[0_4px_7px_rgba(0,0,0,0.6)]"
                      style={{ transform: `rotate(${minuteAngle}deg)` }}
                    />
                  )}

                  {/* Sweeping Second Hand */}
                  {hands.handComponents.second && (
                    <img
                      src={hands.handComponents.second}
                      alt="Second Hand"
                      className="h-[88%] w-auto absolute inset-0 m-auto select-none pointer-events-none drop-shadow-[0_4px_9px_rgba(0,0,0,0.65)]"
                      style={{
                        transform: `rotate(${secondAngle}deg)`,
                        filter: secondsAccent ? `drop-shadow(0 0 3px ${secondsAccent.colorHex})` : undefined
                      }}
                    />
                  )}

                  {/* Center Pinion Cap */}
                  <div className="absolute top-1/2 left-1/2 w-[3.5%] h-[3.5%] bg-gradient-to-tr from-neutral-400 via-neutral-100 to-neutral-400 rounded-full -translate-x-1/2 -translate-y-1/2 border border-neutral-500 z-50 shadow-sm" />
                </div>
              ) : null}

              {/* LAYER 50: SAPPHIRE CRYSTAL SPECULAR REFLECTION & AR COATING */}
              {!isLumeMode && (
                <div className="absolute inset-[16.5%] z-50 rounded-full bg-gradient-to-tr from-white/12 via-transparent to-transparent mix-blend-overlay pointer-events-none ring-1 ring-sky-400/10 shadow-[inset_0_0_20px_rgba(56,189,248,0.06)]" />
              )}

              {/* CYCLOPS DATE MAGNIFIER (Datejust & Submariner with date) */}
              {hasCyclops && !isLumeMode && (
                <div className="absolute right-[21%] top-1/2 -translate-y-1/2 w-[13%] h-[10%] rounded bg-gradient-to-tr from-white/25 via-transparent to-sky-300/10 border border-white/20 shadow-md pointer-events-none z-50 backdrop-blur-[0.5px]" />
              )}
            </div>
          ) : (
            /* ----------------------------------------------------
               CASEBACK VIEW: Exhibition Sapphire Window & Caliber
               ---------------------------------------------------- */
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[84%] aspect-square z-10 flex items-center justify-center">
              <svg viewBox="0 0 400 400" className="w-full h-full drop-shadow-[0_15px_30px_rgba(0,0,0,0.7)]">
                <defs>
                  <linearGradient id="photo-caseback-steel" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#f8fafc" />
                    <stop offset="25%" stopColor="#cbd5e1" />
                    <stop offset="50%" stopColor="#64748b" />
                    <stop offset="75%" stopColor="#cbd5e1" />
                    <stop offset="100%" stopColor="#334155" />
                  </linearGradient>
                  <radialGradient id="sapphire-caseback-sheen" cx="40%" cy="40%" r="60%">
                    <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.18" />
                    <stop offset="50%" stopColor="#ffffff" stopOpacity="0.05" />
                    <stop offset="100%" stopColor="#0f172a" stopOpacity="0.4" />
                  </radialGradient>
                </defs>

                {/* Outer 316L Brushed Steel Case Rim */}
                <circle cx="200" cy="200" r="180" fill="url(#photo-caseback-steel)" stroke="#1e293b" strokeWidth="2.5" />
                <circle cx="200" cy="200" r="150" fill="#1e293b" stroke="#334155" strokeWidth="1.5" />

                {/* Screw-down notches */}
                {[0, 60, 120, 180, 240, 300].map(deg => (
                  <rect key={deg} x="194" y="24" width="12" height="10" rx="2" fill="#09090b" transform={`rotate(${deg} 200 200)`} />
                ))}

                {/* Caseback Laser Engravings */}
                <circle cx="200" cy="200" r="144" fill="none" stroke="#475569" strokeWidth="0.8" />
                <text x="200" y="70" fill="#94a3b8" fontSize="8" fontWeight="bold" letterSpacing="1.8" textAnchor="middle" fontFamily="monospace">
                  316L SOLID STEEL • SAPPHIRE CRYSTAL • 200M/660FT
                </text>
                <text x="200" y="338" fill="#94a3b8" fontSize="8" fontWeight="bold" letterSpacing="1.8" textAnchor="middle" fontFamily="monospace">
                  {movement?.caliber ? `${movement.caliber} CALIBER • CUSTOM ASSEMBLED` : 'DIALFORGE HOROLOGY LAB'}
                </text>

                {/* Exhibition Sapphire Window */}
                <circle cx="200" cy="200" r="120" fill="#09090b" stroke="#334155" strokeWidth="2" />

                {movement?.movementType.startsWith('quartz') ? (
                  /* Quartz Caliber Module View */
                  <g id="photo-quartz-view">
                    <circle cx="200" cy="200" r="100" fill="#064e3b" stroke="#047857" strokeWidth="2" />
                    <rect x="145" y="150" width="30" height="45" rx="4" fill="#b45309" stroke="#78350f" strokeWidth="1.5" />
                    <circle cx="230" cy="195" r="34" fill="#e2e8f0" stroke="#94a3b8" strokeWidth="2" />
                    <text x="230" y="192" fill="#0f172a" fontSize="10" fontWeight="bold" textAnchor="middle" fontFamily="monospace">
                      {movement.batteryModel?.split('/')[0] || 'SR920SW'}
                    </text>
                    <text x="230" y="206" fill="#475569" fontSize="8" textAnchor="middle" fontFamily="monospace">
                      1.55V JAPAN
                    </text>
                  </g>
                ) : (
                  /* Automatic Mechanical Movement View */
                  <g id="photo-mechanical-view">
                    {/* Caliber Plate with Côtes de Genève stripes */}
                    <circle cx="200" cy="200" r="110" fill="#475569" stroke="#334155" strokeWidth="1" />
                    {[-80, -50, -20, 10, 40, 70].map(y => (
                      <line key={y} x1="100" y1={200 + y} x2="300" y2={200 + y} stroke="#64748b" strokeWidth="3" opacity="0.4" />
                    ))}

                    {/* Escapement & Rapid Beating Balance Wheel */}
                    <g transform={`rotate(${currentTime.seconds * 180} 165 170)`}>
                      <circle cx="165" cy="170" r="24" fill="none" stroke="#ca8a04" strokeWidth="3.5" />
                      <line x1="141" y1="170" x2="189" y2="170" stroke="#ca8a04" strokeWidth="2.5" />
                      <circle cx="165" cy="170" r="5" fill="#dc2626" />
                    </g>

                    {/* Synthetic Ruby Jewel Bearings */}
                    <circle cx="235" cy="160" r="5.5" fill="#e11d48" stroke="#be123c" strokeWidth="1.2" />
                    <circle cx="210" cy="235" r="4.5" fill="#e11d48" stroke="#be123c" strokeWidth="1.2" />

                    {/* Dynamic Rotating Decorated Rotor */}
                    <g transform={`rotate(${currentTime.seconds * 40} 200 200)`}>
                      <path
                        d="M 95 200 A 105 105 0 0 1 305 200 L 260 200 A 60 60 0 0 0 140 200 Z"
                        fill={
                          rotor?.finish === 'rose-gold-skeleton'
                            ? '#fb7185'
                            : rotor?.finish === 'bronze-crest'
                            ? '#ca8a04'
                            : rotor?.finish === 'black-tactical'
                            ? '#18181b'
                            : '#cbd5e1'
                        }
                        stroke={
                          rotor?.finish === 'rose-gold-skeleton'
                            ? '#e11d48'
                            : rotor?.finish === 'bronze-crest'
                            ? '#a16207'
                            : rotor?.finish === 'black-tactical'
                            ? '#3f3f46'
                            : '#94a3b8'
                        }
                        strokeWidth="2"
                        filter="drop-shadow(0 3px 6px rgba(0,0,0,0.45))"
                      />
                      {/* Rotor Center Bearing Hub */}
                      <circle cx="200" cy="200" r="16" fill="#94a3b8" stroke="#475569" strokeWidth="1.8" />
                      <circle cx="200" cy="200" r="7" fill="#f8fafc" />
                    </g>
                  </g>
                )}

                {/* Sapphire Crystal Sheen Overlay */}
                <circle cx="200" cy="200" r="120" fill="url(#sapphire-caseback-sheen)" className="pointer-events-none" />
              </svg>
            </div>
          )}
        </div>
      ) : (
        /* --------------------------------------------------------
           TECHNICAL CAD BLUEPRINT ENGINE (SVG Vector Layer)
           -------------------------------------------------------- */
        <div className="relative w-full max-w-[440px] aspect-square flex items-center justify-center select-none my-2">
          <svg viewBox="0 0 400 400" className="w-full h-full drop-shadow-[0_20px_35px_rgba(0,0,0,0.65)] overflow-visible">
            <defs>
              <linearGradient id="steel-brush-vertical" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#f8fafc" />
                <stop offset="20%" stopColor="#cbd5e1" />
                <stop offset="50%" stopColor="#94a3b8" />
                <stop offset="80%" stopColor="#cbd5e1" />
                <stop offset="100%" stopColor="#f8fafc" />
              </linearGradient>

              <linearGradient id="steel-chamfer-shine" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#ffffff" stopOpacity="0.9" />
                <stop offset="40%" stopColor="#e2e8f0" stopOpacity="0.7" />
                <stop offset="80%" stopColor="#64748b" stopOpacity="0.4" />
                <stop offset="100%" stopColor="#334155" stopOpacity="0.8" />
              </linearGradient>

              <linearGradient id="pvd-black-grad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#27272a" />
                <stop offset="40%" stopColor="#18181b" />
                <stop offset="80%" stopColor="#09090b" />
                <stop offset="100%" stopColor="#18181b" />
              </linearGradient>

              <radialGradient id="sunburst-cone-highlight" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#ffffff" stopOpacity="0.45" />
                <stop offset="35%" stopColor="#ffffff" stopOpacity="0.12" />
                <stop offset="70%" stopColor="#000000" stopOpacity="0.30" />
                <stop offset="100%" stopColor="#000000" stopOpacity="0.65" />
              </radialGradient>

              <linearGradient id="sapphire-ar-coating" x1="20%" y1="10%" x2="80%" y2="90%">
                <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.22" />
                <stop offset="18%" stopColor="#818cf8" stopOpacity="0.08" />
                <stop offset="50%" stopColor="#ffffff" stopOpacity="0.0" />
                <stop offset="85%" stopColor="#38bdf8" stopOpacity="0.10" />
                <stop offset="100%" stopColor="#ffffff" stopOpacity="0.20" />
              </linearGradient>

              <linearGradient id="crystal-glare" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#ffffff" stopOpacity="0.55" />
                <stop offset="40%" stopColor="#ffffff" stopOpacity="0.15" />
                <stop offset="80%" stopColor="#94a3b8" stopOpacity="0.25" />
                <stop offset="100%" stopColor="#38bdf8" stopOpacity="0.35" />
              </linearGradient>

              <filter id="dial-shadow" x="-10%" y="-10%" width="130%" height="130%">
                <feDropShadow dx="0" dy="4" stdDeviation="4" floodColor="#000000" floodOpacity="0.55" />
              </filter>

              <filter id="hand-shadow" x="-30%" y="-30%" width="160%" height="160%">
                <feDropShadow dx="2" dy="4" stdDeviation="2.5" floodColor="#000000" floodOpacity="0.6" />
              </filter>

              <filter id="sec-hand-shadow" x="-30%" y="-30%" width="160%" height="160%">
                <feDropShadow dx="3" dy="5" stdDeviation="2" floodColor="#000000" floodOpacity="0.45" />
              </filter>
            </defs>

            {/* STRAP */}
            {strap && (
              <g id="cad-strap-layer">
                <rect x="140" y="2" width="120" height="98" rx="4" fill="#94a3b8" />
                <rect x="142" y="4" width="34" height="94" rx="2" fill="url(#steel-brush-vertical)" stroke="#475569" strokeWidth="0.8" />
                <rect x="178" y="4" width="44" height="94" rx="2" fill="url(#steel-chamfer-shine)" stroke="#475569" strokeWidth="0.8" />
                <rect x="224" y="4" width="34" height="94" rx="2" fill="url(#steel-brush-vertical)" stroke="#475569" strokeWidth="0.8" />
                <line x1="140" y1="36" x2="260" y2="36" stroke="#334155" strokeWidth="1.2" />
                <line x1="140" y1="68" x2="260" y2="68" stroke="#334155" strokeWidth="1.2" />

                <rect x="140" y="300" width="120" height="98" rx="4" fill="#94a3b8" />
                <rect x="142" y="302" width="34" height="94" rx="2" fill="url(#steel-brush-vertical)" stroke="#475569" strokeWidth="0.8" />
                <rect x="178" y="302" width="44" height="94" rx="2" fill="url(#steel-chamfer-shine)" stroke="#475569" strokeWidth="0.8" />
                <rect x="224" y="302" width="34" height="94" rx="2" fill="url(#steel-brush-vertical)" stroke="#475569" strokeWidth="0.8" />
                <line x1="140" y1="332" x2="260" y2="332" stroke="#334155" strokeWidth="1.2" />
                <line x1="140" y1="364" x2="260" y2="364" stroke="#334155" strokeWidth="1.2" />
              </g>
            )}

            {/* WATCH CASE CAD */}
            {viewMode === 'front' ? (
              <g id="cad-front-view">
                <circle
                  cx="200"
                  cy="200"
                  r="175"
                  fill={isPvd ? 'url(#pvd-black-grad)' : 'url(#steel-brush-vertical)'}
                  stroke={isPvd ? '#09090b' : '#475569'}
                  strokeWidth="2"
                />
                <circle cx="200" cy="200" r="162" fill="none" stroke="#64748b" strokeWidth="1" strokeDasharray="3 3" />

                {/* Rotating Bezel Insert Ring */}
                {watchCase?.hasRotatingBezel && bezelInsert && (
                  <g id="cad-bezel-insert">
                    <circle cx="200" cy="200" r="158" fill={bezelInsert.color1Hex} stroke="#1e293b" strokeWidth="2" />
                    <circle cx="200" cy="200" r="130" fill="none" stroke="#f8fafc" strokeWidth="0.8" opacity="0.4" />
                    {[0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map(deg => (
                      <line
                        key={deg}
                        x1="200"
                        y1="45"
                        x2="200"
                        y2="55"
                        stroke="#f8fafc"
                        strokeWidth="1.5"
                        transform={`rotate(${deg} 200 200)`}
                      />
                    ))}
                  </g>
                )}

                {/* DIAL */}
                <circle cx="200" cy="200" r="128" fill={dialColor} filter="url(#dial-shadow)" />
                <circle cx="200" cy="200" r="126" fill="url(#sunburst-cone-highlight)" />

                {/* Dial Markers & Indices */}
                {[0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map(deg => (
                  <line
                    key={deg}
                    x1="200"
                    y1="82"
                    x2="200"
                    y2="92"
                    stroke={lumeColor}
                    strokeWidth="3"
                    strokeLinecap="round"
                    transform={`rotate(${deg} 200 200)`}
                  />
                ))}

                {/* Date Window */}
                {dial?.dateWindow === '3.0' && movement?.hasDate && (
                  <g id="cad-date-window" transform="translate(262, 193)">
                    <rect x="0" y="0" width="18" height="14" rx="2" fill="#f8fafc" stroke="#475569" strokeWidth="1" />
                    <text x="9" y="11" fill="#0f172a" fontSize="10" fontWeight="bold" textAnchor="middle" fontFamily="sans-serif">
                      15
                    </text>
                  </g>
                )}

                {/* CAD HANDS */}
                {hands && (
                  <g id="cad-hands">
                    {/* Hour Hand */}
                    <g transform={`rotate(${hourAngle} 200 200)`} filter="url(#hand-shadow)">
                      <rect x="196" y="125" width="8" height="80" rx="3" fill="#f8fafc" stroke="#334155" strokeWidth="1.2" />
                      <rect x="198" y="130" width="4" height="65" rx="2" fill={lumeColor} />
                    </g>

                    {/* Minute Hand */}
                    <g transform={`rotate(${minuteAngle} 200 200)`} filter="url(#hand-shadow)">
                      <rect x="197" y="90" width="6" height="115" rx="2" fill="#f8fafc" stroke="#334155" strokeWidth="1.2" />
                      <rect x="198.5" y="95" width="3" height="100" rx="1.5" fill={lumeColor} />
                    </g>

                    {/* Seconds Hand */}
                    <g transform={`rotate(${secondAngle} 200 200)`} filter="url(#sec-hand-shadow)">
                      <line x1="200" y1="230" x2="200" y2="80" stroke={secHandColor} strokeWidth="1.5" />
                      <circle cx="200" cy="115" r="4" fill={lumeColor} stroke={secHandColor} strokeWidth="1.2" />
                    </g>

                    {/* Center Pinion */}
                    <circle cx="200" cy="200" r="5" fill="#f8fafc" stroke="#334155" strokeWidth="1" />
                  </g>
                )}

                {/* Cyclops Lens */}
                {hasCyclops && (
                  <rect
                    x="258"
                    y="186"
                    width="26"
                    height="26"
                    rx="6"
                    fill="url(#crystal-glare)"
                    stroke="#ffffff"
                    strokeWidth="1.2"
                  />
                )}

                {/* Sapphire Sheen */}
                <circle cx="200" cy="200" r="128" fill="url(#sapphire-ar-coating)" className="pointer-events-none" />
              </g>
            ) : (
              /* CAD CASEBACK */
              <g id="cad-back-view">
                <circle cx="200" cy="200" r="175" fill="url(#steel-brush-vertical)" stroke="#334155" strokeWidth="2" />
                <circle cx="200" cy="200" r="120" fill="#09090b" stroke="#334155" strokeWidth="2" />
                <g transform={`rotate(${currentTime.seconds * 30} 200 200)`}>
                  <path
                    d="M 105 200 A 95 95 0 0 1 295 200 L 255 200 A 55 55 0 0 0 145 200 Z"
                    fill={rotor?.finish === 'rose-gold-skeleton' ? '#fb7185' : '#cbd5e1'}
                    stroke="#475569"
                    strokeWidth="1.5"
                  />
                  <circle cx="200" cy="200" r="14" fill="#94a3b8" />
                </g>
              </g>
            )}
          </svg>
        </div>
      )}

      {/* Footer Specs Bar */}
      <div className="w-full mt-3 pt-3 border-t border-slate-800 flex flex-wrap items-center justify-between gap-2 text-xs text-slate-400 font-mono">
        <div className="flex flex-wrap items-center gap-2">
          <span>Case: {watchCase?.name ? watchCase.name.split(' ')[0] : 'Sub'} ({watchCase?.outerDiameterMm || 40}mm)</span>
          <span>•</span>
          <span>Lug: {watchCase?.lugWidthMm || 20}mm</span>
          <span>•</span>
          <span>Dial: {dial?.texture ? dial.texture.toUpperCase() : 'STANDARD'}</span>
          <span>•</span>
          <span>Lume: {dial?.lume || 'BGW9'}</span>
        </div>

        <div className="flex items-center gap-1.5 text-slate-300">
          <Eye className="w-3.5 h-3.5 text-brass-400" />
          <span>{viewMode === 'front' ? 'Dial & Bezel View' : 'Exhibition Caseback'}</span>
        </div>
      </div>
    </div>
  );
};
