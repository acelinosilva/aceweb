import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Calendar, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import './NewsCarousel.css';

const NewsCarousel = () => {
    const [posts, setPosts] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        const savedPosts = JSON.parse(localStorage.getItem('ace_blog_posts')) || [];
        // Only take the last 3 for the carousel
        setPosts(savedPosts.slice(0, 3));
    }, []);

    const next = () => {
        setCurrentIndex((prev) => (prev + 1) % posts.length);
    };

    const prev = () => {
        setCurrentIndex((prev) => (prev - 1 + posts.length) % posts.length);
    };

    const stripHtml = (html) => {
        const tmp = document.createElement("DIV");
        tmp.innerHTML = html;
        return tmp.textContent || tmp.innerText || "";
    };

    if (posts.length === 0) return null;

    return (
        <section className="news-carousel-section section-padding">
            <div className="container">
                <header className="text-center mb-5">
                    <span className="badge">Últimas Notícias</span>
                    <h2 className="section-title">Fique por dentro do <span>Mundo Digital</span></h2>
                </header>

                <div className="carousel-main-container">
                    <button className="carousel-control prev" onClick={prev}><ChevronLeft /></button>

                    <div className="carousel-viewport">
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={currentIndex}
                                initial={{ opacity: 0, x: 50 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -50 }}
                                transition={{ duration: 0.5 }}
                                className="carousel-slide"
                            >
                                <div className={`carousel-content glass-card neural-border ${posts[currentIndex].image ? 'has-image' : ''}`}>
                                    {posts[currentIndex].image && (
                                        <div className="slide-visual">
                                            <img src={posts[currentIndex].image} alt={posts[currentIndex].title} />
                                        </div>
                                    )}
                                    <div className="slide-info">
                                        <div className="slide-meta">
                                            <Calendar size={14} /> {posts[currentIndex].date}
                                        </div>
                                        <h3>{posts[currentIndex].title}</h3>
                                        <p>{stripHtml(posts[currentIndex].content).substring(0, 180)}...</p>
                                        <Link to="/blog" className="read-more">
                                            Ler notícia completa <ArrowRight size={18} />
                                        </Link>
                                    </div>
                                </div>
                            </motion.div>
                        </AnimatePresence>
                    </div>

                    <button className="carousel-control next" onClick={next}><ChevronRight /></button>
                </div>

                <div className="carousel-indicators">
                    {posts.map((_, i) => (
                        <div
                            key={i}
                            className={`dot ${currentIndex === i ? 'active' : ''}`}
                            onClick={() => setCurrentIndex(i)}
                        ></div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default NewsCarousel;
