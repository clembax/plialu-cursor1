import { useState, type ReactNode } from 'react';

type LeadTextProps = {
  lead: ReactNode;
  rest?: ReactNode;
  tone: 'light' | 'dark';
  className: string;
};

export function LeadText({ lead, rest, tone, className }: LeadTextProps) {
  const [open, setOpen] = useState(false);
  const hasRest = rest != null && rest !== false && rest !== '';
  const buttonColor = tone === 'dark' ? 'text-white/70' : 'text-[#0E2A33]/70';

  return (
    <p className={className}>
      {lead}
      {hasRest ? <span className={open ? undefined : 'max-md:hidden'}>{rest}</span> : null}
      {hasRest ? '\u00A0' : null}
      {hasRest ? (
        <button
          type="button"
          className={`inline align-baseline text-[0.85em] font-medium underline underline-offset-4 md:hidden ${buttonColor}`}
          aria-expanded={open}
          onClick={() => setOpen((current) => !current)}
        >
          {open ? 'Réduire' : 'Lire la suite'}
        </button>
      ) : null}
    </p>
  );
}
