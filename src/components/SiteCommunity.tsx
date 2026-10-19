import React from 'react';
import {
  Instagram,
  Youtube,
  Facebook,
  MessageCircle,
  Users,
  ArrowUpRight,
  Heart,
} from 'lucide-react';

export const SiteCommunity: React.FC = () => {
  return (
    <section id="comunidade" className="community">
      <div className="community-inner">
        <div className="community-note">💌 AMIGA, NÃO SOME!</div>

        <h2>
          O GARIMPO CONTINUA
          <br />
          <span>EM TODO LUGAR.</span>
        </h2>

        <p>
          Escolha o seu cantinho favorito e fique por dentro de cada achadinho, dica e oferta.
        </p>

        <div className="social-grid">
          {/* Instagram */}
          <a
            className="social-tile social-ig"
            href="https://www.instagram.com/achadinhosknova/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <span className="social-icon">
              <Instagram className="w-5 h-5" />
            </span>
            <span className="social-name">Instagram</span>
            <span className="social-handle">@achadinhosknova</span>
            <ArrowUpRight className="w-4 h-4 social-arrow" />
          </a>

          {/* TikTok */}
          <a
            className="social-tile social-tt"
            href="https://www.tiktok.com/@achadinhos.knova"
            target="_blank"
            rel="noopener noreferrer"
          >
            <span className="social-icon">
              <span className="font-black text-sm">TT</span>
            </span>
            <span className="social-name">TikTok</span>
            <span className="social-handle">@achadinhos.knova</span>
            <ArrowUpRight className="w-4 h-4 social-arrow" />
          </a>

          {/* YouTube */}
          <a
            className="social-tile social-yt"
            href="https://www.youtube.com/@achadinhosknova"
            target="_blank"
            rel="noopener noreferrer"
          >
            <span className="social-icon">
              <Youtube className="w-5 h-5" />
            </span>
            <span className="social-name">YouTube</span>
            <span className="social-handle">@achadinhosknova</span>
            <ArrowUpRight className="w-4 h-4 social-arrow" />
          </a>

          {/* Facebook */}
          <a
            className="social-tile social-fb"
            href="https://www.facebook.com/profile.php?id=61594139379934"
            target="_blank"
            rel="noopener noreferrer"
          >
            <span className="social-icon">
              <Facebook className="w-5 h-5" />
            </span>
            <span className="social-name">Facebook</span>
            <span className="social-handle">Achadinhos Knova</span>
            <ArrowUpRight className="w-4 h-4 social-arrow" />
          </a>

          {/* WhatsApp Canal */}
          <a
            className="social-tile social-wc"
            href="https://whatsapp.com/channel/0029VbCyhBJE50UZihrdNw42"
            target="_blank"
            rel="noopener noreferrer"
          >
            <span className="social-icon">
              <MessageCircle className="w-5 h-5" />
            </span>
            <span className="social-name">Canal WhatsApp</span>
            <span className="social-handle">Receba os achadinhos</span>
            <ArrowUpRight className="w-4 h-4 social-arrow" />
          </a>

          {/* WhatsApp Grupo */}
          <a
            className="social-tile social-wg"
            href="https://chat.whatsapp.com/EWgStsxcdoPJlrrkhW6Nwh"
            target="_blank"
            rel="noopener noreferrer"
          >
            <span className="social-icon">
              <Users className="w-5 h-5" />
            </span>
            <span className="social-name">Grupo de ofertas</span>
            <span className="social-handle">Receba as ofertas em primeira mão</span>
            <ArrowUpRight className="w-4 h-4 social-arrow" />
          </a>
        </div>
      </div>

      <Heart className="community-heart" />
    </section>
  );
};
