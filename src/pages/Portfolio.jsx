import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, MousePointer2 } from 'lucide-react';
import SEO from '../components/SEO';
import './Portfolio.css';
import { useAsyncImage } from '../hooks/useAsyncImage';

const ProjectCard = ({ project, delay }) => {
    const imageUrl = useAsyncImage(project.image);

    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: delay }}
            className="project-card glass-card neural-border"
        >
            <div className="project-image-box">
                <img src={imageUrl || project.image} alt={project.title} />
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
    );
};

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

        const loadedProjects = savedProjects.map(proj => ({
            title: proj.title || "Projeto Aceweb",
            category: proj.category || "Desenvolvimento Web",
            image: proj.image || "p1.png",
            tags: Array.isArray(proj.tags) ? proj.tags : ["Aceweb Elite", "Digital"]
        }));

        const totalNeeded = 30;
        const currentCount = loadedProjects.length;

        let finalProjects = [...loadedProjects];

        if (currentCount < totalNeeded) {
            const placeholders = Array.from({ length: totalNeeded - currentCount }).map((_, i) => ({
                title: `Projeto Portfolio ${currentCount + i + 1}`,
                category: ["E-commerce", "Institucional", "Landing Page", "App Web"][i % 4],
                image: i % 3 === 0 ? "p1.png" : i % 3 === 1 ? "p2.png" : "p3.png",
                tags: ["Aceweb Elite", "Conceito"]
            }));
            finalProjects = [...finalProjects, ...placeholders];
        }

        setAllProjects(finalProjects);
    }, []);
    // ... existing code ...

    const fadeInUp = {
        initial: { opacity: 0, y: 30 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true },
        transition: { duration: 0.6 }
    };

    return (
        <div className="portfolio-page">
            <SEO
                title="Nosso Portfólio"
                description="Conheça nossos projetos recentes. Criação de Sites, Landing Pages e E-commerce em Brasília com design exclusivo."
            />
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
                            <ProjectCard key={index} project={project} delay={index * 0.1} />
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
