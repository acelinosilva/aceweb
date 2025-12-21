import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
    ArrowRight, Globe, Zap, Smartphone, CheckCircle,
    Target, Rocket, Star,
    MousePointer2, Laptop, Code, ExternalLink, Layout, Quote
} from 'lucide-react';
import { Link } from 'react-router-dom';
import NewsCarousel from '../components/NewsCarousel';
import './Home.css';

const Home = () => {
    const [instData, setInstData] = useState({
        heroTagline: 'Criação de Sites em Brasília',
        heroSubtitle: 'Agência especialista em criar sites no DF e landing pages de alta conversão. Elevamos sua autoridade digital com SEO em Brasília e performance extrema.',
        homeAboutText: 'A ACEWEB é referência em criação de sites em Brasília. Atendemos todo o Distrito Federal e o Brasil, desenvolvendo soluções digitais que colocam sua empresa no topo das buscas. Se você busca criar sites profissionais em Brasília, está no lugar certo.'
    });

    const [recentProjects, setRecentProjects] = useState([
        { title: "Urban Haven", cat: "Luxury Real Estate", img: "/p1.png" },
        { title: "PeakFlow", cat: "Fitness App", img: "/p2.png" },
        { title: "Aurora Tech", cat: "Tech Startup", img: "/p3.png" }
    ]);

    useEffect(() => {
        const savedInst = JSON.parse(localStorage.getItem('ace_inst_data'));
        if (savedInst) setInstData(prev => ({ ...prev, ...savedInst }));

        const savedProjects = JSON.parse(localStorage.getItem('ace_portfolio_items')) || [];

        const staticItems = [
            { title: "Urban Haven", cat: "Luxury Real Estate", img: "/p1.png" },
            { title: "PeakFlow", cat: "Fitness App", img: "/p2.png" },
            { title: "Aurora Tech", cat: "Tech Startup", img: "/p3.png" }
        ];

        const dynamicItems = savedProjects.map(p => ({
            title: p.title,
            cat: p.category,
            img: p.image
        }));

        // Merge and take top 3
        const merged = [...dynamicItems, ...staticItems].slice(0, 3);
        setRecentProjects(merged);
    }, []);

    const fadeInUp = {
        initial: { opacity: 0, y: 30 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true },
        transition: { duration: 0.6 }
    };

    const services = [
        {
            icon: <Laptop size={32} />,
            title: "Landing Pages",
            desc: "Desenvolvemos páginas de alta conversão para seus anúncios, com foco total em resultados e Copywriting persuasivo.",
            features: ["Carregamento Ultrarápido", "Foco em Conversão", "Design Exclusivo"]
        },
        {
            icon: <Globe size={32} />,
            title: "Sites Institucionais",
            desc: "Sua presença profissional na web. Sites completos, modernos e fáceis de navegar para sua empresa.",
            features: ["Gestão de Conteúdo", "Blog Profissional", "Totalmente Gerenciável"]
        },
        {
            icon: <Code size={32} />,
            title: "Escalabilidade",
            desc: "Sites preparados para crescer junto com seu negócio, utilizando as tecnologias mais modernas do mercado.",
            features: ["React/Vite", "Performance SEO", "Suporte Dedicado"]
        }
    ];

    const testimonials = [
        {
            initials: "WC",
            name: "Wanessa Castro",
            date: "1 ano atrás",
            text: "Fui por indicação, e amei o trabalho, rápidos, comprometidos, e experientes. Sucesso garantido !!! Parabéns a toda equipe !!!!",
            rating: 5
        },
        {
            initials: "ES",
            name: "Erida Silva",
            date: "1 ano atrás",
            text: "Gostamos muito do trabalho, nosso site ficou como a gente desejava! Super rápido em fazer alterações solicitadas! Super indico",
            rating: 5
        },
        {
            initials: "BE",
            name: "Breno Emanuel",
            date: "2 anos atrás",
            text: "Agilidade e eficiência. Simples assim! Indico.",
            rating: 5
        },
        {
            initials: "HM",
            name: "Helio Miranda",
            date: "2 anos atrás",
            text: "A experiência na prestação do serviço foi nota 10. O Profissional foi super atencioso e dedicado até a conclusão do serviço contratado. Super indico!",
            rating: 5
        },
        {
            initials: "AR",
            name: "Aline Resende",
            date: "Google Review",
            text: "Excelente atendimento! O sr. Acelino foi muito atencioso e prestativo conosco, nos ajudou mesmo antes de o contratarmos. O nosso site ficou ótimo.",
            rating: 5
        }
    ];

    return (
        <div className="home-page">
            {/* Premium Hero Section */}
            <section className="hero">
                <div className="hero-grid-overlay"></div>
                <div className="mesh-bg"></div>

                <div className="container hero-container-flex">
                    <div className="hero-text-side">
                        <motion.div
                            initial={{ opacity: 0, x: -50 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8 }}
                            className="hero-badge-elite"
                        >
                            <span className="dot"></span>
                            <span>Especialistas em Brasília & Nacional</span>
                        </motion.div>

                        <motion.h1
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2, duration: 0.8 }}
                            className="hero-title-elite"
                        >
                            {instData.heroTagline}
                        </motion.h1>

                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.4, duration: 0.8 }}
                            className="hero-subtitle-elite"
                            dangerouslySetInnerHTML={{ __html: instData.heroSubtitle }}
                        ></motion.p>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.6, duration: 0.8 }}
                            className="hero-btns-elite"
                        >
                            <a href="https://api.whatsapp.com/send?phone=5561996986162&text=Ol%C3%A1,%20preciso%20de%20um%20site%20e%20gostaria%20de%20um%20or%C3%A7amento!" className="btn-elite-primary pulse-glow">
                                Iniciar Projeto <MousePointer2 size={22} />
                            </a>
                            <Link to="/portfolio" className="btn-elite-outline">
                                Ver Cases <ArrowRight size={22} />
                            </Link>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 1, duration: 1 }}
                            className="trusted-by"
                        >
                            <span className="trusted-text">Aprovado por mais de 100+ empresas</span>
                            <div className="trusted-stars">
                                <Zap size={16} fill="var(--primary-color)" />
                                <Zap size={16} fill="var(--primary-color)" />
                                <Zap size={16} fill="var(--primary-color)" />
                                <Zap size={16} fill="var(--primary-color)" />
                                <Zap size={16} fill="var(--primary-color)" />
                            </div>
                        </motion.div>
                    </div>

                    <div className="hero-visual-side">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.5, duration: 1 }}
                            className="neural-sphere-container"
                        >
                            <div className="neural-sphere"></div>

                            {/* Floating Feature Cards */}
                            <motion.div
                                animate={{ y: [0, -20, 0] }}
                                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                                className="float-card card-1 glass-card"
                            >
                                <Zap size={24} color="var(--primary-color)" />
                                <div>
                                    <h4>Alta Performance</h4>
                                    <p>Score 100 no PageSpeed</p>
                                </div>
                            </motion.div>

                            <motion.div
                                animate={{ y: [0, 20, 0] }}
                                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
                                className="float-card card-2 glass-card"
                            >
                                <Target size={24} color="var(--primary-color)" />
                                <div>
                                    <h4>Foco em SEO</h4>
                                    <p>Top 1 no Google</p>
                                </div>
                            </motion.div>

                            <motion.div
                                animate={{ y: [0, -15, 0] }}
                                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                                className="float-card card-3 glass-card"
                            >
                                <Rocket size={24} color="var(--primary-color)" />
                                <div>
                                    <h4>Entrega Rápida</h4>
                                    <p>Seu site em 7 dias</p>
                                </div>
                            </motion.div>
                        </motion.div>
                    </div>
                </div>

                <div className="hero-scroll-indicator">
                    <motion.div
                        animate={{ y: [0, 10, 0] }}
                        transition={{ duration: 2, repeat: Infinity }}
                        className="mouse"
                    >
                        <div className="wheel"></div>
                    </motion.div>
                </div>
            </section>

            {/* Recent Portfolio Section */}
            <section className="section-padding portfolio-highlights">
                <div className="container">
                    <header className="text-center mb-5">
                        <span className="badge">Destaques</span>
                        <h2 className="section-title">Portfólio <span>Recente</span></h2>
                    </header>

                    <div className="highlights-grid">
                        {recentProjects.map((project, index) => (
                            <motion.div
                                key={index}
                                {...fadeInUp}
                                transition={{ delay: index * 0.1 }}
                                className="highlight-card-mini glass-card neural-border"
                            >
                                <div className="highlight-img">
                                    <img src={project.img} alt={project.title} />
                                    <div className="highlight-overlay">
                                        <Link to="/portfolio" className="icon-btn-circle"><ExternalLink size={20} /></Link>
                                    </div>
                                </div>
                                <div className="highlight-info-mini">
                                    <span>{project.cat}</span>
                                    <h3>{project.title}</h3>
                                </div>
                            </motion.div>
                        ))}
                    </div>

                    <div className="text-center mt-5">
                        <Link to="/portfolio" className="btn btn-outline">Ver todos os projetos <ArrowRight size={18} /></Link>
                    </div>
                </div>
            </section>

            {/* Premium About Section */}
            <section className="section-padding home-about">
                <div className="container">
                    <div className="about-grid-premium">
                        <motion.div
                            initial={{ opacity: 0, x: -50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8 }}
                            className="about-visual-container"
                        >
                            <div className="about-image-wrapper">
                                <img src="/about-home.png" alt="Aceweb Agency Futuristic Office" />
                                <div className="about-image-glow"></div>
                            </div>

                            <div className="experience-badge float-anim">
                                <h3>5+</h3>
                                <p>Anos de Excelência</p>
                            </div>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, x: 50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                            className="about-content-side"
                        >
                            <span className="badge-premium">Sobre a ACEWEB</span>
                            <h2 className="title-premium">Focados em elevar o <span>padrão digital</span>.</h2>
                            <p className="description-premium" dangerouslySetInnerHTML={{ __html: instData.homeAboutText }}>
                            </p>

                            <div className="value-features-grid">
                                <div className="value-feature">
                                    <div className="feature-dot"></div>
                                    <span>Design Brasileiro de Classe Mundial</span>
                                </div>
                                <div className="value-feature">
                                    <div className="feature-dot"></div>
                                    <span>Código Limpo & Escalonável</span>
                                </div>
                                <div className="value-feature">
                                    <div className="feature-dot"></div>
                                    <span>Foco Total em ROI & Conversão</span>
                                </div>
                            </div>

                            <div className="about-actions-home">
                                <Link to="/sobre" className="btn-premium-outline">
                                    Conheça Nossa História <ArrowRight size={20} />
                                </Link>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Expanded Services Section on Home */}
            <section className="section-padding">
                <div className="container">
                    <header className="home-services-header text-center">
                        <span className="badge">Especialidades</span>
                        <h2 className="section-title">O que fazemos de <span>melhor</span></h2>
                    </header>

                    <div className="services-grid-home">
                        {services.map((service, index) => (
                            <motion.div
                                key={index}
                                {...fadeInUp}
                                transition={{ delay: index * 0.1 }}
                                className="glass-card service-card-home neural-border"
                            >
                                <div className="service-icon">{service.icon}</div>
                                <h3>{service.title}</h3>
                                <p>{service.desc}</p>
                                <ul className="service-mini-list">
                                    {service.features.map((f, i) => (
                                        <li key={i}><Zap size={14} /> {f}</li>
                                    ))}
                                </ul>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Testimonials Section */}
            <section className="section-padding testimonials-section">
                <div className="container">
                    <header className="text-center mb-5">
                        <span className="badge">Depoimentos</span>
                        <h2 className="section-title">Aprovado por quem <span>confia</span></h2>
                        <p className="description-premium max-700 mx-auto">Confira o que nossos clientes dizem sobre a experiência de transformar seus negócios com a ACEWEB.</p>
                    </header>

                    <div className="testimonials-grid">
                        {testimonials.map((t, index) => (
                            <motion.div
                                key={index}
                                {...fadeInUp}
                                transition={{ delay: index * 0.1 }}
                                className="testimonial-card glass-card neural-border"
                            >
                                <div className="testimonial-header">
                                    <div className="avatar-circle">{t.initials}</div>
                                    <div className="client-info">
                                        <h4>{t.name}</h4>
                                        <span>{t.date}</span>
                                    </div>
                                    <div className="google-stars">
                                        {[...Array(t.rating)].map((_, i) => (
                                            <Star key={i} size={14} fill="var(--primary-color)" stroke="none" />
                                        ))}
                                    </div>
                                </div>
                                <div className="testimonial-body">
                                    <Quote size={24} className="quote-icon" />
                                    <p>{t.text}</p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            <NewsCarousel />

            {/* CTA Final */}
            <section className="section-padding bg-surface">
                <div className="container">
                    <motion.div
                        {...fadeInUp}
                        className="cta-final glass-card"
                    >
                        <div className="cta-final-content">
                            <h2>Pronto para dominar o <span>mercado digital</span>?</h2>
                            <p>Seu novo site está a apenas um clique de distância. Peça seu orçamento hoje!</p>
                            <div className="cta-btns">
                                <a href="https://api.whatsapp.com/send?phone=5561996986162&text=Ol%C3%A1,%20preciso%20de%20um%20site%20e%20gostaria%20de%20um%20or%C3%A7amento!" className="btn btn-primary">Quero meu site profissional</a>
                                <a href="https://api.whatsapp.com/send?phone=5561996986162&text=Ol%C3%A1,%20preciso%20de%20um%20site%20e%20gostaria%20de%20um%20or%C3%A7amento!" className="btn btn-outline">Falar no WhatsApp</a>
                            </div>
                        </div>
                        <div className="rocket-icon float-anim">
                            <Rocket size={80} />
                        </div>
                    </motion.div>
                </div>
            </section>
        </div>
    );
};

export default Home;
