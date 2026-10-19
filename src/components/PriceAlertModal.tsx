import React, { useState } from 'react';
import { X, Bell, CheckCircle2 } from 'lucide-react';
import { useAffiliate } from '../context/AffiliateContext';

export const PriceAlertModal: React.FC = () => {
  const {
    isPriceAlertModalOpen,
    setIsPriceAlertModalOpen,
    priceAlertDeal,
    setToast,
  } = useAffiliate();

  const [desiredPrice, setDesiredPrice] = useState('');
  const [contactMethod, setContactMethod] = useState<'whatsapp' | 'email'>('whatsapp');
  const [contactValue, setContactValue] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);

  if (!isPriceAlertModalOpen || !priceAlertDeal) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!contactValue) return;

    setIsSuccess(true);
    setTimeout(() => {
      setToast('Alerta de preço configurado! Avisaremos assim que baixar. 🔔');
      setIsSuccess(false);
      setIsPriceAlertModalOpen(false);
      setDesiredPrice('');
      setContactValue('');
    }, 1400);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-[#FFFDF9] rounded-3xl max-w-md w-full overflow-hidden border-3 border-black shadow-[8px_8px_0px_#000] relative p-6">
        <button
          onClick={() => setIsPriceAlertModalOpen(false)}
          className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white border-2 border-black hover:bg-[#FFD6E7] text-black flex items-center justify-center transition-colors shadow-[1.5px_1.5px_0px_#000]"
        >
          <X className="w-4 h-4 stroke-[2.5]" />
        </button>

        {isSuccess ? (
          <div className="py-8 text-center space-y-3">
            <div className="w-14 h-14 rounded-full bg-[#00CDBA] text-black border-2 border-black mx-auto flex items-center justify-center shadow-[2px_2px_0px_#000]">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h3 className="text-lg font-black text-black uppercase">Alerta Criado!</h3>
            <p className="text-xs font-semibold text-slate-700">
              Estamos monitorando esse achadinho. Assim que o valor cair, você será a primeira a saber!
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-[#FFD93B] border-2 border-black text-black flex items-center justify-center shadow-[2px_2px_0px_#000]">
                <Bell className="w-5 h-5 stroke-[2.5]" />
              </div>
              <div>
                <h3 className="text-base font-black text-black uppercase">
                  Alerta de Menor Preço
                </h3>
                <p className="text-xs font-bold text-slate-600">
                  Avise-me quando o preço cair
                </p>
              </div>
            </div>

            {/* Product snippet */}
            <div className="flex items-center gap-3 p-3 rounded-2xl bg-white border-2 border-black shadow-[2px_2px_0px_#000]">
              <img
                src={priceAlertDeal.imageUrl}
                alt={priceAlertDeal.title}
                className="w-12 h-12 object-contain bg-[#FFF8FA] rounded-xl p-1 border border-black/20 shrink-0"
              />
              <div className="min-w-0">
                <h4 className="text-xs font-bold text-black truncate">
                  {priceAlertDeal.title}
                </h4>
                <p className="text-xs text-black font-black">
                  Preço atual: R$ {priceAlertDeal.priceCurrent.toFixed(2)}
                </p>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-3">
              <div>
                <label className="block text-xs font-black text-black uppercase mb-1">
                  Qual preço você quer pagar? (R$)
                </label>
                <input
                  type="text"
                  required
                  value={desiredPrice}
                  onChange={(e) => setDesiredPrice(e.target.value)}
                  placeholder={`Ex: ${(priceAlertDeal.priceCurrent * 0.85).toFixed(2)}`}
                  className="w-full text-sm border-2 border-black rounded-xl px-3.5 py-2.5 focus:outline-none font-black shadow-[2px_2px_0px_#000]"
                />
              </div>

              <div>
                <label className="block text-xs font-black text-black uppercase mb-1">
                  Onde avisar você?
                </label>
                <div className="grid grid-cols-2 gap-2 mb-2">
                  <button
                    type="button"
                    onClick={() => setContactMethod('whatsapp')}
                    className={`py-2 px-3 rounded-xl text-xs font-black transition-all border-2 border-black ${
                      contactMethod === 'whatsapp'
                        ? 'bg-[#00CDBA] text-black shadow-[2px_2px_0px_#000]'
                        : 'bg-white text-slate-700'
                    }`}
                  >
                    WhatsApp
                  </button>
                  <button
                    type="button"
                    onClick={() => setContactMethod('email')}
                    className={`py-2 px-3 rounded-xl text-xs font-black transition-all border-2 border-black ${
                      contactMethod === 'email'
                        ? 'bg-[#FFD6E7] text-black shadow-[2px_2px_0px_#000]'
                        : 'bg-white text-slate-700'
                    }`}
                  >
                    E-mail
                  </button>
                </div>

                <input
                  type={contactMethod === 'email' ? 'email' : 'tel'}
                  required
                  value={contactValue}
                  onChange={(e) => setContactValue(e.target.value)}
                  placeholder={contactMethod === 'whatsapp' ? '(11) 99999-9999' : 'seu@email.com'}
                  className="w-full text-sm border-2 border-black rounded-xl px-3.5 py-2.5 focus:outline-none font-semibold shadow-[2px_2px_0px_#000]"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-[#FF4D8D] hover:bg-[#ff337b] text-white font-black text-xs py-3 rounded-xl border-2 border-black shadow-[3px_3px_0px_#000] transition-transform hover:-translate-y-0.5 active:translate-y-0 uppercase"
              >
                Ativar Alerta de Achadinho
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};
