import React from 'react';
import { Heart, CheckCircle2 } from 'lucide-react';

export const SiteAbout: React.FC = () => {
  return (
    <section id="sobre" className="about section-rail">
      <div className="about-title">
        <span className="eyebrow">👋 MUITO PRAZER, KNOVA!</span>
        <h2>
          MENOS BUSCA.
          <br />
          <span>MAIS ACHADOS.</span>
          <Heart className="w-9 h-9 fill-[#00cdba] text-[#00cdba]" />
        </h2>
      </div>

      <div className="about-copy">
        <p>
          Um olhar curioso, uma paixão por descobrir e aquele desejo de compartilhar com uma amiga. É assim que nasce a Knova.
        </p>
        <p>
          Nosso cantinho reúne inspirações de moda, beleza e rotina. Sem complicação: você descobre aqui e confere todos os detalhes direto na loja oficial.
        </p>

        <div className="how-it-works">
          <span>
            <CheckCircle2 className="w-3.5 h-3.5 stroke-[2.5]" />
            <span>Garimpo manual</span>
          </span>
          <span>
            <CheckCircle2 className="w-3.5 h-3.5 stroke-[2.5]" />
            <span>Links verificados</span>
          </span>
          <span>
            <CheckCircle2 className="w-3.5 h-3.5 stroke-[2.5]" />
            <span>Transparência sempre</span>
          </span>
        </div>
      </div>
    </section>
  );
};
