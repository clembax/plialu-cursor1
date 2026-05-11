import React, { useEffect, useState } from 'react';

interface CookieBannerProps {
  onOpenPrivacy?: () => void;
}

const CookieBanner: React.FC<CookieBannerProps> = ({ onOpenPrivacy }) => {
  const [showBanner, setShowBanner] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem('cookieConsent');
    if (!consent) {
      setShowBanner(true);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem('cookieConsent', JSON.stringify({
      status: 'accepted',
      date: new Date().toISOString(),
      version: '1.0'
    }));
    setShowBanner(false);
  };

  const handleReject = () => {
    localStorage.setItem('cookieConsent', JSON.stringify({
      status: 'rejected',
      date: new Date().toISOString(),
      version: '1.0'
    }));
    setShowBanner(false);
  };

  if (!showBanner) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-[45] bg-[#0E2A33] border-t border-white/10 px-4 sm:px-6 lg:px-8 py-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
          <div className="flex-1">
            <p className="text-sm text-white/80 leading-relaxed">
              Nous utilisons des cookies pour améliorer votre expérience. En continuant, vous acceptez notre{' '}
              <button
                onClick={onOpenPrivacy}
                className="text-[#E2FD48] hover:underline transition-colors font-medium"
              >
                politique de confidentialité
              </button>
              .
            </p>
          </div>
          <div className="flex gap-3 flex-shrink-0">
            <button
              onClick={handleReject}
              className="px-6 py-3 bg-white/10 text-white rounded-full text-sm font-semibold hover:bg-white/20 transition-colors whitespace-nowrap"
            >
              Refuser
            </button>
            <button
              onClick={handleAccept}
              className="px-6 py-3 bg-[#E2FD48] text-[#0E2A33] rounded-full text-sm font-semibold hover:bg-[#E2FD48]/90 transition-colors whitespace-nowrap"
            >
              Accepter
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CookieBanner;
