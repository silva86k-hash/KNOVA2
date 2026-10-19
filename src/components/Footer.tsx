import React from 'react';
import {
  Heart,
  ArrowUp,
  MessageCircle,
  Instagram,
  Sparkles,
} from 'lucide-react';
import { useAffiliate } from '../context/AffiliateContext';
import { KnovaLogo, KnovaHandlePill, KnovaSeal } from './KnovaBadges';

export const Footer: React.FC = () => {
  const { settings, setSelectedCategory, setActiveTab } = useAffiliate();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#FFFDF9] text-[#000000] pt-12 pb-24 md:pb-12 border-t-3 border-[#000000] text-xs">
      <div className="max-w-7xl mx-auto px-4 space-y-10">
        {/* Top Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8">
          {/* Brand info (4 cols) */}
          <div className="lg:col-span-5 space-y-4">
            <KnovaLogo size="lg" />

            <div className="pt-1">
              <KnovaHandlePill />
            </div>

            <p className="text-slate-700 leading-relaxed text-xs font-semibold max-w-md">
              <strong>KNOVA • Achadinhos femininos, ofertas e curadoria.</strong><br />
              "Eu garimpo. Você recebe." Filtramos a internet inteira para trazer apenas os produtos que realmente valem a pena, com o menor preço e frete grátis.
            </p>

            <div className="flex items-center gap-2 pt-1">
              <a
                href={settings.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 bg-[#00CDBA] hover:bg-[#00baa8] text-black border-2 border-black font-black px-3 py-1.5 rounded-xl shadow-[2px_2px_0px_#000] transition-transform hover:-translate-y-0.5"
              >
                <MessageCircle className="w-4 h-4 stroke-[2.5]" />
                <span>Canal WhatsApp</span>
              </a>

              <a
                href={settings.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 bg-[#FFD6E7] hover:bg-[#ffb5d4] text-black border-2 border-black font-black px-3 py-1.5 rounded-xl shadow-[2px_2px_0px_#000] transition-transform hover:-translate-y-0.5"
              >
                <Instagram className="w-4 h-4 text-[#FF4D8D] stroke-[2.5]" />
                <span>@achadinhosknova</span>
              </a>
            </div>
          </div>

          {/* Quick Links (3 cols) */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="font-black uppercase tracking-wider text-xs border-b-2 border-black pb-1 inline-block">
              Achadinhos por Categoria
            </h4>
            <ul className="space-y-2 font-bold text-slate-800">
              <li>
                <button
                  onClick={() => {
                    setSelectedCategory('achadinhos');
                    setActiveTab('todas');
                    scrollToTop();
                  }}
                  className="hover:text-[#FF4D8D] transition-colors"
                >
                  ♥ Achadinhos Virais
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    setSelectedCategory('moda');
                    setActiveTab('todas');
                    scrollToTop();
                  }}
                  className="hover:text-[#FF4D8D] transition-colors"
                >
                  ♥ Moda, Looks & Tênis
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    setSelectedCategory('beleza');
                    setActiveTab('todas');
                    scrollToTop();
                  }}
                  className="hover:text-[#FF4D8D] transition-colors"
                >
                  ♥ Beleza & Cuidados
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    setSelectedCategory('casa-cozinha');
                    setActiveTab('todas');
                    scrollToTop();
                  }}
                  className="hover:text-[#FF4D8D] transition-colors"
                >
                  ♥ Casa & Organização
                </button>
              </li>
            </ul>
          </div>

          {/* Official Seals Display (4 cols) */}
          <div className="lg:col-span-4 space-y-3">
            <h4 className="font-black uppercase tracking-wider text-xs border-b-2 border-black pb-1 inline-block">
              Selos Oficiais de Curadoria
            </h4>
            <p className="text-xs text-slate-700 font-medium">
              Todo achadinho divulgado passa pelo nosso crivo de qualidade e preço justo.
            </p>
            <div className="flex items-center gap-3 pt-2">
              <KnovaSeal type="knova-aprova" size="md" />
              <KnovaSeal type="achadinho-dia" size="md" />
              <KnovaSeal type="eu-compraria" size="md" />
            </div>
          </div>
        </div>

        {/* Legal Disclaimer */}
        <div className="pt-6 border-t-2 border-black/15 space-y-3 text-[11px] text-slate-600 leading-relaxed font-medium">
          <p>
            <strong>Aviso de Transparência:</strong> O <strong>KNOVA (@achadinhosknova)</strong> é uma plataforma independente de curadoria de achadinhos e cupons. Não comercializamos nenhum produto diretamente. Todas as compras são concluídas nos ambientes seguros e oficiais das lojas parceiras (Shopee, Amazon, Mercado Livre, etc.). Ao comprar através dos nossos links, a Knova pode receber uma pequena comissão sem qualquer custo extra para você.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-3 border-t border-black/10">
            <div className="flex items-center gap-1.5 font-bold text-black">
              <span>© {new Date().getFullYear()} KNOVA • Eu garimpo. Você recebe. Feito com</span>
              <Heart className="w-3.5 h-3.5 fill-[#FF4D8D] text-black" />
              <span>para economizar com estilo.</span>
            </div>

            <button
              onClick={scrollToTop}
              className="bg-black hover:bg-slate-800 text-white font-black px-3.5 py-1.5 rounded-xl border border-black shadow-[2px_2px_0px_#00CDBA] flex items-center gap-1.5 transition-colors"
            >
              <span>Voltar ao topo</span>
              <ArrowUp className="w-3.5 h-3.5 stroke-[3]" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
