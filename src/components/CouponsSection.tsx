import React, { useState } from 'react';
import {
  Tag,
  Copy,
  ExternalLink,
  Clock,
  Sparkles,
} from 'lucide-react';
import { useAffiliate } from '../context/AffiliateContext';
import { STORES_DATA } from '../data/stores';
import { StoreId } from '../types';
import { KnovaSeal } from './KnovaBadges';

export const CouponsSection: React.FC = () => {
  const { coupons, copyCoupon, selectedStore } = useAffiliate();
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const filteredCoupons = coupons.filter((coupon) => {
    if (selectedStore !== 'todas') {
      return coupon.store === selectedStore;
    }
    return true;
  });

  const handleCopy = (couponId: string, code: string, url: string) => {
    copyCoupon(code, url);
    setCopiedId(couponId);
    setTimeout(() => {
      setCopiedId((curr) => (curr === couponId ? null : curr));
    }, 3000);
  };

  return (
    <section className="px-4 py-3" id="cupons-section">
      <div className="max-w-7xl mx-auto">
        <div className="bg-[#FFFDF9] rounded-3xl p-5 sm:p-7 border-3 border-[#000000] shadow-[6px_6px_0px_#000000]">
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6 pb-4 border-b-2 border-black/15">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-[#FFD93B] border-2 border-black flex items-center justify-center text-black shadow-[2.5px_2.5px_0px_#000000]">
                <Tag className="w-6 h-6 fill-[#000000] stroke-black" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h2 className="text-xl sm:text-2xl font-black tracking-tight text-black uppercase font-montserrat">
                    CUPONS TESTADOS PELA EQUIPE
                  </h2>
                  <span className="bg-[#00CDBA] text-black border border-black text-[10px] font-black px-2 py-0.5 rounded-full uppercase shadow-[1px_1px_0px_#000]">
                    FUNCIONANDO
                  </span>
                </div>
                <p className="text-xs font-bold text-slate-700">
                  Copie o código e aproveite o desconto direto na finalização do pedido!
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2 text-xs font-black text-black bg-[#FFD6E7] border-2 border-black px-3.5 py-1.5 rounded-full shadow-[2px_2px_0px_#000] self-start sm:self-auto">
              <span>♥ {filteredCoupons.length} cupons ativos hoje</span>
            </div>
          </div>

          {/* Coupons Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredCoupons.map((coupon) => {
              const store = STORES_DATA[coupon.store as StoreId];
              const isRecentlyCopied = copiedId === coupon.id;

              return (
                <div
                  key={coupon.id}
                  className="rounded-3xl border-2.5 border-[#000000] bg-white p-4 shadow-[4px_4px_0px_#000000] hover:shadow-[5px_5px_0px_#FFD93B] transition-all flex flex-col justify-between relative overflow-hidden group"
                >
                  <div>
                    {/* Top Row */}
                    <div className="flex items-center justify-between gap-2 mb-2">
                      <span className="text-xs font-black px-2.5 py-0.5 rounded-full bg-[#00CDBA] text-black border border-black uppercase">
                        {store ? store.name : coupon.storeName}
                      </span>

                      <span className="text-[10px] text-black font-bold flex items-center gap-1 bg-[#FFD6E7] px-2 py-0.5 rounded-full border border-black">
                        <Clock className="w-3 h-3 stroke-[2.5]" />
                        {coupon.expiresAt}
                      </span>
                    </div>

                    {/* Discount Value */}
                    <div className="my-2.5">
                      <span className="text-2xl font-black text-[#FF4D8D] tracking-tight">
                        {coupon.discountText}
                      </span>
                      <p className="text-xs font-extrabold text-black mt-0.5">
                        {coupon.minSpendText}
                      </p>
                    </div>

                    <p className="text-xs font-medium text-slate-700 mb-4 line-clamp-2">
                      {coupon.description}
                    </p>
                  </div>

                  {/* Coupon Code Box */}
                  <div className="space-y-2 pt-2 border-t-2 border-black/10">
                    <div className="flex items-center justify-between bg-[#FFF8FA] border-2 border-black rounded-2xl p-1.5 pl-3 shadow-[2px_2px_0px_#000]">
                      <span className="font-mono text-sm font-black text-black tracking-wider">
                        {coupon.code}
                      </span>
                      <button
                        onClick={() => handleCopy(coupon.id, coupon.code, coupon.affiliateUrl)}
                        className={`px-3.5 py-1.5 rounded-xl text-xs font-black border border-black transition-all flex items-center gap-1.5 ${
                          isRecentlyCopied
                            ? 'bg-[#00CDBA] text-black'
                            : 'bg-[#FFD93B] hover:bg-[#ffe16b] text-black'
                        }`}
                      >
                        {isRecentlyCopied ? (
                          <>
                            <Sparkles className="w-3.5 h-3.5 animate-spin" />
                            <span>COPIADO!</span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-3.5 h-3.5 stroke-[2.5]" />
                            <span>COPIAR</span>
                          </>
                        )}
                      </button>
                    </div>

                    <a
                      href={coupon.affiliateUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-center block text-[11px] font-black text-black hover:text-[#FF4D8D] transition-colors py-1 underline uppercase"
                    >
                      <span>Ir para a loja parceira</span>
                      <ExternalLink className="w-3 h-3 inline-block ml-1 stroke-[3]" />
                    </a>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
