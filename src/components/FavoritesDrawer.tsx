import React from 'react';
import { X, Heart, ExternalLink, Trash2 } from 'lucide-react';
import { useAffiliate } from '../context/AffiliateContext';

export const FavoritesDrawer: React.FC = () => {
  const {
    isFavoritesDrawerOpen,
    setIsFavoritesDrawerOpen,
    favorites,
    deals,
    toggleFavorite,
    setSelectedDealForModal,
  } = useAffiliate();

  if (!isFavoritesDrawerOpen) return null;

  const favoriteDeals = deals.filter((d) => favorites.includes(d.id));

  const formatMoney = (val: number) => {
    return val.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/60 backdrop-blur-xs flex justify-end">
      <div className="w-full max-w-md bg-[#FFFDF9] h-full shadow-[0px_0px_30px_rgba(0,0,0,0.3)] border-l-3 border-black flex flex-col animate-in slide-in-from-right duration-200">
        {/* Header */}
        <div className="p-4 sm:p-5 border-b-2 border-black flex items-center justify-between bg-[#FFD6E7]">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-white border-2 border-black text-[#FF4D8D] flex items-center justify-center shadow-[1.5px_1.5px_0px_#000]">
              <Heart className="w-4 h-4 fill-[#FF4D8D] stroke-black" />
            </div>
            <div>
              <h2 className="text-base font-black text-black uppercase">
                Meus Salvos ♥
              </h2>
              <p className="text-[11px] font-bold text-slate-700">
                {favoriteDeals.length} {favoriteDeals.length === 1 ? 'achadinho salvo' : 'achadinhos salvos'}
              </p>
            </div>
          </div>

          <button
            onClick={() => setIsFavoritesDrawerOpen(false)}
            className="w-8 h-8 rounded-full bg-white border-2 border-black hover:bg-[#FFD93B] text-black flex items-center justify-center transition-colors shadow-[1.5px_1.5px_0px_#000]"
          >
            <X className="w-4 h-4 stroke-[2.5]" />
          </button>
        </div>

        {/* List Content */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {favoriteDeals.length > 0 ? (
            favoriteDeals.map((deal) => (
              <div
                key={deal.id}
                className="bg-white rounded-2xl p-3 border-2 border-black shadow-[3px_3px_0px_#000] flex gap-3 group relative"
              >
                <div
                  onClick={() => {
                    setIsFavoritesDrawerOpen(false);
                    setSelectedDealForModal(deal);
                  }}
                  className="w-20 h-20 rounded-xl bg-[#FFF8FA] p-2 shrink-0 flex items-center justify-center border border-black/20 cursor-pointer"
                >
                  <img
                    src={deal.imageUrl}
                    alt={deal.title}
                    className="max-h-full max-w-full object-contain"
                  />
                </div>

                <div className="flex-1 min-w-0 space-y-1">
                  <div className="flex items-center justify-between gap-1">
                    <span className="text-[10px] font-black text-black uppercase bg-[#00CDBA] px-2 py-0.5 rounded border border-black">
                      {deal.storeName}
                    </span>
                    <button
                      onClick={() => toggleFavorite(deal.id)}
                      className="text-slate-400 hover:text-[#FF4D8D] p-1"
                      title="Remover"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <h3
                    onClick={() => {
                      setIsFavoritesDrawerOpen(false);
                      setSelectedDealForModal(deal);
                    }}
                    className="text-xs font-bold text-black line-clamp-2 hover:text-[#FF4D8D] transition-colors cursor-pointer"
                  >
                    {deal.title}
                  </h3>

                  <div className="flex items-baseline gap-2 pt-0.5">
                    <span className="text-sm font-black text-black">
                      {formatMoney(deal.priceCurrent)}
                    </span>
                    <span className="text-[10px] text-slate-400 line-through">
                      {formatMoney(deal.priceOld)}
                    </span>
                  </div>

                  <a
                    href={deal.affiliateUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-[11px] font-black text-[#FF4D8D] hover:underline pt-1 uppercase"
                  >
                    <span>Pegar na loja</span>
                    <ExternalLink className="w-3 h-3 stroke-[3]" />
                  </a>
                </div>
              </div>
            ))
          ) : (
            <div className="h-full flex flex-col items-center justify-center text-center p-6 space-y-3">
              <div className="w-16 h-16 rounded-full bg-[#FFD6E7] border-2 border-black flex items-center justify-center text-2xl font-black">
                ♥
              </div>
              <p className="text-sm font-black text-black uppercase">
                Você ainda não salvou nenhum achadinho!
              </p>
              <p className="text-xs font-medium text-slate-600 max-w-xs">
                Clique no coração nos cartões dos produtos para guardar suas pechinchas favoritas aqui.
              </p>
            </div>
          )}
        </div>

        {/* Footer */}
        {favoriteDeals.length > 0 && (
          <div className="p-4 border-t-2 border-black bg-[#FFFDF9]">
            <button
              onClick={() => {
                favorites.forEach((id) => toggleFavorite(id));
              }}
              className="w-full text-xs font-black text-black hover:text-[#FF4D8D] py-2 transition-colors flex items-center justify-center gap-1 uppercase"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>Limpar todos os salvos</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
