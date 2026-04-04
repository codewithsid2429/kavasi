'use client';

import { FaWhatsapp } from 'react-icons/fa';
import { motion } from 'framer-motion';

export function WhatsAppButton() {
  return (
    <motion.div 
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      transition={{ type: "spring", stiffness: 260, damping: 20 }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      className="fixed bottom-6 right-6 z-50 group"
    >
      <a 
        href="https://wa.me/916394974200?text=Hello%20Kavasi"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat on WhatsApp"
        className="flex items-center justify-center w-14 h-14 bg-green-500 rounded-full shadow-lg relative"
      >
        {/* Pulse Effect */}
        <span className="absolute inset-0 bg-green-500 rounded-full animate-ping opacity-25 group-hover:opacity-75 transition-opacity" />

        {/* WhatsApp Icon */}
        <FaWhatsapp className="text-white w-7 h-7 relative z-10" />
      </a>

      {/* Tooltip */}
      <span className="absolute right-16 top-1/2 -translate-y-1/2 bg-black text-white text-sm px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition whitespace-nowrap">
        Chat with me
      </span>
    </motion.div>
  );
}