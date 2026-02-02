"use client"
import { motion } from "framer-motion"

export default function FloatingHearts() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {[...Array(15)].map((_, i) => (
        <motion.div
          key={i}
          initial={{
            y: "100%",
            x: Math.random() * window.innerWidth,
            opacity: 0
          }}
          animate={{
            y: "-10%",
            opacity: [0, 1, 1, 0]
          }}
          transition={{
            duration: 8 + Math.random() * 5,
            repeat: Infinity,
            delay: Math.random() * 5
          }}
          className="absolute text-pink-400 text-3xl"
        >
          ❤️
        </motion.div>
      ))}
    </div>
  )
}
