import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
    ArrowRight, Globe, Zap, Smartphone, CheckCircle,
    Target, Rocket, Star,
    MousePointer2, Laptop, Code, ExternalLink, Layout, Quote
} from 'lucide-react';
import { Link } from 'react-router-dom';
import NewsGrid from '../components/NewsGrid';
import SEO from '../components/SEO';
import Marquee from '../components/Marquee';
import Counter from '../components/Counter';
import RevealText from '../components/RevealText';
import './Home.css';
import { useAsyncImage } from '../hooks/useAsyncImage';

const RecentProjectCard = ({ project, index, fadeInUp }) => {
    const imageUrl = useAsyncImage(project.img);
    const [spotlight, setSpotlight] = useState({ x: 0, y: 0, opacity: 0 });

    const handleMouseMove = (e) => {
        const card = e.currentTarget;
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        setSpotlight({ x, y, opacity: 1 });
    };

    const handleMouseLeave = () => {
        setSpotlight(prev => ({ ...prev, opacity: 0 }));
    };

    return (
        <motion.div
            {...fadeInUp}
            transition={{ delay: index * 0.1 }}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            className="highlight-card-mini glass-card neural-border"
            style={{ position: 'relative', overflow: 'hidden' }}
        >
            <div
                className="spotlight-glow"
                style={{
                    background: `radial-gradient(400px circle at ${spotlight.x}px ${spotlight.y}px, rgba(68, 208, 93, 0.1), transparent 40%)`,
                    opacity: spotlight.opacity
                }}
            />
            <div className="highlight-img">
                <img src={imageUrl || project.img} alt={project.title} />
                <div className="highlight-overlay">
                    <Link to="/portfolio" className="icon-btn-circle"><ExternalLink size={20} /></Link>
                </div>
            </div>
            <div className="highlight-info-mini">
                <span>{project.cat}</span>
                <h3>{project.title}</h3>
            </div>
        </motion.div>
    );
};

