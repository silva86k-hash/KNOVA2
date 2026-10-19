import React from 'react';
import { useAffiliate } from '../context/AffiliateContext';

export const Toast: React.FC = () => {
  const { toastMessage } = useAffiliate();

  if (!toastMessage) return null;

  return (
    <div className="fixed bottom-20 md:bottom-6 right-4 z-50 max-w-sm pointer-events-none animate-bounce">
      <div className="bg-[#FFD93B] text-black px-4 py-3 rounded-2xl shadow-[4px_4px_0px_#000000] border-2 border-black flex items-center gap-3">
        <div className="w-8 h-8 rounded-full bg-[#00CDBA] text-black border-2 border-black flex items-center justify-center shrink-0 font-black text-sm">
          ♥
        </div>
        <p className="text-xs font-black uppercase tracking-wide">{toastMessage}</p>
      </div>
    </div>
  );
};
