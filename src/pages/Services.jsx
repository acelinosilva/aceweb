import { useState } from 'react';
import { motion } from 'framer-motion';
import {
    Layout, Globe, Search, Settings, Clock, CheckCircle2,
    Layers, BarChart3, ShieldCheck, Zap
} from 'lucide-react';
import { Link } from 'react-router-dom';
import SEO from '../components/SEO';
import RevealText from '../components/RevealText';
import './Services.css';

const Services = () => {
    const fadeInUp = {
        initial: { opacity: 0, y: 30 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true },
        transition: { duration: 0.6 }
    };

    const services = [
        {
            icon: <Layout size={40} />,
            title: "Landing Pages",
            desc: "Páginas de conversão de alta performance para campanhas de tráfego pago. Foco total em transformar cliques em vendas.",
            features: ["Design Persuasivo (AIDA)", "Carregamento < 2s", "Copywriting Otimizada", "Integração Pixel/API"]
        },
        {
            icon: <Layers size={40} />,
            title: "Sites Institucionais",
            desc: "Sua vitrine profissional completa. Ideal para empresas que buscam autoridade e presença digital sólida.",
            features: ["Blog Integrado", "Painel Administrativo", "Multilíngue", "Design Exclusivo"]
        },
        {
            icon: <Search size={40} />,
            title: "SEO em Brasília",
            desc: "Estratégias específicas para sua empresa dominar as buscas locais em Brasília e no Distrito Federal. Tráfego orgânico qualificado.",
            features: ["SEO Local DF", "Otimização de GMN", "Ranking Regional", "Pesquisa de Termos Locais"]
        },
        {
            icon: <Settings size={40} />,
            title: "Manutenção & Suporte",
            desc: "Tranquilidade total para você focar no seu negócio. Nós cuidamos da segurança, backups e atualizações.",
            features: ["Backup Diário", "Segurança Ativa", "Otimização Mensal", "Suporte VIP"]
        }
    ];

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="services-page"
        >
            <SEO
                title="Nossos Serviços"
                description="Confira nossos serviços de criação de sites institucionais, landing pages de alta conversão e SEO em Brasília."
            />
            {/* Services Hero */}
            <section className="services-hero">
                <div className="mesh-bg"></div>
                <div className="container">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-center"
                    >
                        <span className="badge">Nossas Soluções no DF</span>
                        <RevealText>
                            <h1 className="text-gradient">Criação de Sites em <span>Brasília</span></h1>
                        </RevealText>
                        <p className="hero-subtitle">Agência especializada em criar sites no Distrito Federal com tecnologia de elite e foco em conversão para empresas de Brasília.</p>
                    </motion.div>
                </div>
            </section>

            {/* Main Services Grid */}
            <section className="section-padding">
                <div className="container">
                    <div className="services-grid-detailed">
                        {services.map((service, index) => {
                            const [isHovered, setIsHovered] = useState(false);
                            const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

                            return (
                                <motion.div
                                    key={index}
                                    {...fadeInUp}
                                    transition={{ delay: index * 0.1 }}
                                    className="service-detail-card glass-card neural-border spotlight-group"
                                    whileHover={{ y: -10 }}
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
                                    <div className="service-header-icon">
                                        {service.icon}
                                        <div className="icon-glow"></div>
                                    </div>
                                    <h3>{service.title}</h3>
                                    <p>{service.desc}</p>
                                    <div className="feature-list">
                                        {service.features.map((feature, i) => (
                                            <div key={i} className="feature-tag">
                                                <CheckCircle2 size={16} /> {feature}
                                            </div>
                                        ))}
                                    </div>
                                </motion.div>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* Process Section */}
            <section className="section-padding bg-surface">
                <div className="container">
                    <motion.div {...fadeInUp} className="text-center mb-5">
                        <h2 className="section-title">Nosso Processo de <span>Elite</span></h2>
                        <p className="max-700 mx-auto">Como entregamos sites de alta qualidade em tempo recorde.</p>
                    </motion.div>

                    <div className="process-steps">
                        {[
                            { step: "01", title: "Imersão", desc: "Entendemos seu negócio e objetivos a fundo." },
                            { step: "02", title: "Design", desc: "Criamos uma interface exclusiva e persuasiva." },
                            { step: "03", title: "Dev", desc: "Desenvolvimento com as tecnologias mais rápidas." },
                            { step: "04", title: "Lançamento", desc: "Site no ar em até 7 dias com otimização total." }
                        ].map((p, i) => (
                            <motion.div
                                key={i}
                                {...fadeInUp}
                                transition={{ delay: i * 0.15 }}
                                className="process-card"
                            >
                                <div className="step-num">{p.step}</div>
                                <h4>{p.title}</h4>
                                <p>{p.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Delivery Banner */}
            <section className="section-padding">
                <div className="container">
                    <motion.div
                        {...fadeInUp}
                        className="delivery-banner-exclusive glass-card"
                    >
                        <div className="banner-content">
                            <Clock size={48} className="text-primary" />
                            <h2>Velocidade que <span>Impulsiona</span></h2>
                            <p>Entregamos seu projeto completo em até 7 dias úteis. Sem desculpas, apenas resultados.</p>
                            <motion.a
                                whileHover={{ scale: 1.05 }}
                                href="https://api.whatsapp.com/send?phone=5561996986162&text=Ol%C3%A1,%20preciso%20de%20um%20site%20e%20gostaria%20de%20um%20or%C3%A7amento!"
                                className="btn btn-primary"
                            >
                                Começar meu projeto
                            </motion.a>
                        </div>
                        <div className="banner-icon-bg">
                            <Zap size={200} />
                        </div>
                    </motion.div>
                </div>
            </section>
        </motion.div>
    );
};

export default Services;
