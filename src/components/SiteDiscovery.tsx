import React, { useMemo } from 'react';
import { Sparkles, Search, ArrowUpRight, RotateCcw } from 'lucide-react';
import { useAffiliate } from '../context/AffiliateContext';
import { Deal } from '../types';

export const SiteDiscovery: React.FC = () => {
  const {
    deals,
    searchQuery,
    setSearchQuery,
    selectedCategory,
    setSelectedCategory,
    selectedStore,
    setSelectedStore,
    setSelectedDealForModal,
  } = useAffiliate();

  // Filter deals based on category, store and search query
  const filteredDeals = useMemo(() => {
    return deals.filter((deal) => {
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim();
        const matchTitle = deal.title.toLowerCase().includes(q);
        const matchStore = deal.storeName.toLowerCase().includes(q);
        const matchCategory = deal.category.toLowerCase().includes(q);
        const matchDesc = deal.description?.toLowerCase().includes(q);
        if (!matchTitle && !matchStore && !matchCategory && !matchDesc) {
          return false;
        }
      }

      if (selectedCategory !== 'todas') {
        if (selectedCategory === 'moda' && deal.category !== 'moda') return false;
        if (selectedCategory === 'beleza' && deal.category !== 'beleza') return false;
        if (selectedCategory === 'eletronicos' && deal.category !== 'eletronicos' && deal.category !== 'informatica') return false;
        if (selectedCategory === 'casa-cozinha' && deal.category !== 'casa-cozinha') return false;
      }

      if (selectedStore !== 'todas' && deal.store !== selectedStore) {
        return false;
      }

      return true;
    });
  }, [deals, searchQuery, selectedCategory, selectedStore]);

  const getTagText = (index: number) => {
    const tags = ['NO RADAR', 'FUI TESTAR', 'DICA DE AMIGA', 'SUPER ACHADO'];
    return tags[index % tags.length];
  };

  return (
    <section id="achadinhos" className="discovery section-rail">
      {/* Section Header */}
      <div className="section-top">
        <div>
          <span className="eyebrow">
            <Sparkles className="w-4 h-4 stroke-[2.2]" />
            <span>VEM GARIMPAR COMIGO</span>
          </span>
          <h2>
            SEU PRÓXIMO <span>FAVORITO.</span>
          </h2>
        </div>
        <p>
          Moda, beleza e ideias para a rotina.
          <br />
          Um cantinho cheio de boas descobertas.
        </p>
      </div>

      {/* Filter Bar */}
      <div className="filter-bar">
        {/* Category Filters */}
        <div className="category-filters">
          <button
            type="button"
            className={selectedCategory === 'todas' ? 'selected' : ''}
            onClick={() => setSelectedCategory('todas')}
          >
            Todos
          </button>
          <button
            type="button"
            className={selectedCategory === 'moda' ? 'selected' : ''}
            onClick={() => setSelectedCategory('moda')}
          >
            Moda
          </button>
          <button
            type="button"
            className={selectedCategory === 'beleza' ? 'selected' : ''}
            onClick={() => setSelectedCategory('beleza')}
          >
            Beleza
          </button>
          <button
            type="button"
            className={selectedCategory === 'eletronicos' ? 'selected' : ''}
            onClick={() => setSelectedCategory('eletronicos')}
          >
            Tecnologia
          </button>
          <button
            type="button"
            className={selectedCategory === 'casa-cozinha' ? 'selected' : ''}
            onClick={() => setSelectedCategory('casa-cozinha')}
          >
            Casa
          </button>
        </div>

        {/* Store Select */}
        <div className="store-select">
          <select
            value={selectedStore}
            onChange={(e) => setSelectedStore(e.target.value as any)}
            aria-label="Filtrar por loja parceira"
          >
            <option value="todas">Todas as lojas</option>
            <option value="shopee">Shopee</option>
            <option value="amazon">Amazon</option>
            <option value="mercadolivre">Mercado Livre</option>
            <option value="magalu">Magazine Luiza</option>
          </select>
        </div>

        {/* Search Box */}
        <div className="search-box">
          <Search className="w-3.5 h-3.5 shrink-0" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Buscar achadinho..."
          />
        </div>
      </div>

      {/* Product Grid */}
      {filteredDeals.length > 0 ? (
        <div className="product-grid">
          {filteredDeals.map((deal, idx) => (
            <article key={deal.id} className="product-card">
              <div
                className="product-image cursor-pointer"
                onClick={() => setSelectedDealForModal(deal)}
              >
                <span className="product-tag">{getTagText(idx)}</span>
                <img
                  loading="lazy"
                  src={deal.imageUrl}
                  alt={`${deal.title} — imagem ilustrativa`}
                />
                <span className="illustration-label">Imagem ilustrativa</span>
              </div>

              <div className="product-body">
                <div className="product-meta">
                  <span className="capitalize">{deal.category}</span>
                  <span>{deal.storeName}</span>
                </div>

                <h3
                  onClick={() => setSelectedDealForModal(deal)}
                  className="cursor-pointer hover:text-[#d92869] transition-colors"
                >
                  {deal.title}
                </h3>

                <p>{deal.description || 'Uma inspiração para o seu dia a dia.'}</p>

                <a
                  className="product-link"
                  href={deal.affiliateUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <span>Ver na {deal.storeName}</span>
                  <ArrowUpRight className="w-4 h-4 stroke-[2.5]" />
                </a>
              </div>
            </article>
          ))}
        </div>
      ) : (
        <div className="empty-results text-center py-12 space-y-3 bg-[#fff8fb] rounded-xl border border-[#f3d9e4]">
          <p className="text-sm font-bold text-slate-800">
            Nenhum achadinho encontrado para esta busca.
          </p>
          <button
            onClick={() => {
              setSearchQuery('');
              setSelectedCategory('todas');
              setSelectedStore('todas');
            }}
            className="button button-black text-xs py-2 px-4"
          >
            <span>Ver todos os achadinhos</span>
          </button>
        </div>
      )}

      {/* Note under grid */}
      <p className="example-note">
        * As imagens acima são ilustrativas para facilitar sua descoberta. Os preços e a disponibilidade devem sempre ser confirmados diretamente nas lojas oficiais.
      </p>
    </section>
  );
};
