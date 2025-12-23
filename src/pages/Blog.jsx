import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Calendar, User, ArrowRight, Newspaper } from 'lucide-react';
import { Link } from 'react-router-dom';
import SEO from '../components/SEO';
import './Blog.css';
import { useAsyncImage } from '../hooks/useAsyncImage';

const BlogCard = ({ post, index, stripHtml, fadeInUp }) => {
    const imageUrl = useAsyncImage(post.image);

    return (
        <motion.article
            {...fadeInUp}
            transition={{ delay: index * 0.1 }}
            className="blog-card glass-card neural-border"
        >
            {post.image && (
                <div className="blog-card-image">
                    <img src={imageUrl || post.image} alt={post.title} />
                </div>
            )}
            <div className="blog-card-content">
                <div className="blog-meta">
                    <span><Calendar size={14} /> {post.date}</span>
                    <span><User size={14} /> Equipe Aceweb</span>
                </div>
                <h3>{post.title}</h3>
                <p>{stripHtml(post.content).substring(0, 150)}...</p>
                <Link to={`/blog/${index}`} className="read-more">
                    Ler Artigo <ArrowRight size={18} />
                </Link>
            </div>
        </motion.article>
    );
};

const Blog = () => {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        const savedPosts = JSON.parse(localStorage.getItem('ace_blog_posts')) || [];
        setPosts(savedPosts);
    }, []);

    const fadeInUp = {
        initial: { opacity: 0, y: 30 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true },
        transition: { duration: 0.6 }
    };

    const stripHtml = (html) => {
        const tmp = document.createElement("DIV");
        tmp.innerHTML = html;
        return tmp.textContent || tmp.innerText || "";
    };

    return (
        <div className="blog-page">
            <SEO
                title="Blog News & Insights"
                description="Fique por dentro das últimas tendências de design, tecnologia e marketing digital no Blog da Aceweb."
            />
            <section className="blog-hero">
                <div className="hero-grid-overlay"></div>
                <div className="container">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-center"
                    >
                        <span className="badge-premium">News & Insights</span>
                        <h1 className="title-premium">Blog <span>Aceweb</span></h1>
                        <p className="description-premium mx-auto max-700">Explorando as últimas tendências em tecnologia, design e estratégias digitais.</p>
                    </motion.div>
                </div>
            </section>

            <section className="section-padding">
                <div className="container">
                    <div className="blog-grid">
                        {posts.length > 0 ? (
                            posts.map((post, index) => (
                                <BlogCard
                                    key={index}
                                    post={post}
                                    index={index}
                                    stripHtml={stripHtml}
                                    fadeInUp={fadeInUp}
                                />
                            ))
                        ) : (
                            <div className="empty-blog text-center">
                                <Newspaper size={60} />
                                <h3>Nenhum artigo publicado ainda.</h3>
                                <p>Fique atento às nossas novidades em breve!</p>
                            </div>
                        )}
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Blog;
