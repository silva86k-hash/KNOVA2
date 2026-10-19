import React from 'react';
import {
  Heart,
  Zap,
  Tag,
  MessageCircle,
} from 'lucide-react';
import { useAffiliate } from '../context/AffiliateContext';

export const MobileBottomNav: React.FC = () => {
  const {
    activeTab,
    setActiveTab,
    setSelectedCategory,
    favorites,
    setIsFavoritesDrawerOpen,
    settings,
  } = useAffiliate();

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 bg-white border-t-2 border-black py-2 px-3 md:hidden shadow-[0px_-2px_10px_rgba(0,0,0,0.08)]">
      <div className="flex items-center justify-around">
        <button
          onClick={() => {
            setActiveTab('todas');
            setSelectedCategory('todas');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className={`flex flex-col items-center gap-0.5 text-[10px] font-black uppercase transition-colors ${
            activeTab === 'todas'
              ? 'text-[#FF4D8D]'
              : 'text-black hover:text-[#00CDBA]'
          }`}
        >
          <span className="text-lg leading-none">♥</span>
          <span>Início</span>
        </button>

        <button
          onClick={() => {
            setActiveTab('relampago');
            const el = document.getElementById('deals-section');
            el?.scrollIntoView({ behavior: 'smooth' });
          }}
          className={`flex flex-col items-center gap-0.5 text-[10px] font-black uppercase transition-colors ${
            activeTab === 'relampago'
              ? 'text-[#FF4D8D]'
              : 'text-black hover:text-[#00CDBA]'
          }`}
        >
          <Zap className={`w-4 h-4 ${activeTab === 'relampago' ? 'fill-[#FFD93B]' : ''} stroke-[2.5]`} />
          <span>Relâmpago</span>
        </button>

        <button
          onClick={() => {
            setActiveTab('cupons');
            const el = document.getElementById('cupons-section') || document.getElementById('deals-section');
            el?.scrollIntoView({ behavior: 'smooth' });
          }}
          className={`flex flex-col items-center gap-0.5 text-[10px] font-black uppercase transition-colors ${
            activeTab === 'cupons'
              ? 'text-[#FF4D8D]'
              : 'text-black hover:text-[#00CDBA]'
          }`}
        >
          <Tag className={`w-4 h-4 ${activeTab === 'cupons' ? 'fill-[#00CDBA]' : ''} stroke-[2.5]`} />
          <span>Cupons</span>
        </button>

        <button
          onClick={() => setIsFavoritesDrawerOpen(true)}
          className="relative flex flex-col items-center gap-0.5 text-[10px] font-black uppercase text-black hover:text-[#FF4D8D] transition-colors"
        >
          <Heart className="w-4 h-4 stroke-[2.5]" />
          <span>Salvos</span>
          {favorites.length > 0 && (
            <span className="absolute -top-1 right-2 bg-[#FF4D8D] text-white border border-black text-[9px] font-black w-4 h-4 rounded-full flex items-center justify-center">
              {favorites.length}
            </span>
          )}
        </button>

        <a
          href={settings.whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-col items-center gap-0.5 text-[10px] font-black uppercase text-[#00CDBA] hover:text-black transition-colors"
        >
          <MessageCircle className="w-4 h-4 fill-[#00CDBA] text-black stroke-[2]" />
          <span>Canal VIP</span>
        </a>
      </div>
    </nav>
  );
};
