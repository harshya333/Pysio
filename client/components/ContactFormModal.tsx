"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"

export default function ContactFormModal() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission here
    console.log("Form submitted:", formData)
    // Reset form
    setFormData({ name: "", email: "", message: "" })
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }))
  }

  return (
    <div className="p-8 rounded-2xl"
      style={{
        background: "rgba(148, 188, 117, 0.08)",
        borderRadius: "16px",
        boxShadow: "0 4px 30px rgba(0, 0, 0, 0.1)",
        backdropFilter: "blur(3.2px)",
        WebkitBackdropFilter: "blur(3.2px)",
        border: "1px solid rgba(148, 188, 117, 0.53)",
      }}
    >
      <form onSubmit={handleSubmit} className="space-y-6">
        <h2 className="text-2xl font-bold text-white mb-6">Share Your Feedback</h2>

        <div>
          <label htmlFor="name" className="block text-sm font-medium text-white/80 mb-2">
            Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg 
                     text-white placeholder-white/50 backdrop-blur-sm
                     focus:outline-none focus:ring-2 focus:ring-white/30"
            placeholder="Your name"
          />
        </div>

        <div>
          <label htmlFor="email" className="block text-sm font-medium text-white/80 mb-2">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg 
                     text-white placeholder-white/50 backdrop-blur-sm
                     focus:outline-none focus:ring-2 focus:ring-white/30"
            placeholder="your.email@example.com"
          />
        </div>

        <div>
          <label htmlFor="message" className="block text-sm font-medium text-white/80 mb-2">
            Message
          </label>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            required
            rows={4}
            className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg 
                     text-white placeholder-white/50 backdrop-blur-sm resize-none
                     focus:outline-none focus:ring-2 focus:ring-white/30"
            placeholder="Share your thoughts with us..."
          />
        </div>

        <Button
          type="submit"
          className="w-full bg-white/20 hover:bg-white/30 text-white font-semibold 
                   py-3 px-6 rounded-lg border border-white/30 backdrop-blur-sm
                   transition-all duration-300"
        >
          Send Feedback
        </Button>
      </form>
    </div>
  )
}