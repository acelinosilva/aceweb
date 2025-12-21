import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import WhatsAppButton from './components/WhatsAppButton';
import Home from './pages/Home';
import About from './pages/About';
import Services from './pages/Services';
import Contact from './pages/Contact';
import Portfolio from './pages/Portfolio';
import Admin from './pages/Admin';
import Blog from './pages/Blog';
import ArticleDetail from './pages/ArticleDetail';
import LocationLanding from './pages/LocationLanding';

function App() {
    return (
        <Router>
            <div className="app-container">
                <Routes>
                    <Route path="/admin" element={<Admin />} />
                    <Route path="*" element={
                        <>
                            <Navbar />
                            <main>
                                <Routes>
                                    <Route path="/" element={<Home />} />
                                    <Route path="/sobre" element={<About />} />
                                    <Route path="/servicos" element={<Services />} />
                                    <Route path="/portfolio" element={<Portfolio />} />
                                    <Route path="/contato" element={<Contact />} />
                                    <Route path="/blog" element={<Blog />} />
                                    <Route path="/blog/:id" element={<ArticleDetail />} />
                                    <Route path="/locais/:slug" element={<LocationLanding />} />
                                </Routes>
                            </main>
                            <Footer />
                            <WhatsAppButton />
                        </>
                    } />
                </Routes>
            </div>
        </Router>
    );
}

export default App;
