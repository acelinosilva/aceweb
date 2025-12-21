import { MessageCircle } from 'lucide-react';
import './WhatsAppButton.css';

const WhatsAppButton = () => {
    const url = "https://api.whatsapp.com/send?phone=5561996986162&text=Ol%C3%A1,%20preciso%20de%20um%20site%20e%20gostaria%20de%20um%20or%C3%A7amento!";

    return (
        <a href={url} className="whatsapp-float" target="_blank" rel="noopener noreferrer">
            <MessageCircle size={32} />
            <span className="tooltip">Fale Conosco</span>
        </a>
    );
};

export default WhatsAppButton;
