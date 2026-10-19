import React from 'react';
import {
  Search,
  X,
  Heart,
  Settings,
  Sparkles,
  Smartphone,
  Home,
  Laptop,
  Shirt,
  MessageCircle,
  Instagram,
  Zap,
  Tag,
} from 'lucide-react';
import { useAffiliate } from '../context/AffiliateContext';
import { CATEGORIES_DATA } from '../data/stores';
import { CategoryId } from '../types';
import { KnovaLogo, KnovaHandlePill } from './KnovaBadges';

export const Header: React.FC = () => {
  const {
    searchQuery,
    setSearchQuery,
    selectedCategory,
    setSelectedCategory,
    favorites,
    setIsFavoritesDrawerOpen,
    setIsAdminModalOpen,
    settings,
    activeTab,
    setActiveTab,
  } = useAffiliate();

  return (
    <header className="sticky top-0 z-40 bg-[#FFFDF9] border-b-[2.5px] border-[#000000] shadow-[0px_4px_0px_rgba(0,0,0,0.06)]">
      {/* Top Banner Alert in Knova Aqua & Yellow */}
      <div className="bg-[#00CDBA] border-b-2 border-[#000000] text-[#000000] text-xs py-1.5 px-4 font-extrabold tracking-wide">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          <div className="flex items-center gap-2 overflow-hidden text-ellipsis whitespace-nowrap">
            <span className="bg-[#FFD93B] border border-[#000000] text-[#000000] text-[10px] font-black px-2 py-0.5 rounded-full uppercase shadow-[1px_1px_0px_#000000]">
              CURADORIA
            </span>
            <span className="truncate font-bold">
              "Eu garimpo. Você recebe." • Só produtos testados que realmente valem a pena! ♥
            </span>
          </div>

          <div className="hidden sm:flex items-center gap-3 shrink-0">
            <KnovaHandlePill />
          </div>
        </div>
      </div>

      {/* Main Header Container */}
      <div className="max-w-7xl mx-auto px-4 py-3 sm:py-3.5">
        <div className="flex items-center justify-between gap-3 md:gap-6">
          {/* Official Knova Logo */}
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              setSelectedCategory('todas');
              setActiveTab('todas');
              setSearchQuery('');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="shrink-0"
          >
            <KnovaLogo />
          </a>

          {/* Search Bar - High Contrast Scrapbook Style */}
          <div className="flex-1 max-w-lg relative">
            <div className="relative flex items-center">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Buscar achadinho, tênis, garrafa, fone, make..."
                className="w-full bg-[#FFFFFF] text-[#000000] text-xs sm:text-sm pl-10 pr-9 py-2.5 rounded-full border-2 border-[#000000] shadow-[3px_3px_0px_#000000] focus:shadow-[4px_4px_0px_#00CDBA] focus:outline-none transition-all placeholder:text-slate-400 font-semibold"
              />
              <Search className="w-4 h-4 text-[#000000] absolute left-3.5 pointer-events-none stroke-[2.5]" />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 p-1 rounded-full text-slate-500 hover:text-black hover:bg-slate-100"
                  aria-label="Limpar busca"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>

          {/* Actions & Channels */}
          <div className="flex items-center gap-2 shrink-0">
            {/* WhatsApp Canal Button */}
            <a
              href={settings.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden lg:flex items-center gap-1.5 bg-[#00CDBA] hover:bg-[#00baa8] text-[#000000] border-2 border-[#000000] text-xs font-black px-3 py-2 rounded-xl shadow-[2.5px_2.5px_0px_#000000] transition-transform hover:-translate-y-0.5 active:translate-y-0"
            >
              <MessageCircle className="w-4 h-4 stroke-[2.5]" />
              <span>Canal WhatsApp</span>
            </a>

            {/* Instagram Profile */}
            <a
              href={settings.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden xl:flex items-center gap-1.5 bg-[#FFD6E7] hover:bg-[#ffbcd7] text-[#000000] border-2 border-[#000000] text-xs font-black px-3 py-2 rounded-xl shadow-[2.5px_2.5px_0px_#000000] transition-transform hover:-translate-y-0.5 active:translate-y-0"
            >
              <Instagram className="w-4 h-4 text-[#FF4D8D] stroke-[2.5]" />
              <span>Instagram</span>
            </a>

            {/* Favorites Wishlist */}
            <button
              onClick={() => setIsFavoritesDrawerOpen(true)}
              className="relative p-2.5 rounded-xl bg-white border-2 border-[#000000] text-[#000000] hover:bg-[#FFD6E7] shadow-[2.5px_2.5px_0px_#000000] transition-transform hover:-translate-y-0.5 active:translate-y-0"
              title="Meus Favoritos"
            >
              <Heart className="w-4 h-4 fill-[#FF4D8D] text-[#000000]" />
              {favorites.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-[#FF4D8D] text-white border-2 border-[#000000] text-[10px] font-black w-5 h-5 rounded-full flex items-center justify-center shadow-[1px_1px_0px_#000000]">
                  {favorites.length}
                </span>
              )}
            </button>

            {/* Admin Curator Button */}
            <button
              onClick={() => setIsAdminModalOpen(true)}
              className="flex items-center gap-1.5 bg-[#FFD93B] hover:bg-[#f6cd24] text-[#000000] border-2 border-[#000000] text-xs font-black px-3 py-2 rounded-xl shadow-[2.5px_2.5px_0px_#000000] transition-transform hover:-translate-y-0.5 active:translate-y-0"
              title="Painel de Afiliado e Links"
            >
              <Settings className="w-4 h-4 stroke-[2.5]" />
              <span className="hidden sm:inline">Gerenciar</span>
            </button>
          </div>
        </div>

        {/* Secondary Category Pills - Knova Scrapbook Style */}
        <div className="flex items-center gap-2 pt-3 overflow-x-auto no-scrollbar scroll-smooth">
          <button
            onClick={() => {
              setActiveTab('todas');
              setSelectedCategory('todas');
            }}
            className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-black uppercase tracking-wide whitespace-nowrap border-2 border-[#000000] transition-all ${
              activeTab === 'todas' && selectedCategory === 'todas'
                ? 'bg-[#00CDBA] text-[#000000] shadow-[2.5px_2.5px_0px_#000000] scale-102'
                : 'bg-white text-slate-700 hover:bg-[#FFD6E7] shadow-[1.5px_1.5px_0px_#000000]'
            }`}
          >
            <span>♥ Todos os Achadinhos</span>
          </button>

          <button
            onClick={() => setActiveTab('relampago')}
            className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-black uppercase tracking-wide whitespace-nowrap border-2 border-[#000000] transition-all ${
              activeTab === 'relampago'
                ? 'bg-[#FF4D8D] text-white shadow-[2.5px_2.5px_0px_#000000] scale-102'
                : 'bg-[#FFD6E7] text-[#000000] hover:bg-[#ffb6d5] shadow-[1.5px_1.5px_0px_#000000]'
            }`}
          >
            <Zap className="w-3.5 h-3.5 fill-[#FFD93B] text-black stroke-[2]" />
            <span>Achadinho Relâmpago</span>
          </button>

          <button
            onClick={() => setActiveTab('cupons')}
            className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-black uppercase tracking-wide whitespace-nowrap border-2 border-[#000000] transition-all ${
              activeTab === 'cupons'
                ? 'bg-[#FFD93B] text-[#000000] shadow-[2.5px_2.5px_0px_#000000] scale-102'
                : 'bg-white text-slate-800 hover:bg-[#FFD93B]/40 shadow-[1.5px_1.5px_0px_#000000]'
            }`}
          >
            <Tag className="w-3.5 h-3.5 text-black stroke-[2.5]" />
            <span>Cupons Testados</span>
          </button>

          <div className="h-5 w-[2px] bg-black/20 mx-1 shrink-0" />

          {CATEGORIES_DATA.filter((c) => c.id !== 'todas').map((cat) => {
            const isSelected = selectedCategory === cat.id && activeTab === 'todas';
            return (
              <button
                key={cat.id}
                onClick={() => {
                  setSelectedCategory(cat.id as CategoryId);
                  setActiveTab('todas');
                }}
                className={`flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-bold whitespace-nowrap border-2 border-[#000000] transition-all ${
                  isSelected
                    ? 'bg-[#000000] text-white shadow-[2.5px_2.5px_0px_#00CDBA]'
                    : 'bg-white text-slate-700 hover:bg-slate-100 shadow-[1.5px_1.5px_0px_#000000]'
                }`}
              >
                <span>{cat.name}</span>
              </button>
            );
          })}
        </div>
      </div>
    </header>
  );
};
