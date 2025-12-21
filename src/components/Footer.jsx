import { Link } from 'react-router-dom';
import { Facebook, Instagram, Linkedin, Twitter } from 'lucide-react';
import './Footer.css';

const Footer = () => {
    return (
        <footer className="footer">
            <div className="container">
                <div className="footer-grid">
                    <div className="footer-brand">
                        <Link to="/" className="logo">
                            <img src="logo.png" alt="Aceweb Logo" className="footer-logo-img" />
                        </Link>
                        <p className="footer-desc">
                            Transformando a presença digital de empresas em Brasília e todo o Brasil com tecnologia e design de ponta.
                        </p>
                        <div className="social-links">
                            <a href="#"><Instagram size={20} /></a>
                            <a href="#"><Facebook size={20} /></a>
                            <a href="#"><Linkedin size={20} /></a>
                            <a href="#"><Twitter size={20} /></a>
                        </div>
                    </div>

                    <div className="footer-links">
                        <h4>Páginas</h4>
                        <ul>
                            <li><Link to="/">Início</Link></li>
                            <li><Link to="/servicos">Serviços</Link></li>
                            <li><Link to="/sobre">Sobre Nós</Link></li>
                            <li><Link to="/contato">Contato</Link></li>
                        </ul>
                    </div>

                    <div className="footer-links">
                        <h4>Serviços</h4>
                        <ul>
                            <li><Link to="/servicos">Landing Pages</Link></li>
                            <li><Link to="/servicos">Sites Institucionais</Link></li>
                            <li><Link to="/servicos">Otimização SEO</Link></li>
                            <li><Link to="/servicos">Consultoria Digital</Link></li>
                        </ul>
                    </div>

                    <div className="footer-links">
                        <h4>Atendimento DF</h4>
                        <ul className="footer-loc-list">
                            <li>Criação de Sites Asa Sul / Asa Norte</li>
                            <li>Sites em Taguatinga / Águas Claras</li>
                            <li>Landing Pages no Lago Sul / Norte</li>
                            <li>Desenvolvimento Web no Guará</li>
                        </ul>
                    </div>

                    <div className="footer-contact">
                        <h4>Contato</h4>
                        <p>Brasília - Distrito Federal</p>
                        <p><a href="https://api.whatsapp.com/send?phone=5561996986162&text=Ol%C3%A1,%20preciso%20de%20um%20site%20e%20gostaria%20de%20um%20or%C3%A7amento!" style={{ color: 'inherit', textDecoration: 'none' }}>(61) 99698-6162</a></p>
                        <p>contato@aceweb.com.br</p>
                    </div>
                </div>

                <div className="footer-bottom">
                    <p>&copy; {new Date().getFullYear()} ACEWEB. Todos os direitos reservados.</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
