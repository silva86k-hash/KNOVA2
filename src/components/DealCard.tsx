import React, { useState } from 'react';
import {
  Heart,
  Share2,
  Tag,
  Truck,
  Check,
  ChevronRight,
  ExternalLink,
  Copy,
  Star,
} from 'lucide-react';
import { useAffiliate } from '../context/AffiliateContext';
import { Deal } from '../types';
import { STORES_DATA } from '../data/stores';
import { KnovaSeal } from './KnovaBadges';

interface DealCardProps {
  deal: Deal;
  isCompactList?: boolean;
}

export const DealCard: React.FC<DealCardProps> = ({ deal, isCompactList = false }) => {
  const {
    favorites,
    toggleFavorite,
    likedDeals,
    toggleLike,
    copyCoupon,
    setSelectedDealForModal,
    copyLinkToClipboard,
  } = useAffiliate();

  const [shareActive, setShareActive] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);

  const isFav = favorites.includes(deal.id);
  const isLiked = likedDeals[deal.id];
  const store = STORES_DATA[deal.store];

  const formatMoney = (val: number) => {
    return val.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
  };

  const handleShareWhatsApp = (e: React.MouseEvent) => {
    e.stopPropagation();
    const text = encodeURIComponent(
      `♥ *Olha o achadinho que a KNOVA garimpou!*\n\n*${deal.title}*\n💰 De ${formatMoney(deal.priceOld)} por apenas *${formatMoney(deal.priceCurrent)}* (-${deal.discountPercentage}% OFF)\n${deal.couponCode ? `🏷️ Cupom: *${deal.couponCode}*\n` : ''}👉 Pegar agora: ${deal.affiliateUrl}`
    );
    window.open(`https://api.whatsapp.com/send?text=${text}`, '_blank');
    setShareActive(false);
  };

  const handleCopyLink = (e: React.MouseEvent) => {
    e.stopPropagation();
    copyLinkToClipboard(deal.affiliateUrl, 'Link do achadinho');
    setCopiedLink(true);
    setTimeout(() => {
      setCopiedLink(false);
      setShareActive(false);
    }, 1500);
  };

  if (isCompactList) {
    return (
      <div className="bg-[#FFFDF9] rounded-2xl p-3 sm:p-4 border-2 border-[#000000] shadow-[3.5px_3.5px_0px_#000000] hover:shadow-[5px_5px_0px_#00CDBA] transition-all flex flex-col sm:flex-row items-center gap-4 group relative">
        <div
          onClick={() => setSelectedDealForModal(deal)}
          className="w-24 h-24 sm:w-28 sm:h-28 rounded-xl bg-white p-2 shrink-0 flex items-center justify-center cursor-pointer border-2 border-[#000000] shadow-[2px_2px_0px_#000000] group-hover:scale-102 transition-transform relative"
        >
          <img
            src={deal.imageUrl}
            alt={deal.title}
            loading="lazy"
            className="max-h-full max-w-full object-contain"
          />
        </div>

        <div className="flex-1 min-w-0 space-y-1 w-full">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-[10px] font-black px-2 py-0.5 rounded-full bg-[#00CDBA] text-black border border-black uppercase">
              {store ? store.name : deal.storeName}
            </span>
            <span className="bg-[#FFD93B] text-black border border-black text-[10px] font-black px-1.5 py-0.2 rounded">
              -{deal.discountPercentage}%
            </span>
            {deal.isFreeShipping && (
              <span className="text-[10px] text-black bg-[#FFD6E7] border border-black font-extrabold px-1.5 py-0.2 rounded flex items-center gap-0.5">
                <Truck className="w-2.5 h-2.5" /> Frete Grátis
              </span>
            )}
          </div>

          <h3
            onClick={() => setSelectedDealForModal(deal)}
            className="text-xs sm:text-sm font-bold text-black truncate hover:text-[#FF4D8D] transition-colors cursor-pointer"
          >
            {deal.title}
          </h3>

          <div className="flex items-baseline gap-2">
            <span className="text-xs text-slate-400 line-through">
              {formatMoney(deal.priceOld)}
            </span>
            <span className="text-base sm:text-lg font-black text-[#000000]">
              {formatMoney(deal.priceCurrent)}
            </span>
            {deal.installmentText && (
              <span className="text-[11px] text-slate-600 hidden md:inline truncate">
                • {deal.installmentText}
              </span>
            )}
          </div>
        </div>

        <div className="flex sm:flex-col items-center gap-2 w-full sm:w-auto shrink-0 pt-2 sm:pt-0 border-t sm:border-t-0 border-black/10">
          <a
            href={deal.affiliateUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 sm:flex-initial bg-[#FF4D8D] hover:bg-[#ff337b] text-white font-black text-xs px-4 py-2 rounded-xl border-2 border-black shadow-[2px_2px_0px_#000000] flex items-center justify-center gap-1.5 transition-transform hover:-translate-y-0.5"
          >
            <span>PEGAR</span>
            <ExternalLink className="w-3.5 h-3.5 stroke-[3]" />
          </a>
        </div>
      </div>
    );
  }

  // Standard Sticker Scrapbook Card
  return (
    <div className="bg-[#FFFDF9] rounded-3xl p-4 border-2.5 border-[#000000] shadow-[4px_4px_0px_#000000] hover:shadow-[6px_6px_0px_#00CDBA] hover:-translate-y-1 transition-all duration-200 flex flex-col justify-between group relative">
      {/* Top Header: Badge, Seal & Heart */}
      <div>
        <div className="flex items-center justify-between gap-1 mb-2">
          {/* Yellow discount tag */}
          <span className="bg-[#FFD93B] text-[#000000] border-2 border-[#000000] text-xs font-black px-2 py-0.5 rounded-lg flex items-center gap-1 shadow-[1.5px_1.5px_0px_#000000]">
            -{deal.discountPercentage}% OFF
          </span>

          <div className="flex items-center gap-1.5">
            {/* Share Menu */}
            <div className="relative">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setShareActive(!shareActive);
                }}
                className="p-1.5 rounded-full bg-white border border-black hover:bg-[#FFD6E7] text-black transition-colors"
                title="Compartilhar"
              >
                <Share2 className="w-3.5 h-3.5 stroke-[2.5]" />
              </button>

              {shareActive && (
                <div className="absolute right-0 top-8 z-30 bg-white rounded-xl shadow-[3px_3px_0px_#000000] border-2 border-black p-2 min-w-[140px] space-y-1">
                  <button
                    onClick={handleShareWhatsApp}
                    className="w-full text-left px-2 py-1.5 rounded-lg text-xs font-bold text-black hover:bg-[#FFD6E7]"
                  >
                    <span>WhatsApp</span>
                  </button>
                  <button
                    onClick={handleCopyLink}
                    className="w-full text-left px-2 py-1.5 rounded-lg text-xs font-bold text-black hover:bg-slate-100 flex items-center gap-1.5"
                  >
                    {copiedLink ? <Check className="w-3 h-3 text-emerald-600" /> : <Copy className="w-3 h-3" />}
                    <span>{copiedLink ? 'Copiado!' : 'Copiar Link'}</span>
                  </button>
                </div>
              )}
            </div>

            {/* Favorite Wishlist */}
            <button
              onClick={() => toggleFavorite(deal.id)}
              className={`p-1.5 rounded-full border border-black transition-colors ${
                isFav ? 'bg-[#FF4D8D] text-white' : 'bg-white text-black hover:bg-[#FFD6E7]'
              }`}
              title="Favoritar"
            >
              <Heart className={`w-3.5 h-3.5 ${isFav ? 'fill-white stroke-black' : 'stroke-[2.5]'}`} />
            </button>
          </div>
        </div>

        {/* Product Sticker Box */}
        <div
          onClick={() => setSelectedDealForModal(deal)}
          className="relative w-full aspect-square rounded-2xl bg-white p-3 mb-3 cursor-pointer border-2 border-[#000000] shadow-[2px_2px_0px_#000000] flex items-center justify-center group-hover:bg-[#FFF8FA] transition-colors overflow-hidden"
        >
          {/* Product Cut-Out Image */}
          <img
            src={deal.imageUrl}
            alt={deal.title}
            loading="lazy"
            className="max-h-full max-w-full object-contain group-hover:scale-108 transition-transform duration-300"
          />

          {/* Floating Official Seal */}
          {deal.seal && (
            <div className="absolute top-2 right-2 scale-85 origin-top-right">
              <KnovaSeal type={deal.seal} size="sm" />
            </div>
          )}

          {/* Store badge */}
          <div className="absolute bottom-2 left-2 bg-[#00CDBA] border border-black px-2 py-0.5 rounded-md text-[10px] font-black text-black shadow-[1px_1px_0px_#000]">
            {store ? store.name : deal.storeName}
          </div>

          {/* Free Shipping sticker */}
          {deal.isFreeShipping && (
            <div className="absolute top-2 left-2 bg-[#FFD6E7] border border-black text-black px-1.5 py-0.5 rounded text-[9px] font-black flex items-center gap-1 shadow-[1px_1px_0px_#000]">
              <Truck className="w-2.5 h-2.5" />
              <span>Frete Grátis</span>
            </div>
          )}
        </div>

        {/* Rating and Garimpado Time */}
        <div className="flex items-center justify-between text-[10px] text-slate-600 font-bold mb-1">
          <div className="flex items-center gap-1 text-black font-extrabold">
            <Star className="w-3 h-3 fill-[#FFD93B] text-black stroke-[1.5]" />
            <span>{deal.rating || 4.9}</span>
            <span className="text-slate-500 font-semibold">({deal.reviewsCount || 340})</span>
          </div>
          <span>{deal.createdAt}</span>
        </div>

        {/* Product Title */}
        <h3
          onClick={() => setSelectedDealForModal(deal)}
          className="text-xs sm:text-sm font-bold text-[#000000] line-clamp-2 hover:text-[#FF4D8D] transition-colors mb-2.5 cursor-pointer leading-tight h-10"
          title={deal.title}
        >
          {deal.title}
        </h3>

        {/* Price Box */}
        <div className="space-y-0.5 mb-3">
          <div className="flex items-center gap-1.5">
            <span className="text-xs text-slate-400 line-through font-semibold">
              {formatMoney(deal.priceOld)}
            </span>
            <span className="text-[10px] font-black text-black bg-[#FFD93B] px-1.5 rounded border border-black">
              Precinho Knova
            </span>
          </div>

          <div className="text-xl sm:text-2xl font-black text-[#000000] tracking-tight">
            {formatMoney(deal.priceCurrent)}
          </div>

          {deal.installmentText && (
            <p className="text-[11px] text-slate-700 font-semibold line-clamp-1">
              {deal.installmentText}
            </p>
          )}
        </div>

        {/* Coupon Box if present */}
        {deal.couponCode && (
          <div className="mb-3">
            <button
              onClick={() => copyCoupon(deal.couponCode!, deal.affiliateUrl)}
              className="w-full text-left bg-[#FFD6E7] hover:bg-[#ffb5d4] border-2 border-black rounded-xl px-2.5 py-1.5 text-xs font-black text-black flex items-center justify-between transition-colors shadow-[2px_2px_0px_#000]"
            >
              <div className="flex items-center gap-1.5 font-mono">
                <Tag className="w-3.5 h-3.5 stroke-[2.5]" />
                <span>{deal.couponCode}</span>
              </div>
              <span className="text-[10px] bg-[#FFD93B] text-black font-black px-1.5 py-0.5 rounded border border-black uppercase">
                Copiar
              </span>
            </button>
          </div>
        )}
      </div>

      {/* Card Footer: Upvote + CTA buttons */}
      <div className="pt-3 border-t-2 border-black/10 space-y-2">
        <div className="flex items-center justify-between text-xs">
          <button
            onClick={() => toggleLike(deal.id)}
            className={`flex items-center gap-1 text-[11px] font-bold transition-colors ${
              isLiked ? 'text-[#FF4D8D]' : 'text-slate-600 hover:text-black'
            }`}
          >
            <Heart className={`w-3.5 h-3.5 ${isLiked ? 'fill-[#FF4D8D] text-black' : 'stroke-[2.5]'}`} />
            <span>{deal.likesCount} amaram</span>
          </button>

          <button
            onClick={() => setSelectedDealForModal(deal)}
            className="text-[11px] text-black font-extrabold underline underline-offset-2 hover:text-[#FF4D8D]"
          >
            Ver resenha
          </button>
        </div>

        {/* Primary Action Buttons */}
        <div className="grid grid-cols-12 gap-1.5">
          <button
            onClick={() => setSelectedDealForModal(deal)}
            className="col-span-4 bg-white hover:bg-slate-100 text-black text-xs font-black py-2.5 px-2 rounded-xl border-2 border-black shadow-[2px_2px_0px_#000000] flex items-center justify-center transition-transform hover:-translate-y-0.5"
          >
            <span>Dicas</span>
          </button>

          <a
            href={deal.affiliateUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="col-span-8 bg-[#FF4D8D] hover:bg-[#ff337b] text-white font-black text-xs py-2.5 px-3 rounded-xl border-2 border-black shadow-[2.5px_2.5px_0px_#000000] flex items-center justify-center gap-1.5 transition-transform hover:-translate-y-0.5 active:translate-y-0"
          >
            <span>PEGAR ACHADO</span>
            <ExternalLink className="w-3.5 h-3.5 stroke-[3]" />
          </a>
        </div>
      </div>
    </div>
  );
};