const Home = () => {
    const [instData, setInstData] = useState({
        heroTagline: 'Criação de Sites em Brasília',
        heroSubtitle: 'Agência especialista em criar sites no DF e landing pages de alta conversão. Elevamos sua autoridade digital com SEO em Brasília e performance extrema.',
        homeAboutText: 'A ACEWEB é referência em criação de sites em Brasília. Atendemos todo o Distrito Federal e o Brasil, desenvolvendo soluções digitais que colocam sua empresa no topo das buscas. Se você busca criar sites profissionais em Brasília, está no lugar certo.'
    });

    const [recentProjects, setRecentProjects] = useState([]);
    const [typedTagline, setTypedTagline] = useState('');

    useEffect(() => {
        const savedInst = JSON.parse(localStorage.getItem('ace_inst_data'));
        if (savedInst) setInstData(prev => ({ ...prev, ...savedInst }));

        const savedProjects = JSON.parse(localStorage.getItem('ace_portfolio_items')) || [];
        const staticItems = [
            { title: "Ligiê Odontologia", cat: "Clínica Médica", img: "ligie.jpg" },
            { title: "Unity IT", cat: "Tecnologia", img: "unityit.jpg" },
            { title: "Lago Norte Eventos", cat: "Serviços", img: "lagonorte.jpg" }
        ];

        const dynamicItems = savedProjects.map(p => ({
            title: p.title,
            cat: p.category,
            img: p.image
        }));

        const merged = [...staticItems, ...dynamicItems].slice(0, 3);
        setRecentProjects(merged);

        // Simple Typewriter Effect
        let i = 0;
        const tagline = savedInst?.heroTagline || 'Criação de Sites em Brasília';
        const timer = setInterval(() => {
            setTypedTagline(tagline.slice(0, i));
            i++;
            if (i > tagline.length) clearInterval(timer);
        }, 50);
        return () => clearInterval(timer);
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
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="home-page"
        >
            <SEO
                title="Criação de sites em Brasília-DF"
                description="Agência especialista em Criação de Sites em Brasília-DF e Landing Pages de alta conversão. Elevamos sua autoridade digital com SEO local e performance extrema."
                keywords="criação de sites em brasília-df, criar sites brasília, agência de sites df, web design brasília, seo brasília, landing page brasília, desenvolvimento web df"
                url="/"
            />
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
                            <span className="sr-only">Aceweb - Criação de Sites Profissionais em Brasília</span>
                            {typedTagline}<span className="cursor-blink">|</span>
                        </motion.h1>

                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.4, duration: 0.8 }}
                            className="hero-subtitle-elite"
                        >
                            Especialistas em <strong>Criação de Sites em Brasília</strong> e Landing Pages que convertem cliques em faturamento. Tecnologia de ponta para elevar sua autoridade no DF.
                        </motion.p>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.6, duration: 0.8 }}
                            className="hero-btns-elite"
                        >
                            <motion.a
                                whileHover={{ scale: 1.05 }}
                                href="https://api.whatsapp.com/send?phone=5561996986162&text=Ol%C3%A1,%20preciso%20de%20um%20site!"
                                className="btn-elite-primary pulse-glow"
                            >
                                Iniciar meu Site Profissional <Rocket size={20} />
                            </motion.a>
                            <Link to="/portfolio" className="btn-elite-outline">
                                Ver Portfólio <ArrowRight size={20} />
                            </Link>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 1, duration: 1 }}
                            className="hero-trust-indicators"
                        >
                            <div className="agent-avatars">
                                <div className="avatar-stack">
                                    <img src="https://ui-avatars.com/api/?name=User1&background=44D05D&color=000" alt="Cliente satisfeito" />
                                    <img src="https://ui-avatars.com/api/?name=User2&background=38b84d&color=000" alt="Empresa atendida" />
                                    <img src="https://ui-avatars.com/api/?name=User3&background=2fa841&color=000" alt="Site profissional" />
                                    <div className="avatar-more">+100</div>
                                </div>
                                <div className="trust-text-stack">
                                    <div className="stars-row">
                                        {[...Array(5)].map((_, i) => <Star key={i} size={14} fill="#FBBC05" stroke="none" />)}
                                    </div>
                                    <span>Líder em satisfação em Brasília</span>
                                </div>
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
                            <div className="neural-sphere-inner"></div>

                            {/* Floating Feature Cards */}
                            <motion.div
                                animate={{ y: [0, -20, 0], x: [0, 5, 0] }}
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
                                animate={{ y: [0, 20, 0], x: [0, -5, 0] }}
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
                                animate={{ y: [0, -15, 0], x: [0, 8, 0] }}
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

            {/* Premium Stats Section */}
            <section className="stats-section-premium">
                <div className="container">
                    <div className="stats-grid-premium glass-card">
                        <div className="stat-item-premium">
                            <Counter end={100} suffix="+" />
                            <span>Projetos Entregues</span>
                        </div>
                        <div className="stat-sep"></div>
                        <div className="stat-item-premium">
                            <Counter end={5} suffix="+" />
                            <span>Anos no Mercado</span>
                        </div>
                        <div className="stat-sep"></div>
                        <div className="stat-item-premium">
                            <Counter end={98} suffix="%" />
                            <span>Clientes Satisfeitos</span>
                        </div>
                        <div className="stat-sep"></div>
                        <div className="stat-item-premium">
                            <Counter end={12} suffix="H" />
                            <span>Suporte ágil</span>
                        </div>
                    </div>
                </div>
            </section>

            {/* Technology Marquee */}
            <section className="tech-marquee-section">
                <Marquee
                    items={[
                        "REACT.JS", "VITE", "NODE.JS", "TAILWIND", "FIREBASE",
                        "AWS", "GOOGLE CLOUD", "DOCKER", "TYPESCRIPT", "PYTHON"
                    ]}
                    speed={30}
                />
            </section>

            {/* Recent Portfolio Section */}
            <section className="section-padding portfolio-highlights">
                <div className="container">
                    <header className="text-center mb-5">
                        <span className="badge">Destaques</span>
                        <RevealText>
                            <h2 className="section-title">Portfólio <span>Recente</span></h2>
                        </RevealText>
                    </header>

                    <div className="highlights-grid">
                        {recentProjects.map((project, index) => (
                            <RecentProjectCard
                                key={index}
                                project={project}
                                index={index}
                                fadeInUp={fadeInUp}
                            />
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
                                <img src="about-home.png" alt="Aceweb Agency Futuristic Office" />
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
                        <RevealText>
                            <h2 className="section-title">O que fazemos de <span>melhor</span></h2>
                        </RevealText>
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
                        <RevealText>
                            <h2 className="section-title">Aprovado por quem <span>confia</span></h2>
                        </RevealText>

                        {/* Google Review Summary Badge */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            className="google-summary-badge"
                        >
                            <div className="google-icon-box">
                                <svg viewBox="0 0 24 24" width="24" height="24">
                                    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" />
                                    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                                    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" />
                                    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                                </svg>
                            </div>
                            <div className="summary-info">
                                <div className="stars-row">
                                    {[...Array(5)].map((_, i) => <Star key={i} size={14} fill="#FBBC05" stroke="none" />)}
                                </div>
                                <span>5.0 de 5 no Google (50+ avaliações)</span>
                            </div>
                        </motion.div>
                    </header>

                    <div className="testimonials-grid">
                        {testimonials.map((t, index) => {
                            const [isHovered, setIsHovered] = useState(false);
                            const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

                            return (
                                <motion.div
                                    key={index}
                                    {...fadeInUp}
                                    transition={{ delay: index * 0.1 }}
                                    className="testimonial-card glass-card neural-border spotlight-group"
                                    onMouseMove={(e) => {
                                        const rect = e.currentTarget.getBoundingClientRect();
                                        setMousePos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
                                        setIsHovered(true);
                                    }}
                                    onMouseLeave={() => setIsHovered(false)}
                                >
                                    <div
                                        className="spotlight-glow"
                                        style={{
                                            background: `radial-gradient(400px circle at ${mousePos.x}px ${mousePos.y}px, rgba(68, 208, 93, 0.1), transparent 40%)`,
                                            opacity: isHovered ? 1 : 0
                                        }}
                                    />

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
                            );
                        })}
                    </div>
                </div>
            </section>

            <NewsGrid />

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
        </motion.div>
    );
};

export default Home;
