import { useState, useEffect } from 'react';
import './CustomCursor.css';

const CustomCursor = () => {
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const [dotPosition, setDotPosition] = useState({ x: 0, y: 0 });
    const [isHovering, setIsHovering] = useState(false);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const onMouseMove = (e) => {
            setDotPosition({ x: e.clientX, y: e.clientY });
            setIsVisible(true);
        };

        const onMouseEnter = () => setIsVisible(true);
        const onMouseLeave = () => setIsVisible(false);

        const handleHover = (e) => {
            const target = e.target;
            const isClickable = target.closest('a, button, .clickable, .project-card, input, textarea');
            setIsHovering(!!isClickable);
        };

        window.addEventListener('mousemove', onMouseMove);
        window.addEventListener('mouseover', handleHover);
        document.addEventListener('mouseenter', onMouseEnter);
        document.addEventListener('mouseleave', onMouseLeave);

        return () => {
            window.removeEventListener('mousemove', onMouseMove);
            window.removeEventListener('mouseover', handleHover);
            document.removeEventListener('mouseenter', onMouseEnter);
            document.removeEventListener('mouseleave', onMouseLeave);
        };
    }, []);

    useEffect(() => {
        const followMouse = () => {
            setPosition(prev => ({
                x: prev.x + (dotPosition.x - prev.x) * 0.15,
                y: prev.y + (dotPosition.y - prev.y) * 0.15
            }));
            requestAnimationFrame(followMouse);
        };
        const animId = requestAnimationFrame(followMouse);
        return () => cancelAnimationFrame(animId);
    }, [dotPosition]);

    if (!isVisible) return null;

    return (
        <>
            <div
                className={`custom-cursor-dot ${isHovering ? 'hovering' : ''}`}
                style={{
                    left: `${dotPosition.x}px`,
                    top: `${dotPosition.y}px`
                }}
            />
            <div
                className={`custom-cursor-outline ${isHovering ? 'hovering' : ''}`}
                style={{
                    left: `${position.x}px`,
                    top: `${position.y}px`
                }}
            />
        </>
    );
};

export default CustomCursor;
