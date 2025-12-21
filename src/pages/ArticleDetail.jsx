import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Calendar, User, ArrowLeft, Share2 } from 'lucide-react';
import './ArticleDetail.css';

const ArticleDetail = () => {
    const { id } = useParams();
    const [post, setPost] = useState(null);

    useEffect(() => {
        const savedPosts = JSON.parse(localStorage.getItem('ace_blog_posts')) || [];
        const index = parseInt(id);
        if (savedPosts[index]) {
            setPost(savedPosts[index]);
        }
        window.scrollTo(0, 0);
    }, [id]);

    if (!post) {
        return (
            <div className="article-not-found container section-padding text-center">
                <h2>Artigo não encontrado</h2>
                <Link to="/blog" className="btn btn-outline mt-4"><ArrowLeft /> Voltar ao Blog</Link>
            </div>
        );
    }

    return (
        <div className="article-detail-page">
            <div className="article-hero-bg"></div>

            <div className="container narrow-container">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="article-header"
                >
                    <Link to="/blog" className="back-link"><ArrowLeft size={18} /> Voltar ao Blog</Link>
                    <div className="article-meta-large">
                        <span><Calendar size={16} /> {post.date}</span>
                        <span><User size={16} /> Equipe Aceweb</span>
                    </div>
                    <h1 className="article-title-main">{post.title}</h1>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3 }}
                    className="article-content-body glass-card neural-border"
                >
                    {post.image && (
                        <div className="article-featured-image">
                            <img src={post.image} alt={post.title} />
                        </div>
                    )}
                    <div
                        className="prose-content"
                        dangerouslySetInnerHTML={{ __html: post.content }}
                    ></div>

                    <div className="article-footer-tools">
                        <button className="btn-share" onClick={() => {
                            navigator.clipboard.writeText(window.location.href);
                            alert('Link copiado para a área de transferência!');
                        }}>
                            <Share2 size={18} /> Compartilhar Insight
                        </button>
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default ArticleDetail;
