import { motion } from 'framer-motion';

const RevealText = ({ children, delay = 0 }) => {
    return (
        <div style={{ position: 'relative', overflow: 'hidden' }}>
            <motion.div
                initial={{ y: "100%" }}
                whileInView={{ y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1], delay }}
            >
                {children}
            </motion.div>
        </div>
    );
};

export default RevealText;
