"use client"

import { useParams } from "next/navigation"
import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import FloatingHearts from "@/components/FloatingHearts"
import confetti from "canvas-confetti"

export default function LovePage() {
  const params = useParams()
  const id = Array.isArray(params.id) ? params.id[0] : params.id
  const [noPos, setNoPos] = useState({ x: 0, y: 0 })
  const [yes, setYes] = useState(false)
  const [dark, setDark] = useState(false)

  const messages = [
    "Someone very special is waiting for your answer… 🥹",
    "Their heart is beating fast right now… 💓",
    "This moment could become a memory forever… 🌹"
  ]
  const [msgIndex, setMsgIndex] = useState(0)

  // Mark as opened
  useEffect(() => {
    fetch("/api/respond", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, action: "OPENED" })
    })
  }, [id])

  // Background music
  useEffect(() => {
    const audio = new Audio("/romantic.mp3")
    audio.loop = true
    audio.volume = 0.3
    audio.play().catch(() => {})
  }, [])

  // Text animation
  useEffect(() => {
    const timer = setInterval(() => {
      setMsgIndex(i => (i + 1) % messages.length)
    }, 3000)
    return () => clearInterval(timer)
  }, [])

  const respond = async (action) => {
    await fetch("/api/respond", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, action })
    })

    if (action === "YES") {
      confetti({
        particleCount: 200,
        spread: 120,
        origin: { y: 0.6 }
      })
      setYes(true)
    }
  }
if (!id) return null

  return (
    <div className={`${dark ? "bg-black text-white" : "bg-gradient-to-br from-pink-200 to-red-300"} min-h-screen flex flex-col items-center justify-center text-center px-4 relative overflow-hidden`}>
      <FloatingHearts />

      <button
        onClick={() => setDark(!dark)}
        className="absolute top-4 right-4 bg-white px-3 py-1 rounded shadow z-10"
      >
        {dark ? "☀️" : "🌙"}
      </button>

      {!yes ? (
        <>
          <h1 className="text-3xl font-bold mb-2">
            💘 Will you be my Valentine?
          </h1>

          <p className="mb-8 text-lg transition-all">
            {messages[msgIndex]}
          </p>

          <div className="flex gap-6 relative z-10">
            <button
              onClick={() => respond("YES")}
              className="bg-green-500 text-white px-6 py-2 rounded-lg text-lg hover:bg-green-600 transition"
            >
              YES 💕
            </button>

            <motion.button
              animate={noPos}
              onMouseEnter={() =>
                setNoPos({
                  x: Math.random() * 200 - 100,
                  y: Math.random() * 200 - 100
                })
              }
              onClick={() => respond("NO")}
              className="bg-red-500 text-white px-6 py-2 rounded-lg text-lg"
            >
              NO 😈
            </motion.button>
          </div>
        </>
      ) : (
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="text-white z-10"
        >
          <h1 className="text-4xl font-bold mb-4">
            YAYYYY!!! 💖🥹
          </h1>
          <p className="text-xl">
            You just made someone’s Valentine very special 🌹
          </p>
        </motion.div>
      )}
    </div>
  )
}
