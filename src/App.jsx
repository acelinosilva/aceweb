import { Suspense, lazy } from 'react';
import { HashRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import WhatsAppButton from './components/WhatsAppButton';
import LoadingSpinner from './components/LoadingSpinner';
import ScrollToTop from './components/ScrollToTop';
import CustomCursor from './components/CustomCursor';
import Preloader from './components/Preloader';

// Lazy Load Pages
const Home = lazy(() => import('./pages/Home'));
const About = lazy(() => import('./pages/About'));
const Services = lazy(() => import('./pages/Services'));
const Contact = lazy(() => import('./pages/Contact'));
const Portfolio = lazy(() => import('./pages/Portfolio'));
const Admin = lazy(() => import('./pages/Admin'));
const Blog = lazy(() => import('./pages/Blog'));
const ArticleDetail = lazy(() => import('./pages/ArticleDetail'));
const LocationLanding = lazy(() => import('./pages/LocationLanding'));
const NotFound = lazy(() => import('./pages/NotFound'));

function AnimatedRoutes() {
    const location = useLocation();
    return (
        <AnimatePresence mode="wait">
            <Routes location={location} key={location.pathname}>
                <Route path="/" element={<Home />} />
                <Route path="/sobre" element={<About />} />
                <Route path="/servicos" element={<Services />} />
                <Route path="/portfolio" element={<Portfolio />} />
                <Route path="/contato" element={<Contact />} />
                <Route path="/blog" element={<Blog />} />
                <Route path="/blog/:id" element={<ArticleDetail />} />
                <Route path="/locais/:slug" element={<LocationLanding />} />
                <Route path="*" element={<NotFound />} />
            </Routes>
        </AnimatePresence>
    );
}

function App() {
    return (
        <Router>
            <div className="app-container">
                <CustomCursor />
                <Preloader />
                <Suspense fallback={<LoadingSpinner />}>
                    <Routes>
                        <Route path="/admin" element={<Admin />} />
                        <Route path="*" element={
                            <>
                                <Navbar />
                                <main>
                                    <Suspense fallback={<LoadingSpinner />}>
                                        <AnimatedRoutes />
                                    </Suspense>
                                </main>
                                <Footer />
                                <WhatsAppButton />
                                <ScrollToTop />
                            </>
                        } />
                    </Routes>
                </Suspense>
            </div>
        </Router>
    );
}

export default App;
