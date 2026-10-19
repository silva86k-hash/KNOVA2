import React from 'react';
import { Sparkles, ArrowDown, Heart, ArrowUpRight } from 'lucide-react';

export const SiteHero: React.FC = () => {
  return (
    <section className="hero">
      <div className="hero-inner">
        {/* Left Copy */}
        <div className="hero-copy">
          <div className="yellow-note">
            <Sparkles className="w-4 h-4" />
            <span>OLHA O QUE EU ENCONTREI!</span>
          </div>

          <h1>
            ACHADINHOS
            <br />
            QUE VOCÊ
            <br />
            VAI{' '}
            <span>
              AMAR!
              <svg viewBox="0 0 370 25" aria-hidden="true">
                <path d="M8 19 Q160 -1 358 14" />
              </svg>
            </span>
          </h1>

          <p>
            Eu garimpo, filtro e compartilho.
            <br />
            Você descobre coisas lindas para o seu dia a dia.
          </p>

          <a className="button button-black" href="#achadinhos">
            <span>Bora ver os achadinhos</span>
            <ArrowDown className="w-5 h-5 stroke-[2.2]" />
          </a>

          <a
            className="hero-social"
            href="https://www.instagram.com/achadinhosknova/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <span>Seu próximo favorito pode estar aqui.</span>
            <Heart className="w-4 h-4 fill-[#c21a55] text-[#c21a55]" />
          </a>
        </div>

        {/* Right Art Frame */}
        <div className="hero-art">
          <div className="art-frame">
            <img
              src="https://images.hostinger.com/b53be361-6424-4a2a-a21f-1526b471c110/07cd0cbf-ef93-40a6-965a-57502749329f.png"
              srcSet="https://images.hostinger.com/b53be361-6424-4a2a-a21f-1526b471c110/07cd0cbf-ef93-40a6-965a-57502749329f.png?width=375 375w, https://images.hostinger.com/b53be361-6424-4a2a-a21f-1526b471c110/07cd0cbf-ef93-40a6-965a-57502749329f.png?width=768 768w, https://images.hostinger.com/b53be361-6424-4a2a-a21f-1526b471c110/07cd0cbf-ef93-40a6-965a-57502749329f.png 1024w"
              sizes="(min-width: 900px) 46vw, 90vw"
              alt="Colagem de bolsa rosa, tênis, fones e maquiagem com detalhes divertidos"
              className="w-full h-auto object-cover rounded-[9px]"
              loading="eager"
            />
          </div>

          <div className="gingham-tape" aria-hidden="true" />

          <div className="art-label">
            GARIMPOS COM
            <br />
            <strong>PERSONALIDADE.</strong>
          </div>

          <Heart className="hero-heart" />

          <a
            className="art-handle"
            href="https://www.instagram.com/achadinhosknova/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <span>@ACHADINHOSKNOVA</span>
            <ArrowUpRight className="w-4 h-4 stroke-[2.5]" />
          </a>
        </div>
      </div>
    </section>
  );
};
