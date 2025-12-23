import { motion } from 'framer-motion';
import './Marquee.css';

const Marquee = ({ items, speed = 20, reverse = false }) => {
    return (
        <div className="marquee-container">
            <motion.div
                className="marquee-content"
                animate={{ x: reverse ? [0, -1035] : [-1035, 0] }}
                transition={{
                    duration: speed,
                    repeat: Infinity,
                    ease: "linear"
                }}
            >
                {[...items, ...items, ...items].map((item, index) => (
                    <div key={index} className="marquee-item">
                        {item}
                    </div>
                ))}
            </motion.div>
        </div>
    );
};

export default Marquee;
