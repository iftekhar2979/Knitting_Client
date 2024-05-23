"use client"
import react from 'react';
import { motion } from "framer-motion"

const Animate = (props) => {
    return (
        <motion.div
            animate={{ x: 100 }}
            transition={{ delay: 1 }}
        />
    )
};
export default Animate;