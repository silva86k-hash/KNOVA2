import React from 'react';
import {
  Heart,
  ArrowRight,
  MessageCircle,
  Instagram,
  Sparkles,
  ShoppingBag,
  Star,
} from 'lucide-react';
import { useAffiliate } from '../context/AffiliateContext';
import { STORES_DATA } from '../data/stores';
import { StoreId } from '../types';
import { KnovaSeal, KnovaHandlePill } from './KnovaBadges';

export const HeroBanner: React.FC = () => {
  const {
    selectedStore,
    setSelectedStore,
    setActiveTab,
    settings,
    deals,
  } = useAffiliate();

  const storesList = Object.keys(STORES_DATA) as StoreId[];

  return (
    <section className="relative overflow-hidden pt-4 pb-4 px-4">
      <div className="max-w-7xl mx-auto space-y-4">
        {/* Main Scrapbook Collage Row */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
          {/* Main Showcase Banner (8 cols) - Scrapbook Collage Style */}
          <div className="lg:col-span-8 relative rounded-3xl bg-[#00CDBA] border-3 border-[#000000] p-6 sm:p-8 shadow-[6px_6px_0px_#000000] overflow-hidden flex flex-col justify-between min-h-[300px]">
            {/* Washi Tape Corner Decoration */}
            <div className="washi-tape-pink" />

            {/* Background Cute Doodles & Shapes */}
            <div className="absolute top-4 right-6 text-white/20 font-black text-7xl select-none pointer-events-none rotate-12">
              ♥
            </div>
            <div className="absolute bottom-2 right-24 text-[#FFD93B]/30 font-black text-6xl select-none pointer-events-none -rotate-12">
              ★
            </div>

            {/* Top row with official tags and seals */}
            <div className="relative z-10 flex flex-wrap items-center justify-between gap-3 mb-4">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="bg-[#FFD93B] text-[#000000] border-2 border-[#000000] text-[11px] font-black px-3 py-1 rounded-full uppercase shadow-[2px_2px_0px_#000000] tracking-wide">
                  ✦ Curadoria Exclusiva
                </span>
                <KnovaHandlePill />
              </div>

              {/* Floating official seal */}
              <div className="hidden sm:block">
                <KnovaSeal type="knova-aprova" size="md" />
              </div>
            </div>

            {/* Headline with Yellow Stripe callout */}
            <div className="relative z-10 space-y-3">
              <div className="inline-block bg-[#FFD93B] border-2 border-[#000000] px-3.5 py-1 rounded-lg shadow-[3px_3px_0px_#000000] -rotate-1">
                <span className="text-xs sm:text-sm font-black text-[#000000] tracking-tight uppercase">
                  ACHADINHOS QUE VOCÊ VAI AMAR!
                </span>
              </div>

              <h1 className="text-2xl sm:text-4xl lg:text-5xl font-black tracking-tight text-[#000000] uppercase leading-[1.08] font-montserrat">
                EU GARIMPO. <br />
                <span className="bg-white px-2 py-0.5 rounded-lg border-2 border-black shadow-[3px_3px_0px_#000000] inline-block mt-1 text-[#FF4D8D]">
                  VOCÊ RECEBE.
                </span>
              </h1>

              <p className="text-xs sm:text-sm font-bold text-[#000000] max-w-lg leading-relaxed bg-[#FFFDF9]/90 border border-black/30 p-2.5 rounded-xl shadow-xs">
                "Eu filtro só o que realmente vale a pena." Roupas, casa, beleza, fones e utilidades fofas com menor preço e frete grátis!
              </p>
            </div>

            {/* CTAs Row */}
            <div className="relative z-10 pt-5 flex flex-wrap items-center gap-3">
              <button
                onClick={() => {
                  setActiveTab('relampago');
                  const el = document.getElementById('deals-section');
                  el?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="bg-[#FF4D8D] hover:bg-[#ff337b] text-white font-black text-xs sm:text-sm px-5 py-3 rounded-2xl border-2 border-[#000000] shadow-[3.5px_3.5px_0px_#000000] flex items-center gap-2 transition-transform hover:-translate-y-0.5 active:translate-y-0 cursor-pointer"
              >
                <span>VER ACHADINHOS DO DIA</span>
                <ArrowRight className="w-4 h-4 stroke-[3]" />
              </button>

              <button
                onClick={() => {
                  setActiveTab('cupons');
                  const el = document.getElementById('cupons-section');
                  el?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="bg-white hover:bg-slate-50 text-[#000000] font-black text-xs sm:text-sm px-4 py-3 rounded-2xl border-2 border-[#000000] shadow-[3.5px_3.5px_0px_#000000] transition-transform hover:-translate-y-0.5 active:translate-y-0 cursor-pointer flex items-center gap-1.5"
              >
                <Sparkles className="w-4 h-4 text-[#FFD93B] fill-[#FFD93B] stroke-black" />
                <span>CUPONS TESTADOS</span>
              </button>
            </div>
          </div>

          {/* Right Card: VIP Community Box (4 cols) */}
          <div className="lg:col-span-4 rounded-3xl bg-[#FFD6E7] border-3 border-[#000000] p-6 shadow-[6px_6px_0px_#000000] flex flex-col justify-between relative">
            <div className="washi-tape-aqua" />

            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="bg-[#FF4D8D] text-white border-2 border-[#000000] text-[10px] font-black px-2.5 py-0.5 rounded-full uppercase shadow-[1.5px_1.5px_0px_#000000] flex items-center gap-1">
                  <span>♥ GRUPO VIP</span>
                </span>
                <span className="text-[10px] font-bold text-black bg-white px-2 py-0.5 rounded-full border border-black">
                  100% Gratuito
                </span>
              </div>

              <h2 className="text-lg sm:text-xl font-black text-[#000000] uppercase leading-tight mb-2">
                MENINA, VOCÊ PRECISA ENTRAR NO CANAL!
              </h2>

              <p className="text-xs font-semibold text-slate-800 mb-4 leading-relaxed">
                As melhores pechinchas, cupons de frete grátis e bugs de preço avisados primeiro no WhatsApp e Instagram!
              </p>

              {/* Direct Channel Buttons */}
              <div className="space-y-2.5">
                <a
                  href={settings.whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full bg-[#00CDBA] hover:bg-[#00baa8] text-[#000000] font-black text-xs sm:text-sm px-4 py-3 rounded-2xl border-2 border-[#000000] shadow-[3px_3px_0px_#000000] flex items-center justify-between transition-transform hover:-translate-y-0.5 active:translate-y-0"
                >
                  <div className="flex items-center gap-2">
                    <MessageCircle className="w-5 h-5 stroke-[2.5]" />
                    <span>Canal no WhatsApp</span>
                  </div>
                  <span className="text-[10px] bg-white text-black font-extrabold px-1.5 py-0.5 rounded border border-black">
                    Entrar
                  </span>
                </a>

                <a
                  href={settings.instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full bg-white hover:bg-slate-50 text-[#000000] font-black text-xs sm:text-sm px-4 py-3 rounded-2xl border-2 border-[#000000] shadow-[3px_3px_0px_#000000] flex items-center justify-between transition-transform hover:-translate-y-0.5 active:translate-y-0"
                >
                  <div className="flex items-center gap-2">
                    <Instagram className="w-5 h-5 text-[#FF4D8D] stroke-[2.5]" />
                    <span>Seguir no Instagram</span>
                  </div>
                  <ArrowRight className="w-4 h-4 stroke-[2.5]" />
                </a>
              </div>
            </div>

            {/* Official Seals in Row */}
            <div className="pt-4 border-t-2 border-black/20 mt-4 flex items-center justify-around">
              <KnovaSeal type="achadinho-dia" size="sm" />
              <KnovaSeal type="eu-compraria" size="sm" />
              <KnovaSeal type="garimpo-knova" size="sm" />
            </div>
          </div>
        </div>

        {/* Store Chips Filter Bar */}
        <div className="bg-white rounded-2xl p-3 sm:p-4 border-2 border-[#000000] shadow-[4px_4px_0px_#000000]">
          <div className="flex items-center justify-between gap-2 mb-2 px-1">
            <div className="flex items-center gap-1.5">
              <ShoppingBag className="w-4 h-4 text-[#000000] stroke-[2.5]" />
              <h3 className="text-xs font-black text-black uppercase tracking-wider">
                Garimpar por Loja Parceira:
              </h3>
            </div>
            {selectedStore !== 'todas' && (
              <button
                onClick={() => setSelectedStore('todas')}
                className="text-xs text-[#FF4D8D] hover:underline font-extrabold"
              >
                Limpar filtro
              </button>
            )}
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-9 gap-2">
            <button
              onClick={() => setSelectedStore('todas')}
              className={`p-2 rounded-xl text-xs font-black border-2 border-[#000000] flex flex-col items-center justify-center gap-0.5 transition-all ${
                selectedStore === 'todas'
                  ? 'bg-[#000000] text-white shadow-[2px_2px_0px_#00CDBA]'
                  : 'bg-[#FFFDF9] text-black hover:bg-[#FFD6E7] shadow-[1.5px_1.5px_0px_#000000]'
              }`}
            >
              <span>TODAS</span>
              <span className="text-[10px] font-medium opacity-80">{deals.length} itens</span>
            </button>

            {storesList.map((storeKey) => {
              const store = STORES_DATA[storeKey];
              const isSelected = selectedStore === storeKey;
              const count = deals.filter((d) => d.store === storeKey).length;

              return (
                <button
                  key={store.id}
                  onClick={() => setSelectedStore(isSelected ? 'todas' : storeKey)}
                  className={`p-2 rounded-xl text-xs font-extrabold border-2 border-[#000000] flex flex-col items-center justify-center gap-0.5 transition-all relative ${
                    isSelected
                      ? 'bg-[#00CDBA] text-black shadow-[2.5px_2.5px_0px_#000000]'
                      : 'bg-white text-black hover:bg-[#FFD6E7] shadow-[1.5px_1.5px_0px_#000000]'
                  }`}
                >
                  <span className="truncate max-w-full">{store.name.split(' ')[0]}</span>
                  <span className="text-[10px] text-slate-600 font-semibold">{count}</span>
                  {store.badge && (
                    <span className="absolute -top-2 -right-1 bg-[#FFD93B] text-black text-[8px] font-black px-1 rounded-full border border-black uppercase">
                      {store.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
