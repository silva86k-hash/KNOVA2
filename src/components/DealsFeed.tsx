import React, { useMemo } from 'react';
import {
  LayoutGrid,
  List,
  Tag,
  Truck,
  Zap,
  SlidersHorizontal,
  RotateCcw,
  Sparkles,
} from 'lucide-react';
import { useAffiliate } from '../context/AffiliateContext';
import { DealCard } from './DealCard';
import { CATEGORIES_DATA } from '../data/stores';

export const DealsFeed: React.FC = () => {
  const {
    deals,
    searchQuery,
    setSearchQuery,
    selectedCategory,
    setSelectedCategory,
    selectedStore,
    setSelectedStore,
    priceFilter,
    setPriceFilter,
    onlyWithCoupon,
    setOnlyWithCoupon,
    onlyFreeShipping,
    setOnlyFreeShipping,
    onlyFlashDeals,
    setOnlyFlashDeals,
    sortBy,
    setSortBy,
    activeTab,
    viewMode,
    setViewMode,
  } = useAffiliate();

  const filteredDeals = useMemo(() => {
    return deals
      .filter((deal) => {
        if (searchQuery.trim()) {
          const q = searchQuery.toLowerCase().trim();
          const matchTitle = deal.title.toLowerCase().includes(q);
          const matchStore = deal.storeName.toLowerCase().includes(q) || deal.store.toLowerCase().includes(q);
          const matchCategory = deal.category.toLowerCase().includes(q);
          const matchCoupon = deal.couponCode?.toLowerCase().includes(q);
          const matchTags = deal.tags.some((t) => t.toLowerCase().includes(q));
          if (!matchTitle && !matchStore && !matchCategory && !matchCoupon && !matchTags) {
            return false;
          }
        }

        if (activeTab === 'relampago' && !deal.isFlashDeal) return false;
        if (activeTab === 'achadinhos' && deal.category !== 'achadinhos') return false;
        if (selectedCategory !== 'todas' && deal.category !== selectedCategory) return false;
        if (selectedStore !== 'todas' && deal.store !== selectedStore) return false;

        if (priceFilter === 'ate-50' && deal.priceCurrent > 50) return false;
        if (priceFilter === '50-150' && (deal.priceCurrent < 50 || deal.priceCurrent > 150)) return false;
        if (priceFilter === '150-500' && (deal.priceCurrent < 150 || deal.priceCurrent > 500)) return false;
        if (priceFilter === '500-mais' && deal.priceCurrent < 500) return false;

        if (onlyWithCoupon && !deal.couponCode) return false;
        if (onlyFreeShipping && !deal.isFreeShipping) return false;
        if (onlyFlashDeals && !deal.isFlashDeal) return false;

        return true;
      })
      .sort((a, b) => {
        if (sortBy === 'discount') return b.discountPercentage - a.discountPercentage;
        if (sortBy === 'price-asc') return a.priceCurrent - b.priceCurrent;
        if (sortBy === 'price-desc') return b.priceCurrent - a.priceCurrent;
        if (sortBy === 'popular') return b.likesCount - a.likesCount;
        return 0;
      });
  }, [
    deals,
    searchQuery,
    selectedCategory,
    selectedStore,
    priceFilter,
    onlyWithCoupon,
    onlyFreeShipping,
    onlyFlashDeals,
    sortBy,
    activeTab,
  ]);

  const currentCategoryName =
    CATEGORIES_DATA.find((c) => c.id === selectedCategory)?.name || 'Todos os Achadinhos';

  const resetAllFilters = () => {
    setSearchQuery('');
    setSelectedCategory('todas');
    setSelectedStore('todas');
    setPriceFilter('todos');
    setOnlyWithCoupon(false);
    setOnlyFreeShipping(false);
    setOnlyFlashDeals(false);
    setSortBy('recent');
  };

  const hasActiveFilters =
    searchQuery !== '' ||
    selectedCategory !== 'todas' ||
    selectedStore !== 'todas' ||
    priceFilter !== 'todos' ||
    onlyWithCoupon ||
    onlyFreeShipping ||
    onlyFlashDeals;

  return (
    <section className="px-4 py-3" id="deals-section">
      <div className="max-w-7xl mx-auto space-y-4">
        {/* Controls and Title Header */}
        <div className="bg-[#FFFDF9] rounded-3xl p-4 sm:p-6 border-2.5 border-[#000000] shadow-[5px_5px_0px_#000000] space-y-4">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-xl bg-[#00CDBA] border-2 border-black flex items-center justify-center font-black">
                  ♥
                </div>
                <h2 className="text-xl sm:text-2xl font-black text-black tracking-tight uppercase font-montserrat">
                  {searchQuery ? `Busca: "${searchQuery}"` : currentCategoryName}
                </h2>
              </div>
              <p className="text-xs font-bold text-slate-700 mt-0.5">
                Exibindo <span className="text-[#FF4D8D] font-black">{filteredDeals.length}</span> achadinhos selecionados a dedo
              </p>
            </div>

            {/* View Mode & Sort Dropdown */}
            <div className="flex items-center gap-2.5 self-start md:self-auto flex-wrap">
              <div className="flex items-center gap-1.5 bg-white border-2 border-black rounded-xl px-2.5 py-1.5 text-xs text-black shadow-[2px_2px_0px_#000]">
                <SlidersHorizontal className="w-3.5 h-3.5 stroke-[2.5]" />
                <span className="font-extrabold hidden sm:inline">Ordenar:</span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as any)}
                  className="bg-transparent font-black text-black focus:outline-none cursor-pointer"
                >
                  <option value="recent">Mais Recentes</option>
                  <option value="discount">Maior Desconto (%)</option>
                  <option value="price-asc">Menor Preço (R$)</option>
                  <option value="price-desc">Maior Preço (R$)</option>
                  <option value="popular">Mais Amados ♥</option>
                </select>
              </div>

              {/* View Toggle */}
              <div className="flex items-center bg-white rounded-xl p-1 border-2 border-black shadow-[2px_2px_0px_#000]">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-1.5 rounded-lg transition-all ${
                    viewMode === 'grid'
                      ? 'bg-[#00CDBA] text-black font-black'
                      : 'text-slate-500 hover:text-black'
                  }`}
                  title="Grade"
                >
                  <LayoutGrid className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-1.5 rounded-lg transition-all ${
                    viewMode === 'list'
                      ? 'bg-[#00CDBA] text-black font-black'
                      : 'text-slate-500 hover:text-black'
                  }`}
                  title="Lista"
                >
                  <List className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Filter Pills and Toggles */}
          <div className="flex flex-wrap items-center gap-2 pt-2 border-t-2 border-black/10">
            <span className="text-xs font-black text-black uppercase mr-1 hidden sm:inline">Preço:</span>
            {[
              { id: 'todos', label: 'Todos' },
              { id: 'ate-50', label: 'Até R$ 50' },
              { id: '50-150', label: 'R$ 50 - R$ 150' },
              { id: '150-500', label: 'R$ 150 - R$ 500' },
              { id: '500-mais', label: 'R$ 500+' },
            ].map((p) => (
              <button
                key={p.id}
                onClick={() => setPriceFilter(p.id as any)}
                className={`text-xs px-3 py-1.5 rounded-full font-black border-2 border-black transition-all ${
                  priceFilter === p.id
                    ? 'bg-[#000000] text-white shadow-[2px_2px_0px_#00CDBA]'
                    : 'bg-white text-black hover:bg-[#FFD6E7] shadow-[1.5px_1.5px_0px_#000]'
                }`}
              >
                {p.label}
              </button>
            ))}

            <div className="h-4 w-[2px] bg-black/20 mx-1 hidden md:block" />

            <button
              onClick={() => setOnlyWithCoupon(!onlyWithCoupon)}
              className={`flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-full font-black border-2 border-black transition-all ${
                onlyWithCoupon
                  ? 'bg-[#FFD93B] text-black shadow-[2px_2px_0px_#000]'
                  : 'bg-white text-black hover:bg-[#FFD93B]/40 shadow-[1.5px_1.5px_0px_#000]'
              }`}
            >
              <Tag className="w-3.5 h-3.5 stroke-[2.5]" />
              <span>Com Cupom</span>
            </button>

            <button
              onClick={() => setOnlyFreeShipping(!onlyFreeShipping)}
              className={`flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-full font-black border-2 border-black transition-all ${
                onlyFreeShipping
                  ? 'bg-[#00CDBA] text-black shadow-[2px_2px_0px_#000]'
                  : 'bg-white text-black hover:bg-[#00CDBA]/40 shadow-[1.5px_1.5px_0px_#000]'
              }`}
            >
              <Truck className="w-3.5 h-3.5 stroke-[2.5]" />
              <span>Frete Grátis</span>
            </button>

            <button
              onClick={() => setOnlyFlashDeals(!onlyFlashDeals)}
              className={`flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-full font-black border-2 border-black transition-all ${
                onlyFlashDeals
                  ? 'bg-[#FF4D8D] text-white shadow-[2px_2px_0px_#000]'
                  : 'bg-white text-black hover:bg-[#FFD6E7] shadow-[1.5px_1.5px_0px_#000]'
              }`}
            >
              <Zap className="w-3.5 h-3.5 stroke-[2.5]" />
              <span>Relâmpago</span>
            </button>

            {hasActiveFilters && (
              <button
                onClick={resetAllFilters}
                className="text-xs text-[#FF4D8D] font-black flex items-center gap-1 ml-auto hover:underline"
              >
                <RotateCcw className="w-3.5 h-3.5 stroke-[3]" />
                <span>Limpar filtros</span>
              </button>
            )}
          </div>
        </div>

        {/* Deals Listing */}
        {filteredDeals.length > 0 ? (
          viewMode === 'grid' ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {filteredDeals.map((deal) => (
                <DealCard key={deal.id} deal={deal} isCompactList={false} />
              ))}
            </div>
          ) : (
            <div className="space-y-3">
              {filteredDeals.map((deal) => (
                <DealCard key={deal.id} deal={deal} isCompactList={true} />
              ))}
            </div>
          )
        ) : (
          <div className="bg-[#FFFDF9] rounded-3xl p-10 text-center border-2 border-black shadow-[4px_4px_0px_#000] space-y-3">
            <div className="w-16 h-16 rounded-full bg-[#FFD6E7] text-black border-2 border-black mx-auto flex items-center justify-center font-black text-2xl">
              ♥
            </div>
            <h3 className="text-base font-black text-black uppercase">
              Nenhum achadinho encontrado com esses filtros
            </h3>
            <p className="text-xs font-medium text-slate-600 max-w-sm mx-auto">
              Tente selecionar outra categoria ou limpar a busca para ver todas as garimpagens.
            </p>
            <button
              onClick={resetAllFilters}
              className="bg-[#00CDBA] hover:bg-[#00baa8] text-black border-2 border-black text-xs font-black px-4 py-2 rounded-xl shadow-[2px_2px_0px_#000]"
            >
              Ver Todos os Achadinhos
            </button>
          </div>
        )}
      </div>
    </section>
  );
};
