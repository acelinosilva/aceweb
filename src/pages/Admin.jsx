import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Newspaper,
    Image as ImageIcon,
    Plus,
    Trash2,
    Save,
    LogOut,
    CheckCircle,
    Edit3,
    X,
    Eye,
    Building2
} from 'lucide-react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import Login from './Login';
import './Admin.css';

const Admin = () => {
    const [isAuth, setIsAuth] = useState(false);
    const [activeTab, setActiveTab] = useState('blog');
    const [blogPosts, setBlogPosts] = useState([]);
    const [portfolioItems, setPortfolioItems] = useState([]);
    const [instData, setInstData] = useState({
        heroTagline: 'Criação de Sites Personalizados',
        heroSubtitle: 'Transformamos sua visão em autoridade digital. Landing pages que convertem e sites de elite otimizados para o topo do Google.',
        homeAboutText: 'A ACEWEB não é apenas uma agência de criação de sites. Somos parceiros estratégicos do seu negócio. Localizados em Brasília e atendendo todo o Brasil, combinamos estética apurada com código de alta performance para gerar resultados reais.',
        aboutStory: 'A ACEWEB nasceu no coração do Brasil com um objetivo claro: provar que design de nível internacional e tecnologia de ponta podem ser acessíveis e entregues com rapidez extrema.\n\nNão acreditamos em modelos prontos. Cada pixel que desenhamos e cada linha de código que escrevemos é pensada exclusivamente para a jornada do seu cliente e os objetivos do seu negócio.'
    });

    // Edit Mode States
    const [editingIndex, setEditingIndex] = useState(null);
    const [editType, setEditType] = useState(null); // 'blog' or 'portfolio'

    // Form States
    const [newPost, setNewPost] = useState({ title: '', content: '', image: '', date: new Date().toLocaleDateString('pt-BR') });
    const [newProject, setNewProject] = useState({ title: '', category: '', image: '' });
    const [statusMsg, setStatusMsg] = useState('');

    const handleFileUpload = (e, type) => {
        const file = e.target.files[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onloadend = () => {
            if (type === 'blog') {
                setNewPost({ ...newPost, image: reader.result });
            } else {
                setNewProject({ ...newProject, image: reader.result });
            }
        };
        reader.readAsDataURL(file);
    };

    useEffect(() => {
        const auth = localStorage.getItem('ace_admin_auth');
        if (auth === 'true') setIsAuth(true);

        const savedPosts = JSON.parse(localStorage.getItem('ace_blog_posts')) || [];
        const savedPortfolio = JSON.parse(localStorage.getItem('ace_portfolio_items')) || [];
        const savedInst = JSON.parse(localStorage.getItem('ace_inst_data'));

        setBlogPosts(savedPosts);
        setPortfolioItems(savedPortfolio);
        if (savedInst) setInstData(savedInst);
    }, []);

    const logout = () => {
        localStorage.removeItem('ace_admin_auth');
        setIsAuth(false);
    };

    const handleSavePost = (e) => {
        e.preventDefault();
        let updatedPosts;

        if (!newPost.image) {
            alert('Por favor, selecione uma imagem de destaque para a postagem.');
            return;
        }

        if (editingIndex !== null && editType === 'blog') {
            updatedPosts = [...blogPosts];
            updatedPosts[editingIndex] = newPost;
            setEditingIndex(null);
            setEditType(null);
            showStatus('Notícia atualizada!');
        } else {
            updatedPosts = [newPost, ...blogPosts];
            showStatus('Notícia publicada!');
        }

        setBlogPosts(updatedPosts);
        localStorage.setItem('ace_blog_posts', JSON.stringify(updatedPosts));
        setNewPost({ title: '', content: '', image: '', date: new Date().toLocaleDateString('pt-BR') });
    };

    const handleSaveProject = (e) => {
        e.preventDefault();
        let updatedPortfolio;

        if (!newProject.image) {
            alert('Por favor, selecione uma imagem ou insira uma URL para o projeto.');
            return;
        }

        if (editingIndex !== null && editType === 'portfolio') {
            updatedPortfolio = [...portfolioItems];
            updatedPortfolio[editingIndex] = newProject;
            setEditingIndex(null);
            setEditType(null);
            showStatus('Projeto atualizado!');
        } else {
            updatedPortfolio = [newProject, ...portfolioItems];
            showStatus('Projeto adicionado!');
        }

        setPortfolioItems(updatedPortfolio);
        localStorage.setItem('ace_portfolio_items', JSON.stringify(updatedPortfolio));
        setNewProject({ title: '', category: '', image: '' });
    };

    const startEditPost = (index) => {
        setNewPost(blogPosts[index]);
        setEditingIndex(index);
        setEditType('blog');
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const startEditProject = (index) => {
        setNewProject(portfolioItems[index]);
        setEditingIndex(index);
        setEditType('portfolio');
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const cancelEdit = () => {
        setEditingIndex(null);
        setEditType(null);
        setNewPost({ title: '', content: '', image: '', date: new Date().toLocaleDateString('pt-BR') });
        setNewProject({ title: '', category: '', image: '' });
    };

    const handleDeletePost = (index) => {
        if (window.confirm('Deseja realmente excluir esta notícia?')) {
            const updated = blogPosts.filter((_, i) => i !== index);
            setBlogPosts(updated);
            localStorage.setItem('ace_blog_posts', JSON.stringify(updated));
            showStatus('Notícia removida');
        }
    };

    const handleDeleteProject = (index) => {
        if (window.confirm('Deseja realmente excluir este projeto?')) {
            const updated = portfolioItems.filter((_, i) => i !== index);
            setPortfolioItems(updated);
            localStorage.setItem('ace_portfolio_items', JSON.stringify(updated));
            showStatus('Projeto removido');
        }
    };

    const showStatus = (msg) => {
        setStatusMsg(msg);
        setTimeout(() => setStatusMsg(''), 3000);
    };

    const quillModules = {
        toolbar: [
            [{ 'header': [1, 2, false] }],
            ['bold', 'italic', 'underline', 'strike', 'blockquote'],
            [{ 'list': 'ordered' }, { 'list': 'bullet' }, { 'indent': '-1' }, { 'indent': '+1' }],
            ['link', 'image'],
            ['clean']
        ],
    };

    const quillFormats = [
        'header',
        'bold', 'italic', 'underline', 'strike', 'blockquote',
        'list', 'bullet', 'indent',
        'link', 'image'
    ];

    if (!isAuth) return <Login onLogin={setIsAuth} />;

    return (
        <div className="admin-layout">
            <aside className="admin-sidebar">
                <div className="admin-brand">
                    <img src="logo.png" alt="Aceweb Logo" />
                    <span>Painel Elite</span>
                </div>

                <nav className="admin-nav">
                    <button
                        className={activeTab === 'blog' ? 'active' : ''}
                        onClick={() => { setActiveTab('blog'); cancelEdit(); }}
                    >
                        <Newspaper size={20} /> Blog / Notícias
                    </button>
                    <button
                        className={activeTab === 'portfolio' ? 'active' : ''}
                        onClick={() => { setActiveTab('portfolio'); cancelEdit(); }}
                    >
                        <ImageIcon size={20} /> Portfólio
                    </button>
                    <button
                        className={activeTab === 'institucional' ? 'active' : ''}
                        onClick={() => { setActiveTab('institucional'); cancelEdit(); }}
                    >
                        <Building2 size={20} /> Institucional
                    </button>
                </nav>

                <button className="logout-btn" onClick={logout}>
                    <LogOut size={20} /> Sair do Painel
                </button>
            </aside>

            <main className="admin-main">
                <header className="admin-header">
                    <h2>
                        {activeTab === 'blog' ? 'Gestão de Conteúdo' : activeTab === 'portfolio' ? 'Gestão de Portfólio' : 'Gestão Institucional'}
                        <small>{activeTab === 'blog' ? 'Blog & Notícias' : activeTab === 'portfolio' ? 'Cases de Sucesso' : 'Identidade & Textos'}</small>
                    </h2>
                    {statusMsg && (
                        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="status-badge">
                            <CheckCircle size={16} /> {statusMsg}
                        </motion.div>
                    )}
                </header>

                <div className="admin-content-grid">
                    {/* Add/Edit Form */}
                    <div className="admin-card glass-card">
                        <div className="card-header-flex">
                            <h3>
                                {editingIndex !== null ? <Edit3 size={18} /> : <Plus size={18} />}
                                {editingIndex !== null ? 'Editando Item' : `Novo(a) ${activeTab === 'blog' ? 'Notícia' : 'Projeto'}`}
                            </h3>
                            {editingIndex !== null && (
                                <button className="btn-cancel" onClick={cancelEdit}><X size={16} /> Cancelar</button>
                            )}
                        </div>

                        {activeTab === 'blog' ? (
                            <form onSubmit={handleSavePost} className="admin-form">
                                <div className="form-group">
                                    <label>Título da Publicação</label>
                                    <input
                                        type="text"
                                        value={newPost.title}
                                        onChange={(e) => setNewPost({ ...newPost, title: e.target.value })}
                                        placeholder="Ex: Tendências de Design para 2025"
                                        required
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Imagem de Destaque</label>
                                    <div className="upload-container">
                                        <input
                                            type="file"
                                            accept="image/*"
                                            onChange={(e) => handleFileUpload(e, 'blog')}
                                            id="blog-upload"
                                            hidden
                                        />
                                        <label htmlFor="blog-upload" className="btn-upload">
                                            <ImageIcon size={18} /> Selecionar Imagem
                                        </label>
                                        {newPost.image && (
                                            <div className="upload-preview">
                                                <img src={newPost.image} alt="Preview" />
                                                <button type="button" onClick={() => setNewPost({ ...newPost, image: '' })} className="remove-img"><X size={14} /></button>
                                            </div>
                                        )}
                                    </div>
                                </div>
                                <div className="form-group">
                                    <label>Conteúdo Completo</label>
                                    <div className="quill-editor-wrapper">
                                        <ReactQuill
                                            theme="snow"
                                            value={newPost.content}
                                            onChange={(content) => setNewPost({ ...newPost, content })}
                                            modules={quillModules}
                                            formats={quillFormats}
                                        />
                                    </div>
                                </div>
                                <button type="submit" className="btn-save">
                                    <Save size={18} /> {editingIndex !== null ? 'Salvar Alterações' : 'Publicar Agora'}
                                </button>
                            </form>
                        ) : activeTab === 'portfolio' ? (
                            <form onSubmit={handleSaveProject} className="admin-form">
                                <div className="form-group">
                                    <label>Título do Projeto</label>
                                    <input
                                        type="text"
                                        value={newProject.title}
                                        onChange={(e) => setNewProject({ ...newProject, title: e.target.value })}
                                        required
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Categoria / Segmento</label>
                                    <input
                                        type="text"
                                        value={newProject.category}
                                        onChange={(e) => setNewProject({ ...newProject, category: e.target.value })}
                                        placeholder="Ex: Landing Page para Corretores"
                                        required
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Imagem do Projeto</label>
                                    <div className="upload-container">
                                        <input
                                            type="file"
                                            accept="image/*"
                                            onChange={(e) => handleFileUpload(e, 'portfolio')}
                                            id="portfolio-upload"
                                            hidden
                                        />
                                        <label htmlFor="portfolio-upload" className="btn-upload">
                                            <ImageIcon size={18} /> Selecionar Imagem
                                        </label>
                                        <div className="input-optional-url">
                                            <span>Ou use uma URL:</span>
                                            <input
                                                type="text"
                                                value={newProject.image}
                                                onChange={(e) => setNewProject({ ...newProject, image: e.target.value })}
                                                placeholder="Ex: https://... ou /p4.png"
                                            />
                                        </div>
                                    </div>
                                </div>

                                {newProject.image && (
                                    <div className="image-preview-container">
                                        <span><Eye size={14} /> Pré-visualização:</span>
                                        <img src={newProject.image} alt="Preview" className="img-preview" />
                                    </div>
                                )}

                                <button type="submit" className="btn-save">
                                    <Save size={18} /> {editingIndex !== null ? 'Salvar Alterações' : 'Adicionar ao Portfólio'}
                                </button>
                            </form>
                        ) : (
                            <form
                                onSubmit={(e) => {
                                    e.preventDefault();
                                    localStorage.setItem('ace_inst_data', JSON.stringify(instData));
                                    showStatus('Dados institucionais salvos!');
                                }}
                                className="admin-form"
                            >
                                <div className="form-group">
                                    <label>Hero Tagline (Título Principal)</label>
                                    <input
                                        type="text"
                                        value={instData.heroTagline}
                                        onChange={(e) => setInstData({ ...instData, heroTagline: e.target.value })}
                                        required
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Hero Subtitle (Subtítulo)</label>
                                    <div className="quill-editor-wrapper mini">
                                        <ReactQuill
                                            theme="snow"
                                            value={instData.heroSubtitle}
                                            onChange={(val) => setInstData({ ...instData, heroSubtitle: val })}
                                            modules={{ toolbar: [['bold', 'italic', 'underline'], ['clean']] }}
                                        />
                                    </div>
                                </div>
                                <div className="form-group">
                                    <label>Texto Sobre (Página Inicial)</label>
                                    <div className="quill-editor-wrapper">
                                        <ReactQuill
                                            theme="snow"
                                            value={instData.homeAboutText}
                                            onChange={(val) => setInstData({ ...instData, homeAboutText: val })}
                                            modules={quillModules}
                                        />
                                    </div>
                                </div>
                                <div className="form-group">
                                    <label>Nossa História (Página Sobre)</label>
                                    <div className="quill-editor-wrapper">
                                        <ReactQuill
                                            theme="snow"
                                            value={instData.aboutStory}
                                            onChange={(val) => setInstData({ ...instData, aboutStory: val })}
                                            modules={quillModules}
                                        />
                                    </div>
                                </div>
                                <button type="submit" className="btn-save">
                                    <Save size={18} /> Salvar Alterações Institucionais
                                </button>
                            </form>
                        )}
                    </div>

                    {/* Management List */}
                    {activeTab !== 'institucional' && (
                        <div className="admin-card glass-card">
                            <h3>Itens Publicados ({activeTab === 'blog' ? blogPosts.length : portfolioItems.length})</h3>
                            <div className="admin-items-list">
                                <AnimatePresence>
                                    {activeTab === 'blog' ? (
                                        blogPosts.map((post, i) => (
                                            <motion.div
                                                key={i}
                                                initial={{ opacity: 0, x: -20 }}
                                                animate={{ opacity: 1, x: 0 }}
                                                exit={{ opacity: 0, scale: 0.9 }}
                                                className="admin-item"
                                            >
                                                <div className="item-info">
                                                    <h4>{post.title}</h4>
                                                    <span>{post.date}</span>
                                                </div>
                                                <div className="item-actions">
                                                    <button onClick={() => startEditPost(i)} className="btn-edit" title="Editar">
                                                        <Edit3 size={16} />
                                                    </button>
                                                    <button onClick={() => handleDeletePost(i)} className="btn-delete" title="Excluir">
                                                        <Trash2 size={16} />
                                                    </button>
                                                </div>
                                            </motion.div>
                                        ))
                                    ) : (
                                        portfolioItems.map((item, i) => (
                                            <motion.div
                                                key={i}
                                                initial={{ opacity: 0, x: -20 }}
                                                animate={{ opacity: 1, x: 0 }}
                                                exit={{ opacity: 0, scale: 0.9 }}
                                                className="admin-item"
                                            >
                                                <div className="item-info">
                                                    <div className="item-thumb-mini">
                                                        <img src={item.image} alt="" />
                                                    </div>
                                                    <div>
                                                        <h4>{item.title}</h4>
                                                        <span>{item.category}</span>
                                                    </div>
                                                </div>
                                                <div className="item-actions">
                                                    <button onClick={() => startEditProject(i)} className="btn-edit" title="Editar">
                                                        <Edit3 size={16} />
                                                    </button>
                                                    <button onClick={() => handleDeleteProject(i)} className="btn-delete" title="Excluir">
                                                        <Trash2 size={16} />
                                                    </button>
                                                </div>
                                            </motion.div>
                                        ))
                                    )}
                                </AnimatePresence>
                                {(activeTab === 'blog' ? blogPosts : portfolioItems).length === 0 && (
                                    <p className="empty-msg">Nenhum item cadastrado ainda. Comece adicionando um novo acima!</p>
                                )}
                            </div>
                        </div>
                    )}
                </div>
            </main>
        </div>
    );
};

export default Admin;
