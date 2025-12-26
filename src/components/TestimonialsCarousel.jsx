import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, Quote, ChevronLeft, ChevronRight } from 'lucide-react';
import './TestimonialsCarousel.css';

const testimonials = [
    {
        initials: "WC",
        name: "Wanessa Castro",
        date: "1 ano atrás",
        text: "Fui por indicação, e amei o trabalho, rápidos, comprometidos, e experientes. Sucesso garantido !!! Parabéns a toda equipe !!!!",
        rating: 5
    },
    {
        initials: "ES",
        name: "Erida Silva",
        date: "1 ano atrás",
        text: "Gostamos muito do trabalho, nosso site ficou como a gente desejava! Super rápido em fazer alterações solicitadas! Super indico",
        rating: 5
    },
    {
        initials: "BE",
        name: "Breno Emanuel",
        date: "2 anos atrás",
        text: "Agilidade e eficiência. Simples assim! Indico.",
        rating: 5
    },
    {
        initials: "HM",
        name: "Helio Miranda",
        date: "2 anos atrás",
        text: "A experiência na prestação do serviço foi nota 10. O Profissional foi super atencioso e dedicado até a conclusão do serviço contratado. Super indico!",
        rating: 5
    },
    {
        initials: "AR",
        name: "Aline Resende",
        date: "Google Review",
        text: "Excelente atendimento! O sr. Acelino foi muito atencioso e prestativo conosco, nos ajudou mesmo antes de o contratarmos. O nosso site ficou ótimo.",
        rating: 5
    }
];

const swipeConfidenceThreshold = 10000;
const swipePower = (offset, velocity) => {
    return Math.abs(offset) * velocity;
};

const TestimonialsCarousel = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [direction, setDirection] = useState(0); // -1 for left, 1 for right
    const [isHovered, setIsHovered] = useState(false);
    const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

    const handleNext = useCallback(() => {
        setDirection(1);
        setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, []);

    const handlePrev = useCallback(() => {
        setDirection(-1);
        setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
    }, []);

    useEffect(() => {
        const timer = setInterval(() => {
            if (!isHovered) {
                handleNext();
            }
        }, 5000);
        return () => clearInterval(timer);
    }, [handleNext, isHovered]);

    const variants = {
        enter: (direction) => ({
            x: direction > 0 ? 100 : -100,
            opacity: 0,
            scale: 0.9
        }),
        center: {
            zIndex: 1,
            x: 0,
            opacity: 1,
            scale: 1
        },
        exit: (direction) => ({
            zIndex: 0,
            x: direction < 0 ? 100 : -100,
            opacity: 0,
            scale: 0.9
        })
    };

    const current = testimonials[currentIndex];

    return (
        <div
            className="testimonials-carousel-wrapper"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <div className="carousel-nav-buttons">
                <button className="nav-btn prev" onClick={handlePrev} aria-label="Anterior">
                    <ChevronLeft size={24} />
                </button>
                <button className="nav-btn next" onClick={handleNext} aria-label="Próximo">
                    <ChevronRight size={24} />
                </button>
            </div>

            <div className="carousel-main">
                <AnimatePresence initial={false} custom={direction} mode="wait">
                    <motion.div
                        key={currentIndex}
                        custom={direction}
                        variants={variants}
                        initial="enter"
                        animate="center"
                        exit="exit"
                        transition={{
                            x: { type: "spring", stiffness: 300, damping: 30 },
                            opacity: { duration: 0.3 },
                            scale: { duration: 0.4 }
                        }}
                        drag="x"
                        dragConstraints={{ left: 0, right: 0 }}
                        dragElastic={1}
                        onDragEnd={(e, { offset, velocity }) => {
                            const swipe = swipePower(offset.x, velocity.x);
                            if (swipe < -swipeConfidenceThreshold) {
                                handleNext();
                            } else if (swipe > swipeConfidenceThreshold) {
                                handlePrev();
                            }
                        }}
                        className="testimonial-card-premium glass-card neural-border spotlight-group"
                        onMouseMove={(e) => {
                            const rect = e.currentTarget.getBoundingClientRect();
                            setMousePos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
                        }}
                    >
                        <div
                            className="spotlight-glow"
                            style={{
                                background: `radial-gradient(400px circle at ${mousePos.x}px ${mousePos.y}px, rgba(68, 208, 93, 0.1), transparent 40%)`,
                                opacity: 1
                            }}
                        />

                        <div className="testimonial-header">
                            <div className="avatar-circle">{current.initials}</div>
                            <div className="client-info">
                                <h4>{current.name}</h4>
                                <span>{current.date}</span>
                            </div>
                            <div className="google-stars">
                                {[...Array(current.rating)].map((_, i) => (
                                    <Star key={i} size={16} fill="var(--primary-color)" stroke="none" />
                                ))}
                            </div>
                        </div>

                        <div className="testimonial-body">
                            <Quote size={32} className="quote-icon-large" />
                            <p className="testimonial-text">{current.text}</p>
                        </div>
                    </motion.div>
                </AnimatePresence>
            </div>

            <div className="carousel-dots">
                {testimonials.map((_, i) => (
                    <button
                        key={i}
                        className={`dot-indicator ${currentIndex === i ? 'active' : ''}`}
                        onClick={() => {
                            setDirection(i > currentIndex ? 1 : -1);
                            setCurrentIndex(i);
                        }}
                    />
                ))}
            </div>
        </div>
    );
};

export default TestimonialsCarousel;
