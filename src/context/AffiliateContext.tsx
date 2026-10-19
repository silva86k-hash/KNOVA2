import React, { createContext, useContext, useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { Deal, CouponItem, StoreId, CategoryId, AffiliateSettings } from '../types';
import { INITIAL_DEALS, INITIAL_COUPONS, DEFAULT_AFFILIATE_SETTINGS } from '../data/mockDeals';

interface AffiliateContextType {
  deals: Deal[];
  coupons: CouponItem[];
  settings: AffiliateSettings;
  favorites: string[];
  likedDeals: Record<string, boolean>;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  selectedCategory: CategoryId;
  setSelectedCategory: (cat: CategoryId) => void;
  selectedStore: StoreId | 'todas';
  setSelectedStore: (store: StoreId | 'todas') => void;
  priceFilter: 'todos' | 'ate-50' | '50-150' | '150-500' | '500-mais';
  setPriceFilter: (filter: 'todos' | 'ate-50' | '50-150' | '150-500' | '500-mais') => void;
  onlyWithCoupon: boolean;
  setOnlyWithCoupon: (val: boolean | ((prev: boolean) => boolean)) => void;
  onlyFreeShipping: boolean;
  setOnlyFreeShipping: (val: boolean | ((prev: boolean) => boolean)) => void;
  onlyFlashDeals: boolean;
  setOnlyFlashDeals: (val: boolean | ((prev: boolean) => boolean)) => void;
  sortBy: 'recent' | 'discount' | 'price-asc' | 'price-desc' | 'popular';
  setSortBy: (sort: 'recent' | 'discount' | 'price-asc' | 'price-desc' | 'popular') => void;
  activeTab: 'todas' | 'relampago' | 'cupons' | 'achadinhos' | 'favoritos';
  setActiveTab: (tab: 'todas' | 'relampago' | 'cupons' | 'achadinhos' | 'favoritos') => void;
  viewMode: 'grid' | 'list';
  setViewMode: (mode: 'grid' | 'list') => void;
  selectedDealForModal: Deal | null;
  setSelectedDealForModal: (deal: Deal | null) => void;
  isFavoritesDrawerOpen: boolean;
  setIsFavoritesDrawerOpen: (open: boolean) => void;
  isAdminModalOpen: boolean;
  setIsAdminModalOpen: (open: boolean) => void;
  isPriceAlertModalOpen: boolean;
  setIsPriceAlertModalOpen: (open: boolean) => void;
  priceAlertDeal: Deal | null;
  openPriceAlertModal: (deal: Deal) => void;
  toastMessage: string | null;
  setToast: (msg: string) => void;

  toggleFavorite: (dealId: string) => void;
  toggleLike: (dealId: string) => void;
  copyCoupon: (code: string, affiliateUrl?: string) => void;
  copyLinkToClipboard: (text: string, label?: string) => void;
  addDeal: (dealData: Partial<Deal>) => void;
  updateDeal: (deal: Deal) => void;
  deleteDeal: (dealId: string) => void;
  resetToDefaults: () => void;
  updateSettings: (newSettings: Partial<AffiliateSettings>) => void;
  buildAffiliateUrl: (rawUrl: string, store: StoreId) => string;
}

const AffiliateContext = createContext<AffiliateContextType | undefined>(undefined);

export const AffiliateProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Deals State with LocalStorage
  const [deals, setDeals] = useState<Deal[]>(() => {
    try {
      const saved = localStorage.getItem('knova_deals_v1');
      return saved ? JSON.parse(saved) : INITIAL_DEALS;
    } catch {
      return INITIAL_DEALS;
    }
  });

  // Coupons State
  const [coupons, setCoupons] = useState<CouponItem[]>(() => {
    try {
      const saved = localStorage.getItem('knova_coupons_v1');
      return saved ? JSON.parse(saved) : INITIAL_COUPONS;
    } catch {
      return INITIAL_COUPONS;
    }
  });

  // Settings State
  const [settings, setSettings] = useState<AffiliateSettings>(() => {
    try {
      const saved = localStorage.getItem('knova_settings_v1');
      return saved ? JSON.parse(saved) : DEFAULT_AFFILIATE_SETTINGS;
    } catch {
      return DEFAULT_AFFILIATE_SETTINGS;
    }
  });

  // Favorites
  const [favorites, setFavorites] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('knova_favorites_v1');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Liked Deals (upvotes)
  const [likedDeals, setLikedDeals] = useState<Record<string, boolean>>(() => {
    try {
      const saved = localStorage.getItem('knova_likes_v1');
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });

  // Filter States
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<CategoryId>('todas');
  const [selectedStore, setSelectedStore] = useState<StoreId | 'todas'>('todas');
  const [priceFilter, setPriceFilter] = useState<'todos' | 'ate-50' | '50-150' | '150-500' | '500-mais'>('todos');
  const [onlyWithCoupon, setOnlyWithCoupon] = useState(false);
  const [onlyFreeShipping, setOnlyFreeShipping] = useState(false);
  const [onlyFlashDeals, setOnlyFlashDeals] = useState(false);
  const [sortBy, setSortBy] = useState<'recent' | 'discount' | 'price-asc' | 'price-desc' | 'popular'>('recent');
  const [activeTab, setActiveTab] = useState<'todas' | 'relampago' | 'cupons' | 'achadinhos' | 'favoritos'>('todas');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  // Modals & Drawers
  const [selectedDealForModal, setSelectedDealForModal] = useState<Deal | null>(null);
  const [isFavoritesDrawerOpen, setIsFavoritesDrawerOpen] = useState(false);
  const [isAdminModalOpen, setIsAdminModalOpen] = useState(false);
  const [isPriceAlertModalOpen, setIsPriceAlertModalOpen] = useState(false);
  const [priceAlertDeal, setPriceAlertDeal] = useState<Deal | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Sync to localStorage
  useEffect(() => {
    localStorage.setItem('knova_deals_v1', JSON.stringify(deals));
  }, [deals]);

  useEffect(() => {
    localStorage.setItem('knova_coupons_v1', JSON.stringify(coupons));
  }, [coupons]);

  useEffect(() => {
    localStorage.setItem('knova_settings_v1', JSON.stringify(settings));
  }, [settings]);

  useEffect(() => {
    localStorage.setItem('knova_favorites_v1', JSON.stringify(favorites));
  }, [favorites]);

  useEffect(() => {
    localStorage.setItem('knova_likes_v1', JSON.stringify(likedDeals));
  }, [likedDeals]);

  const setToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage((current) => (current === msg ? null : current));
    }, 3500);
  };

  const toggleFavorite = (dealId: string) => {
    setFavorites((prev) => {
      const exists = prev.includes(dealId);
      if (exists) {
        setToast('Oferta removida dos favoritos');
        return prev.filter((id) => id !== dealId);
      } else {
        setToast('Salvo em seus Favoritos! ❤️');
        return [...prev, dealId];
      }
    });
  };

  const toggleLike = (dealId: string) => {
    const isLiked = likedDeals[dealId];
    setLikedDeals((prev) => ({ ...prev, [dealId]: !isLiked }));
    setDeals((prev) =>
      prev.map((deal) => {
        if (deal.id === dealId) {
          return {
            ...deal,
            likesCount: isLiked ? deal.likesCount - 1 : deal.likesCount + 1,
          };
        }
        return deal;
      })
    );
  };

  const copyCoupon = (code: string, affiliateUrl?: string) => {
    navigator.clipboard.writeText(code);
    confetti({
      particleCount: 50,
      spread: 60,
      origin: { y: 0.8 },
      colors: ['#ea580c', '#f97316', '#22c55e', '#eab308'],
    });
    setToast(`Cupom "${code}" COPIADO com sucesso! 🎉`);

    if (affiliateUrl) {
      setTimeout(() => {
        window.open(affiliateUrl, '_blank', 'noopener,noreferrer');
      }, 700);
    }
  };

  const copyLinkToClipboard = (text: string, label = 'Link') => {
    navigator.clipboard.writeText(text);
    setToast(`${label} copiado para a área de transferência!`);
  };

  const buildAffiliateUrl = (rawUrl: string, store: StoreId): string => {
    try {
      if (!rawUrl) return '';
      const url = new URL(rawUrl.startsWith('http') ? rawUrl : `https://${rawUrl}`);
      if (store === 'amazon') {
        url.searchParams.set('tag', settings.amazonTag || 'ofertasknova-20');
      } else if (store === 'shopee') {
        url.searchParams.set('af', settings.shopeeId || 'knovaofertas');
      } else if (store === 'magalu') {
        url.searchParams.set('tag', settings.magaluId || 'ofertasknova');
      } else if (store === 'mercadolivre') {
        url.searchParams.set('matt_tool', 'ofertasknova');
      }
      return url.toString();
    } catch {
      return rawUrl;
    }
  };

  const addDeal = (dealData: Partial<Deal>) => {
    const id = `deal-${Date.now()}`;
    const priceOld = Number(dealData.priceOld) || 0;
    const priceCurrent = Number(dealData.priceCurrent) || 0;
    const discountPercentage =
      priceOld > priceCurrent
        ? Math.round(((priceOld - priceCurrent) / priceOld) * 100)
        : Number(dealData.discountPercentage) || 0;

    const newDeal: Deal = {
      id,
      title: dealData.title || 'Nova Oferta Imperdível',
      store: dealData.store || 'amazon',
      storeName: dealData.storeName || 'Loja Parceira',
      category: dealData.category || 'achadinhos',
      priceOld,
      priceCurrent,
      installmentText: dealData.installmentText || 'em até 3x sem juros',
      discountPercentage,
      couponCode: dealData.couponCode || '',
      couponDiscount: dealData.couponDiscount || '',
      imageUrl:
        dealData.imageUrl ||
        'https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?auto=format&fit=crop&w=800&q=80',
      affiliateUrl: buildAffiliateUrl(dealData.affiliateUrl || '', dealData.store || 'amazon'),
      isFlashDeal: Boolean(dealData.isFlashDeal),
      flashEndsInHours: dealData.flashEndsInHours || 6,
      claimedPercentage: dealData.claimedPercentage || 45,
      isFreeShipping: dealData.isFreeShipping ?? true,
      isPrime: dealData.isPrime ?? (dealData.store === 'amazon'),
      isVerified: true,
      likesCount: 1,
      rating: 5.0,
      reviewsCount: 1,
      createdAt: 'Agora mesmo',
      tags: dealData.tags || ['Nova Oferta', 'Verificado'],
      priceHistory: [
        { date: 'Anterior', price: priceOld || priceCurrent * 1.3 },
        { date: 'Hoje', price: priceCurrent },
      ],
      highlights: dealData.highlights || [
        'Preço promocional verificado',
        'Compra segura com garantia da loja oficial',
      ],
      description: dealData.description || 'Oferta selecionada e verificada pela equipe Ofertas Knova.',
    };

    setDeals((prev) => [newDeal, ...prev]);
    setToast('Oferta publicada com sucesso no catálogo! 🎉');
  };

  const updateDeal = (updated: Deal) => {
    setDeals((prev) => prev.map((d) => (d.id === updated.id ? updated : d)));
    setToast('Oferta atualizada com sucesso!');
  };

  const deleteDeal = (dealId: string) => {
    setDeals((prev) => prev.filter((d) => d.id !== dealId));
    setToast('Oferta removida!');
  };

  const resetToDefaults = () => {
    setDeals(INITIAL_DEALS);
    setCoupons(INITIAL_COUPONS);
    setSettings(DEFAULT_AFFILIATE_SETTINGS);
    setToast('Catálogo e configurações restaurados para o padrão.');
  };

  const updateSettings = (newSettings: Partial<AffiliateSettings>) => {
    setSettings((prev) => ({ ...prev, ...newSettings }));
    setToast('Configurações do afiliado salvas!');
  };

  const openPriceAlertModal = (deal: Deal) => {
    setPriceAlertDeal(deal);
    setIsPriceAlertModalOpen(true);
  };

  return (
    <AffiliateContext.Provider
      value={{
        deals,
        coupons,
        settings,
        favorites,
        likedDeals,
        searchQuery,
        setSearchQuery,
        selectedCategory,
        setSelectedCategory,
        selectedStore,
        setSelectedStore,
        priceFilter,
        setPriceFilter,
        onlyWithCoupon,
        setOnlyWithCoupon,
        onlyFreeShipping,
        setOnlyFreeShipping,
        onlyFlashDeals,
        setOnlyFlashDeals,
        sortBy,
        setSortBy,
        activeTab,
        setActiveTab,
        viewMode,
        setViewMode,
        selectedDealForModal,
        setSelectedDealForModal,
        isFavoritesDrawerOpen,
        setIsFavoritesDrawerOpen,
        isAdminModalOpen,
        setIsAdminModalOpen,
        isPriceAlertModalOpen,
        setIsPriceAlertModalOpen,
        priceAlertDeal,
        openPriceAlertModal,
        toastMessage,
        setToast,
        toggleFavorite,
        toggleLike,
        copyCoupon,
        copyLinkToClipboard,
        addDeal,
        updateDeal,
        deleteDeal,
        resetToDefaults,
        updateSettings,
        buildAffiliateUrl,
      }}
    >
      {children}
    </AffiliateContext.Provider>
  );
};

export const useAffiliate = () => {
  const context = useContext(AffiliateContext);
  if (!context) {
    throw new Error('useAffiliate must be used within an AffiliateProvider');
  }
  return context;
};
