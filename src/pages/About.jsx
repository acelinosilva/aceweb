import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Target, Users, Award, Rocket, Shield, Heart } from 'lucide-react';
import SEO from '../components/SEO';
import './About.css';

const About = () => {
    const [instData, setInstData] = useState({
        aboutStory: 'A ACEWEB nasceu no coração do Brasil com um objetivo claro: provar que design de nível internacional e tecnologia de ponta podem ser acessíveis e entregues com rapidez extrema.\n\nNão acreditamos em modelos prontos. Cada pixel que desenhamos e cada linha de código que escrevemos é pensada exclusivamente para a jornada do seu cliente e os objetivos do seu negócio.'
    });

    useEffect(() => {
        const savedInst = JSON.parse(localStorage.getItem('ace_inst_data'));
        if (savedInst) setInstData(savedInst);
    }, []);

    const fadeInUp = {
        initial: { opacity: 0, y: 30 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true },
        transition: { duration: 0.6 }
    };

    return (
        <div className="about-page">
            <SEO
                title="A Agência de Criação de Sites em Brasília-DF"
                description="Conheça a Aceweb, a agência de criação de sites em Brasília-DF focada em design de elite, performance extrema e resultados reais para nossos clientes."
                keywords="agência de sites brasília, sobre aceweb, criação de sites profissionais df, web design brasília"
                url="/sobre"
            />
            {/* About Hero */}
            <section className="about-hero">
                <div className="mesh-bg"></div>
                <div className="container">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="text-center"
                    >
                        <span className="badge">Nossa Essência</span>
                        <h1 className="text-gradient">Design que inspira, <span>Código que escala</span>.</h1>
                        <p className="hero-subtitle">Conheça a agência que está redefinindo o padrão de sites profissionais no Brasil.</p>
                    </motion.div>
                </div>
            </section>

            {/* Story Section */}
            <section className="section-padding">
                <div className="container">
                    <div className="story-grid">
                        <motion.div {...fadeInUp} className="story-content">
                            <span className="badge">Nossa História</span>
                            <h2>Transformando a cena digital de <span>Brasília</span> para o mundo.</h2>
                            <div
                                className="about-story-rich"
                                dangerouslySetInnerHTML={{ __html: instData.aboutStory }}
                            ></div>
                            <div className="about-metrics">
                                <div className="metric-item">
                                    <span className="metric-val">100+</span>
                                    <span className="metric-label">Projetos Ativos</span>
                                </div>
                                <div className="metric-item">
                                    <span className="metric-val">100%</span>
                                    <span className="metric-label">Client Focus</span>
                                </div>
                            </div>
                        </motion.div>
                        <motion.div
                            {...fadeInUp}
                            transition={{ delay: 0.2 }}
                            className="story-visual glass-card neural-border"
                        >
                            <img src="about-home.png" alt="Aceweb Office" className="story-img" />
                            <div className="img-glow-overlay"></div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Values Grid */}
            <section className="section-padding bg-surface">
                <div className="container">
                    <div className="text-center mb-5">
                        <h2 className="section-title">Nossos <span>Pilares</span></h2>
                        <p className="max-700 mx-auto">O que nos diferencia em um mercado saturado de soluções genéricas.</p>
                    </div>

                    <div className="values-grid-expanded">
                        {[
                            { icon: <Target />, title: "Precisão Estratégica", desc: "Todo site é uma ferramenta de vendas. Focamos em conversão, não apenas estética." },
                            { icon: <Shield />, title: "Segurança de Elite", desc: "Proteção total contra ataques e backups redundantes em todos os projetos." },
                            { icon: <Award />, title: "Qualidade Premium", desc: "Seguimos os padrões globais de UI/UX para garantir sites que impressionam." },
                            { icon: <Rocket />, title: "Performance Extrema", desc: "Otimização absoluta para carregamento instantâneo em qualquer dispositivo." },
                            { icon: <Users />, title: "Parceria Real", desc: "Não somos apenas fornecedores, somos parte do crescimento do seu negócio." },
                            { icon: <Heart />, title: "Design com Alma", desc: "Criatividade brasileira unida à sofisticação técnica para marcas únicas." }
                        ].map((v, i) => (
                            <motion.div
                                key={i}
                                {...fadeInUp}
                                transition={{ delay: i * 0.1 }}
                                className="value-card-elite glass-card"
                            >
                                <div className="value-icon">{v.icon}</div>
                                <h4>{v.title}</h4>
                                <p>{v.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Final CTA About */}
            <section className="section-padding">
                <div className="container">
                    <motion.div {...fadeInUp} className="cta-final glass-card">
                        <div className="cta-final-content">
                            <h2>Vamos criar algo <span>extraordinário</span>?</h2>
                            <p>Sua empresa merece o melhor do design e da tecnologia. Estamos prontos para começar.</p>
                            <a href="https://api.whatsapp.com/send?phone=5561996986162&text=Ol%C3%A1,%20preciso%20de%20um%20site%20e%20gostaria%20de%20um%20or%C3%A7amento!" className="btn btn-primary">Falar com um Especialista</a>
                        </div>
                    </motion.div>
                </div>
            </section>
        </div>
    );
};

export default About;
