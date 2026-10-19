import React, { useState, useEffect } from 'react';
import {
  Zap,
  Timer,
  ChevronRight,
  ExternalLink,
  Tag,
  Truck,
  Heart,
  Star,
} from 'lucide-react';
import { useAffiliate } from '../context/AffiliateContext';
import { Deal } from '../types';
import { STORES_DATA } from '../data/stores';
import { KnovaSeal } from './KnovaBadges';

export const FlashDealsSection: React.FC = () => {
  const {
    deals,
    setSelectedDealForModal,
    copyCoupon,
    favorites,
    toggleFavorite,
  } = useAffiliate();

  const flashDeals = deals.filter((d) => d.isFlashDeal);

  const [timeLeft, setTimeLeft] = useState({
    hours: 4,
    minutes: 38,
    seconds: 22,
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        } else if (prev.hours > 0) {
          return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        } else {
          return { hours: 6, minutes: 0, seconds: 0 };
        }
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatMoney = (val: number) => {
    return val.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
  };

  if (flashDeals.length === 0) return null;

  return (
    <section className="px-4 py-3">
      <div className="max-w-7xl mx-auto">
        <div className="bg-[#FFD6E7] rounded-3xl p-5 sm:p-7 border-3 border-[#000000] shadow-[6px_6px_0px_#000000] relative">
          <div className="washi-tape-pink" />

          {/* Header Row */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 pb-4 border-b-2 border-black/20">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-[#FFD93B] border-2 border-black flex items-center justify-center text-black shadow-[2.5px_2.5px_0px_#000000]">
                <Zap className="w-6 h-6 fill-[#00CDBA] stroke-black stroke-[2]" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h2 className="text-xl sm:text-2xl font-black tracking-tight text-black uppercase font-montserrat">
                    ACHADINHOS RELÂMPAGO
                  </h2>
                  <span className="bg-[#FF4D8D] text-white border border-black text-[10px] font-black px-2 py-0.5 rounded-full uppercase shadow-[1px_1px_0px_#000]">
                    ESTOQUE LIMITADO
                  </span>
                </div>
                <p className="text-xs font-bold text-slate-800">
                  "Eu garimpo. Você recebe." Pechinchas com preços no chão por tempo limitado!
                </p>
              </div>
            </div>

            {/* Countdown Clock Box */}
            <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-2xl border-2 border-black shadow-[3px_3px_0px_#000000] self-start sm:self-auto">
              <Timer className="w-4 h-4 text-black stroke-[2.5]" />
              <span className="text-xs text-black font-extrabold mr-1 uppercase">Termina em:</span>
              <div className="flex items-center gap-1 font-mono font-black text-sm">
                <span className="bg-[#FFD93B] text-black px-2 py-0.5 rounded border border-black">
                  {String(timeLeft.hours).padStart(2, '0')}h
                </span>
                <span className="text-black font-black">:</span>
                <span className="bg-[#FFD93B] text-black px-2 py-0.5 rounded border border-black">
                  {String(timeLeft.minutes).padStart(2, '0')}m
                </span>
                <span className="text-black font-black">:</span>
                <span className="bg-[#00CDBA] text-black px-2 py-0.5 rounded border border-black">
                  {String(timeLeft.seconds).padStart(2, '0')}s
                </span>
              </div>
            </div>
          </div>

          {/* Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {flashDeals.slice(0, 4).map((deal: Deal) => {
              const isFav = favorites.includes(deal.id);
              const store = STORES_DATA[deal.store];

              return (
                <div
                  key={deal.id}
                  className="bg-white rounded-3xl p-4 text-black border-2.5 border-[#000000] shadow-[4px_4px_0px_#000000] flex flex-col justify-between group hover:shadow-[6px_6px_0px_#00CDBA] transition-all relative"
                >
                  {/* Top Badges */}
                  <div className="flex items-center justify-between gap-1 mb-2">
                    <span className="bg-[#FFD93B] text-black border-2 border-black text-xs font-black px-2 py-0.5 rounded-lg shadow-[1.5px_1.5px_0px_#000]">
                      -{deal.discountPercentage}% OFF
                    </span>

                    <button
                      onClick={() => toggleFavorite(deal.id)}
                      className={`p-1.5 rounded-full border border-black transition-colors ${
                        isFav ? 'bg-[#FF4D8D] text-white' : 'bg-[#FFFDF9] hover:bg-[#FFD6E7] text-black'
                      }`}
                    >
                      <Heart className={`w-3.5 h-3.5 ${isFav ? 'fill-white stroke-black' : 'stroke-[2.5]'}`} />
                    </button>
                  </div>

                  {/* Image Cutout */}
                  <div
                    onClick={() => setSelectedDealForModal(deal)}
                    className="relative w-full aspect-square rounded-2xl overflow-hidden bg-[#FFFDF9] p-3 mb-3 cursor-pointer border-2 border-black shadow-[2px_2px_0px_#000] flex items-center justify-center"
                  >
                    <img
                      src={deal.imageUrl}
                      alt={deal.title}
                      loading="lazy"
                      className="max-h-full max-w-full object-contain group-hover:scale-108 transition-transform duration-300"
                    />

                    {deal.seal && (
                      <div className="absolute top-2 right-2 scale-80 origin-top-right">
                        <KnovaSeal type={deal.seal} size="sm" />
                      </div>
                    )}

                    <div className="absolute bottom-2 left-2 bg-[#00CDBA] border border-black px-2 py-0.5 rounded text-[9px] font-black text-black">
                      {store ? store.name : deal.storeName}
                    </div>
                  </div>

                  {/* Title */}
                  <h3
                    onClick={() => setSelectedDealForModal(deal)}
                    className="text-xs sm:text-sm font-bold text-black line-clamp-2 hover:text-[#FF4D8D] transition-colors mb-2 cursor-pointer h-10 leading-snug"
                    title={deal.title}
                  >
                    {deal.title}
                  </h3>

                  {/* Price */}
                  <div className="mb-2 space-y-0.5">
                    <div className="flex items-center gap-1.5">
                      <span className="text-xs text-slate-400 line-through font-semibold">
                        {formatMoney(deal.priceOld)}
                      </span>
                      {deal.isFreeShipping && (
                        <span className="text-[9px] text-black bg-[#FFD6E7] border border-black font-black px-1.5 rounded">
                          Frete Grátis
                        </span>
                      )}
                    </div>
                    <div className="text-xl font-black text-black">
                      {formatMoney(deal.priceCurrent)}
                    </div>
                  </div>

                  {/* Progress Claimed */}
                  <div className="space-y-1 mb-3">
                    <div className="flex items-center justify-between text-[10px] text-black font-extrabold">
                      <span>Garimpado: {deal.claimedPercentage || 88}%</span>
                      <span className="text-[#FF4D8D] font-black">Quase esgotado!</span>
                    </div>
                    <div className="w-full bg-slate-200 h-2 rounded-full border border-black overflow-hidden">
                      <div
                        className="bg-[#00CDBA] h-full rounded-full transition-all"
                        style={{ width: `${deal.claimedPercentage || 88}%` }}
                      />
                    </div>
                  </div>

                  {/* CTA Buttons */}
                  <div className="grid grid-cols-2 gap-2 pt-1 border-t-2 border-black/10">
                    <button
                      onClick={() => setSelectedDealForModal(deal)}
                      className="w-full py-2 px-2 rounded-xl text-xs font-black text-black bg-white hover:bg-slate-100 border-2 border-black shadow-[2px_2px_0px_#000] flex items-center justify-center gap-1"
                    >
                      <span>Ver Dicas</span>
                    </button>

                    <a
                      href={deal.affiliateUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full py-2 px-2 rounded-xl text-xs font-black text-white bg-[#FF4D8D] hover:bg-[#ff337b] border-2 border-black shadow-[2px_2px_0px_#000] flex items-center justify-center gap-1"
                    >
                      <span>PEGAR</span>
                      <ExternalLink className="w-3 h-3 stroke-[3]" />
                    </a>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
