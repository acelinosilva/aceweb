import { useState } from 'react';
import { motion } from 'framer-motion';
import { Lock, User, LogIn, AlertCircle } from 'lucide-react';
import './Login.css';

const Login = ({ onLogin }) => {
    const [user, setUser] = useState('');
    const [pass, setPass] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        // Senha padrão para acesso administrativo
        if (user === 'admin' && pass === 'aceweb2024') {
            onLogin(true);
            localStorage.setItem('ace_admin_auth', 'true');
        } else {
            setError('Credenciais inválidas. Tente novamente.');
        }
    };

    return (
        <div className="login-page">
            <div className="mesh-bg"></div>

            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="login-card glass-card neural-border-glow"
            >
                <div className="login-header">
                    <img src="/logo.png" alt="Aceweb Logo" />
                    <h2>Acesso Restrito</h2>
                    <p>Entre com suas credenciais para gerenciar o ecossistema</p>
                </div>

                <form onSubmit={handleSubmit} className="login-form">
                    <div className="form-group-premium">
                        <label><User size={16} /> Usuário</label>
                        <input
                            type="text"
                            placeholder="admin"
                            value={user}
                            onChange={(e) => setUser(e.target.value)}
                            required
                        />
                    </div>

                    <div className="form-group-premium">
                        <label><Lock size={16} /> Senha</label>
                        <input
                            type="password"
                            placeholder="••••••••"
                            value={pass}
                            onChange={(e) => setPass(e.target.value)}
                            required
                        />
                    </div>

                    {error && (
                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="login-error">
                            <AlertCircle size={14} /> {error}
                        </motion.div>
                    )}

                    <button type="submit" className="btn-elite-primary w-100">
                        Acessar Painel <LogIn size={20} />
                    </button>
                </form>
            </motion.div>
        </div>
    );
};

export default Login;
