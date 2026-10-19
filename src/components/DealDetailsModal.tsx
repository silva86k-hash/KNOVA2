import React, { useState } from 'react';
import {
  X,
  ExternalLink,
  Truck,
  Heart,
  Share2,
  TrendingDown,
  Bell,
  Check,
  Tag,
  Copy,
} from 'lucide-react';
import { useAffiliate } from '../context/AffiliateContext';
import { STORES_DATA } from '../data/stores';
import { KnovaSeal, KnovaHandlePill } from './KnovaBadges';

export const DealDetailsModal: React.FC = () => {
  const {
    selectedDealForModal,
    setSelectedDealForModal,
    favorites,
    toggleFavorite,
    likedDeals,
    toggleLike,
    copyCoupon,
    copyLinkToClipboard,
    openPriceAlertModal,
  } = useAffiliate();

  const [shareCopied, setShareCopied] = useState(false);

  if (!selectedDealForModal) return null;

  const deal = selectedDealForModal;
  const isFav = favorites.includes(deal.id);
  const isLiked = likedDeals[deal.id];
  const store = STORES_DATA[deal.store];

  const formatMoney = (val: number) => {
    return val.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
  };

  const handleShare = () => {
    copyLinkToClipboard(deal.affiliateUrl, 'Link do achadinho');
    setShareCopied(true);
    setTimeout(() => setShareCopied(false), 2000);
  };

  const handleWhatsAppShare = () => {
    const text = encodeURIComponent(
      `♥ *Olha o que eu encontrei no @achadinhosknova!*\n\n*${deal.title}*\n💰 De ${formatMoney(deal.priceOld)} por apenas *${formatMoney(deal.priceCurrent)}* (-${deal.discountPercentage}% OFF)\n${deal.couponCode ? `🏷️ Cupom: *${deal.couponCode}*\n` : ''}\n👉 Pegar aqui: ${deal.affiliateUrl}`
    );
    window.open(`https://api.whatsapp.com/send?text=${text}`, '_blank');
  };

  const history = deal.priceHistory && deal.priceHistory.length > 0 ? deal.priceHistory : [
    { date: 'Há 3 meses', price: deal.priceOld },
    { date: 'Há 1 mês', price: (deal.priceOld + deal.priceCurrent) / 2 },
    { date: 'Hoje', price: deal.priceCurrent },
  ];

  const prices = history.map((h) => h.price);
  const maxPrice = Math.max(...prices, deal.priceOld);
  const minPrice = Math.min(...prices, deal.priceCurrent);
  const range = maxPrice - minPrice || 1;

  const chartWidth = 340;
  const chartHeight = 110;
  const points = history.map((item, index) => {
    const x = (index / (history.length - 1)) * (chartWidth - 40) + 20;
    const y = chartHeight - 20 - ((item.price - minPrice) / range) * (chartHeight - 40);
    return { x, y, item };
  });

  const pathD = points.reduce((acc, point, index) => {
    return `${acc} ${index === 0 ? 'M' : 'L'} ${point.x} ${point.y}`;
  }, '');

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4">
      <div className="bg-[#FFFDF9] rounded-3xl max-w-3xl w-full overflow-hidden border-3 border-[#000000] shadow-[8px_8px_0px_#000000] relative my-6">
        {/* Close Button */}
        <button
          onClick={() => setSelectedDealForModal(null)}
          className="absolute top-4 right-4 z-20 w-9 h-9 rounded-full bg-white border-2 border-black hover:bg-[#FFD6E7] text-black flex items-center justify-center shadow-[2px_2px_0px_#000]"
          aria-label="Fechar"
        >
          <X className="w-5 h-5 stroke-[2.5]" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-12 max-h-[88vh] overflow-y-auto">
          {/* Left Column: Image, Stickers & Seal */}
          <div className="md:col-span-5 bg-[#FFD6E7] p-6 flex flex-col justify-between border-b md:border-b-0 md:border-r-2 border-black">
            <div>
              <div className="flex items-center justify-between gap-2 mb-4">
                <span className="text-xs font-black px-2.5 py-1 rounded-full bg-[#00CDBA] text-black border border-black uppercase">
                  {store ? store.name : deal.storeName}
                </span>

                <span className="bg-[#FFD93B] text-black text-xs font-black px-2.5 py-0.5 rounded-lg border border-black shadow-[1.5px_1.5px_0px_#000]">
                  -{deal.discountPercentage}% OFF
                </span>
              </div>

              {/* Product Sticker Image */}
              <div className="aspect-square w-full rounded-3xl bg-white p-4 shadow-[3px_3px_0px_#000] border-2 border-black flex items-center justify-center relative overflow-hidden">
                <img
                  src={deal.imageUrl}
                  alt={deal.title}
                  className="max-h-full max-w-full object-contain"
                />

                {deal.seal && (
                  <div className="absolute top-2 right-2 scale-90">
                    <KnovaSeal type={deal.seal} size="md" />
                  </div>
                )}
              </div>

              {/* Action buttons */}
              <div className="mt-4 flex items-center justify-center gap-2">
                <button
                  onClick={() => toggleLike(deal.id)}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-black border-2 border-black transition-all ${
                    isLiked
                      ? 'bg-[#FF4D8D] text-white shadow-[2px_2px_0px_#000]'
                      : 'bg-white text-black hover:bg-[#FFFDF9] shadow-[1.5px_1.5px_0px_#000]'
                  }`}
                >
                  <Heart className={`w-3.5 h-3.5 ${isLiked ? 'fill-white stroke-black' : 'stroke-[2.5]'}`} />
                  <span>Amei ({deal.likesCount})</span>
                </button>

                <button
                  onClick={() => toggleFavorite(deal.id)}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-black border-2 border-black transition-all ${
                    isFav
                      ? 'bg-black text-white shadow-[2px_2px_0px_#00CDBA]'
                      : 'bg-white text-black hover:bg-slate-100 shadow-[1.5px_1.5px_0px_#000]'
                  }`}
                >
                  <span>{isFav ? 'Salvo ♥' : 'Salvar'}</span>
                </button>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t-2 border-black/10">
              <button
                onClick={() => {
                  setSelectedDealForModal(null);
                  openPriceAlertModal(deal);
                }}
                className="w-full bg-white hover:bg-slate-50 text-black text-xs font-black py-2 px-3 rounded-xl border-2 border-black shadow-[2px_2px_0px_#000] flex items-center justify-center gap-2"
              >
                <Bell className="w-3.5 h-3.5 stroke-[2.5]" />
                <span>Avise-me se baixar mais!</span>
              </button>
            </div>
          </div>

          {/* Right Column: Content & Curadoria */}
          <div className="md:col-span-7 p-6 sm:p-7 flex flex-col justify-between space-y-4">
            <div>
              <div className="flex items-center justify-between text-xs font-bold text-slate-500 mb-2">
                <KnovaHandlePill />
                <span>{deal.createdAt}</span>
              </div>

              <h2 className="text-base sm:text-lg font-black text-black leading-snug mb-3 uppercase">
                {deal.title}
              </h2>

              {/* Price Box */}
              <div className="bg-[#FFFDF9] rounded-2xl p-4 border-2 border-black shadow-[3px_3px_0px_#000] mb-4">
                <div className="flex items-baseline gap-2 mb-1">
                  <span className="text-xs text-slate-400 line-through font-semibold">
                    {formatMoney(deal.priceOld)}
                  </span>
                  <span className="text-xs font-black text-black bg-[#FFD93B] px-2 py-0.5 rounded border border-black">
                    Economia de {formatMoney(deal.priceOld - deal.priceCurrent)}
                  </span>
                </div>

                <div className="text-2xl sm:text-3xl font-black text-black tracking-tight">
                  {formatMoney(deal.priceCurrent)}
                </div>

                {deal.installmentText && (
                  <p className="text-xs font-bold text-slate-700 mt-1">
                    {deal.installmentText}
                  </p>
                )}

                {deal.isFreeShipping && (
                  <div className="flex items-center gap-1 text-xs text-black font-black mt-2 bg-[#FFD6E7] border border-black px-2 py-1 rounded-md inline-flex">
                    <Truck className="w-3.5 h-3.5" />
                    <span>Frete Grátis Disponível</span>
                  </div>
                )}
              </div>

              {/* Cupom se houver */}
              {deal.couponCode && (
                <div className="mb-4 bg-[#FFD93B] border-2 border-black rounded-2xl p-3 flex items-center justify-between shadow-[2px_2px_0px_#000]">
                  <div className="flex items-center gap-2">
                    <Tag className="w-4 h-4 stroke-[2.5]" />
                    <div>
                      <span className="text-[10px] font-black uppercase">Cupom de Desconto:</span>
                      <p className="font-mono font-black text-black text-sm">
                        {deal.couponCode}
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() => copyCoupon(deal.couponCode!, deal.affiliateUrl)}
                    className="bg-[#00CDBA] hover:bg-[#00baa8] text-black font-black text-xs px-3 py-1.5 rounded-xl border border-black shadow-[1.5px_1.5px_0px_#000]"
                  >
                    <span>Copiar Cupom</span>
                  </button>
                </div>
              )}

              {/* Resenha da Curadora Knova */}
              {deal.description && (
                <div className="bg-[#FFFDF9] border border-black/20 rounded-xl p-3 mb-4">
                  <span className="text-[10px] font-black text-[#FF4D8D] uppercase tracking-wider block mb-1">
                    ♥ Por que a Knova indica:
                  </span>
                  <p className="text-xs font-medium text-slate-800 leading-relaxed italic">
                    "{deal.description}"
                  </p>
                </div>
              )}

              {/* Highlights */}
              {deal.highlights && deal.highlights.length > 0 && (
                <div className="space-y-1 mb-4">
                  <h4 className="text-xs font-black text-black uppercase tracking-wide">
                    O que você precisa saber:
                  </h4>
                  <ul className="space-y-1">
                    {deal.highlights.map((h, i) => (
                      <li key={i} className="text-xs font-semibold text-slate-700 flex items-start gap-1.5">
                        <span className="text-[#00CDBA] font-black">✔</span>
                        <span>{h}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            {/* Bottom Primary CTA */}
            <div className="pt-3 border-t-2 border-black/10 space-y-2.5">
              <a
                href={deal.affiliateUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full bg-[#FF4D8D] hover:bg-[#ff337b] text-white font-black text-sm py-3.5 px-4 rounded-2xl border-2 border-black shadow-[3.5px_3.5px_0px_#000000] flex items-center justify-center gap-2 transition-transform hover:-translate-y-0.5 active:translate-y-0 uppercase"
              >
                <span>APROVEITAR NO SITE OFICIAL ({store ? store.name : deal.storeName})</span>
                <ExternalLink className="w-4 h-4 stroke-[3]" />
              </a>

              <div className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <button
                    onClick={handleWhatsAppShare}
                    className="p-1.5 rounded-lg bg-[#00CDBA] text-black border border-black font-bold flex items-center gap-1 shadow-[1px_1px_0px_#000]"
                  >
                    <Share2 className="w-3 h-3 stroke-[2.5]" />
                    <span>WhatsApp</span>
                  </button>

                  <button
                    onClick={handleShare}
                    className="p-1.5 rounded-lg bg-white text-black border border-black font-bold flex items-center gap-1 shadow-[1px_1px_0px_#000]"
                  >
                    {shareCopied ? <Check className="w-3 h-3 text-emerald-600 stroke-[3]" /> : <Copy className="w-3 h-3" />}
                    <span>{shareCopied ? 'Copiado!' : 'Copiar'}</span>
                  </button>
                </div>

                <span className="text-[10px] text-slate-500 font-bold">
                  Link 100% verificado
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
