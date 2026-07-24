import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "@/components/Layout";
import Index from "@/pages/Index";
import BookRide from "@/pages/BookRide";
import { ServicesHub, ServicePage } from "@/pages/ServicesPages";
import { CitiesHub, CityPage, CityServicePage } from "@/pages/CitiesPages";
import { RoutePage, LandmarkPage } from "@/pages/RoutesAndLandmarks";
import { DriversPage, BusinessPage, BlogPage, AboutPage, SupportPage, PrivacyPolicyPage } from "@/pages/InfoPages";

function App() {
  return (
    <BrowserRouter>
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
          <Route path="/support" element={<SupportPage />} />
          <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />

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