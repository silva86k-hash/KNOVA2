export type StoreId =
  | 'amazon'
  | 'shopee'
  | 'mercadolivre'
  | 'magalu'
  | 'aliexpress'
  | 'casasbahia'
  | 'kabum'
  | 'samsung'
  | 'shein';

export type CategoryId =
  | 'todas'
  | 'eletronicos'
  | 'casa-cozinha'
  | 'informatica'
  | 'moda'
  | 'achadinhos'
  | 'beleza'
  | 'games'
  | 'automotivo';

export interface PriceHistoryPoint {
  date: string;
  price: number;
}

export interface Deal {
  id: string;
  title: string;
  store: StoreId;
  storeName: string;
  category: CategoryId;
  priceOld: number;
  priceCurrent: number;
  installmentText?: string;
  discountPercentage: number;
  couponCode?: string;
  couponDiscount?: string;
  imageUrl: string;
  affiliateUrl: string;
  isFlashDeal?: boolean;
  flashEndsInHours?: number;
  claimedPercentage?: number;
  isFreeShipping?: boolean;
  isPrime?: boolean;
  isChoice?: boolean;
  isVerified?: boolean;
  seal?: 'knova-aprova' | 'achadinho-dia' | 'eu-compraria' | 'garimpo-knova';
  likesCount: number;
  rating: number;
  reviewsCount: number;
  createdAt: string;
  tags: string[];
  priceHistory: PriceHistoryPoint[];
  highlights?: string[];
  description?: string;
}

export interface CouponItem {
  id: string;
  store: StoreId;
  storeName: string;
  code: string;
  discountText: string;
  minSpendText: string;
  description: string;
  affiliateUrl: string;
  expiresAt: string;
  isVerified: boolean;
  category: string;
}

export interface StoreInfo {
  id: StoreId;
  name: string;
  color: string;
  bgColor: string;
  textColor: string;
  tagline: string;
  badge?: string;
}

export interface AffiliateSettings {
  siteName: string;
  siteTagline: string;
  amazonTag: string;
  shopeeId: string;
  magaluId: string;
  telegramUrl: string;
  whatsappUrl: string;
  instagramUrl: string;
}
