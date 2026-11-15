import React, { useState, useEffect, useRef } from 'react';
import type { WatchBuild } from '../types/watch';
import { Play, Pause, RotateCw, Sparkles, Eye } from 'lucide-react';

interface WatchCanvasProps {
  build: WatchBuild;
}

export const WatchCanvas: React.FC<WatchCanvasProps> = ({ build }) => {
  const [isRunning, setIsRunning] = useState<boolean>(true);
  const [viewMode, setViewMode] = useState<'front' | 'back'>('front');
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
    spacer,
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

    const beatsPerSec = movement?.beatsPerSecond || 6; // 6 for NH35, 4 for VH31, 1 for quartz
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
  const gmtAngle = ((currentTime.hours + 4) % 24) * 15; // 24-hr hand

  // Dial aesthetic color
  const dialColor = dial?.colorHex || '#18181b';
  const lumeColor = dial?.lume === 'C3' ? '#4ade80' : dial?.lume === 'Vintage' ? '#fde047' : '#38bdf8'; // BGW9 default

  // Seconds hand color
  const secHandColor = secondsAccent ? secondsAccent.colorHex : (hands?.finish === 'gold' ? '#eab308' : '#ef4444');

  return (
    <div className="flex flex-col items-center justify-center p-6 bg-slate-900/80 rounded-2xl border border-slate-800 shadow-2xl relative overflow-hidden">
      {/* Background radial glow */}
      <div className="absolute inset-0 bg-gradient-to-b from-brass-500/5 via-transparent to-sky-500/5 pointer-events-none" />

      {/* Header controls */}
      <div className="w-full flex items-center justify-between mb-4 z-10 px-2">
        <div className="flex items-center gap-2">
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-mono font-medium bg-slate-800 border border-slate-700 text-slate-300">
            <Sparkles className="w-3.5 h-3.5 text-brass-400" />
            2D Interactive Canvas
          </span>
          {movement && (
            <span className="hidden sm:inline-flex items-center px-2 py-0.5 rounded text-xs font-mono bg-slate-800/80 text-brass-300 border border-slate-700/60">
              {movement.beatsPerSecond} Hz {movement.movementType === 'quartz-sweeping' ? 'Smooth Sweep' : movement.movementType === 'automatic' ? 'Mechanical Sweep' : 'Quartz Tick'}
            </span>
          )}
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setViewMode(prev => prev === 'front' ? 'back' : 'front')}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition"
          >
            <RotateCw className="w-3.5 h-3.5 text-slate-400" />
            {viewMode === 'front' ? 'View Caseback' : 'View Dial'}
          </button>

          <button
            onClick={() => setIsRunning(!isRunning)}
            className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg border transition ${
              isRunning
                ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30 hover:bg-emerald-500/20'
                : 'bg-slate-800 text-slate-400 border-slate-700 hover:bg-slate-700'
            }`}
          >
            {isRunning ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
            {isRunning ? 'Ticking' : 'Paused'}
          </button>
        </div>
      </div>

      {/* The Master SVG Canvas */}
      <div className="relative w-full max-w-[420px] aspect-square flex items-center justify-center select-none">
        <svg
          viewBox="0 0 400 400"
          className="w-full h-full drop-shadow-2xl overflow-visible"
        >
          <defs>
            {/* Metal finishes */}
            <linearGradient id="steel-case-grad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#f1f5f9" />
              <stop offset="35%" stopColor="#cbd5e1" />
              <stop offset="70%" stopColor="#64748b" />
              <stop offset="100%" stopColor="#94a3b8" />
            </linearGradient>

            <linearGradient id="crystal-glare" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#ffffff" stopOpacity="0.22" />
              <stop offset="30%" stopColor="#38bdf8" stopOpacity="0.08" />
              <stop offset="60%" stopColor="#ffffff" stopOpacity="0.0" />
              <stop offset="100%" stopColor="#ffffff" stopOpacity="0.12" />
            </linearGradient>

            <radialGradient id="sunburst-sheen" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#ffffff" stopOpacity="0.30" />
              <stop offset="45%" stopColor="#ffffff" stopOpacity="0.08" />
              <stop offset="100%" stopColor="#000000" stopOpacity="0.55" />
            </radialGradient>

            <radialGradient id="balance-wheel-grad" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#fde047" />
              <stop offset="70%" stopColor="#ca8a04" />
              <stop offset="100%" stopColor="#854d0e" />
            </radialGradient>
          </defs>

          {/* ========================================================
              LAYER 0: STRAP / BRACELET (Drawn behind case)
              ======================================================== */}
          {strap && (
            <g id="strap-layer">
              {/* Top strap segment */}
              {strap.strapType === 'oyster-steel' && (
                <g>
                  <rect x="140" y="5" width="120" height="95" rx="4" fill="#94a3b8" />
                  <rect x="142" y="8" width="34" height="90" rx="3" fill="#cbd5e1" stroke="#64748b" strokeWidth="0.8" />
                  <rect x="180" y="8" width="40" height="90" rx="3" fill="#e2e8f0" stroke="#64748b" strokeWidth="0.8" />
                  <rect x="224" y="8" width="34" height="90" rx="3" fill="#cbd5e1" stroke="#64748b" strokeWidth="0.8" />
                  <line x1="140" y1="35" x2="260" y2="35" stroke="#475569" strokeWidth="1" />
                  <line x1="140" y1="65" x2="260" y2="65" stroke="#475569" strokeWidth="1" />
                </g>
              )}

              {strap.strapType === 'jubilee-steel' && (
                <g>
                  <rect x="140" y="5" width="120" height="95" rx="4" fill="#94a3b8" />
                  <rect x="142" y="8" width="22" height="90" fill="#94a3b8" stroke="#475569" strokeWidth="0.6" />
                  <rect x="166" y="8" width="22" height="90" fill="#f8fafc" stroke="#64748b" strokeWidth="0.6" />
                  <rect x="190" y="8" width="20" height="90" fill="#f1f5f9" stroke="#64748b" strokeWidth="0.6" />
                  <rect x="212" y="8" width="22" height="90" fill="#f8fafc" stroke="#64748b" strokeWidth="0.6" />
                  <rect x="236" y="8" width="22" height="90" fill="#94a3b8" stroke="#475569" strokeWidth="0.6" />
                  <line x1="140" y1="28" x2="260" y2="28" stroke="#475569" strokeWidth="0.8" />
                  <line x1="140" y1="52" x2="260" y2="52" stroke="#475569" strokeWidth="0.8" />
                  <line x1="140" y1="76" x2="260" y2="76" stroke="#475569" strokeWidth="0.8" />
                </g>
              )}

              {strap.strapType === 'vintage-leather' && (
                <g>
                  <rect x="144" y="5" width="112" height="95" rx="5" fill="#78350f" stroke="#451a03" strokeWidth="1.2" />
                  <path d="M 150 15 Q 200 12 250 15" stroke="#92400e" strokeWidth="0.8" fill="none" />
                  <line x1="156" y1="78" x2="170" y2="78" stroke="#fef3c7" strokeWidth="2" strokeLinecap="round" />
                  <line x1="230" y1="78" x2="244" y2="78" stroke="#fef3c7" strokeWidth="2" strokeLinecap="round" />
                </g>
              )}

              {strap.strapType === 'nato-nylon' && (
                <g>
                  <rect x="145" y="0" width="110" height="105" fill="#18181b" />
                  <rect x="165" y="0" width="15" height="105" fill="#64748b" />
                  <rect x="220" y="0" width="15" height="105" fill="#64748b" />
                  <rect x="140" y="25" width="120" height="8" rx="2" fill="none" stroke="#cbd5e1" strokeWidth="2.5" />
                </g>
              )}

              {strap.strapType === 'fkm-rubber' && (
                <g>
                  <rect x="145" y="5" width="110" height="95" rx="6" fill="#09090b" stroke="#27272a" strokeWidth="1" />
                  <line x1="145" y1="25" x2="255" y2="25" stroke="#27272a" strokeWidth="2" />
                  <line x1="145" y1="45" x2="255" y2="45" stroke="#27272a" strokeWidth="2" />
                  <line x1="145" y1="65" x2="255" y2="65" stroke="#27272a" strokeWidth="2" />
                  <line x1="145" y1="85" x2="255" y2="85" stroke="#27272a" strokeWidth="2" />
                </g>
              )}

              {/* Bottom strap segment */}
              {strap.strapType === 'oyster-steel' && (
                <g>
                  <rect x="140" y="300" width="120" height="95" rx="4" fill="#94a3b8" />
                  <rect x="142" y="302" width="34" height="90" rx="3" fill="#cbd5e1" stroke="#64748b" strokeWidth="0.8" />
                  <rect x="180" y="302" width="40" height="90" rx="3" fill="#e2e8f0" stroke="#64748b" strokeWidth="0.8" />
                  <rect x="224" y="302" width="34" height="90" rx="3" fill="#cbd5e1" stroke="#64748b" strokeWidth="0.8" />
                  <line x1="140" y1="335" x2="260" y2="335" stroke="#475569" strokeWidth="1" />
                  <line x1="140" y1="365" x2="260" y2="365" stroke="#475569" strokeWidth="1" />
                </g>
              )}

              {strap.strapType === 'jubilee-steel' && (
                <g>
                  <rect x="140" y="300" width="120" height="95" rx="4" fill="#94a3b8" />
                  <rect x="142" y="302" width="22" height="90" fill="#94a3b8" stroke="#475569" strokeWidth="0.6" />
                  <rect x="166" y="302" width="22" height="90" fill="#f8fafc" stroke="#64748b" strokeWidth="0.6" />
                  <rect x="190" y="302" width="20" height="90" fill="#f1f5f9" stroke="#64748b" strokeWidth="0.6" />
                  <rect x="212" y="302" width="22" height="90" fill="#f8fafc" stroke="#64748b" strokeWidth="0.6" />
                  <rect x="236" y="302" width="22" height="90" fill="#94a3b8" stroke="#475569" strokeWidth="0.6" />
                  <line x1="140" y1="325" x2="260" y2="325" stroke="#475569" strokeWidth="0.8" />
                  <line x1="140" y1="350" x2="260" y2="350" stroke="#475569" strokeWidth="0.8" />
                  <line x1="140" y1="375" x2="260" y2="375" stroke="#475569" strokeWidth="0.8" />
                </g>
              )}

              {strap.strapType === 'vintage-leather' && (
                <g>
                  <rect x="144" y="300" width="112" height="95" rx="5" fill="#78350f" stroke="#451a03" strokeWidth="1.2" />
                  <line x1="156" y1="320" x2="170" y2="320" stroke="#fef3c7" strokeWidth="2" strokeLinecap="round" />
                  <line x1="230" y1="320" x2="244" y2="320" stroke="#fef3c7" strokeWidth="2" strokeLinecap="round" />
                </g>
              )}

              {strap.strapType === 'nato-nylon' && (
                <g>
                  <rect x="145" y="295" width="110" height="105" fill="#18181b" />
                  <rect x="165" y="295" width="15" height="105" fill="#64748b" />
                  <rect x="220" y="295" width="15" height="105" fill="#64748b" />
                </g>
              )}

              {strap.strapType === 'fkm-rubber' && (
                <g>
                  <rect x="145" y="300" width="110" height="95" rx="6" fill="#09090b" stroke="#27272a" strokeWidth="1" />
                  <line x1="145" y1="315" x2="255" y2="315" stroke="#27272a" strokeWidth="2" />
                  <line x1="145" y1="335" x2="255" y2="335" stroke="#27272a" strokeWidth="2" />
                  <line x1="145" y1="355" x2="255" y2="355" stroke="#27272a" strokeWidth="2" />
                </g>
              )}
            </g>
          )}

          {/* ========================================================
              FRONT VIEW MODE
              ======================================================== */}
          {viewMode === 'front' ? (
            <g id="front-view">
              {/* --- 1. CASE BODY --- */}
              <path
                d="M 140 100 
                   Q 135 60 148 55 
                   L 165 58 
                   L 168 95 
                   A 135 135 0 0 1 232 95 
                   L 235 58 
                   L 252 55 
                   Q 265 60 260 100
                   A 140 140 0 0 1 260 300
                   Q 265 340 252 345
                   L 235 342
                   L 232 305
                   A 135 135 0 0 1 168 305
                   L 165 342
                   L 148 345
                   Q 135 340 140 300
                   A 140 140 0 0 1 140 100 Z"
                fill="url(#steel-case-grad)"
                stroke="#64748b"
                strokeWidth="1.5"
                filter="drop-shadow(0px 8px 16px rgba(0,0,0,0.45))"
              />

              {/* Crown */}
              {watchCase?.crownPosition === '3.8' ? (
                <g transform="rotate(24 200 200)">
                  <rect x="338" y="192" width="16" height="16" rx="2" fill="#94a3b8" stroke="#475569" strokeWidth="1" />
                  <line x1="342" y1="192" x2="342" y2="208" stroke="#475569" strokeWidth="0.8" />
                  <line x1="346" y1="192" x2="346" y2="208" stroke="#475569" strokeWidth="0.8" />
                  <line x1="350" y1="192" x2="350" y2="208" stroke="#475569" strokeWidth="0.8" />
                </g>
              ) : (
                <g>
                  <path d="M 325 180 Q 338 185 342 191 L 342 209 Q 338 215 325 220 Z" fill="#94a3b8" />
                  <rect x="340" y="190" width="18" height="20" rx="3" fill="#cbd5e1" stroke="#475569" strokeWidth="1" />
                  <line x1="344" y1="190" x2="344" y2="210" stroke="#64748b" strokeWidth="1" />
                  <line x1="348" y1="190" x2="348" y2="210" stroke="#64748b" strokeWidth="1" />
                  <line x1="352" y1="190" x2="352" y2="210" stroke="#64748b" strokeWidth="1" />
                </g>
              )}

              {/* --- 2. BEZEL --- */}
              {watchCase?.hasRotatingBezel ? (
                <g id="diver-rotating-bezel">
                  <circle cx="200" cy="200" r="140" fill="#94a3b8" stroke="#475569" strokeWidth="1" />
                  {[...Array(60)].map((_, i) => (
                    <line
                      key={i}
                      x1="200"
                      y1="60"
                      x2="200"
                      y2="63"
                      stroke="#475569"
                      strokeWidth="1.2"
                      transform={`rotate(${i * 6} 200 200)`}
                    />
                  ))}

                  {bezelInsert ? (
                    <g>
                      {bezelInsert.color2Hex ? (
                        <g>
                          <path
                            d="M 64 200 A 136 136 0 0 1 336 200 L 308 200 A 108 108 0 0 0 92 200 Z"
                            fill={bezelInsert.color1Hex}
                          />
                          <path
                            d="M 64 200 A 136 136 0 0 0 336 200 L 308 200 A 108 108 0 0 1 92 200 Z"
                            fill={bezelInsert.color2Hex}
                          />
                          {[
                            { num: '24', rot: 0 },
                            { num: '2', rot: 30 },
                            { num: '4', rot: 60 },
                            { num: '6', rot: 90 },
                            { num: '8', rot: 120 },
                            { num: '10', rot: 150 },
                            { num: '12', rot: 180 },
                            { num: '14', rot: 210 },
                            { num: '16', rot: 240 },
                            { num: '18', rot: 270 },
                            { num: '20', rot: 300 },
                            { num: '22', rot: 330 },
                          ].map(marker => (
                            <text
                              key={marker.num}
                              x="200"
                              y="77"
                              fill="#f8fafc"
                              fontSize="11"
                              fontWeight="bold"
                              fontFamily="system-ui"
                              textAnchor="middle"
                              transform={`rotate(${marker.rot} 200 200)`}
                            >
                              {marker.num}
                            </text>
                          ))}
                        </g>
                      ) : (
                        <g>
                          <circle cx="200" cy="200" r="136" fill={bezelInsert.color1Hex} stroke="#09090b" strokeWidth="0.5" />
                          <circle cx="200" cy="200" r="108" fill="#18181b" />
                          {[10, 20, 30, 40, 50].map(m => (
                            <text
                              key={m}
                              x="200"
                              y="78"
                              fill="#ffffff"
                              fontSize="12"
                              fontWeight="bold"
                              fontFamily="system-ui"
                              textAnchor="middle"
                              transform={`rotate(${m * 6} 200 200)`}
                            >
                              {m}
                            </text>
                          ))}
                          {[...Array(15)].map((_, i) => (
                            <line
                              key={i}
                              x1="200"
                              y1="65"
                              x2="200"
                              y2="71"
                              stroke="#ffffff"
                              strokeWidth="1.2"
                              transform={`rotate(${i * 6} 200 200)`}
                            />
                          ))}
                          <polygon points="194,66 206,66 200,75" fill="#f8fafc" />
                          <circle cx="200" cy="71" r="2.5" fill={lumeColor} />
                        </g>
                      )}
                    </g>
                  ) : (
                    <circle cx="200" cy="200" r="136" fill="#334155" stroke="#475569" strokeWidth="1" strokeDasharray="4 2" />
                  )}
                </g>
              ) : (
                <circle cx="200" cy="200" r="135" fill="none" stroke="url(#steel-case-grad)" strokeWidth="18" />
              )}

              {/* --- 3. REHAUT / CHAPTER RING --- */}
              <circle cx="200" cy="200" r="108" fill="none" stroke="#334155" strokeWidth="2.5" />
              {[...Array(60)].map((_, i) => (
                <line
                  key={i}
                  x1="200"
                  y1="93"
                  x2="200"
                  y2={i % 5 === 0 ? "97" : "95"}
                  stroke="#94a3b8"
                  strokeWidth={i % 5 === 0 ? "1.2" : "0.7"}
                  transform={`rotate(${i * 6} 200 200)`}
                />
              ))}

              {/* --- 4. DIAL FACE --- */}
              {dial ? (
                <g id="dial-layer">
                  <circle cx="200" cy="200" r="105" fill={dialColor} />
                  {dial.texture === 'sunburst' && (
                    <circle cx="200" cy="200" r="105" fill="url(#sunburst-sheen)" />
                  )}

                  {/* Date Window at 3:00 */}
                  {dial.dateWindow === '3.0' && (
                    <g transform="translate(262, 191)">
                      <rect x="0" y="0" width="22" height="18" rx="2" fill="#0f172a" stroke="#cbd5e1" strokeWidth="1" />
                      {movement?.hasDate ? (
                        <text x="11" y="13" fill="#f8fafc" fontSize="11" fontWeight="bold" fontFamily="monospace" textAnchor="middle">
                          14
                        </text>
                      ) : (
                        <rect x="2" y="2" width="18" height="14" fill="#64748b" />
                      )}
                    </g>
                  )}

                  {/* Indices Styles */}
                  {dial.indicesStyle === 'dots-and-batons' && (
                    <g id="diver-indices">
                      <polygon points="193,108 207,108 200,123" fill={lumeColor} stroke="#cbd5e1" strokeWidth="1" />
                      <rect x="196" y="270" width="8" height="16" rx="2" fill={lumeColor} stroke="#cbd5e1" strokeWidth="1" />
                      <rect x="105" y="196" width="16" height="8" rx="2" fill={lumeColor} stroke="#cbd5e1" strokeWidth="1" />
                      {dial.dateWindow !== '3.0' && (
                        <rect x="279" y="196" width="16" height="8" rx="2" fill={lumeColor} stroke="#cbd5e1" strokeWidth="1" />
                      )}
                      {[30, 60, 120, 150, 210, 240, 300, 330].map(deg => (
                        <circle
                          key={deg}
                          cx="200"
                          cy="114"
                          r="5.5"
                          fill={lumeColor}
                          stroke="#cbd5e1"
                          strokeWidth="1"
                          transform={`rotate(${deg} 200 200)`}
                        />
                      ))}
                    </g>
                  )}

                  {dial.indicesStyle === 'explorer-369' && (
                    <g id="explorer-indices">
                      <polygon points="193,108 207,108 200,123" fill={lumeColor} stroke="#cbd5e1" strokeWidth="1" />
                      {dial.dateWindow !== '3.0' && (
                        <text x="282" y="206" fill="#f8fafc" fontSize="18" fontWeight="bold" fontFamily="system-ui" textAnchor="middle">
                          3
                        </text>
                      )}
                      <text x="200" y="286" fill="#f8fafc" fontSize="18" fontWeight="bold" fontFamily="system-ui" textAnchor="middle">
                        6
                      </text>
                      <text x="118" y="206" fill="#f8fafc" fontSize="18" fontWeight="bold" fontFamily="system-ui" textAnchor="middle">
                        9
                      </text>
                      {[30, 60, 120, 150, 210, 240, 300, 330].map(deg => (
                        <rect
                          key={deg}
                          x="197"
                          y="108"
                          width="6"
                          height="14"
                          rx="1"
                          fill={lumeColor}
                          stroke="#cbd5e1"
                          strokeWidth="0.8"
                          transform={`rotate(${deg} 200 200)`}
                        />
                      ))}
                    </g>
                  )}

                  {dial.indicesStyle === 'field-arabic' && (
                    <g id="field-indices">
                      {[
                        { n: 12, r: 0 }, { n: 1, r: 30 }, { n: 2, r: 60 },
                        { n: 3, r: 90 }, { n: 4, r: 120 }, { n: 5, r: 150 },
                        { n: 6, r: 180 }, { n: 7, r: 210 }, { n: 8, r: 240 },
                        { n: 9, r: 270 }, { n: 10, r: 300 }, { n: 11, r: 330 }
                      ].map(item => {
                        if (item.n === 3 && dial.dateWindow === '3.0') return null;
                        return (
                          <text
                            key={item.n}
                            x="200"
                            y="122"
                            fill={lumeColor}
                            fontSize="13"
                            fontWeight="bold"
                            fontFamily="monospace"
                            textAnchor="middle"
                            transform={`rotate(${item.r} 200 200)`}
                          >
                            {item.n}
                          </text>
                        );
                      })}
                    </g>
                  )}

                  {/* Brand / Custom Text on Dial */}
                  <text x="200" y="160" fill="#94a3b8" fontSize="8" fontWeight="bold" letterSpacing="1.8" textAnchor="middle" fontFamily="sans-serif">
                    DIALFORGE
                  </text>
                  <text x="200" y="248" fill="#64748b" fontSize="6.5" letterSpacing="1.2" textAnchor="middle" fontFamily="monospace">
                    {movement?.caliber ? `${movement.caliber} • ${watchCase?.waterResistanceM || 100}M` : 'CUSTOM BUILD'}
                  </text>
                </g>
              ) : (
                <circle cx="200" cy="200" r="105" fill="#1e293b" stroke="#334155" strokeWidth="1" strokeDasharray="4 2" />
              )}

              {/* --- 5. GMT HAND (If NH34) --- */}
              {movement?.hasGmt && hands?.handHoleSizes.gmt && (
                <g id="gmt-hand" transform={`rotate(${gmtAngle} 200 200)`}>
                  <line x1="200" y1="200" x2="200" y2="100" stroke="#dc2626" strokeWidth="1.5" />
                  <polygon points="196,104 204,104 200,92" fill="#dc2626" stroke="#f87171" strokeWidth="0.8" />
                  <circle cx="200" cy="100" r="1.5" fill={lumeColor} />
                </g>
              )}

              {/* --- 6. HOUR & MINUTE HANDS --- */}
              {hands && (
                <g id="hands-layer">
                  {/* HOUR HAND */}
                  <g transform={`rotate(${hourAngle} 200 200)`}>
                    {hands.handsStyle === 'mercedes' ? (
                      <g>
                        <line x1="200" y1="200" x2="200" y2="148" stroke="#cbd5e1" strokeWidth="3" strokeLinecap="round" />
                        <circle cx="200" cy="150" r="6.5" fill="#cbd5e1" />
                        <circle cx="200" cy="150" r="4.8" fill={lumeColor} />
                        <line x1="200" y1="150" x2="200" y2="145" stroke="#cbd5e1" strokeWidth="0.8" />
                        <line x1="200" y1="150" x2="196" y2="153" stroke="#cbd5e1" strokeWidth="0.8" />
                        <line x1="200" y1="150" x2="204" y2="153" stroke="#cbd5e1" strokeWidth="0.8" />
                        <polygon points="198,144 202,144 200,138" fill="#cbd5e1" />
                      </g>
                    ) : hands.handsStyle === 'snowflake' ? (
                      <g>
                        <line x1="200" y1="200" x2="200" y2="142" stroke="#cbd5e1" strokeWidth="3.5" />
                        <rect x="194" y="148" width="12" height="12" fill="#cbd5e1" rx="1" transform="rotate(45 200 154)" />
                        <rect x="195.5" y="149.5" width="9" height="9" fill={lumeColor} rx="0.5" transform="rotate(45 200 154)" />
                      </g>
                    ) : hands.handsStyle === 'sword' ? (
                      <g>
                        <polygon points="196,195 204,195 203,142 200,134 197,142" fill="#cbd5e1" stroke="#64748b" strokeWidth="0.8" />
                        <polygon points="197.5,190 202.5,190 201.8,144 200,138 198.2,144" fill={lumeColor} />
                      </g>
                    ) : (
                      <g>
                        <rect x="197.5" y="140" width="5" height="60" rx="1" fill="#cbd5e1" stroke="#64748b" strokeWidth="0.8" />
                        <rect x="198.5" y="145" width="3" height="46" rx="0.5" fill={lumeColor} />
                      </g>
                    )}
                  </g>

                  {/* MINUTE HAND */}
                  <g transform={`rotate(${minuteAngle} 200 200)`}>
                    {hands.handsStyle === 'snowflake' ? (
                      <g>
                        <rect x="198" y="110" width="4" height="90" rx="1" fill="#cbd5e1" stroke="#64748b" strokeWidth="0.8" />
                        <rect x="199" y="118" width="2" height="74" fill={lumeColor} />
                      </g>
                    ) : hands.handsStyle === 'sword' ? (
                      <g>
                        <polygon points="197,195 203,195 202,112 200,105 198,112" fill="#cbd5e1" stroke="#64748b" strokeWidth="0.8" />
                        <polygon points="198.2,190 201.8,190 201.2,115 200,109 198.8,115" fill={lumeColor} />
                      </g>
                    ) : (
                      <g>
                        <polygon points="197.5,195 202.5,195 202,115 200,107 198,115" fill="#cbd5e1" stroke="#64748b" strokeWidth="0.8" />
                        <rect x="198.5" y="122" width="3" height="65" rx="0.5" fill={lumeColor} />
                      </g>
                    )}
                  </g>

                  {/* --- 7. SECONDS HAND --- */}
                  <g transform={`rotate(${secondAngle} 200 200)`}>
                    {secondsAccent?.accentStyle === 'lightning' ? (
                      <g>
                        <path
                          d="M 200 220 
                             L 200 180 
                             L 196 160 
                             L 203 155 
                             L 197 130 
                             L 204 125 
                             L 200 98"
                          fill="none"
                          stroke={secHandColor}
                          strokeWidth="2.4"
                          strokeLinecap="round"
                        />
                        <circle cx="200" cy="220" r="3" fill={secHandColor} />
                      </g>
                    ) : (
                      <g>
                        <line x1="200" y1="225" x2="200" y2="98" stroke={secHandColor} strokeWidth="1" />
                        <circle cx="200" cy="216" r="3.5" fill={secHandColor} />
                        <circle cx="200" cy="120" r="3" fill={lumeColor} stroke={secHandColor} strokeWidth="1" />
                        <line x1="200" y1="110" x2="200" y2="98" stroke={secHandColor} strokeWidth="1.8" />
                      </g>
                    )}
                  </g>

                  {/* Center pinion cap */}
                  <circle cx="200" cy="200" r="4.2" fill="#cbd5e1" stroke="#475569" strokeWidth="1" />
                  <circle cx="200" cy="200" r="1.5" fill="#1e293b" />
                </g>
              )}

              {/* --- 8. SAPPHIRE CRYSTAL GLARE OVERLAY --- */}
              <circle
                cx="200"
                cy="200"
                r="108"
                fill="url(#crystal-glare)"
                className="pointer-events-none"
              />
            </g>
          ) : (
            /* ========================================================
               CASEBACK / MOVEMENT EXHIBITION VIEW MODE
               ======================================================== */
            <g id="back-view">
              <circle cx="200" cy="200" r="140" fill="url(#steel-case-grad)" stroke="#475569" strokeWidth="2" />
              {[0, 60, 120, 180, 240, 300].map(deg => (
                <rect
                  key={deg}
                  x="196"
                  y="62"
                  width="8"
                  height="7"
                  rx="1"
                  fill="#334155"
                  transform={`rotate(${deg} 200 200)`}
                />
              ))}

              <circle cx="200" cy="200" r="126" fill="none" stroke="#64748b" strokeWidth="0.8" />
              <text x="200" y="85" fill="#64748b" fontSize="7.5" fontWeight="bold" letterSpacing="1.5" textAnchor="middle" fontFamily="monospace">
                STAINLESS STEEL • SAPPHIRE CRYSTAL • 200M WATER RESISTANT
              </text>
              <text x="200" y="322" fill="#64748b" fontSize="7.5" fontWeight="bold" letterSpacing="1.5" textAnchor="middle" fontFamily="monospace">
                {movement?.caliber ? `${movement.caliber} CALIBER • CUSTOM CRAFTED` : 'DIALFORGE WATCHBUILDER'}
              </text>

              {watchCase?.casebackType === 'solid' ? (
                <g>
                  <circle cx="200" cy="200" r="105" fill="#334155" stroke="#475569" strokeWidth="2" />
                  <circle cx="200" cy="200" r="85" fill="none" stroke="#64748b" strokeWidth="1" strokeDasharray="6 3" />
                  <path d="M 175 190 Q 200 160 225 190 T 200 225 Z" fill="#94a3b8" />
                  <text x="200" y="215" fill="#cbd5e1" fontSize="10" fontWeight="bold" textAnchor="middle" fontFamily="monospace">
                    SOLID STEEL
                  </text>
                </g>
              ) : (
                <g id="exhibition-window">
                  <circle cx="200" cy="200" r="105" fill="#09090b" stroke="#334155" strokeWidth="2" />

                  {movement?.movementType.startsWith('quartz') ? (
                    <g id="quartz-movement-view">
                      {spacer ? (
                        <circle cx="200" cy="200" r="100" fill="none" stroke="#10b981" strokeWidth="10" strokeDasharray="4 2" />
                      ) : (
                        <circle cx="200" cy="200" r="100" fill="none" stroke="#ef4444" strokeWidth="10" strokeDasharray="2 2" />
                      )}

                      <circle cx="200" cy="200" r="82" fill="#064e3b" stroke="#047857" strokeWidth="1.5" />
                      <rect x="155" y="160" width="22" height="36" rx="3" fill="#b45309" stroke="#78350f" strokeWidth="1" />
                      <line x1="155" y1="168" x2="177" y2="168" stroke="#d97706" strokeWidth="1" />
                      <line x1="155" y1="176" x2="177" y2="176" stroke="#d97706" strokeWidth="1" />
                      <line x1="155" y1="184" x2="177" y2="184" stroke="#d97706" strokeWidth="1" />

                      <circle cx="225" cy="195" r="28" fill="#e2e8f0" stroke="#94a3b8" strokeWidth="2" />
                      <text x="225" y="192" fill="#0f172a" fontSize="8" fontWeight="bold" textAnchor="middle" fontFamily="monospace">
                        {movement.batteryModel?.split('/')[0] || 'SR920SW'}
                      </text>
                      <text x="225" y="204" fill="#475569" fontSize="7" textAnchor="middle" fontFamily="monospace">
                        1.55V JAPAN
                      </text>

                      <rect x="180" y="215" width="24" height="18" fill="#18181b" stroke="#3f3f46" strokeWidth="1" />
                      <text x="192" y="227" fill="#10b981" fontSize="7" textAnchor="middle" fontFamily="monospace">
                        TMI
                      </text>
                    </g>
                  ) : (
                    <g id="automatic-movement-view">
                      <circle cx="200" cy="200" r="95" fill="#475569" stroke="#334155" strokeWidth="1" />

                      <g transform={`rotate(${currentTime.seconds * 180} 165 170)`}>
                        <circle cx="165" cy="170" r="22" fill="none" stroke="url(#balance-wheel-grad)" strokeWidth="3" />
                        <line x1="143" y1="170" x2="187" y2="170" stroke="#ca8a04" strokeWidth="2" />
                        <line x1="165" y1="148" x2="165" y2="192" stroke="#ca8a04" strokeWidth="2" />
                        <circle cx="165" cy="170" r="4" fill="#dc2626" />
                      </g>

                      <circle cx="225" cy="160" r="4.5" fill="#e11d48" stroke="#be123c" strokeWidth="1" />
                      <circle cx="240" cy="205" r="4.5" fill="#e11d48" stroke="#be123c" strokeWidth="1" />
                      <circle cx="200" cy="200" r="30" fill="none" stroke="#d97706" strokeWidth="1" strokeDasharray="3 2" />

                      <g transform={`rotate(${currentTime.seconds * 30} 200 200)`}>
                        {rotor?.finish === 'rose-gold-skeleton' ? (
                          <path
                            d="M 110 200 A 90 90 0 0 1 290 200 L 250 200 A 50 50 0 0 0 150 200 Z"
                            fill="#fb7185"
                            stroke="#f43f5e"
                            strokeWidth="1.5"
                            filter="drop-shadow(0px 2px 4px rgba(0,0,0,0.5))"
                          />
                        ) : rotor?.finish === 'cotes-de-geneve' ? (
                          <g>
                            <path
                              d="M 110 200 A 90 90 0 0 1 290 200 L 250 200 A 50 50 0 0 0 150 200 Z"
                              fill="#334155"
                              stroke="#64748b"
                              strokeWidth="1.5"
                            />
                            {[...Array(9)].map((_, i) => (
                              <line key={i} x1={130 + i * 16} y1="130" x2={140 + i * 16} y2="198" stroke="#475569" strokeWidth="1.2" />
                            ))}
                          </g>
                        ) : (
                          <path
                            d="M 110 200 A 90 90 0 0 1 290 200 L 250 200 A 50 50 0 0 0 150 200 Z"
                            fill="#cbd5e1"
                            stroke="#94a3b8"
                            strokeWidth="1.5"
                          />
                        )}
                        <circle cx="200" cy="200" r="14" fill="#94a3b8" stroke="#475569" strokeWidth="1.5" />
                        <circle cx="200" cy="200" r="6" fill="#f8fafc" />
                      </g>
                    </g>
                  )}
                </g>
              )}
            </g>
          )}
        </svg>
      </div>

      {/* Footer Details */}
      <div className="w-full mt-4 pt-3 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400 font-mono">
        <div className="flex items-center gap-2">
          <span>Case: {watchCase?.outerDiameterMm || 40}mm</span>
          <span>•</span>
          <span>Lug: {watchCase?.lugWidthMm || 20}mm</span>
          <span>•</span>
          <span>Dial: {dial?.diameterMm || 28.5}mm</span>
        </div>

        <div className="flex items-center gap-1.5 text-slate-300">
          <Eye className="w-3.5 h-3.5 text-brass-400" />
          <span>{viewMode === 'front' ? 'Dial & Bezel View' : 'Caseback & Movement View'}</span>
        </div>
      </div>
    </div>
  );
};
