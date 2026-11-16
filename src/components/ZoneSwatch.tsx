import React from 'react';
import type { ZoneId } from '../data/zones';

export const ZoneSwatch: React.FC<{ kind: ZoneId }> = ({ kind }) => {
  const coords = [5, 12, 19];
  return (
    <span className="flex w-9 shrink-0 items-center">
      <svg viewBox="0 0 24 24" className="h-6 w-6" aria-hidden="true">
        {coords.flatMap((cy) => coords.map((cx) => {
          if (kind === 'main') {
            return <circle key={`${cx}-${cy}`} cx={cx} cy={cy} r={cx === 12 && cy === 12 ? 2.6 : 2.1} fill="#E2FD48" />;
          }
          if (kind === 'secondary') {
            return <circle key={`${cx}-${cy}`} cx={cx} cy={cy} r={1.9} fill="#E2FD48" fillOpacity={0.55} />;
          }
          const east = cx === 19;
          return <circle key={`${cx}-${cy}`} cx={cx} cy={cy} r={1.9} fill={east ? '#7fb8c4' : '#ffffff'} fillOpacity={east ? 0.9 : 0.4} />;
        }))}
      </svg>
    </span>
  );
};
