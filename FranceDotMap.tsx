import React, { useEffect, useMemo, useState } from 'react';
import { decodeDots, FRANCE_DOT_MAP, type DotClass } from './franceDotMapData';

const DOT_STYLE: Record<DotClass, { radius: number; stroke: string; opacity: number }> = {
  b: { radius: 0.15, stroke: '#ffffff', opacity: 0.3 },
  e: { radius: 0.15, stroke: '#7fb8c4', opacity: 0.5 },
  x: { radius: 0.19, stroke: '#E2FD48', opacity: 0.5 },
  y: { radius: 0.24, stroke: '#E2FD48', opacity: 0.78 },
  p: { radius: 0.2, stroke: '#E2FD48', opacity: 0.6 },
  q: { radius: 0.25, stroke: '#E2FD48', opacity: 0.85 },
  r: { radius: 0.3, stroke: '#E2FD48', opacity: 1 },
};

const DOT_ORDER: DotClass[] = ['b', 'e', 'x', 'y', 'p', 'q', 'r'];

export type ZoneHighlight = 'main' | 'secondary' | 'delivery';

const HIGHLIGHT_CLASSES: Record<ZoneHighlight, readonly DotClass[]> = {
  main: ['p', 'q', 'r'],
  secondary: ['x', 'y'],
  delivery: ['b', 'e'],
};

const place = (x: number, y: number) => ({
  left: `${(x / 108) * 100}%`,
  top: `${y}%`,
});

const reticle = (x: number, y: number, ring: number, tick: number) =>
  [
    `M${x} ${y - ring}V${y - ring - tick}`,
    `M${x} ${y + ring}V${y + ring + tick}`,
    `M${x - ring} ${y}H${x - ring - tick}`,
    `M${x + ring} ${y}H${x + ring + tick}`,
  ].join('');

