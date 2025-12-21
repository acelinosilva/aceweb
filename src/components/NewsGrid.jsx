import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Calendar, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import './NewsGrid.css';

const NewsGrid = () => {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        const savedPosts = JSON.parse(localStorage.getItem('ace_blog_posts')) || [];

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
            setPosts(savedPosts.slice(0, 3));
        }
    }, []);

    const stripHtml = (html) => {
        const tmp = document.createElement("DIV");
        tmp.innerHTML = html;
        return tmp.textContent || tmp.innerText || "";
    };

    const fadeInUp = {
        initial: { opacity: 0, y: 30 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true },
        transition: { duration: 0.6 }
    };

    return (
        <section className="news-grid-section section-padding">
            <div className="container">
                <header className="text-center mb-5">
                    <span className="badge">Knowledge Hub</span>
                    <h2 className="section-title">Insights do <span>Nosso Blog</span></h2>
                    <p className="description-premium max-700 mx-auto">Confira as últimas novidades e estratégias para dominar o mercado digital.</p>
                </header>

                <div className="news-grid-home">
                    {posts.map((post, index) => (
                        <motion.article
                            key={index}
                            {...fadeInUp}
                            transition={{ delay: index * 0.1 }}
                            className="news-card-home glass-card neural-border"
                        >
                            {post.image && (
                                <div className="news-card-img">
                                    <img src={post.image} alt={post.title} />
                                </div>
                            )}
                            <div className="news-card-body">
                                <div className="news-meta">
                                    <Calendar size={14} /> {post.date}
                                </div>
                                <h3>{post.title}</h3>
                                <p>{stripHtml(post.content).substring(0, 120)}...</p>
                                <Link
                                    to={post.isPlaceholder ? "/blog" : `/blog/${index}`}
                                    className="read-more-link"
                                >
                                    Ler Artigo <ArrowRight size={18} />
                                </Link>
                            </div>
                        </motion.article>
                    ))}
                </div>

                <div className="text-center mt-5">
                    <Link to="/blog" className="btn btn-outline">Ver Blog Completo</Link>
                </div>
            </div>
        </section>
    );
};

export default NewsGrid;
