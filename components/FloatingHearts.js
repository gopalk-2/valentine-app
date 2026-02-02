"use client"

import { motion } from "framer-motion"
import { useEffect, useState } from "react"

export default function FloatingHearts() {
  const [mounted, setMounted] = useState(false)
  const [width, setWidth] = useState(0)

  useEffect(() => {
    setMounted(true)
    setWidth(window.innerWidth)
  }, [])

  if (!mounted || !width) return null

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {[...Array(12)].map((_, i) => (
        <motion.div
          key={i}
          initial={{
            y: "100%",
            x: Math.random() * width,
            opacity: 0
          }}
          animate={{
            y: "-10%",
            opacity: [0, 1, 1, 0]
          }}
          transition={{
            duration: 10 + Math.random() * 5,
            repeat: Infinity,
            delay: Math.random() * 4
          }}
          className="absolute text-pink-400 text-3xl"
        >
          ❤️
        </motion.div>
      ))}
    </div>
  )
}
