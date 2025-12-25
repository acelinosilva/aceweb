import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ChevronDown, Sun, Moon } from 'lucide-react';
import { useTheme } from '../hooks/useTheme';
import './Navbar.css';

const locations = [
    { name: 'São Paulo', slug: 'sao-paulo' },
    { name: 'Brasília', slug: 'brasilia' },
    { name: 'Minas Gerais', slug: 'minas-gerais' },
    { name: 'Rio de Janeiro', slug: 'rio-de-janeiro' },
    { name: 'Paraná', slug: 'parana' },
    { name: 'Santa Catarina', slug: 'santa-catarina' },
    { name: 'Rio Grande do Sul', slug: 'rio-grande-do-sul' },
    { name: 'Bahia', slug: 'bahia' },
    { name: 'Ceará', slug: 'ceara' },
    { name: 'Pernambuco', slug: 'pernambuco' },
    { name: 'Goiás', slug: 'goias' },
    { name: 'Espírito Santo', slug: 'espirito-santo' },
    { name: 'Mato Grosso', slug: 'mato-grosso' },
    { name: 'Mato Grosso do Sul', slug: 'mato-grosso-do-sul' },
    { name: 'Paraíba', slug: 'paraiba' },
    { name: 'Rio Grande do Norte', slug: 'rio-grande-do-norte' },
    { name: 'Maranhão', slug: 'maranhao' },
    { name: 'Alagoas', slug: 'alagoas' },
    { name: 'Piauí', slug: 'piaui' },
    { name: 'Amazonas', slug: 'amazonas' },
    { name: 'Pará', slug: 'para' },
    { name: 'Rondônia', slug: 'rondonia' },
    { name: 'Tocantins', slug: 'tocantins' },
    { name: 'Acre', slug: 'acre' },
    { name: 'Roraima', slug: 'roraima' },
    { name: 'Sergipe', slug: 'sergipe' },
    { name: 'Taboão da Serra', slug: 'taboao-da-serra' },
    { name: 'Suíça', slug: 'suica' },
    { name: 'Estados Unidos', slug: 'estados-unidos' }
];

const Navbar = () => {
    const { theme, toggleTheme } = useTheme();
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [scrollProgress, setScrollProgress] = useState(0);
    const location = useLocation();

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);

            const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
            const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
            const scrolled = (winScroll / height) * 100;
            setScrollProgress(scrolled);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Close menu when route changes
    useEffect(() => {
        setIsOpen(false);
        setDropdownOpen(false);
        setScrollProgress(0);
        window.scrollTo(0, 0);
    }, [location]);

    return (
        <nav className={`navbar ${scrolled ? 'scrolled' : ''} ${isOpen ? 'open' : ''}`}>
            <div className="scroll-progress-container">
                <div className="scroll-progress-bar" style={{ width: `${scrollProgress}%` }}></div>
            </div>
            <div className="container nav-content">
                <Link to="/" className="logo">
                    <img src="logo.png" alt="Aceweb - Agência de Criação de Sites em Brasília" className="logo-img" />
                </Link>

                <div className={`nav-links ${isOpen ? 'active' : ''}`}>
                    <Link to="/" className={location.pathname === '/' ? 'active' : ''}>Início</Link>
                    <Link to="/portfolio" className={location.pathname === '/portfolio' ? 'active' : ''}>Portfólio</Link>
                    <Link to="/servicos" className={location.pathname === '/servicos' ? 'active' : ''}>Serviços</Link>

                    <div
                        className={`nav-dropdown-container ${dropdownOpen ? 'active' : ''}`}
                        onMouseEnter={() => window.innerWidth > 768 && setDropdownOpen(true)}
                        onMouseLeave={() => window.innerWidth > 768 && setDropdownOpen(false)}
                        onClick={() => window.innerWidth <= 768 && setDropdownOpen(!dropdownOpen)}
                    >
                        <span className="nav-item-dropdown">
                            Locais <ChevronDown size={14} className={dropdownOpen ? 'rotate-180' : ''} />
                        </span>
                        <div className="nav-dropdown-menu">
                            <div className="dropdown-grid">
                                {locations.map((loc) => (
                                    <Link key={loc.slug} to={`/locais/${loc.slug}`}>{loc.name}</Link>
                                ))}
                            </div>
                        </div>
                    </div>

                    <Link to="/blog" className={location.pathname === '/blog' ? 'active' : ''}>Blog</Link>
                    <Link to="/sobre" className={location.pathname === '/sobre' ? 'active' : ''}>Sobre</Link>

                    <button
                        className="theme-toggle"
                        onClick={toggleTheme}
                        aria-label="Alternar tema"
                    >
                        {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
                    </button>

                    <a href="https://api.whatsapp.com/send?phone=5561996986162&text=Ol%C3%A1,%20preciso%20de%20um%20site%20e%20gostaria%20de%20um%20or%C3%A7amento!" className="btn btn-primary nav-cta">Falar Conosco</a>
                </div>

                <div className="nav-actions-mobile">
                    <button
                        className="theme-toggle-mobile"
                        onClick={toggleTheme}
                        aria-label="Alternar tema"
                    >
                        {theme === 'dark' ? <Sun size={24} /> : <Moon size={24} />}
                    </button>
                    <button className="menu-toggle" onClick={() => setIsOpen(!isOpen)}>
                        {isOpen ? <X size={28} /> : <Menu size={28} />}
                    </button>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
