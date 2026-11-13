import { useEffect, useState } from 'react';

const CONSENT_KEY = 'cookieConsent';
const CONSENT_VERSION = '2';
const CONSENT_MAX_AGE_MS = 182 * 24 * 60 * 60 * 1000;
const GA_MEASUREMENT_ID = 'G-KCC6S7JGMB';

export type ConsentStatus = 'accepted' | 'rejected';

interface StoredConsent {
  status?: unknown;
  date?: unknown;
  version?: unknown;
}

let analyticsLoaded = false;

function isConsentStatus(value: unknown): value is ConsentStatus {
  return value === 'accepted' || value === 'rejected';
}

export function getConsent(): ConsentStatus | null {
  try {
    const raw = localStorage.getItem(CONSENT_KEY);
    if (!raw) return null;
    const parsed: unknown = JSON.parse(raw);
    if (!parsed || typeof parsed !== 'object') return null;
    const record = parsed as StoredConsent;
    if (!isConsentStatus(record.status)) return null;
    if (record.version !== CONSENT_VERSION) return null;
    if (typeof record.date !== 'string') return null;
    const time = Date.parse(record.date);
    if (Number.isNaN(time)) return null;
    if (Date.now() - time > CONSENT_MAX_AGE_MS) return null;
    return record.status;
  } catch {
    return null;
  }
}

export function setConsent(status: ConsentStatus): void {
  const stored: StoredConsent = {
    status,
    date: new Date().toISOString(),
    version: CONSENT_VERSION,
  };
  localStorage.setItem(CONSENT_KEY, JSON.stringify(stored));
  window.dispatchEvent(new Event('plialu:consent'));
}

export function isAnalyticsLoaded(): boolean {
  return analyticsLoaded;
}

export function loadAnalytics(): void {
  if (analyticsLoaded) return;
  analyticsLoaded = true;

  const config = document.createElement('script');
  config.src = '/ga.js';
  config.async = false;
  document.head.appendChild(config);

  const loader = document.createElement('script');
  loader.async = true;
  loader.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`;
  document.head.appendChild(loader);
}

function expireCookie(name: string, domain?: string): void {
  const domainPart = domain ? `; domain=${domain}` : '';
  const secure = window.location.protocol === 'https:' ? '; Secure' : '';
  document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; Max-Age=0; path=/${domainPart}${secure}`;
}

export function withdrawAnalytics(): void {
  (window as unknown as Record<string, boolean>)[`ga-disable-${GA_MEASUREMENT_ID}`] = true;

  const names = document.cookie
    .split(';')
    .map((part) => part.split('=')[0]?.trim() ?? '')
    .filter((name) => name.startsWith('_ga'));

  const domains = [...new Set(['plialu.fr', '.plialu.fr', window.location.hostname])];
  for (const name of names) {
    for (const domain of domains) expireCookie(name, domain);
    expireCookie(name);
  }
}

export function openCookieSettings(): void {
  window.dispatchEvent(new Event('plialu:open-cookies'));
}

export function useConsent(): ConsentStatus | null {
  const [status, setStatus] = useState<ConsentStatus | null>(getConsent);

  useEffect(() => {
    const sync = () => setStatus(getConsent());
    window.addEventListener('plialu:consent', sync);
    return () => window.removeEventListener('plialu:consent', sync);
  }, []);

  return status;
}
