import React from 'react';
import { ShieldCheck, Star, Heart, Search, ShoppingBag } from 'lucide-react';

export type SealType = 'knova-aprova' | 'achadinho-dia' | 'eu-compraria' | 'garimpo-knova' | 'dica-knova';

interface KnovaSealProps {
  type: SealType;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export const KnovaSeal: React.FC<KnovaSealProps> = ({ type, size = 'md', className = '' }) => {
  const sizeClasses = {
    sm: 'w-12 h-12 text-[8px]',
    md: 'w-16 h-16 text-[10px]',
    lg: 'w-20 h-20 text-xs',
  };

  const iconSizes = {
    sm: 'w-4 h-4',
    md: 'w-6 h-6',
    lg: 'w-7 h-7',
  };

  switch (type) {
    case 'knova-aprova':
      return (
        <div
          className={`relative rounded-full bg-[#FFFDF9] border-[2.5px] border-[#00CDBA] shadow-[2px_2px_0px_#000000] flex flex-col items-center justify-center p-1 text-center shrink-0 ${sizeClasses[size]} ${className}`}
          title="KNOVA Aprova - Selo Oficial de Curadoria"
        >
          <span className="font-extrabold tracking-wider text-[#000000] leading-none uppercase">
            KNOVA
          </span>
          <div className="my-0.5 text-[#00CDBA]">
            <ShieldCheck className={`${iconSizes[size]} fill-[#00CDBA]/20 stroke-[#000000] stroke-[2.2]`} />
          </div>
          <span className="font-black tracking-wider text-[#000000] leading-none uppercase">
            APROVA
          </span>
        </div>
      );

    case 'achadinho-dia':
      return (
        <div
          className={`relative rounded-full bg-[#FFFDF9] border-[2.5px] border-[#FFD93B] shadow-[2px_2px_0px_#000000] flex flex-col items-center justify-center p-1 text-center shrink-0 ${sizeClasses[size]} ${className}`}
          title="Achadinho do Dia - Selo Oficial"
        >
          <span className="font-extrabold tracking-tight text-[#000000] leading-none uppercase text-[8px]">
            ACHADINHO
          </span>
          <div className="my-0.5 text-[#FFD93B]">
            <Star className={`${iconSizes[size]} fill-[#FFD93B] stroke-[#000000] stroke-[2]`} />
          </div>
          <span className="font-black tracking-wider text-[#000000] leading-none uppercase text-[9px]">
            DO DIA
          </span>
        </div>
      );

    case 'eu-compraria':
      return (
        <div
          className={`relative rounded-full bg-[#FFFDF9] border-[2.5px] border-[#FF4D8D] shadow-[2px_2px_0px_#000000] flex flex-col items-center justify-center p-1 text-center shrink-0 ${sizeClasses[size]} ${className}`}
          title="Eu Compraria! - Selo de Recomendação"
        >
          <span className="font-extrabold tracking-tight text-[#000000] leading-none uppercase text-[8px]">
            EU
          </span>
          <div className="my-0.5 text-[#FF4D8D] flex items-center justify-center">
            <Heart className={`${iconSizes[size]} fill-[#FF4D8D] stroke-[#000000] stroke-[2]`} />
          </div>
          <span className="font-black tracking-wider text-[#000000] leading-none uppercase text-[8px]">
            COMPRARIA
          </span>
        </div>
      );

    case 'garimpo-knova':
      return (
        <div
          className={`relative rounded-full bg-[#FFFDF9] border-[2.5px] border-[#00CDBA] shadow-[2px_2px_0px_#000000] flex flex-col items-center justify-center p-1 text-center shrink-0 ${sizeClasses[size]} ${className}`}
          title="Garimpo Knova - Filtro de Qualidade"
        >
          <span className="font-extrabold tracking-tight text-[#000000] leading-none uppercase text-[8px]">
            GARIMPO
          </span>
          <div className="my-0.5 text-[#000000]">
            <Search className={`${iconSizes[size]} stroke-[#000000] stroke-[2.5]`} />
          </div>
          <span className="font-black tracking-wider text-[#00CDBA] leading-none uppercase text-[8px]">
            KNOVA
          </span>
        </div>
      );

    case 'dica-knova':
      return (
        <div className="inline-flex items-center gap-1 bg-[#FFD93B] border-2 border-[#000000] px-2.5 py-0.5 rounded-full text-xs font-black shadow-[2px_2px_0px_#000000] text-black uppercase">
          <span>💡 Dica KNOVA</span>
        </div>
      );
  }
};

/**
 * Pílula preta com o arroba oficial da marca Knova conforme manual
 */
export const KnovaHandlePill: React.FC<{ className?: string }> = ({ className = '' }) => {
  return (
    <a
      href="https://www.instagram.com/achadinhosknova/"
      target="_blank"
      rel="noopener noreferrer"
      className={`inline-flex items-center gap-1.5 bg-[#000000] hover:bg-[#1f1f1f] text-white px-3 py-1 rounded-full text-xs font-extrabold tracking-wider transition-transform hover:scale-105 active:scale-95 shadow-[2px_2px_0px_#FF4D8D] ${className}`}
    >
      <span className="text-[#FF4D8D]">♥</span>
      <span>@ACHADINHOSKNOVA</span>
    </a>
  );
};

/**
 * Logotipo oficial KNOVA com slogan "eu garimpo. você recebe."
 */
export const KnovaLogo: React.FC<{ size?: 'sm' | 'md' | 'lg' }> = ({ size = 'md' }) => {
  return (
    <div className="flex items-center gap-2 group select-none">
      <div className="relative">
        {/* Heart doodle floating */}
        <span className="absolute -top-3 -left-3 text-[#FF4D8D] font-black text-lg rotate-[-15deg] group-hover:scale-125 transition-transform">
          ♥
        </span>

        {/* KNOVA bold black title with pop stroke */}
        <div className="flex flex-col">
          <div className="flex items-baseline gap-1">
            <h1 className="text-3xl sm:text-4xl font-black italic tracking-tighter text-[#000000] font-montserrat uppercase transform -rotate-1">
              KNOVA
            </h1>
            <span className="w-2.5 h-2.5 rounded-full bg-[#00CDBA] inline-block mb-1 border border-black shadow-[1px_1px_0px_#000]" />
          </div>

          {/* Hand-drawn style handwritten signature */}
          <span className="text-[11px] sm:text-xs font-semibold text-[#000000] -mt-1 tracking-tight lowercase">
            eu garimpo. você recebe.
          </span>
        </div>
      </div>
    </div>
  );
};
