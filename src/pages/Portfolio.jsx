import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ExternalLink, MousePointer2 } from 'lucide-react';
import SEO from '../components/SEO';
import './Portfolio.css';
import { useAsyncImage } from '../hooks/useAsyncImage';

const ProjectCard = ({ project, delay }) => {
    const imageUrl = useAsyncImage(project.image);
    const [rotate, setRotate] = useState({ x: 0, y: 0 });
    const [spotlight, setSpotlight] = useState({ x: 0, y: 0, opacity: 0 });

    const handleMouseMove = (e) => {
        const card = e.currentTarget;
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        // Tilt Logic
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        const rotateX = (y - centerY) / 10;
        const rotateY = (centerX - x) / 10;
        setRotate({ x: rotateX, y: rotateY });

        // Spotlight Logic
        setSpotlight({ x, y, opacity: 1 });
    };

    const handleMouseLeave = () => {
        setRotate({ x: 0, y: 0 });
        setSpotlight(prev => ({ ...prev, opacity: 0 }));
    };

    return (
        <motion.div
            layout
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: delay }}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            animate={{ rotateX: rotate.x, rotateY: rotate.y }}
            style={{ perspective: 1000 }}
            className="project-card glass-card neural-border"
        >
            <div
                className="spotlight-glow"
                style={{
                    background: `radial-gradient(600px circle at ${spotlight.x}px ${spotlight.y}px, rgba(68, 208, 93, 0.15), transparent 40%)`,
                    opacity: spotlight.opacity
                }}
            />
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
    const [filter, setFilter] = useState('Todos');
    const [filteredProjects, setFilteredProjects] = useState([]);

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

        const premiumProjects = [
            { title: "Ligiê Odontologia", category: "Saúde & Estética", image: "ligie.jpg", tags: ["Odontologia", "Acupuntura", "Brasília"] },
            { title: "HM SEG Corretora", category: "Serviços", image: "hmseg.png", tags: ["Seguros", "Planos de Saúde", "Taguatinga"] },
            { title: "Max Telhas", category: "Serviços", image: "max-telhas.png", tags: ["Telhados", "Coberturas", "DF"] },
            { title: "Moura Embalagens", category: "Indústria", image: "moura-embalagens.png", tags: ["Embalagens", "Sacos de Lixo", "Brasil"] },
            { title: "Feira do Guará", category: "Institucional", image: "feiraguara.png", tags: ["Guará", "DF", "Portal"] },
            { title: "Sete Mares Boats", category: "Serviços", image: "setemares-boats.png", tags: ["Embarcações", "Manutenção", "Naval"] },
            { title: "Centro Hípico do Parque", category: "Institucional", image: "centrohipico.png", tags: ["Hipismo", "Cursos", "Brasília"] },
            { title: "Psicóloga Aline Álan", category: "Saúde & Estética", image: "alinealan-psico.png", tags: ["Psicologia", "TCC", "Saúde"] },
            { title: "Trust7 IT", category: "Tecnologia", image: "trust7it.png", tags: ["Cybersecurity", "LGPD", "Tech"] },
            { title: "Teletronic RFID", category: "Tecnologia", image: "teletronic.png", tags: ["RFID", "Segurança", "Brasília"] },
            { title: "Fapes Odontologia", category: "Saúde & Estética", image: "fapes-odontologia.png", tags: ["Harmonização", "Odonto", "SP"] },
            { title: "B2B Serviços", category: "Serviços", image: "b2b-servicos.png", tags: ["B2B", "Outsourcing", "DF"] },
            { title: "Gabriel Mato Grosso", category: "Institucional", image: "gabriel-mg.png", tags: ["Político", "MT", "Institucional"] },
            { title: "Odonto Sil", category: "Saúde & Estética", image: "odontosil.png", tags: ["Odontologia", "Cidade Líder", "SP"] },
            { title: "Prevent Odonto", category: "Saúde & Estética", image: "prevent-odonto.png", tags: ["Clínica", "Odontologia", "DF"] },
            { title: "Dedetizadora Universal", category: "Serviços", image: "dedetiza-universal.png", tags: ["Dedetização", "Controle Pragas", "DF"] },
            { title: "Almo Assessoria", category: "Tecnologia", image: "almo-assessoria.png", tags: ["Assessoria", "Dentistas", "ROI"] },
            { title: "LWA Neuropediatria", category: "Saúde & Estética", image: "lwa.png", tags: ["Neurologia", "Pediatria", "Exames"] },
            { title: "Idamir Bandeira", category: "Serviços", image: "idamir-imoveis.png", tags: ["Imóveis", "Sudoeste", "Brasília"] },
            { title: "Dedetiza Brasília", category: "Serviços", image: "dedetiza-v2.png", tags: ["Dedetização", "Brasília", "DF"] },
            { title: "Unity IT", category: "Tecnologia", image: "unityit.jpg", tags: ["IT", "Segurança", "Hardware"] },
            { title: "Pratika Piscinas", category: "Serviços", image: "pratika.png", tags: ["Manutenção", "Piscinas", "Instalação"] },
            { title: "Prof. Carol Camilo", category: "Institucional", image: "carolcamilo.png", tags: ["Consultoria", "Acadêmica", "Mestre"] },
            { title: "Academia de Letras", category: "Institucional", image: "academia.png", tags: ["Literatura", "Cultura", "Mato Grosso"] },
            { title: "Portal Jurídico", category: "Institucional", image: "portaljuridico.jpg", tags: ["Jurídico", "Estudantes", "Portal"] },
            { title: "Sistenório Business", category: "Serviços", image: "sistenorio.png", tags: ["USA", "Business", "Pool Service"] },
            { title: "Lago Norte Eventos", category: "Serviços", image: "lagonorte.jpg", tags: ["Tendas", "Mobiliário", "DF"] },
            { title: "Aline Resende - Implantes", category: "Saúde & Estética", image: "alinere-implantes.png", tags: ["Implantes", "Odontologia", "SP"] },
            { title: "Clínica Aline Resende", category: "Saúde & Estética", image: "alineresende.jpg", tags: ["Harmonização", "Odontologia", "Premium"] }
        ];

        let finalProjects = [...premiumProjects, ...loadedProjects];

        if (finalProjects.length < totalNeeded) {
            const placeholders = Array.from({ length: totalNeeded - finalProjects.length }).map((_, i) => ({
                title: `Projeto Portfolio ${finalProjects.length + i + 1}`,
                category: ["Landing Page", "Tecnologia", "Saúde & Estética", "Institucional"][i % 4],
                image: i % 3 === 0 ? "p1.png" : i % 3 === 1 ? "p2.png" : "p3.png",
                tags: ["Aceweb Elite", "Conceito"]
            }));
            finalProjects = [...finalProjects, ...placeholders];
        }

        setAllProjects(finalProjects);
        setFilteredProjects(finalProjects);
    }, []);

    useEffect(() => {
        if (filter === 'Todos') {
            setFilteredProjects(allProjects);
        } else {
            setFilteredProjects(allProjects.filter(p => p.category === filter));
        }
    }, [filter, allProjects]);

    const categories = ['Todos', 'Saúde & Estética', 'Tecnologia', 'Serviços', 'Institucional', 'Indústria'];

    const fadeInUp = {
        initial: { opacity: 0, y: 30 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true },
        transition: { duration: 0.6 }
    };

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="portfolio-page"
        >
            <SEO
                title="Portfólio de Sites"
                description="Conheça nossos últimos projetos de criação de sites, landing pages e e-commerce em Brasília e em todo o Brasil."
            />
            <section className="portfolio-hero">
                <div className="mesh-bg"></div>
                <div className="container">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-center"
                    >
                        <span className="badge">Nossos Cases de Sucesso</span>
                        <h1 className="section-title">Projetos que <span>Transformam</span></h1>
                        <p className="description-premium mx-auto max-700">
                            Exploração visual de soluções digitais de alta performance. Cada projeto é uma fusão de design estratégico e tecnologia de ponta.
                        </p>
                    </motion.div>

                    <div className="portfolio-filters">
                        {categories.map((cat, idx) => (
                            <button
                                key={idx}
                                onClick={() => setFilter(cat)}
                                className={`filter-btn ${filter === cat ? 'active' : ''}`}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>
                </div>
            </section>

            <section className="portfolio-grid-section">
                <div className="container">
                    <motion.div layout className="portfolio-grid">
                        <AnimatePresence>
                            {filteredProjects.map((project, index) => (
                                <ProjectCard
                                    key={`${project.title}-${index}`}
                                    project={project}
                                    delay={index * 0.05}
                                />
                            ))}
                        </AnimatePresence>
                    </motion.div>

                    <div className="cta-portfolio-end">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            className="glass-card premium-cta-box"
                        >
                            <h2>Pronto para ser o próximo case de sucesso?</h2>
                            <p>Vamos criar algo extraordinário juntos.</p>
                            <a href="https://api.whatsapp.com/send?phone=5561996986162&text=Olá,%20vi%20seu%20portfólio%20e%20gostaria%20de%20um%20orçamento!" className="btn btn-primary">
                                Iniciar meu Projeto <ExternalLink size={20} />
                            </a>
                        </motion.div>
                    </div>
                </div>
            </section>
        </motion.div>
    );
};

export default Portfolio;
