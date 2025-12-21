import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, MousePointer2 } from 'lucide-react';
import './Portfolio.css';

const Portfolio = () => {
    const [allProjects, setAllProjects] = useState([]);

    useEffect(() => {
        const staticProjects = [
            { title: "Urban Haven", category: "Real Estate Dashboard", image: "p1.png", tags: ["React", "Glassmorphism", "High-End"] },
            { title: "PeakFlow Fitness", category: "Mobile Landing Page", image: "p2.png", tags: ["Mobile First", "Performance", "UI/UX"] },
            { title: "Aurora Tech", category: "Corporate Startup Site", image: "p3.png", tags: ["Multi-device", "SEO", "Modern"] },
            { title: "Skyline Realty", category: "Real Estate", image: "p4.png", tags: ["Clean", "SEO", "Corporate"] },
            { title: "Oceanic Resort", category: "Travel & Tourism", image: "p5.png", tags: ["Immersive", "Booking", "UI"] },
            { title: "Green Energy", category: "Sustainability", image: "p6.png", tags: ["Eco-friendly", "Modern", "Clean"] },
            { title: "Gourmet Hub", category: "Restaurant & Food", image: "p7.png", tags: ["Visual", "E-commerce", "Mobile"] },
            { title: "Tech Pulse", category: "Technology Blog", image: "p8.png", tags: ["Performance", "SEO", "React"] },
            { title: "Fit Track", category: "Health & Fitness", image: "p9.png", tags: ["App Design", "UI/UX", "Dynamic"] },
            { title: "Art Gallery", category: "Art & Culture", image: "p10.png", tags: ["Minimalist", "Portfolio", "Clean"] },
            { title: "Urban Beats", category: "Music & Entertainment", image: "p11.png", tags: ["vibrant", "Dynamic", "UI"] },
            { title: "Nature's Best", category: "Organic Products", image: "p12.png", tags: ["Natural", "Shop", "Green"] },
            { title: "City Guide", category: "Travel Directory", image: "p13.png", tags: ["Interactive", "Search", "Map"] },
            { title: "Edu Learn", category: "Education Platform", image: "p14.png", tags: ["Learning", "Student Hub", "Clean"] },
            { title: "Global Log", category: "Logistics & Shipping", image: "p15.png", tags: ["Corporate", "Tracking", "Blue"] },
            { title: "Eco Build", category: "Construction & Deco", image: "p16.png", tags: ["Structural", "Industry", "SEO"] },
            { title: "Fashion Forward", category: "Boutique Shop", image: "p17.png", tags: ["E-commerce", "Luxury", "Style"] },
            { title: "Healthy Life", category: "Wellness Center", image: "p18.png", tags: ["Peaceful", "Clean", "Calm"] },
            { title: "Swift Drive", category: "Car Rental", image: "p19.png", tags: ["Speed", "Service", "Auto"] },
            { title: "Home Style", category: "Interior Design", image: "p20.png", tags: ["Decor", "Visual", "Elite"] },
            { title: "Pet Care", category: "Veterinary Services", image: "p21.png", tags: ["Friendly", "Care", "Animal"] },
            { title: "Quick Fix", category: "IT Services", image: "p22.png", tags: ["Support", "Tech", "Fast"] },
            { title: "Creative Mind", category: "Marketing Agency", image: "p23.png", tags: ["Strategy", "Ads", "Creative"] },
            { title: "Zen Garden", category: "Spa & Beauty", image: "p24.png", tags: ["Relax", "Bliss", "Visual"] },
            { title: "Smart Home", category: "IoT Technology", image: "p25.png", tags: ["Future", "Smartech", "UI"] },
            { title: "Aceweb Store", category: "E-commerce Elite", image: "p26.png", tags: ["Sales", "Performance", "Shop"] },
            { title: "Legal Counsel", category: "Law & Justice", image: "p27.png", tags: ["Formal", "Trust", "Security"] }
        ];

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

        setAllProjects([...dynamicProjects, ...staticProjects]);
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
