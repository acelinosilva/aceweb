import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, MapPin, Send, CheckCircle, MessageSquare, Zap, Clock, Globe } from 'lucide-react';
import SEO from '../components/SEO';
import './Contact.css';

const Contact = () => {
    const [formStatus, setFormStatus] = useState('idle'); // idle, sending, success

    const handleSubmit = (e) => {
        e.preventDefault();
        setFormStatus('sending');

        // Simulate API call
        setTimeout(() => {
            setFormStatus('success');
        }, 1500);
    };

    const fadeInUp = {
        initial: { opacity: 0, y: 30 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true },
        transition: { duration: 0.6 }
    };

    return (
        <div className="contact-page">
            <SEO
                title="Contato para Criação de Sites em Brasília-DF"
                description="Entre em contato com a Aceweb para solicitar um orçamento de criação de site, landing page ou consultoria de SEO em Brasília. Atendimento rápido e especialista."
                keywords="contato criação de sites brasília, orçamento site brasília, agência marketing digital df, falar com aceweb"
                url="/contato"
            />
            {/* High-End Contact Hero */}
            <section className="contact-hero">
                <div className="hero-grid-overlay"></div>
                <div className="mesh-bg"></div>
                <div className="container hero-contact-container">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="contact-hero-content"
                    >
                        <span className="badge-premium">Contato em Brasília - DF</span>
                        <h1 className="title-premium">Vamos criar seu site em <br /><span>Brasília</span> hoje.</h1>
                        <p className="description-premium">A ACEWEB é a agência ideal para quem busca criar sites em Brasília e no DF. Atendimento personalizado e foco total em resultados para sua empresa local.</p>
                    </motion.div>
                </div>
            </section>

            <section className="section-padding">
                <div className="container">
                    <div className="contact-grid-main">
                        {/* Interactive Sidebar */}
                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="contact-sidebar-elite"
                        >
                            <div className="sidebar-group">
                                <h3>Canais de <span>Elite</span></h3>
                                <div className="info-cards-stack">
                                    <a href="https://api.whatsapp.com/send?phone=5561996986162&text=Ol%C3%A1,%20preciso%20de%20um%20site%20e%20gostaria%20de%20um%20or%C3%A7amento!" className="info-card-premium glass-card neural-border">
                                        <div className="info-icon-box"><MessageSquare size={24} /></div>
                                        <div className="info-content">
                                            <h4>WhatsApp</h4>
                                            <p>(61) 99698-6162</p>
                                        </div>
                                    </a>

                                    <a href="mailto:contato@aceweb.com.br" className="info-card-premium glass-card neural-border">
                                        <div className="info-icon-box"><Mail size={24} /></div>
                                        <div className="info-content">
                                            <h4>E-mail</h4>
                                            <p>contato@aceweb.com.br</p>
                                        </div>
                                    </a>

                                    <div className="info-card-premium glass-card">
                                        <div className="info-icon-box"><MapPin size={24} /></div>
                                        <div className="info-content">
                                            <h4>Base de Operações</h4>
                                            <p>Brasília, DF - Atendimento Nacional</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="sidebar-group secondary">
                                <h3>Por que a <span>ACEWEB</span>?</h3>
                                <ul className="contact-benefit-list">
                                    <li><Zap size={18} /> Atendimento Personalizado</li>
                                    <li><Clock size={18} /> Reposta em até 24h</li>
                                    <li><Globe size={18} /> Projetos de Nível Global</li>
                                </ul>
                            </div>
                        </motion.div>

                        {/* Neural Form */}
                        <motion.div
                            initial={{ opacity: 0, x: 30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.2 }}
                            className="contact-form-container glass-card neural-border-glow"
                        >
                            <AnimatePresence mode="wait">
                                {formStatus === 'success' ? (
                                    <motion.div
                                        key="success"
                                        initial={{ opacity: 0, scale: 0.9 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        className="form-success-state"
                                    >
                                        <div className="success-icon-anim">
                                            <CheckCircle size={80} />
                                        </div>
                                        <h3>Recebemos sua mensagem!</h3>
                                        <p>Em breve, um de nossos especialistas entrará em contato para iniciar a transformação digital do seu negócio.</p>
                                        <button onClick={() => setFormStatus('idle')} className="btn-premium-outline">Enviar nova mensagem</button>
                                    </motion.div>
                                ) : (
                                    <motion.form
                                        key="form"
                                        onSubmit={handleSubmit}
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        exit={{ opacity: 0 }}
                                        className="premium-form-elite"
                                    >
                                        <div className="form-grid-2">
                                            <div className="form-group-premium">
                                                <label>Nome</label>
                                                <input type="text" placeholder="Como podemos te chamar?" required />
                                            </div>
                                            <div className="form-group-premium">
                                                <label>WhatsApp / Telefone</label>
                                                <input type="tel" placeholder="(00) 00000-0000" required />
                                            </div>
                                        </div>

                                        <div className="form-group-premium">
                                            <label>E-mail Corporativo</label>
                                            <input type="email" placeholder="seuemail@empresa.com" required />
                                        </div>

                                        <div className="form-group-premium">
                                            <label>Tipo de Projeto</label>
                                            <select required>
                                                <option value="">Selecione o serviço...</option>
                                                <option value="lp">Landing Page de Conversão</option>
                                                <option value="site">Site Institucional Elite</option>
                                                <option value="seo">SEO & Otimização</option>
                                                <option value="outro">Consultoria Estratégica</option>
                                            </select>
                                        </div>

                                        <div className="form-group-premium">
                                            <label>Conte mais sobre seu projeto</label>
                                            <textarea rows="5" placeholder="Descreva seus objetivos e desafios..." required></textarea>
                                        </div>

                                        <button
                                            type="submit"
                                            className={`btn-elite-primary w-100 ${formStatus === 'sending' ? 'loading' : ''}`}
                                            disabled={formStatus === 'sending'}
                                        >
                                            {formStatus === 'sending' ? 'Processando...' : 'Iniciar Conversa'}
                                            <Send size={20} />
                                        </button>
                                    </motion.form>
                                )}
                            </AnimatePresence>
                        </motion.div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Contact;
