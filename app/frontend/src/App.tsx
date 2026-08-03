import { useEffect } from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Layout from "@/components/Layout";
import Index from "@/pages/Index";
import BookRide from "@/pages/BookRide";
import { ServicesHub, ServicePage } from "@/pages/ServicesPages";
import { CitiesHub, CityPage, CityServicePage } from "@/pages/CitiesPages";
import { RoutePage, LandmarkPage } from "@/pages/RoutesAndLandmarks";
import { DriversPage } from "@/pages/DriversPage";
import { SupportPage } from "@/pages/SupportPage";
import {
  BusinessPage,
  BlogPage,
  AboutPage,
  PrivacyPolicyPage,
  TermsOfUsePage,
  WalletPolicyPage,
} from "@/pages/InfoPages";

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
  }, [pathname]);

  return null;
}

function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Layout>
        <Routes>
          {/* Core Pages */}
          <Route path="/" element={<Index />} />
          <Route path="/book-ride" element={<BookRide />} />

          {/* Services */}
          <Route path="/services" element={<ServicesHub />} />
          <Route path="/services/:serviceSlug" element={<ServicePage />} />

          {/* Cities */}
          <Route path="/cities" element={<CitiesHub />} />

          {/* Info Pages */}
          <Route path="/drivers" element={<DriversPage />} />
          <Route path="/business" element={<BusinessPage />} />
          <Route path="/blog" element={<BlogPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/about-us" element={<AboutPage />} />
          <Route path="/support" element={<SupportPage />} />
          <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
          <Route path="/terms-of-use" element={<TermsOfUsePage />} />
          <Route path="/wallet-policy" element={<WalletPolicyPage />} />

          {/* Dynamic Routes */}
          <Route path="/routes/:routeSlug" element={<RoutePage />} />
          <Route path="/landmarks/:landmarkSlug" element={<LandmarkPage />} />

          {/* City pages - must be after all static routes */}
          <Route path="/:citySlug/:serviceSlug" element={<CityServicePage />} />
          <Route path="/:citySlug" element={<CityPage />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default App;
