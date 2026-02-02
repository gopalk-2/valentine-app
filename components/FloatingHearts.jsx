"use client"

import { motion } from "framer-motion"
import { useEffect, useState } from "react"

export default function FloatingHearts() {
  const [particles, setParticles] = useState([])

  useEffect(() => {
    const w = window.innerWidth
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setParticles(
      [...Array(12)].map(() => ({
        x: Math.random() * w,
        duration: 10 + Math.random() * 5,
        delay: Math.random() * 4
      }))
    )
  }, [])

  if (particles.length === 0) return null

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {particles.map((p, i) => (
        <motion.div
          key={i}
          initial={{
            y: "100%",
            x: p.x,
            opacity: 0
          }}
          animate={{
            y: "-10%",
            opacity: [0, 1, 1, 0]
          }}
          transition={{
            duration: p.duration,
            repeat: Infinity,
            delay: p.delay
          }}
          className="absolute text-pink-400 text-3xl"
        >
          ❤️
        </motion.div>
      ))}
    </div>
  )
}
