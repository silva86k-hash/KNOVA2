import React, { useState } from 'react';
import {
  X,
  PlusCircle,
  Link as LinkIcon,
  Settings as SettingsIcon,
  Trash2,
  Download,
  RotateCcw,
  Check,
  Copy,
  ExternalLink,
  Flame,
  ShieldCheck,
  Tag,
  ShoppingBag,
} from 'lucide-react';
import { useAffiliate } from '../context/AffiliateContext';
import { StoreId, CategoryId, Deal } from '../types';
import { STORES_DATA } from '../data/stores';

export const AffiliateAdminModal: React.FC = () => {
  const {
    isAdminModalOpen,
    setIsAdminModalOpen,
    settings,
    updateSettings,
    addDeal,
    deals,
    deleteDeal,
    resetToDefaults,
    buildAffiliateUrl,
    copyLinkToClipboard,
    setToast,
  } = useAffiliate();

  const [activeTab, setActiveTab] = useState<'add' | 'generator' | 'settings' | 'manage' | 'hostinger'>('add');

  // New Deal Form State
  const [newTitle, setNewTitle] = useState('');
  const [newStore, setNewStore] = useState<StoreId>('amazon');
  const [newCategory, setNewCategory] = useState<CategoryId>('achadinhos');
  const [newPriceOld, setNewPriceOld] = useState('');
  const [newPriceCurrent, setNewPriceCurrent] = useState('');
  const [newInstallment, setNewInstallment] = useState('');
  const [newCouponCode, setNewCouponCode] = useState('');
  const [newImageUrl, setNewImageUrl] = useState('');
  const [newAffiliateUrl, setNewAffiliateUrl] = useState('');
  const [newIsFlash, setNewIsFlash] = useState(false);
  const [newIsFreeShipping, setNewIsFreeShipping] = useState(true);

  // Link Generator State
  const [generatorStore, setGeneratorStore] = useState<StoreId>('amazon');
  const [rawLink, setRawLink] = useState('');
  const [generatedLink, setGeneratedLink] = useState('');

  // Settings State
  const [settingsForm, setSettingsForm] = useState(settings);

  if (!isAdminModalOpen) return null;

  const handleAddDealSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim() || !newPriceCurrent) {
      setToast('Por favor, preencha o título e o preço atual.');
      return;
    }

    const priceOldNum = parseFloat(newPriceOld.replace(',', '.')) || parseFloat(newPriceCurrent.replace(',', '.')) * 1.3;
    const priceCurrentNum = parseFloat(newPriceCurrent.replace(',', '.'));

    addDeal({
      title: newTitle.trim(),
      store: newStore,
      storeName: STORES_DATA[newStore]?.name || 'Loja Parceira',
      category: newCategory,
      priceOld: priceOldNum,
      priceCurrent: priceCurrentNum,
      installmentText: newInstallment.trim() || 'em até 3x sem juros',
      couponCode: newCouponCode.trim() ? newCouponCode.trim().toUpperCase() : undefined,
      imageUrl: newImageUrl.trim() || 'https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?auto=format&fit=crop&w=800&q=80',
      affiliateUrl: newAffiliateUrl.trim() || 'https://www.amazon.com.br',
      isFlashDeal: newIsFlash,
      isFreeShipping: newIsFreeShipping,
    });

    // Reset form
    setNewTitle('');
    setNewPriceOld('');
    setNewPriceCurrent('');
    setNewInstallment('');
    setNewCouponCode('');
    setNewImageUrl('');
    setNewAffiliateUrl('');
    setNewIsFlash(false);
  };

  const handleGenerateLink = (e: React.FormEvent) => {
    e.preventDefault();
    if (!rawLink.trim()) return;
    const tagged = buildAffiliateUrl(rawLink.trim(), generatorStore);
    setGeneratedLink(tagged);
  };

  const handleSaveSettings = (e: React.FormEvent) => {
    e.preventDefault();
    updateSettings(settingsForm);
  };

  const handleExportJSON = () => {
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(deals, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute('download', `ofertas-knova-backup-${new Date().toISOString().slice(0, 10)}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
    setToast('Backup JSON exportado com sucesso!');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4">
      <div className="bg-[#FFFDF9] rounded-3xl max-w-4xl w-full overflow-hidden border-3 border-black shadow-[8px_8px_0px_#000000] animate-in fade-in zoom-in-95 duration-200 relative my-6 max-h-[92vh] flex flex-col">
        {/* Header */}
        <div className="bg-[#00CDBA] border-b-2 border-black text-black p-5 sm:p-6 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#FFD93B] border-2 border-black flex items-center justify-center shadow-[1.5px_1.5px_0px_#000]">
              <SettingsIcon className="w-5 h-5 text-black stroke-[2.5]" />
            </div>
            <div>
              <h2 className="text-lg sm:text-xl font-black text-black flex items-center gap-2 uppercase">
                <span>Painel de Curadoria Knova</span>
                <span className="text-[10px] bg-[#FF4D8D] text-white font-black px-2 py-0.5 rounded-full border border-black uppercase">
                  @achadinhosknova
                </span>
              </h2>
              <p className="text-xs font-bold text-slate-800">
                Adicione novos achadinhos, gere links com sua tag e configure seus canais
              </p>
            </div>
          </div>

          <button
            onClick={() => setIsAdminModalOpen(false)}
            className="w-9 h-9 rounded-full bg-white border-2 border-black hover:bg-[#FFD6E7] text-black flex items-center justify-center transition-colors shadow-[1.5px_1.5px_0px_#000]"
          >
            <X className="w-5 h-5 stroke-[2.5]" />
          </button>
        </div>

        {/* Tabs Bar */}
        <div className="bg-[#FFF8FA] px-5 pt-3 border-b-2 border-black flex gap-2 overflow-x-auto shrink-0">
          <button
            onClick={() => setActiveTab('add')}
            className={`flex items-center gap-1.5 px-4 py-2 rounded-t-xl text-xs font-black transition-all border-2 border-b-0 border-black ${
              activeTab === 'add'
                ? 'bg-white text-[#FF4D8D] shadow-[2px_-2px_0px_#000]'
                : 'text-black bg-[#FFD6E7]/50 hover:bg-[#FFD6E7]'
            }`}
          >
            <PlusCircle className="w-4 h-4 stroke-[2.5]" />
            <span>Adicionar Achadinho</span>
          </button>

          <button
            onClick={() => setActiveTab('generator')}
            className={`flex items-center gap-1.5 px-4 py-2 rounded-t-xl text-xs font-black transition-all border-2 border-b-0 border-black ${
              activeTab === 'generator'
                ? 'bg-white text-[#FF4D8D] shadow-[2px_-2px_0px_#000]'
                : 'text-black bg-[#FFD6E7]/50 hover:bg-[#FFD6E7]'
            }`}
          >
            <LinkIcon className="w-4 h-4 stroke-[2.5]" />
            <span>Gerador de Links</span>
          </button>

          <button
            onClick={() => setActiveTab('settings')}
            className={`flex items-center gap-1.5 px-4 py-2 rounded-t-xl text-xs font-black transition-all border-2 border-b-0 border-black ${
              activeTab === 'settings'
                ? 'bg-white text-[#FF4D8D] shadow-[2px_-2px_0px_#000]'
                : 'text-black bg-[#FFD6E7]/50 hover:bg-[#FFD6E7]'
            }`}
          >
            <SettingsIcon className="w-4 h-4 stroke-[2.5]" />
            <span>Tags & Canais</span>
          </button>

          <button
            onClick={() => setActiveTab('manage')}
            className={`flex items-center gap-1.5 px-4 py-2 rounded-t-xl text-xs font-black transition-all border-2 border-b-0 border-black ${
              activeTab === 'manage'
                ? 'bg-white text-[#FF4D8D] shadow-[2px_-2px_0px_#000]'
                : 'text-black bg-[#FFD6E7]/50 hover:bg-[#FFD6E7]'
            }`}
          >
            <ShoppingBag className="w-4 h-4 stroke-[2.5]" />
            <span>Catálogo ({deals.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('hostinger')}
            className={`flex items-center gap-1.5 px-4 py-2 rounded-t-xl text-xs font-black transition-all border-2 border-b-0 border-black ${
              activeTab === 'hostinger'
                ? 'bg-[#FFD93B] text-black shadow-[2px_-2px_0px_#000]'
                : 'text-black bg-[#FFD93B]/40 hover:bg-[#FFD93B]'
            }`}
          >
            <Download className="w-4 h-4 stroke-[2.5]" />
            <span>Enviar para Hostinger</span>
          </button>
        </div>

        {/* Modal Body / Tab Content */}
        <div className="p-6 overflow-y-auto flex-1 space-y-6">
          {/* TAB 1: ADD DEAL */}
          {activeTab === 'add' && (
            <form onSubmit={handleAddDealSubmit} className="space-y-4">
              <div className="bg-amber-50 border border-amber-200/80 rounded-2xl p-4 text-xs text-amber-900">
                <span className="font-bold">Dica do Afiliado:</span> Todas as ofertas cadastradas são salvas no armazenamento local do navegador e aparecem instantaneamente no site.
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                  Título da Promoção *
                </label>
                <input
                  type="text"
                  required
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  placeholder="Ex: Fritadeira Sem Óleo Air Fryer Mondial 4L Inox"
                  className="w-full text-sm border border-slate-300 rounded-xl px-3.5 py-2.5 focus:border-orange-500 focus:outline-none focus:ring-3 focus:ring-orange-500/10"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                    Loja Parceira
                  </label>
                  <select
                    value={newStore}
                    onChange={(e) => setNewStore(e.target.value as StoreId)}
                    className="w-full text-sm border border-slate-300 rounded-xl px-3.5 py-2.5 focus:border-orange-500 focus:outline-none"
                  >
                    <option value="amazon">Amazon Brasil</option>
                    <option value="shopee">Shopee Brasil</option>
                    <option value="mercadolivre">Mercado Livre</option>
                    <option value="magalu">Magazine Luiza</option>
                    <option value="aliexpress">AliExpress</option>
                    <option value="kabum">KaBuM!</option>
                    <option value="casasbahia">Casas Bahia</option>
                    <option value="samsung">Samsung</option>
                    <option value="shein">Shein</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                    Categoria
                  </label>
                  <select
                    value={newCategory}
                    onChange={(e) => setNewCategory(e.target.value as CategoryId)}
                    className="w-full text-sm border border-slate-300 rounded-xl px-3.5 py-2.5 focus:border-orange-500 focus:outline-none"
                  >
                    <option value="achadinhos">Achadinhos Virais</option>
                    <option value="eletronicos">Eletrônicos & Smart</option>
                    <option value="casa-cozinha">Casa & Cozinha</option>
                    <option value="informatica">Informática & Games</option>
                    <option value="moda">Moda & Acessórios</option>
                    <option value="beleza">Beleza & Cuidados</option>
                    <option value="automotivo">Automotivo & Ferramentas</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                    Preço Original (R$)
                  </label>
                  <input
                    type="text"
                    value={newPriceOld}
                    onChange={(e) => setNewPriceOld(e.target.value)}
                    placeholder="399.90"
                    className="w-full text-sm border border-slate-300 rounded-xl px-3.5 py-2.5 focus:border-orange-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                    Preço Promocional (R$) *
                  </label>
                  <input
                    type="text"
                    required
                    value={newPriceCurrent}
                    onChange={(e) => setNewPriceCurrent(e.target.value)}
                    placeholder="199.90"
                    className="w-full text-sm border border-slate-300 rounded-xl px-3.5 py-2.5 focus:border-orange-500 focus:outline-none font-bold text-orange-600"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                    Parcelamento
                  </label>
                  <input
                    type="text"
                    value={newInstallment}
                    onChange={(e) => setNewInstallment(e.target.value)}
                    placeholder="Ex: em até 4x sem juros"
                    className="w-full text-sm border border-slate-300 rounded-xl px-3.5 py-2.5 focus:border-orange-500 focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                    Cupom de Desconto (Opcional)
                  </label>
                  <input
                    type="text"
                    value={newCouponCode}
                    onChange={(e) => setNewCouponCode(e.target.value)}
                    placeholder="Ex: CUPOM10"
                    className="w-full text-sm font-mono uppercase border border-slate-300 rounded-xl px-3.5 py-2.5 focus:border-orange-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                    URL da Imagem do Produto
                  </label>
                  <input
                    type="url"
                    value={newImageUrl}
                    onChange={(e) => setNewImageUrl(e.target.value)}
                    placeholder="https://exemplo.com/foto.jpg"
                    className="w-full text-sm border border-slate-300 rounded-xl px-3.5 py-2.5 focus:border-orange-500 focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                  Seu Link de Afiliado ou Link do Produto *
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    required
                    value={newAffiliateUrl}
                    onChange={(e) => setNewAffiliateUrl(e.target.value)}
                    placeholder="https://www.amazon.com.br/dp/B08KWMMJ81 ou link com sua tag"
                    className="flex-1 text-sm border border-slate-300 rounded-xl px-3.5 py-2.5 focus:border-orange-500 focus:outline-none"
                  />
                  <button
                    type="button"
                    onClick={() => {
                      if (newAffiliateUrl) {
                        setNewAffiliateUrl(buildAffiliateUrl(newAffiliateUrl, newStore));
                        setToast('Tag de afiliado anexada ao link!');
                      }
                    }}
                    className="bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-semibold px-3 py-2 rounded-xl transition-colors shrink-0"
                  >
                    Anexar Minha Tag
                  </button>
                </div>
              </div>

              <div className="flex items-center gap-6 pt-2">
                <label className="flex items-center gap-2 cursor-pointer text-xs font-semibold text-slate-700">
                  <input
                    type="checkbox"
                    checked={newIsFlash}
                    onChange={(e) => setNewIsFlash(e.target.checked)}
                    className="w-4 h-4 text-orange-500 rounded border-slate-300 focus:ring-orange-500"
                  />
                  <span>Destacar como Oferta Relâmpago (com contador)</span>
                </label>

                <label className="flex items-center gap-2 cursor-pointer text-xs font-semibold text-slate-700">
                  <input
                    type="checkbox"
                    checked={newIsFreeShipping}
                    onChange={(e) => setNewIsFreeShipping(e.target.checked)}
                    className="w-4 h-4 text-emerald-600 rounded border-slate-300 focus:ring-emerald-500"
                  />
                  <span>Selo de Frete Grátis</span>
                </label>
              </div>

              <button
                type="submit"
                className="w-full bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-slate-950 font-black text-sm py-3 px-4 rounded-xl shadow-md transition-transform active:scale-[0.99] flex items-center justify-center gap-2"
              >
                <PlusCircle className="w-4 h-4" />
                <span>Publicar Oferta no Site</span>
              </button>
            </form>
          )}

          {/* TAB 2: LINK GENERATOR */}
          {activeTab === 'generator' && (
            <div className="space-y-6">
              <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4">
                <h3 className="text-sm font-bold text-slate-800 mb-1">
                  Gerador Automático de Links de Afiliado
                </h3>
                <p className="text-xs text-slate-500">
                  Cole qualquer link de produto de lojas parceiras e nosso sistema adiciona automaticamente o seu código de rastreamento comissionado.
                </p>
              </div>

              <form onSubmit={handleGenerateLink} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                    Selecione a Loja
                  </label>
                  <select
                    value={generatorStore}
                    onChange={(e) => setGeneratorStore(e.target.value as StoreId)}
                    className="w-full text-sm border border-slate-300 rounded-xl px-3.5 py-2.5 focus:border-orange-500 focus:outline-none"
                  >
                    <option value="amazon">Amazon (Tag: {settings.amazonTag})</option>
                    <option value="shopee">Shopee (ID: {settings.shopeeId})</option>
                    <option value="magalu">Magalu (Tag: {settings.magaluId})</option>
                    <option value="mercadolivre">Mercado Livre</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                    Cole o link normal do produto
                  </label>
                  <input
                    type="url"
                    required
                    value={rawLink}
                    onChange={(e) => setRawLink(e.target.value)}
                    placeholder="https://www.amazon.com.br/dp/B0..."
                    className="w-full text-sm border border-slate-300 rounded-xl px-3.5 py-2.5 focus:border-orange-500 focus:outline-none"
                  />
                </div>

                <button
                  type="submit"
                  className="bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs py-2.5 px-4 rounded-xl transition-colors flex items-center gap-1.5"
                >
                  <LinkIcon className="w-4 h-4 text-orange-400" />
                  <span>Gerar Link Comissionado</span>
                </button>
              </form>

              {generatedLink && (
                <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-4 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-emerald-800 flex items-center gap-1">
                      <Check className="w-4 h-4 text-emerald-600" />
                      Link de Afiliado Pronto:
                    </span>
                    <button
                      onClick={() => copyLinkToClipboard(generatedLink, 'Link de Afiliado')}
                      className="bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold px-3 py-1 rounded-lg flex items-center gap-1"
                    >
                      <Copy className="w-3.5 h-3.5" />
                      <span>Copiar Link</span>
                    </button>
                  </div>
                  <p className="font-mono text-xs text-emerald-950 bg-white/80 p-2.5 rounded-lg border border-emerald-300 break-all">
                    {generatedLink}
                  </p>
                </div>
              )}
            </div>
          )}

          {/* TAB 3: SETTINGS & TAGS */}
          {activeTab === 'settings' && (
            <form onSubmit={handleSaveSettings} className="space-y-4">
              <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4">
                <h3 className="text-sm font-bold text-slate-800 mb-1">
                  Identificadores das Redes de Afiliados
                </h3>
                <p className="text-xs text-slate-500">
                  Insira seus IDs de afiliados para que os botões do site gerem comissões para sua conta.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                    Tag Amazon Associados
                  </label>
                  <input
                    type="text"
                    value={settingsForm.amazonTag}
                    onChange={(e) =>
                      setSettingsForm({ ...settingsForm, amazonTag: e.target.value })
                    }
                    placeholder="ofertasknova-20"
                    className="w-full text-sm border border-slate-300 rounded-xl px-3.5 py-2.5 focus:border-orange-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                    ID Shopee Afiliados
                  </label>
                  <input
                    type="text"
                    value={settingsForm.shopeeId}
                    onChange={(e) =>
                      setSettingsForm({ ...settingsForm, shopeeId: e.target.value })
                    }
                    placeholder="knovaofertas"
                    className="w-full text-sm border border-slate-300 rounded-xl px-3.5 py-2.5 focus:border-orange-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                    Link do Grupo WhatsApp VIP
                  </label>
                  <input
                    type="url"
                    value={settingsForm.whatsappUrl}
                    onChange={(e) =>
                      setSettingsForm({ ...settingsForm, whatsappUrl: e.target.value })
                    }
                    placeholder="https://chat.whatsapp.com/..."
                    className="w-full text-sm border border-slate-300 rounded-xl px-3.5 py-2.5 focus:border-orange-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                    Link do Canal Telegram
                  </label>
                  <input
                    type="url"
                    value={settingsForm.telegramUrl}
                    onChange={(e) =>
                      setSettingsForm({ ...settingsForm, telegramUrl: e.target.value })
                    }
                    placeholder="https://t.me/ofertasknova"
                    className="w-full text-sm border border-slate-300 rounded-xl px-3.5 py-2.5 focus:border-orange-500 focus:outline-none"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs py-2.5 px-4 rounded-xl transition-colors flex items-center gap-1.5"
              >
                <Check className="w-4 h-4 text-emerald-400" />
                <span>Salvar Configurações</span>
              </button>
            </form>
          )}

          {/* TAB 4: MANAGE & BACKUP */}
          {activeTab === 'manage' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between flex-wrap gap-2 pb-2 border-b border-slate-100">
                <span className="text-xs font-bold text-slate-700">
                  Total de Ofertas Cadastradas: {deals.length}
                </span>

                <div className="flex items-center gap-2">
                  <button
                    onClick={handleExportJSON}
                    className="bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold px-3 py-1.5 rounded-lg flex items-center gap-1.5 transition-colors"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Exportar Backup (JSON)</span>
                  </button>

                  <button
                    onClick={() => {
                      if (window.confirm('Deseja realmente restaurar as ofertas para o catálogo inicial?')) {
                        resetToDefaults();
                      }
                    }}
                    className="bg-rose-50 hover:bg-rose-100 text-rose-700 text-xs font-semibold px-3 py-1.5 rounded-lg flex items-center gap-1.5 transition-colors"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span>Restaurar Padrão</span>
                  </button>
                </div>
              </div>

              {/* Deals Mini List */}
              <div className="space-y-2 max-h-96 overflow-y-auto pr-1">
                {deals.map((deal) => (
                  <div
                    key={deal.id}
                    className="flex items-center justify-between p-3 rounded-xl border border-slate-200 bg-slate-50 hover:bg-white transition-colors gap-3"
                  >
                    <img
                      src={deal.imageUrl}
                      alt={deal.title}
                      className="w-12 h-12 object-contain bg-white rounded-lg p-1 border border-slate-200 shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <h4 className="text-xs font-bold text-slate-900 truncate">
                        {deal.title}
                      </h4>
                      <div className="flex items-center gap-2 text-[11px] text-slate-500">
                        <span className="font-semibold text-orange-600">
                          R$ {deal.priceCurrent.toFixed(2)}
                        </span>
                        <span>•</span>
                        <span className="uppercase">{deal.store}</span>
                      </div>
                    </div>

                    <button
                      onClick={() => deleteDeal(deal.id)}
                      className="p-2 text-rose-600 hover:bg-rose-50 rounded-lg transition-colors shrink-0"
                      title="Excluir Oferta"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 5: PUBLISH TO HOSTINGER */}
          {activeTab === 'hostinger' && (
            <div className="space-y-6">
              {/* Top Banner */}
              <div className="bg-gradient-to-r from-purple-900 to-indigo-900 text-white rounded-2xl p-5 shadow-md space-y-2">
                <div className="flex items-center gap-2">
                  <span className="bg-purple-500/30 text-purple-200 border border-purple-400/30 text-[10px] font-bold px-2 py-0.5 rounded uppercase">
                    Hostinger Deploy Pronto
                  </span>
                </div>
                <h3 className="text-base sm:text-lg font-bold">
                  Como Publicar seu Site na Hostinger em 3 Minutos
                </h3>
                <p className="text-xs text-purple-200 leading-relaxed">
                  O pacote de produção do <strong>Ofertas Knova</strong> foi gerado e já inclui o arquivo <code>.htaccess</code> otimizado para o Apache/LiteSpeed da Hostinger (com roteamento SPA e cache de alta performance).
                </p>
              </div>

              {/* 1-Click Download Button */}
              <div className="bg-slate-50 border-2 border-dashed border-purple-300 rounded-2xl p-5 text-center space-y-3">
                <div>
                  <h4 className="text-sm font-bold text-slate-900">
                    Passo 1: Baixar o Pacote Pronto para a Hostinger
                  </h4>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Arquivo .ZIP contendo index.html, assets compactados e .htaccess
                  </p>
                </div>

                <a
                  href="/ofertas-knova-hostinger.zip"
                  download="ofertas-knova-hostinger.zip"
                  className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white font-bold text-xs sm:text-sm px-6 py-3 rounded-xl shadow-lg shadow-purple-600/30 transition-transform hover:scale-105 active:scale-95"
                >
                  <Download className="w-4 h-4" />
                  <span>Baixar ofertas-knova-hostinger.zip</span>
                </a>
              </div>

              {/* Step by step guide */}
              <div className="space-y-3">
                <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                  Passo 2: Enviar para o hPanel da Hostinger
                </h4>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  <div className="bg-white border border-slate-200 rounded-xl p-3.5 space-y-1.5">
                    <span className="w-6 h-6 rounded-full bg-purple-100 text-purple-700 font-bold text-xs flex items-center justify-center">
                      1
                    </span>
                    <h5 className="text-xs font-bold text-slate-900">Acesse o hPanel</h5>
                    <p className="text-[11px] text-slate-500 leading-snug">
                      Entre na sua conta da Hostinger, vá em <strong>Sites</strong> e clique em <strong>Gerenciar</strong> no domínio desejado.
                    </p>
                  </div>

                  <div className="bg-white border border-slate-200 rounded-xl p-3.5 space-y-1.5">
                    <span className="w-6 h-6 rounded-full bg-purple-100 text-purple-700 font-bold text-xs flex items-center justify-center">
                      2
                    </span>
                    <h5 className="text-xs font-bold text-slate-900">Gerenciador de Arquivos</h5>
                    <p className="text-[11px] text-slate-500 leading-snug">
                      Clique em <strong>Gerenciador de Arquivos</strong> e acesse a pasta raiz <code>public_html</code> do seu domínio.
                    </p>
                  </div>

                  <div className="bg-white border border-slate-200 rounded-xl p-3.5 space-y-1.5">
                    <span className="w-6 h-6 rounded-full bg-purple-100 text-purple-700 font-bold text-xs flex items-center justify-center">
                      3
                    </span>
                    <h5 className="text-xs font-bold text-slate-900">Upload & Extrair</h5>
                    <p className="text-[11px] text-slate-500 leading-snug">
                      Faça o upload do arquivo <code>ofertas-knova-hostinger.zip</code>, clique com o botão direito nele e escolha <strong>"Extrair"</strong>.
                    </p>
                  </div>
                </div>
              </div>

              {/* Tips */}
              <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-3 text-xs text-emerald-800 flex items-start gap-2">
                <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span>
                  <strong>Dica de ouro:</strong> Os arquivos extraídos (<code>index.html</code>, pasta <code>assets/</code> e <code>.htaccess</code>) devem ficar diretamente dentro de <code>public_html</code>. Assim, seu site já entra no ar imediatamente com SSL ativado!
                </span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
