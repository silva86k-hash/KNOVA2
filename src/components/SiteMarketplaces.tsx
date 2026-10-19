import React from 'react';
import { ShoppingBag, ArrowUpRight } from 'lucide-react';
import { useAffiliate } from '../context/AffiliateContext';

export const SiteMarketplaces: React.FC = () => {
  const { settings } = useAffiliate();

  const stores = [
    {
      id: 'shopee',
      name: 'Shopee',
      desc: 'Um pouco de tudo para descobrir',
      className: 'store-tile shopee',
      url: 'https://collshp.com/kelly.knova',
    },
    {
      id: 'amazon',
      name: 'Amazon',
      desc: 'De tudo, com entrega rápida',
      className: 'store-tile amazon',
      url: 'https://link.amazon/B07QJXnhm',
    },
    {
      id: 'mercadolivre',
      name: 'Mercado Livre',
      desc: 'Do básico ao seu próximo favorito',
      className: 'store-tile mercado',
      url: 'https://www.mercadolivre.com.br/social/silva86k/lists',
    },
    {
      id: 'magalu',
      name: 'Magazine Luiza',
      desc: 'Ideias para facilitar a sua casa',
      className: 'store-tile magazine',
      url: 'https://www.magazineluiza.com.br?origem=afiliados&tag=ofertasknova',
    },
    {
      id: 'natura',
      name: 'Natura',
      desc: 'Autocuidado, perfumaria e bem-estar',
      className: 'store-tile natura',
      url: 'https://www.minhaloja.natura.com/consultoria/achadinhosknova',
    },
  ];

  return (
    <section id="lojas" className="marketplaces section-rail">
      <div className="market-heading">
        <span className="eyebrow">
          <ShoppingBag className="w-4 h-4 stroke-[2.2]" />
          <span>CADA LOJA, UMA DESCOBERTA</span>
        </span>
        <h2>
          ONDE A GENTE <span>GARIMPA.</span>
        </h2>
        <p>Escolha seu destino e continue a descoberta por lá.</p>
      </div>

      <div className="store-grid">
        {stores.map((s) => (
          <a
            key={s.id}
            className={s.className}
            href={s.url}
            target="_blank"
            rel="noopener noreferrer"
          >
            <ShoppingBag className="w-5 h-5 text-black stroke-[2]" />
            <strong>{s.name}</strong>
            <span>{s.desc}</span>
            <div>
              <span>Explorar loja</span>
              <ArrowUpRight className="w-4 h-4 stroke-[2.5]" />
            </div>
          </a>
        ))}
      </div>

      <p className="destination-note">
        Dica: Você será direcionada com segurança para as páginas oficiais de cada loja parceira.
      </p>
    </section>
  );
};
