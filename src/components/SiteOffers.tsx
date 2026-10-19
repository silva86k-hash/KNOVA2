import React from 'react';
import { Tag, ArrowUpRight } from 'lucide-react';
import { useAffiliate } from '../context/AffiliateContext';
import { Deal } from '../types';

export const SiteOffers: React.FC = () => {
  const { deals, setSelectedDealForModal } = useAffiliate();

  // Top 4 featured offers
  const featuredOffers = deals.slice(0, 4);

  const formatMoney = (val: number) => {
    return val.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
  };

  const getBadgeText = (index: number, deal: Deal) => {
    if (index === 0) return 'MAIS PROCURADO';
    if (index === 1) return 'OFERTA RELÂMPAGO';
    if (index === 2) return 'QUERIDINHO';
    return 'DESTAQUE';
  };

  return (
    <section id="ofertas" className="offers section-rail">
      {/* Top Header */}
      <div className="section-top">
        <div>
          <span className="eyebrow">
            <Tag className="w-4 h-4 stroke-[2.2]" />
            <span>SEPARADOS PRA VOCÊ</span>
          </span>
          <h2>
            OFERTAS QUE <span>VALEM A PENA.</span>
          </h2>
        </div>
        <p>
          Preços de exemplo para você ter uma ideia.
          <br />
          Confira o valor final direto na loja.
        </p>
      </div>

      {/* Offers Grid */}
      <div className="offer-grid">
        {featuredOffers.map((deal, idx) => (
          <article key={deal.id} className="offer-card">
            <div
              className="offer-image cursor-pointer"
              onClick={() => setSelectedDealForModal(deal)}
            >
              <span className="offer-badge">{getBadgeText(idx, deal)}</span>
              <span className="offer-discount">-{deal.discountPercentage}%</span>
              <img
                loading="lazy"
                src={deal.imageUrl}
                alt={`${deal.title} — imagem ilustrativa`}
              />
              <span className="illustration-label">Imagem ilustrativa</span>
            </div>

            <div className="offer-body">
              <div className="product-meta">
                <span className="capitalize">{deal.category}</span>
                <span>{deal.storeName}</span>
              </div>

              <h3
                onClick={() => setSelectedDealForModal(deal)}
                className="cursor-pointer hover:text-[#d92869] transition-colors"
                title={deal.title}
              >
                {deal.title}
              </h3>

              <div className="offer-prices">
                <span className="offer-price">{formatMoney(deal.priceCurrent)}</span>
                <span className="offer-old">{formatMoney(deal.priceOld)}</span>
              </div>

              <a
                className="product-link"
                href={deal.affiliateUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                <span>Aproveitar na {deal.storeName}</span>
                <ArrowUpRight className="w-4 h-4 stroke-[2.5]" />
              </a>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
};
