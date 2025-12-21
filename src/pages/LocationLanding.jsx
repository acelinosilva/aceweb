import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
    CheckCircle2,
    Rocket,
    ShieldCheck,
    Code2,
    Globe,
    Layout,
    MousePointer2,
    MessageCircle
} from 'lucide-react';
import './LocationLanding.css';

const locationsData = {
    'sao-paulo': 'São Paulo',
    'brasilia': 'Brasília',
    'minas-gerais': 'Minas Gerais',
    'acre': 'Acre',
    'alagoas': 'Alagoas',
    'amazonas': 'Amazonas',
    'bahia': 'Bahia',
    'ceara': 'Ceará',
    'espirito-santo': 'Espírito Santo',
    'goias': 'Goiás',
    'maranhao': 'Maranhão',
    'mato-grosso': 'Mato Grosso',
    'mato-grosso-do-sul': 'Mato Grosso do Sul',
    'para': 'Pará',
    'paraiba': 'Paraíba',
    'parana': 'Paraná',
    'pernambuco': 'Pernambuco',
    'piaui': 'Piauí',
    'rio-de-janeiro': 'Rio de Janeiro',
    'rio-grande-do-norte': 'Rio Grande do Norte',
    'rio-grande-do-sul': 'Rio Grande do Sul',
    'rondonia': 'Rondônia',
    'roraima': 'Roraima',
    'santa-catarina': 'Santa Catarina',
    'sergipe': 'Sergipe',
    'tocantins': 'Tocantins',
    'taboao-da-serra': 'Taboão da Serra',
    'suica': 'Suíça',
    'estados-unidos': 'Estados Unidos'
};

const LocationLanding = () => {
    const { slug } = useParams();
    const locationName = locationsData[slug] || 'Sua Região';

    useEffect(() => {
        window.scrollTo(0, 0);
        document.title = `Criação de Sites em ${locationName} | Aceweb - Agência de Elite`;
    }, [locationName]);

    const fadeInUp = {
        initial: { opacity: 0, y: 30 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true },
        transition: { duration: 0.6 }
    };

    const whatsappLink = "https://api.whatsapp.com/send?phone=5561996986162&text=Olá,%20vi%20a%20página%20de%20" + locationName + "%20e%20gostaria%20de%20um%20orçamento!";

    return (
        <div className="location-landing">
            {/* Hero Section */}
            <section className="loc-hero">
                <div className="mesh-bg"></div>
                <div className="container">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="loc-hero-content text-center"
                    >
                        <span className="badge-premium">Especialista em Performance</span>
                        <h1 className="loc-title">Criação de sites em <span>{locationName}</span></h1>
                        <p className="loc-subtitle">Websites de alto padrão, landing pages conversíveis e sistemas robustos para empresas que buscam o topo do Google em {locationName}.</p>
                        <div className="loc-hero-btns">
                            <a href={whatsappLink} className="btn-elite-primary">Solicitar Orçamento Grátis</a>
                            <Link to="/portfolio" className="btn-elite-outline">Ver Portfólio</Link>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Authority Section */}
            <section className="loc-authority section-padding">
                <div className="container">
                    <div className="loc-auth-grid">
                        <motion.div {...fadeInUp} className="loc-auth-text">
                            <h2 className="section-title text-left">Por que escolher a Aceweb para <span>{locationName}</span>?</h2>
                            <p className="description-premium">
                                Se você procura por <strong>criação de sites em {locationName}</strong>, sabe que não basta ter apenas uma "vitrine online". Você precisa de uma ferramenta de vendas agressiva, otimizada para SEO e com design que transmite autoridade instantânea.
                            </p>
                            <ul className="loc-benefits-list">
                                <li><CheckCircle2 size={18} /> SEO Avançado para dominar as buscas locais em {locationName}.</li>
                                <li><CheckCircle2 size={18} /> Carregamento ultra-rápido (Core Web Vitals).</li>
                                <li><CheckCircle2 size={18} /> Design Exclusivo (Nada de templates prontos).</li>
                                <li><CheckCircle2 size={18} /> Suporte humanizado e direto com especialistas.</li>
                            </ul>
                        </motion.div>
                        <motion.div {...fadeInUp} transition={{ delay: 0.2 }} className="loc-auth-visual glass-card">
                            <div className="loc-stats-card">
                                <div className="stat-item">
                                    <Rocket color="var(--primary-color)" />
                                    <span>99% Score no PageSpeed</span>
                                </div>
                                <div className="stat-item">
                                    <ShieldCheck color="var(--primary-color)" />
                                    <span>Segurança SSL de Nível Militar</span>
                                </div>
                                <div className="stat-item">
                                    <Globe color="var(--primary-color)" />
                                    <span>Pronto para Escala Global</span>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Services for Location */}
            <section className="sec-services bg-surface section-padding">
                <div className="container">
                    <div className="text-center mb-5">
                        <h2 className="section-title">Nossas Soluções em <span>{locationName}</span></h2>
                        <p className="description-premium mx-auto max-700">Tudo o que sua empresa precisa para se destacar na cena digital de {locationName} e além.</p>
                    </div>

                    <div className="loc-services-grid">
                        {[
                            { icon: <Layout />, title: "Landing Pages de Alta Conversão", desc: "Páginas focadas em um único objetivo: transformar visitantes em clientes reais em " + locationName + "." },
                            { icon: <Code2 />, title: "Sites Institucionais", desc: "A casa digital da sua marca com design premium e tecnologia de ponta." },
                            { icon: <MousePointer2 />, title: "E-commerce & Lojas Virtuais", desc: "Plataformas robustas e seguras para você vender seus produtos de " + locationName + " para o mundo." }
                        ].map((s, i) => (
                            <motion.div
                                key={i}
                                {...fadeInUp}
                                transition={{ delay: i * 0.1 }}
                                className="loc-service-card glass-card"
                            >
                                <div className="loc-service-icon">{s.icon}</div>
                                <h3>{s.title}</h3>
                                <p>{s.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* SEO Content Block */}
            <section className="loc-seo-content section-padding">
                <div className="container narrow-container">
                    <motion.div {...fadeInUp} className="seo-text-block">
                        <h3>Domine o Google em {locationName}</h3>
                        <p>
                            Nossa estratégia de <strong>criação de sites em {locationName}</strong> vai além do visual. Nós estudamos o comportamento do seu público-alvo em <strong>{locationName}</strong> para implementar as melhores práticas de indexação.
                        </p>
                        <p>
                            Quando alguém buscar por seus serviços em <strong>{locationName}</strong>, seu site estará lá, pronto para impressionar. Utilizamos tecnologias modernas como React, Next.js e otimização extrema de imagens para garantir que sua empresa em <strong>{locationName}</strong> não perca nenhum cliente por lentidão.
                        </p>
                        <Link to="/contato" className="btn btn-outline">Solicitar Análise de SEO para {locationName}</Link>
                    </motion.div>
                </div>
            </section>

            {/* Sticky CTA Mobile */}
            <div className="loc-sticky-cta">
                <a href={whatsappLink} className="btn-whatsapp-loc">
                    <MessageCircle size={20} /> Orçamento via WhatsApp
                </a>
            </div>
        </div>
    );
};

export default LocationLanding;
