import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Calendar, ArrowRight, Newspaper } from 'lucide-react';
import { Link } from 'react-router-dom';
import './NewsCarousel.css';

const NewsCarousel = () => {
    const [posts, setPosts] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        const savedPosts = JSON.parse(localStorage.getItem('ace_blog_posts')) || [];

        // Se não houver posts, usamos alguns estáticos para o design não ficar vazio
        if (savedPosts.length === 0) {
            setPosts([
                {
                    title: "Tendências de Web Design para 2025",
                    content: "Descubra como a inteligência artificial e o design minimalista estão moldando o futuro da internet...",
                    date: "21/12/2024",
                    image: "p1.png",
                    isPlaceholder: true
                },
                {
                    title: "O Padrão de Performance Aceweb",
                    content: "Por que a velocidade de carregamento é o fator número 1 para converter visitantes em clientes no seu site...",
                    date: "20/12/2024",
                    image: "p2.png",
                    isPlaceholder: true
                },
                {
                    title: "SEO Local em Brasília: Como Dominar",
                    content: "Dicas essenciais para empresas do DF que desejam aparecer na primeira página das buscas locais...",
                    date: "19/12/2024",
                    image: "p3.png",
                    isPlaceholder: true
                }
            ]);
        } else {
            // Pegamos os 3 mais recentes do localStorage
            setPosts(savedPosts.slice(0, 3));
        }
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
                    <span className="badge">Knowledge Hub</span>
                    <h2 className="section-title">Insights do <span>Nosso Blog</span></h2>
                </header>

                <div className="carousel-main-container">
                    <button className="carousel-control prev" onClick={prev}><ChevronLeft /></button>

                    <div className="carousel-viewport">
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={currentIndex}
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 1.05 }}
                                transition={{ duration: 0.5, ease: "easeInOut" }}
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
                                        <p>{stripHtml(posts[currentIndex].content).substring(0, 160)}...</p>
                                        <Link
                                            to={posts[currentIndex].isPlaceholder ? "/blog" : `/blog/${currentIndex}`}
                                            className="read-more"
                                        >
                                            Ler Artigo Completo <ArrowRight size={18} />
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
