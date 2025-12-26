import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Target, Users, Award, Rocket, Shield, Heart } from 'lucide-react';
import SEO from '../components/SEO';
import './About.css';

const About = () => {
    const [instData, setInstData] = useState({
        aboutStory: 'A ACEWEB nasceu no coração do Brasil com um objetivo claro: provar que design de nível internacional e tecnologia de ponta podem ser acessíveis e entregues com rapidez extrema para empresas que buscam <strong>criação de sites em Brasília-DF</strong> e em todo o território nacional.\n\nNão acreditamos em modelos prontos. Cada pixel que desenhamos e cada linha de código que escrevemos é focada em <strong>SEO em Brasília</strong> e performance extrema, sendo pensada exclusivamente para a jornada do seu cliente e os resultados reais do seu negócio digital.'
    });

    useEffect(() => {
        const savedInst = JSON.parse(localStorage.getItem('ace_inst_data'));
        if (savedInst) setInstData(prev => ({ ...prev, ...savedInst }));
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
                title="Especialista em Criação de Sites em Brasília | Aceweb"
                description="Conheça a Aceweb, sua agência de criação de sites em Brasília-DF. Focamos em design de elite, SEO local, landing pages de alta conversão e performance extrema para colocar sua empresa no topo."
                keywords="criação de sites em brasília, criar site brasília-df, agência de sites brasília, web design df, seo em brasília, otimização de sites para o google, landing page de alta conversão brasília"
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
                        <span className="badge">Nossa Essência Digital</span>
                        <h1 className="text-gradient">Especialistas em <span>Criação de Sites em Brasília</span>.</h1>
                        <p className="hero-subtitle">Elevamos o padrão tecnológico do Distrito Federal com soluções digitais focadas em ROI e visibilidade no Google.</p>
                    </motion.div>
                </div>
            </section>

            {/* Story Section */}
            <section className="section-padding">
                <div className="container">
                    <div className="story-grid">
                        <motion.div {...fadeInUp} className="story-content">
                            <span className="badge">Liderança em Brasília</span>
                            <h2>Dominando a cena de <span>Web Design no DF</span>.</h2>
                            <div
                                className="about-story-rich"
                                dangerouslySetInnerHTML={{ __html: instData.aboutStory }}
                            ></div>

                            <div className="seo-highlights-box">
                                <h3>Por que escolher a Aceweb para criar seu site?</h3>
                                <ul>
                                    <li><strong>SEO Local Estratégico:</strong> Posicionamos sua empresa para buscas em Brasília-DF.</li>
                                    <li><strong>Performance Web Core Vitals:</strong> Sites que carregam em menos de 2 segundos.</li>
                                    <li><strong>UI/UX de Alta Performance:</strong> Design focado em converter visitantes em clientes.</li>
                                </ul>
                            </div>

                            <div className="about-metrics">
                                <div className="metric-item">
                                    <span className="metric-val">100+</span>
                                    <span className="metric-label">Sites Lançados</span>
                                </div>
                                <div className="metric-item">
                                    <span className="metric-val">100%</span>
                                    <span className="metric-label">Foco no Cliente</span>
                                </div>
                            </div>
                        </motion.div>
                        <motion.div
                            {...fadeInUp}
                            transition={{ delay: 0.2 }}
                            className="story-visual glass-card neural-border"
                        >
                            <img src="about-home.png" alt="Criação de sites profissionais em Brasília - Equipe Aceweb" className="story-img" />
                            <div className="img-glow-overlay"></div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Expertise Section (New for SEO) */}
            <section className="section-padding bg-darker">
                <div className="container">
                    <header className="text-center mb-5">
                        <span className="badge">Nossas Competências</span>
                        <h2 className="section-title">Autoridade em <span>Soluções Digitais</span></h2>
                    </header>
                    <div className="expertise-grid">
                        <div className="expertise-card">
                            <h3>Criação de Sites em Brasília</h3>
                            <p>Desenvolvemos sites institucionais modernos, totalmente responsivos e otimizados para todos os dispositivos, garantindo que sua marca no DF tenha uma presença digital impecável.</p>
                        </div>
                        <div className="expertise-card">
                            <h3>SEO e Tráfego Orgânico</h3>
                            <p>Estratégias avançadas de Search Engine Optimization para que seu site apareça na primeira página do Google quando clientes buscarem por seus serviços em Brasília e região.</p>
                        </div>
                        <div className="expertise-card">
                            <h3>Landing Pages de Alta Conversão</h3>
                            <p>Páginas de vendas ultra-rápidas e com copywriting persuasivo, ideais para campanhas de tráfego pago (Google Ads e Meta Ads) com foco total em geração de leads.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Values Grid */}
            <section className="section-padding bg-surface">
                <div className="container">
                    <div className="text-center mb-5">
                        <h2 className="section-title">Os <span>Diferenciais</span> Aceweb</h2>
                        <p className="max-700 mx-auto">Unimos design brasileiro de classe mundial com as tecnologias mais rápidas do mercado global.</p>
                    </div>

                    <div className="values-grid-expanded">
                        {[
                            { icon: <Target />, title: "Foco Total em ROI", desc: "Criamos sites que não são apenas bonitos, mas que geram faturamento real para sua empresa no DF." },
                            { icon: <Shield />, title: "Segurança Avançada", desc: "Protocolos de segurança rígidos e certificação SSL para proteger os dados do seu negócio e dos seus clientes." },
                            { icon: <Award />, title: "Padrão de Elite", desc: "Utilizamos React e Vite, as mesmas tecnologias de gigantes como Netflix e Instagram, em seu site." },
                            { icon: <Rocket />, title: "Velocidade Extrema", desc: "Performance nota 90+ no Google PageSpeed Insights para garantir a melhor experiência ao usuário." },
                            { icon: <Users />, title: "Suporte Especializado", desc: "Atendimento direto e consultoria para que você entenda como o digital está impulsionando seu site." },
                            { icon: <Heart />, title: "Design Exclusivo", desc: "Nada de templates. Criamos layouts únicos do zero, adaptados à identidade visual da sua marca." }
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
                            <h2>Sua busca por <span>criação de sites em Brasília</span> termina aqui.</h2>
                            <p>Pronto para dominar o Google e elevar o nível da sua autoridade digital? Agende uma conversa gratuita hoje.</p>
                            <a href="https://api.whatsapp.com/send?phone=5561996986162&text=Ol%C3%A1,%20preciso%20de%20um%20site%20e%20gostaria%20de%20um%20or%C3%A7amento!" className="btn btn-primary">Começar meu Projeto agora</a>
                        </div>
                    </motion.div>
                </div>
            </section>
        </div>
    );
};

export default About;
