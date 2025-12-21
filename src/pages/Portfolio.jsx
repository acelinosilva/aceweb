import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, MousePointer2 } from 'lucide-react';
import './Portfolio.css';

const Portfolio = () => {
    const [allProjects, setAllProjects] = useState([]);

    useEffect(() => {
        let savedProjects = [];
        try {
            const stored = localStorage.getItem('ace_portfolio_items');
            savedProjects = stored ? JSON.parse(stored) : [];
            if (!Array.isArray(savedProjects)) savedProjects = [];
        } catch (e) {
            console.error("Error loading portfolio items:", e);
            savedProjects = [];
        }

        const dynamicProjects = savedProjects.map(proj => ({
            title: proj.title || "Projeto Aceweb",
            category: proj.category || "Desenvolvimento Web",
            image: proj.image || "p1.png",
            tags: Array.isArray(proj.tags) ? proj.tags : ["Aceweb Elite", "Digital"]
        }));

        setAllProjects(dynamicProjects);
    }, []);

    const fadeInUp = {
        initial: { opacity: 0, y: 30 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true },
        transition: { duration: 0.6 }
    };

    return (
        <div className="portfolio-page">
            {/* Portfolio Hero */}
            <section className="portfolio-hero">
                <div className="mesh-bg"></div>
                <div className="container">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-center"
                    >
                        <span className="badge">Nosso Portfólio</span>
                        <h1 className="text-gradient">Projetos que <span>Fazem História</span></h1>
                        <p className="hero-subtitle">Uma seleção exclusiva de experiências digitais criadas para impactar e converter.</p>
                    </motion.div>
                </div>
            </section>

            {/* Projects Grid */}
            <section className="section-padding">
                <div className="container">
                    <div className="portfolio-grid-main">
                        {allProjects.map((project, index) => (
                            <motion.div
                                key={index}
                                {...fadeInUp}
                                transition={{ delay: index * 0.1 }}
                                className="project-card glass-card neural-border"
                            >
                                <div className="project-image-box">
                                    <img src={project.image} alt={project.title} />
                                    <div className="project-hover-overlay">
                                        <div className="hover-content">
                                            <ExternalLink size={32} />
                                            <span>Ver Detalhes</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="project-info">
                                    <div className="project-meta">
                                        <span className="project-cat">{project.category}</span>
                                        <h3>{project.title}</h3>
                                    </div>
                                    <div className="project-tags">
                                        {project.tags.map((tag, i) => (
                                            <span key={i} className="tag">{tag}</span>
                                        ))}
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Final CTA */}
            <section className="section-padding bg-surface">
                <div className="container text-center">
                    <motion.div {...fadeInUp} className="portfolio-cta glass-card">
                        <h2>O seu projeto pode ser o <span>próximo</span>.</h2>
                        <p>Entre em contato e descubra como podemos elevar o nível da sua marca.</p>
                        <a href="https://api.whatsapp.com/send?phone=5561996986162&text=Ol%C3%A1,%20preciso%20de%20um%20site%20e%20gostaria%20de%20um%20or%C3%A7amento!" className="btn btn-primary">Iniciar Orçamento <MousePointer2 size={20} /></a>
                    </motion.div>
                </div>
            </section>
        </div>
    );
};

export default Portfolio;
