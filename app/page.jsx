"use client"
import { useState } from "react"

export default function Home() {
  const [yourName, setYourName] = useState("")
  const [partnerName, setPartnerName] = useState("")
  const [link, setLink] = useState("")

  const generateLink = async () => {
    if (!yourName || !partnerName) {
      alert("Bhai dono naam daal 😤")
      return
    }

    const res = await fetch("/api/create", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ yourName, partnerName })
    })

    const data = await res.json()
    setLink(data.url)
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-pink-200 to-red-300">
      <div className="bg-white p-8 rounded-xl shadow-xl w-96">
        <h1 className="text-2xl font-bold text-center mb-4 text-gray-800">
          💘 Valentine Link Generator
        </h1>

        <input
          className="w-full p-2 border rounded mb-3 bg-white text-black placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-pink-400"
          placeholder="Your Name"
          value={yourName}
          onChange={e => setYourName(e.target.value)}
        />

        <input
          className="w-full p-2 border rounded mb-4 bg-white text-black placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-pink-400"
          placeholder="Partner Name"
          value={partnerName}
          onChange={e => setPartnerName(e.target.value)}
        />

        <button
          onClick={generateLink}
          className="w-full bg-pink-500 text-white py-2 rounded-lg hover:bg-pink-600 transition"
        >
          Generate Love Link ❤️
        </button>

        {link && (
  <div className="mt-4 text-center bg-gray-50 p-3 rounded-lg">
    <p className="text-sm text-gray-700 mb-1">
      Share this link 👇
    </p>
    <a className="text-blue-600 underline break-all font-medium">
      {link}
    </a>
  </div>
)}

      </div>
    </div>
  )
}
