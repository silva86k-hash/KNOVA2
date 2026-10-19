/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { AffiliateProvider } from './context/AffiliateContext';
import { SiteHeader } from './components/SiteHeader';
import { SiteHero } from './components/SiteHero';
import { SiteOffers } from './components/SiteOffers';
import { SiteDiscovery } from './components/SiteDiscovery';
import { SiteMarketplaces } from './components/SiteMarketplaces';
import { SiteAbout } from './components/SiteAbout';
import { SiteCommunity } from './components/SiteCommunity';
import { SiteFooter } from './components/SiteFooter';
import { DealDetailsModal } from './components/DealDetailsModal';
import { AffiliateAdminModal } from './components/AffiliateAdminModal';
import { FavoritesDrawer } from './components/FavoritesDrawer';
import { PriceAlertModal } from './components/PriceAlertModal';
import { Toast } from './components/Toast';

const MainAppContent: React.FC = () => {
  return (
    <div className="min-h-screen bg-white flex flex-col text-black antialiased selection:bg-[#ff4d8d] selection:text-white">
      {/* Exact Header of ofertasknova.com.br */}
      <SiteHeader />

      <main className="flex-1">
        {/* Exact Hero Section of ofertasknova.com.br */}
        <SiteHero />

        {/* Exact Offers Section of ofertasknova.com.br */}
        <SiteOffers />

        {/* Exact Discovery / Achadinhos Section of ofertasknova.com.br */}
        <SiteDiscovery />

        {/* Exact Marketplaces Section of ofertasknova.com.br */}
        <SiteMarketplaces />

        {/* Exact About Section of ofertasknova.com.br */}
        <SiteAbout />

        {/* Exact Community Section of ofertasknova.com.br */}
        <SiteCommunity />
      </main>

      {/* Exact Footer of ofertasknova.com.br */}
      <SiteFooter />

      {/* Interactive Overlays & Modals */}
      <DealDetailsModal />
      <AffiliateAdminModal />
      <FavoritesDrawer />
      <PriceAlertModal />
      <Toast />
    </div>
  );
};

export default function App() {
  return (
    <AffiliateProvider>
      <MainAppContent />
    </AffiliateProvider>
  );
}
