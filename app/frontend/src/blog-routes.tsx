import { Navigate, Route, Routes } from 'react-router-dom';
// MODULE_BLOG_IMPORTS_START
// MODULE_BLOG_IMPORTS_END
import BlogIndexPage from './pages/blog/BlogIndexPage';
import LaunchRootCabsPage from './pages/blog/LaunchRootCabsPage';
import SuccessStoriesPage from './pages/blog/SuccessStoriesPage';
import DriverEarningsPage from './pages/blog/DriverEarningsPage';
import ChennaiGrowthPage from './pages/blog/ChennaiGrowthPage';
import DriverFeedbackPage from './pages/blog/DriverFeedbackPage';
import FutureRootCabsPage from './pages/blog/FutureRootCabsPage';
import BlogPostPage from './pages/blog/BlogPostPage';

const BlogRoutes = () => (
  <Routes>
    <Route index element={<BlogIndexPage />} />
    <Route path="launch-of-root-cabs" element={<LaunchRootCabsPage />} />
    <Route path="root-cabs-success-stories" element={<SuccessStoriesPage />} />
    <Route path="how-root-cabs-helps-drivers-earn-up-to-40000-extra-every-month" element={<DriverEarningsPage />} />
    <Route path="growth-of-root-cabs-in-chennai" element={<ChennaiGrowthPage />} />
    <Route path="what-our-driver-partners-say-about-root-cabs" element={<DriverFeedbackPage />} />
    <Route path="future-of-root-cabs" element={<FutureRootCabsPage />} />
    <Route path=":slug" element={<BlogPostPage />} />
    {/* MODULE_BLOG_ROUTES_START */}
    {/* MODULE_BLOG_ROUTES_END */}
    <Route path="*" element={<Navigate to="/blog/" replace />} />
  </Routes>
);

export default BlogRoutes;
