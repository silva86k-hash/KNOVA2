import React from 'react';
import {
  Instagram,
  Youtube,
  Facebook,
  MessageCircle,
  Users,
  Mail,
  ArrowUpRight,
} from 'lucide-react';

export const SiteFooter: React.FC = () => {
  return (
    <footer className="site-footer section-rail">
      <div className="footer-top">
        {/* Brand Logo */}
        <a className="brand brand-logo" href="/" aria-label="Achadinhos Knova">
          <img
            src="https://horizons-cdn.hostinger.com/b53be361-6424-4a2a-a21f-1526b471c110/d8b67f607095c379acca779a3fa1e866.png"
            alt="Achadinhos Knova"
            width="120"
            height="120"
            className="w-[120px] h-auto object-contain"
          />
        </a>

        {/* Social Links Row */}
        <div className="footer-socials">
          <a
            href="https://www.instagram.com/achadinhosknova/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Instagram className="w-4 h-4" />
            <span>Instagram</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </a>

          <a
            href="https://www.tiktok.com/@achadinhos.knova"
            target="_blank"
            rel="noopener noreferrer"
          >
            <span className="font-black text-xs">TT</span>
            <span>TikTok</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </a>

          <a
            href="https://www.youtube.com/@achadinhosknova"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Youtube className="w-4 h-4" />
            <span>YouTube</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </a>

          <a
            href="https://www.facebook.com/profile.php?id=61594139379934"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Facebook className="w-4 h-4" />
            <span>Facebook</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </a>

          <a
            href="https://whatsapp.com/channel/0029VbCyhBJE50UZihrdNw42"
            target="_blank"
            rel="noopener noreferrer"
          >
            <MessageCircle className="w-4 h-4" />
            <span>Canal WhatsApp</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </a>

          <a
            href="https://chat.whatsapp.com/EWgStsxcdoPJlrrkhW6Nwh"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Users className="w-4 h-4" />
            <span>Grupo de ofertas</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>

      {/* Contact Email */}
      <div className="contact-email">
        <Mail className="w-4 h-4 stroke-[2]" />
        <span>Contato:</span>
        <a href="mailto:achadinhosknova@gmail.com">achadinhosknova@gmail.com</a>
      </div>

      {/* Affiliate Transparency Disclosure */}
      <div className="affiliate-disclosure">
        <strong>Transparência no garimpo</strong>
        <p>
          A Knova é uma vitrine de indicações, não uma loja. Links identificados como afiliados podem gerar uma comissão para a Knova, sem custo adicional para você. As imagens são ilustrativas; preços, condições e disponibilidade devem ser consultados nas lojas oficiais.
        </p>
      </div>

      {/* Footer Bottom */}
      <div className="footer-bottom">
        <span>© {new Date().getFullYear()} Achadinhos Knova. Feito para descobrir.</span>
        <span>Eu garimpo. Você recebe. ♥</span>
      </div>
    </footer>
  );
};
