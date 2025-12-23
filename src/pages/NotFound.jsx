import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Home, ArrowLeft } from 'lucide-react';
import SEO from '../components/SEO';

const NotFound = () => {
    return (
        <div className="not-found-page" style={{
            minHeight: '80vh',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            textAlign: 'center',
            padding: '2rem'
        }}>
            <SEO title="Página Não Encontrada" description="Erro 404 - Página não encontrada." />

            <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.5 }}
            >
                <h1 style={{
                    fontSize: '8rem',
                    background: 'var(--primary-gradient)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    lineHeight: 1,
                    marginBottom: '1rem',
                    fontWeight: 800
                }}>404</h1>
            </motion.div>

            <motion.h2
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
                style={{ fontSize: '2rem', marginBottom: '1rem' }}
            >
                Ops! Página perdida no espaço.
            </motion.h2>

            <motion.p
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.3 }}
                style={{ maxWidth: '400px', marginBottom: '2rem', color: 'var(--text-secondary)' }}
            >
                O link que você tentou acessar pode ter sido removido ou o endereço está incorreto.
            </motion.p>

            <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.4 }}
            >
                <Link to="/" className="btn btn-primary">
                    <ArrowLeft size={20} /> Voltar ao Início
                </Link>
            </motion.div>
        </div>
    );
};

export default NotFound;