const FranceDotMap: React.FC<{ className?: string; highlight?: ZoneHighlight | null }> = ({ className, highlight = null }) => {
  const [reduceMotion, setReduceMotion] = useState(false);
  const paths = useMemo(() => {
    const grouped: Record<DotClass, string> = { b: '', e: '', x: '', y: '', p: '', q: '', r: '' };
    for (const dot of decodeDots()) {
      grouped[dot.c] += `M${dot.x.toFixed(2)} ${dot.y.toFixed(2)}h0`;
    }
    return grouped;
  }, []);

  useEffect(() => {
    setReduceMotion(window.matchMedia('(prefers-reduced-motion: reduce)').matches);
  }, []);

  const { hubs, arcs, labels, scale, outline } = FRANCE_DOT_MAP;

  return (
    <div className={`relative aspect-[108/100] ${className ?? ''}`}>
      <svg
        viewBox={FRANCE_DOT_MAP.viewBox}
        className="absolute inset-0 h-full w-full"
        role="img"
        aria-label="Carte de la France, de la Corse, de la Belgique et de la Suisse, centrée sur Lyon"
      >
        <title>Zone d'intervention PLIALU</title>
        <path d={FRANCE_DOT_MAP.graticule} fill="none" stroke="#fff" strokeOpacity=".09" strokeWidth=".07" />
        <path d={outline.fr} fill="none" stroke="#fff" strokeOpacity=".28" strokeWidth=".1" strokeLinejoin="round" />
        <path d={outline.be} fill="none" stroke="#7fb8c4" strokeOpacity=".5" strokeWidth=".1" />
        <path d={outline.ch} fill="none" stroke="#7fb8c4" strokeOpacity=".5" strokeWidth=".1" />
        {DOT_ORDER.map((dotClass) => {
          const style = DOT_STYLE[dotClass];
          const dimmed = highlight != null && !HIGHLIGHT_CLASSES[highlight].includes(dotClass);
          return (
            <path
              key={dotClass}
              d={paths[dotClass]}
              fill="none"
              stroke={style.stroke}
              strokeOpacity={style.opacity}
              strokeLinecap="round"
              strokeWidth={style.radius * 2}
              className="transition-opacity duration-300 motion-reduce:transition-none"
              style={dimmed ? { opacity: 0.25 } : undefined}
            />
          );
        })}
        {([arcs.paris, arcs.marseille] as const).map((arc) => (
          <g key={arc}>
            <path d={arc} fill="none" stroke="#E2FD48" strokeOpacity=".55" strokeWidth=".14" />
            <path
              d={arc}
              fill="none"
              stroke="#E2FD48"
              pathLength={100}
              strokeWidth=".42"
              strokeLinecap="round"
              strokeDasharray="5 95"
              strokeDashoffset="5"
            >
              {!reduceMotion && (
                <>
                  <animate attributeName="stroke-dashoffset" values="5;-100" dur="4.5s" repeatCount="indefinite" />
                  <animate attributeName="stroke-opacity" values="0;1;1;0" keyTimes="0;.12;.85;1" dur="4.5s" repeatCount="indefinite" />
                </>
              )}
            </path>
          </g>
        ))}
        {!reduceMotion && (
          <circle cx={hubs.lyon[0]} cy={hubs.lyon[1]} r={2} fill="none" stroke="#E2FD48" strokeWidth=".14">
            <animate attributeName="r" values="2;5.2" dur="3.2s" repeatCount="indefinite" />
            <animate attributeName="stroke-opacity" values=".7;0" dur="3.2s" repeatCount="indefinite" />
          </circle>
        )}
        {(
          [
            { id: 'lyon', point: hubs.lyon, core: 0.8, ring: 2, tick: 1.1 },
            { id: 'paris', point: hubs.paris, core: 0.6, ring: 1.5, tick: 0.9 },
            { id: 'marseille', point: hubs.marseille, core: 0.6, ring: 1.5, tick: 0.9 },
          ] as const
        ).map((hub) => (
          <g key={hub.id}>
            <circle cx={hub.point[0]} cy={hub.point[1]} r={hub.ring} fill="none" stroke="#E2FD48" strokeOpacity=".85" strokeWidth=".14" />
            <path d={reticle(hub.point[0], hub.point[1], hub.ring, hub.tick)} fill="none" stroke="#E2FD48" strokeOpacity=".85" strokeWidth=".14" />
            <circle cx={hub.point[0]} cy={hub.point[1]} r={hub.core} fill="#E2FD48" />
          </g>
        ))}
        <path d={`M8 93.2V94H${8 + scale.len}V93.2`} fill="none" stroke="#fff" strokeOpacity=".55" strokeWidth=".14" />
        {['M3 3H7V7', 'M105 3H101V7', 'M3 97H7V93', 'M105 97H101V93'].map((corner) => (
          <path key={corner} d={corner} fill="none" stroke="#fff" strokeOpacity=".3" strokeWidth=".14" />
        ))}
      </svg>
      <div className="pointer-events-none absolute inset-0 select-none">
        <div className="absolute flex items-center whitespace-nowrap" style={{ ...place(hubs.lyon[0], hubs.lyon[1]), transform: 'translate(14px,-50%)' }}>
          <span className="block h-px w-4 bg-white/45" />
          <span className="block rounded-md border border-[#E2FD48]/60 bg-[#071318] px-2.5 py-1 text-[13px] font-semibold leading-tight text-white md:text-sm">Lyon</span>
        </div>
        <div className="absolute flex flex-row-reverse items-center whitespace-nowrap" style={{ ...place(hubs.paris[0], hubs.paris[1]), transform: 'translate(calc(-100% - 14px),-50%)' }}>
          <span className="block h-px w-4 bg-white/45" />
          <span className="block rounded-md border border-white/20 bg-[#071318] px-2.5 py-1 text-[13px] font-semibold leading-tight text-white md:text-sm">Paris</span>
        </div>
        <div className="absolute flex items-center whitespace-nowrap" style={{ ...place(hubs.marseille[0], hubs.marseille[1]), transform: 'translate(14px,-50%)' }}>
          <span className="block h-px w-4 bg-white/45" />
          <span className="block rounded-md border border-white/20 bg-[#071318] px-2.5 py-1 text-[13px] font-semibold leading-tight text-white md:text-sm">Marseille</span>
        </div>
        <span className="absolute hidden whitespace-nowrap text-xs font-medium text-[#9fd0da] sm:block" style={{ ...place(labels.belgique[0], labels.belgique[1]), transform: 'translate(-50%,-50%)' }}>
          Belgique
        </span>
        <span className="absolute hidden whitespace-nowrap text-xs font-medium text-[#9fd0da] sm:block" style={{ ...place(labels.suisse[0] + 0.8, labels.suisse[1]), transform: 'translate(0,-50%)' }}>
          Suisse
        </span>
        <span className="absolute hidden whitespace-nowrap text-xs font-medium text-white/75 sm:block" style={{ ...place(labels.corse[0] - 1, labels.corse[1]), transform: 'translate(0,-50%)' }}>
          Corse
        </span>
        <span className="absolute whitespace-nowrap text-xs text-white/70" style={{ left: `${(8 / 108) * 100}%`, top: '95.4%' }}>
          {`${scale.km} km`}
        </span>
      </div>
    </div>
  );
};

export default FranceDotMap;
