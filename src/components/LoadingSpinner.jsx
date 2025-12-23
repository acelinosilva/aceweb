import { motion } from 'framer-motion';
import { Loader2 } from 'lucide-react';

const LoadingSpinner = () => {
    return (
        <div className="loading-container" style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100vh',
            background: 'var(--bg-color)',
            color: 'var(--primary-color)',
            flexDirection: 'column',
            gap: '1rem'
        }}>
            <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            >
                <Loader2 size={48} />
            </motion.div>
            <motion.p
                initial={{ opacity: 0.5 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, repeat: Infinity, repeatType: "reverse" }}
                style={{ fontSize: '0.9rem', letterSpacing: '2px', textTransform: 'uppercase' }}
            >
                Carregando Experiência...
            </motion.p>
        </div>
    );
};

export default LoadingSpinner;
