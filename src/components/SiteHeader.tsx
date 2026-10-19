import React, { useState } from 'react';
import { Instagram, ArrowUpRight, Heart, Settings, Menu, X } from 'lucide-react';
import { useAffiliate } from '../context/AffiliateContext';

export const SiteHeader: React.FC = () => {
  const { favorites, setIsFavoritesDrawerOpen, setIsAdminModalOpen } = useAffiliate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="site-header">
      <div className="header-inner">
        {/* Brand Logo */}
        <a className="brand brand-logo" href="/" aria-label="Achadinhos Knova, início">
          <img
            src="https://horizons-cdn.hostinger.com/b53be361-6424-4a2a-a21f-1526b471c110/d8b67f607095c379acca779a3fa1e866.png"
            alt="Achadinhos Knova"
            width="120"
            height="120"
            className="w-[120px] h-auto object-contain"
          />
        </a>

        {/* Navigation Links */}
        <nav className="nav-links hidden md:flex" aria-label="Navegação principal">
          <a href="#ofertas">Ofertas</a>
          <a href="#achadinhos">Achadinhos</a>
          <a href="#lojas">Onde garimpar</a>
          <a href="#comunidade">Comunidade</a>
          <a href="#sobre">A Knova</a>
        </nav>

        {/* Right side actions */}
        <div className="flex items-center gap-3">
          {/* Instagram Button */}
          <a
            className="header-instagram hidden sm:flex"
            href="https://www.instagram.com/achadinhosknova/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Instagram className="w-4 h-4 text-[#d92869]" />
            <span>Vem pro Instagram</span>
            <ArrowUpRight className="w-4 h-4" />
          </a>

          {/* Favorites Wishlist */}
          <button
            onClick={() => setIsFavoritesDrawerOpen(true)}
            className="relative p-2.5 rounded-lg border-[1.5px] border-black bg-white hover:bg-[#ffd6e7] text-black transition-colors flex items-center justify-center"
            title="Meus Favoritos"
            aria-label="Meus Favoritos"
          >
            <Heart className="w-4 h-4 fill-[#ff4d8d] text-black" />
            {favorites.length > 0 && (
              <span className="absolute -top-1.5 -right-1.5 bg-[#ff4d8d] text-white border border-black text-[9px] font-black w-4 h-4 rounded-full flex items-center justify-center">
                {favorites.length}
              </span>
            )}
          </button>

          {/* Admin Curator Button */}
          <button
            onClick={() => setIsAdminModalOpen(true)}
            className="p-2 rounded-lg border-[1.5px] border-black bg-[#ffd93b] hover:bg-[#ffe26b] text-black text-xs font-bold flex items-center gap-1 shadow-[2px_2px_0px_#000] transition-transform hover:-translate-y-0.5"
            title="Painel de Afiliado & Gerenciador"
          >
            <Settings className="w-4 h-4 stroke-[2.2]" />
            <span className="hidden lg:inline">Gerenciar</span>
          </button>

          {/* Mobile Menu Button */}
          <button
            className="menu-toggle md:hidden p-2 rounded-lg border border-slate-300"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Abrir menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-slate-200 bg-white px-6 py-4 space-y-3 font-semibold text-sm">
          <a
            href="#ofertas"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-1 hover:text-[#d92869]"
          >
            Ofertas
          </a>
          <a
            href="#achadinhos"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-1 hover:text-[#d92869]"
          >
            Achadinhos
          </a>
          <a
            href="#lojas"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-1 hover:text-[#d92869]"
          >
            Onde garimpar
          </a>
          <a
            href="#comunidade"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-1 hover:text-[#d92869]"
          >
            Comunidade
          </a>
          <a
            href="#sobre"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-1 hover:text-[#d92869]"
          >
            A Knova
          </a>
          <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
            <a
              href="https://www.instagram.com/achadinhosknova/"
              target="_blank"
              rel="noopener noreferrer"
              className="header-instagram flex items-center gap-2 text-xs font-bold"
            >
              <Instagram className="w-4 h-4 text-[#d92869]" />
              <span>@achadinhosknova</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
